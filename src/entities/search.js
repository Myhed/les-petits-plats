export class Search {
    constructor(form, recipes){
        this.form = form;
        this.recipes = recipes
        // console.log('recipies: ', recipes);
        this.results = [];
    }

    recipe(index){
        return {
            appliances: this.recipes.getAppliances[index],
            ingredients: this.recipes.getIngredients[index],
            ustensils: this.recipes.getUstensils[index],
            ...this.recipes.getPresentations[index],
        }
    }

    onTitles(searched){
        // console.log('search on title: ',this.recipes.getPresentations)
        const regexSearched = new RegExp(searched, "i");
        const titlesMatched = this.recipes.getPresentations
            .filter(({name}, index) => name.match(regexSearched) ? this.recipe(index): null)
        console.log('titleMatched: ', titlesMatched);
        this.results = this.results.concat(titlesMatched);
        return this;
    }

    onDescriptions(searched){
        const regexSearched = new RegExp(searched, "m");
        const descriptionMatched = this.recipes.getPresentations
            .filter(({description},index) => description.match(regexSearched) ? this.recipe(index): null)
        // console.log('descriptionMatched :' , descriptionMatched)
        this.results = this.results.concat(descriptionMatched);
        return this;
    }

    onIngredients(searched){
        searched = searched.substr(0,1).toUpperCase() + searched.substr(1, searched.length-1);
        // console.log('searched: ', searched);
        // console.log('getIngredients: ', this.recipes.getIngredients);
        const ingredientsMatched = this.recipes.getIngredients
        .map((ingredients) => ingredients
            .map(({ingredient}) => ingredient))
        .map((ingredient,index) => ingredient.includes(searched) ? 
                this.recipe(index): null)
            .filter(presentation => presentation)
        // console.log('ingredientsMatched :' , ingredientsMatched)
        this.results = this.results.concat(ingredientsMatched);
        return this;
    }

    get getResults(){
        return this.results
        .reduce((acc, result) => (acc[result.id] = result, acc), {})
    }
}