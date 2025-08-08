const bubbleArea = document.getElementById("bubbleArea");

// Load pop sound
const popSound = new Audio("pop.mp3"); // place pop.mp3 in same folder

function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    bubble.addEventListener("click", () => {
        // Play sound
        popSound.currentTime = 0; // rewind to start so it can play rapidly
        popSound.play();

        // Pop animation
        bubble.style.transform = "scale(0.9)";
        bubble.style.background = "radial-gradient(circle at 30% 30%, #ffcccc 0%, #ff8888 70%)";
        setTimeout(() => {
            bubble.style.transform = "scale(1)";
            bubble.style.background = "radial-gradient(circle at 30% 30%, #ffffff 0%, #d1e3f3 70%)";
        }, 200);
    });

    return bubble;
}

// Generate more bubbles
for (let i = 0; i < 209; i++) {
    bubbleArea.appendChild(createBubble());
}
