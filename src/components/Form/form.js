import { searchBar, searchSelect } from './functions.js';

export function Form(search){
    this.nextSearch;
    this.search = search;
    this.searchs = [];
    this.labels = [];
    this.labelsDom = [];

    this.searchBar.bind(this);
    this.searchSelect.bind(this);
}


Form.prototype.searchBar = searchBar;
Form.prototype.searchSelect = searchSelect;