class Globe {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('globe-canvas'),
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        this.initGlobe();
        this.setupLights();
        this.animate();
    }
    
    initGlobe() {
        const GLOBE_RADIUS = 5;
        const geometry = new THREE.SphereGeometry(GLOBE_RADIUS, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x2b3595,
            transparent: true,
            opacity: 0.8
        });
        
        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);
        
        this.camera.position.z = 15;
    }
    
    setupLights() {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 3, 5);
        this.scene.add(light);
        
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.globe.rotation.y += 0.001;
        this.renderer.render(this.scene, this.camera);
    }
}
