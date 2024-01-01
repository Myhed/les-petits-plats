
const getRecipeFromSearchBar = (search, value) => {
    const { results } = search
            .onWord(value,{ descriptions: true, titles: true, appliances: true })
            .getResults()
            const recipes = Object.values(results);
    return recipes;
}

export const searchBar = function(searchInput, cb){
    searchInput.addEventListener('keyup', (e) => {
        const value = e.target.value.trim().toLowerCase();
        let recipes;
        switch(true){
            case value.length > 3:
                recipes = getRecipeFromSearchBar(this.search, value);
                cb(recipes);
             break;
            case value.length === 0:
                console.log(this.search.cardOfRecipes.getRecipes());
                cb(this.search.getAllRecipes());
            break;
        }
    }, false)

    console.log('searchBar: ', this.search);
}

export const searchSelect = function(){}