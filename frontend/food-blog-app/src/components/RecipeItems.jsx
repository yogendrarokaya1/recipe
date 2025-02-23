
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const RecipeCard = () => {
    const [recipes, setRecipes] = useState([]);

    // Fetch all recipes when the component mounts
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/recipes/all');
                setRecipes(response.data);  // Store recipes in state
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleFavorite = (recipeId) => {
        // Implement favorite logic here (could be a PUT request to update favorite status)
        console.log('Add to favorite:', recipeId);
    };

    return (
        
        <div className="recipe-cards-container">
            {recipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                    <Link to={`/recipedetail/${recipe.id}`} className="recipe-link">
                        <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />
                        <h3>{recipe.title}</h3>
                        <p>{recipe.time}</p>
                    </Link>

                    <button>Add to favourite</button>

                </div>
            ))}
        </div>
    );
};

export default RecipeCard;
