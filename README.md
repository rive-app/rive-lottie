## Example

```js
const fs = require('fs');
const converter = require('./src/index');

const buffer = fs.readFileSync('./new_file_4.riv');

const animationsData = converter(buffer);

animationsData.forEach((anim, index) => {
    fs.writeFile(
        `./data_rive_${index}.json`,
        JSON.stringify(anim, null, 2),
        () => {},
    );
})
```
