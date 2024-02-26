const pwArr = ['1234567890', 'Abc@123']
localStorage.setItem('pwArr', JSON.stringify(pwArr))

let mobile = document.querySelector('#mobilenumber');
let passw = document.querySelector('#password');

document.getElementById('login-btn').addEventListener('click', function (event) {
    event.preventDefault();
    mobile_submit(mobile.value);
    passw_submit(passw.value);
    final_submit(mobile.value, passw.value);
});

function mobile_submit(mobileInput) {
    var mobileError = document.getElementById('mobileError');

    if (mobileInput != '1234567890') {
        mobileError.textContent = '*Type a valid mobile number';
        // return "warning";
    } else {
        mobileError.textContent = '';
    }
};

function passw_submit(passwordInput) {
    var passwordError = document.getElementById('passwordError');

    if (passwordInput != 'Abc@123') {
        passwordError.textContent = '*Type a valid password';
    } else {
        passwordError.textContent = '';
    }
}

function final_submit(mobileInput, passwordInput) {
    if (mobileInput == '1234567890' && passwordInput == 'Abc@123') {
        window.location.href = 'https://twitter.com/';
    }
}

function getCredentialsFromLocalStorage() {
    const storedCredentials = localStorage.getItem('pwArr');
    return storedCredentials ? JSON.parse(storedCredentials) : null;
}