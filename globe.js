class Globe {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('globe-canvas'),
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Load Saturn textures
        const textureLoader = new THREE.TextureLoader();
        const saturnTexture = textureLoader.load('https://www.solarsystemscope.com/textures/download/8k_saturn.jpg');
        const ringTexture = textureLoader.load('https://www.solarsystemscope.com/textures/download/8k_saturn_ring_alpha.png');
        
        this.initSaturn(saturnTexture);
        this.initRings(ringTexture);
        this.setupLights();
        this.setupCamera();
        
        this.animate();
    }
    
    initSaturn(texture) {
        const geometry = new THREE.SphereGeometry(10, 64, 64);
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpScale: 0.05,
            specular: new THREE.Color(0x333333)
        });
        
        this.saturn = new THREE.Mesh(geometry, material);
        // Saturn's axial tilt
        this.saturn.rotation.z = THREE.MathUtils.degToRad(26.73);
        this.scene.add(this.saturn);
    }
    
    initRings(texture) {
        const ringGeometry = new THREE.RingGeometry(15, 25, 128);
        const ringMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide
        });
        
        this.rings = new THREE.Mesh(ringGeometry, ringMaterial);
        this.rings.rotation.x = Math.PI / 2;
        this.rings.rotation.z = THREE.MathUtils.degToRad(26.73);
        this.scene.add(this.rings);
    }
    
    setupCamera() {
        this.camera.position.set(30, 20, 30);
        this.camera.lookAt(0, 0, 0);
        
        // Camera animation parameters
        this.cameraAngle = 0;
        this.cameraHeight = 0;
        this.radius = 40;
    }
    
    setupLights() {
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
        mainLight.position.set(30, 0, 30);
        
        const ambientLight = new THREE.AmbientLight(0x404040);
        
        this.scene.add(mainLight, ambientLight);
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
