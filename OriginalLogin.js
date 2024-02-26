const pwArr = { Mobile: '1234567890', Password: 'Abc@123' };

localStorage.setItem('pwArr', JSON.stringify(pwArr));
let storedCredentials = {};

function getCredentialsFromLocalStorage() {
    storedCredentials = JSON.parse(localStorage.getItem("pwArr")) || [];
}
getCredentialsFromLocalStorage();

let mobile = document.querySelector('#mobilenumber');
let passw = document.querySelector('#password');

document.getElementById('login-btn').addEventListener('click', function (event) {
    event.preventDefault();
    var mobileError = document.getElementById('mobileError');
    var passwordError = document.getElementById('passwordError');
    mobile_submit(mobile.value, mobileError);
    passw_submit(passw.value, passwordError);
    final_submit(mobile.value, passw.value);
});

function mobile_submit(mobileInput, mobileError) {
    mobileInput = mobileInput.replace(/\s/g, "");
    if (mobileInput != '1234567890') {
        if (mobileInput == '') {
            mobileError.textContent = '*This field is required';
        } else if (mobileInput.length < 10) {
            mobileError.textContent = '*Required 10 numbers';
        } else {
            mobileError.textContent = '*Account does not exits';
        }
    } else {
        mobileError.textContent = '';
    }
};

function passw_submit(passwordInput, passwordError) {
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

function final_submit(mobileInput, passwordInput) {
    if (mobileInput == storedCredentials.Mobile && passwordInput == storedCredentials.Password) {
        call_twitter('https://twitter.com/');
    }
}

function call_twitter(url) {
    window.location.href = url;
}

// function final_submit(mobileInput, passwordInput) {
//     if (mobileInput == '1234567890' && passwordInput == 'Abc@123') {
//         window.location.href = 'https://twitter.com/';
//     }
// }

module.exports = { mobile_submit, passw_submit, final_submit };