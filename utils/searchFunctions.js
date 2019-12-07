export function searchBySearchWord(recipes, searchWordOriginal) {
    if (!recipes) {
        return null;
    }
    const searchWord = searchWordOriginal.toLowerCase();
    const resultRecipes = [];
    recipes.map(recipe => {
        if (recipe.title.toLowerCase().includes(searchWord)) {
            resultRecipes.push(recipe);
        } else if (recipe.cuisine.toLowerCase().includes(searchWord)) {
            resultRecipes.push(recipe);
        } else if (recipe.description.toLowerCase().includes(searchWord)) {
            resultRecipes.push(recipe);
        } else if (
            recipe.ingredients.some(ingredient =>
                ingredient.name.toLowerCase().includes(searchWord)
            )
        ) {
            resultRecipes.push(recipe);
        } else if (
            recipe.dishTypes.some(tag => tag.toLowerCase().includes(searchWord))
        ) {
            resultRecipes.push(recipe);
        } else if (
            recipe.healthTypes.some(tag => tag.toLowerCase().includes(searchWord))
        ) {
            resultRecipes.push(recipe);
        } else if (
            recipe.mealTypes.some(tag => tag.toLowerCase().includes(searchWord))
        ) {
            resultRecipes.push(recipe);
        }
    });

    if (resultRecipes.length < 1) {
        return null;
    }
    return resultRecipes;
}

export function searchByMealType(recipes, mealTypeOriginal) {
    if (!recipes) {
        return null;
    }
    const mealType = mealTypeOriginal.toLowerCase();
    const resultRecipes = [];
    recipes.map(recipe => {
        if (recipe.mealTypes.includes(mealType)) {
            resultRecipes.push(recipe);
        }
    });
    if (resultRecipes.length < 1) {
        return null;
    }
    return resultRecipes;
}

export function searchByDishType(recipes, dishType) {
    if (!recipes) {
        return null;
    }
    const resultRecipes = [];
    recipes.map(recipe => {
        if (recipe.dishTypes.includes(dishType)) {
            resultRecipes.push(recipe);
        }
    });
    if (resultRecipes.length < 1) {
        return null;
    }
    return resultRecipes;
}