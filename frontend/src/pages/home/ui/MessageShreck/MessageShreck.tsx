import React, { useRef, useState, useEffect, useMemo } from 'react';
import s from '../Crack/Srack.module.scss';
import { getLightningPath } from '@/pages/home/lib/getLightningPath.ts';
import { modeColors } from '@/pages/home/models/modeColors.ts';

interface BotCrackOverlayProps {
  mode: 'red' | 'orange' | 'green' | 'blue' | 'violet';
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

  const dPath = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return '';
    return getLightningPath(dimensions.width, dimensions.height);
  }, [dimensions]);

  const strokeColor = modeColors[mode] || 'rgba(255,255,255,0.5)';
  const strokeWidth = 2;
  const blurValue = 4;

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
          <path
            d={dPath}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            filter="url(#botSoftGlow)"
          />
        </svg>
      )}
    </div>
  );
};
