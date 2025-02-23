import { useState } from 'react';
import axios from 'axios';

const AddRecipe = () => {
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        ingredients: '',
        instructions: '',
        description: '',
        file: null
    });

    const onHandleChange = (e) => {
        if (e.target.name === "file") {
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

        if (recipeData.file) {
            formData.append('file', recipeData.file);
        }

        try {
            const token = localStorage.getItem('token'); // Assuming authentication
            const response = await axios.post('http://localhost:5000/api/recipes/addrecipe', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Recipe added successfully!');
        } catch (error) {
            console.error(error);
            alert('Error adding recipe');
        }
    };

    return (
        <div className='addrecipe-container'>
            <form className='addrecipe-form' onSubmit={onHandleSubmit}>
                <div className='addrecipe-form-control'>
                    <label>Title</label>
                    <input type="text" name="title" value={recipeData.title} onChange={onHandleChange} required />
                </div>
                <div className='addrecipe-form-control'>
                    <label>Time</label>
                    <input type="text" name="time" value={recipeData.time} onChange={onHandleChange} required />
                </div>
                <div className='addrecipe-form-control'>
                    <label>Ingredients</label>
                    <textarea name="ingredients" placeholder='Separate ingredients with comma (,)' rows="5" value={recipeData.ingredients} onChange={onHandleChange} required></textarea>
                </div>
                <div className='addrecipe-form-control'>
                    <label>Instructions</label>
                    <textarea name="instructions" rows="5" value={recipeData.instructions} onChange={onHandleChange} required></textarea>
                </div>
                <div className='addrecipe-form-control'>
                    <label>Description</label>
                    <textarea name="description" rows="5" value={recipeData.description} onChange={onHandleChange} required></textarea>
                </div>
                <div className='addrecipe-form-control'>
                    <label>Recipe Image</label>
                    <input type="file" name="file" accept="image/*" onChange={onHandleChange} />
                </div>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;
