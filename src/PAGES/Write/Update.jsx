import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ref, get, set } from 'firebase/database';
import db from '../../../firebase';

const Update = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        try {
            const dbRef = ref(db, `BlogName/${id}`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                reset(data);
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const dbRef = ref(db, `BlogName/${id}`);
            await set(dbRef, data);
            alert("Data saved successfully!");
            reset();
            navigate('/')
            // history.push('/show');
        } catch (error) {
            console.error("Error saving document: ", error);
            alert("Error: " + error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className='mb-4 mt-3 text-center Start-Journey'>Tell Your Story</p>
                <div className="container">
                    <div className="row d-flex mx-auto justify-content-center">
                        <div className="col-lg-10 mx-auto mt-3 mb-2">
                            <input type="text" className='form-control shadow py-3 border-primary title' {...register('title')} autoFocus placeholder='Title' />
                        </div>
                        <div className="col-lg-7 mt-3">
                            <label htmlFor="imageLink" className="form-label" style={{ color: '#365E32' }}>Enter Image Link</label>
                            <input type="text" className='form-control py-3 shadow border-primary image-link' id="imageLink" {...register('image')} placeholder='Enter Image Link' />
                        </div>
                        <div className="col-lg-3 mt-3 ">
                            <label htmlFor="dateInput" className="form-label" style={{ color: '#365E32' }}>Enter Current Date</label>
                            <input type="date" className='form-control py-3 shadow border-primary' id="dateInput" {...register('date')} />
                        </div>

                        <div className="col-lg-10 mt-3">
                            <label htmlFor="dateInput" className="form-label" style={{ color: '#365E32' }}>Enter Image Description</label>
                            <input type="text" className='form-control py-3 shadow border-primary  image-link' placeholder='Add Your Image Name' id="dateInput" {...register('imageDescription')} />
                        </div>
                    </div>
                    <div className="row d-grid mt-3 Start-Journey">
                        <div className="col-lg-10 mx-auto mb-4">
                            <label htmlFor="journeyText" className="form-label fs-6" style={{ color: '#365E32' }}>Start Your Journey & Let The World Read It...</label>
                            <textarea className="form-control shadow py-3 border-primary" id="journeyText" {...register('textarea')} rows="12"></textarea>
                        </div>
                    </div>
                </div>
                <button className='btn btn-success text-center mx-auto py-1 mb-3 d-grid mx-auto'>Update</button>
            </form>
        </>
    );
};

export default Update;
