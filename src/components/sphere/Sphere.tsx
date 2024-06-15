import * as THREE from 'three';
import { SphereProps } from './SphereProps';

export default function Sphere(props: SphereProps) {
    const map = new THREE.TextureLoader().load(props.map ? props.map : "");

    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]}></sphereGeometry>
            <meshStandardMaterial
                attach="material"
                wireframeLinewidth={1}
                wireframe={props.map ? false : true}
                map={map}>
            </meshStandardMaterial>
        </mesh>
    );
}