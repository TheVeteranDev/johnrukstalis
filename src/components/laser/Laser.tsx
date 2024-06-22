import { LaserProps } from "./LaserProps";
import { useCylinder } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Laser(props: LaserProps) {
    const [ref, api] = useCylinder<THREE.Object3D<THREE.Object3DEventMap> | any>(() => ({
        mass: 0.0,
        position: [0, 0, 5],
        rotation: [Math.PI / 2, 0, 0],
    }));

    useFrame(() => {
        // api.position.set(Math.sin(clock.getElapsedTime()) * 5, 0, 0)

        if (ref.current.position.z < -5) {
            ref.current.position.z = 5
        } else {
            ref.current.position.z -= props.velocity
        }
        api.position.set(0, 0, ref.current.position.z)
    })

    return (
        <mesh ref={ref}>
            <cylinderGeometry args={[props.radius, props.radius, props.length]}></cylinderGeometry>
            <meshBasicMaterial color={props.color}></meshBasicMaterial>
        </mesh>
    )
}