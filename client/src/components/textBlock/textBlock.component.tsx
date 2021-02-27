import React, { ReactNode } from 'react';
import { TextBlockElement } from './textBlock.styles';

type TextBlockProps = {
  children: string | ReactNode;
};

const TextBlock:React.FC<TextBlockProps> = ({ children }) => (
  <TextBlockElement>{children}</TextBlockElement>
)

export default TextBlock;
