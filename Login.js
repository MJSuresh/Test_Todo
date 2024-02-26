const pwArr=['1234567890', 'Abc@123']
localStorage.setItem('pwArr',JSON.stringify(pwArr))

let mobile=document.querySelector('#mobilenumber');
let passw=document.querySelector('#password');

// document.getElementById('login-btn').addEventListener('click', function(event){
//     event.preventDefault();
//     mobile_submit(mobile.value);
//     passw_submit(passw.value);
//     final_submit(mobile.value, passw.value);
// });

function mobile_submit(mobileInput){
    var mobileError = document.getElementById('mobileError');

    if (mobileInput != '1234567890') {
        if(mobileInput==''){
            mobileError.textContent = '*This field is required';
            return "This field is required";
        } else if(mobileInput.length<10){
            mobileError.textContent = '*Invalid format';
            return "Invalid format";
        } else {
            mobileError.textContent = '*Mobile number does not exits';
            return "Mobile number does not exits";
        }
    } else {
        mobileError.textContent = '';
        return "Valid mobile number";
    }
};

function passw_submit(passwordInput){
    var passwordError = document.getElementById('passwordError');
    
    if (passwordInput != 'Abc@123') {
        if(passwordInput==''){
            passwordError.textContent = '*This field is required';
            return "This field is required";
        } else if(passwordInput.length<7){
            passwordError.textContent = '*Invalid format';
            return "Invalid format";
        } else {
            passwordError.textContent = '*Wrong password';
            return "Wrong password";
        }
    } else {
        passwordError.textContent = '';
        return "Valid password";
    }
}

function final_submit(mobileInput, passwordInput){
    if(mobileInput == '1234567890' &&  passwordInput == 'Abc@123'){
        window.location.href = 'https://twitter.com/';
        return "You have successfully logged in";
    } else{
        return "Login failed";
    }
}

function getCredentialsFromLocalStorage() {
    const storedCredentials = localStorage.getItem('pwArr');
    return storedCredentials ? JSON.parse(storedCredentials) : null;
}
module.exports=mobile_submit;
module.exports=passw_submit;
module.exports=final_submit;
module.exports = getCredentialsFromLocalStorage;