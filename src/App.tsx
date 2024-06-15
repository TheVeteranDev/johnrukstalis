import { useEffect, useState } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
import { downloadData } from "aws-amplify/storage";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Sphere from "./components/sphere/Sphere";
import { SphereProps } from "./components/sphere/SphereProps";

// const client = generateClient<Schema>();

function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [earthProps, setEarthProps] = useState<SphereProps>({});

  useEffect(() => {
    // client.models.Todo.observeQuery().subscribe({
    //   next: (data) => setTodos([...data.items]),
    // });

    getEarthTextures();
  }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  // const deleteTodo = (id: string) => {
  //   client.models.Todo.delete({ id });
  // }

  const getEarthTextures = async (): Promise<void> => {
    const result2 = await downloadData({
      path: "assets/earth8k.jpeg",
    }).result;

    const map = URL.createObjectURL(await result2.body.blob());
    setEarthProps({ map: map });
  }

  return (
    <main className="container-fluid">
      <div style={{ height: "100vh" }}>
        <Canvas>
          <OrbitControls></OrbitControls>
          <ambientLight intensity={0.2}></ambientLight>
          <pointLight position={[10, 0, 0]} intensity={200.0}></pointLight>
          <Stars></Stars>
          <Sphere map={earthProps.map}></Sphere>
        </Canvas>
      </div>
    </main>
  );
}

export default App;
