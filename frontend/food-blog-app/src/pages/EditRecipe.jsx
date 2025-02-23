import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {
    const { id } = useParams(); // Get the recipe ID from URL params
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        ingredients: '',
        instructions: '',
        description: '',
        file: null
    });
    const navigate = useNavigate(); // Using useNavigate hook

    useEffect(() => {
        // Fetch the recipe data when the component loads
        const fetchRecipe = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/recipes/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                setRecipeData({
                    title: response.data.title,
                    time: response.data.time,
                    ingredients: response.data.ingredients,
                    instructions: response.data.instructions,
                    description: response.data.description,
                    file: null // No file pre-selected
                });
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [id]);

    const onHandleChange = (e) => {
        if (e.target.name === 'file') {
            setRecipeData({ ...recipeData, file: e.target.files[0] });
        } else {
            setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
        }
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', recipeData.title);
        formData.append('time', recipeData.time);
        formData.append('ingredients', recipeData.ingredients);
        formData.append('instructions', recipeData.instructions);
        formData.append('description', recipeData.description);
        if (recipeData.file) formData.append('file', recipeData.file);
    
        console.log("Sending FormData:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/recipes/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/myRecipe');
        } catch (error) {
            console.error('Error updating recipe:', error.response ? error.response.data : error.message);
        }
    
    
    };

    return (
        <div className="edit-recipe-container">
            <h2>Edit Recipe</h2>
            <form onSubmit={onHandleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={recipeData.title}
                    onChange={onHandleChange}
                    required
                />

                <label>Time</label>
                <input
                    type="text"
                    name="time"
                    value={recipeData.time}
                    onChange={onHandleChange}
                    required
                />

                <label>Ingredients</label>
                <textarea
                    name="ingredients"
                    value={recipeData.ingredients}
                    onChange={onHandleChange}
                    required
                ></textarea>

                <label>Instructions</label>
                <textarea
                    name="instructions"
                    value={recipeData.instructions}
                    onChange={onHandleChange}
                    required
                ></textarea>

                <label>Description</label>
                <textarea
                    name="description"
                    value={recipeData.description}
                    onChange={onHandleChange}
                    required
                ></textarea>

                <label>Image</label>
                <input
                    type="file"
                    name="file"
                    onChange={onHandleChange}
                />

                <button type="submit">Update Recipe</button>
            </form>
        </div>
    );
};

export default EditRecipe;
