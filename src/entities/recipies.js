export class Recipies {
    constructor(recipesList){
        console.log(recipesList);
        this.ingredients = recipesList
        .map(({ ingredients }) => ingredients);
        this.presentations = recipesList
        .map(({description, id, image, name, servings, time}) => 
            ({description, id, name, servings, time, image}))
        this.appliances = recipesList.map(
            ({ appliance }) => appliance);
        this.ustensils = recipesList.map(
            ({ ustensils }) => ustensils);  
    }

    get getPresentations(){
        return this.presentations;
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