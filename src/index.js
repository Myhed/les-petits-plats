import { getRecipesFromJson } from './helpers/datas.js';
import { Recipes } from './components/recipes/index.js';
import { Search } from './components/search/index.js';
import { renderCardsRecipes } from './utils/render.js';

window.onload = function() {
    const searchInput = document.querySelector('#search');
    const recipesDom = document.querySelector('#recipes');
    getRecipesFromJson('GET', ({response}) => {
        const { recipes: recipesFromJson } = response;
        console.log('recipesFromJson:', recipesFromJson);
        const cardOfRecipes = new Recipes(recipesFromJson);
        const search = new Search(cardOfRecipes);
        renderCardsRecipes(recipesFromJson, recipesDom);
        searchInput.addEventListener('keyup', (e) => {
            const value = e.target.value.trim().toLowerCase();
            if(value.length > 3){
                const { results } = search
                .onWord(value,{ descriptions: true, titles: true, appliances: true })
                .getResults()
                const recipes = Object.values(results);
                console.log('results:', recipes);
                renderCardsRecipes(recipes, recipesDom)
            }
        }, false)

    });
}



// consfole.log('recipes: ',recipes);
