import * as THREE from 'three';
import { SphereProps } from './SphereProps';

export default function Sphere(props: SphereProps) {
    const mapTexture = new THREE.TextureLoader().load(props.mapUrl);

    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]}></sphereGeometry>
            <meshBasicMaterial map={mapTexture}></meshBasicMaterial>
        </mesh>
    );
}