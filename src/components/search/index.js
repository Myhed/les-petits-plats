import Search from './search.js';
import { 
    onWord, 
    entriesOnDescriptions,
    entriesOnIngredients,
    entriesOnUstensils,
    entriesOnAppliances,
    entriesOnTitles,
    findEntries,
    checkOnArray,
    checkOnString,
    composeRecipe,
    getResults,
    distinct,
    getResultsOnEachProperties,
    getAllRecipes
} from './functions.js';

Search.prototype.onWord = onWord;
Search.prototype.entriesOnDescriptions = entriesOnDescriptions;
Search.prototype.entriesOnUstensils = entriesOnUstensils;
Search.prototype.entriesOnIngredients = entriesOnIngredients;
Search.prototype.entriesOnAppliances = entriesOnAppliances;
Search.prototype.entriesOnTitles = entriesOnTitles;
Search.prototype.findEntries = findEntries;
Search.prototype.checkOnArray = checkOnArray;
Search.prototype.checkOnString = checkOnString;
Search.prototype.composeRecipe = composeRecipe;
Search.prototype.getResults = getResults;
Search.prototype.distinct = distinct;
Search.prototype.getAllRecipes = getAllRecipes;
Search.prototype.getResultsOnEachProperties = getResultsOnEachProperties
export { Search }