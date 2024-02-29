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
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('Testing the presents of mobile input box', () => {
        expect(document.getElementById('mobilenumber').placeholder).toBe('Enter Number');
    });

    test('Testing the presents of password input box', () => {
        expect(document.getElementById('password').placeholder).toBe('Enter Password');
    });

    test('Testing the presents of login button', () => {
        expect(document.getElementById('login-btn').innerHTML).toBe('Login');
    });

    test('Testing the presents of forget password option', () => {
        expect(document.querySelector('#forget-password').innerHTML).toBe('Forget Password?');
    });

    test('Testing the presents of create new account option', () => {
        expect(document.querySelector('#create-new-account').innerHTML).toBe('Create New Account');
    });

    test('Testing the presents of facebook icon', () => {
        expect(document.querySelector('.fa-facebook')).toBeTruthy();
    });

    test('Testing the presents of twitter icon', () => {
        expect(document.querySelector('.fa-apple')).toBeTruthy();
    });

    test('Testing the presents of google icon', () => {
        expect(document.querySelector('.fa-google')).toBeTruthy();
    });
});

describe('testing ContentLoaded', () => {
    // testing ContentLoaded event listener
    // const document = new JSDOM(html).window;
    // global.document = document;

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('test DOMContentLoaded', () => {
        global.document.dispatchEvent(new Event('DOMContentLoaded'));
        expect(document.getElementById('mobilenumber')).toBeTruthy();
        expect(document.activeElement.id).toBe('mobilenumber');
        expect(document.getElementById('password')).toBeTruthy();
        const prevent_mock = jest.spyOn(Event.prototype, 'preventDefault')
        document.getElementById('login-btn').click();
        expect(prevent_mock).toBeCalled();
        // document.getElementById('mobilenumber').dispatchEvent(new Event('input'))
        document.getElementById('password').dispatchEvent(new Event('input'))
        // document.getElementById('mobilenumber').value='1234567890';
        // mobile_submit_mock('1234567890');
        // expect(mobile_submit_mock).toHaveBeenCalledWith('1234567890');

        const mobile_submit_mock = jest.fn();
        global.mobile_submit = mobile_submit_mock;
        const mobileInput = document.getElementById('mobilenumber');
        mobileInput.value = '1234567890';
        mobileInput.dispatchEvent(new Event('input'));

        // Check if mobile_submit is called with the correct argument
        expect(mobile_submit_mock).toHaveBeenCalledWith('1234567890');
    });
})

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
    let passwordError;
    beforeEach(()=>{
        document.documentElement.innerHTML=html.toString();
        passwordError = document.getElementById('passwordError');
    });
    afterEach(() => {
        global.window.location.href = '';
    });

    test('should navigate by valid credentials', () => {
        login_submit('1234567890', 'Abc@123');
        expect(global.window.location.href).toBe('https://twitter.com/');
        expect(document.getElementById('passwordError').textContent).toBe('');
    });

    test('should not navigate by invalid credentials', () => {
        login_submit('invalid', '567');
        expect(global.window.location.href).toBe('');
        expect(document.getElementById('passwordError').textContent).toBe('');
    });

    test('should not navigate if any invalid credential givens', () => {
        login_submit('1234567890', 'invalid');
        expect(global.window.location.href).toBe('');
        expect(document.getElementById('passwordError').textContent).toBe('*Wrong password');
    });

    test('should not navigate if any invalid credential givens', () => {
        login_submit('123456780', 'Abc@123');
        expect(global.window.location.href).toBe('');
        expect(document.getElementById('passwordError').textContent).toBe('');
    });

    test('should with valid credentials', () => {
        login_submit('1234567890', '');
        expect(global.window.location.href).toBe('');
        expect(document.getElementById('passwordError').textContent).toBe('');
    });
});