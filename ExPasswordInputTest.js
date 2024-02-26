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

module.exports=passw_submit;