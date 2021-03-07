import styled from 'styled-components';

export const BackButtonElement = styled.button`
  background: #2f3131;
  border: 0;
  appearance: none;
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  height: 50px;
  width: 50px;
  font-size: 24px;
  line-height: 50px;
  text-align: center;
  color: #979696;
  cursor: pointer;
  &:hover {
    background: #3e3f3f;
    color: #e1e1e1;
  }
`;
