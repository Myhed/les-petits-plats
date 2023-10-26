export const onWord = function(word = '',properties){
    this.word = word.trim();
    Object.assign(properties, 
        {ingredients: false, ustensils:false})
    const patternToMatch = new RegExp(this.word,'mig');
    const keys = Object.keys(properties);
    for(let i = 0; i < keys.length; i++){
        const key = keys[i];
        const nameFunc = key.substr(0,1).toUpperCase() + key.substr(1, key.length-1)
        if(properties[key]){
            this[`entriesOn${nameFunc}`](patternToMatch)
        }else{
            this[`entriesOn${nameFunc}`](word)
        }
    }
    return this;
}

export const checkOnArray = function(array,strVerifyable,index){
    if(array.includes(strVerifyable)){
        return this.composeRecipe(index);
    }
}

export const checkOnString = function(str, regexVerifyable, index){
    if(str.match(regexVerifyable)){
        return this.composeRecipe(index);
    }
}

export const composeRecipe = function(index){
        return {
            ...this.cardOfRecipes.getRecipes()[index]
        }
}

export const findEntries = function(propertyList, verifyeable){
    let cursorPropertyList = 0;
    let results = [];
    while(cursorPropertyList < propertyList.length){
        const currentIndex = propertyList[cursorPropertyList];
        if(Array.isArray(currentIndex)){
            results = [
                ...results,
                this.checkOnArray(currentIndex, verifyeable, cursorPropertyList)
            ];
        }else{
            results = [
                ...results,
                this.checkOnString(currentIndex, verifyeable, cursorPropertyList)
            ];
        }
        cursorPropertyList++;
    }

    return results;
}

export const entriesOnDescriptions = function(pattern){
  pattern = pattern || this.patternToMatch;
  const { description } = this.cardOfRecipes.getDecomposedRecipes();
  const results = this.findEntries(description, pattern);
  this.resultsOnEachProperties = {
    ...this.resultsOnEachProperties,
    descriptions: this.distinct(results)
  }
  this.results = this.results.concat(results);
  return this;
}

export const entriesOnTitles = function(pattern) {
    pattern = pattern || this.patternToMatch;
    const { name } = this.cardOfRecipes.getDecomposedRecipes();
    const results = this.findEntries(name, pattern);
    this.resultsOnEachProperties = {
        ...this.resultsOnEachProperties,
        names:this.distinct(results)
    }
    this.results = this.results.concat(results);
    return this;
}

export const entriesOnAppliances = function(pattern){
    pattern = pattern || this.patternToMatch;
    const { appliance } = this.cardOfRecipes.getDecomposedRecipes();
    const results = this.findEntries(appliance, pattern);
    this.resultsOnEachProperties = {
        ...this.resultsOnEachProperties,
        appliances:this.distinct(results)
    }
    this.results = this.results.concat(results);
    return this;
}

export const entriesOnUstensils = function(word){
    word = word || this.word;
    const { ustensils } = this.cardOfRecipes.getDecomposedRecipes();
    const results = this.findEntries(ustensils, word);
    this.resultsOnEachProperties = {
        ...this.resultsOnEachProperties,
        ustensils: this.distinct(results)
    }
    this.results = this.results.concat(results);
    return this; 
}

export const entriesOnIngredients = function(word){
    word = word || this.word;
    let { ingredients } = this.cardOfRecipes.getDecomposedRecipes();
    ingredients = this.cardOfRecipes.stackArrayOf('ingredient', ingredients);
    const results = this.findEntries(ingredients, word);
    this.resultsOnEachProperties = {
        ...this.resultsOnEachProperties,
        ingredients: this.distinct(results)
    }
    this.results = this.results.concat(results);
    return this;    
}

export const distinct = function(cardOfRecipes = []){
    cardOfRecipes = cardOfRecipes.length > 0 ? cardOfRecipes : this.results;
    const distinctEntries = {};
    let cursor = 0
    while(cursor < cardOfRecipes.length){
        if(typeof cardOfRecipes[cursor] !== 'undefined'){
            const { id } = cardOfRecipes[cursor];
            distinctEntries[id] = cardOfRecipes[cursor];
        }
        cursor++
    }
    return distinctEntries;
}

export const getResultsOnEachProperties = function(){
    return this.resultsOnEachProperties;
}

export const getResults = function(){
    const results = this.distinct();
    const resultsOnEachProperties = this.getResultsOnEachProperties();
    this.results = [];
    this.resultsOnEachProperties = {};
    return {results, resultsOnEachProperties};
}