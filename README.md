# modugen [![Build Status](https://github.com/oyeharry/modugen/workflows/modugen-master/badge.svg)](https://github.com/oyeharry/modugen/actions?query=workflow%3Amodugen-master)

> Simple micro generator for simple needs!

## Usage

1. Add modugen to your project

   ```
   yarn add modugen --dev
   ```

2. Create `templates/CoreModule.[pascalCase].js` file at root of your project. `templates` directory is the default home for your all module templates.

   ```javascript
   import React from 'react';

   function ${pascalCase}(props) {
       return <button>${titleCase}</button>;
   }

   export default ${pascalCase};
   ```

3. Execute following command and your `BaseButton.js` module will be generated at your project root.
   ```
   yarn run modugen CoreModule.BaseButton
   ```

## Generating module directory

1. Create a module template directory structure like the following. Your CoreModule template directory is inside src directory now including all related files.

   ```
   ├── templates
   │   └── src
   │       └── CoreModule.[dashCase]
   │           ├── [camelCase].todo
   │           ├── [pascalCase].jsx
   │           ├── [pascalCase].test.js
   │           └── index.js
   ```

2. Run following command to generate `BaseButton` module.

   ```
   yarn run src.CoreModule.BaseButton
   ```

   The `BaseButton` module will be generated at your project root `src` directory like following.

   ```
   │── src
   │   └── base-button
   │       ├── baseButton.todo
   │       ├── BaseButton.jsx
   │       ├── BaseButton.test.js
   │       └── index.js
   ```

## Supported Case Formats

- **camelCase**: exampleFormatOfThis
- **snakeCase**: example_format_of_this
- **dashCase/hyphenatedCase/kebabCase**: example-format-of-this
- **dotCase**: example.format.of.this
- **pascalCase/properCase**: ExampleFormatOfThis
- **lowerCase**: example format of this
- **constantCase**: EXAMPLE_FORMAT_OF_THIS
- **titleCase**: Example Format Of This

## CLI Usage

    ```
    Usage
    $ modugen <path-to-template>.<module-name>
    Options
            --cwd current working directory
            --templateFilesDir templates directory to look for. Default is ./templates
            --destPath destination directory for output.
    Examples
    Look for template file name starting with 'CoreModule' inside 'templates/' and generate BaseButton module.
    $ modugen CoreModule.BaseButton

    Look for template file name starting with 'CoreModule' inside 'templates/src/' and generate BaseButton module.
    $ modugen src.CoreModule.BaseButton

    Look for template file name starting with 'PageModule' inside 'templates/src/pages' and generate HomePage module at 'src/pages/'.
    $ modugen src.pages.PageModule.HomePage
    ```

## API Usage

```javascript
import modugen from 'modugen';

/* Look for template file name starting with 'CoreModule'
 * inside './templates/' and generate BaseButton module.
 */
await modugen('CoreModule.BaseButton');

// With options to override defaultOptions
await modugen('CoreModule.BaseButton', {
  templateFilesDir: './my-module-templates',
  destPath: './modules',
});
```

#### options

Type: `object`

##### templateFilesDir

Type: `string`<br>
Default: `./templates`

templates directory to look for.

##### destPath

Type: `string`<br>
Default: ``

Output destination.

## License

MIT ©
