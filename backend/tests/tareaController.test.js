const tareaController = require('../controllers/tareaController');
const Tarea = require('../models/Tarea');

jest.mock('../models/Tarea');

describe('actualizarTarea', () => {
  test('usa empresaId para buscar la tarea', async () => {
    const req = { params: { id: '1' }, empresaId: 'empresa1', body: { titulo: 'n' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const tareaMock = { _id: '1', empresaId: 'empresa1' };
    Tarea.findOneAndUpdate.mockResolvedValue(tareaMock);

    await tareaController.actualizarTarea(req, res);

    expect(Tarea.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: '1', empresaId: 'empresa1' },
      req.body,
      { new: true, runValidators: true }
    );
  });
});
