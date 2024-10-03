import { createContext, useContext, useState, useEffect } from 'react';
import { get, ref, remove, set } from 'firebase/database';
import db from '../../firebase';

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const getApi = async () => {
        const dbRef = ref(db, "BlogName");
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
        const dbRef = ref(db, `BlogName/${id}`);
        await remove(dbRef);
        getApi(); 
    };

    const updateBlog = async (id, newData) => {
        const dbRef = ref(db, `BlogName/${id}`);
        await set(dbRef, newData);
        getApi(); 
    };

    useEffect(() => {
        getApi();
    }, []);

    return (
        <BlogContext.Provider value={{ data, handleDelete, updateBlog }}>
            {children}
        </BlogContext.Provider>
    );
};
