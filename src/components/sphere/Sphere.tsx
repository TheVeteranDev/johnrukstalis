import * as THREE from 'three';
import { SphereProps } from './SphereProps';

export default function Sphere(props: SphereProps) {
    const map = new THREE.TextureLoader().load(props.mapUrl ? props.mapUrl : "");

    return (
        <mesh>
            <sphereGeometry args={[props.radius, props.widthSegments, props.heightSegments]}></sphereGeometry>
            <meshStandardMaterial
                wireframeLinewidth={10}
                wireframe={props.mapUrl ? false : true}
                map={map}>
            </meshStandardMaterial>
        </mesh>
    );
}