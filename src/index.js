
import { getRecipes } from './helpers/datas.js';
import {AdvancedSelect, Form, Recipies, Search} from './entities/index.js';

const recipes = getRecipes().then(({recipes: recipesList}) => {
    const recipes = new Recipies(recipesList);
    const advancedSelect = new AdvancedSelect(recipes);
    const form = new Form(advancedSelect);
    const search = new Search(form, recipes);
    return search;
})

const searchDom = document.querySelector('#search')

searchDom.addEventListener('keyup', async (e) => {
    const search = await recipes;
    const searchedDom = e.target.value.trim().toLowerCase();
    if(searchedDom.length >= 3){
        console.log('searched: ', searchedDom)
        const results = search
        .onWord(searchedDom)
        .getResults

        console.log('results searched: ', results);
        console.log('form: ',search.form)
    }
    console.log('e:', e.target.value)
})