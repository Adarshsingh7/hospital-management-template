import React from "react";

export function VKLogo({ className = "h-12 w-auto", white = false }: { className?: string; white?: boolean }) {
  const redColor = white ? "#FFFFFF" : "#E53935";
  const blueColor = white ? "#FFFFFF" : "#0D47A1";
  const greenColor = white ? "#FFFFFF" : "#2E7D32";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 85"
      className={className}
      fill="none"
    >
      {/* Red Heart Outline */}
      <path
        d="M 45 28 C 38 14 18 14 18 34 C 18 54 45 74 45 78 C 45 74 72 54 72 34 C 72 14 52 14 45 28 Z"
        stroke={redColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Green Leaves on Top Right of Heart */}
      <path
        d="M 52 28 C 55 20, 65 20, 65 30 C 65 35, 57 35, 52 28 Z"
        fill={greenColor}
      />
      <path
        d="M 58 21 C 62 14, 70 17, 70 25 C 70 30, 64 30, 58 21 Z"
        fill={greenColor}
      />

      {/* Blue Heartbeat / ECG Line */}
      <path
        d="M 10 60 L 25 60 L 28 42 L 32 75 L 36 20 L 40 82 L 43 55 L 46 64 L 49 60 L 105 60"
        stroke={blueColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Blue Underline */}
      <path
        d="M 105 60 L 305 60"
        stroke={blueColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Hospital Name text */}
      <text
        x="110"
        y="51"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="21"
        fill={redColor}
      >
        V.K.
      </text>
      <text
        x="152"
        y="51"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="20"
        fill={blueColor}
      >
        Medical Center
      </text>
    </svg>
  );
}
