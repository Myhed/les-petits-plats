import { getIngredients, buildIngredientsSet, buildUsentilsSet, getUstensils, buildAppliancesSet, getAppliances } from "./functions.js";

export function AdvancedSelect(recipes){
    this.buildIngredientsSet(recipes);
    this.buildUsentilsSet(recipes);
    this.buildAppliancesSet(recipes);
}


AdvancedSelect.prototype.getIngredients = getIngredients;
AdvancedSelect.prototype.getUstensils = getUstensils;
AdvancedSelect.prototype.getAppliances = getAppliances;
AdvancedSelect.prototype.buildIngredientsSet = buildIngredientsSet;
AdvancedSelect.prototype.buildUsentilsSet = buildUsentilsSet
AdvancedSelect.prototype.buildAppliancesSet = buildAppliancesSet