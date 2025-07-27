// Contexto global para mostrar notificaciones tipo toast

import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Notification from '../components/Notification';
import { AnimatePresence } from 'framer-motion';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notis, setNotis] = useState([]);

  const showNotification = useCallback((type, message, duration = 4000) => {
    const id = Date.now();
    setNotis(n => [...n, { id, type, message }]);
    setTimeout(() => {
      setNotis(n => n.filter(not => not.id !== id));
    }, duration);
  }, []);

  const remove = id => setNotis(n => n.filter(not => not.id !== id));

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        <AnimatePresence>
          {notis.map(n => (
            <Notification key={n.id} type={n.type} onClose={() => remove(n.id)}>
              {n.message}
            </Notification>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotification = () => useContext(NotificationContext);
