// Importa productos desde un archivo XLSX.
import { useState } from 'react';
import * as XLSX from 'xlsx';
import clienteAxios from '../../api/clienteAxios';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

function ImportarProductos() {
  const [productosExcel, setProductosExcel] = useState([]);
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !(file instanceof Blob)) {
      showNotification('error', '❌ Archivo inválido. Seleccioná un archivo Excel válido.');
      setProductosExcel([]);
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsed = XLSX.utils.sheet_to_json(sheet);

        if (parsed.length === 0) {
          showNotification('error', '❌ El archivo está vacío o no tiene encabezados válidos.');
          setProductosExcel([]);
          return;
        }

        const columnasObligatorias = ['nombre', 'sku', 'precio', 'stock', 'categoria', 'activo'];
        const columnasArchivo = Object.keys(parsed[0]);

        const columnasFaltantes = columnasObligatorias.filter(col => !columnasArchivo.includes(col));

        if (columnasFaltantes.length > 0) {
          showNotification('error', `❌ Faltan columnas obligatorias: ${columnasFaltantes.join(', ')}`);
          setProductosExcel([]);
          return;
        }

        setProductosExcel(parsed);
        // limpiar notificación previa si existiera
      } catch (error) {
        showNotification('error', '❌ Error al procesar el archivo Excel.');
        setProductosExcel([]);
      }
    };

    reader.onerror = () => {
      showNotification('error', '❌ Error al leer el archivo.');
      setProductosExcel([]);
    };

    reader.readAsArrayBuffer(file);
  };

  const enviarProductos = async () => {
    if (!token) {
      showNotification('error', '❌ No estás autenticado. Iniciá sesión.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await clienteAxios.post('/productos/importar', productosExcel);
      showNotification('success', `✅ ${data.insertados} productos importados correctamente`);
      setProductosExcel([]);
    } catch (error) {
      console.error(error.response?.data);
      showNotification('error', '❌ Error al importar productos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📥 Importar productos desde Excel</h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="block mb-4 w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
      />

      {productosExcel.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>{productosExcel.length}</strong> productos listos para importar:
          </p>
          <div className="overflow-auto max-h-60 border border-gray-200 rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left text-gray-600">
                <tr>
                  {Object.keys(productosExcel[0]).map((key) => (
                    <th key={key} className="p-2 border-b">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productosExcel.slice(0, 5).map((prod, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    {Object.values(prod).map((val, i) => (
                      <td key={i} className="p-2">{String(val)}</td>
                    ))}
                  </tr>
                ))}
                {productosExcel.length > 5 && (
                  <tr>
                    <td colSpan="100%" className="p-2 italic text-gray-500 text-center">
                      ...y {productosExcel.length - 5} más
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button
            onClick={enviarProductos}
            disabled={loading}
            className={`mt-4 px-6 py-2 rounded text-white font-medium ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Importando...' : '✅ Confirmar importación'}
          </button>
        </div>
      )}

    </div>
  );
}

export default ImportarProductos;
