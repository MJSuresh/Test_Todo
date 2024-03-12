const { submitTask, showNotification, confirmFunction, counts } = require('./todo_submit2');

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './todo_html.html'), 'utf8');

describe('Testing page load', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test('Testing load Event Listeners', () => {
        window.dispatchEvent(new Event('load'))
    });
});

describe('Testing contents', () => {
    test('Testing presents of contents', () => {
        document.documentElement.innerHTML = html.toString();
        expect(document.querySelector('header h2').textContent).toBe('To-Do List App');
        expect(document.querySelector('.form-control-input')).toBeTruthy();
        expect(document.querySelector('.fa-square-plus')).toBeTruthy();
        expect(document.getElementById('All').textContent).toBe('All');
        expect(document.querySelector('#All').className).toBe('active');
        expect(document.getElementById('Progress').textContent).toBe('Pending');
        expect(document.getElementById('Completed').textContent).toBe('Finished');
        expect(document.querySelector('footer').textContent).toBe('All © 2024. All Rights Reserved.');
    });
});

describe.skip('Testing navbar output if todo had no task', () => {
    beforeEach(() => {
        document.documentElement.innerText = html.toString();
    })

    // test for having no pending task
    test('Expecting NO CONTENT TEXT for PENDING navbar if todo had no pending task', () => {
        window.dispatchEvent(new Event('load'))
        document.getElementById('Progress').click()
        expect(document.querySelector('#tasks .no_task_span').innerHTML).toBe("You don't have any Pending Task")
    })

    // test for having no task
    test('Expecting NO CONTENT TEXT for ALL, PENDING and FINISHED navbar if todo had no task', () => {
        window.dispatchEvent(new Event('load'))
        document.getElementById('All').click()
        expect(document.querySelector('#tasks .no_task_span').innerHTML).toBe('No Task were added')
        document.getElementById('Progress').click()
        expect(document.querySelector('#tasks .no_task_span').innerHTML).toBe("You don't have any Pending Task")
        document.getElementById('Completed').click()
        expect(document.querySelector('#tasks .no_task_span').innerHTML).toBe("You don't have any Finished Task")
    })
})

describe('Testing submitTask function', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('Submitting existing task', () => {
        window.dispatchEvent(new Event('load'))
        submitTask('hello', 'empty_or_null');
        expect(document.getElementById('All').innerHTML).toBe('All(2)');
        expect(document.getElementById('notification-popup').textContent).toBe('Task already exist.')
    });

    test('Submitting empty task', () => {
        window.dispatchEvent(new Event('load'))
        submitTask('', 'empty_or_null');
        expect(document.getElementById('All').innerHTML).toBe('All(2)');
        expect(document.getElementById('notification-popup').textContent).toBe('Empty/Invalid Task not accepted.')
    });

    test('Submitting the task with empty spaces and special characters', () => {
        window.dispatchEvent(new Event('load'))
        submitTask('#$%#$%          %^&%&^&', 'empty_or_null');
        expect(document.getElementById('All').innerHTML).toBe('All(2)');
        expect(document.getElementById('notification-popup').textContent).toBe('Empty/Invalid Task not accepted.')
    });

    test('Submitting new task', () => {
        window.dispatchEvent(new Event('load'))
        submitTask('morning', 'empty_or_null');
        const task_text_check = document.querySelectorAll('.task')[0]
        expect(task_text_check.querySelector('.content .text').innerHTML).toBe('morning')
        expect(task_text_check.querySelector('.fa-circle-check')).toBeTruthy();
        expect(task_text_check.querySelector('.fa-pen')).toBeTruthy();
        expect(task_text_check.querySelector('.fa-trash')).toBeTruthy();
        expect(document.getElementById('All').innerHTML).toBe('All(3)');
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(2)');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(1)');
        expect(document.getElementById('notification-popup').textContent).toBe('Task added successfully.')
    });

    test('Submitting updated task', () => {
        window.dispatchEvent(new Event('load'))
        // removing active class in PROGRESS and adding in ALL navbar
        document.getElementById('All').classList.remove('active');
        document.getElementById('Progress').classList.add('active');
        submitTask('good morning', 'morning');
        expect(document.getElementById('All').innerHTML).toBe('All(3)');
        expect(document.getElementById('notification-popup').textContent).toBe('Task updated successfully.')
    });

    test('Submitting existing task', () => {
        window.dispatchEvent(new Event('load'))
        submitTask('good morning', 'empty_or_null');
        expect(document.getElementById('All').innerHTML).toBe('All(3)');
        expect(document.getElementById('notification-popup').textContent).toBe('Task already exist.')
    });

    test('Submitting new task with special characters', () => {
        window.dispatchEvent(new Event('load'))
        document.querySelector('#title').value = 'bad morning #$%#%^$^%';
        document.getElementById("add-icon").click();
        const task_text_check = document.querySelectorAll('.task')[0]
        expect(task_text_check.querySelector('.content .text').innerHTML).toBe('bad morning')
        expect(document.getElementById('All').innerHTML).toBe('All(4)');
        expect(document.getElementById('notification-popup').textContent).toBe('Task added successfully.')
    });

    test('Submitting empty task by clicking add-icon', () => {
        window.dispatchEvent(new Event('load'));
        document.getElementById("add-icon").click();
        expect(typeof document.getElementById("add-icon").click).toBe('function');
        expect(document.getElementById('notification-popup').textContent).toBe('Empty/Invalid Task not accepted.')
    });

    test('Submitting new task by enter keyword', () => {
        window.dispatchEvent(new Event('load'));
        const form = document.querySelector('#new-task-form #title');
        const enter_key_event = new KeyboardEvent('keyup', { key: 'Enter' });
        form.dispatchEvent(enter_key_event);
        expect(document.getElementById('notification-popup').textContent).toBe('Empty/Invalid Task not accepted.')
    });
});

describe('Testing navbar click event', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('Testing each navbar click event', () => {
        window.dispatchEvent(new Event('load'));
        expect(document.getElementById('All').innerHTML).toBe('All(4)');
        expect(document.querySelector('.active').id).toBe('All')
        document.getElementById('Completed').click();
        expect(typeof document.getElementById("Completed").click).toBe('function');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(1)');
        expect(document.querySelector('.active').id).toBe('Completed')
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(3)');
        document.getElementById('Progress').click();
        expect(typeof document.getElementById("Progress").click).toBe('function');
        expect(document.querySelector('.active').id).toBe('Progress')
    });
});

describe('Testing showNotification function', () => {
    beforeEach(() => {
        jest.useFakeTimers(); // Use fake timers before each test
        document.body.innerHTML = '';
    });

    afterEach(() => {
        document.body.innerHTML = ''; // Clean up the DOM after each test
        // jest.useRealTimers(); // Restore real timers after each test
    });

    test('Should display a success notification with provided message', () => {
        showNotification('Task completed successfully', 'success');
        const notification = document.getElementById('notification-popup');
        expect(notification).toBeTruthy();
        expect(notification.textContent).toBe('Task completed successfully');
        expect(notification.classList.contains('success')).toBe(true);
        jest.advanceTimersByTime(1021);
        expect(document.getElementById('notification-popup')).toBeNull();
    });

    test('Should display a success notification with provided message', () => {
        showNotification('Task moved to Pending', 'process');
        const notification = document.getElementById('notification-popup');
        expect(notification).toBeTruthy();
        expect(notification.textContent).toBe('Task moved to Pending');
        expect(notification.classList.contains('process')).toBe(true);
        jest.advanceTimersByTime(101);
        expect(document.getElementById('notification-popup')).not.toBeNull();
    });

    test('Should display a warning notification with provided message', () => {
        showNotification('Task deleted successfully', 'warning');
        const notification = document.getElementById('notification-popup');
        expect(notification).toBeTruthy();
        expect(notification.textContent).toBe('Task deleted successfully');
        expect(notification.classList.contains('warning')).toBe(true);
        jest.advanceTimersByTime(2000);
        expect(document.getElementById('notification-popup')).toBeNull();
    });
});

describe('Testing counts function', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    test('Testing counts', () => {
        counts();
        expect(document.getElementById('All').innerHTML).toBe('All(4)');
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(3)');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(1)');
    });
});

describe('Testing confirmFunction', () => {
    const callback_mock = jest.fn();
    afterEach(() => {
        document.body.innerHTML = ''; // Clean up the DOM after each test
    });

    test('Checking the presents of confirm box and it contents', () => {
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

    test('Checking the presents of confirm box and it contents', () => {
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
        expect(document.querySelector('#title').value).toBe('bad morning')
    });

    test('Testing edit for completed task', () => {
        window.dispatchEvent(new Event('load'))
        const edit_function = document.querySelectorAll('.task')[3].querySelector('.edit');
        edit_function.click();
        expect(document.querySelector('#title').value).toBe('')
    });
});

describe('Testing delete_function', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test.skip('Testing delete for pending task if it is in the ALL navbar', () => {
        window.dispatchEvent(new Event('load'))
        const delete_function = document.querySelectorAll('.task')[0].querySelector('.delete');
        delete_function.click();
        const yesbtn = document.querySelector('.yes-button');
        yesbtn.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Task deleted successfully.");
        expect(document.getElementById('All').innerHTML).toBe('All(3)');
    });

    test.skip('Testing delete for pending task if it is in the PROGRESS navbar', () => {
        window.dispatchEvent(new Event('load'))
        document.getElementById('All').classList.remove('active');
        document.getElementById('Progress').classList.add('active');
        const delete_function = document.querySelectorAll('.task')[0].querySelector('.delete');
        delete_function.click();
        const yesbtn = document.querySelector('.yes-button');
        yesbtn.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Task deleted successfully.");
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(2)');
    });

    test('Testing pending task checkbox if input has some values', () => {
        window.dispatchEvent(new Event('load'))
        document.querySelector('#title').value = '21312';
        const delete_function = document.querySelectorAll('.task')[0].querySelector('.delete');
        delete_function.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Can't delete the task while updating.");
        expect(document.getElementById('All').innerHTML).toBe('All(4)');
    });

    test.skip('Testing completed task checkbox if it is in the ALL navbar', () => {
        window.dispatchEvent(new Event('load'))
        const delete_function = document.querySelectorAll('.task')[3].querySelector('.delete');
        delete_function.click();
        const yesbtn = document.querySelector('.yes-button');
        yesbtn.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Task deleted successfully.");
        expect(document.getElementById('All').innerHTML).toBe('All(3)');
    });

    test.skip('Testing completed task checkbox if it is in the FINISHED navbar', () => {
        window.dispatchEvent(new Event('load'))
        document.getElementById('All').classList.remove('active');
        document.getElementById('Completed').classList.add('active');
        const delete_function = document.querySelectorAll('.task')[3].querySelector('.delete');
        delete_function.click();
        const yesbtn = document.querySelector('.yes-button');
        yesbtn.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Task deleted successfully.");
        expect(document.getElementById('All').innerHTML).toBe('All(3)');
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(0)');
    });

    test('Testing completed task checkbox if input has some values', () => {
        window.dispatchEvent(new Event('load'))
        document.querySelector('#title').value = '21312';
        const delete_function = document.querySelectorAll('.task')[3].querySelector('.delete');
        delete_function.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Can't delete the task while updating.");
        expect(document.getElementById('All').innerHTML).toBe('All(4)');
    });
});

describe('Testing checkbox_function', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test.skip('Testing pending task checkbox if it is in the ALL navbar', () => {
        window.dispatchEvent(new Event('load'))
        const checkbox_function = document.querySelectorAll('.task')[0].querySelector('#myCheckbox');
        checkbox_function.click();
        const yesbtn = document.querySelector('.yes-button');
        yesbtn.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Task completed.");
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(2)');
    });

    test.skip('Testing pending task checkbox if it is in the PENDING navbar', () => {
        window.dispatchEvent(new Event('load'))
        document.getElementById('All').classList.remove('active');
        document.getElementById('Progress').classList.add('active');
        const checkbox_function = document.querySelectorAll('.task')[0].querySelector('#myCheckbox');
        checkbox_function.click();
        const yesbtn = document.querySelector('.yes-button');
        yesbtn.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Task completed.");
        expect(document.getElementById('Progress').innerHTML).toBe('Pending(2)');
    });

    test('Testing pending task checkbox if input has some values', () => {
        window.dispatchEvent(new Event('load'))
        document.querySelector('#title').value = '123231';
        const checkbox_function = document.querySelectorAll('.task')[0].querySelector('#myCheckbox');
        checkbox_function.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Can't change the task status while updating.");
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(1)');
    });

    test.skip('Testing completed task checkbox if it is in the ALL navbar', () => {
        window.dispatchEvent(new Event('load'))
        const checkbox_function = document.querySelectorAll('.task')[3].querySelector('#myCheckbox');
        checkbox_function.click();
        const yesbtn = document.querySelector('.yes-button');
        yesbtn.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Task moved to Pending.");
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(0)');
    });

    test.skip('Testing completed task checkbox if it is in the FINISHED navbar', () => {
        window.dispatchEvent(new Event('load'))
        document.getElementById('All').classList.remove('active');
        document.getElementById('Completed').classList.add('active');
        const checkbox_function = document.querySelectorAll('.task')[3].querySelector('#myCheckbox');
        checkbox_function.click();
        const yesbtn = document.querySelector('.yes-button');
        yesbtn.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Task moved to Pending.");
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(0)');
    });

    test('Testing completed task checkbox if input has some values', () => {
        window.dispatchEvent(new Event('load'))
        document.querySelector('#title').value = '21312';
        const checkbox_function = document.querySelectorAll('.task')[3].querySelector('#myCheckbox');
        checkbox_function.click();
        expect(document.getElementById('notification-popup').textContent).toBe("Can't change the task status while updating.");
        expect(document.getElementById('Completed').innerHTML).toBe('Finished(1)');
    });
});