const { submitTask, showNotification, confirmFunction } = require('./todo_submit');

const progress = jest.fn();
const all = jest.fn();
const showNotification_mock = jest.fn();

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './todo_html.html'), 'utf8')

describe('Test mobile input', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('Testing the presents of header', () => {
        expect(document.querySelector('header h2').textContent).toBe('To-Do List App');
    });

    test('Testing the presents of input box', () => {
        expect(document.querySelector('.form-control-input')).toBeTruthy();
    });

    test('Testing the presents of submit icon', () => {
        expect(document.querySelector('.fa-square-plus')).toBeTruthy();
    });

    test('Testing the presents of all navbar', () => {
        expect(document.getElementById('All').textContent).toBe('All');
        expect(document.querySelector('#All').className).toBe('active');
    });

    test('Testing the presents of pending navbar', () => {
        expect(document.getElementById('Progress').textContent).toBe('Pending');
    });

    test('Testing the presents of finished navbar', () => {
        expect(document.getElementById('Completed').textContent).toBe('Finished');
    });

    test('Testing the presents of added task', () => {
        expect(document.querySelector('.content .text').textContent).not.toBeNull();
    });

    test('Testing the presents of checkbox icon', () => {
        expect(document.querySelector('.actions .fa-circle-check')).toBeTruthy();
    });
    
    test('Testing the presents of edit icon', () => {
        expect(document.querySelector('.actions .fa-pen')).toBeTruthy();
    });

    test('Testing the presents of delete icon', () => {
        expect(document.querySelector('.actions .fa-trash')).toBeTruthy();
    });

    test('Testing the presents of footer', () => {
        expect(document.querySelector('footer').textContent).toBe('All © 2024. All Rights Reserved.');
    });
});

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

describe('counts', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    function counts(all_size, finished_size) {
        const progress_count = all_size-finished_size;
        document.getElementById("All").innerHTML = `All(${all_size})`;
        document.getElementById("Progress").innerHTML = `Pending(${progress_count})`;
        document.getElementById(
          "Completed"
        ).innerHTML = `Finished(${finished_size})`;
      }

    test('Testing the count function', () => {
        counts(10,5);
        expect(document.getElementById('All').innerHTML).toBe('All(10)');
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(5)');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(5)');
    });

    test('Testing the count function', () => {
        counts(0,0);
        expect(document.getElementById('All').innerHTML).toBe('All(0)');
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(0)');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(0)');
    });

    test('Testing the count function', () => {
        counts(7,0);
        expect(document.getElementById('All').innerHTML).toBe('All(7)');
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(7)');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(0)');
    });
});

describe('confirm function', () => {
    afterEach(() => {
        document.body.innerHTML = ''; // Clean up the DOM after each test
    });

    test('checking the presents of confirm box and it contents', () => {
        confirmFunction('Task still in pending?', 'Hello');
        expect(document.querySelector('.confirm-box')).toBeTruthy();
        expect(document.querySelector('.confirm-box .message-box')).toBeTruthy();
        expect(document.querySelector('.confirm-box .message-box').innerText).toBe('Task still in pending?');
        expect(document.querySelector('.confirm-box .popTaskBox')).toBeTruthy();
        expect(document.querySelector('.confirm-box .popTaskBox').innerText).toBe('Hello');
        expect(document.querySelector('.confirm-box .button-box')).toBeTruthy();
        expect(document.querySelector('.button-box .yes-button')).toBeTruthy();
        expect(document.querySelector('.button-box .yes-button').textContent).toBe('Yes');
        expect(document.querySelector('.button-box .no-button')).toBeTruthy();
        expect(document.querySelector('.button-box .no-button').textContent).toBe('No');
    });
});