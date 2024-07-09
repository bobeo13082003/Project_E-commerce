import axios from "../utils/CustommizeApi";

export const getCategory = () => {
    return axios.get('/categories');
}
export const getAllProducts = () => {
    return axios.get('/products');
}
export const getProductByCategories = (category) => {
    return axios.get(`/products/${category}`);
}
export const getAccounts = () => {
    return axios.get(`/accounts`);
}
export const register = (username, password) => {
    return axios.post(`/accounts`, { username, password, role: "user" });
}


