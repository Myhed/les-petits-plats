import Recipes from './recipes.js';
import {
 getOnlyFrom,
 stackArrayOf,
 getRecipes,
 getDecomposedRecipes
} from './functions.js';


Recipes.prototype.getOnlyFrom = getOnlyFrom;
Recipes.prototype.stackArrayOf = stackArrayOf;
Recipes.prototype.getRecipes = getRecipes;
Recipes.prototype.getDecomposedRecipes = getDecomposedRecipes;
export { Recipes }