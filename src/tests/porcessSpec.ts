import { grabImages } from '../routes/process';
import createHome from '../frontend/JS/home';

describe('Testing the API webpage:', (): void => {
    it('Test <grabImages> on <images> folder.', async (): Promise<void> => {
        const result = await grabImages('images');
        expect(result.slice(0, 10)).toEqual('<div class');
    });

    it('Testing <createHome> with any string.', (): void => {
        expect(createHome('').slice(0, 9)).toBe('<!DOCTYPE');
    });
});
