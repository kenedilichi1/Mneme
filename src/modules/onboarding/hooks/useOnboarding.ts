import { useState, useCallback } from "react";
import { ONBOARDING_SLIDES } from "../constants/onboardingData";

export function useOnboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = ONBOARDING_SLIDES;
  const isLastSlide = currentSlide === slides.length - 1;

  const goToNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide, slides.length]);

  return {
    currentSlide,
    slides,
    isLastSlide,
    goToNext,
  };
}
