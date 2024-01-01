import { getRecipesFromJson } from './helpers/datas.js';
import { Recipes } from './components/recipes/index.js';
import { Search } from './components/search/index.js';
import { renderCardsRecipes } from './utils/render.js';
import { AdvancedSelect } from './components/AdvancedSelect/advancedSelect.js';
import { Form } from './components/Form/form.js';

window.onload = function() {
    const searchInput = document.querySelector('#search');
    const recipesDom = document.querySelector('#recipes');
    getRecipesFromJson('GET', ({response}) => {
        const { recipes: recipesFromJson } = response;
        const advancedSelect = new AdvancedSelect(recipesFromJson);
        console.log('recipesFromJson:', recipesFromJson);
        const cardOfRecipes = new Recipes(recipesFromJson);
        const search = new Search(cardOfRecipes, advancedSelect);
        const form = new Form(search, advancedSelect);

        form.searchBar(searchInput, (recipesFromSearchBar) => {
            renderCardsRecipes(recipesFromSearchBar, recipesDom);
        });

        form.searchSelect();
        
        renderCardsRecipes(recipesFromJson, recipesDom);
        
    });
}



// consfole.log('recipes: ',recipes);
