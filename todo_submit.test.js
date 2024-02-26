const { submitTask, showNotification } = require('./todo_submit');

const progress = jest.fn();
const all = jest.fn();
const showNotification_mock = jest.fn();

describe('submitTask function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock call history before each test
        // document.body.innerHTML='';
    });

    test('should call progress', () => {
        submitTask('New Task', 'empty_or_null', progress, showNotification_mock);
        expect(progress).toHaveBeenCalledTimes(1);
        expect(all).not.toHaveBeenCalled();
        expect(showNotification_mock).toBeCalled();
        expect(showNotification_mock).toHaveBeenCalledWith("Task added successfully.", "success");
    });

    test('should call all', () => {
        submitTask('hello', 'Existing Task', all, showNotification_mock);
        expect(all).not.toHaveBeenCalled();
        expect(progress).not.toHaveBeenCalled();
        expect(showNotification_mock).toHaveBeenCalledWith("Task already exist.", "warning");
    });

    test('should call all', () => {
        submitTask('hello2', 'hello', all, showNotification_mock);
        expect(all).toHaveBeenCalledTimes(1);
        expect(progress).not.toHaveBeenCalled();
        expect(showNotification_mock).toHaveBeenCalledWith("Task updated successfully.", "success");
    });

    test('should call all', () => {
        submitTask('hello 2', 'Existing Task', all, showNotification_mock);
        expect(all).toBeCalled();
        expect(progress).not.toHaveBeenCalled();
        expect(showNotification_mock).toHaveBeenCalledWith("Task updated successfully.", "success");
    });

    test('should call progress', () => {
        submitTask('', 'Existing Task', progress, showNotification_mock);
        expect(progress).not.toHaveBeenCalled();
        expect(all).not.toHaveBeenCalled();
        expect(showNotification_mock).toHaveBeenCalledWith("Empty/Invalid Task not accepted.", "warning");
    });

    test('should call progress', () => {
        submitTask('#$%#%     &*^&^&*', 'empty_or_null', progress, showNotification_mock);
        expect(progress).not.toHaveBeenCalled();
        expect(all).not.toHaveBeenCalled();
        expect(showNotification_mock).toHaveBeenCalledWith("Empty/Invalid Task not accepted.", "warning");
    });
});

describe('showNotification', () => {
    beforeEach(() => {
        jest.useFakeTimers(); // Use fake timers before each test
    });

    afterEach(() => {
        document.body.innerHTML = ''; // Clean up the DOM after each test
        // jest.useRealTimers(); // Restore real timers after each test
    });

    test('should display a success notification with provided message', () => {
        showNotification('Task completed successfully', 'success');
        const notification = document.getElementById('notification-popup');
        expect(notification).toBeTruthy();
        expect(notification.textContent).toBe('Task completed successfully');
        expect(notification.classList.contains('success')).toBe(true);
        jest.advanceTimersByTime(1021);
        expect(document.getElementById('notification-popup')).toBeNull();
    });

    test('should display a success notification with provided message', () => {
        showNotification('Task moved to Pending', 'process');
        const notification = document.getElementById('notification-popup');
        expect(notification).toBeTruthy();
        expect(notification.textContent).toBe('Task moved to Pending');
        expect(notification.classList.contains('process')).toBe(true);
        jest.advanceTimersByTime(101);
        expect(document.getElementById('notification-popup')).not.toBeNull();
    });

    test('should display a warning notification with provided message', () => {
        showNotification('Task deleted successfully', 'warning');
        const notification = document.getElementById('notification-popup');
        expect(notification).toBeTruthy();
        expect(notification.textContent).toBe('Task deleted successfully');
        expect(notification.classList.contains('warning')).toBe(true);
    });
});
