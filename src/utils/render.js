import { cardBody, cardDom, layoutElementIngredient, layoutIngredient } from "../components/index.js";

// export const renderCardsRecipes  = (entriesHTMLElement) => entriesHTMLElement
// .map((recipe, i) => (
//     recipe.ingredients = recipe.ingredients
//     .reduce((acc, _, j) => {
//         if(j%2){
//             if(entriesFound[i].ingredients[j+1]){
//                 acc = [...acc, [entriesFound[i].ingredients[j], 
//                 entriesFound[i].ingredients[j+1]]] 
//             }else{
//                 acc = [...acc, [entriesFound[i].ingredients[j]]] 
//             }
//         }
//     return acc;
//     },[]), 
// recipe))
// .map((recipe, i) => (
//     recipe.ingredients = layoutElementIngredient(recipe.ingredients),
//        recipe.ingredients = layoutIngredient(recipe.ingredients),
//        recipe.ingredients = cardBody('ingredients',recipe.ingredients),
//     cardDom({name: recipe.name, description: recipe.description, image: recipe.image}, recipe.ingredients)))
// // r.innerHTML = cards.join('');


export const renderCardsRecipes = (recipes, parent) => {
    const t = JSON.parse(JSON.stringify(recipes)).map((recipe, i) => (
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
    parent.innerHTML = t.join('')
}