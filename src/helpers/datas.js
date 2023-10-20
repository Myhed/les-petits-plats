export const getRecipes = (method, cb) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, '../../datas/plats.json', true);
    xhr.responseType = 'json'
    xhr.onload = (e) => cb(e.target);
    xhr.send(null)
}