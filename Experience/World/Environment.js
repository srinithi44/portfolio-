import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setLights();
        this.setFog();
    }

    setLights() {
        // Luxury Golden Directional Light
        this.sunLight = new THREE.DirectionalLight('#FFD700', 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 100;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(10, 20, 10);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
        this.scene.add(this.ambientLight);
        
        // Add subtle point lights for atmosphere around the "starting zone"
        const startLight = new THREE.PointLight('#FFD700', 5, 20);
        startLight.position.set(0, 5, 0);
        this.scene.add(startLight);
    }

    setFog() {
        this.scene.fog = new THREE.FogExp2('#050505', 0.02);
        this.scene.background = new THREE.Color('#050505');
    }
}



