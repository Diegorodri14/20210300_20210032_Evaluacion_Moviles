import {
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
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
 
  const updateUsuario = async (
    id,
    {
      nombre,
      fechaNacimiento,
      carnet,
      URLImage,
    }
  ) => {
    if (!id) {
      throw new Error(
        'No se encontró el ID del usuario.'
      );
    }
 
    if (!nombre || !nombre.trim()) {
      throw new Error(
        'El nombre del estudiante es obligatorio.'
      );
    }
 
    if (
      !fechaNacimiento ||
      !fechaNacimiento.trim()
    ) {
      throw new Error(
        'La fecha de nacimiento es obligatoria.'
      );
    }
 
    if (!carnet || !carnet.trim()) {
      throw new Error(
        'El carnet institucional es obligatorio.'
      );
    }
 
    const usuarioRef = doc(
      database,
      'usuarios',
      id
    );
 
    await updateDoc(
      usuarioRef,
      {
        nombre: nombre.trim(),
 
        fechaNacimiento:
          fechaNacimiento.trim(),
 
        carnet:
          carnet.trim(),
 
        URLImage:
          URLImage?.trim() || '',
 
        actualizado:
          serverTimestamp(),
      }
    );
  };
 
  return {
    removeUsuario,
    updateUsuario,
  };
};
 