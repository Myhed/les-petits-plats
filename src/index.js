import { getRecipesFromJson } from './helpers/datas.js';
import { Recipes } from './components/recipes/index.js';
import { Search } from './components/search/index.js';


getRecipesFromJson('GET', ({response}) => {
    // console.log('response:',response)
    const { recipes: recipesFromJson } = response;

    const cardOfRecipes = new Recipes(recipesFromJson);
    const { ingredients } = cardOfRecipes.getRecipes();
    cardOfRecipes.stackArrayOf('ingredient', ingredients);

    const search = new Search(cardOfRecipes);
    search.onWord('coco',{ descriptions: true });

    // const appliances = searchOn('appliance', recipes)
    // const ingredients = searchOn('ingredients', recipes);
    // const descriptions =  searchOn('description', recipes);
    // const ustensils = searchOn('ustensils', recipes);
    // const titles = searchOn('name', recipes);

    // console.log('build:', buildFrom(recipes));
    // console.log('build pres:', buildChunkRecipes(recipes))

    // console.log('searched Appliances:', searchOn('appliance', recipes))

});



// consfole.log('recipes: ',recipes);
