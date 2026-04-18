import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setGeometry();
        this.setMaterial();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(200, 200);
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: '#050505',
            metalness: 0.9,
            roughness: 0.1
        });
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = -Math.PI * 0.5;
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
        
        // Add a luxury golden grid
        this.gridHelper = new THREE.GridHelper(200, 100, '#FFD700', '#111111');
        this.gridHelper.position.y = 0.01;
        this.gridHelper.material.opacity = 0.15;
        this.gridHelper.material.transparent = true;
        this.scene.add(this.gridHelper);
    }
}



