const path = require('path');
const pify = require('pify');
const fs = require('fs');
const del = require('del');
const modugen = require('..');

const fsAsync = pify(fs);
const destPath = './template-test';

beforeAll(async () => {
  await del(['./template-test']);
});

test('Verify module generation without moduleName directory', async () => {
  await modugen('src.CoreModule.Button', {
    destPath,
    templateFilesDir: './test/templates',
  });

  const moduleFile = path.resolve(path.join(destPath, 'src/Button.jsx'));
  const moduleTestFile = path.resolve(
    path.join(destPath, 'src/Button.test.js')
  );
  const moduleIndexFile = path.resolve(path.join(destPath, 'src/index.js'));

  const moduleFileContent = await fsAsync.readFile(moduleFile, 'utf-8');
  const moduleTestFileContent = await fsAsync.readFile(moduleTestFile, 'utf-8');
  const moduleIndexFileContent = await fsAsync.readFile(
    moduleIndexFile,
    'utf-8'
  );

  expect(moduleFileContent).toBeTruthy();
  expect(moduleTestFileContent).toBeTruthy();
  expect(moduleIndexFileContent).toBeTruthy();

  expect(moduleFileContent).toMatchSnapshot();
  expect(moduleTestFileContent).toMatchSnapshot();
  expect(moduleIndexFileContent).toMatchSnapshot();
});

test('Verify module generation with moduleName file and directory', async () => {
  await modugen('CoreModule.BaseButton', {
    destPath,
    templateFilesDir: './test/templates',
  });

  const moduleWithoutDirFile = path.resolve(
    path.join(destPath, '/BaseButton.js')
  );

  const moduleFile = path.resolve(
    path.join(destPath, 'base-button/BaseButton.jsx')
  );
  const moduleTestFile = path.resolve(
    path.join(destPath, 'base-button/test/BaseButton.test.js')
  );
  const moduleIndexFile = path.resolve(
    path.join(destPath, 'base-button/index.js')
  );

  const moduleReadMeFile = path.resolve(path.join(destPath, '/README.md'));

  const moduleTodosFile = path.resolve(path.join(destPath, '/Todos.txt'));

  const moduleWithoutDirFileContent = await fsAsync.readFile(
    moduleWithoutDirFile,
    'utf-8'
  );
  const moduleFileContent = await fsAsync.readFile(moduleFile, 'utf-8');
  const moduleTestFileContent = await fsAsync.readFile(moduleTestFile, 'utf-8');
  const moduleIndexFileContent = await fsAsync.readFile(
    moduleIndexFile,
    'utf-8'
  );
  const moduleReadMeFileContent = await fsAsync.readFile(
    moduleReadMeFile,
    'utf-8'
  );
  const moduleTodosFileContent = await fsAsync.readFile(
    moduleTodosFile,
    'utf-8'
  );

  expect(moduleWithoutDirFileContent).toBeTruthy();
  expect(moduleFileContent).toBeTruthy();
  expect(moduleTestFileContent).toBeTruthy();
  expect(moduleIndexFileContent).toBeTruthy();
  expect(moduleReadMeFileContent).toBeTruthy();
  expect(moduleTodosFileContent).toBeTruthy();

  expect(moduleWithoutDirFileContent).toMatchSnapshot();
  expect(moduleFileContent).toMatchSnapshot();
  expect(moduleTestFileContent).toMatchSnapshot();
  expect(moduleIndexFileContent).toMatchSnapshot();
  expect(moduleReadMeFileContent).toMatchSnapshot();
  expect(moduleTodosFileContent).toMatchSnapshot();
});
