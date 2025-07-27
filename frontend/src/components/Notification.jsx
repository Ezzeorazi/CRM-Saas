// Notificación reutilizable con variantes y animación

import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const icons = {
  success: CheckCircleIcon,
  error: ExclamationTriangleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

const styles = {
  success: 'border-green-500 bg-green-100 text-green-700',
  error: 'border-red-500 bg-red-100 text-red-700',
  warning: 'border-yellow-500 bg-yellow-100 text-yellow-700',
  info: 'border-blue-500 bg-blue-100 text-blue-700',
};

export default function Notification({ type = 'info', children, onClose }) {
  const Icon = icons[type] || InformationCircleIcon;
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-start gap-2 border-l-4 p-4 rounded shadow ${styles[type]}`}
    >
      <Icon className="w-5 h-5 mt-0.5" />
      <div className="text-sm flex-1">{children}</div>
      <button onClick={onClose} aria-label="Cerrar" className="text-inherit">
        <XMarkIcon className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
