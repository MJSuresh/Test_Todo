const { login_submit } = require('./ExLoginButton');

// mocking call_twitter function 
const mock_call_twitter = jest.fn();

test('valid mobile and password', () => {
    login_submit('1234567890', 'Abc@123', mock_call_twitter);
    expect(mock_call_twitter).toHaveBeenCalledWith('https://twitter.com/');
});

test('valid mobile and wrong password', () => {
    login_submit('1234567890', 'Abc@321', mock_call_twitter);
    expect(mock_call_twitter).not.toBeCalled();
});

test('valid mobile and wrong password', () => {
    login_submit('1234567891', 'Abc@123', mock_call_twitter);
    expect(mock_call_twitter).not.toBeCalled();
});

test('valid mobile and wrong password', () => {
    login_submit('', '       ', mock_call_twitter);
    expect(mock_call_twitter).not.toBeCalled();
});

afterEach(() => {
    jest.clearAllMocks();
});