import * as THREE from 'three';
import Experience from '../Experience.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Car from './Car.js';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.floor = new Floor();
        this.environment = new Environment();
        this.car = new Car();

        this.setIslands();
        this.currentZone = null;
    }

    setIslands() {
        this.islands = [
            { id: 'projects', color: '#ff5555', pos: { x: 15, z: 0 } },
            { id: 'skills', color: '#55ff55', pos: { x: 0, z: 15 } },
            { id: 'about', color: '#5555ff', pos: { x: -15, z: 15 } }
        ];

        this.islands.forEach(item => {
            // The Island Platform
            const geometry = new THREE.BoxGeometry(10, 0.5, 10);
            const material = new THREE.MeshStandardMaterial({ color: item.color, roughness: 0.1, metalness: 0.5 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(item.pos.x, 0.25, item.pos.z);
            mesh.receiveShadow = true;
            this.scene.add(mesh);

            // The Interaction Marker (Floating shapes)
            const marker = new THREE.Mesh(
                new THREE.IcosahedronGeometry(1, 0),
                new THREE.MeshStandardMaterial({ color: item.color, emissive: item.color, emissiveIntensity: 2 })
            );
            marker.position.set(item.pos.x, 3, item.pos.z);
            this.scene.add(marker);
            item.marker = marker;
        });
    }

    checkProximity() {
        if (!this.car) return;
        
        const carPos = this.car.instance.position;
        let activeZone = null;

        this.islands.forEach(island => {
            const dist = carPos.distanceTo(island.marker.position);
            
            // Animate markers
            island.marker.rotation.y += 0.01;
            island.marker.position.y = 3 + Math.sin(this.experience.time.elapsed * 0.002) * 0.2;

            if (dist < 8) activeZone = island.id;
        });

        if (activeZone !== this.currentZone) {
            this.updateUI(activeZone);
            this.currentZone = activeZone;
        }
    }

    updateUI(zoneId) {
        const panels = document.querySelectorAll('.panel');
        panels.forEach(p => p.classList.remove('active'));
        
        if (zoneId) {
            const activePanel = document.getElementById(`panel-${zoneId}`);
            if (activePanel) activePanel.classList.add('active');
        }
    }

    update() {
        if (this.car) this.car.update();
        this.checkProximity();
    }
}






