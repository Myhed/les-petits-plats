import Recipes from './recipes.js';
import {
 getOnlyFrom,
 stackArrayOf,
 getRecipes
} from './functions.js';


Recipes.prototype.getOnlyFrom = getOnlyFrom;
Recipes.prototype.stackArrayOf = stackArrayOf;
Recipes.prototype.getRecipes = getRecipes;

export { Recipes }