"use client";

import { useTodos } from "@/lib/useTodos";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data, isLoading, error } = useTodos();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados.</p>;

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Tarefas</h1>
      <ul className="space-y-2">
        {data?.slice(0, 5).map((todo: { id: string, title: string }) => (
          <li key={todo.id} className="flex items-center gap-2">
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
      <Button className="mt-4">Clique Aqui</Button>
    </main>
  );
}
