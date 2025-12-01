const request = require('supertest');
const app = require('../index.js'); // Asegúrate de exportar app

describe('API Health', () => {
  test('GET /health debería devolver status 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET / debería devolver HTML', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Hola');
  });
});