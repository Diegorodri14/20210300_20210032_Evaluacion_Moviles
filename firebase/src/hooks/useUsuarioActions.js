import {
  deleteDoc,
  doc,
} from 'firebase/firestore';
 
import {
  database,
} from '../config/firebase';
 
export const useUsuarioActions = () => {
  const removeUsuario = async (id) => {
    if (!id) {
      throw new Error(
        'No se encontró el ID del usuario.'
      );
    }
 
    await deleteDoc(
      doc(
        database,
        'usuarios',
        id
      )
    );
  };
 
  return {
    removeUsuario,
  };
};
 