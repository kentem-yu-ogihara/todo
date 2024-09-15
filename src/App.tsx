import { useState } from "react";
import { HStack, Stack, VStack } from "styled-system/jsx";
import { Input } from "~/components/ui/input";
import { Dialog } from "~/components/ui/dialog";
import { Button } from "./components/ui/button";
import { css } from "styled-system/css";
import { XIcon } from "lucide-react";
import { IconButton } from "./components/ui/icon-button";
import TodoList from "./components/todoList";

function App() {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState<{ id: string; text: string }[]>([]);
	const [checkedIds, setCheckedIds] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const isCompleted =
		todos.length > 0 &&
		todos.every((todo) => checkedIds.some((c) => c === todo.id));

	const createTodo = () => {
		setTodos((prev) => [
			...prev,
			{ id: self.crypto.randomUUID(), text: input },
		]);
	};

	return (
		<VStack padding={24} gap={1}>
			<HStack>
				<label htmlFor="input-label">TODO: </label>
				<Input
					id="input-label"
					placeholder="タスクを入力してください"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && createTodo()}
				/>
				<Button
					width={"28"}
					onClick={createTodo}
					className={css({
						bgColor: "green",
						_disabled: { bgColor: "border" },
					})}
					disabled={!input}
				>
					追加する
				</Button>
				<Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
					<Dialog.Trigger asChild>
						<Button width={"40"} colorPalette="red" disabled={!todos.length}>
							全て削除する
						</Button>
					</Dialog.Trigger>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Stack gap="8" p="6">
								<Stack gap="1">
									<Dialog.Title>確認</Dialog.Title>
									<Dialog.Description>
										タスクを全て削除します。よろしいですか？
									</Dialog.Description>
								</Stack>
								<Stack gap="3" direction="row" width="full">
									<Dialog.CloseTrigger asChild>
										<Button variant="outline" width="full">
											やめる
										</Button>
									</Dialog.CloseTrigger>
									<Button
										width="full"
										onClick={() => {
											setCheckedIds([]);
											setTodos([]);
											setIsOpen(false);
										}}
										bgColor={"red"}
									>
										消す
									</Button>
								</Stack>
							</Stack>
							<Dialog.CloseTrigger
								asChild
								position="absolute"
								top="2"
								right="2"
							>
								<IconButton aria-label="Close Dialog" variant="ghost" size="sm">
									<XIcon />
								</IconButton>
							</Dialog.CloseTrigger>
						</Dialog.Content>
					</Dialog.Positioner>
				</Dialog.Root>
			</HStack>
			{isCompleted ? (
				<span className={css({ color: "green", fontSize: "40px" })}>
					タスク完了!
				</span>
			) : null}
			<TodoList
				todos={todos.map((t) => ({
					id: t.id,
					isChecked: checkedIds.includes(t.id),
					text: t.text,
					onChange: (value) => {
						setTodos((todos) =>
							todos.map((x) => (x.id === t.id ? { ...x, text: value } : x)),
						);
					},
					checkOnClick: () =>
						setCheckedIds((todo) =>
							todo.includes(t.id)
								? todo.filter((x) => x !== t.id)
								: [...todo, t.id],
						),
					deleteOnClick: () =>
						setTodos((todo) => todo.filter((x) => x.id !== t.id)),
				}))}
			/>
		</VStack>
	);
}

export default App;
