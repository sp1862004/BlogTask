import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import db from '../../../firebase';

const ShowMorePage = () => {
    const { id } = useParams();
    const [item, setItem] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dbRef = ref(db, `BlogName/${id}`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setItem(snapshot.val());
            } else {
                console.log("No such item found!");
            }
        };

        fetchData();
    }, [id]);

    if (!item) {
        return <p>Loading...</p>;
    }


    return (
        <div className="container mb-5">
            <h1 className='mt-5 mb-5'>Blog </h1>
           
                <div className="row">
                    <div className="col-lg-12 border p-3 shadow-lg rounded">
                        <img src={item.image} height={500} className="card-img-top shadow-lg rounded" alt="..." />
                        <div className="card-body">
                            <h6 className="card-title">{item.imageDescription}, <span style={{ color: '#5A639C' }}>Created at: {item.date}</span></h6>
                            <p className="card-text mt-4 mb-3"><b>Title</b> : {item.title}</p>
                            <p className="card-text">{item.textarea}</p>
                        </div>
                    </div>
                </div>
                <Link to={`/edit/${id}`} className='btn btn-warning text-center  py-1 mb-3 d-grid mx-auto mt-4 shadow-lg rounded' >Update</Link>
           
        </div>
    );
};

export default ShowMorePage;
