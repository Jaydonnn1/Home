<html lang="en">
<head>
    <link rel="canonical" href="https://joshhaydonrowe.com/" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Josh Haydon Rowe </title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        header {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
            position: relative;
        }

        .top-nav {
            position: absolute;
            top: 20px;
            right: 20px;
            display: flex;
            gap: 10px;
        }

        .top-nav a {
            text-decoration: none;
            color: #fff;
            padding: 10px 20px;
            border: 1px solid #fff;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .top-nav a:hover {
            background-color: #fff;
            color: #333;
        }

        section {
            padding: 50px;
        }

        h2 {
            text-align: center;
        }

        .travel-buttons button {
            padding: 10px 20px;
            margin: 5px;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <header>
        <div class="top-nav">
            <a href="#engineering">Engineering</a>
            <a href="#travels">Travels</a>
            <a href="path-to-your-resume/resume.pdf">Resume</a>
        </div>
        <h1>Josh Haydon Rowe</h1>
        <p>Welcome to My Personal Website</p>
    </header>

    <section id="introduction">
        <h2>Introduction</h2>
        <p>I am a senior majoring in chemical engineering at the University of Edinburgh with a year abroad at UC Berkeley, with research experience at Yale, and a few months interning at Tesla. I'm interested in renewable energy sources, climate tech, global exploration, language learning & a little surfing on the side.</p>
    </section>

    <section id="engineering">
        <h2>Engineering</h2>
        <p>This section is dedicated to engineering. </p>
    </section>

    <section id="travels">
        <h2>Travels</h2>
        <p>Explore my travel adventures:</p>
        <div class="travel-buttons">
            <button onclick="location.href='mexico-to-colombia.html'">Mexico to Colombia</button>
            <button onclick="location.href='lima-to-ushuaia.html'">Lima to Ushuaia - Hitchhiking the Panamerican Highway</button>
        </div>
    </section>
</body>
</html>
