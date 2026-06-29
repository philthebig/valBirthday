import confetti from 'canvas-confetti';

export function burstConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#f472b6', '#fbbf24', '#60a5fa', '#a78bfa', '#34d399'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#f472b6', '#fbbf24', '#60a5fa', '#a78bfa', '#34d399'],
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  };

  frame();

  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#f472b6', '#fbbf24', '#60a5fa', '#a78bfa', '#34d399'],
  });
}

export function goldBurst() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.65 },
    colors: ['#fbbf24', '#f59e0b', '#fcd34d', '#fde68a'],
    shapes: ['star'],
  });
}
