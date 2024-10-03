import { push, ref, set } from 'firebase/database';
import { useForm } from 'react-hook-form';
import db from '../../../firebase';
import { useNavigate } from 'react-router-dom';

const Write1 = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const navigate = useNavigate();

   
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            
            const reader = new FileReader();
            reader.onloadend = () => {
               
                setValue('image', reader.result);
            };
            reader.readAsDataURL(file); 
        }
    };

    const onSubmit = (data) => {
        event.preventDefault();
        const date = new Date(data.date);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        const formattedData = {
            ...data,
            date: `${day} ${month} ${year}`
        };
        console.log(formattedData);

        const newDocRef = push(ref(db, "BlogName"));
        set(newDocRef, formattedData).then(() => {
            alert("Data saved successfully");
            reset();
            navigate("/"); 
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h6 className='mb-4 mt-3 text-center Start-Journey'>Tell Your Story</h6>
                <div className="container">
                    <div className="row d-flex mx-auto justify-content-center">
                        <div className="col-lg-10 mx-auto mt-3 mb-2">
                            <input type="text" className='form-control shadow py-3 border-primary title' {...register('title')} autoFocus placeholder='Title' />
                        </div>
                        <div className="col-lg-7 mt-3">
                            <label htmlFor="imageInput" className="form-label" style={{ color: '#365E32' }}>Upload Image</label>
                            <input type="file" className='form-control py-3 shadow border-primary' id="imageInput" onChange={handleFileChange} />
                        </div>
                        <div className="col-lg-3 mt-3 ">
                            <label htmlFor="dateInput" className="form-label" style={{ color: '#365E32' }}>Enter Current Date</label>
                            <input type="date" className='form-control py-3 shadow border-primary' id="dateInput" {...register('date')} />
                        </div>

                        <div className="col-lg-10 mt-3">
                            <label htmlFor="imageDescription" className="form-label" style={{ color: '#365E32' }}>Enter Image Description</label>
                            <input type="text" className='form-control py-3 shadow border-primary' placeholder='Add Your Image Name' {...register('imageDescription')} />
                        </div>
                    </div>
                    <div className="row d-grid mt-3 Start-Journey">
                        <div className="col-lg-10 mx-auto mb-4">
                            <label htmlFor="journeyText" className="form-label fs-6" style={{ color: '#365E32' }}>Start Your Journey & Let The World Read It...</label>
                            <textarea className="form-control shadow py-3 border-primary" id="journeyText" {...register('textarea')} rows="12"></textarea>
                        </div>
                    </div>
                </div>
                <button className='btn btn-success text-center mx-auto py-1 mb-3 d-grid mx-auto'>Submit</button>
            </form>
        </>
    );
}

export default Write1;
