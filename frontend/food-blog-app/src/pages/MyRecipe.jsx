import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/recipes/myrecipes', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchUserRecipes();
    }, []);

    // Delete Recipe
    const deleteRecipe = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/recipes/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setRecipes(recipes.filter(recipe => recipe.id !== id));  // Remove the deleted recipe from state
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    // Edit Recipe
    const editRecipe = (id) => {
        navigate(`/edit-recipe/${id}`);  // Redirect to the edit page with the recipe ID
    };

    return (
        <div className='myrecipe-container'>
            <div className="recipe-cards-container">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />
                        <h3>{recipe.title}</h3>
                        <p>{recipe.time}</p>
                        <div className="button-group">
                            <Link to={`/editrecipe/${recipe.id}`}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => deleteRecipe(recipe.id)} className="delete-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyRecipes;
