// import { useEffect, useState } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
// import { downloadData } from "aws-amplify/storage";
import { Canvas } from "@react-three/fiber";
// import * as THREE from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import Sphere from "./components/sphere/Sphere";
import { Planets } from "./models/Planets";

// const client = generateClient<Schema>();

function App() {
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  // const [earthTexture, setEarthTexture] = useState<THREE.Texture>();

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });

  //   getEarthTexture();
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  // const deleteTodo = (id: string) => {
  //   client.models.Todo.delete({ id });
  // }

  // const getEarthTexture = async () => {
  //   const result2 = await downloadData({
  //     path: "assets/earth8k.jpeg",
  //   }).result;

  //   const url = URL.createObjectURL(await result2.body.blob());
  //   const texture = new THREE.TextureLoader().load(result2.path);
  //   setEarthTexture(texture);

  //   return url;
  // }

  return (
    <main className="container-fluid">
      <div style={{ height: "100vh" }}>
        <Canvas>
          <OrbitControls></OrbitControls>
          <ambientLight intensity={1.0}></ambientLight>
          <Stars></Stars>
          <Sphere mapUrl={Planets.Earth.COLOR_MAP}></Sphere>
        </Canvas>
      </div>
    </main>
  );
}

export default App;
