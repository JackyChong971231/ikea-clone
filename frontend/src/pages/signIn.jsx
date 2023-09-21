import * as React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye, faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

// import sha256 from 'crypto-js/sha256';
import {signInService} from '../services/membershipService';
import { navigate } from '../utils/common';
import { useSharedContext } from '../SharedContext';

export const SignIn = () => {
    const {userDetail, setUserDetail} = useSharedContext();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const [isSignedInForever, setIsSignedInForever] = React.useState(false);
    const [signInErrorMsg, setSignInErrorMsg] = React.useState('');

    return (
        <div className='sign-in__outermost-container'>
            <div className='row h-100'>
                <div className='sign-in__header-container px-5 py-4 col-12 col-sm-5'>
                    <div className='sign-in__header-container__buttons-container py-3'>
                        <Link to='/' className='sign-in-page__go-home-btn'>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Link>
                    </div>
                    <h1><span>Login</span> to your IKEA account.</h1>
                    <p>Too many passwords?
                        <br/>
                        <br/>
                        You can now login with a one-time only code we will send to your email address, or verified mobile number saved on your IKEA account.
                        <br/>
                        <br/>
                        Access your IKEA account using your email address to add and verify your mobile number.
                    </p>
                </div>
                <div className='sign-in-input-form__container col-12 col-sm-7'>
                    <div className='sign-in-input-form__container__form px-5 py-3'>
                        <form noValidate='' onSubmit={(e) => {signInService(e, email, password, setSignInErrorMsg, setUserDetail, isSignedInForever)}}>
                            <div className='sign-in-form__fields sign-in-form__fields__email'>
                                <label for='username' title='Email'>Email</label>
                                <div className='sign-in-form__fields__input-wrapper'>
                                    <input id='username' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                            </div>
                            <div className='sign-in-form__fields sign-in-form__fields__password'>
                                <label for='password' title='Password'>Password</label>
                                <div className='sign-in-form__fields__input-wrapper'>
                                    <input id='password' type={(isShowPassword)? "text": "password"} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                    <button className='px-3' type="button" onClick={() => {setIsShowPassword(prevState => !prevState)}}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </div>
                            </div>
                            <div className='sign-in-form__fields sign-in-form__fields__stay-signed-in'>
                                <input id='remember-me' type='checkbox' 
                                onChange={() => {setIsSignedInForever(prevState => !prevState)}} checked={isSignedInForever}></input>
                                <label className='pl-3' for='remember-me'>Stay signed in until you sign out</label>
                            </div>
                            <p className='sign-in-form__submit__resMsg pt-2'> {signInErrorMsg}</p>
                            <button className='sign-in-form__submit-btn py-2 mt-1 mb-4' type='submit'>
                                Continue
                            </button>
                        </form>
                    </div>
                    <div className='sign-up-container px-5'>
                        <h2>Don't have an IKEA account yet? Create one now:</h2>
                        <button id='signup' onClick={() => {navigate('/sign-up')}}>I'm shopping for my home</button>
                        <button id='businessSignup' onClick={() => {navigate('/sign-up')}}>I'm shopping for my business</button>
                    </div>
                    <div className='sign-in-page__footnote py-3 mb-5'>
                        <p1><small>
                            IKEA.ca - Cookie Policy and Privacy Policy<br/>
                            © This is not the real IKEA website
                        </small></p1>
                    </div>
                </div>
            </div>
        </div>
    )
}