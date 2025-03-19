import DataUriParser from 'datauri/parser.js';
import path from 'path';

const getDataUri = (file) => {
    // Check if file exists and has required properties
    if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid file input. Make sure the file object has originalname and buffer.");
    }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname); // extname already returns a string
    return parser.format(extName, file.buffer);
}

export default getDataUri;
