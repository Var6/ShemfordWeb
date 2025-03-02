// src/components/Carousel.tsx
'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CarouselProps {
  images: string[];
  className?:String ;
  // Array of image URLs
}

const Carousel: React.FC<CarouselProps> = ({ images,className }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Auto slide every 3 seconds

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1,
    );
  };

  return (
    <div className={cn('relative w-full overflow-hidden',className)}>
      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((imageUrl, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-fit object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        &#10095;
      </button>

      {/* Slide Indicators (Optional) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentSlide === index ? 'bg-yellow-500' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
