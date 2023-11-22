import { renderCardsRecipes, reRenderCardsRecipes } from '../utils/render.js';
import { AdvancedSelect } from './advancedSelect.js';
import { Recipies } from './recipies.js';


export class Form {
    constructor(advancedSelect, search){
        // this.advancedSelect = advancedSelect
        this.ustensils = Object.values(advancedSelect.getUstensils);
        this.appliances = Object.values(advancedSelect.getAppliances);
        this.ingredients = Object.values(advancedSelect.getIngredients);
        this.search = search;
    }

    ingredientsSelect(ingredients){
        ingredients = ingredients || this.ingredients;
        const ingredientSelect = document.querySelector('.ingredient');
        ingredientSelect.innerHTML = `
        <ul class="p-3">
            <li class="list-group-item"><input type="text" class="form-control"></li>
        </ul>
        ${ingredients.map(ingredient => `<li><a class='dropdown-item'>${ingredient}</a></li>`).join('')}
        `
        return this;
    }

    appliancesSelect(appliances){
        appliances = appliances || this.appliances;
        const applianceSelect = document.querySelector('.appliances');
        applianceSelect.innerHTML = `
        <ul class="p-3">
            <li class="list-group-item"><input type="text" class="form-control"></li>
        </ul>
        ${appliances.map(appliance => `<li><a class='dropdown-item'>${appliance}</a></li>`).join('')}
        `
        return this;
    }

    ustensilsSelect(ustensils){
        ustensils = ustensils || this.ustensils;
        const ustensilSelect = document.querySelector('.ustensils');
        ustensilSelect.innerHTML = `
        <ul class="p-3">
            <li class="list-group-item"><input type="text" class="form-control"></li>
        </ul>
        ${ustensils.map(ustensil => `<li><a class='dropdown-item'>${ustensil}</a></li>`).join('')}
        `
        return this;
    }

    searchBar(parent){
        const searchDom = document.querySelector('#search')

        this.
            ingredientsSelect()
            .appliancesSelect()
            .ustensilsSelect()
        
        searchDom.addEventListener('keyup', (e) => {
            const searchedDom = e.target.value.trim().toLowerCase();
            const numLetters = searchedDom.length;
            let recipes;
            let advancedSelect;
            switch(numLetters){
                case 3:
                    const { results } = this.search
                    .onWord(searchedDom)
                    .getResults;
                    const entriesFound = Object.values(results);
                    recipes = new Recipies(entriesFound);
                    advancedSelect = new AdvancedSelect(recipes);
                    this
                     .ingredientsSelect(Object.values(advancedSelect.getIngredients))
                     .appliancesSelect(Object.values(advancedSelect.getAppliances))
                     .ustensilsSelect(Object.values(advancedSelect.getUstensils))
                    renderCardsRecipes(entriesFound, parent);
                 break;
                case 0:
                    const recipesList = this.search.getRecipes;
                    recipes = new Recipies(recipesList);
                    advancedSelect = new AdvancedSelect(recipes);
                    this
                    .ingredientsSelect(Object.values(advancedSelect.getIngredients))
                    .appliancesSelect(Object.values(advancedSelect.getAppliances))
                    .ustensilsSelect(Object.values(advancedSelect.getUstensils))
                    console.log('recipes: ',recipes)
                    renderCardsRecipes(recipesList, parent);
                break;
            }
        })
    }
}