import { useEffect, useState } from "react";
import { downloadData } from "aws-amplify/storage";
import { SphereProps } from "./components/sphere/SphereProps";
import { Services } from "./services/services";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Sphere from "./components/sphere/Sphere";
import { Planets } from "./models/Planets";

function App() {
  const [earthProps, setEarthProps] = useState<SphereProps>({});

  useEffect(() => {
    getEarthTextures();
  }, []);

  const getEarthTextures = async (): Promise<void> => {
    const response = await Services.client.models.Planet.list({ filter: { name: { eq: Planets.EARTH } } });

    const image = await downloadData({
      path: response.data[0].mapPath,
    }).result;

    const mapUrl = URL.createObjectURL(await image.body.blob());
    setEarthProps({
      radius: response.data[0].radius / response.data[0].radius,
      mapUrl: mapUrl,
    });
  }

  return (
    <section className="container-fluid">
      <div style={{ height: "100vh" }}>
        <Canvas>
          <OrbitControls autoRotate autoRotateSpeed={0.2}></OrbitControls>
          <ambientLight intensity={0.2}></ambientLight>
          <pointLight position={[10, 0, 0]} intensity={200.0}></pointLight>
          <Stars></Stars>
          <Sphere mapUrl={earthProps.mapUrl} radius={earthProps.radius}></Sphere>
        </Canvas>
      </div>
    </section>
  );
}

export default App;
