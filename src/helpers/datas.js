export const getRecipes = async () => {
    const request = new Request('./datas/plats.json');
    return fetch(request).then(res => res.json());
}