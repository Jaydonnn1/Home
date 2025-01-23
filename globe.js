class Globe {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 30, 100);
        
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('globe-canvas'),
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Initialize globe
        this.initGlobe();
        
        // Setup lights
        this.setupLights();
        
        // Start animation
        this.animate();
    }
    
    initGlobe() {
        // Create Saturn's body
        const GLOBE_RADIUS = 5;
        const geometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
        const material = new THREE.MeshPhongMaterial({
            color: 0xf4d03f, // Golden yellow
            transparent: true,
            opacity: 1,
            shininess: 25
        });
        
        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);
        
        // Create Saturn's rings
        const ringGeometry = new THREE.RingGeometry(8, 12, 64, 8);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0xd4c4a8, // Beige color for rings
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
            shininess: 30
        });
        
        this.rings = new THREE.Mesh(ringGeometry, ringMaterial);
        this.rings.rotation.x = Math.PI / 2;
        this.scene.add(this.rings);
        
        // Position camera
        this.camera.position.z = 15;
    }
    
    setupLights() {
        const light = new THREE.DirectionalLight(0xffffff, 2);
        light.position.set(5, 3, 5);
        this.scene.add(light);
        
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        this.scene.add(ambientLight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.globe.rotation.y += 0.001;
        this.renderer.render(this.scene, this.camera);
    }
}
