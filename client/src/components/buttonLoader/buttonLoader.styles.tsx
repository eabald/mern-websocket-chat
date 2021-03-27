import styled from 'styled-components';

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
  background-color: ${props => props.theme.mainTextColor};
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;

  animation: ${props => props.theme.BounceAnimation} 0.4s ease infinite;
  animation-delay: ${props => props.animationDelay};
`;
