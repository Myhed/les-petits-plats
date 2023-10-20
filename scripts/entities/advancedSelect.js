export class AdvancedSelect {
    constructor(recipes){
        this.appliances = recipes.getAppliances
        .reduce((acc, appliance) => (acc = {...acc, [appliance]: appliance}, acc), {})
        this.ustensils = recipes.getUstensils
        .reduce((acc, ustensil) => (acc = [...acc, ...ustensil]),[])
        .reduce((acc, ustensil) => (acc = {...acc, [ustensil]: ustensil}, acc), {});
        this.ingredients = recipes.getIngredients
         .reduce((acc, ingredient) => (acc = [...acc, ...ingredient], acc), [])
         .reduce((acc, {ingredient}) => (acc = {...acc, [ingredient]: ingredient}, acc), {});
    }

    get getAppliances(){
        return this.appliances;
    }

    get getUstensils(){
        return this.ustensils;
    }

    get getIngredients() {
        return this.ingredients;
    }
}