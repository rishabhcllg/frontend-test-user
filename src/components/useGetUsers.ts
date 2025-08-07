import { useEffect, useState } from "react";

export type User = {
    id: string;
    email: string;
    username: string;
    phone: string;
    website: string;
}

const useGetUsers = () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await res.json();
                
                if(data && data?.length) setData(data);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    return {
        users: data,
        loading: isLoading,
        error
    }
}

export default useGetUsers;