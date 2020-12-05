import React from "react";

import "./custom-button.component.styles.scss";
import { CustomButtonContainer } from "./custom-button.style";

const CustomButton = ({children, ...props}) => (
    <CustomButtonContainer {...props}>
      {children}
    </CustomButtonContainer>
  );
  

export default CustomButton;
