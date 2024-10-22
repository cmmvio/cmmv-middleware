import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import cmmv from '@cmmv/server';
import cors from 'cors';
import helmet from 'helmet';
import _ from "../src/index";

let server;

beforeAll(async () => {
    const app = cmmv();
    app.use(_(cors()));
    app.use(_(helmet()));

    app.get("/", (req, res) => {
        res.json({ Hello: "World" });
    });

    app.get("/not-found", (req, res) => {
        res.status(404).end();
    });

    server = await app.listen({ host: "127.0.0.1", port: 3001 });
});

afterAll(async () => {
    if (server) {
        await server.close();
    }
});

describe('GET /', () => {
    it('should return Hello World with correct middlewares applied', async () => {
        //@ts-ignore
        const res = await request(server).get('/');
        
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ Hello: "World" });

        expect(res.headers).toHaveProperty('x-dns-prefetch-control');
        expect(res.headers).toHaveProperty('x-frame-options');
        expect(res.headers).toHaveProperty('x-xss-protection');

        expect(res.headers).toHaveProperty('access-control-allow-origin', '*');
    });
});

describe('GET /nonexistent', () => {
    it('should return 404 for nonexistent routes', async () => {
        //@ts-ignore
        const res = await request(server).get('/nonexistent');
        expect(res.status).toBe(404);
    });
});

describe('Middleware behavior', () => {
    it('should not add CORS header when CORS middleware is removed', async () => {
        const app = cmmv();
        app.use(_(helmet()));

        app.get("/no-cors", (req, res) => {
            res.json({ message: "No CORS here" });
        });

        const temporaryServer = await app.listen({ host: "127.0.0.1", port: 3002 });
        //@ts-ignore
        const res = await request(temporaryServer).get('/no-cors');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: "No CORS here" });
        expect(res.headers).not.toHaveProperty('access-control-allow-origin');

        await temporaryServer.close();
    });

    it('should return 404 for unsupported HTTP methods', async () => {
        //@ts-ignore
        const res = await request(server).put('/');
        expect(res.status).toBe(404);
    });
});