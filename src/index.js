import { getRecipesFromJson } from './helpers/datas.js';
import { Recipes } from './components/recipes/index.js';
import { Search } from './components/search/index.js';
import { renderCardsRecipes } from './utils/render.js';
import { AdvancedForm } from './components/AdvancedForm/advancedForm.js';
import { Form } from './components/Form/form.js';

window.onload = function() {
    const searchInput = document.querySelector('#search');
    const recipesDom = document.querySelector('#recipes');
    getRecipesFromJson('GET', ({response}) => {
        const { recipes: recipesFromJson } = response;
        const advancedForm = new AdvancedForm(recipesFromJson);
        console.log('recipesFromJson:', recipesFromJson);
        const cardOfRecipes = new Recipes(recipesFromJson);
        const search = new Search(cardOfRecipes, advancedForm);
        const form = new Form(search);

        form.searchBar(searchInput, (recipesFromSearchBar) => {
            renderCardsRecipes(recipesFromSearchBar, recipesDom);
        });
        
        renderCardsRecipes(recipesFromJson, recipesDom);
        
    });
}



// consfole.log('recipes: ',recipes);
