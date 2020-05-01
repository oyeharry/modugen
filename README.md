# modugen [![Build Status](https://github.com/oyeharry/modugen/workflows/modugen-master/badge.svg)](https://github.com/oyeharry/modugen/actions?query=workflow%3Amodugen-master)

> Simple micro generator for simple needs!

## Getting Started

1. Create a template file at your project root like this `templates/CoreModule.[pascalCase].js`

2. Add some template code in your template file.

```javascript
import React from 'react';

function ${pascalCase}(props) {
    return <button>My Button</button>;
}

export default ${pascalCase};
```

3. Execute following command and your `BaseButton.js` module will be generated at your root.

```bash
npx modugen CoreModule.BaseButton
```

## License

MIT ©
