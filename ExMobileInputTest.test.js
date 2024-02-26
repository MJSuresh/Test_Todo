const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let mobile_submit = require('./ExMobileInputTest');

describe('Test mobile input', () => {
    let dom;
    let mobileError;

    beforeEach(() => {
        dom = new JSDOM(`<!DOCTYPE html><html lang="en"><body><div id="mobileError" class="error-message"></div></body></html>`, { runScripts: 'dangerously' });
        global.document = dom.window.document;
        mobileError = dom.window.document.getElementById('mobileError');
    });

    afterEach(() => {
        delete global.document;
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