const fs = require('fs');
const path = require('path');

const {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  LevelFormat,
  Packer,
  Paragraph,
  ShadingType,
  TextRun,
} = require('/Users/dima/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/docx@9.6.1/node_modules/docx/dist/index.cjs');

const inputDir = path.resolve('knowledge/doctors-research/client-prototypes');
const outputDir = path.join(inputDir, 'docx');

const pageWidth = 11906;
const pageHeight = 16838;
const margins = { top: 1134, right: 1134, bottom: 1134, left: 1134 };
const maxImageWidth = 560;
const maxImageHeight = 430;

function getImageType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'jpg';
  if (ext === '.png') return 'png';
  if (ext === '.gif') return 'gif';
  if (ext === '.bmp') return 'bmp';
  return null;
}

function getImageDimensions(buffer) {
  if (
    buffer.length > 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      const isStartOfFrame =
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf);

      if (isStartOfFrame) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }

      offset += 2 + length;
    }
  }

  return null;
}

function resolveImagePath(src, baseDir) {
  if (/^https?:\/\//i.test(src)) return null;
  return path.resolve(baseDir, src);
}

function cleanInline(text) {
  return text
    .replace(/\\`/g, '`')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function parseInline(text, baseOptions = {}) {
  const runs = [];
  const source = cleanInline(text);
  const regex = /(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(source)) !== null) {
    if (match.index > lastIndex) {
      runs.push(new TextRun({ text: source.slice(lastIndex, match.index), ...baseOptions }));
    }

    const token = match[0];
    if (token.startsWith('**')) {
      runs.push(new TextRun({ text: token.slice(2, -2), bold: true, ...baseOptions }));
    } else if (token.startsWith('_')) {
      runs.push(new TextRun({ text: token.slice(1, -1), italics: true, ...baseOptions }));
    } else {
      runs.push(
        new TextRun({
          text: token.slice(1, -1),
          font: 'Courier New',
          size: baseOptions.size || 22,
        }),
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < source.length) {
    runs.push(new TextRun({ text: source.slice(lastIndex), ...baseOptions }));
  }

  return runs.length ? runs : [new TextRun({ text: '', ...baseOptions })];
}

function getKindStyle(kind) {
  if (kind === 'client') {
    return {
      color: '4A3A23',
      shading: { fill: 'F7F1E8', type: ShadingType.CLEAR },
      border: {
        left: { color: 'C4A882', space: 8, style: BorderStyle.SINGLE, size: 18 },
      },
      spacing: { before: 80, after: 120 },
      indent: { left: 220 },
    };
  }

  if (kind === 'comment') {
    return {
      color: '525252',
      shading: { fill: 'F4F4F4', type: ShadingType.CLEAR },
      border: {
        left: { color: 'BDBDBD', space: 8, style: BorderStyle.SINGLE, size: 12 },
      },
      spacing: { before: 60, after: 100 },
      indent: { left: 220 },
    };
  }

  return {
    color: '111111',
    spacing: { after: 120 },
  };
}

function makeParagraph(text, kind = 'site') {
  const style = getKindStyle(kind);
  return new Paragraph({
    children: parseInline(text, {
      font: 'Arial',
      size: kind === 'site' ? 22 : 21,
      color: style.color,
      italics: kind !== 'site',
    }),
    spacing: style.spacing,
    shading: style.shading,
    border: style.border,
    indent: style.indent,
  });
}

function makeHeading(text, level, kind = 'site') {
  const heading =
    level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3;
  const isComment = kind !== 'site';

  return new Paragraph({
    heading,
    children: parseInline(text, {
      font: 'Arial',
      size: level === 1 ? 34 : level === 2 ? 28 : 24,
      bold: true,
      color: isComment ? '6F5A3A' : '111111',
    }),
    spacing: { before: level === 1 ? 240 : 180, after: 140 },
    shading: isComment ? { fill: 'F7F1E8', type: ShadingType.CLEAR } : undefined,
    border: isComment
      ? {
          left: { color: 'C4A882', space: 8, style: BorderStyle.SINGLE, size: 18 },
        }
      : undefined,
    indent: isComment ? { left: 220 } : undefined,
  });
}

function makeDivider() {
  return new Paragraph({
    border: {
      bottom: { color: 'C9B89D', space: 1, style: BorderStyle.SINGLE, size: 6 },
    },
    spacing: { before: 120, after: 220 },
  });
}

function makeImageParagraph(src, alt, baseDir) {
  const imagePath = resolveImagePath(src, baseDir);
  const imageType = imagePath ? getImageType(imagePath) : null;

  if (!imagePath || !imageType || !fs.existsSync(imagePath)) {
    return makeParagraph(`[Изображение не найдено: ${alt || src}]`, 'comment');
  }

  const data = fs.readFileSync(imagePath);
  const dimensions = getImageDimensions(data);
  const originalWidth = dimensions?.width || maxImageWidth;
  const originalHeight = dimensions?.height || maxImageHeight;
  const scale = Math.min(maxImageWidth / originalWidth, maxImageHeight / originalHeight, 1);
  const width = Math.round(originalWidth * scale);
  const height = Math.round(originalHeight * scale);

  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 180 },
    children: [
      new ImageRun({
        type: imageType,
        data,
        transformation: { width, height },
        altText: {
          title: alt || path.basename(imagePath),
          description: alt || path.basename(imagePath),
          name: path.basename(imagePath),
        },
      }),
    ],
  });
}

function convertMarkdown(markdown, baseDir) {
  const children = [];
  const listRefs = [];
  const lines = markdown.split(/\r?\n/);
  let pending = [];
  let listBlock = 0;
  let sectionKind = 'site';

  const flushParagraph = () => {
    if (!pending.length) return;
    children.push(makeParagraph(pending.join(' '), sectionKind));
    pending = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (line === '---') {
      flushParagraph();
      children.push(makeDivider());
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      const headingText = headingMatch[2];
      if (/^(Как читать документ|Вопросы клиенту|Рабочие пометки)$/i.test(headingText)) {
        sectionKind = 'comment';
      } else if (/^(Черновик страницы|Источники проверки)$/i.test(headingText)) {
        sectionKind = headingText === 'Источники проверки' ? 'comment' : 'site';
      }
      children.push(makeHeading(headingText, headingMatch[1].length, sectionKind));
      continue;
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      flushParagraph();
      children.push(makeImageParagraph(imageMatch[2], imageMatch[1], baseDir));
      continue;
    }

    const quoteMatch = line.match(/^>\s*(.+)$/);
    if (quoteMatch) {
      flushParagraph();
      children.push(makeParagraph(quoteMatch[1], 'client'));
      continue;
    }

    const bulletMatch = line.match(/^-\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      const reference = `bullets-${listBlock++}`;
      listRefs.push({ reference, format: LevelFormat.BULLET, text: '•' });
      const style = getKindStyle(sectionKind);
      children.push(
        new Paragraph({
          children: parseInline(bulletMatch[1], {
            font: 'Arial',
            size: sectionKind === 'site' ? 22 : 21,
            color: style.color,
            italics: sectionKind !== 'site',
          }),
          numbering: { reference, level: 0 },
          spacing: sectionKind === 'site' ? { after: 80 } : style.spacing,
          shading: style.shading,
          border: style.border,
        }),
      );
      continue;
    }

    const numberMatch = line.match(/^\d+\.\s+(.+)$/);
    if (numberMatch) {
      flushParagraph();
      const previous = children.at(-1);
      let reference = previous && previous.__numberReference;

      if (!reference) {
        reference = `numbers-${listBlock++}`;
        listRefs.push({ reference, format: LevelFormat.DECIMAL, text: '%1.' });
      }

      const style = getKindStyle(sectionKind);
      const paragraph = new Paragraph({
        children: parseInline(numberMatch[1], {
          font: 'Arial',
          size: sectionKind === 'site' ? 22 : 21,
          color: style.color,
          italics: sectionKind !== 'site',
        }),
        numbering: { reference, level: 0 },
        spacing: sectionKind === 'site' ? { after: 80 } : style.spacing,
        shading: style.shading,
        border: style.border,
      });
      paragraph.__numberReference = reference;
      children.push(paragraph);
      continue;
    }

    pending.push(line);
  }

  flushParagraph();

  return {
    children,
    numbering: {
      config: listRefs.map(({ reference, format, text }) => ({
        reference,
        levels: [
          {
            level: 0,
            format,
            text,
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 },
              },
            },
          },
        ],
      })),
    },
  };
}

function createDocument(markdown, baseDir) {
  const converted = convertMarkdown(markdown, baseDir);

  return new Document({
    numbering: converted.numbering,
    styles: {
      default: {
        document: {
          run: { font: 'Arial', size: 22 },
          paragraph: { spacing: { line: 276 } },
        },
      },
      paragraphStyles: [
        {
          id: 'Heading1',
          name: 'Heading 1',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { size: 34, bold: true, font: 'Arial', color: '111111' },
          paragraph: { spacing: { before: 260, after: 180 }, outlineLevel: 0 },
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { size: 28, bold: true, font: 'Arial', color: '111111' },
          paragraph: { spacing: { before: 220, after: 140 }, outlineLevel: 1 },
        },
        {
          id: 'Heading3',
          name: 'Heading 3',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { size: 24, bold: true, font: 'Arial', color: '111111' },
          paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 2 },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: pageWidth, height: pageHeight },
            margin: margins,
          },
        },
        children: converted.children,
      },
    ],
  });
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.endsWith('.md') && file !== 'README.md')
    .sort();

  for (const file of files) {
    const sourcePath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.md$/, '.docx'));
    const markdown = fs.readFileSync(sourcePath, 'utf8');
    const document = createDocument(markdown, path.dirname(sourcePath));
    const buffer = await Packer.toBuffer(document);
    fs.writeFileSync(outputPath, buffer);
    console.log(outputPath);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
