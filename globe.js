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
        
        this.initSaturn();
        this.setupLights();
        this.clock = new THREE.Clock();
        this.animate();
    }
    
    initSaturn() {
        // Saturn body
        const SATURN_RADIUS = 5;
        const geometry = new THREE.SphereGeometry(SATURN_RADIUS, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0xf4d03f, // Golden yellow color
            transparent: false,
            shininess: 25
        });
        
        this.saturn = new THREE.Mesh(geometry, material);
        this.scene.add(this.saturn);
        
        // Saturn's rings
        const ringGeometry = new THREE.RingGeometry(8, 12, 64, 5);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0xd4c4a8, // Beige color for rings
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });
        
        this.rings = new THREE.Mesh(ringGeometry, ringMaterial);
        this.rings.rotation.x = Math.PI / 2;
        this.scene.add(this.rings);
        
        // Position camera
        this.camera.position.z = 20;
    }
    
    setupLights() {
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
        mainLight.position.set(5, 3, 5);
        this.scene.add(mainLight);
        
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        this.scene.add(ambientLight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = this.clock.getElapsedTime();
        
        // Rotate Saturn
        this.saturn.rotation.y += 0.002;
        
        // Move camera in a complex path
        const radius = 20;
        const speed = 0.2;
        
        this.camera.position.x = radius * Math.cos(time * speed);
        this.camera.position.z = radius * Math.sin(time * speed);
        this.camera.position.y = Math.sin(time * speed * 0.5) * 10; // Up and down movement
        
        // Always look at Saturn
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
}
