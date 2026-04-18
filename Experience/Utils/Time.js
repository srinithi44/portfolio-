export default class Time {
    constructor() {
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16; // Time between frames (assuming 60fps)
        this.callbacks = {};

        this.tick();
    }

    tick() {
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        this.trigger('tick');

        window.requestAnimationFrame(() => {
            this.tick();
        });
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
