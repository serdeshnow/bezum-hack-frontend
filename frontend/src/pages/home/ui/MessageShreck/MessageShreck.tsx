import React, { useRef, useState, useEffect, useMemo } from 'react';
import s from '../Crack/Srack.module.scss';
import { getLightningPath } from '@/pages/home/lib/getLightningPath.ts';
import { type CursedColors, modeColors } from '@/pages/home/models/modeColors.ts';

interface BotCrackOverlayProps {
  mode: CursedColors;
}

export const BotCrackOverlay: React.FC<BotCrackOverlayProps> = ({ mode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setDimensions({ width: clientWidth, height: clientHeight });
    }
  }, []);

  const paths = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];
    const numPaths = Math.floor(Math.random() * 3) + 2; // от 2 до 4 путей
    const generatedPaths: string[] = [];
    for (let i = 0; i < numPaths; i++) {
      generatedPaths.push(getLightningPath(dimensions.width, dimensions.height));
    }
    return generatedPaths;
  }, [dimensions]);

  const strokeColor = modeColors[mode] || 'rgba(255,255,255,0.5)';
  const strokeWidth = 1;
  const blurValue = 3;

  return (
    <div ref={containerRef} className={s.botCrackOverlay}>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="botSoftGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation={blurValue} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {paths.map((d, index) => (
            <path
              key={index}
              d={d}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              fill="none"
              filter="url(#botSoftGlow)"
            />
          ))}
        </svg>
      )}
    </div>
  );
};
