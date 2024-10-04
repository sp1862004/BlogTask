import React, { useEffect, useState } from 'react';
import { useRecipes } from '../../context/RecipesContext';
import { ref, onValue } from 'firebase/database';
import db from '../../../firebase'; 
import { Link } from 'react-router-dom';

const Section2 = () => {
    const { data, handleDelete } = useRecipes();
    const [recipes, setRecipes] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');  

    useEffect(() => {
        
        const recipeRef = ref(db, 'RecipesName');
        onValue(recipeRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const recipeList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setRecipes(recipeList);
            }
        });
    }, []);

    
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.Cuisinetype.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control shadow-lg p-3 mb-5 bg-body-tertiary rounded"
                        placeholder="Search for recipes by title or cuisine..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                {filteredRecipes.map((recipe) => (
                    <div key={recipe.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-lg border-0 animated fadeIn">
                            <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                            <div className="card-body">
                                <h5 className="card-title">{recipe.title}</h5>
                                <p className="card-text">
                                    <strong>Cuisine:</strong> {recipe.Cuisinetype}<br />
                                    <strong>Time:</strong> {recipe.Time}<br />
                                    <strong>Ingredients:</strong> {recipe.Ingredients}
                                </p>
                                <Link to={`/ShowMorePage/${recipe.id}`} className="btn btn-dark">Show More</Link>
                                <button onClick={() => handleDelete(recipe.id)} className="btn btn-danger ms-5">Delete</button>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Posted on {recipe.date}</small>
                            </div>
                        </div>
                    </div>
                ))}

                
                {filteredRecipes.length === 0 && (
                    <div className="text-center fs-1 mt-5 text-danger mb-5">
                        <h5>Loading.......</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Section2;

