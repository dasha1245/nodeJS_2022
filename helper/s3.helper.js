const path = require('node:path');

module.exports = {
    buildFileName: (fileName, itemType, itemId) => {
        const ext = path.extname(fileName); // fileName: bg.jpg;  ext: .jpg

        return `${itemType}/${itemId}/${Date.now()}${ext}`
    }
};



