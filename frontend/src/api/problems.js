import axiosInstance from "../lib/axios";

export const problemApi = {
    getAll: async () => {
        const response = await axiosInstance.get("/problems");
        return response.data;
    },

    getById: async (id) => {
        const response = await axiosInstance.get(`/problems/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await axiosInstance.post("/problems", data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await axiosInstance.put(`/problems/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await axiosInstance.delete(`/problems/${id}`);
        return response.data;
    },

    seed: async () => {
        const { data } = await axiosInstance.post("/problems/seed");
        return data;
    },
    generate: async () => {
        const { data } = await axiosInstance.post("/problems/generate");
        return data;
    },
};
