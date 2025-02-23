const express = require('express');
const router = express.Router();
const RecipeController = require('../controller/recipeController');
const multer = require('multer');
const authMiddleware = require('../middleware/auth');

const upload = multer({ dest: 'uploads/' });

router.post('/addrecipe', authMiddleware, upload.single('file'), RecipeController.addRecipe);
router.get('/myrecipes', authMiddleware, RecipeController.getUserRecipes);
router.get('/all', RecipeController.getAllRecipes);
router.get('/:id', RecipeController.getRecipeById);
router.delete('/:id', authMiddleware, RecipeController.deleteRecipe);
router.put('/:id', upload.single('file'), RecipeController.updateRecipe);


module.exports = router;
