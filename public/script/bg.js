(()=> {
    const canvas = document.querySelector("#bg-container>canvas")
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;

    function Particle(x, y) {
        //this.x = Math.random() * canvas.width/2;
        //this.y = Math.random() * canvas.height/2;
        this.x = x ? x: canvas.width/2;
        this.y = y ? y: canvas.height/2;
        this.radius = 1;
        this.color = getRandomColor();
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = (Math.random() - 0.5) * 4;

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 1 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        };

        this.update = function () {
            this.x += this.speedX;
            this.y += this.speedY;
            this.draw();
        };
        this.isOutOfScreen = function () {
            return (
                this.x + this.radius < 0 ||
                this.x - this.radius > canvas.width ||
                this.y + this.radius < 0 ||
                this.y - this.radius > canvas.height
            );
        };
    }

    const particles = [];

    for (let i = 0; i < 10; i++) {
        particles.push(new Particle());
    }
    function createParticle(x, y) {
        if (particles.length < 100) {
            particles.push(x && y?new Particle(x, y): new Particle());
        }
    }
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.update();

            if (particle.isOutOfScreen()) {
                particles.splice(index, 1);
            }
        });

        if (Math.random() < 0.1) {
            createParticle();
        }
    }
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    addEventListener("touchmove", (event) => {
        const touch = event.touches[0];
        const x = Math.round(touch.clientX - canvas.offsetLeft);
        const y = Math.round(touch.clientY - canvas.offsetTop);
        for (let i = 0; i < 10; i++) {
            createParticle(x, y)
        }
    });
    addEventListener("touchstart", (event) => {
        const touch = event.touches[0];
        const x = Math.round(touch.clientX - canvas.offsetLeft);
        const y = Math.round(touch.clientY - canvas.offsetTop);
        for (let i = 0; i < 10; i++) {
            createParticle(x, y)
        }
    });
    addEventListener("touchstart",
        (event) => {
            const touch = event.touches[0];
            const x = Math.round(touch.clientX/1.2);
            const y = Math.round(touch.clientY/4.5);
            for (let i = 0; i < 50; i++) {
                createParticle(x, y)
            }
        });
    animate()
})()