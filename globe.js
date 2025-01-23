class Globe {
    constructor() {
        // Keep existing constructor code
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
        // Saturn body with gradient material
        const SATURN_RADIUS = 5;
        const geometry = new THREE.SphereGeometry(SATURN_RADIUS, 64, 64); // Increased segments for smoother gradients
        
        // Create gradient material for Saturn's body
        const material = new THREE.MeshPhongMaterial({
            color: 0xf4d03f,
            emissive: 0x996515,
            emissiveIntensity: 0.2,
            transparent: false,
            shininess: 25,
            vertexColors: true
        });

        // Add color variations to vertices
        const colors = [];
        const vertices = geometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
            const y = vertices[i + 1];
            const normalizedY = (y + SATURN_RADIUS) / (2 * SATURN_RADIUS);
            colors.push(
                0.9 - 0.3 * normalizedY, // R: darker at poles
                0.8 - 0.2 * normalizedY, // G: gradual change
                0.6 - 0.1 * normalizedY  // B: subtle variation
            );
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        this.saturn = new THREE.Mesh(geometry, material);
        this.scene.add(this.saturn);
        
        // Multiple ring layers for more detail
        const ringMaterials = [
            new THREE.MeshPhongMaterial({
                color: 0xd4c4a8,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide
            }),
            new THREE.MeshPhongMaterial({
                color: 0xc2b280,
                transparent: true,
                opacity: 0.7,
                side: THREE.DoubleSide
            }),
            new THREE.MeshPhongMaterial({
                color: 0xb8860b,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide
            })
        ];

        // Create multiple ring layers
        const ringRadii = [[8, 9.5], [9.5, 11], [11, 12]];
        ringRadii.forEach((radii, index) => {
            const ringGeometry = new THREE.RingGeometry(radii[0], radii[1], 128, 8);
            const ring = new THREE.Mesh(ringGeometry, ringMaterials[index]);
            ring.rotation.x = Math.PI / 2;
            this.scene.add(ring);
        });
        
        this.camera.position.z = 20;
    }
    
    // Keep existing setupLights() and animate() methods
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
        
        this.saturn.rotation.y += 0.002;
        
        const radius = 20;
        const speed = 0.2;
        
        this.camera.position.x = radius * Math.cos(time * speed);
        this.camera.position.z = radius * Math.sin(time * speed);
        this.camera.position.y = Math.sin(time * speed * 0.5) * 10;
        
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
}
