import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { database } from '../config/firebase';

export const useUsuarioActions = () => {
  const removeUser = async (id) => {
    await deleteDoc(doc(database, 'usuarios', id));
  };

  return { removeUser };
};