// src/components/Carousel.tsx
'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CarouselProps {
  images: string[];
  className?: string;
  videoUrl?: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, className, videoUrl }) => {
  const slides = videoUrl ? [...images, videoUrl] : images;
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1,
    );
  };

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const isVideoSlide = videoUrl && index === images.length;

          return (
            <div key={index} className="w-full flex-shrink-0 h-full">
              {isVideoSlide ? (
                <video
                  src={slide as string}
                  className="w-full h-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={slide as string}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 rounded-full bg-black/50 p-2 text-white"
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 rounded-full bg-black/50 p-2 text-white"
        aria-label="Next slide"
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'h-3 w-3 rounded-full transition-colors',
              currentSlide === index ? 'bg-yellow-500' : 'bg-gray-400',
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
