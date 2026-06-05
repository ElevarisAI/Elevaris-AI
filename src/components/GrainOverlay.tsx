const grainUrl = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#grain)"/></svg>'
)}")`;

const GrainOverlay = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 pointer-events-none z-[9999]"
    style={{
      backgroundImage: grainUrl,
      opacity: 0.10,
    }}
  />
);

export default GrainOverlay;
