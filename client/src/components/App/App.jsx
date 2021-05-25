import React from 'react';
import PropTypes from 'prop-types';
import { StylesProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
// import { useDispatch, useSelector } from "react-redux";
import { auth } from 'store/user/userSelectors';
import Content from './Content/Content';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const App = ({ modalType, error }) => (
  // const isAuth = useSelector(auth);
  // const dispatch = useDispatch();
  // if (isAuth) {
  //   // is user
  // } else {
  //   dispatch(createAnonUser());
  // }
  // useEffect(() => {
  //   // userActions.checkAuth();
  // }, []);

  <StyledContainer>
    <StylesProvider injectFirst>
      {/* <ThemeProvider theme={Theme}> */}
      <Content auth={auth} />
      <ToastContainer />
      {/* </ThemeProvider> */}
    </StylesProvider>
  </StyledContainer>
);
App.propTypes = {
  modalType: PropTypes.string,
  error: PropTypes.string,
};

App.defaultProps = {
  modalType: null,
  error: null,
};

export default App;
