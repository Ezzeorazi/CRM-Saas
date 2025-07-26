const ordenController = require('../controllers/ordenProduccionController');
const Orden = require('../models/OrdenProduccion');

jest.mock('../models/OrdenProduccion');

describe('eliminarOrden', () => {
  test('solo elimina dentro de la empresa', async () => {
    const req = { params: { id: '2' }, empresaId: 'empresa1' };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    Orden.findOneAndDelete.mockResolvedValue({});

    await ordenController.eliminarOrden(req, res);

    expect(Orden.findOneAndDelete).toHaveBeenCalledWith({ _id: '2', empresaId: 'empresa1' });
  });
});
