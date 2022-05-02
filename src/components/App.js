import React, {useState, useEffect} from 'react';
import axios from 'axios';

// ローカルで立ち上げているモックサーバのURL
const todoDataUrl = "http://localhost:3100/todos";

function App() {
  // todoListは現在のTodoの状態を保存する変数
  // setTodoListはTodoの状態を変更する関数
  // todoListの初期値に空の配列を格納する
  const [ todoList, setTodoList ] = useState([]);

  // useEffectを利用してコンポーネントのマウント後に処理を実行
  // async/awaitを利用して非同期処理を行う
  useEffect(() => {
    const fetchData = async() => {
      // getは外部から情報を取得する基本機能
      // 引数にURLを入れるとURLに対してGETリクエストを送信する
      // リクエスト後に戻ってくる値は全てresponseに保存される
      const response = await axios.get(todoDataUrl);

      // 戻された値についてuseStateを使ってtodoListの現在の値としてセットする
      setTodoList(response.data);
    } ;
    fetchData();
  }, []);

  // console.logでコンソールログに取得したTODOのリストを表示してみる
  console.log("TODOリスト: ", todoList);

  // fileterの機能を使って、未完了のタスクのみを抽出する
  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  // console.logで未完了タスクを表示する
  console.log("未完了タスク", inCompletedList);

  // filterを使って、完了状態のタスクのみを抽出する
  const completedList = todoList.filter((todo0) => {
    return todo.done;
  });

  // console.logで完了状態のタスクを表示する
  console.log("完了タスク", completedList);

  return (
    <>
      <h1>TODO進捗管理</h1>
      <textarea />
      <button>+ TODOを追加</button>
      <h2>未完了TODOリスト</h2>
      <ul>
        {inCompletedList.map((todo) =>(
          <li key={todo.id}>
            {todo.content}
            <button>
              {todo.done ? "未完了リストへ" : "完了リストへ"}
            </button>
            <button>削除</button>
          </li>
        ))}
      </ul>
      <h2>完了TODOリスト</h2>
      <ul>
        {completedList.map((todo) => (
          <li key={todo.id}>
            {todo.content}
          </li>
        ))}
      </ul>
      <h2>TODOリスト</h2>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            {todo.content}({todo.done ? "完了": "未完了"})
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
