const { submitTask, showNotification, confirmFunction, display, counts } = require('./todo_submit');

// const progress = jest.fn();
// const all = jest.fn();
const showNotification_mock = jest.fn();

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './todo_html.html'), 'utf8');

describe('Testing DOMContentLoaded', ()=>{
     beforeEach(()=>{
        document.documentElement.innerHTML=html.toString();
     })

     test('Testing Event Listeners', ()=>{
        window.dispatchEvent(new Event('load'))
     });
});

describe('Test contents', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('Testing presents of contents', () => {
        expect(document.querySelector('header h2').textContent).toBe('To-Do List App');
        expect(document.querySelector('.form-control-input')).toBeTruthy();
        expect(document.querySelector('.fa-square-plus')).toBeTruthy();
        expect(document.getElementById('All').textContent).toBe('All');
        expect(document.querySelector('#All').className).toBe('active');
        expect(document.getElementById('Progress').textContent).toBe('Pending');
        expect(document.getElementById('Completed').textContent).toBe('Finished');
        expect(document.querySelector('.content .text').textContent).not.toBeNull();
        expect(document.querySelector('.actions .fa-circle-check')).toBeTruthy();
        expect(document.querySelector('.actions .fa-pen')).toBeTruthy();
        expect(document.querySelector('.actions .fa-trash')).toBeTruthy();
        expect(document.querySelector('footer').textContent).toBe('All © 2024. All Rights Reserved.');
    });
});

describe('Testing submitTask', ()=>{
    beforeEach(()=>{
        document.documentElement.innerHTML=html.toString();
    });

    test('Testing with new input', ()=>{
        submitTask('hello', 'empty_or_null');
        // showNotification_mock('Task added successfully','success')
        // expect(showNotification_mock).toHaveBeenCalledWith('Task added successfully', 'success')
    });

    test('Testing with new input', ()=>{
        submitTask('', 'empty_or_null');
    });

    test('Testing with new input', ()=>{
        submitTask('morning', 'empty_or_null');
    });

    test('Testing with new input', ()=>{
        // removing active class in PROGRESS and adding in ALL navbar
        document.getElementById('Progress').classList.add('active');
        document.getElementById('All').classList.remove('active');
        submitTask('good morning', 'morning');
    });

    test('Testing with new input', ()=>{
        submitTask('good morning', 'empty_or_null');
    });
});

// describe('submitTask function', () => {
//     beforeEach(()=>{
//         document.documentElement.textContent.innerHTML=html.toString();
//     });
//     afterEach(() => {
//         jest.clearAllMocks(); // Clear mock call history before each test
//         // document.body.innerHTML='';
//     });

//     test('should call all', () => {
//         // global.document.dispatchEvent(new Event('DOMContentLoaded'))
//         submitTask('New Task', 'empty_or_null');
//         expect(progress).toHaveBeenCalledTimes(1);
//         expect(all).not.toHaveBeenCalled();
//         expect(showNotification_mock).toBeCalled();
//         expect(showNotification_mock).toHaveBeenCalledWith("Task added successfully.", "success");
//     });

//     // test('should call all', () => {
//     //     submitTask('hello', 'Existing Task', all, showNotification_mock);
//     //     expect(all).not.toHaveBeenCalled();
//     //     expect(progress).not.toHaveBeenCalled();
//     //     expect(showNotification_mock).toHaveBeenCalledWith("Task already exist.", "warning");
//     // });

//     // test('should call all', () => {
//     //     submitTask('hello2', 'hello', all, showNotification_mock);
//     //     expect(all).toHaveBeenCalledTimes(1);
//     //     expect(progress).not.toHaveBeenCalled();
//     //     expect(showNotification_mock).toHaveBeenCalledWith("Task updated successfully.", "success");
//     // });

//     // test('should call all', () => {
//     //     submitTask('hello 2', 'Existing Task', all, showNotification_mock);
//     //     expect(all).toBeCalled();
//     //     expect(progress).not.toHaveBeenCalled();
//     //     expect(showNotification_mock).toHaveBeenCalledWith("Task updated successfully.", "success");
//     // });

//     // test('should call progress', () => {
//     //     submitTask('', 'Existing Task', progress, showNotification_mock);
//     //     expect(progress).not.toHaveBeenCalled();
//     //     expect(all).not.toHaveBeenCalled();
//     //     expect(showNotification_mock).toHaveBeenCalledWith("Empty/Invalid Task not accepted.", "warning");
//     // });

//     // test('should call progress', () => {
//     //     submitTask('#$%#%     &*^&^&*', 'empty_or_null', progress, showNotification_mock);
//     //     expect(progress).not.toHaveBeenCalled();
//     //     expect(all).not.toHaveBeenCalled();
//     //     expect(showNotification_mock).toHaveBeenCalledWith("Empty/Invalid Task not accepted.", "warning");
//     // });
// });

describe('showNotification', () => {
    beforeEach(() => {
        jest.useFakeTimers(); // Use fake timers before each test
        document.body.innerHTML='';
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
        jest.advanceTimersByTime(2000);
        expect(document.getElementById('notification-popup')).toBeNull();
    });
});

describe('counts', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    function counts(all_size, finished_size) {
        const progress_count = all_size - finished_size;
        document.getElementById("All").innerHTML = `All(${all_size})`;
        document.getElementById("Progress").innerHTML = `Pending(${progress_count})`;
        document.getElementById(
            "Completed"
        ).innerHTML = `Finished(${finished_size})`;
    }

    test('Testing the count function', () => {
        counts(10, 5);
        expect(document.getElementById('All').innerHTML).toBe('All(10)');
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(5)');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(5)');
    });

    test('Testing the count function', () => {
        counts(0, 0);
        expect(document.getElementById('All').innerHTML).toBe('All(0)');
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(0)');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(0)');
    });

    test('Testing the count function', () => {
        counts(7, 0);
        expect(document.getElementById('All').innerHTML).toBe('All(7)');
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(7)');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(0)');
    });
});

describe('confirm function', () => {
    const callback_mock = jest.fn();
    afterEach(() => {
        document.body.innerHTML = ''; // Clean up the DOM after each test
    });

    test('checking the presents of confirm box and it contents', () => {
        confirmFunction('Task still in pending?', 'Hello', callback_mock);
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
        const nobtn = document.querySelector('.no-button');
        expect(document.querySelector('.confirm-box')).not.toBeNull();
        nobtn.click();
        expect(callback_mock).toBeCalledWith(false);
        expect(document.querySelector('confirm-box')).toBeNull();
    });

    test('checking the presents of confirm box and it contents', () => {
        confirmFunction('Task still in pending?', 'Hello', callback_mock);
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
        const yesbtn = document.querySelector('.yes-button');
        expect(document.querySelector('.confirm-box')).not.toBeNull();
        yesbtn.click();
        expect(callback_mock).toBeCalledWith(true);
        expect(document.querySelector('confirm-box')).toBeNull();
    });
});