let passw_submit = require('./ExPasswordInputTest');

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './OriginalLogin.html'), 'utf8')

describe('Test password input', () => {
    let passwordError;
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        passwordError = document.getElementById('passwordError');
    });

    test('Valid password', () => {
        passw_submit('Abc@123', passwordError);
        expect(passwordError.textContent).toEqual('');
    });

    test('Invalid password', () => {
        passw_submit("Abc@111", passwordError);
        expect(passwordError.textContent).toEqual('*Wrong password');
    });

    test('Empty passowrd input', () => {
        passw_submit('', passwordError);
        expect(passwordError.textContent).toEqual('*This field is required');
    });

    test('Giving spaces in password input', () => {
        passw_submit('     ', passwordError);
        expect(passwordError.textContent).toEqual('*This field is required');
    });

    test('Alphabets in password input', () => {
        passw_submit('dasdas', passwordError);
        expect(passwordError.textContent).toEqual('*Required 7 characters');
    });

    test('Only alphabets in password input', () => {
        passw_submit('dasdaas', passwordError);
        expect(passwordError.textContent).toEqual('*Wrong password');
    });

    test('Only numbers in passowrd input', () => {
        passw_submit('2123123', passwordError);
        expect(passwordError.textContent).toEqual('*Wrong password');
    });

    test('Only special characters in password input', () => {
        passw_submit('@@@!#@@', passwordError);
        expect(passwordError.textContent).toEqual('*Wrong password');
    });

    test('Valid mobile number', () => {
        passw_submit('-123123', passwordError);
        expect(passwordError.textContent).toEqual('*Wrong password');
    });
});