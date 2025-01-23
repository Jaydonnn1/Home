class Globe {
    constructor() {
        this.init();
        this.animate();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // Enhanced camera for better viewing angle
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 30, 100);

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('globe-canvas'),
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Enhanced lighting for realistic shadows
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        const mainLight = new THREE.DirectionalLight(0xffffff, 2);
        mainLight.position.set(30, 0, 30);
        const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
        backLight.position.set(-30, 0, -30);
        this.scene.add(ambientLight, mainLight, backLight);

        // Saturn body with realistic coloring
        const saturnGeometry = new THREE.SphereGeometry(20, 64, 64);
        const saturnMaterial = new THREE.MeshPhongMaterial({
            color: 0xf4d03f,
            emissive: 0x996515,
            emissiveIntensity: 0.1,
            shininess: 15,
            specular: new THREE.Color(0x666666)
        });
        this.saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
        this.saturn.rotation.z = THREE.MathUtils.degToRad(26.73);
        this.scene.add(this.saturn);

        // Multi-layered rings for detail
        this.createRings();

        this.clock = new THREE.Clock();
        this.cameraAngle = 0;
    }

    createRings() {
        // Main ring system
        const ringGeometries = [
            new THREE.RingGeometry(30, 45, 128, 8),  // Outer ring
            new THREE.RingGeometry(28, 30, 128, 8),  // Middle ring
            new THREE.RingGeometry(25, 28, 128, 8)   // Inner ring
        ];

        const ringMaterials = [
            new THREE.MeshPhongMaterial({
                color: 0xd4c4a8,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            }),
            new THREE.MeshPhongMaterial({
                color: 0xa89b8c,
                transparent: true,
                opacity: 0.7,
                side: THREE.DoubleSide
            }),
            new THREE.MeshPhongMaterial({
                color: 0x8b7355,
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide
            })
        ];

        ringGeometries.forEach((geometry, index) => {
            const ring = new THREE.Mesh(geometry, ringMaterials[index]);
            ring.rotation.x = Math.PI / 2;
            ring.rotation.z = THREE.MathUtils.degToRad(26.73);
            this.scene.add(ring);
        });

        // Cassini Division
        const cassiniGap = new THREE.RingGeometry(29.5, 30, 128, 8);
        const cassiniMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        });
        const cassiniRing = new THREE.Mesh(cassiniGap, cassiniMaterial);
        cassiniRing.rotation.x = Math.PI / 2;
        cassiniRing.rotation.z = THREE.MathUtils.degToRad(26.73);
        this.scene.add(cassiniRing);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();
        
        // Slow, majestic rotation
        this.saturn.rotation.y += 0.02 * delta;
        
        // Camera movement
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
