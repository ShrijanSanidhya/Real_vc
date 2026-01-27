import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { problemApi } from "../api/problems";
import toast from "react-hot-toast";

export const useGenerateProblem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: problemApi.generate,
        onSuccess: (data) => {
            toast.success(data.message || "Problem generated successfully");
            queryClient.invalidateQueries(["problems"]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to generate problem");
        },
    });
};

export const useProblems = () => {
    return useQuery({
        queryKey: ["problems"],
        queryFn: problemApi.getAll,
    });
};

export const useProblem = (id) => {
    return useQuery({
        queryKey: ["problem", id],
        queryFn: () => problemApi.getById(id),
        enabled: !!id,
    });
};

export const useCreateProblem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: problemApi.create,
        onSuccess: () => {
            toast.success("Problem created successfully");
            queryClient.invalidateQueries(["problems"]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create problem");
        },
    });
};

export const useUpdateProblem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => problemApi.update(id, data),
        onSuccess: (_, variables) => {
            toast.success("Problem updated successfully");
            queryClient.invalidateQueries(["problems"]);
            queryClient.invalidateQueries(["problem", variables.id]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update problem");
        },
    });
};

export const useDeleteProblem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: problemApi.delete,
        onSuccess: () => {
            toast.success("Problem deleted successfully");
            queryClient.invalidateQueries(["problems"]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete problem");
        },
    });
};

export const useSeedProblems = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: problemApi.seed,
        onSuccess: (data) => {
            toast.success(data.message || "Problems seeded successfully");
            queryClient.invalidateQueries(["problems"]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to seed problems");
        },
    });
};
