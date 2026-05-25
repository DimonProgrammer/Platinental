<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$config = [];
$configPath = dirname(__DIR__, 2) . '/telegram-config.php';
if (is_file($configPath)) {
    $loadedConfig = require $configPath;
    if (is_array($loadedConfig)) {
        $config = $loadedConfig;
    }
}

$botToken = $config['TELEGRAM_BOT_TOKEN'] ?? getenv('TELEGRAM_BOT_TOKEN') ?: '';
$chatId = $config['TELEGRAM_CHAT_ID'] ?? getenv('TELEGRAM_CHAT_ID') ?: '';
$storageDir = $config['LEADS_STORAGE_DIR'] ?? getenv('LEADS_STORAGE_DIR') ?: dirname(__DIR__, 2) . '/leads-storage';

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '{}', true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_json']);
    exit;
}

$clean = static function ($value, int $maxLength = 700): string {
    $value = trim((string) ($value ?? ''));
    return mb_substr($value, 0, $maxLength);
};

$escape = static function (string $value): string {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};

$normalizePage = static function ($value) use ($clean): string {
    $page = $clean($value, 300);
    if ($page === '') {
        return '';
    }

    $parts = parse_url($page);
    if (is_array($parts) && isset($parts['path'])) {
        return ($parts['path'] !== '' ? $parts['path'] : '/') . (isset($parts['query']) ? '?' . $parts['query'] : '');
    }

    return substr($page, 0, 1) === '/' ? $page : '';
};

$buildAnswers = static function ($items) use ($clean, $escape): array {
    if (!is_array($items)) {
        return [];
    }

    $answers = [];
    foreach ($items as $index => $item) {
        if (!is_array($item)) {
            continue;
        }
        $question = rtrim($clean($item['question'] ?? '', 120), '?');
        $answer = $clean($item['answer'] ?? '', 180);
        if ($answer === '') {
            continue;
        }
        $prefix = ((int) $index + 1) . '. ';
        $answers[] = $question !== ''
            ? $prefix . $escape($question) . ': ' . $escape($answer)
            : $prefix . $escape($answer);
    }

    return $answers;
};

$buildStoredAnswers = static function ($items) use ($clean): array {
    if (!is_array($items)) {
        return [];
    }

    $answers = [];
    foreach ($items as $item) {
        if (!is_array($item)) {
            continue;
        }

        $question = $clean($item['question'] ?? '', 180);
        $answer = $clean($item['answer'] ?? '', 220);
        if ($answer === '') {
            continue;
        }

        $answers[] = [
            'question' => $question,
            'answer' => $answer,
        ];
    }

    return $answers;
};

$storeLead = static function (array $record) use ($storageDir): bool {
    if (!is_dir($storageDir) && !mkdir($storageDir, 0750, true) && !is_dir($storageDir)) {
        return false;
    }

    $filePath = rtrim($storageDir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'leads.jsonl';
    $encoded = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($encoded === false) {
        return false;
    }

    $written = file_put_contents($filePath, $encoded . PHP_EOL, FILE_APPEND | LOCK_EX);
    if ($written === false) {
        return false;
    }

    @chmod($filePath, 0640);
    return true;
};

$phone = $clean($payload['phone'] ?? '', 32);
$consent = !empty($payload['consent']);
$legalConsent = !empty($payload['legalConsent']);

if ($phone === '' || !$consent || !$legalConsent) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'missing_required_fields']);
    exit;
}

$answers = $buildAnswers($payload['answers'] ?? null);
$storedAnswers = $buildStoredAnswers($payload['answers'] ?? null);
$source = $clean($payload['source'] ?? '', 80);
$page = $normalizePage($payload['page'] ?? '');
$name = $clean($payload['name'] ?? '', 80);
$doctor = $clean($payload['doctor'] ?? '', 120);
$message = $clean($payload['message'] ?? '', 900);

$header = array_filter([
    '<b>Заявка с сайта The Platinental Казань</b>',
    $source !== '' ? 'Форма: ' . $escape($source) : '',
    $page !== '' ? 'Страница: ' . $escape($page) : '',
]);

$contact = array_filter([
    $name !== '' ? 'Имя: ' . $escape($name) : '',
    'Телефон: ' . $escape($phone),
    $doctor !== '' ? 'Врач: ' . $escape($doctor) : '',
    $message !== '' ? 'Запрос: ' . $escape($message) : '',
]);

$sections = array_filter([
    implode("\n", $header),
    implode("\n", $contact),
    count($answers) > 0 ? "Ответы:\n" . implode("\n", $answers) : '',
]);

$buildStorageRecord = static function (string $status, int $httpCode = 0) use (
    $source,
    $page,
    $name,
    $phone,
    $doctor,
    $message,
    $storedAnswers,
    $consent,
    $legalConsent
): array {
    return [
        'id' => bin2hex(random_bytes(8)),
        'created_at' => gmdate('c'),
        'telegram_status' => $status,
        'telegram_http_code' => $httpCode,
        'source' => $source,
        'page' => $page,
        'name' => $name,
        'phone' => $phone,
        'doctor' => $doctor,
        'message' => $message,
        'answers' => $storedAnswers,
        'consent' => $consent,
        'legal_consent' => $legalConsent,
    ];
};

$storeOnly = ($_GET['store'] ?? '') === '1';
if ($storeOnly) {
    $stored = $storeLead($buildStorageRecord('stored_only'));
    echo json_encode(['ok' => true, 'stored' => $stored]);
    exit;
}

if ($botToken === '' || $chatId === '') {
    $storeLead($buildStorageRecord('failed_config'));
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'telegram_not_configured']);
    exit;
}

$telegramPayload = json_encode([
    'chat_id' => $chatId,
    'text' => implode("\n\n", $sections),
    'parse_mode' => 'HTML',
    'disable_web_page_preview' => true,
], JSON_UNESCAPED_UNICODE);

$ch = curl_init('https://api.telegram.org/bot' . $botToken . '/sendMessage');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => $telegramPayload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 20,
]);

$telegramResponse = curl_exec($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($telegramResponse === false || $httpCode < 200 || $httpCode >= 300) {
    $storeLead($buildStorageRecord('failed', $httpCode));

    http_response_code(502);
    echo json_encode([
        'ok' => false,
        'error' => 'telegram_send_failed',
        'details' => mb_substr($curlError !== '' ? $curlError : (string) $telegramResponse, 0, 300),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$stored = $storeLead($buildStorageRecord('sent', $httpCode));

echo json_encode(['ok' => true, 'stored' => $stored]);
