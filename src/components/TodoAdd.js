import { Textarea, Button} from "@chakra-ui/react";

// Todoを追加するためのコンポーネント
// 親コンポーネントから色々とpropsを受け取っている
export const TodoAdd = ({
    placeholder,
    leftIcon,
    buttonText,
    inputEl,
    handleAddTodoListItem
}) => {
    return (
        <>
            <Textarea
                placeholder={placeholder}
                bgcolor="white"
                mt="8"
                borderColor="gray.400"
                ref={inputEl}
            />
            <Button
                onClick={handleAddTodoListItem}
                colorScheme="blue"
                leftIcon={leftIcon}
                mt="8"
            >
                {buttonText}
            </Button>
        </>
    );
};