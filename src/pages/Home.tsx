import { useEffect, useState } from "react";
import { SphereProps } from "../components/sphere/SphereProps";
import { downloadData } from "aws-amplify/storage";
import { Planets } from "../models/Planets";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Sphere from "../components/sphere/Sphere";
import { Services } from "../services/services";

export default function Home() {
    const [earthProps, setEarthProps] = useState<SphereProps>({});
    const [cloudProps, setCloudProps] = useState<SphereProps>({});

    useEffect(() => {
        getTextures(Planets.EARTH);
        getTextures(Planets.CLOUDS);
    }, []);

    const getTextures = async (planet: Planets): Promise<void> => {
        const response = await Services.client.models.Planet.list({ filter: { name: { eq: planet } } });

        const image = await downloadData({
            path: response.data[0].mapPath,
        }).result;

        const mapUrl = URL.createObjectURL(await image.body.blob());
        const props: SphereProps = {
            radius: response.data[0].radius / response.data[0].radius,
            mapUrl: mapUrl,
        };

        if (planet === Planets.EARTH) {
            setEarthProps(props);
        }

        if (planet === Planets.CLOUDS) {
            props.radius! += 0.02;
            setCloudProps(props);
        }
    }

    return (
        <section className="container-fluid">
            <div style={{ height: "100vh" }}>
                <Canvas>
                    <OrbitControls autoRotate autoRotateSpeed={0.2}></OrbitControls>
                    <ambientLight intensity={0.2}></ambientLight>
                    <pointLight position={[10, 0, 0]} intensity={200.0}></pointLight>
                    <Stars></Stars>
                    <Sphere mapUrl={earthProps.mapUrl} radius={earthProps.radius} ></Sphere>
                    <Sphere mapUrl={cloudProps.mapUrl} radius={cloudProps.radius} transparent={true} opacity={0.25}></Sphere>
                </Canvas>
            </div>
        </section>
    );
}