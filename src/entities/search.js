export class Search {
    constructor(form, recipes){
        this.form = form;
        this.recipes = recipes
        // console.log('recipies: ', recipes);
        this.results = [];
    }

    _recipe(index){
        return {
            appliances: this.recipes.getAppliances[index],
            ingredients: this.recipes.getIngredients[index],
            ustensils: this.recipes.getUstensils[index],
            ...this.recipes.getPresentations[index]
        }
    }
    onWord(word, fields = {titles: "ig", descriptions:"mig", ingredients:null}){
        const fieldsKey = Object.keys(fields)
        const fieldsValue = Object.values(fields);
        word = word.trim();

        fieldsKey.forEach((key, index) => {
            const nameFunc = key.substr(0,1).toUpperCase() + key.substr(1, key.length - 1);
            if(nameFunc === 'Ingredients' || nameFunc === 'Ustensils') {
                this[`_on${nameFunc}`](word)
            }else {
                const regexSearched = new RegExp(word, `${fieldsValue[index]}`);
                console.log(`_on${key}`)
                this[`_on${nameFunc}`](regexSearched)
            }
            
        });
        console.log('results on:', this.results)
        return this;
    }

    _onTitles(regexSearch){
        // console.log('search on title: ',this.recipes.getPresentations)
        const titlesMatched = this.recipes.getPresentations
            .map(({name}, index) => name.match(regexSearch) ? this._recipe(index): null)
        console.log('titleMatched: ', titlesMatched);
        this.results = this.results.concat(titlesMatched);
        return this;
    }

    _onDescriptions(regexSearch){
        const descriptionMatched = this.recipes.getPresentations
            .map(({description, id}) => description.match(regexSearch) ? this._recipe(id): null)
        console.log('descriptionMatched :' , descriptionMatched)
        this.results = this.results.concat(descriptionMatched);
        return this;
    }

    _onIngredients(word){
        word = word.substr(0,1).toUpperCase() + word.substr(1, word.length-1);
        // console.log('searched: ', searched);
        // console.log('getIngredients: ', this.recipes.getIngredients);
        const ingredientsMatched = this.recipes.getIngredients
        .map((ingredients) => ingredients
            .map(({ingredient}) => ingredient))
        .map((ingredient,index) => ingredient.includes(word) ? 
                this._recipe(index): null)
            .filter(presentation => presentation)
        console.log('ingredientsMatched :' , ingredientsMatched)
        this.results = this.results.concat(ingredientsMatched);
        return this;
    }

    onUstensils(ustensil){
        const ustensilsMatched = this.recipes.getUstensils
            .map((ustensils, index) => ustensils.includes(ustensil) ? this._recipe(index): null)
        console.log('ustensilsMatched:', ustensilsMatched)
        return this;        
    }

    onAppliances(regexSearch){
        const appliancesMatched = this.recipes.getAppliances
            .map((appliance, index) => appliance.match(regexSearch) ? this._recipe(index): null)
        console.log('appliancesMatched', appliancesMatched);
        return this;
    }

    get getResults(){
        const results = this.results
        .filter(result => result != null)
        .reduce((acc, result) => (acc[result.id] = result, acc), {})
        this.results = [];
        return results;
    }
}