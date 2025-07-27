// Proveedor global que maneja los modales de confirmación
import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState(null); // { message, resolve }

  const confirm = useCallback((message) => {
    return new Promise(resolve => {
      setConfirmState({ message, resolve });
    });
  }, []);

  const handleCancel = () => {
    if (confirmState?.resolve) confirmState.resolve(false);
    setConfirmState(null);
  };

  const handleConfirm = () => {
    if (confirmState?.resolve) confirmState.resolve(true);
    setConfirmState(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {confirmState && (
        <ConfirmDialog
          message={confirmState.message}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </ConfirmContext.Provider>
  );
};

ConfirmProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useConfirmContext = () => useContext(ConfirmContext);
