import { useState, useEffect } from "react";

// 一意なIDを生成するULIDの取得
import { ulid } from "ulid";
import { updateTodoData } from "../../../references/react-reacthooks-lesson/src/apis/todos";

// todo.js内で宣言してExportしていた関数をImportして使用できるようにする
import * as todoData from "../apis/todos";

// App.js内で利用するためにExportしておく
export const useTodo = () => {
    // 現在のTODOの状態を保存するtodoList
    // todoListを更新するためのsetTodoList
    const [todoList, setTodoList] = useState([]);

    // useEffectを使ってコンポーネント後のマウント、アンマウント後に処理を実行する
    useEffect(() => {
        // モックサーバーからTodoを取得後、取得順から反転させることで実際の並びに直す
        todoData.getAllTodosData().then((todo) => {
            setTodoList([...todo].reverse());
        });
    }, []);

    // TODOの真偽値を反転させて完了、未完了を切り替える
    const toggleTodoListItemStatus = (id, done) => {
        const todoItem = todoList.find((item) => item.id === id);
        const newTodoItem = {...todoItem, done: !done};
        todoData.updatedTodoData(id, newTodoItem).then((updateTodo) => {
            const newTodoList = todoList.map((item) => 
                item.id !== updateTodo.id ? item : updateTodo
            );
        setTodoList(newTodoList);
        });
    };

    // 新しいTodoを追加する
    const addTodoListItem = (todoContent) => {
        const newTodoItem = {
            content: todoContent,
            id: ulid(),
            done: false
        };
        return todoData.addTodoData(newTodoItem).then((addTodo) => {
            setTodoList([addTodo, ...todoList]);
        });
    };

    // Todoを削除する
    const deleteListItem = (id) => {
        todoData.deleteTodoData(id).then((deleteListItemId) => {
            const newTodoList = todoList.filter(
                (item) => item.id !== deleteListItemId
            );
            setTodoList(newTodoList);
        });
    };

    // 利用できるようにReturnする
    return {
        todoList,
        toggleTodoListItemStatus,
        addTodoListItem,
        deleteListItem
    };
};