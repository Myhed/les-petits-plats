import { renderCardsRecipes } from '../utils/render.js';
import { AdvancedSelect } from './advancedSelect.js';
import { Recipies } from './recipies.js';
import { Search } from './search.js';


export class Form {
    constructor(advancedSelect, search){
        // this.advancedSelect = advancedSelect
        this.ustensils = Object.values(advancedSelect.getUstensils);
        this.appliances = Object.values(advancedSelect.getAppliances);
        this.ingredients = Object.values(advancedSelect.getIngredients);
        this.allRecipes = search.getRecipes;
        this.labels = [];
        this.labelsDom = [];
        this.searchs = [];
        this.search = search;
        this.nextSearch;
    }

    ingredientsSelect(ingredients){
        ingredients = ingredients || this.ingredients;
        const ingredientSelect = document.querySelector('.ingredient');
        ingredientSelect.innerHTML = `
        <ul class="p-3">
            <li data-input-id="ingredient" class="list-group-item"><input type="text" class="form-control"></li>
        </ul>
        ${
            // console.log(this.labels),
            this.labels.length > 0 ? ingredients
            .map(ingredient =>  this.labels.reduce((acc, label) => (!Object.values(label).includes(ingredient) ? acc = ingredient: null),''))
            .filter(HTMLElement => HTMLElement !== null)
            .map(ingredient => `<li data-span-name="ingredient"><a class='dropdown-item'>${ingredient}</a></li>`)
            .join('')
            :ingredients
            .map(ingredient => `<li data-span-name="ingredient"><a class='dropdown-item'>${ingredient}</a></li>`)
            .join('')}
        `
        return this;
    }

    appliancesSelect(appliances){
        appliances = appliances || this.appliances;
        const applianceSelect = document.querySelector('.appliances');
        applianceSelect.innerHTML = `
        <ul class="p-3">
            <li data-id-input="appliance" class="list-group-item"><input type="text" class="form-control"></li>
        </ul>
        ${this.labels.length > 0 ? appliances
        .map(appliance =>  this.labels.reduce((acc, label) => (label.name !== appliance ? acc = appliance: null),''))
        .filter(HTMLElement => HTMLElement !== null)
        .map(appliance => `<li data-span-name="appliance"><a class='dropdown-item'>${appliance}</a></li>`)
        .join('')
        :appliances
        .map(appliance => `<li data-span-name="appliance"><a class='dropdown-item'>${appliance}</a></li>`)
        .join('')
        }
        `
        return this;
    }

    ustensilsSelect(ustensils){
        ustensils = ustensils || this.ustensils;
        const ustensilSelect = document.querySelector('.ustensils');
        ustensilSelect.innerHTML = `
        <ul class="p-3">
            <li data-id-input="ustensil" class="list-group-item"><input type="text" class="form-control"></li>
        </ul>
        ${
        this.labels.length > 0 ? ustensils
        .map(ustensil =>  this.labels.reduce((acc, label) => (label.name !== ustensil ? acc = ustensil: null),''))
        .filter(HTMLElement => HTMLElement !== null)
        .map(ustensil => `<li data-span-name="ustensil"><a class='dropdown-item'>${ustensil}</a></li>`)
        .join('')
        :ustensils
        .map(ustensil => `<li data-span-name="ustensil"><a class='dropdown-item'>${ustensil}</a></li>`)
        .join('')
        }
        `
        return this;
    }

    searchBar(parent){
        this.searchDom = document.querySelector('#search')

        this.
            ingredientsSelect()
            .appliancesSelect()
            .ustensilsSelect()
        
        this.searchDom.addEventListener('keyup', (e) => {
            const searchedDom = e.target.value.trim().toLowerCase();
            const numLetters = searchedDom.length;
            switch(numLetters){
                // case 1:
                //     this.clearLabels(parent);
                // break;
                case 3:
                    const search = 
                    this.nextSearch||this.search;
                    const results = search
                    .onWord(searchedDom)
                    .getResults.results;

                    console.log('search is: ', search);
                    const entriesFound = Object.values(results);
                    this.rebuild(parent, entriesFound);
                 break;
                 case 0:
                    let nextSearch;
                    if(this.searchs.length > 2){
                        nextSearch = this.searchs[this.searchs.length - 2];
                    }else{
                       nextSearch = this.nextSearch;
                    }
                     const entriesSearchBar = Object.values(nextSearch.getResults.results);
                     const recipes = entriesSearchBar.length > 0 ? entriesSearchBar : this.search; 
                     this.labelsIsEmpty(recipes, parent);
                break;
            }
        })
    }

    rebuild(parent,recipiesList){
        console.log('recipiesList:', recipiesList);
        const recipes = new Recipies(recipiesList);
        const advancedSelect = new AdvancedSelect(recipes);
        const search = new Search(recipes);
        if(recipiesList.length > 1){
            this
                .ingredientsSelect(Object.values(advancedSelect.getIngredients))
                .appliancesSelect(Object.values(advancedSelect.getAppliances))
                .ustensilsSelect(Object.values(advancedSelect.getUstensils))
         this.searchs = [...this.searchs, search];
        }else(
            this
                .ingredientsSelect([])
                .appliancesSelect([])
                .ustensilsSelect([])
        )
        renderCardsRecipes(recipiesList, parent);
        this.nextSearch = recipiesList.length > 0 ? search:this.nextSearch;
        this.searchSelect(parent, this.nextSearch);
    }

    createLabelSelect(nameItemSelected, funcName){
        this.labels = [...this.labels, {name: nameItemSelected, funcName}];
        this.labelsDom = [...this.labelsDom, `
        <button type="button" class="btn btn-warning w-15">
            <span class="text-white">${nameItemSelected}</span> <i class="fa-solid fa-xmark text-light"></i> 
         </button>
        `];
     return this.labelsDom;
    }

    clearLabels(parent){
        const labelSelect = document.querySelector('#label-select');
        this.labels = [];
        this.labelsDom = [];
        labelSelect.innerHTML = '';
        this.rebuild(parent, this.allRecipes);
    }

    labelsIsEmpty(searched, parent){
        if(this.labels.length > 0){
            const recipeListsWithLabels = Array(this.labels.length).fill(null)
            .map((_, index) => searched[this.labels[index].funcName](this.labels[index].name).getResults.results)
            .reduce((acc, recipes) => (acc = acc.concat(Object.values(recipes)), acc), []);
            const searchWithLabels = Object.values(searched.distinct(recipeListsWithLabels));
            // console.log('labels: ',this.labels);
            this.rebuild(parent, searchWithLabels);
        }else{
            // console.log('no labls')
            // console.log('allrecipes: ',this.allRecipes);
            const valueSearchBar = this.searchDom.value
            const recipes = valueSearchBar.length > 0 ? Object.values(this.search.onWord(valueSearchBar).getResults.results) : this.allRecipes;
            this.rebuild(parent, recipes);
        }
    }

    deleteLabel(index, faxmark ,{ul, li, labelSelect, searched, parent}){
            this.labels = this.labels.filter(label => this.labels[index].name !== label.name)
            console.log('labels: ',this.labels);
            this.labelsDom.splice(index, 1);
            ul.appendChild(li);
            labelSelect.removeChild(faxmark.parentNode);
            this.labelsIsEmpty(searched, parent);
    }

    onClickCrossIcon(HtmlElementList){
        const faxmarks = document.querySelectorAll('.fa-xmark');
        faxmarks.forEach((faxmark, index) => faxmark
            .addEventListener('click', () => this.deleteLabel(index, faxmark, HtmlElementList)));
    }

    searchSelect(parent,searched){
        searched = searched || this.search;
        console.log('searched:', searched);
        const dropdowns = document.querySelectorAll('.dropdown-menu li a');
        const labelSelect = document.querySelector('#label-select');
        dropdowns.forEach(a => {
            a.addEventListener('click', (e) => {
                const ul = a.parentNode.parentNode;
                const li = a.parentNode;
                const spanName =  li.dataset.spanName;
                const chunkNameFunc = spanName.substr(0,1).toUpperCase() +  spanName.substr(1,spanName.length - 1);
                labelSelect.innerHTML = `${this.createLabelSelect(a.textContent, `entriesOn${chunkNameFunc}s`).map(label => label).join(' ')}`
                const recipesList = Object.values(searched[`entriesOn${chunkNameFunc}s`](a.textContent).distinct());
                this.rebuild(parent,recipesList);
                console.log(document.querySelectorAll(`input[data-id-input=${spanName}]`));
                this.onClickCrossIcon({ul, li, labelSelect, searched, parent});
            }, false);
        });
    }
}