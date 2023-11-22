export class Search {
    constructor(recipes){
        this.recipes = recipes
        // console.log('recipies: ', recipes);
        this.resultsOnEachProperties = {}
        this.results = [];
    }

    get getRecipes(){
        return this.recipes.getPresentations.map((_, index) => this._recipe(index));
    }

    _recipe(index){
        return {
            appliance: this.recipes.getAppliances[index],
            ingredients: this.recipes.getIngredients[index],
            ustensils: this.recipes.getUstensils[index],
            description: this.recipes.getDescriptions[index],
            ...this.recipes.getPresentations[index]
        }
    }

    onWord(word, fields = {titles: true, descriptions:true, ingredients:false, ustensils: false, appliances: true}){
        const fieldsKey = Object.keys(fields);
        const regexSearched = new RegExp(word, `mig`);
        word = word.trim();
        fieldsKey.forEach(key => {
            const nameFunc = key.substr(0,1).toUpperCase() + key.substr(1, key.length - 1);
            if(fields[key]) {
                this[`entriesOn${nameFunc}`](regexSearched)
            }else {
                console.log(`_on${nameFunc}`);
                console.log(this[`_on${nameFunc}`]);
                this[`entriesOn${nameFunc}`](word)
            }
            
        });
        // console.log('results on:', this.results)
        return this;
    }

    entriesOnTitles(regexSearch){
        // console.log('search on title: ',this.recipes.getPresentations)
        const titlesMatched = this.recipes.getPresentations
            .map(({name}, index) => name.match(regexSearch) ? this._recipe(index): null)
        this.resultsOnEachProperties = {
            ...this.resultsOnEachProperties,
            titlesMatched
        }
        this.results = this.results.concat(titlesMatched);
        return this;
    }

    entriesOnDescriptions(regexSearch){
        const descriptionMatched = this.recipes.getDescriptions
            .map((description, index) => description
                .match(regexSearch) ? this._recipe(index): null)
            .filter(desription => desription !== null)

        // console.log('descriptionMatched :' , descriptionMatched)
        this.resultsOnEachProperties = {
            ...this.resultsOnEachProperties,
            descriptionMatched
        }
        this.results = this.results.concat(descriptionMatched);
        return this;
    }

    entriesOnIngredients(word){
        word = word.substr(0,1).toUpperCase() + word.substr(1, word.length-1);
        const ingredientsMatched = this.recipes.getIngredients
        .map((ingredients) => ingredients
            .map(({ingredient}) => ingredient))
        .map((ingredient,index) => ingredient.includes(word) ? 
                this._recipe(index): null)
            .filter(presentation => presentation)
        this.resultsOnEachProperties = {
            ...this.resultsOnEachProperties,
            ingredientsMatched
        }
        this.results = this.results.concat(ingredientsMatched);
        return this;
    }
    entriesOnUstensils(ustensil){
        console.log('ustensilsdd:', ustensil)
        const ustensilsMatched = this.recipes.getUstensils
            .map((ustensils, index) => ustensils.includes(ustensil) ? this._recipe(index): null)
        // console.log('ustensilsMatched:', ustensilsMatched)
        this.resultsOnEachProperties = {
            ...this.resultsOnEachProperties,
            ustensilsMatched
        }
        this.results = this.results.concat(ustensilsMatched);
        return this;        
    }

    entriesOnAppliances(regexSearch){
        const appliancesMatched = this.recipes.getAppliances
            .map((appliance, index) => appliance.match(regexSearch) ? this._recipe(index): null)
        // console.log('appliancesMatched', appliancesMatched);
        this.resultsOnEachProperties = {
            ...this.resultsOnEachProperties,
            appliancesMatched
        }
        this.results = this.results.concat(appliancesMatched);
        return this;
    }

    distinct(listOfRecipes = []){
        listOfRecipes = 
            listOfRecipes.length > 0 ? listOfRecipes : this.results;
        return listOfRecipes.filter(result => result != null)
        .reduce((acc, result) => (acc[result.id] = result, acc), {}) 
    }

    get getResults(){
        const results = {
            results: this.distinct(),
            resultsOnEachProperties:this.getResultsOnEachProperties
        }
        this.results = [];
        this.resultsOnEachProperties = {}
        return results;
    }

    get getResultsOnEachProperties(){
        return Object.keys(this.resultsOnEachProperties)
            .reduce((acc,key) => (
                acc[key] = this.resultsOnEachProperties[key]
                .filter(entries => entries !== null), acc), {});
    }
}