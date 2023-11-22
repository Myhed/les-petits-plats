import { renderCardsRecipes, reRenderCardsRecipes } from '../utils/render.js';
import { AdvancedSelect } from './advancedSelect.js';
import { Recipies } from './recipies.js';


export class Form {
    constructor(advancedSelect, search){
        // this.advancedSelect = advancedSelect
        this.ustensils = Object.values(advancedSelect.getUstensils);
        this.appliances = Object.values(advancedSelect.getAppliances);
        this.ingredients = Object.values(advancedSelect.getIngredients);
        this.labels = [];
        this.search = search;
    }

    ingredientsSelect(ingredients){
        ingredients = ingredients || this.ingredients;
        const ingredientSelect = document.querySelector('.ingredient');
        ingredientSelect.innerHTML = `
        <ul class="p-3">
            <li data-span-name="ingredient" class="list-group-item"><input type="text" class="form-control"></li>
        </ul>
        ${ingredients.map(ingredient => `<li data-span-name="ingredient"><a class='dropdown-item'>${ingredient}</a></li>`).join('')}
        `
        return this;
    }

    appliancesSelect(appliances){
        appliances = appliances || this.appliances;
        const applianceSelect = document.querySelector('.appliances');
        applianceSelect.innerHTML = `
        <ul class="p-3">
            <li data-span-name-="appliance" class="list-group-item"><input type="text" class="form-control"></li>
        </ul>
        ${appliances.map(appliance => `<li data-span-name="appliance"><a class='dropdown-item'>${appliance}</a></li>`).join('')}
        `
        return this;
    }

    ustensilsSelect(ustensils){
        ustensils = ustensils || this.ustensils;
        const ustensilSelect = document.querySelector('.ustensils');
        ustensilSelect.innerHTML = `
        <ul class="p-3">
            <li data-span-name="ustensil" class="list-group-item"><input type="text" class="form-control"></li>
        </ul>
        ${ustensils.map(ustensil => `<li data-span-name="ustensil"><a class='dropdown-item'>${ustensil}</a></li>`).join('')}
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

    createLabelSelect(nameItemSelected){
     this.labels = [...this.labels, `
     <button type="button" class="btn btn-warning w-15">
         <span class="text-white">${nameItemSelected}</span> <i class="fa-solid fa-xmark text-light"></i> 
      </button>
     `];
     
     return this.labels;
    }
    searchSelect(){
        const dropdowns = document.querySelectorAll('.dropdown-menu li a');
        const labelSelect = document.querySelector('#label-select');
        dropdowns.forEach(a => {
            a.addEventListener('click', (e) => {
                const ul = a.parentNode.parentNode;
                const li = a.parentNode;
                labelSelect.innerHTML = `${this.createLabelSelect(a.textContent).map(label => label).join(' ')}`
                const faxmarks = document.querySelectorAll('.fa-xmark');
                faxmarks.forEach((faxmark, index) => {
                    faxmark.addEventListener('click', (e)=>{
                        this.labels.splice(index, 1);
                        ul.appendChild(li);
                        labelSelect.removeChild(faxmark.parentNode);
                    })
                });
                ul.removeChild(li);
            }, false);
        });
    }
}