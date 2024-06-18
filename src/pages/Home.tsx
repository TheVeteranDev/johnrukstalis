import { useEffect, useState } from "react";
import { SphereProps } from "../components/sphere/SphereProps";
import { downloadData } from "aws-amplify/storage";
import { Planets, EARTH_RADIUS } from "../models/Planets";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Sphere from "../components/sphere/Sphere";
import { Services } from "../services/services";

export default function Home() {
    const [earthProps, setEarthProps] = useState<SphereProps>({});
    const [cloudProps, setCloudProps] = useState<SphereProps>({});
    const [moonProps, setMoonProps] = useState<SphereProps>({});

    useEffect(() => {
        getTextures(Planets.EARTH).then((props) => setEarthProps(props));
        getTextures(Planets.CLOUDS).then((props) => setCloudProps(props));
        getTextures(Planets.MOON).then((props) => setMoonProps(props));
    }, []);

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
            <div style={{ height: "100vh" }}>
                <Canvas>
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
                        rotationSpeedX={0.0005}
                        rotationSpeedY={0.0005}>
                    </Sphere>

                    <Sphere mapUrl={moonProps.mapUrl} radius={moonProps.radius} position={[2, 0, 1.5]}></Sphere>
                </Canvas>
            </div>
        </section>
    );
}