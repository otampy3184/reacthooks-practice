import axios from 'axios';

// todoデータを格納しているモックサーバのURLを定義
const todoDataUrl = "http://localhost:3100/todo";

// モックサーバーにある全todoデータをクエリする処理getAllTodoData()
export const getAllTodosData = async () => {
    const response = await axios.get(todoDataUrl);
    return response.data;
};

// モックサーバーに対してpostで新しいTODOのデータを追加する処理addTodoData()
export const addTodoData = async (todo) => {
    const response = await axios.post(todoDataUrl, todo);
    return response.data;
};

// モックサーバーに対して指定したidのTODOを削除する処理deleteTodoData()
export const deleteTodoData = async (id) => {
    await axios.delete(`${todoDataUrl}/${id}`);
    return id;
};

// モックサーバーに対して指定したidのTODOデータを更新する処理updateTodoData()
export const updatedTodoData = async (id) => {
    const response = await axios.put(`${todoDataUrl}/${id}`);
    return response.data;
};

