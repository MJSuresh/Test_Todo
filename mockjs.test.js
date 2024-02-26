let checking_login_called = require('./mockjs')

describe('test', () => {
    let mockCallBack = jest.fn();

    test('valid input', () => {
        checking_login_called('123', mockCallBack);
        expect(mockCallBack).toBeCalledTimes(1);
        expect(mockCallBack).toBeCalledWith(true)
    });

    test('test 2', () => {
        checking_login_called('122', mockCallBack);
        expect(mockCallBack).not.toBeCalled();
    });

    test('test 2', () => {
        checking_login_called('123', mockCallBack);
        expect(mockCallBack).toBeCalledWith(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});