const pool = require('../config/connectionDb');

const RecipeModel = {
    async addRecipe({ title, time, ingredients, instructions, description, imageUrl, userId }) {
        const query = `
            INSERT INTO recipes (title, time, ingredients, instructions, description, image_url, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
        `;
        const values = [title, time, ingredients, instructions, description, imageUrl, userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async getAllRecipes() {
        const query = 'SELECT * FROM recipes';
        const result = await pool.query(query);
        return result.rows;
    },

    async getRecipesByUserId(userId) {
        const query = 'SELECT * FROM recipes WHERE user_id = $1';
        const result = await pool.query(query, [userId]);
        return result.rows;
    },

    async getRecipeById(id) {
        const query = 'SELECT * FROM recipes WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },
    async deleteRecipe(id) {
        const query = 'DELETE FROM recipes WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];  // Return the deleted recipe's data, or null if not found
    },

    async updateRecipe(id, updatedData) {
        if (!updatedData.title || !updatedData.time || !updatedData.ingredients || 
            !updatedData.instructions || !updatedData.description) {
            throw new Error('Missing required fields'); // Throw an error if any required field is missing
        }
    
        const query = `
            UPDATE recipes
            SET
                title = $1,
                time = $2,
                ingredients = $3,
                instructions = $4,
                description = $5,
                image_url = COALESCE($6, image_url)  -- Keep existing image if none is provided
            WHERE id = $7
            RETURNING *;
        `;
    
        const values = [
            updatedData.title,
            updatedData.time,
            updatedData.ingredients,
            updatedData.instructions,
            updatedData.description,
            updatedData.image_url || null, // Ensure `null` is explicitly handled
            id
        ];
    
        try {
            const result = await pool.query(query, values);
            return result.rows[0]; // Return the updated recipe
        } catch (err) {
            console.error('Error updating recipe in DB:', err);
            throw err;
        }
    }
    
};

module.exports = RecipeModel;
