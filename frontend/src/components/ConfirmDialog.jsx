// Modal reutilizable de confirmación con animaciones
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <p className="mb-6 text-gray-700">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Aceptar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

ConfirmDialog.propTypes = {
  message: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
