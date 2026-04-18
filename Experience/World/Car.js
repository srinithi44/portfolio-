import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Car {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setInstance();
        this.setControls();
    }

    setInstance() {
        // We will use a simple Red Box as our car for now
        this.instance = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.5, 2),
            new THREE.MeshStandardMaterial({ color: '#ffdd00' })
        );
        this.instance.position.y = 0.5;
        this.instance.castShadow = true;
        this.scene.add(this.instance);
    }

    setControls() {
        this.actions = {
            forward: false,
            backward: false,
            left: false,
            right: false
        };

        window.addEventListener('keydown', (event) => {
            if (event.code === 'KeyW' || event.code === 'ArrowUp') this.actions.forward = true;
            if (event.code === 'KeyS' || event.code === 'ArrowDown') this.actions.backward = true;
            if (event.code === 'KeyA' || event.code === 'ArrowLeft') this.actions.left = true;
            if (event.code === 'KeyD' || event.code === 'ArrowRight') this.actions.right = true;
        });

        window.addEventListener('keyup', (event) => {
            if (event.code === 'KeyW' || event.code === 'ArrowUp') this.actions.forward = false;
            if (event.code === 'KeyS' || event.code === 'ArrowDown') this.actions.backward = false;
            if (event.code === 'KeyA' || event.code === 'ArrowLeft') this.actions.left = false;
            if (event.code === 'KeyD' || event.code === 'ArrowRight') this.actions.right = false;
        });

        // Movement stats
        this.speed = 0;
        this.angle = 0;
    }

    update() {
        // Forward / Backward speed
        if (this.actions.forward) this.speed += 0.005;
        if (this.actions.backward) this.speed -= 0.005;

        // Friction (slow down when not pressing keys)
        this.speed *= 0.95;

        // Steering
        if (this.actions.left) this.angle += 0.05;
        if (this.actions.right) this.angle -= 0.05;

        // Apply movement
        this.instance.rotation.y = this.angle;
        this.instance.position.x += Math.sin(this.angle) * this.speed;
        this.instance.position.z += Math.cos(this.angle) * this.speed;
    }
}
