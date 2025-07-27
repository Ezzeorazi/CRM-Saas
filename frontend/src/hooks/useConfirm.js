// Hook para utilizar el diálogo de confirmación desde cualquier componente
import { useConfirmContext } from '../context/ConfirmProvider.jsx';

export default function useConfirm() {
  return useConfirmContext();
}
