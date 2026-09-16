import { useState } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
 
import { database } from '../config/firebase';
 
export const useAddUsuario = () => {
  const [saving, setSaving] = useState(false);
 
  const addUser = async ({
    nombre,
    fechaNacimiento,
    carnet,
    URLImage,
  }) => {
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
 
    const cleanName = nombre.trim();
 
    const cleanFecha =
      fechaNacimiento.trim();
 
    const cleanCarnet = carnet.trim();
 
    const cleanURL =
      URLImage?.trim() || '';
 
    try {
      setSaving(true);
 
      const docRef = await addDoc(
        collection(database, 'usuarios'),
        {
          nombre: cleanName,
          fechaNacimiento: cleanFecha,
          carnet: cleanCarnet,
          URLImage: cleanURL,
          creado: serverTimestamp(),
        }
      );
 
      return docRef;
    } catch (error) {
      console.error(
        'Error guardando usuario en Firestore:',
        error
      );
 
      throw error;
    } finally {
      setSaving(false);
    }
  };
 
  return {
    addUser,
    saving,
  };
};
 