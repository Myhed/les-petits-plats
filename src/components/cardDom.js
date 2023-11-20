export const cardDom = ({name, description, image}, cardBody) => `<div class="col-12 col-xxl-4 col-sm-6 col-md-6 col-lg-5 mx-auto">
          <div class="card">
            <img src="./images/${image}" class="card-img-top rounded" alt="...">
            <div class="card-body pe-5">
              <h4 class="my-4">${name}</h4>
              <h5 class="card-title text-uppercase fs-6 text-secondary">recette</h5>
              <p class="card-text">${description}</p>
            </div>  
            ${cardBody}
        </div>
        </div>`;
