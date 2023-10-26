function Recipes(list){
    const keys = Object.keys(list[0]);
    const keysWillStack = ['name', 'ingredients', 'ustensils', 'description', 'appliance']
    const presentations = ['id','servings', 'time', 'image'];
    let cursorList = 0;
    let recipesTmp = {}
    while(cursorList < keys.length){
        if(keysWillStack.includes(keys[cursorList])){
            recipesTmp[keys[cursorList]] = this.stackArrayOf(keys[cursorList], list)
        } else {
            recipesTmp['presentations'] = this.getOnlyFrom(list, presentations)
        }
        cursorList++
    }

    this.recipes = recipesTmp;
}

export default Recipes;
