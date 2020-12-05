import styled, { css } from "styled-components";

const defaultBorderRadius = '5px';
const colorBlack = 'black';
const colorWhite = 'white';

const buttonStyles = css`
  background-color: ${colorBlack};
  color: ${colorWhite};
  border: none;
  border-radius: ${defaultBorderRadius};

  &:hover {
    background-color: ${colorWhite};
    color: ${colorBlack};
    border: 1px solid ${colorBlack};
  }
`;

const invertedButtonStyles = css`
  background-color: ${colorWhite};
  color: ${colorBlack};
  border: 1px solid ${colorBlack};

  &:hover {
    background-color: ${colorBlack};
    color: ${colorWhite};
    border: none;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: ${colorWhite};
  border: none;
  border-radius: ${defaultBorderRadius};

  &:hover {
    background-color: #357ae8;
    border: 1px solid blue;
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${getButtonStyles}
`;
