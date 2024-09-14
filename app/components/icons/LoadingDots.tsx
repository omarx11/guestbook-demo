import type { SVGProps } from "react";

export function LoadingDots(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2rem"
      height="1.2rem"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx={4} cy={12} r={1.5} fill="currentColor">
        <animate
          attributeName="r"
          dur="0.75s"
          repeatCount="indefinite"
          values="1.5;3;1.5"
        ></animate>
      </circle>
      <circle cx={12} cy={12} r={3} fill="currentColor">
        <animate
          attributeName="r"
          dur="0.75s"
          repeatCount="indefinite"
          values="3;1.5;3"
        ></animate>
      </circle>
      <circle cx={20} cy={12} r={1.5} fill="currentColor">
        <animate
          attributeName="r"
          dur="0.75s"
          repeatCount="indefinite"
          values="1.5;3;1.5"
        ></animate>
      </circle>
    </svg>
  );
}
