export const layoutElementIngredient = (ingredients) => {
    // console.log('ingredients: ', ingredients);

    return ingredients.map(ingredientPair => {
        return `<div class="row my-3">
        ${ingredientPair
        .filter(ingredient => typeof ingredient !== 'undefined')
        .map(({ingredient, quantity, unit}) => `<div class="col-6">
             <div class="card-text">
                 <p class="p-0 m-0">${ingredient}</p>
                 ${quantity ? `<span class="text-secondary">${quantity} ${unit ? unit: ``}</span>`: ``}
                </div>
              </div>`).join('')
        }
        </div>`
    })
};
