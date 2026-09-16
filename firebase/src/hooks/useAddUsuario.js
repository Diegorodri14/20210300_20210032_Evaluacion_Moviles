import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { database } from '../config/firebase';

export const useAddUsuario = () => {
  const [saving, setSaving] = useState(false);

  const addUser = async ({ nombre, fecha, carnet, URL}) => {
    const cleanName = nombre.trim();
    const cleanFecha = fecha.trim();
    const cleanCarnet = carnet.trim();
    const cleanURL = URL.trim();

    if (!cleanName) {
      throw new Error('El nombre del producto es obligatorio.');
    }

    setSaving(true);

    try {
      await addDoc(collection(database, 'usuarios'), {
        nombre: cleanName,
        fecha: cleanFecha,
        carnet: cleanCarnet,
        URL: cleanURL,
        creado: new Date(),
      });
    } finally {
      setSaving(false);
    }
  };

  return { addUser, saving };
};