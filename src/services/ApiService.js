import axios from "../utils/CustommizeApi";

export const getCategory = () => {
    return axios.get('/products/categories');
}