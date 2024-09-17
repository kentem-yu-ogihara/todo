import { useState } from "react";
import { HStack } from "../../../styled-system/jsx";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Editable } from "~/components/ui/editable";
import { css } from "styled-system/css";

type TodoItemProps = {
  id: string;
  text: string;
  isChecked: boolean;
  onChange: (value: string) => void;
  checkOnClick: () => void;
  deleteOnClick: () => void;
};

const TodoItem = ({
  id,
  text,
  isChecked,
  onChange,
  checkOnClick,
  deleteOnClick,
}: TodoItemProps) => {
  const [editedValue, setEditedValue] = useState(text);
  return (
    <HStack justify={"space-between"} width={"full"}>
      <Checkbox
        id={id}
        checked={isChecked}
        onChange={checkOnClick}
        colorPalette="border"
      />
      <Editable.Root
        color={isChecked ? "border.default" : "none"}
        textDecoration={isChecked ? "line-through" : "none"}
        defaultValue={text}
        activationMode="focus"
        onFocusOutside={(e) => {
          if (e.target instanceof HTMLInputElement && e.target.value.trim()) {
            onChange(e.target.value);
            return;
          }
          setEditedValue(text);
        }}
        onValueChange={(details) => {
          setEditedValue(details.value);
        }}
        value={editedValue}
        padding={"4px"}
      >
        <Editable.Area>
          <Editable.Input
            className={css({
              borderRadius: "4px",
              paddingInline: "4px",
              _focus: { outline: "none", bgColor: "#96C78C" },
            })}
          />
          <Editable.Preview />
        </Editable.Area>
      </Editable.Root>
      <Button size={"xs"} colorPalette="red" onClick={deleteOnClick}>
        削除
      </Button>
    </HStack>
  );
};

export default TodoItem;
