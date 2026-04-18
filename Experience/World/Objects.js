import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Objects {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.setModel();
        this.setFloatingShapes();
    }

    setModel() {
        this.model = this.resources.items.roomModel;
        this.actualModel = this.model.scene;
        this.actualModel.scale.set(0.5, 0.5, 0.5);
        this.actualModel.position.y = 0.5;
        this.actualModel.castShadow = true;
        this.scene.add(this.actualModel);

        // Animate model
        this.actualModel.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }

    setFloatingShapes() {
        this.group = new THREE.Group();
        this.scene.add(this.group);

        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshStandardMaterial({ color: '#ff00ff', metalness: 0.5, roughness: 0.1 });

        for (let i = 0; i < 5; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 6,
                Math.random() * 2 + 1,
                (Math.random() - 0.5) * 6
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            mesh.castShadow = true;
            this.group.add(mesh);
        }
    }

    update() {
        // Floating effect
        const elapsedTime = this.time.elapsed * 0.001;
        
        if (this.actualModel) {
            this.actualModel.position.y = 0.5 + Math.sin(elapsedTime) * 0.1;
            this.actualModel.rotation.y += 0.005;
        }

        this.group.children.forEach((mesh, i) => {
            mesh.position.y += Math.sin(elapsedTime + i) * 0.005;
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
        });
    }
}
