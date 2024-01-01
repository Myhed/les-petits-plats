
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

const whichSelect= (name) => {
    return document.querySelector(`.dropdown-menu${name}`);
}

const selects = (advancedSelect) => {
    const nameSelects = Object.keys(advancedSelect);
    for(let s = 0; s < nameSelects.length; s++){
        const select = whichSelect(`.${nameSelects[s]}`);
        select.innerHTML = `
        <ul class="p-3">
            <li data-id-input="${nameSelects[s]}" class="list-group-item"><input type="text" class="form-control"></li>
        </ul>
        ${(options(nameSelects[s], advancedSelect).join(''))}
        `
    }

}

const options = (name, advancedSelect) => {
    const nameMethodeGet = name.substr(0,1).toUpperCase() + name.substr(1,name.length - 1);
    const selectOptions = advancedSelect[`get${nameMethodeGet}`]();
    let selectOptionsDom = [];
    for(let o = 0; o < selectOptions.length; o++){
        selectOptionsDom = [...selectOptionsDom, `<li data-span-name="${name}"><a class='dropdown-item'>${selectOptions[o]}</a></li>`];
    }
    return selectOptionsDom
}

export const searchSelect = function(){
    selects(this.advancedSelect);
}