import Recipes from './recipes.js';
import {
 getOnlyFrom,
 stackArrayOf,
 getRecipes
} from './functions.js';


Recipes.prototype._getOnlyFrom = getOnlyFrom;
Recipes.prototype._stackArrayOf = stackArrayOf;
Recipes.prototype.getRecipes = getRecipes;

export { Recipes }