function login_submit(mobileInput, passwordInput, call_twitter) {
  if (mobileInput == '1234567890' && passwordInput == 'Abc@123') {
    call_twitter('https://twitter.com/');
  }
}

module.exports = { login_submit };