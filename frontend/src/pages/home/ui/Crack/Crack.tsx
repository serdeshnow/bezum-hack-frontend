import React, { useMemo } from 'react';
import s from './Srack.module.scss';
import { getLightningPath } from '@/pages/home/lib/getLightningPath.ts';
import { modeColors } from '@/pages/home/models/modeColors.ts';

interface CrackOverlayProps {
  mode: string; // ожидается: 'red', 'orange', 'green', 'blue', 'violet'
}


export const CrackOverlay: React.FC<CrackOverlayProps> = ({ mode }) => {
  const dPath = useMemo(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return getLightningPath(width, height);
  }, []);

  const strokeColor = modeColors[mode] || 'rgba(255,255,255,0.5)';
  const strokeWidth = 3;
  const blurValue = 6;

  return (
    <div className={s.crackOverlay}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="softGlow">
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
          filter="url(#softGlow)"
        />
      </svg>
    </div>
  );
};
