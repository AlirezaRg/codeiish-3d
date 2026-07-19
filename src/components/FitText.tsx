import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

interface FitTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scales its content down (never up) so a single nowrap line always
 * fits the container width — needed because the heading is sized in
 * vw units tuned for a short name; a longer name would otherwise clip.
 * Uses ResizeObserver on both the container and the text itself, since
 * a web font swap can change text width without the container resizing.
 */
export default function FitText({ children, className }: FitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => {
      const containerWidth = container.offsetWidth;
      const textWidth = text.scrollWidth;
      if (!containerWidth || !textWidth) return;
      setScale(Math.min(1, containerWidth / textWidth));
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(container);
    observer.observe(text);

    return () => observer.disconnect();
  }, [children]);

  return (
    <div ref={containerRef} className="w-full">
      <div
        ref={textRef}
        className={className}
        style={{
          display: 'inline-block',
          transform: `scale(${scale})`,
          transformOrigin: 'left center',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </div>
    </div>
  );
}
