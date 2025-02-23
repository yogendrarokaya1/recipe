import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams();  // Get recipe ID from the URL
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
                setRecipe(response.data);  // Store the recipe details in state
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        fetchRecipe();
    }, [id]);  // Fetch recipe when ID changes

    if (!recipe) return <p>Loading...</p>;

    // Function to render ingredients and instructions as lists
    const renderList = (text) => {
        return text
            .split(',') // Split by comma
            .map((item, index) => <li key={index}>{item.trim()}</li>); // Trim spaces and return list items
    };

    return (
        <div className="recipe-detail-container">
            <div className='recipe-detail-title'>
                <h2>{recipe.title}</h2>
            </div>
            <div className='recipe-detail-image'>
                {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} />}
            </div>
            <div className='recipe-detail-time'>
                <p><strong>Time: </strong>{recipe.time}</p>
            </div>
            <div className='recipe-detail-desc'>
                <h4>Descriptions: </h4>
                <p>
                {recipe.description}</p>
            </div>
            <div className='recipe-detail-ing'>
                <p><strong>Ingredients: </strong></p>
                <ul>{renderList(recipe.ingredients)}</ul> {/* Display ingredients as a list */}
            </div>
            <div className='recipe-detail-ins'>
                <p><strong>Instructions: </strong></p>
                <ul>{renderList(recipe.instructions)}</ul> {/* Display instructions as a list */}
            </div>
        </div>
    );
};

export default RecipeDetail;
