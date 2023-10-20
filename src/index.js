
import { getRecipes } from './helpers/datas.js';
import {AdvancedSelect, Form, Recipies, Search} from './entities/index.js';

getRecipes().then(({recipes: recipesList}) => {
    const recipes = new Recipies(recipesList);
    const advancedSelect = new AdvancedSelect(recipes);
    const form = new Form(advancedSelect);
    const search = new Search(form, recipes);
    console.log('results: ',search
    .onTitles('limonade')
    .onDescriptions('limonade')
    .onIngredients('Lait de coco')
    .getResults);
    console.log('form: ', form);
    console.log('search: ', search);
})