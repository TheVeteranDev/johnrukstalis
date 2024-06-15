import { useEffect, useState } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
import { downloadData } from "aws-amplify/storage";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane, Stars } from "@react-three/drei";
import Sphere from "./components/sphere/Sphere";
import { SphereProps } from "./components/sphere/SphereProps";
import { Planets } from "./models/Planets";

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
      path: Planets.Earth.MAP_PATH.valueOf(),
    }).result;

    const mapUrl = URL.createObjectURL(await result2.body.blob());
    setEarthProps({
      radius: Planets.Earth.RADIUS.valueOf() / Planets.Earth.RADIUS.valueOf(),
      mapUrl: mapUrl,
    });
  }

  return (
    <main className="container-fluid">
      <div style={{ height: "100vh" }}>
        <Canvas>
          <OrbitControls autoRotate autoRotateSpeed={0.2}></OrbitControls>
          <ambientLight intensity={0.2}></ambientLight>
          <pointLight position={[10, 0, 0]} intensity={200.0}></pointLight>
          <Stars></Stars>
          <Sphere mapUrl={earthProps.mapUrl} radius={earthProps.radius}></Sphere>
        </Canvas>
      </div>
    </main>
  );
}

export default App;
