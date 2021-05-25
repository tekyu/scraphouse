import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Styled from './Home.styled';

const Home = () => {
  const { t } = useTranslation();
  return <Styled.Home>{t('home')}</Styled.Home>;
  // return <Styled.Home>home</Styled.Home>;
};

export default Home;
