import confetti from "canvas-confetti";

export function fireConfettiFromButton(button: HTMLButtonElement) {
  const rect = button.getBoundingClientRect();

  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 40,
    spread: 60,
    startVelocity: 40,
    origin: { x, y },
    gravity: 1.1,
    scalar: 1,
    ticks:200,
    colors: ["#7b5cff", "#5c86ff", "#b3c7ff", "#5cffa1"],
  });

}