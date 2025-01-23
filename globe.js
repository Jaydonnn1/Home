class Globe {
    constructor() {
        // Debug log to ensure constructor is called
        console.log('Initializing Saturn visualization');
        this.init();
        this.animate();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 0, 150);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('globe-canvas'),
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Basic lighting
        const light = new THREE.DirectionalLight(0xffffff, 3);
        light.position.set(50, 50, 50);
        this.scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);

        // Create Saturn
        const geometry = new THREE.SphereGeometry(15, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.1,
            roughness: 0.7
        });
        
        this.saturn = new THREE.Mesh(geometry, material);
        this.scene.add(this.saturn);

        // Create rings
        const ringGeometry = new THREE.RingGeometry(20, 35, 64);
        const ringMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            side: THREE.DoubleSide,
            metalness: 0.3,
            roughness: 0.6
        });
        
        this.rings = new THREE.Mesh(ringGeometry, ringMaterial);
        this.rings.rotation.x = Math.PI / 2;
        this.scene.add(this.rings);

        // Debug log
        console.log('Saturn and rings added to scene');

        // Animation properties
        this.clock = new THREE.Clock();
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate Saturn
        if (this.saturn) {
            this.saturn.rotation.y += 0.005;
        }

        // Rotate camera around Saturn
        const time = this.clock.getElapsedTime();
        const radius = 150;
        this.camera.position.x = radius * Math.cos(time * 0.1);
        this.camera.position.z = radius * Math.sin(time * 0.1);
        this.camera.position.y = Math.sin(time * 0.1) * 30;
        this.camera.lookAt(0, 0, 0);

        // Render scene
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
}
