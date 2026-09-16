import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { database } from '../config/firebase';
 
export const useUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const q = query(
      collection(database, 'usuarios'),
      orderBy('creado', 'desc')
    );
 
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const docs = querySnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
 
        setUsuarios(docs);
        setError(null);
        setLoading(false);
      },
      (snapshotError) => {
        console.error('Error al obtener usuarios:', snapshotError);
        setError('No se pudieron cargar los usuarios.');
        setLoading(false);
      }
    );
 
    return unsubscribe;
  }, []);
 
  return {
    usuarios,
    loading,
    error,
  };
};