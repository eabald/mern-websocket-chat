import styled from 'styled-components';

interface AnimationProps {
  animationDelay: string;
}

export const SpinnerWrapper = styled.div`
  display: flex;
  min-height: 100px;
  justify-content: center;
  align-items: center;
`;

export const SpinnerDotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
`;

export const SpinnerDot = styled.div<AnimationProps>`
  background-color: ${props => props.theme.mainTextColor};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 0 10px;

  animation: ${props => props.theme.BounceAnimation} 0.4s ease infinite;
  animation-delay: ${props => props.animationDelay};
  `;
