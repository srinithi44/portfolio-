import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import Experience from './Experience.js';

export default class PostProcessing {
    constructor() {
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.renderer = this.experience.renderer.instance;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera.instance;
        this.sizes = this.experience.sizes;

        this.setComposer();
    }

    setComposer() {
        this.renderPass = new RenderPass(this.scene, this.camera);

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.sizes.width, this.sizes.height),
            1.5,
            0.4,
            0.85
        );
        this.bloomPass.threshold = 0.2;
        this.bloomPass.strength = 1.2;
        this.bloomPass.radius = 0.5;

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(this.renderPass);
        this.composer.addPass(this.bloomPass);
    }

    resize() {
        this.composer.setSize(this.sizes.width, this.sizes.height);
    }

    update() {
        this.composer.render();
    }
}
