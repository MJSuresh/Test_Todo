document.addEventListener('DOMContentLoaded', ()=> {
    let mobile = document.querySelector('#mobilenumber');
    mobile.focus();
    let passw = document.querySelector('#password');
    document.getElementById('login-btn').addEventListener('click', function (event) {
        event.preventDefault();
        mobile_submit(mobile.value);
        passw_submit(passw.value);
        login_submit(mobile.value, passw.value);
    });
});

function mobile_submit(mobileInput) {
    let mobileError=document.getElementById('mobileError');
    mobileInput = mobileInput.replace(/[^0-9]/g, "");
    if (mobileInput != '1234567890') {
        if (mobileInput == '') {
            mobileError.textContent = '*This field is required';
        } else if (mobileInput.length < 10) {
            mobileError.textContent = '*Required 10 numbers';
        } else {
            mobileError.textContent = '*Mobile number does not exist';
        }
    } else {
        mobileError.textContent = '';
    }
};

function passw_submit(passwordInput) {
    let passwordError=document.getElementById('passwordError')
    passwordInput = passwordInput.replace(/\s/g, "")
    if (passwordInput != 'Abc@123') {
        if (passwordInput == '') {
            passwordError.textContent = '*This field is required';
        } else if (passwordInput.length < 7) {
            passwordError.textContent = '*Required 7 characters';
        } else {
            passwordError.textContent = '*Wrong password';
        }
    } else {
        passwordError.textContent = '';
    }
}

function login_submit(mobileInput, passwordInput) {
    if (mobileInput == '1234567890' && passwordInput == 'Abc@123') {
        window.location.href = 'https://twitter.com/';
    }
}

module.exports = { mobile_submit, passw_submit, login_submit };