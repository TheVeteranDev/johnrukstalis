import * as THREE from 'three';
import { SphereProps } from './SphereProps';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Sphere(props: SphereProps) {
    const map: THREE.Texture = new THREE.TextureLoader().load(props.mapUrl ? props.mapUrl : "");
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += props.rotationSpeedX ? props.rotationSpeedX : 0.0;
            meshRef.current.rotation.y += props.rotationSpeedY ? props.rotationSpeedY : 0.0;
            meshRef.current.rotation.z += props.rotationSpeedZ ? props.rotationSpeedZ : 0.0;
        }
    });

    return (
        <mesh
            position={props.position}
            rotation={props.rotation}
            ref={meshRef}>

            <sphereGeometry
                args={[props.radius ? props.radius : 0.0, props.widthSegments, props.heightSegments]}>
            </sphereGeometry>

            <meshStandardMaterial
                color={props.color}
                map={map}
                opacity={props.opacity}
                transparent={props.transparent}>
            </meshStandardMaterial>

        </mesh>
    );
}