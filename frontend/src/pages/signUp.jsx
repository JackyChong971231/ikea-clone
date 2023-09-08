import * as React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye, faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

// import sha256 from 'crypto-js/sha256';
import {signInService} from '../services/membershipService';

import signUpImage1 from '../assets/images/sign-up/signUp-image-1.jpg'

export const SignUp = () => {
    return (
        <div>
            <div>
                <button><FontAwesomeIcon icon={faArrowLeft}/></button>
            </div>
            <div>
                <h2>Create an IKEA Family Profile</h2>
                <p>Already have an account? Login</p>
                <img source={signUpImage1} alt=""></img>
            </div>
            <div>
                <p>Join our IKEA Family loyalty program today for rewards, discounts, inspiration and a few surprises along the way. It’s quick, easy and free. Learn more</p>
                <div>
                    <label>First name</label>
                    <div><input></input></div>
                </div>
                <div>
                    <label>Last name</label>
                    <div><input></input></div>
                </div>
                <div>
                    <label>Birthdate (Optional)</label>
                    <div><input></input></div>
                </div>
                <div>
                    <label>Street address</label>
                    <div><input></input></div>
                </div>
                <div>
                    <label>City</label>
                    <div><input></input></div>
                </div>
                <div>
                    <label>Province</label>
                    <div><input></input></div>
                </div>
                <div>
                    <label>Post code</label>
                    <div><input></input></div>
                </div>
                <div>
                    <label>Preferred store</label>
                    <div><input></input></div>
                </div>
                <div>
                    <label>Mobile (Optional)</label>
                    <div><input></input></div>
                </div>
                <div>
                    <label>Email (username)</label>
                    <div><input></input></div>
                </div>
                <div>
                    <label>Password</label>
                    <div><input></input></div>
                </div>
            </div>
        </div>
    )
}