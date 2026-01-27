import axiosInstance from "../lib/axios";

export const userApi = {
    getMe: async () => {
        const response = await axiosInstance.get("/users/me");
        return response.data;
    },
    updateRole: async (role) => {
        const response = await axiosInstance.put("/users/me/role", { role });
        return response.data;
    }
};
