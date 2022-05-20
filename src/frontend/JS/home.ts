const createHome = (gallery: string): string => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Image Processing API</title>
        <link rel="icon" href="../favicon.png" />
        <link rel="stylesheet" href="../CSS/styles.css" />
        <script defer src="../JS/main.js"></script>
    </head>
    
    <body>
        <div>
            <header id="navbar">
                <h1><a href="../home" id="home">Ahmed Abdelaziz</a></h1>
                <nav>
                    <span><a href="../home#about">About Me</a></span>
                    <span><a href="../process">API</a></span>
                    <span><a href="../home#portfolio">Projects</a></span>
                    <span><a href="../home#contacts">Contact Me</a></span>
                </nav>
                <div class="hamburger">
                    <div></div>
                </div>
            </header>
    
            <main>
                <section class="content display-images">${gallery}</section>
            </main>
    
            <div class="window">
                <div class="popup">
                    <button id="close">&times;</button>
                    <h2></h2>
                    <p>
                        Coming soon...
                    </p>
                    <a href="#" target="_blank">Resize Image</a>
                </div>
            </div>
        </div>
    
        <footer id="contacts">
            <div id="github">
                <img height="50" src="https://icons-for-free.com/iconfiles/png/512/github+icon-1320168274457504277.png"
                    alt="GitHub Logo" />
                <p>
                    <a id="profile-link" target="_blank" href="https://github.com/Prog-Jacob" rel="noopener noreferrer">For
                        more information.</a>
                </p>
            </div>
            <div>
                <span><a href="mailto:ahmed.abdelaziz.gm@gmail.com" target="_blank">Mail</a></span>
                <span><a href="tel:+201016538863" target="_blank">Call</a></span>
            </div>
        </footer>
    </body>
    
    </html>`;
};

export default createHome;
