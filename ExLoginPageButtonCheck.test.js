// Imports and setup
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const virtualDOM = new JSDOM(
    `<!DOCTYPE html>
    <html lang="en">

    <body>
        <div class="total-div">
            <div class="login-div">
                <form>
                    <i>
                        <h1>Login</h1>
                    </i>
                    <div class="details">Phone Number</div>
                    <input type="tel" id="mobilenumber" name="mobilenumber" placeholder="Enter Number"
                    maxlength="10"  class="form" title="Enter 10 Digit Phone Number" />
                    <br>
                    <div id="mobileError" class="error-message"></div>
                    <br>
                    <div class="details">Password</div>
                    <input type="password" id="password" name="password" maxlength="7" placeholder="Enter Password"
                         class="form"
                        title="Enter a strong password (6 characters, including uppercase, lowercase, and numbers)" />
                    <br>
                    <div id="passwordError" class="error-message"></div>
                    <br>
    
                    <button type="submit" class="form" id="login-btn">Login</button>
                    <br>
                    <p class="spacing">
                        <a href="#" class="password-option1">Forget Password?</a>
                        <a href="#" class="password-option2">Create New Account</a>
                    </p>
    
                    <h4>Login with other option</h4>
                    <div class="login-option">
                        <a href="#" class="fa fa-facebook"></a>
                        <a href="#" class="fa fa-twitter"></a>
                        <a href="#" class="fa fa-google"></a>
                    </div>
                </form>
            </div>
        </div>
    </body>
    
    </html>`,
    { runScripts: 'dangerously' }
);

//   global.document = virtualDOM.window.document;

test('Testing the presents of mobile input box', () => {
    expect(virtualDOM.window.document.getElementById('mobilenumber').placeholder).toBe('Enter Number');
});

test('Testing the presents of password input box', () => {
    expect(virtualDOM.window.document.getElementById('password').placeholder).toBe('Enter Password');
});

test('Testing the presents of login button', () => {
    expect(virtualDOM.window.document.getElementById('login-btn').innerHTML).toBe('Login');
});

test('Testing the presents of forget password option', () => {
    expect(virtualDOM.window.document.querySelector('.password-option1').innerHTML).toBe('Forget Password?');
});

test('Testing the presents of create new account option', () => {
    expect(virtualDOM.window.document.querySelector('.password-option2').innerHTML).toBe('Create New Account');
});

test('Testing the presents of facebook icon', () => {
    expect(virtualDOM.window.document.querySelector('.fa-facebook')).toBeTruthy();
});

test('Testing the presents of twitter icon', () => {
    expect(virtualDOM.window.document.querySelector('.fa-twitter')).toBeTruthy();
});

test('Testing the presents of google icon', () => {
    expect(virtualDOM.window.document.querySelector('.fa-google')).toBeTruthy();
});