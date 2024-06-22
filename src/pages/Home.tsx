import { Suspense, useEffect, useState } from "react";
import { SphereProps } from "../components/sphere/SphereProps";
import { downloadData } from "aws-amplify/storage";
import { Planets, EARTH_RADIUS } from "../models/Planets";
import { Canvas } from "@react-three/fiber";
import Sphere from "../components/sphere/Sphere";
import { Services } from "../services/services";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Laser from "../components/laser/Laser";

export default function Home() {
    const [earthProps, setEarthProps] = useState<SphereProps>({});
    const [cloudProps, setCloudProps] = useState<SphereProps>({});
    const [moonProps, setMoonProps] = useState<SphereProps>({});

    useEffect(() => {
        getTextures(Planets.EARTH).then((props) => setEarthProps(props));
        getTextures(Planets.CLOUDS).then((props) => setCloudProps(props));
        getTextures(Planets.MOON).then((props) => setMoonProps(props));
    }, []);

    // const createPlanets = async () => {
    //     await Services.client.models.Planet.create({ name: Planets.EARTH, radius: 3958.8, mapPath: "assets/earth8k.jpeg" })
    //     await Services.client.models.Planet.create({ name: Planets.CLOUDS, radius: 3958.8 * 1.01, mapPath: "assets/clouds.jpeg" })
    //     await Services.client.models.Planet.create({ name: Planets.MOON, radius: 1079.6, mapPath: "assets/moon.jpeg" })
    // }

    // const deletePlanets = async () => {
    //     const earth = await Services.client.models.Planet.list({ filter: { name: { eq: Planets.EARTH } } });
    //     const clouds = await Services.client.models.Planet.list({ filter: { name: { eq: Planets.CLOUDS } } });
    //     const moon = await Services.client.models.Planet.list({ filter: { name: { eq: Planets.MOON } } });

    //     await Services.client.models.Planet.delete({ id: earth.data[0].id });
    //     await Services.client.models.Planet.delete({ id: clouds.data[0].id });
    //     await Services.client.models.Planet.delete({ id: moon.data[0].id });
    // }

    const getTextures = async (planet: Planets): Promise<SphereProps> => {
        const response = await Services.client.models.Planet.list({ filter: { name: { eq: planet } } });

        if (!response.data || response.data.length === 0) {
            throw new Error(`No data found for planet ${planet}`);
        }

        const image = await downloadData({
            path: response.data[0].mapPath,
        }).result;

        const mapUrl = URL.createObjectURL(await image.body.blob());
        const props: SphereProps = {
            radius: response.data[0].radius / EARTH_RADIUS,
            mapUrl: mapUrl,
        };

        return props;
    }

    return (
        <section className="container-fluid">
            {/* <button className="button is-primary" onClick={() => createPlanets()}> Create Planet Data </button>
            <button className="button is-danger" onClick={() => deletePlanets()}> Create Planet Data </button> */}
            <div style={{ height: "100vh" }}>
                <Canvas>
                    <Suspense fallback={null}>
                        <Physics>
                            <Laser color={"red"} velocity={0.1} length={0.5} radius={0.01}></Laser>
                        </Physics>

                        <OrbitControls autoRotate autoRotateSpeed={0.2}></OrbitControls>
                        <ambientLight intensity={0.2}></ambientLight>
                        <pointLight position={[50, 0, 0]} intensity={5000.0}></pointLight>
                        <Stars></Stars>
                        <Sphere mapUrl={earthProps.mapUrl} radius={earthProps.radius} ></Sphere>

                        <Sphere
                            mapUrl={cloudProps.mapUrl}
                            radius={cloudProps.radius}
                            transparent={true}
                            opacity={0.25}
                            rotationSpeedX={0.0002}
                            rotationSpeedY={0.0001}>
                        </Sphere>

                        <Sphere mapUrl={moonProps.mapUrl} radius={moonProps.radius} position={[2, 0, 1.5]}></Sphere>
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}