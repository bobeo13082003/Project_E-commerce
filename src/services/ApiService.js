import axios from "../utils/CustommizeApi";

export const getCategory = () => {
    return axios.get('/products/categories');
}
export const getAllProducts = () => {
    return axios.get('/products');
}
export const getlimitProduct = () => {
    return axios.get('/products?limit=6');
}
export const getProductByCategories = (category) => {
    return axios.get(`/products/category/${category}`);
}

export const getProductById = (id) => {
    return axios.get(`/products/${id}`)
}

export const login = (username, password) => {
    return axios.post(`/auth/login`, { username, password });
}