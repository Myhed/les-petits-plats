export const display = (recipes) => {
    const t = recipes.map((recipe, i) => (
        recipe.ingredients = recipe.ingredients
        .reduce((acc, _, j) => {
            if(j%2){
                acc = [...acc, [recipes[i].ingredients[j], 
                recipes[i].ingredients[j+1]]] 
            }
        return acc;
        },[]), 
    recipe))
    .map((recipe, i) => (
        recipe.ingredients = layoutElementIngredient(recipe.ingredients),
           recipe.ingredients = layoutIngredient(recipe.ingredients),
           recipe.ingredients = cardBody('ingredients',recipe.ingredients),
        cardDom({name: recipe.name, description: recipe.description, image: recipe.image}, recipe.ingredients)))
    r.innerHTML = t.join('')
}