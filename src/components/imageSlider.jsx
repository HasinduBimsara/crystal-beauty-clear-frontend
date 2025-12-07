import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";

export default function ImageSlider(props) {
  const images = props.images;
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto slide functionality (optional)
  useEffect(() => {
    if (props.autoSlide) {
      const interval = setInterval(() => {
        nextImage();
      }, props.autoSlideInterval || 5000);
      return () => clearInterval(interval);
    }
  }, [activeImage]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const elem = document.querySelector(".image-slider-main");
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center ${
        isFullscreen ? "fixed inset-0 z-50 bg-black" : ""
      }`}
    >
      {/* Main Image Container */}
      <div
        className={`image-slider-main relative w-full max-w-4xl aspect-square overflow-hidden rounded-2xl shadow-2xl group ${
          isFullscreen ? "max-w-none w-full h-full" : ""
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Image */}
        <img
          src={images[activeImage]}
          alt={`Slide ${activeImage + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
        />

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
          {activeImage + 1} / {images.length}
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 left-4 bg-black/70 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/90 transition-all duration-200 hover:scale-110"
          aria-label="Toggle fullscreen"
        >
          <FaExpand />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white/30 transition-all duration-300 hover:scale-110"
          aria-label="Previous image"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white/30 transition-all duration-300 hover:scale-110"
          aria-label="Next image"
        >
          <FaChevronRight size={24} />
        </button>

        {/* Progress Dots for Mobile */}
        <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeImage
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Gallery - Desktop */}
      <div className="hidden lg:flex mt-6 w-full max-w-4xl px-4">
        <div className="flex gap-3 overflow-x-auto py-4 px-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                index === activeImage
                  ? "border-purple-600 shadow-lg shadow-purple-200 scale-105"
                  : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
              }`}
              aria-label={`View image ${index + 1}`}
              aria-current={index === activeImage}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Thumbnail Gallery - Mobile */}
      <div className="lg:hidden mt-6 w-full max-w-md px-4">
        <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === activeImage
                  ? "border-purple-500 ring-2 ring-purple-200"
                  : "border-gray-200 opacity-70"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="hidden lg:block mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
        <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded shadow">
            ←
          </kbd>
          <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded shadow">
            →
          </kbd>
          <span className="ml-2">Navigate</span>
          <kbd className="ml-3 px-2 py-1 bg-white dark:bg-gray-700 rounded shadow">
            F
          </kbd>
          <span className="ml-2">Fullscreen</span>
        </span>
      </div>
    </div>
  );
}
