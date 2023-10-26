import { getRecipesFromJson } from './helpers/datas.js';
import { Recipes } from './components/recipes/index.js';
import { Search } from './components/search/index.js';


window.onload = function() {
    const searchInput = document.querySelector('#search');
    getRecipesFromJson('GET', ({response}) => {
        const { recipes: recipesFromJson } = response;
        const cardOfRecipes = new Recipes(recipesFromJson);
        const search = new Search(cardOfRecipes);
        searchInput.addEventListener('keyup', (e) =>{
            const value = e.target.value.trim().toLowerCase();
            if(value.length > 3){
                const results = search
                .onWord(value,{ descriptions: true, titles: true, appliances: true })
                .getResults()
                console.log('results:', results);
            }
        }, false)
    });
}



// consfole.log('recipes: ',recipes);
