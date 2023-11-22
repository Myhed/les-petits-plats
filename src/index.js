
import { getRecipes } from './helpers/datas.js';
import {AdvancedSelect, Form, Recipies, Search} from './entities/index.js';
import { renderCardsRecipes, reRenderCardsRecipes } from './utils/render.js';

const recipesDom = document.querySelector('#recipes');

const recipes = getRecipes().then(({recipes: recipesList}) => {
    console.log('Am i Recipe List: ',recipesList)
    const recipes = new Recipies(recipesList);
    const advancedSelect = new AdvancedSelect(recipes);
    const search = new Search(recipes);
    const form = new Form(advancedSelect, search);
    renderCardsRecipes(recipesList, recipesDom);

    form.searchBar(recipesDom)
})

// const searchDom = document.querySelector('#search')

// searchDom.addEventListener('keyup', async (e) => {
//     const search = await recipes;
//     const searchedDom = e.target.value.trim().toLowerCase();
//     if(searchedDom.length >= 3){
//         console.log('searched: ', searchedDom)
//         const { results } = search
//         .onWord(searchedDom)
//         .getResults;

//         const entriesFound = Object.values(results);

//         // console.log('results: ',results);

//         renderCardsRecipes(entriesFound, recipesDom);

//         // console.log('results searched: ', results);
        
//     }
//     // console.log('e:', e.target.value)
// })