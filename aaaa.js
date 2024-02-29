document.addEventListener('DOMContentLoaded', () => {
    let mobile = document.querySelector('#mobilenumber');
    mobile.focus();
    let passw = document.querySelector('#password');
    mobile.addEventListener('input', () => {
        const input = document.getElementById('mobilenumber').value;
        mobile_submit(input);
    });

    passw.addEventListener('input', () => {
        const input = document.getElementById('password').value;
        passw_submit(input);
    });
    document.getElementById('login-btn').addEventListener('click', function (event) {
        event.preventDefault();
        mobile_submit(mobile.value);
        passw_submit(passw.value);
        login_submit(mobile.value, passw.value);
    });
});

function mobile_submit(mobileInput) {
    let mobileError = document.getElementById('mobileError');
    if (mobileInput === '') {
        mobileError.textContent = '*Empty field';
    } else if (!/^\d+$/.test(mobileInput)) {
        mobileError.textContent = '*Invalid format';
    } else if (mobileInput.length !== 10) {
        mobileError.textContent = '*Required 10 numbers';
    } else if (mobileInput !== '1234567890') {
        mobileError.textContent = '*Mobile number does not exist';
    } else {
        mobileError.textContent = '';
    }
};

function passw_submit(passwordInput) {
    let passwordError = document.getElementById('passwordError')
    if (passwordInput === '') {
        passwordError.textContent = '*Empty field';
    } else if (passwordInput.includes(' ')) {
        passwordError.textContent = "*Password doesn't contain space";
    } else if (passwordInput.length < 7) {
        passwordError.textContent = '*Required 7 characters';
    } else {
        passwordError.textContent = '';
    }
}

function login_submit(mobileInput, passwordInput) {
    if (mobileInput == '1234567890' && passwordInput == 'Abc@123') {
        window.location.href = 'https://twitter.com/';
    } else if (passwordInput.length == 7 && !passwordInput.includes(' ') && mobileInput == '1234567890') {
        document.getElementById('passwordError').textContent = '*Wrong password';
    }
}

module.exports = { mobile_submit, passw_submit, login_submit };