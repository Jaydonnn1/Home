class Globe {
    constructor() {
        this.init();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 30, 100);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('globe-canvas'),
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const pointLight = new THREE.PointLight(0xffffff, 100);
        pointLight.position.set(10, 10, 10);
        this.scene.add(ambientLight, pointLight);

        // Saturn
        const saturnGeometry = new THREE.SphereGeometry(20, 32, 32);
        const saturnMaterial = new THREE.MeshPhongMaterial({
            color: 0xffcc99,
            shininess: 30
        });
        this.saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
        this.scene.add(this.saturn);

        // Rings
        const ringGeometry = new THREE.RingGeometry(30, 40, 64);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0xcccccc,
            side: THREE.DoubleSide,
            shininess: 30
        });
        this.rings = new THREE.Mesh(ringGeometry, ringMaterial);
        this.rings.rotation.x = Math.PI / 2;
        this.scene.add(this.rings);

        // Animation properties
        this.clock = new THREE.Clock();
        this.cameraAngle = 0;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();
        
        // Rotate Saturn
        this.saturn.rotation.y += 0.1 * delta;
        
        // Move camera
        this.cameraAngle += 0.1 * delta;
        const radius = 100;
        const height = Math.sin(this.cameraAngle * 0.5) * 30;
        
        this.camera.position.x = Math.cos(this.cameraAngle) * radius;
        this.camera.position.z = Math.sin(this.cameraAngle) * radius;
        this.camera.position.y = height;
        
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }
}
