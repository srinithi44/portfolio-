import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Resources {
    constructor(sources) {
        this.sources = sources;
        this.callbacks = {};

        // Items
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    }

    startLoading() {
        // Load each source
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                }, undefined, (error) => {
                    console.error('Error loading model:', source.path, error);
                });
            } else if (source.type === 'texture') {
                this.loaders.textureLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                }, undefined, (error) => {
                    console.error('Error loading texture:', source.path, error);
                });
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                }, undefined, (error) => {
                    console.error('Error loading cube texture:', source.path, error);
                });
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file;
        this.loaded++;

        if (this.loaded === this.toLoad) {
            this.trigger('ready');
        }
    }

    on(name, callback) {
        if (!this.callbacks[name]) this.callbacks[name] = [];
        this.callbacks[name].push(callback);
    }

    trigger(name) {
        if (this.callbacks[name]) {
            this.callbacks[name].forEach(callback => callback());
        }
    }
}
