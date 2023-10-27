export class Form {
    constructor(advancedSelect){
        this.advancedSelect = advancedSelect;
    }

    createSelect(){
        selectKeys = Object.keys(this.advancedSelect);
        selectKeys.forEach(keys => {
            // @Todo create Select
        })
    }
}