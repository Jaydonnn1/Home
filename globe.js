class Globe {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        
        // Enhanced camera setup for Saturn viewing
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(30, 20, 30);
        
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('globe-canvas'),
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        this.initSaturn();
        this.setupLights();
        this.setupCameraAnimation();
        this.animate();
    }
    
    initSaturn() {
        // Create Saturn's body
        const saturnGeometry = new THREE.SphereGeometry(10, 64, 64);
        const textureLoader = new THREE.TextureLoader();
        
        // Load Saturn's texture
        const saturnTexture = textureLoader.load('https://www.solarsystemscope.com/textures/download/8k_saturn.jpg');
        const saturnMaterial = new THREE.MeshPhongMaterial({
            map: saturnTexture,
            bumpScale: 0.05
        });
        
        this.saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
        
        // Apply Saturn's axial tilt (26.73 degrees)
        this.saturn.rotation.z = THREE.MathUtils.degToRad(26.73);
        this.scene.add(this.saturn);
        
        // Create Saturn's rings
        const ringGeometry = new THREE.RingGeometry(15, 25, 128, 64);
        const ringTexture = textureLoader.load('https://www.solarsystemscope.com/textures/download/8k_saturn_ring_alpha.png');
        const ringMaterial = new THREE.MeshPhongMaterial({
            map: ringTexture,
            transparent: true,
            side: THREE.DoubleSide,
            opacity: 0.8
        });
        
        this.rings = new THREE.Mesh(ringGeometry, ringMaterial);
        this.rings.rotation.x = Math.PI / 2;
        this.rings.rotation.z = THREE.MathUtils.degToRad(26.73);
        this.scene.add(this.rings);
    }
    
    setupLights() {
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
        mainLight.position.set(30, 0, 30);
        
        const ambientLight = new THREE.AmbientLight(0x404040);
        const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
        backLight.position.set(-30, 0, -30);
        
        this.scene.add(mainLight, ambientLight, backLight);
    }
    
    setupCameraAnimation() {
        this.cameraAngle = 0;
        this.cameraHeight = 0;
        this.radius = 40;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate Saturn
        this.saturn.rotation.y += 0.002;
        
        // Animate camera
        this.cameraAngle += 0.001;
        this.cameraHeight = Math.sin(this.cameraAngle * 0.5) * 20;
        
        this.camera.position.x = Math.cos(this.cameraAngle) * this.radius;
        this.camera.position.z = Math.sin(this.cameraAngle) * this.radius;
        this.camera.position.y = this.cameraHeight;
        
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
}
