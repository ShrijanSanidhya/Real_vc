import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

// Fetch user data from backend to get role
const fetchUserRole = async () => {
    const response = await axiosInstance.get("/users/me");
    return response.data;
};

export const useUserRole = () => {
    const { user, isLoaded } = useUser();

    const { data, isLoading } = useQuery({
        queryKey: ["userRole", user?.id],
        queryFn: fetchUserRole,
        enabled: !!user && isLoaded,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    return {
        role: data?.user?.role || "candidate",
        isLoading: !isLoaded || isLoading,
        isInterviewer: data?.user?.role === "interviewer",
        isCandidate: data?.user?.role === "candidate",
    };
};
