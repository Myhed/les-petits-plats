
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

const selects = (advancedSelect, cb) => {
    console.log('advancedSelect:', advancedSelect);
    const nameSelects = Object.keys(advancedSelect)
    for(let s = 0; s < nameSelects.length; s++){
        const select = whichSelect(`.${nameSelects[s]}`)
        select.innerHTML = `
        <ul class="p-3">
            <li data-id-input="${nameSelects[s]}" class="list-group-item"><input type="text" class="form-control"></li>
        </ul>
        `
        options(nameSelects[s], advancedSelect, select, cb)
    }

}

const buildSelectOption = (select, {textOption, name},cb) => {
    const li = `<li data-span-name="${name}"><a class='dropdown-item'>${textOption}</a></li>`
    const parser = new DOMParser().parseFromString(li, "text/xml")
    parser.children[0].addEventListener('click', (e) => cb(e), false)
    select.appendChild(parser.children[0])
}

const options = (name, advancedSelect, select, cb) => {
    const nameMethodeGet = name.substr(0,1).toUpperCase() + name.substr(1,name.length - 1);
    const selectOptions = advancedSelect[`get${nameMethodeGet}`]()
    for(let o = 0; o < selectOptions.length; o++){
        buildSelectOption(select,{textOption: selectOptions[o], name},cb);
    }
}

const setOptionSelectLabelUI = (name, dataSpanName) => {
    const buttonText = `<button data-categorie='${dataSpanName}' class='btn btn-warning text-white mt-3 mx-2'>${name} <i class="fa-solid fa-x cross"></i></button>`;
    const parserButtonDom = new DOMParser().parseFromString(buttonText, "text/xml").children[0];
    const labelsDom = document.querySelector('.labels');
    console.log('labelsDom:', labelsDom);
    labelsDom.appendChild(parserButtonDom);
    const crossDom = parserButtonDom.children[0];
    crossDom.addEventListener('click', function(e){
        const dataCategorie = e.target.parentNode.attributes;
        const textContentCategorie = e.target.parentNode.textContent;
        const nameCategorie = dataCategorie[0].nodeValue;

        const categorieSelect = document.querySelector(`.${nameCategorie}`);
        // const liText = `<li data-span-name="${nameCategorie}"><a class='dropdown-item'>${textContentCategorie}</a></li>`
        // const liDom = new DOMParser().parseFromString(liText, "text/xml").children[0];
        buildSelectOption(categorieSelect, {textOption: textContentCategorie, name: nameCategorie}, (e) => {
            categorieSelect.removeChild(e.target.parentNode);
            setOptionSelectLabelUI(textContentCategorie,nameCategorie);
        });
        // categorieSelect.appendChild(liDom);
        labelsDom.removeChild(parserButtonDom);
    });
    
}

export const searchSelect = function(advancedSelect, cb){
    advancedSelect = advancedSelect || this.advancedSelect;
    selects(this.advancedSelect, (e => {
        const li = e.target.parentNode;
        const liParent = e.target.parentNode.parentNode;
        setOptionSelectLabelUI(li.textContent, li.attributes[0].nodeValue);
        console.log(liParent);
        console.log(li);
        console.log('datas:', li.attributes[0].nodeValue);
        liParent.removeChild(li);
    }));


}