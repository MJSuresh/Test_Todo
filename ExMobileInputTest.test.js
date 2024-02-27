let mobile_submit = require('./ExMobileInputTest');

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './OriginalLogin.html'), 'utf8')

describe('Test mobile input', () => {
    let mobileError;
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        mobileError = document.getElementById('mobileError');
    });

    test('Valid mobile number', () => {
        mobile_submit('1234567890', mobileError);
        expect(mobileError.textContent).toEqual('');
    });

    test('Invalid mobile number', () => {
        mobile_submit("1234567891", mobileError);
        expect(mobileError.textContent).toEqual('*Mobile number does not exist');
    });

    test('Empty mobile number input', () => {
        mobile_submit('', mobileError);
        expect(mobileError.textContent).toEqual('*This field is required');
    });

    test('Giving spaces in mobile number input', () => {
        mobile_submit('     ', mobileError);
        expect(mobileError.textContent).toEqual('*This field is required');
    });

    test('Alphabets in mobile number input', () => {
        mobile_submit('dasdas', mobileError);
        expect(mobileError.textContent).toEqual('*This field is required');
    });

    test('Giving spaces between the numbers in mobile number input', () => {
        mobile_submit('2123123 67', mobileError);
        expect(mobileError.textContent).toEqual('*Required 10 numbers');
    });

    test('Spacial characters in mobile number input', () => {
        mobile_submit('@@@@@', mobileError);
        expect(mobileError.textContent).toEqual('*This field is required');
    });

    test('Spacial characters and numbers in mobile number input', () => {
        mobile_submit('23123@$@', mobileError);
        expect(mobileError.textContent).toEqual('*Required 10 numbers');
    });

    test('Negative value in mobile number input', () => {
        mobile_submit('-123123', mobileError);
        expect(mobileError.textContent).toEqual('*Required 10 numbers');
    });
});