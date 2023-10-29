import axios from "axios";

export const apiAxios = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: {
        'content-type': 'multipart/form-data'
    }
});

export default {

    getListProduct() {
        return apiAxios({
            method: 'get',
            url: '/product',
        })
    },

    storeProduct(data) {
        return apiAxios({
            method: 'post',
            url: '/product/store',
            data
        });
    },

    detailProduct(slug) {
        return apiAxios({
            method: 'get',
            url: 'product/detail/' + slug,
        })
    },

    getListCategories() {
        return apiAxios({
            method: 'get',
            url: '/category',
        });
    },

    storeCategory(data) {
        return apiAxios({
            method: 'post',
            url: '/category/store',
            data
        });
    }
}