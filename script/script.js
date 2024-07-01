


class Plane {
    constructor(x, y, speed, imageSrc) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }

    // Add movement methods if necessary
}

class EnemyPlane extends Plane {
    // You can add enemy-specific methods here
    constructor(x, y, speed, imageSrc) {
        super(x, y, speed, imageSrc);
    }

    // Example of an enemy-specific method
    move() {
        this.y += this.speed; // Move down the screen
    }
}


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800; // Set your desired width
canvas.height = 600; // Set your desired height

// Initialize player plane
const playerPlane = new Plane(375, 500, 5, 'path/to/playerPlane.png'); // Adjust x, y, speed, and image path as needed

// Initialize enemy planes
const enemyPlanes = [];
for (let i = 0; i < 5; i++) { // Example: create 5 enemies
    // Randomize x position, set y off-screen initially, adjust speed and image path as needed
    let enemy = new EnemyPlane(Math.random() * (canvas.width - 50), -50, 2, 'path/to/enemyPlane.png');
    enemyPlanes.push(enemy);
}



function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw player plane
    playerPlane.draw(ctx);

    // Update and draw enemy planes
    enemyPlanes.forEach(enemy => {
        enemy.move();
        enemy.draw(ctx);
    });

    requestAnimationFrame(gameLoop); // Keep the loop going
}

gameLoop(); // Start the game loop







// Define key states
const keyStates = {};

// Initialize event listeners for key down and key up
document.addEventListener('keydown', (event) => {
    keyStates[event.key] = true; // Mark the key as active
});

document.addEventListener('keyup', (event) => {
    keyStates[event.key] = false; // Mark the key as inactive
});

function updatePlanePosition(plane) {
    // Example controls: Arrow keys to move the plane
    if (keyStates['ArrowUp']) plane.y -= plane.speed; // Move up
    if (keyStates['ArrowDown']) plane.y += plane.speed; // Move down
    if (keyStates['ArrowLeft']) plane.x -= plane.speed; // Move left
    if (keyStates['ArrowRight']) plane.x += plane.speed; // Move right

    // Ensure the plane stays within the game boundaries
    // This is a simple boundary check, adjust according to your game's canvas size
    plane.x = Math.max(0, Math.min(plane.x, canvas.width - plane.width));
    plane.y = Math.max(0, Math.min(plane.y, canvas.height - plane.height));
}

// Call updatePlanePosition(plane) inside your game loop to update the plane's position based on user input