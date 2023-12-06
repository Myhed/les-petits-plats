
import { getRecipes } from './helpers/datas.js';
import {AdvancedSelect, Form, Recipies, Search} from './entities/index.js';
import { renderCardsRecipes } from './utils/render.js';

const recipesDom = document.querySelector('#recipes');

getRecipes().then(({recipes: recipesList}) => {
    const recipes = new Recipies(recipesList);
    const advancedSelect = new AdvancedSelect(recipes);
    const search = new Search(recipes);
    const form = new Form(advancedSelect, search);
    renderCardsRecipes(recipesList, recipesDom);

    form.searchBar(recipesDom)
    form.searchSelect(recipesDom);
})