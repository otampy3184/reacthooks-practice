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

  return (
    <>
      <h1>TODO進捗管理</h1>
      <textarea />
      <button>+ TODOを追加</button>
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
