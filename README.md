<style>
    /* ... (keep your existing styles) ... */

    #globe-container {
        background-color: #000000;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 0;
    }
    
    /* Add these new styles */
    .content-wrapper {
        position: relative;
        z-index: 1;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.8) 80%,
            rgba(0, 0, 0, 0) 100%
        );
    }

    .spacer {
        height: 100vh;
        background: transparent;
    }
</style>

<body>
    <div id="globe-container">
        <canvas id="globe-canvas"></canvas>
    </div>
    
    <div class="content-wrapper">
        <div class="top-nav">
            <a href="#engineering">Engineering</a>
            <a href="#travels">Travels</a>
        </div>

        <div class="header-content">
            <h1>Josh Haydon Rowe</h1>
            <p>Welcome to My Personal Website</p>
        </div>

        <section id="introduction">
            <h2>Introduction</h2>
            <p>I am a senior majoring in chemical engineering at the University of Edinburgh with a year abroad at UC Berkeley, with research experience at Yale, and a few months interning at Tesla. I'm interested in renewable energy sources, climate tech, global exploration, language learning & a little surfing on the side.</p>
        </section>

        <section id="engineering">
            <h2>Engineering</h2>
            <p>This section is dedicated to engineering.</p>
        </section>

        <section id="travels">
            <h2>Travels</h2>
            <p>Explore my travel adventures:</p>
            <div class="travel-buttons">
                <button onclick="location.href='mexico-to-colombia.html'">Mexico to Colombia</button>
                <button onclick="location.href='lima-to-ushuaia.html'">Lima to Ushuaia - Hitchhiking the Panamerican Highway</button>
            </div>
        </section>
    </div>
    
    <!-- Add this spacer div after your content -->
    <div class="spacer"></div>
    
    <script src="globe.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const globe = new Globe();
            
            window.addEventListener('resize', () => {
                globe.camera.aspect = window.innerWidth / window.innerHeight;
                globe.camera.updateProjectionMatrix();
                globe.renderer.setSize(window.innerWidth, window.innerHeight);
            });

            // Add scroll event listener
            window.addEventListener('scroll', () => {
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;
                const contentWrapper = document.querySelector('.content-wrapper');
                const contentHeight = contentWrapper.offsetHeight;
                
                // Calculate opacity based on scroll position
                const opacity = Math.max(0, Math.min(1, 
                    1 - (scrollPosition / (contentHeight - windowHeight))
                ));
                
                contentWrapper.style.background = `linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, ${opacity * 0.9}) 0%,
                    rgba(0, 0, 0, ${opacity * 0.8}) 80%,
                    rgba(0, 0, 0, 0) 100%
                )`;
            });
        });
    </script>
</body>
