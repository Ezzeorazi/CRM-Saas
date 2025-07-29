const presupuestoController = require('../controllers/presupuestoController');
const Presupuesto = require('../models/Presupuesto');
const Empresa = require('../models/Empresa');

jest.mock('../models/Presupuesto');
jest.mock('../models/Empresa');
jest.mock('pdfkit', () => {
  return jest.fn().mockImplementation(() => ({
    pipe: jest.fn(),
    fontSize: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnThis(),
    moveDown: jest.fn().mockReturnThis(),
    end: jest.fn()
  }));
});

describe('descargarPDF', () => {
  test('busca presupuesto dentro de la empresa', async () => {
    const presupuestoMock = { _id: '1', productos: [], total: 0, createdAt: new Date(), cliente: { nombre: 'c' } };
    const query = {
      populate: jest.fn().mockReturnThis(),
      then: (resolve) => Promise.resolve(resolve(presupuestoMock))
    };
    Presupuesto.findOne.mockReturnValue(query);

    Empresa.findById.mockResolvedValue({ nombre: 'Empresa', logoUrl: '' });

    const req = { params: { id: '1' }, empresaId: 'empresa1' };
    const res = { setHeader: jest.fn() };

    await presupuestoController.descargarPDF(req, res);

    expect(Presupuesto.findOne).toHaveBeenCalledWith({ _id: '1', empresaId: 'empresa1' });
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
  });
});
