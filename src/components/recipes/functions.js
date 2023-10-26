export const stackArrayOf = (property, list) => {
    let searched = [];
    let cursorList = 0;
    console.log('list:', list)
    while(cursorList < list.length){
        // console.log(cursorList)
        searched = [...searched, list[cursorList][property]]
        // console.log(searched);
        cursorList++
    }

    return searched;
}

export const getOnlyFrom = (recipes, recipeAttrKeeped) => {
    let keysKeeped = [];
    for(let i = 0; i < recipes.length; i++){
        const keys = Object.keys(recipes[i]);
        const obj = {}
        for(let j = 0; j < recipeAttrKeeped.length; j++){
         const keyKeep = recipeAttrKeeped[j];
         if(keys.includes(keyKeep)){
                obj[keyKeep] = recipes[i][keyKeep]
            }
        }
        keysKeeped = [...keysKeeped, obj]; 
        // console.log('obj:', obj)
    }
    return keysKeeped;
}

export const getRecipes = function() {
    return this.recipes;
}