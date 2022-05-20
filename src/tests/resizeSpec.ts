import { resize, params } from '../routes/api/resize';
import { promises as fs } from 'fs';
import path from 'path';

describe('Testing the functionality of API:', (): void => {
    describe('<params> function tests:', (): void => {
        it('Test 1: with no parameters.', (): void => {
            expect(params({})).toEqual({
                fileName: 'undefined',
                height: 0,
                width: 0,
                placeholder: true,
            });
        });
        it('Test 2: with wrong parameters.', (): void => {
            expect(params({ noName: '0' })).toEqual({
                fileName: 'undefined',
                height: 0,
                width: 0,
                placeholder: true,
            });
        });
        it('Test 3: true parameters.', (): void => {
            expect(
                params({ name: 'notExisting.jpg', height: '120', width: '150' })
            ).toEqual({
                fileName: 'notExisting.jpg',
                height: 120,
                width: 150,
                placeholder: true,
            });
        });
        it('Test 4: placeholder parameter set to false.', (): void => {
            expect(params({ name: 'fjord.jpg', placeholder: 'false' })).toEqual(
                {
                    fileName: 'fjord.jpg',
                    height: 0,
                    width: 0,
                    placeholder: false,
                }
            );
        });
    });

    describe('<resize> function tests:', (): void => {
        beforeAll((): void => {
            const directory = path.resolve(__dirname, '../../images/thumbs');
            ['fjord_12_12.jpg', 'fjord_13_13.jpg'].forEach(
                async (image: string): Promise<void> => {
                    await fs.unlink(path.join(directory, image));
                }
            );
        });
        it('Test 1: undefined name.', async (): Promise<void> => {
            const response = await resize({
                fileName: 'undefined',
                height: 0,
                width: 0,
                placeholder: false,
            });
            expect(response).toEqual('wrong request');
        });
        it('Test 2: not existing name.', async (): Promise<void> => {
            const response = await resize({
                fileName: 'notExisting.jpg',
                height: 0,
                width: 0,
                placeholder: false,
            });
            expect(response).toEqual('wrong name');
        });
        it('Test 3: existing name: not placeholder: old request.', async (): Promise<void> => {
            const response = await resize({
                fileName: 'fjord.jpg',
                height: 0,
                width: 0,
                placeholder: false,
            });
            expect(response).toEqual('existing');
        });
        it('Test 4: existing name: placeholder: old request.', async (): Promise<void> => {
            const response = await resize({
                fileName: 'fjord.jpg',
                height: 0,
                width: 0,
                placeholder: true,
            });
            expect(response).toEqual('fjord_0_0.jpg');
        });
        it('Test 5: existing name: not placeholder: new request.', async (): Promise<void> => {
            const response = await resize({
                fileName: 'fjord.jpg',
                height: 13,
                width: 13,
                placeholder: false,
            });
            expect(response).toEqual('processing');
        });
        it('Test 6: existing name: placeholder: new request.', async (): Promise<void> => {
            const response = await resize({
                fileName: 'fjord.jpg',
                height: 12,
                width: 12,
                placeholder: true,
            });
            expect(response).toEqual('fjord_12_12.jpg');
        });
    });
});
