import type { ComponentProps } from "react";
import TodoItem from "../todoItem";
import { VStack } from "styled-system/jsx";

type TodoListProps = {
  todos: ComponentProps<typeof TodoItem>[];
};

const TodoList = ({ todos }: TodoListProps) => (
  <VStack gap={4} padding={2} width={"300px"}>
    {todos.map((item) => (
      <TodoItem key={item.id} {...item} />
    ))}
  </VStack>
);

export default TodoList;
