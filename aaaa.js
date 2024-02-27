function login_submit(mobileInput, passwordInput) {
    if (mobileInput == '1234567890' && passwordInput == 'Abc@123') {
        window.location.href='https://twitter.com/';
    }
}

function call_twitter(url) {
    window.location.href = url;
}

module.exports = { login_submit, call_twitter };