export const stackArrayOf = (property, list) => {
    let stacked = [];
    let cursorList = 0;
    while(cursorList < list.length){
        if(Array.isArray(list[cursorList])){
            stacked = [
                ...stacked,
                stackArrayOf(property, list[cursorList])
            ]
        }else{
            if(typeof list[cursorList][property] === 'string')
              list[cursorList][property] = list[cursorList][property]
                .toLowerCase()
            stacked = [...stacked, list[cursorList][property]] 
        }
        cursorList++
    }

    return stacked;
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

export const getRecipes = function (){
    return this.recipes;
}

export const getDecomposedRecipes = function() {
    return this.decomposedRecipes;
}