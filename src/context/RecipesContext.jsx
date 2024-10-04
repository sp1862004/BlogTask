 import { createContext, useContext, useState, useEffect } from 'react';
import { get, ref, remove, set } from 'firebase/database';
import db from '../../firebase';

const RecipesContext = createContext();

export const useRecipes = () => useContext(RecipesContext);

export const RecipesProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const getApi = async () => {
        const dbRef = ref(db, "RecipesName");
        const snapshot = await get(dbRef);
        let arr = [];
        if (snapshot.exists()) {
            for (const key in snapshot.val()) {
                const element = snapshot.val()[key];
                arr.push({ id: key, ...element });
            }
        }
        setData(arr);
    };

    const handleDelete = async (id) => {
        const dbRef = ref(db, `RecipesName/${id}`);
        await remove(dbRef);
        getApi();
    };

    const updateRecipes = async (id, newData) => {
        const dbRef = ref(db, `RecipesName/${id}`);
        await set(dbRef, newData);
        getApi();
    };

    useEffect(() => {
        getApi();
    }, []);

    return (
        <RecipesContext.Provider value={{ data, handleDelete, updateRecipes }}>
            {children}
        </RecipesContext.Provider>
    );
};
