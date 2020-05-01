const path = require('path');
const fs = require('graceful-fs');
const makeDir = require('make-dir');
const pify = require('pify');
const globby = require('globby');
const camelcase = require('camelcase');
const decamelize = require('decamelize');
const titleize = require('titleize');
const prettierEslint = require('prettier-eslint');
const pathExists = require('path-exists');

const fsAsync = pify(fs);
const prettierSupportExts = [
  '.js',
  '.jsx',
  '.ts',
  '.css',
  '.scss',
  '.less',
  '.vue',
  '.md',
  '.json',
];

const caseConvertorMap = {
  pascalCase: (val) => camelcase(val, { pascalCase: true }),
  properCase: (val) => camelcase(val, { pascalCase: true }),
  camelCase: (val) => camelcase(val),
  hyphenatedCase: (val) => decamelize(val, '-'),
  dashCase: (val) => decamelize(val, '-'),
  kebabCase: (val) => decamelize(val, '-'),
  underscoredCase: (val) => decamelize(val, '_'),
  snakeCase: (val) => decamelize(val, '_'),
  dotCase: (val) => decamelize(val, '.'),
  constantCase: (val) => decamelize(val, '_').toUpperCase(),
  lowerCase: (val) => decamelize(val, ' '),
  titleCase: (val) => titleize(decamelize(val, ' ')),
  sentenceCase: (val) => titleize(decamelize(val, ' ')),
};

const getTemplateNameCases = (templateName) => {
  return Object.keys(caseConvertorMap).reduce((result, key) => {
    result[key] = caseConvertorMap[key](templateName);
    return result;
  }, {});
};

const getConfig = (config) => {
  const defaultOptions = {
    cwd: process.cwd(),
    templateFilesDir: './templates',
    destPath: '',
  };
  return Object.assign({}, defaultOptions, config);
};

const parseTemplateString = (template, data) => {
  const braceRegex = /\${(.*?)}/g;

  return template.replace(braceRegex, (_, key) => {
    let result = data;

    for (const property of key.split('.')) {
      result = result ? result[property] : '';
    }

    return String(result);
  });
};

module.exports = async (templateCommand, config) => {
  const templateCommandSplit = templateCommand.split('.');
  const templateName = templateCommandSplit.pop();
  const templateFileName = templateCommandSplit.pop();
  const templateDirPath = templateCommandSplit.join('/');
  const templateDirName = templateCommandSplit.length
    ? `${templateCommandSplit.join('.')}/`
    : '';
  const templateMatch = `${templateDirName}${templateFileName}`;

  const { cwd, templateFilesDir, destPath } = getConfig(config);

  const filePaths = await globby(
    [`${templateMatch}*`, `${templateMatch}*/**`],
    {
      cwd: path.resolve(path.join(cwd, templateFilesDir)),
    }
  );

  const fileNameReplacer = (_, key) => {
    const caseConvertor = caseConvertorMap[key];
    if (caseConvertor) {
      return caseConvertor(templateName);
    } else {
      return '';
    }
  };

  const templateFileContentData = getTemplateNameCases(templateName);
  const fileWrites = filePaths.map(async (filePath) => {
    const parsedFilePath = filePath
      .replace(/\[(.*?)\]/g, fileNameReplacer)
      .replace(new RegExp(`${templateFileName}\\.`, 'g'), '');

    const parsedFilePathSplit = parsedFilePath.split('/');
    const fileName = parsedFilePathSplit.pop();

    const writeDirPath = path.resolve(
      path.join(destPath, parsedFilePathSplit.join('/'))
    );
    const writeFilePath = path.resolve(path.join(writeDirPath, fileName));

    const templateFile = path.resolve(path.join(templateFilesDir, filePath));

    let templateFileContent = await fsAsync.readFile(templateFile, 'utf-8');
    templateFileContent = parseTemplateString(
      templateFileContent,
      templateFileContentData
    );

    // pretty file
    const fileExt = path.extname(writeFilePath);
    if (prettierSupportExts.indexOf(fileExt) !== -1) {
      templateFileContent = prettierEslint({
        text: templateFileContent,
        prettierOptions: {
          filepath: fileName,
        },
      });
    }

    if (!(await pathExists(writeFilePath))) {
      await makeDir(writeDirPath);
      await fsAsync.writeFile(writeFilePath, templateFileContent);
    } else {
      console.log(`Path already exists: \n${writeFilePath}`);
    }
  });

  await Promise.all(fileWrites);
};
