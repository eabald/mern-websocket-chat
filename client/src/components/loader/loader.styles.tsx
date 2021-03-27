import styled from 'styled-components';

interface AnimationProps {
  animationDelay: string;
}

export const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.loaderBackground};
`;

export const LoaderDotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
`;

export const LoaderDot = styled.div<AnimationProps>`
  background-color: ${props => props.theme.mainTextColor};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0 20px;

  animation: ${props => props.theme.BounceAnimation} 0.4s ease infinite;
  animation-delay: ${props => props.animationDelay};
  `;
