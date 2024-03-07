const { submitTask, showNotification, confirmFunction, display, counts } = require('./todo_submit2');
// const progress = jest.fn();
// const all = jest.fn();
const showNotification_mock = jest.fn();
const submitTask_mock = jest.fn();

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './todo_html.html'), 'utf8');

describe('Testing page load', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test('Testing Event Listeners', () => {
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
        // expect(document.querySelector('.content .text').textContent).not.toBeNull();
        // expect(document.querySelector('.actions .fa-circle-check')).toBeTruthy();
        // expect(document.querySelector('.actions .fa-pen')).toBeTruthy();
        // expect(document.querySelector('.actions .fa-trash')).toBeTruthy();
        expect(document.querySelector('footer').textContent).toBe('All © 2024. All Rights Reserved.');
    });
});

describe('Testing submitTask', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('Testing with new input', () => {
        submitTask('hello', 'empty_or_null');
        // showNotification_mock('Task added successfully','success')
        // expect(showNotification_mock).toHaveBeenCalledWith('Task added successfully', 'success')
    });

    test('Testing with new input', () => {
        submitTask('', 'empty_or_null');
    });

    test('Testing with new input', () => {
        submitTask('morning', 'empty_or_null');
    });

    test('Testing with new input', () => {
        // removing active class in PROGRESS and adding in ALL navbar
        document.getElementById('All').classList.remove('active');
        document.getElementById('Progress').classList.add('active');
        submitTask('good morning', 'morning');
    });

    test('Testing with new input', () => {
        submitTask('good morning', 'empty_or_null');
    });

    test('Testing with new input', () => {
        submitTask('bad morning', 'empty_or_null');
    });
});

describe('Testing submitTask', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('Testing with new input', () => {
        window.dispatchEvent(new Event('load'));
        const form = document.querySelector('#new-task-form #title');
        const enter_key_event = new KeyboardEvent('keyup', { key: 'Enter' });
        form.dispatchEvent(enter_key_event);
        expect(document.getElementById('All').innerHTML).toBe('All(4)');
        document.getElementById("add-icon").click();
        expect(typeof document.getElementById("add-icon").click).toBe('function');
        document.getElementById('Completed').click();
        expect(typeof document.getElementById("Completed").click).toBe('function');
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(3)');
        document.getElementById('Progress').click();
        expect(typeof document.getElementById("Progress").click).toBe('function');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(1)');
    });
});

describe('showNotification', () => {
    beforeEach(() => {
        jest.useFakeTimers(); // Use fake timers before each test
        document.body.innerHTML = '';
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

describe('testing counts', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('counts 1', () => {
        counts();
        expect(document.getElementById('All').innerHTML).toBe('All(4)');
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(3)');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(1)');
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

describe('Testing edit_function', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test('Testing edit for pending task', () => {
        window.dispatchEvent(new Event('load'))
        const edit_function = document.querySelectorAll('.task')[0].querySelector('.edit');
        edit_function.click();
    });

    test('Testing edit for completed task', () => {
        window.dispatchEvent(new Event('load'))
        const edit_function = document.querySelectorAll('.task')[3].querySelector('.edit');
        edit_function.click();
    });
});

describe('Testing delete_function', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    // test('Testing delete for pending task if it is in the ALL navbar', () => {
    //     window.dispatchEvent(new Event('load'))
    //     const delete_function = document.querySelectorAll('.task')[0].querySelector('.delete');
    //     delete_function.click();
    //     const yesbtn = document.querySelector('.yes-button');
    //     yesbtn.click();
    // });

    // test('Testing delete for pending task if it is in the PROGRESS navbar', () => {
    //     window.dispatchEvent(new Event('load'))
    //     document.getElementById('All').classList.remove('active');
    //     document.getElementById('Progress').classList.add('active');
    //     const delete_function = document.querySelectorAll('.task')[0].querySelector('.delete');
    //     delete_function.click();
    //     const yesbtn = document.querySelector('.yes-button');
    //     yesbtn.click();
    // });

    // test('Testing pending task checkbox if input has some values', () => {
    //     window.dispatchEvent(new Event('load'))
    //     document.querySelector('#title').value='21312';
    //     const delete_function = document.querySelectorAll('.task')[0].querySelector('.delete');
    //     delete_function.click();
    // });

    // test('Testing completed task checkbox if it is in the ALL navbar', () => {
    //     window.dispatchEvent(new Event('load'))
    //     console.log(document.querySelectorAll('.task')[3].innerHTML)
    //     const delete_function = document.querySelectorAll('.task')[3].querySelector('.delete');
    //     delete_function.click();
    //     const yesbtn = document.querySelector('.yes-button');
    //     yesbtn.click();
    // });

    // test('Testing completed task checkbox if it is in the FINISHED navbar', () => {
    //     window.dispatchEvent(new Event('load'))
    //     document.getElementById('All').classList.remove('active');
    //     document.getElementById('Completed').classList.add('active');
    //     const delete_function = document.querySelectorAll('.task')[3].querySelector('.delete');
    //     delete_function.click();
    //     const yesbtn = document.querySelector('.yes-button');
    //     yesbtn.click();
    // });

    test('Testing completed task checkbox if input has some values', () => {
        window.dispatchEvent(new Event('load'))
        document.querySelector('#title').value='21312';
        const delete_function = document.querySelectorAll('.task')[3].querySelector('.delete');
        delete_function.click();
    });
});

// describe('Testing checkbox_function', () => {
//     beforeEach(() => {
//         document.documentElement.innerHTML = html.toString();
//     })

//     test('Testing pending task checkbox if it is in the ALL navbar', () => {
//         window.dispatchEvent(new Event('load'))
//         const checkbox_function = document.querySelectorAll('.task')[0].querySelector('#myCheckbox');
//         checkbox_function.click();
//         const yesbtn = document.querySelector('.yes-button');
//         yesbtn.click();
//     });

//     test('Testing pending task checkbox if it is in the PENDING navbar', () => {
//         window.dispatchEvent(new Event('load'))
//         document.getElementById('All').classList.remove('active');
//         document.getElementById('Progress').classList.add('active');
//         const checkbox_function = document.querySelectorAll('.task')[0].querySelector('#myCheckbox');
//         checkbox_function.click();
//         const yesbtn = document.querySelector('.yes-button');
//         yesbtn.click();
//     });

//     test('Testing pending task checkbox if input has some values', () => {
//         window.dispatchEvent(new Event('load'))
//         document.querySelector('#title').value='21312';
//         const checkbox_function = document.querySelectorAll('.task')[0].querySelector('#myCheckbox');
//         checkbox_function.click();
//     });

//     test('Testing completed task checkbox if it is in the ALL navbar', () => {
//         window.dispatchEvent(new Event('load'))
//         const checkbox_function = document.querySelectorAll('.task')[3].querySelector('#myCheckbox');
//         checkbox_function.click();
//         const yesbtn = document.querySelector('.yes-button');
//         yesbtn.click();
//     });

//     test('Testing completed task checkbox if it is in the FINISHED navbar', () => {
//         window.dispatchEvent(new Event('load'))
//         document.getElementById('All').classList.remove('active');
//         document.getElementById('Completed').classList.add('active');
//         const checkbox_function = document.querySelectorAll('.task')[3].querySelector('#myCheckbox');
//         checkbox_function.click();
//         const yesbtn = document.querySelector('.yes-button');
//         yesbtn.click();
//     });

//     test('Testing completed task checkbox if input has some values', () => {
//         window.dispatchEvent(new Event('load'))
//         document.querySelector('#title').value='21312';
//         const checkbox_function = document.querySelectorAll('.task')[3].querySelector('#myCheckbox');
//         checkbox_function.click();
//     });
// });