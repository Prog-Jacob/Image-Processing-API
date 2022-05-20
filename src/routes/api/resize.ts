import { promises as fs } from 'fs';
import express from 'express';
import sharp from 'sharp';
import path from 'path';

interface requestObj {
    fileName: string;
    height: number;
    width: number;
    placeholder: boolean;
}
const routes = express.Router();
const root = path.resolve(__dirname, '../../../');

const params = (request: unknown): requestObj => {
    const query = request as Record<string, unknown>;
    let fileName = String(query.name);
    let placeholder = true;
    let height = 0;
    let width = 0;

    if (fileName !== '' && fileName !== 'undefined') {
        if (
            !isNaN(parseInt(String(query.height))) &&
            parseInt(String(query.height)) > 0
        )
            height = parseInt(String(query.height));
        else if (
            String(query.height) == '' ||
            parseInt(String(query.height)) <= 0
        )
            fileName = 'undefined';

        if (
            !isNaN(parseInt(String(query.width))) &&
            parseInt(String(query.width)) > 0
        )
            width = parseInt(String(query.width));
        else if (
            String(query.width) == '' ||
            parseInt(String(query.width)) <= 0
        )
            fileName = 'undefined';

        if (String(query.placeholder) === 'false') placeholder = false;
    }

    return { fileName, height, width, placeholder };
};

const resize = async (request: requestObj): Promise<string> => {
    const inName = request.fileName;

    if (inName !== 'undefined') {
        const inDir = await fs.readdir(path.join(root, 'images'));
        const outDir = await fs.readdir(path.join(root, 'images/thumbs'));
        const outName =
            inName.slice(0, inName.lastIndexOf('.')) +
            `_${request.width}_${request.height}` +
            inName.slice(inName.lastIndexOf('.'));

        if (inDir.indexOf(inName) !== -1) {
            if (outDir.indexOf(outName) == -1) {
                const image = sharp(path.join(root, 'images', inName));

                if (request.height == 0 && request.width == 0)
                    image.toFile(path.join(root, 'images/thumbs', outName));
                else if (request.height == 0)
                    await image
                        .resize({ width: request.width })
                        .toFile(path.join(root, 'images/thumbs', outName));
                else if (request.width == 0)
                    await image
                        .resize({ height: request.height })
                        .toFile(path.join(root, 'images/thumbs', outName));
                else
                    await image
                        .resize(request.width, request.height)
                        .toFile(path.join(root, 'images/thumbs', outName));

                if (request.placeholder == false) return 'processing';
                return outName;
            }
            if (request.placeholder == false) return 'existing';
            return outName;
        }
        return 'wrong name';
    }
    return 'wrong request';
};

routes.get('/', (req: express.Request, res: express.Response): void => {
    const query = req.query;

    resize(params(query)).then((check: string): void => {
        switch (check) {
            case 'wrong request':
                res.send('Please enter right parameters!');
                break;
            case 'wrong name':
                res.send('Please choose existing image!');
                break;
            case 'existing':
            case 'processing':
                res.redirect('/process');
                break;
            default:
                res.sendFile(
                    path.join(path.join(root, 'images/thumbs', check))
                );
        }
    });
});

export default routes;
export { params, resize };
