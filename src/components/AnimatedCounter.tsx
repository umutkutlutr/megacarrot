import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 1000 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const startValue = displayValue;
    const difference = value - startValue;
    const steps = 10;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(startValue + (difference * currentStep) / steps));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [value, duration]);

  return <>{displayValue.toLocaleString()}</>;
}
