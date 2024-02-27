const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './OriginalLogin.html'), 'utf8');

//   global.document = document;

describe('task testing', () => {
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
        expect(document.querySelector('.fa-twitter')).toBeTruthy();
    });

    test('Testing the presents of google icon', () => {
        expect(document.querySelector('.fa-google')).toBeTruthy();
    });
});