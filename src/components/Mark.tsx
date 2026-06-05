import { SVGProps } from "react";

/**
 * Elevaris brand mark — geometric chevron/arrow.
 * Used consistently across the site as the brand motif:
 * inline next to wordmark, as section dividers, and as
 * oversized background watermarks.
 */
const Mark = ({ className, ...rest }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...rest}
  >
    {/* Outer chevron */}
    <path
      d="M50 6 L94 94 L70 94 L50 54 L30 94 L6 94 Z"
      fill="currentColor"
    />
    {/* Inner notch (carved triangle) */}
    <path
      d="M50 38 L62 64 L50 50 L38 64 Z"
      fill="hsl(var(--background))"
    />
  </svg>
);

export default Mark;
