export const layoutIngredient = (ingredientsDom) => `
<div class="row my-4">
  <div class="col-12">
    ${ingredientsDom.map(ingredientDom => ingredientDom).join('')}
  </div> 
 </div>`;
