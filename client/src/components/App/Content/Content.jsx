import React from 'react';
import Routes from './Routes/Routes';
import * as Styled from './Content.styled';

const Content = auth => (
  <Styled.Content>
    <Routes auth={auth} />
  </Styled.Content>
);

export default Content;
