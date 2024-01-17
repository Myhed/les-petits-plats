
const buildSet = (list, nameProperty = '') => {
    const set = {}
    for(let i = 0; i < list.length; i++){
        if(typeof list[i] === 'string'){
            set[list[i]] = list[i];
        } else {
            set[list[i][nameProperty]] = list[i][nameProperty];
        }
    }
    console.log('set: ',set)
    return set;
}

const replaceAllItemsBy = (items, itemsToReplace) => {
    let count = 0;
    for(let item in itemsToReplace){
        items.splice(count, 1, item);
        count++;
    }
    if(count < items.length){
        items.splice(count, items.length-1);
    }

    return items;
}

export const buildIngredientsSet = function(recipes){
    let ingredients = [];
    for(let r = 0; r < recipes.length; r++){
        ingredients = [...ingredients,...recipes[r].ingredients];    
    }
    this.ingredients = replaceAllItemsBy(ingredients, buildSet(ingredients, 'ingredient'));
}

export const buildUsentilsSet = function(recipes){
    let ustensils = [];
    for(let r = 0; r < recipes.length; r++){
        ustensils = [...ustensils,...recipes[r].ustensils];    
    }
    this.ustensils = replaceAllItemsBy(ustensils, buildSet(ustensils));
}

export const buildAppliancesSet = function(recipes){
    let appliances = [];
    for(let r = 0; r < recipes.length; r++){
        appliances = [...appliances, recipes[r].appliance];    
    }
    console.log('Appliances:', buildSet(appliances))
    this.appliances = replaceAllItemsBy(appliances, buildSet(appliances));
}

export const getAppliances = function(){
    return this.appliances;
}

export const getUstensils = function(){
    return this.ustensils;
}

export const getIngredients = function(){
    return this.ingredients;
}