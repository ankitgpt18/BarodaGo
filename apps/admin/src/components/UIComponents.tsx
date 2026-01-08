import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors, shadows, borderRadius, glassmorphism } from '../styles/design-tokens';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${colors.neutral[200]} 0%,
    ${colors.neutral[100]} 50%,
    ${colors.neutral[200]} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite;
  border-radius: ${borderRadius.md};
`;

export const SkeletonCard = styled(SkeletonBase)`
  height: 200px;
  width: 100%;
`;

export const SkeletonText = styled(SkeletonBase) <{ width?: string }>`
  height: 16px;
  width: ${props => props.width || '100%'};
  margin: 8px 0;
`;

export const SkeletonCircle = styled(SkeletonBase) <{ size?: number }>`
  width: ${props => props.size || 40}px;
  height: ${props => props.size || 40}px;
  border-radius: 50%;
`;

export const GlassCard = styled.div<{ variant?: 'light' | 'dark' }>`
  background: ${props => props.variant === 'dark'
        ? glassmorphism.dark.background
        : glassmorphism.light.background};
  backdrop-filter: ${glassmorphism.light.backdropFilter};
  border: ${props => props.variant === 'dark'
        ? glassmorphism.dark.border
        : glassmorphism.light.border};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.glass};
  padding: 24px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.xl};
  }
`;

export const PulseLoader = () => (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {[0, 1, 2].map(i => (
            <PulseDot key={i} delay={i * 0.15} />
        ))}
    </div>
);

const pulse = keyframes`
  0%, 100% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
`;

const PulseDot = styled.div<{ delay: number }>`
  width: 12px;
  height: 12px;
  background: ${colors.primary[500]};
  border-radius: 50%;
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;
