

function Search(cardOfRecipes, word = ''){
    this.word = word.trim()
    this.cardOfRecipes = cardOfRecipes;
    this.results = [];
    this.resultsOnEachProperties = {}
}

export default Search;