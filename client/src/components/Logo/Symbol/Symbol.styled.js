import styled from "styled-components";

export const LogoSymbol = styled.div`
  width: 50px;
  height: 50px;
  background: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    content: "";
    position: absolute;
    width: 50%;
    height: 50%;
    border: 2px solid #000;
    transform: rotate(0deg);
  }
  &:before {
    content: "";
    position: absolute;
    width: 50%;
    height: 50%;
    transform: rotate(30deg);
    border: 2px solid #254345;
  }
`;
