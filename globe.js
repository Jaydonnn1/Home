class Globe {
    constructor() {
        this.init();
        this.animate();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // Camera setup with better positioning
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 30, 100);
        this.camera.lookAt(0, 0, 0);

        // Enhanced renderer settings
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('globe-canvas'),
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Enhanced lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
        directionalLight.position.set(30, 10, 30);
        const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
        backLight.position.set(-30, 0, -30);
        this.scene.add(ambientLight, directionalLight, backLight);

        // Saturn body
        const saturnGeometry = new THREE.SphereGeometry(20, 64, 64);
        const saturnMaterial = new THREE.MeshPhongMaterial({
            color: 0xf4d03f,
            shininess: 25,
            specular: 0x333333,
            emissive: 0x996515,
            emissiveIntensity: 0.1
        });
        this.saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
        this.saturn.rotation.z = THREE.MathUtils.degToRad(26.73);
        this.scene.add(this.saturn);

        // Main ring system
        const ringGeometry = new THREE.RingGeometry(30, 45, 128, 8);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0xd4c4a8,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
            shininess: 30,
            specular: new THREE.Color(0x808080)
        });
        this.rings = new THREE.Mesh(ringGeometry, ringMaterial);
        this.rings.rotation.x = Math.PI / 2;
        this.rings.rotation.z = THREE.MathUtils.degToRad(26.73);
        this.scene.add(this.rings);

        // Cassini Division (dark gap)
        const cassiniGeometry = new THREE.RingGeometry(36, 38, 128, 8);
        const cassiniMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9
        });
        const cassiniDivision = new THREE.Mesh(cassiniGeometry, cassiniMaterial);
        cassiniDivision.rotation.x = Math.PI / 2;
        cassiniDivision.rotation.z = THREE.MathUtils.degToRad(26.73);
        this.scene.add(cassiniDivision);

        // Inner ring
        const innerRingGeometry = new THREE.RingGeometry(25, 30, 128, 8);
        const innerRingMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b7355,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.6,
            shininess: 30
        });
        const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
        innerRing.rotation.x = Math.PI / 2;
        innerRing.rotation.z = THREE.MathUtils.degToRad(26.73);
        this.scene.add(innerRing);

        this.clock = new THREE.Clock();
        this.cameraAngle = 0;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();
        
        // Slower rotation for more majestic movement
        this.saturn.rotation.y += 0.02 * delta;
        
        // Smoother camera movement
        this.cameraAngle += 0.05 * delta;
        const radius = 100;
        const height = Math.sin(this.cameraAngle * 0.5) * 30;
        
        this.camera.position.x = Math.cos(this.cameraAngle) * radius;
        this.camera.position.z = Math.sin(this.cameraAngle) * radius;
        this.camera.position.y = height;
        
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }
}
