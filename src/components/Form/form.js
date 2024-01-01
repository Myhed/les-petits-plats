import { searchBar, searchSelect } from './functions.js';

export function Form(search, advancedSelect){
    this.nextSearch;
    this.search = search;
    this.advancedSelect = advancedSelect;
    this.searchs = [];
    this.labels = [];
    this.labelsDom = [];

    this.searchBar.bind(this);
    this.searchSelect.bind(this);
}


Form.prototype.searchBar = searchBar;
Form.prototype.searchSelect = searchSelect;