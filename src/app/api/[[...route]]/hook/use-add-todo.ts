import { work } from '../../../../../db/schema';
import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "../../../../../lib/hono"



type ResponseType = InferResponseType<typeof client.api.work.$post>;
type RequestType = InferRequestType<typeof client.api.work.$post>["json"]

export const useAddTodo = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        RequestType,
        Error
    >({
        mutationFn: async (json) => {
            const response = await client.api.work.$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account created");
            queryClient.invalidateQueries({ queryKey: ["accounts"] })
        },
        onError: () => {
            toast.error("failed to create account");
        }
    })


    return mutation;
}

