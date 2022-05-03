import React, {useState, useEffect} from 'react';
import axios from 'axios';

// ローカルで立ち上げているモックサーバのURL
const todoDataUrl = "http://localhost:3100/todos";

// TodoTitleコンポーネントを作成
// 見出しタグがh1, h2の場合は条件分岐を作成しておく
// 親コンポーネントからtitle, asをpropsとして受け取る
const TodoTitle = ({ title, as }) => {
  // asがh1ならtitleタグはh1タグ
  if (as === "h1") return <h1>{title}</h1>;

  // asがh2ならtitleタグはh2タグ
  if (as === "h2") return <h2>{title}</h2>;

  // どちらでもなければpタグ
  return <p>{title}</p>;
};

// TodoItemコンポーネントを作成
// 親コンポーネントからTodoをpropsとして受け取る
const TodoItem = ({ todo }) => {
  return (
    <li>

      {/** Todoの内容 */}
      {todo.content}
      {/* Todoが完了の場合は「未完了リストへ」、未完了の場合は「完了リストへ」と表示するボタンを設置する */}
      {/* 現時点でトグルボタンは機能していない */}
      <button>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>

      {/* TODOの削除ボタンを作成しておくが、現状ではまだ完成していない */}
      <button>削除</button>

    </li>
  );
};

// TODOリストコンポーネントを作成
// 親コンポーネントからtodolistをpropsとして受け取る
const TodoList = ({ todoList }) => {
  return (
  <ul>
    {/** mapを使ってTodoアイテムをひとつづつ取り出す */}
    {todoList.map((todo) => (
      <TodoItem todo={todo} key={todo.id}/>
    ))}
  </ul>
  );
};
 
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
  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  // console.logで完了状態のタスクを表示する
  console.log("完了タスク", completedList);

  return (
    <>

    {/**TodoTitleコンポーネントを使用する */}
      <TodoTitle title="Todo進捗管理" as="h1"/>

      <textarea />

      <button>+ TODOを追加</button>

      <TodoTitle title="未完了TODOリスト" as="h2"/>

      <ul>
        {inCompletedList.map((todo) =>(
          <li key={todo.id}>
            {todo.content}
            <button>
              {todo.done ? "未完了リストへ" : "完了リストへ"}
            </button>
            {/*現時点では削除ボタンは機能していない*/}
            <button>削除</button>
          </li>
        ))}
      </ul>

      <TodoTitle title="完了リスト" as="h2"/>
      <ul>
        {completedList.map((todo) => (
          <li key={todo.id}>
            {todo.content}
            <button>
              {todo.done ? "未完了リストへ" : "完了リストへ"}
            </button>
            {/*現時点では削除ボタンは機能していない*/}
            <button>削除</button>
          </li>
        ))}
      </ul>
      {/** Todoリストもコンポーネント化 */}
      <h2>TODOリスト</h2>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            {todo.content}({todo.done ? "完了": "未完了"})
          </li>
        ))}
      </ul>
      <TodoList todoList={completedList}/>
    </>
  );
}

export default App;
