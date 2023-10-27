export class Recipies {
    constructor(recipesList){
        console.log(recipesList);
        this.ingredients = recipesList
        .map(({ ingredients }) => ingredients)
        this.presentations = recipesList
        .map(({id, image, name, servings, time}) => 
            ({id, name, servings, time, image}))
        this.descriptions = recipesList
        .map(({ description }) => description)
        this.appliances = recipesList.map(
            ({ appliance }) => appliance);
        this.ustensils = recipesList.map(
            ({ ustensils }) => ustensils);  
    }

    get getPresentations(){
        return this.presentations;
    }
    get getDescriptions(){
        return this.descriptions;
    }
    get getIngredients() {
        return this.ingredients;
    }
    get getUstensils(){
        return this.ustensils;
    }
    get getAppliances(){
        return this.appliances;
    }
}