import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Particles {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;

        this.setParticles();
    }

    setParticles() {
        this.count = 2000;
        this.geometry = new THREE.BufferGeometry();
        this.positions = new Float32Array(this.count * 3);

        for (let i = 0; i < this.count * 3; i++) {
            this.positions[i] = (Math.random() - 0.5) * 100;
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

        this.material = new THREE.PointsMaterial({
            size: 0.1,
            sizeAttenuation: true,
            color: '#FFD700',
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        this.points = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.points);
    }

    update() {
        // Subtle drift for golden embers
        const elapsedTime = this.time.elapsed * 0.00005;
        this.points.rotation.y = elapsedTime;
        this.points.position.y = Math.sin(elapsedTime * 10) * 0.5;
    }
}

