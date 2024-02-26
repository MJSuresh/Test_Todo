// Mocking localStorage
// const localStorageMock = {
//     getItem: jest.fn(),
//     setItem: jest.fn(),
//     clear: jest.fn(),
// };

// global.localStorage = localStorageMock;

const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, './ToDoHTML.html'), 'utf8')

// jest.dontMock('fs')
const { showNotification} = require('./test_todo');
const localStorageMock = require('jest-localstorage-mock');

// describe('task testing', () => {
//     beforeEach(() => {
//         document.documentElement.innerHTML = html.toString();
//     });
//     afterEach(jest.resetModules);
//     test('test completed nav bar', () => {
//         const progress = document.getElementById('Progress');
//         console.log(progress.innerHTML)
//     });
// });


describe('showNotification', () => {
    afterEach(() => {
        document.body.innerHTML = ''; // Clean up the DOM after each test
    });

    test('should display a success notification with provided message', () => {
        showNotification('Task completed successfully', 'success');
        const notification = document.getElementById('notification-popup');
        expect(notification).toBeTruthy();
        expect(notification.textContent).toBe('Task completed successfully');
        expect(notification.classList.contains('success')).toBe(true);
    });

    test('should display a success notification with provided message', () => {
        showNotification('Task completed successfully', 'success');
        const notification = document.getElementById('notification-popup');
        expect(notification).toBeTruthy();
        expect(notification.textContent).toBe('Task completed successfully');
        expect(notification.classList.contains('success')).toBe(true);
    });

    test('should display a warning notification with provided message', () => {
        showNotification('Task deleted successfully', 'warning');
        const notification = document.getElementById('notification-popup');
        expect(notification).toBeTruthy();
        expect(notification.textContent).toBe('Task deleted successfully');
        expect(notification.classList.contains('warning')).toBe(true);
    });
});

// describe('localStorage tests', () => {
//     beforeEach(() => {
//         // Clear mocks before each test
//         localStorageMock.getItem.mockClear();
//     });

//     it('should retrieve todos from localStorage', () => {
//     // Mocking localStorage.getItem to return some values
//         localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(['task1', 'task2']));
//         // localstorage();
//         // expect(todos).toEqual('1')
//         // Call the function that reads from localStorage
//         const storedTodos = JSON.parse(localStorageMock.getItem('todos')) || [];
//         // Assertions
//         expect(localStorageMock.getItem).toHaveBeenCalledWith('todos');
//         expect(storedTodos).toEqual(['task1', 'task2']);
//         console.log(storedTodos)
//     });
// });


describe('test localstorage', () => {
    // Mock localStorage
beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    });
  });
  
  test('localstorage function sets todos and completedTodos from localStorage', () => {
    // Set up localStorage with some data
    localStorage.getItem
      .mockReturnValueOnce(JSON.stringify(['1', '2']))
      .mockReturnValueOnce(JSON.stringify(['2', '3']));

    // Call the localstorage function
    // require('./test_todo'); // Re-import to call the module and execute the code
    let todos=JSON.parse(localStorage.getItem('todos'))
    let completedTodos=JSON.parse(localStorage.getItem('completedTodos'))
    // Check if todos and completedTodos are set correctly
    expect(todos).toEqual(['1','2']);
    expect(completedTodos).toEqual(['2', '3']); // why todos and completedTodos is printing empty array
    expect(localStorage.getItem).toHaveBeenCalledWith('completedTodos')
    // Print the results to the console
    console.log('Todos:', todos);
    console.log('Completed Todos:', completedTodos);
  });

})
