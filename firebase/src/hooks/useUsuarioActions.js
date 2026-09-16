import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { database } from '../config/firebase';
 
export const useAddUsuario = () => {
  const [saving, setSaving] = useState(false);
 
  const addUser = async ({
    nombre,
    fechaNacimiento,
    carnet,
    URLImage,
  }) => {
    const cleanName = nombre.trim();
    const cleanFecha = fechaNacimiento.trim();
    const cleanCarnet = carnet.trim();
    const cleanURL = URLImage.trim();
 
    if (!cleanName) {
      throw new Error('El nombre del estudiante es obligatorio.');
    }
 
    if (!cleanFecha) {
      throw new Error('La fecha de nacimiento es obligatoria.');
    }
 
    if (!cleanCarnet) {
      throw new Error('El carnet institucional es obligatorio.');
    }
 
    setSaving(true);
 
    try {
      await addDoc(collection(database, 'usuarios'), {
        nombre: cleanName,
        fechaNacimiento: cleanFecha,
        carnet: cleanCarnet,
        URLImage: cleanURL,
        creado: new Date(),
      });
    } finally {
      setSaving(false);
    }
  };
 
  return {
    addUser,
    saving,
  };
};
 