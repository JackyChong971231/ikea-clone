import sha256 from 'crypto-js/sha256';

export const signInService = (e, email, password, setSignInErrorMsg) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/ikea-clone/membership/sign-in', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive' },
        body: JSON.stringify({
            email: email,
            passwordHash: sha256(password).toString()
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data['signedInToken'] !== undefined) {
            localStorage.setItem('user', JSON.stringify(data));
            setSignInErrorMsg('');
            window.location.href = '/'
        } else {
            setSignInErrorMsg(data['responseMessage']);
        }
        // console.log(data['signedInToken'])
    })
}