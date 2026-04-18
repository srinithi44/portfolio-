import * as THREE from 'three';
import Experience from './Experience.js';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000);
        this.instance.position.set(15, 15, 15); // "Isometric" offset
        this.scene.add(this.instance);
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        if (!this.experience.world || !this.experience.world.car) return;

        const car = this.experience.world.car.instance;
        
        // Target position: Character pos + fixed offset
        const targetX = car.position.x + 15;
        const targetY = car.position.y + 15;
        const targetZ = car.position.z + 15;

        // Smoothly lerp camera position
        this.instance.position.x += (targetX - this.instance.position.x) * 0.05;
        this.instance.position.y += (targetY - this.instance.position.y) * 0.05;
        this.instance.position.z += (targetZ - this.instance.position.z) * 0.05;

        // Always look toward the car
        this.instance.lookAt(car.position);
    }
}



