import * as THREE from 'three';
import Experience from './Experience.js';

export default class Interaction {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.mouse = this.experience.mouse;
        this.resources = this.experience.resources;

        this.setRaycaster();
    }

    setRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.currentIntersect = null;

        window.addEventListener('click', () => {
            if (this.currentIntersect) {
                // Handle click action
                console.log('Interacted with:', this.currentIntersect.object);
                this.triggerAnimation(this.currentIntersect.object);
            }
        });
    }

    triggerAnimation(object) {
        if (window.gsap) {
            window.gsap.to(object.rotation, {
                y: object.rotation.y + Math.PI * 2,
                duration: 1,
                ease: 'back.out(1.7)'
            });
        }
    }

    update() {
        if (!this.experience.world.objects) return;

        this.raycaster.setFromCamera(this.mouse, this.camera.instance);

        const objectsToTest = [];
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) objectsToTest.push(child);
        });

        const intersects = this.raycaster.intersectObjects(objectsToTest);

        if (intersects.length) {
            if (!this.currentIntersect) {
                // On hover enter
                document.body.style.cursor = 'pointer';
            }
            this.currentIntersect = intersects[0];
        } else {
            if (this.currentIntersect) {
                // On hover leave
                document.body.style.cursor = 'default';
            }
            this.currentIntersect = null;
        }
    }
}
