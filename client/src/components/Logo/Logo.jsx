import React from 'react';
import { LogoSymbol } from './Symbol/Symbol.styled';
import * as Styled from './Logo.styled';

const Logo = () => (
  <Styled.Logo>
    <LogoSymbol />
    <Styled.Typography>Forest Socks</Styled.Typography>
  </Styled.Logo>
);

export default Logo;
