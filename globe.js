class Globe {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(30, 20, 30);
        
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('globe-canvas'),
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Create a basic sphere while textures load
        const geometry = new THREE.SphereGeometry(10, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x2b3595,
            shininess: 15
        });
        
        this.saturn = new THREE.Mesh(geometry, material);
        this.scene.add(this.saturn);
        
        // Basic ring
        const ringGeometry = new THREE.RingGeometry(15, 25, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x808080,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });
        
        this.rings = new THREE.Mesh(ringGeometry, ringMaterial);
        this.rings.rotation.x = Math.PI / 2;
        this.scene.add(this.rings);
        
        // Lights
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 3, 5);
        this.scene.add(light);
        
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        
        // Animation settings
        this.cameraAngle = 0;
        this.radius = 40;
        
        this.animate();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate Saturn
        this.saturn.rotation.y += 0.002;
        
        // Move camera
        this.cameraAngle += 0.001;
        const height = Math.sin(this.cameraAngle * 0.5) * 20;
        
        this.camera.position.x = Math.cos(this.cameraAngle) * this.radius;
        this.camera.position.z = Math.sin(this.cameraAngle) * this.radius;
        this.camera.position.y = height;
        
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
}
