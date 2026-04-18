import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Experience from '../Experience.js';

export default class Character {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.setInstance();
        this.setControls();
    }

    setInstance() {
        // Use a standard model from Three.js examples as a placeholder
        this.loader = new GLTFLoader();
        this.loader.load(
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb',
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(0.4, 0.4, 0.4);
                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        // Replace material with a luxury chrome/gold look
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x050505,
                            metalness: 1,
                            roughness: 0.1,
                            envMapIntensity: 1
                        });
                    }
                });
                this.scene.add(this.model);

                // Animations
                this.mixer = new THREE.AnimationMixer(this.model);
                this.animations = {};

                gltf.animations.forEach((clip) => {
                    this.animations[clip.name] = this.mixer.clipAction(clip);
                });

                this.currentAnimation = this.animations['Idle'];
                this.currentAnimation.play();
            }
        );
    }

    setControls() {
        this.controlKeys = {
            forward: false,
            backward: false,
            left: false,
            right: false
        };

        window.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'KeyW': case 'ArrowUp': this.controlKeys.forward = true; break;
                case 'KeyS': case 'ArrowDown': this.controlKeys.backward = true; break;
                case 'KeyA': case 'ArrowLeft': this.controlKeys.left = true; break;
                case 'KeyD': case 'ArrowRight': this.controlKeys.right = true; break;
            }
        });

        window.addEventListener('keyup', (event) => {
            switch(event.code) {
                case 'KeyW': case 'ArrowUp': this.controlKeys.forward = false; break;
                case 'KeyS': case 'ArrowDown': this.controlKeys.backward = false; break;
                case 'KeyA': case 'ArrowLeft': this.controlKeys.left = false; break;
                case 'KeyD': case 'ArrowRight': this.controlKeys.right = false; break;
            }
        });

        this.walkSpeed = 0.08;
        this.rotationSpeed = 0.1;
    }

    update() {
        if (!this.model || !this.mixer) return;

        // Mixer Update
        this.mixer.update(this.time.delta * 0.001);

        const isMoving = this.controlKeys.forward || this.controlKeys.backward || this.controlKeys.left || this.controlKeys.right;

        // Switch Animations
        if (isMoving && this.currentAnimation === this.animations['Idle']) {
            this.currentAnimation.crossFadeTo(this.animations['Walking'], 0.2, true);
            this.currentAnimation = this.animations['Walking'];
            this.currentAnimation.play();
        } else if (!isMoving && this.currentAnimation === this.animations['Walking']) {
            this.currentAnimation.crossFadeTo(this.animations['Idle'], 0.2, true);
            this.currentAnimation = this.animations['Idle'];
            this.currentAnimation.play();
        }

        // Movement Logic
        if (this.controlKeys.forward) {
            this.model.position.x += Math.sin(this.model.rotation.y) * this.walkSpeed;
            this.model.position.z += Math.cos(this.model.rotation.y) * this.walkSpeed;
        }
        if (this.controlKeys.backward) {
            this.model.position.x -= Math.sin(this.model.rotation.y) * this.walkSpeed;
            this.model.position.z -= Math.cos(this.model.rotation.y) * this.walkSpeed;
        }
        if (this.controlKeys.left) {
            this.model.rotation.y += this.rotationSpeed;
        }
        if (this.controlKeys.right) {
            this.model.rotation.y -= this.rotationSpeed;
        }
    }
}
