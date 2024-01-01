import { getIngredients, buildIngredientsSet, buildUsentilsSet, getUstensils, buildAppliancesSet, getAppliances } from "./functions.js";

export function AdvancedForm(recipes){
    this.buildIngredientsSet(recipes);
    this.buildUsentilsSet(recipes);
    this.buildAppliancesSet(recipes);
}


AdvancedForm.prototype.getIngredients = getIngredients;
AdvancedForm.prototype.getUstensils = getUstensils;
AdvancedForm.prototype.getAppliances = getAppliances;
AdvancedForm.prototype.buildIngredientsSet = buildIngredientsSet;
AdvancedForm.prototype.buildUsentilsSet = buildUsentilsSet
AdvancedForm.prototype.buildAppliancesSet = buildAppliancesSet