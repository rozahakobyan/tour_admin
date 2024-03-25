import axios from "axios";
import {Account} from "../helpers/account";

export const API_URL = 'http://localhost:4000/'
const api = axios.create({
    baseURL: 'http://localhost:4000'
})
api.interceptors.request.use((config) => {
    const token = Account.getTokenStrong()
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        Account.removeStrong()
    }
    return Promise.reject(error);
});


export class Api {
    static login(payload) {
        return api.post("/users/login", payload)
    }

    static profile() {
        return api.get("/users/profile")
    }

    static forgetSendEmail(payload) {
        return api.post("/users/send-password-recovery-code", payload)
    }

    static verificationEmailCode(payload) {
        return api.post("/users/validate-password-recovery-code", payload)
    }

    static forgetPassword(payload) {
        return api.post("/users/password-update", payload)
    }

    static updateProfile(payload) {
        return api.put("/users/profile-update", payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    static forgetPasswordProfile(payload) {
        return api.put("/users/update-password", payload)
    }

    static usersList(params) {
        return api.get('/users/get-users', {params});
    }

    static usersDelete(id) {
        return api.delete(`/users/delete/${id}`);
    }

    static addDestinations(payload) {
        return api.post("/destinations/add", payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    static allDestinations() {
        return api.get("/destinations/list")
    }

    static deleteDestinations(id) {
        return api.delete("/destinations/delete/" + id)
    }

    static updateDestinations(payload) {
        const {id, isActive, ...data} = payload
        return api.put(`/destinations/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    static addCategories(payload) {
        return api.post(`/categories/create`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    static allCategories() {
        return api.get("/categories/list")
    }

    static deleteCategories(id) {
        return api.delete("/categories/delete/" + id)
    }

    static updateCategories(payload) {
        const {id, isActive, createdAt, updatedAt, ...data} = payload
        return api.patch(`/categories/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    static addTour(payload) {
        return api.post(`/toures/create`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    static allTour(page) {
        return api.get(`/toures/list?page=${page}`)
    }

    static itemTour(id) {
        return api.get(`/toures/get-tour/${id}`)
    }

    static deleteTour(id) {
        return api.delete(`/toures/delete/${id}`)
    }

    static updateTour(payload) {
        const {id, tour} = payload
        console.log(tour, 'hello')
        return api.put(`/toures/update/${id}`, tour, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    static deleteTourGallery(imageId) {
        return api.delete(`/toures/remove-gallery-image/${imageId}`)
    }

    static deleteTourSchedule(scheduleId) {
        return api.delete(`/toures/remove-schedule/${scheduleId}`)
    }
}


