import React, { useRef, useEffect, useState } from 'react';

const MapSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const setSize = () => {
      const { clientWidth, clientHeight } = container;
      setCanvasDimensions({ width: clientWidth, height: clientHeight });
    };

    setSize(); // Set initial size

    const resizeObserver = new ResizeObserver(entries => {
      // We are only observing one element, so entries[0] is sufficient
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setCanvasDimensions({ width, height });
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.unobserve(container);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && canvasDimensions.width > 0 && canvasDimensions.height > 0) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = canvasDimensions.width;
        canvas.height = canvasDimensions.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'lightgray';
        ctx.fillText('graph area', canvas.width / 2, canvas.height / 2);

        ctx.strokeStyle = 'lightgray';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [canvasDimensions]); // Redraw when dimensions change

  return (
    <div ref={containerRef} className="w-full max-w-screen h-full min-h-0">
      <canvas ref={canvasRef} aria-label="Map">
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    </div>
  );
};

export default MapSection;


