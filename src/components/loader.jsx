import { useState, useEffect } from "react";

export default function Loader({
  size = "medium",
  variant = "spinner",
  color = "primary",
  text = "Loading...",
  fullScreen = false,
  speed = "normal",
}) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-24 h-24",
    xlarge: "w-32 h-32",
  };

  const colorClasses = {
    primary: "border-t-blue-600 border-r-blue-600/30",
    secondary: "border-t-purple-600 border-r-purple-600/30",
    accent: "border-t-pink-600 border-r-pink-600/30",
    success: "border-t-emerald-600 border-r-emerald-600/30",
    warning: "border-t-amber-600 border-r-amber-600/30",
    white: "border-t-white border-r-white/30",
    dark: "border-t-gray-900 border-r-gray-900/30",
  };

  const speedClasses = {
    slow: "animate-[spin_1.5s_linear_infinite]",
    normal: "animate-[spin_1s_linear_infinite]",
    fast: "animate-[spin_0.5s_linear_infinite]",
    faster: "animate-[spin_0.3s_linear_infinite]",
  };

  // Pulse loader variant
  const PulseLoader = () => (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={`${sizeClasses[size]} bg-${
          color.split("-")[1] || "blue"
        }-600 rounded-full animate-pulse`}
      ></div>
    </div>
  );

  // Dots loader variant
  const DotsLoader = () => {
    const [activeDot, setActiveDot] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveDot((prev) => (prev + 1) % 3);
      }, 300);
      return () => clearInterval(interval);
    }, []);

    const getColor = () => {
      const colorMap = {
        primary: "bg-blue-600",
        secondary: "bg-purple-600",
        accent: "bg-pink-600",
        success: "bg-emerald-600",
        warning: "bg-amber-600",
        white: "bg-white",
        dark: "bg-gray-900",
      };
      return colorMap[color] || "bg-blue-600";
    };

    const dotSize = {
      small: "w-2 h-2",
      medium: "w-3 h-3",
      large: "w-4 h-4",
      xlarge: "w-5 h-5",
    }[size];

    return (
      <div className="flex items-center justify-center space-x-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`${dotSize} rounded-full ${getColor()} transition-all duration-300 ${
              index === activeDot
                ? "opacity-100 scale-125"
                : "opacity-40 scale-100"
            }`}
          />
        ))}
      </div>
    );
  };

  // Ring loader variant
  const RingLoader = () => (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full border-4 ${colorClasses[color]} ${speedClasses[speed]}`}
      ></div>
      <div
        className={`${
          sizeClasses[size]
        } rounded-full border-4 absolute top-0 left-0 border-l-transparent border-b-transparent ${
          speedClasses[speed]
        } ${
          color === "primary"
            ? "border-t-blue-400 border-r-blue-400/20"
            : color === "secondary"
            ? "border-t-purple-400 border-r-purple-400/20"
            : color === "accent"
            ? "border-t-pink-400 border-r-pink-400/20"
            : color === "success"
            ? "border-t-emerald-400 border-r-emerald-400/20"
            : color === "warning"
            ? "border-t-amber-400 border-r-amber-400/20"
            : color === "white"
            ? "border-t-white/50 border-r-white/10"
            : "border-t-gray-400 border-r-gray-400/20"
        }`}
      ></div>
    </div>
  );

  // Spinner loader variant (original)
  const SpinnerLoader = () => (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full border-4 ${colorClasses[color]} ${speedClasses[speed]}`}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`${sizeClasses[size]
            .replace("w-", "w-")
            .replace("h-", "h-")
            .split(" ")[0]
            .replace(
              "w-",
              ""
            )} h-[1px] bg-gradient-to-r from-transparent via-current to-transparent`}
        ></div>
      </div>
    </div>
  );

  // Progress loader variant
  const ProgressLoader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 100);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-48">
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              color === "primary"
                ? "bg-gradient-to-r from-blue-500 to-blue-600"
                : color === "secondary"
                ? "bg-gradient-to-r from-purple-500 to-purple-600"
                : color === "accent"
                ? "bg-gradient-to-r from-pink-500 to-pink-600"
                : color === "success"
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                : color === "warning"
                ? "bg-gradient-to-r from-amber-500 to-amber-600"
                : "bg-gradient-to-r from-blue-500 to-blue-600"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Modern wave loader
  const WaveLoader = () => (
    <div className="flex items-end justify-center space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`${
            size === "small"
              ? "w-1 h-4"
              : size === "medium"
              ? "w-2 h-8"
              : size === "large"
              ? "w-3 h-12"
              : "w-4 h-16"
          } rounded-full ${
            color === "primary"
              ? "bg-gradient-to-t from-blue-500 to-blue-600"
              : color === "secondary"
              ? "bg-gradient-to-t from-purple-500 to-purple-600"
              : color === "accent"
              ? "bg-gradient-to-t from-pink-500 to-pink-600"
              : color === "success"
              ? "bg-gradient-to-t from-emerald-500 to-emerald-600"
              : color === "warning"
              ? "bg-gradient-to-t from-amber-500 to-amber-600"
              : "bg-gradient-to-t from-blue-500 to-blue-600"
          } animate-wave`}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1s",
          }}
        ></div>
      ))}
    </div>
  );

  const getLoaderComponent = () => {
    switch (variant) {
      case "pulse":
        return <PulseLoader />;
      case "dots":
        return <DotsLoader />;
      case "ring":
        return <RingLoader />;
      case "progress":
        return <ProgressLoader />;
      case "wave":
        return <WaveLoader />;
      case "spinner":
      default:
        return <SpinnerLoader />;
    }
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex flex-col justify-center items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
    : "w-full h-full flex flex-col justify-center items-center";

  return (
    <div className={containerClasses}>
      <div className="transform transition-all duration-300 hover:scale-105">
        {getLoaderComponent()}
      </div>

      {text && (
        <div className="mt-6 text-center">
          <p
            className={`font-medium ${
              color === "primary"
                ? "text-blue-600"
                : color === "secondary"
                ? "text-purple-600"
                : color === "accent"
                ? "text-pink-600"
                : color === "success"
                ? "text-emerald-600"
                : color === "warning"
                ? "text-amber-600"
                : color === "white"
                ? "text-white"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {text}
          </p>
          {variant === "progress" && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Please wait...
            </p>
          )}
        </div>
      )}

      {/* Subtle background pattern for fullscreen mode */}
      {fullScreen && (
        <div className="absolute inset-0 -z-10 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500 blur-3xl"></div>
        </div>
      )}
    </div>
  );
}

// CSS to add to your global styles for wave animation
const waveAnimation = `
@keyframes wave {
    0%, 60%, 100% {
        transform: scaleY(0.4);
    }
    30% {
        transform: scaleY(1);
    }
}

.animate-wave {
    animation: wave 1s ease-in-out infinite;
}
`;

// Add this to your global CSS or create a style tag
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = waveAnimation;
  document.head.appendChild(style);
}
