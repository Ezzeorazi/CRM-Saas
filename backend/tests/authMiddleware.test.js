const jwt = require('jsonwebtoken');
const { verificarToken } = require('../middleware/authMiddleware');

beforeAll(() => {
  process.env.JWT_SECRET = 'testsecret';
});

describe('verificarToken', () => {
  test('debe llamar next cuando el token es válido', () => {
    const payload = { empresaId: '123', rol: 'admin' };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    verificarToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.empresaId).toBe(payload.empresaId);
  });

  test('debe responder 401 si no hay token', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ mensaje: 'Token no proporcionado' });
    expect(next).not.toHaveBeenCalled();
  });
});
