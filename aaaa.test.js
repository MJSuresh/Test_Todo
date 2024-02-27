const { login_submit, call_twitter } = require('./aaaa');

// Mock the window.location.href setter
delete global.window.location;
global.window = Object.create(window);

// Mock the function that sets the window location
global.window.location = {
    href: '',
};

describe('login_submit function', () => {
    afterEach(() => {
        global.window.location.href = '';
    });

    it('should navigate by valid credentials', () => {
        login_submit('1234567890', 'Abc@123');
        expect(global.window.location.href).toBe('https://twitter.com/');
    });

    it('should not navigate by invalid credentials', () => {
        login_submit('invalid', 'invalid');
        expect(global.window.location.href).toBe('');
    });

    it('should not navigate if any invalid credential givens', () => {
        login_submit('1234567890', 'invalid');
        expect(global.window.location.href).toBe('');
    });

    it('should not navigate if any invalid credential givens', () => {
        login_submit('123456780', 'Abc@123');
        expect(global.window.location.href).toBe('');
    });

    it('should with valid credentials', () => {
        login_submit('1234567890', 'Abc@123');
        expect(global.window.location.href).toBe('https://twitter.com/');
    });

    it('call_twitter with links', ()=>{
        call_twitter("hello makkale");
        expect(global.window.location.href).toBe('hello makkale');
    });
    
    it('call_twitter with empty message', ()=>{
        call_twitter("");
        expect(global.window.location.href).toBe('');
    });
});