import * as React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye, faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

// import sha256 from 'crypto-js/sha256';
import {signInService} from '../services/membershipService';

export const SignIn = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [signInErrorMsg, setSignInErrorMsg] = React.useState('')

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch('http://localhost:8080/api/v1/ikea-clone/membership/sign-in', {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive' },
    //         body: JSON.stringify({
    //             email: email,
    //             passwordHash: sha256(password).toString()
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data['signedInToken'] !== undefined) {
    //             localStorage.setItem('user', JSON.stringify(data));
    //             setSignInErrorMsg('');
    //         } else {
    //             setSignInErrorMsg(data['responseMessage']);
    //         }
    //         // console.log(data['signedInToken'])
    //     })
    // }

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
                        <form noValidate='' onSubmit={(e) => {signInService(e, email, password, setSignInErrorMsg)}}>
                            <div className='sign-in-form__fields sign-in-form__fields__email'>
                                <label for='username' title='Email'>Email</label>
                                <div className='sign-in-form__fields__input-wrapper'>
                                    <input id='username' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                            </div>
                            <div className='sign-in-form__fields sign-in-form__fields__password'>
                                <label for='password' title='Password'>Password</label>
                                <div className='sign-in-form__fields__input-wrapper'>
                                    <input id='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                    <button className='px-3'>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </div>
                            </div>
                            <div className='sign-in-form__fields sign-in-form__fields__stay-signed-in'>
                                <input id='remember-me' type='checkbox'></input>
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
                        <button id='signup' onClick={() => {window.location.href = '/sign-up'}}>I'm shopping for my home</button>
                        <button id='businessSignup' onClick={() => {window.location.href = '/sign-up'}}>I'm shopping for my business</button>
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