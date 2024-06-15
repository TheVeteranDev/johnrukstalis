import * as THREE from 'three';
import { SphereProps } from './SphereProps';

export default function Sphere(props: SphereProps) {
    const map = new THREE.TextureLoader().load(props.mapUrl ? props.mapUrl : "");

    return (
        <mesh position={props.position}>
            <sphereGeometry args={[props.radius ? props.radius : 0.0, props.widthSegments, props.heightSegments]}></sphereGeometry>
            <meshStandardMaterial
                color={props.color}
                transparent={props.transparent}
                opacity={props.opacity}
                map={map}>
            </meshStandardMaterial>
        </mesh>
    );
}