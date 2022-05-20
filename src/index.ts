import { routes } from './routes/process';
import express from 'express';
import path from 'path';

const root = path.resolve(__dirname, '../dist/frontend');
const app = express();
const port = 5050;

app.use(express.static(root));
app.use('/process', routes);

app.get('/home', (req: express.Request, res: express.Response): void => {
    res.sendFile(path.join(root, 'HTML/home.html'));
});
app.get('/', (req: express.Request, res: express.Response): void => {
    res.redirect('/process');
});
app.listen(port, (): void => {
    console.log(`Server started at http://localhost:${port}`);
});

export default app;
