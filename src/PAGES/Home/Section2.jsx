import { useBlog } from '../../context/BlogContext.jsx';
import { Link } from 'react-router-dom';

const Section2 = () => {
    const { data, handleDelete } = useBlog();


    return (
        <div className="container">
            <div className="row mx-auto mt-2 mb-5">
                {data.length > 0 ? data.map((items, index) => (
                    <div className="col-lg-6 mt-4" key={index}>
                        <div className="card">
                            <img src={items.image} height={350} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h6 className="card-title">{items.imageDescription},
                                    <span style={{ color: '#5A639C' }}>Created at : {items.date}</span>
                                </h6>
                                <p className="card-text">Title : {items.title}</p>
                                <Link to={`/ShowMorePage/${items.id}`} className="btn btn-dark">Show More</Link>
                                <button onClick={() => handleDelete(items.id)} className="btn btn-danger ms-5">Delete</button>
                            </div>
                        </div>
                    </div>
                )) : <p className="text-center fs-1 mt-5 text-danger">Loading.......</p>}
            </div>
        </div>
    );
};

export default Section2;
