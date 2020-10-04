import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import { SignUp } from '../../components/sign-up/sign-up.component';

import './signin-and-signup.component.styles.scss';

export const SignInAndSignUpPage = () => (
    <div className="sign-in-and-sign-up">
        <SignIn />
        <SignUp />
    </div>
)