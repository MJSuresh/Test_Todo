const { mobile_submit, passw_submit, login_submit } = require('./aaaa');

// retrieving sources for checking html contents
const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './OriginalLogin.html'), 'utf8');

// testing the page is loading or not
const { JSDOM } = require('jsdom');

function loadHTMLFile(filePath) {
    const html_load = fs.readFileSync(filePath, 'utf-8');
    const dom = new JSDOM(html_load, { runScripts: 'dangerously', resources: 'usable' });

    // Wait for the scripts to be executed and resources to be loaded
    return new Promise((resolve) => {
        dom.window.onload = () => {
            resolve(dom);
        };
    });
}

test('Loaded HTML page is correct', async () => {
    const htmlFilePath = 'OriginalLogin.html';

    // Load the HTML file
    const dom = await loadHTMLFile(htmlFilePath);

    // Access the document object
    const document = dom.window.document;

    // Performing assertions based on the content of the loaded HTML
    // Checking a specific element is present or not
    const loginButton = document.getElementById('login-btn');
    expect(loginButton).not.toBeNull();
});

// testing the presents of contents
describe('structure testing', () => {
    test('Testing the presents of mobile input box', () => {
        document.documentElement.innerHTML = html.toString();
        expect(document.querySelector('.total-div')).toBeTruthy();
        expect(document.querySelector('.login-div')).toBeTruthy();
        expect(document.querySelector('h1').innerHTML).toBe('Login');
        expect(document.querySelector('.details')).toBeTruthy();
        expect(document.querySelectorAll('.details')[0].innerHTML).toBe('Phone Number');
        expect(document.getElementById('mobilenumber').placeholder).toBe('Enter Number');
        expect(document.querySelector('#mobileError')).toBeTruthy();
        expect(document.querySelectorAll('.details')[1].innerHTML).toBe('Password');
        expect(document.getElementById('password').placeholder).toBe('Enter Password');
        expect(document.querySelector('#passwordError')).toBeTruthy();
        expect(document.getElementById('login-btn').innerHTML).toBe('Login');
        expect(document.querySelector('#forget-password').innerHTML).toBe('Forget Password?');
        expect(document.querySelector('#forget-password').href).toEqual('https://twitter.com/i/flow/password_reset');
        expect(document.querySelector('#create-new-account').innerHTML).toBe('Create New Account');
        expect(document.querySelector('#create-new-account').href).toEqual('https://twitter.com/i/flow/signup');
        expect(document.querySelector('h4').innerHTML).toBe('Login with other option');
        expect(document.querySelector('.fa-facebook')).toBeTruthy();
        expect(document.querySelector('.fa-facebook').href).toEqual('https://www.facebook.com/');
        expect(document.querySelector('.fa-apple')).toBeTruthy();
        expect(document.querySelector('.fa-apple').href).toEqual('https://www.apple.com/in/');
        expect(document.querySelector('.fa-google')).toBeTruthy();
        expect(document.querySelector('.fa-google').href).toEqual('https://www.google.com/');
    });
});

describe('testing ContentLoaded', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('test DOMContentLoaded', () => {
        // DOM load test
        global.document.dispatchEvent(new Event('DOMContentLoaded'));
        expect(document.activeElement.id).toBe('mobilenumber'); // NN. automatically get focus by loading the page

        // Mobile input event listener test
        const mobileInput = document.getElementById('mobilenumber');
        mobileInput.value = 'TDD';
        mobileInput.dispatchEvent(new Event('input'));
        expect(document.getElementById('mobileError').textContent).toBe("*Invalid format");

        // Password input event listener test
        const passwordInput = document.getElementById('password');
        passwordInput.value = 'ababab';
        passwordInput.dispatchEvent(new Event('input'));
        expect(document.getElementById('passwordError').textContent).toBe('*Required 7 characters');

        // checking the static or dynamic nature of the button
        const login = document.getElementById('login-btn');
        expect(typeof login.click).toBe('function');

        // Login click event listener test
        const prevent_mock = jest.spyOn(Event.prototype, 'preventDefault'); // NN
        document.getElementById('login-btn').click();
        expect(prevent_mock).toBeCalled(); // NN
        expect(document.getElementById('mobileError').textContent).toBe('*Invalid format');
        expect(document.getElementById('passwordError').textContent).toBe('*Required 7 characters');
    });

    test('testing DOMContentLoaded with inputs', () => {
        global.document.dispatchEvent(new Event('DOMContentLoaded'));
        expect(document.activeElement.id).toBe('mobilenumber');
        const mobileInput = document.getElementById('mobilenumber');
        mobileInput.value = '1234567890';
        mobileInput.dispatchEvent(new Event('input'));
        expect(document.getElementById('mobileError').textContent).toBe("");

        const passwordInput = document.getElementById('password');
        passwordInput.value = 'abababa';
        passwordInput.dispatchEvent(new Event('input'));
        expect(document.getElementById('passwordError').textContent).toBe('');

        document.getElementById('login-btn').click();
        expect(document.getElementById('passwordError').textContent).toBe('*Wrong password');
    });
});

// testing the mobile inputs
describe('Test mobile input', () => {
    let mobileError;
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        mobileError = document.getElementById('mobileError');
    });

    test('Valid mobile number', () => {
        mobile_submit('1234567890');
        expect(mobileError.textContent).toEqual('');
    });

    test('Invalid mobile number', () => {
        mobile_submit("1234567891");
        expect(mobileError.textContent).toEqual('*Mobile number does not exist');
    });

    test('Empty mobile number input', () => {
        mobile_submit('');
        expect(mobileError.textContent).toEqual('*Empty field');
    });

    test('Giving spaces in mobile number input', () => {
        mobile_submit('     ');
        expect(mobileError.textContent).toEqual('*Invalid format');
    });

    test('Alphabets in mobile number input', () => {
        mobile_submit('dasdas');
        expect(mobileError.textContent).toEqual('*Invalid format');
    });

    test('Giving spaces between the numbers in mobile number input', () => {
        mobile_submit('2123123 67');
        expect(mobileError.textContent).toEqual('*Invalid format');
    });

    test('Spacial characters in mobile number input', () => {
        mobile_submit('@@@@@');
        expect(mobileError.textContent).toEqual('*Invalid format');
    });

    test('Spacial characters and numbers in mobile number input', () => {
        mobile_submit('23123@$@');
        expect(mobileError.textContent).toEqual('*Invalid format');
    });

    test('Negative value in mobile number input', () => {
        mobile_submit('-123123');
        expect(mobileError.textContent).toEqual('*Invalid format');
    });

    test('contain less that 10 numbers', () => {
        mobile_submit('123123');
        expect(mobileError.textContent).toEqual('*Required 10 numbers');
    });
});

// testing the password inputs
describe('Test password input', () => {
    let passwordError;
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        passwordError = document.getElementById('passwordError');
    });

    test('Valid password', () => {
        passw_submit('Abc@123');
        expect(passwordError.textContent).toEqual('');
    });

    test('Invalid password', () => {
        passw_submit("Abc@111");
        expect(passwordError.textContent).toEqual('');
    });

    test('Empty passowrd input', () => {
        passw_submit('');
        expect(passwordError.textContent).toEqual('*Empty field');
    });

    test('Giving spaces in password input', () => {
        passw_submit('     ');
        expect(passwordError.textContent).toEqual("*Password doesn't contain space");
    });

    test('Alphabets in password input', () => {
        passw_submit('dasdas');
        expect(passwordError.textContent).toEqual('*Required 7 characters');
    });

    test('Only alphabets in password input', () => {
        passw_submit('dasdaas');
        expect(passwordError.textContent).toEqual('');
    });

    test('Only numbers in passowrd input', () => {
        passw_submit('2123123');
        expect(passwordError.textContent).toEqual('');
    });

    test('Only special characters in password input', () => {
        passw_submit('@@@!#@@');
        expect(passwordError.textContent).toEqual('');
    });

    test('Valid mobile number', () => {
        passw_submit('-123123');
        expect(passwordError.textContent).toEqual('');
    });
});

// Mock the window.location.href setter
delete global.window.location;
global.window = Object.create(window);

// Mock the function that sets the window location
global.window.location = {
    href: '',
};

describe('login_submit function', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        global.window.location.href = '';
    });

    test('should navigate by valid credentials', () => {
        login_submit('1234567890', 'Abc@123');
        expect(global.window.location.href).toBe('https://twitter.com/');
        expect(passwordError.textContent).toBe('');
    });

    test('should not navigate by invalid credentials', () => {
        login_submit('invalid', '567');
        expect(global.window.location.href).toBe('');
        expect(passwordError.textContent).toBe('');
    });

    test('should not navigate if any invalid credential givens', () => {
        login_submit('1234567890', 'invalid');
        expect(global.window.location.href).toBe('');
        expect(passwordError.textContent).toBe('*Wrong password');
    });

    test('should not navigate if any invalid credential givens', () => {
        login_submit('123456780', 'Abc@123');
        expect(global.window.location.href).toBe('');
        expect(passwordError.textContent).toBe('');
    });

    test('should with valid credentials', () => {
        login_submit('1234567890', '');
        expect(global.window.location.href).toBe('');
        expect(passwordError.textContent).toBe('');
    });
});