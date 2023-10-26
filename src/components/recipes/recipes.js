function Recipes(list){
    const keys = Object.keys(list[0]);
    const keysWillStack = ['name', 'ingredients', 'ustensils', 'description', 'appliance']
    const presentations = ['id','servings', 'time', 'image'];
    this.recipes = list;
    let cursorList = 0;
    const decomposedRecipes = {}
    const copiedList = JSON.parse(JSON.stringify(this.recipes))
    while(cursorList < keys.length){
        if(keysWillStack.includes(keys[cursorList])){
            decomposedRecipes[keys[cursorList]] = this.stackArrayOf(keys[cursorList], copiedList)
        } else {
            decomposedRecipes['presentations'] = this.getOnlyFrom(copiedList, presentations)
        }
        cursorList++
    }
    this.decomposedRecipes = decomposedRecipes;
}

export default Recipes;
