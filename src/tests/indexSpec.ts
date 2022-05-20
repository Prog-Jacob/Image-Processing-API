import supertest from 'supertest';
import app from '../index';

describe('Testing endpoints responses:', (): void => {
    const request = supertest(app);

    describe('</> endpoint test:', (): void => {
        it('Gets the redirecting homepage endpoint.', async (): Promise<void> => {
            const response = await request.get('/');
            expect(response.redirect).toBe(true);
            expect(response.type).toBe('text/plain');
            expect(response.header.location).toBe('/process');
        });
    });

    describe('</home> endpoint test:', (): void => {
        it('Gets the home endpoint.', async (): Promise<void> => {
            const response = await request.get('/home');
            expect(response.status).toBe(200);
            expect(response.redirect).toBe(false);
            expect(response.type).toBe('text/html');
        });
    });

    describe('</process> endpoint test:', (): void => {
        it('Gets the process endpoint.', async (): Promise<void> => {
            const response = await request.get('/process');
            expect(response.status).toBe(200);
            expect(response.type).toBe('text/html');
        });
    });

    describe('</resize> endpoint test:', (): void => {
        it('Resizing existing image as not placeholder.', async (): Promise<void> => {
            const response = await request.get(
                '/process/resize?name=fjord.jpg&placeholder=false'
            );
            expect(response.type).toBe('text/plain');
            expect(response.redirect).toBe(true);
        });
        it('Resizing existing image as placeholder.', async (): Promise<void> => {
            const response = await request.get(
                '/process/resize?name=fjord.jpg'
            );
            expect(response.type).toBe('image/jpeg');
            expect(response.redirect).toBe(false);
        });
        it('Resizing non-existing image as not placeholder.', async (): Promise<void> => {
            const response = await request.get(
                '/process/resize?name=non-existing.jpg&placeholder=false'
            );
            expect(response.type).toBe('text/html');
            expect(response.redirect).toBe(false);
        });
        it('Resizing non-existing image as placeholder.', async (): Promise<void> => {
            const response = await request.get(
                '/process/resize?name=non-existing.jpg'
            );
            expect(response.type).toBe('text/html');
            expect(response.redirect).toBe(false);
        });
    });
});
