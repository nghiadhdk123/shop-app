import axios from "axios";

export const apiAxios = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: {
        'Content-Type': 'multipart/form-data',
        common: {},
    }
});

apiAxios.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    });

export default {

    getListProduct() {
        return apiAxios({
            method: 'get',
            url: '/product',
        });
    },

    detailProduct(slug) {
        return apiAxios({
            method: 'get',
            url: 'product/detail/' + slug,
        });
    },

    getListCategories() {
        return apiAxios({
            method: 'get',
            url: '/category',
        });
    },

    detailCategory(slug) {
        return apiAxios({
            method: 'get',
            url: '/category/' + slug,
        });
    },

    //admin

    //Product
    getListProductAdmin() {
        return apiAxios({
            method: 'get',
            url: '/admin/product',
        });
    },

    storeProduct(data) {
        return apiAxios({
            method: 'post',
            url: '/admin/product/store',
            data
        });
    },

    //Category
    getListCategoriesAdmin() {
        return apiAxios({
            method: 'get',
            url: '/admin/category',
        });
    },

    storeCategory(data) {
        return apiAxios({
            method: 'post',
            url: '/admin/category/store',
            data
        });
    },

    //User
    getListUser() {
        return apiAxios({
            method: 'get',
            url: '/admin/user',
        })
    },

    storeUser(data) {
        return apiAxios({
            method: 'post',
            url: '/admin/user/store',
            data
        });
    },


    //Chat
    storeChat(data) {
        return apiAxios({
            method: 'post',
            url: '/admin/chat/store',
            data
        });
    },

    findChat(chatId) {
        return apiAxios({
            method: 'get',
            url: '/admin/chat/t/' + chatId,
        });
    },

    sendMessage(data) {
        return apiAxios({
            method: 'post',
            url: '/admin/chat/sendMessage',
            data
        });
    },

    login(data) {
        return apiAxios({
            method: 'post',
            url: '/admin/auth/login',
            data,
        });
    },
}