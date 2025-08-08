const bubbleArea = document.getElementById("bubbleArea");
const bubbleCountDisplay = document.getElementById("bubbleCount");

let bubbleCount = 0;
const popSound = new Audio("pop.mp3"); // Your pop sound file

function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    bubble.addEventListener("click", () => {
        popSound.currentTime = 0;
        popSound.play();
        bubbleCount++;
        bubbleCountDisplay.textContent = bubbleCount;
    });

    return bubble;
}

// Generate 200 bubbles
for (let i = 0; i < 200; i++) {
    bubbleArea.appendChild(createBubble());
}
