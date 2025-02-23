import { useQuery } from "@tanstack/react-query";

const fetchTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    return res.json();
};

export function useTodos() {
    return useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });
}
