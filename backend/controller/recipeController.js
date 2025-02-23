const RecipeModel = require('../models/recipeModel');
const cloudinary = require('../config/cloudinaryConfig');

const RecipeController = {
    async addRecipe(req, res) {
        try {
            const { title, time, ingredients, instructions, description } = req.body;
            let imageUrl = null;

            // Format ingredients into a comma-separated string
            const formattedIngredients = Array.isArray(ingredients) 
                ? ingredients.join(', ')  
                : ingredients;

            // Upload image to Cloudinary if provided
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, { folder: 'recipes' });
                imageUrl = result.secure_url;
            }

            const userId = req.user.id; 

            const newRecipe = await RecipeModel.addRecipe({ 
                title, 
                time, 
                ingredients: formattedIngredients,  
                instructions,
                description,
                imageUrl,
                userId
            });

            res.status(201).json(newRecipe);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async getUserRecipes(req, res) {
        try {
            const userId = req.user.id;
            const recipes = await RecipeModel.getRecipesByUserId(userId);
            res.status(200).json(recipes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async getAllRecipes(req, res) {
        try {
            const recipes = await RecipeModel.getAllRecipes();
            res.status(200).json(recipes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async getRecipeById(req, res) {
        const { id } = req.params;
        try {
            const recipe = await RecipeModel.getRecipeById(id);
            if (recipe) {
                res.status(200).json(recipe);
            } else {
                res.status(404).json({ error: 'Recipe not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },
    
     // Handle deletion of a recipe
     async deleteRecipe(req, res) {
        const { id } = req.params;  // Get recipe ID from request params

        try {
            const deletedRecipe = await RecipeModel.deleteRecipe(id);

            if (deletedRecipe) {
                res.status(200).json({ message: 'Recipe deleted successfully' });
            } else {
                res.status(404).json({ message: 'Recipe not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },


    async updateRecipe(req, res) {
        const { id } = req.params;
        const { title, time, ingredients, instructions, description } = req.body;
        let imageUrl = null;
    
        console.log("Received Update Request:", { id, title, time, ingredients, instructions, description });
    
        if (!title || !time || !ingredients || !instructions || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Check if a new image is uploaded
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, { folder: 'recipes' });
                imageUrl = result.secure_url;
                console.log("Image uploaded successfully:", imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                return res.status(500).json({ error: 'Image upload failed' });
            }
        }
    
        // Prepare updated recipe data
        const updatedRecipeData = {
            title,
            time,
            ingredients,
            instructions,
            description,
            image_url: imageUrl || undefined,  // Keep the existing image if none is uploaded
        };
    
        try {
            // Call model to update the recipe in the database
            const updatedRecipe = await RecipeModel.updateRecipe(id, updatedRecipeData);
    
            if (updatedRecipe) {
                return res.status(200).json(updatedRecipe);
            } else {
                return res.status(404).json({ message: 'Recipe not found' });
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
    
};

module.exports = RecipeController;
