/* eslint-disable @typescript-eslint/ban-types */
import path from 'path';
import express from 'express';
import resize from './api/resize';
import { promises as fs } from 'fs';
import createHome from '../frontend/JS/home';

const routes = express.Router();
const root = path.resolve(__dirname, '../../');
const htmlFile = path.join(root, 'dist/frontend/HTML/process.html');

const grabImages = async (dir: string): Promise<string> => {
    let appendImages = '';
    const directory = path.join(root, dir);
    const allFiles = await fs.readdir(directory);

    for (const image of allFiles) {
        if (image === 'thumbs') continue;
        appendImages += `<div class="image-tile">
                <a href="./process/resize?name=${image}" target="_blank" rel="noopener noreferrer">
                    <img src="./process/resize?name=${image}&width=400" alt="Landscape image." />
                </a>
                <button class="open-window">
                    <h2>&lt;${
                        image[0].toUpperCase() +
                        image.slice(1, image.lastIndexOf('.'))
                    }&gt;</h2>
                </button>
            </div>`;
    }
    return appendImages;
};

const processHTML = async (): Promise<void> => {
    const images: string = await grabImages('images');
    fs.writeFile(htmlFile, createHome(images));
};

routes.get('/', (req: express.Request, res: express.Response): void => {
    processHTML().then(() => {
        res.sendFile(htmlFile);
    });
});
routes.use('/resize', resize);
export { routes, grabImages };
