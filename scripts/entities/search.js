export class Search {
    constructor(form, recipes){
        this.form = form;
        this.recipes = recipes
        console.log('recipies: ', recipes);
        this.results = [];
    }

    on(field, typed){
       this.recipes[field].filter(data => data.includes(typed))
    }
}