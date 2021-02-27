import styled, { keyframes } from 'styled-components';

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 10px }
  100% { margin-bottom: 0 }
`;

interface AnimationProps {
  animationDelay: string;
}

export const ButtonLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16px;
`;

export const ButtonLoaderDot = styled.div<AnimationProps>`
  background-color: #ced7ff;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;

  animation: ${BounceAnimation} 0.4s ease infinite;
  animation-delay: ${props => props.animationDelay};
`;
