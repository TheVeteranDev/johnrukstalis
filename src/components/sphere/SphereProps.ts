export class SphereProps {
    radius?: number = 1;
    widthSegments?: number = 32;
    heightSegments?: number = 32;
    position?: [number, number, number] = [0, 0, 0];
    color?: string = "white";
    transparent?: boolean = true;
    opacity?: number = 1;
    mapUrl?: string;
}