import React from 'react';

import './custom-button.component.styles.scss';


export const CustomButton = ({children, ...otherProps}) => (
    <button className='custom-button' {...otherProps}>
        {children}
    </button>
)