import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { getUrl, GetUrlWithPathInput } from "aws-amplify/storage";
import { StorageImage } from "@aws-amplify/ui-react-storage"

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [earthTexture, setEarthTexture] = useState<string>();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });

    getEarthTexture();
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  const deleteTodo = (id: string) => {
    client.models.Todo.delete({ id });
  }
  const getEarthTexture = async () => {
    const path: GetUrlWithPathInput = {
      path: "earth8k.jpeg",
    };
    const url = await getUrl(path);
    console.log(url);
    setEarthTexture(url.url.href);
  }

  return (
    <main className="container">
      <h1 className="title is-1">My todos</h1>
      <button className="button is-primary" onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a className="button is-dark" href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <div>
        {
          earthTexture ? <StorageImage alt="earth" path="assets/earth8k.jpeg" /> : "Loading earth texture..."
        }

      </div>
    </main>
  );
}

export default App;
