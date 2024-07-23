import { work } from '../../../../../db/schema';
import { useQuery } from "@tanstack/react-query";

import { client } from '@root/lib/hono'



export const useGetTodos = () => {
    
    const query = useQuery({
        queryKey: ['accounts'],
        
        queryFn: async () => {
            const response = await client.api.work.$get();

            if (!response.ok) {
                throw new Error("Failed to fetch accounts")
            }

            const {data} = await response.json();
            return data
        }
    })

    return query
}