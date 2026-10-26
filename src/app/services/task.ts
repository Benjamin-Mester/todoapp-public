// Now let's move on to the TaskService in your Angular TodoApp. This is a particularly important 
// part of your application, because this is where the actual management and storage of your tasks takes place.
// TaskService handles data management.

// Your service has seven main functions:
// TaskService – central data management

// getTasks()
// Retrieve tasks

// addTask()
// Add a task

// updateTask()
// Update a task

// deleteTask()
// Delete a single task

// deleteTasks()
// Delete multiple tasks

// toggleTaskStatus()
// Toggle status

// saveTasks() / loadTasks()
// Permanently save and load data


// Here's how the collaboration works:
// TaskManagerComponent
// User Interface, Forms, Buttons

// ↑↓ Method Calls and Return Values

// TaskService
// Manages private tasks: TaskInterface[]

// ↑↓ Saving and Loading JSON

// Browser LocalStorage
// Stores the tasks under the key “tasks”

// Injectable
// Injectable comes from Angular Core.

// It is required so that Angular can register your class as a service in its dependency injection system.
// TaskInterface
// This is your own TypeScript interface. It describes the properties a task must have.
// TaskStatus
// This is your own enum with the following possible status values:
// In this service, you need it to switch between “Pending” and “Completed.”
import { Injectable } from '@angular/core';

import {
  TaskInterface,
  TaskStatus
} from '../task.model';

// Here is where you define your service.
// Component             Meaning
// @Injectable           Angular decorator for dependency injection
// providedIn: ‘root’    Registers the service in the root injector
// export                Makes the class importable by other files
// class TaskService     Defines your own service class

// With `providedIn: ‘root’`, Angular typically uses a shared instance of `TaskService` within the application.
// This means that if multiple components request the `TaskService`, they will usually receive the same instance, unless you provide the service again elsewhere.
// This is important because all components can access the same managed task data set.
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // ============================================================
  // LOCAL STORAGE KEY
  // ============================================================

// Here, you define a property for the LocalStorage key.
// Let's break it down:
// Component      Meaning
// private        Directly accessible only within the class
// readonly       Cannot be reassigned after initialization
// storageKey     Custom property name
// ‘tasks’        The actual key in LocalStorage

// Why is this useful?

// Because you use the key in two places:
// localStorage.setItem(this.storageKey, tasksAsJson);
// and:
// localStorage.getItem(this.storageKey);
// This means you don't have to write the string “tasks” multiple times directly in your code.

// If you ever want to change the key, you only need to update it in one place.

// Important: `readonly` prevents the property from being reassigned within your TypeScript code. 
// It does not mean that the contents of `LocalStorage` are read-only.
  private readonly storageKey = 'tasks';


  // ============================================================
  // INTERNAL TASK LIST
  //
  // private” means:
  // Only the TaskService itself is allowed to modify this array directly.
  // ============================================================

// This is your service's central data list.
// private
// Other classes should not access this array directly.

// So your component should not work like this:
// this.taskService.tasks.push(newTask);

// Instead, it uses the service’s public methods:
// this.taskService.addTask(newTask);

// TaskInterface[]
// This means: An array whose elements conform to the TaskInterface.
// = []
// The array is initially empty when the service is created.
// Later, any saved tasks will be loaded as needed.
  private tasks: TaskInterface[] = [];


  // ============================================================
  // CONSTRUCTOR
  //
  // As soon as Angular creates the TaskService,
  // existing tasks are loaded from LocalStorage.
  // ============================================================

// You're already familiar with the constructor from your component.
// It is executed when a new instance of TaskService is created.
// In your case, exactly one thing happens:
// this.loadTasks();
// This is a call to your own method, loadTasks().
// It is located further down in the same class.
// The order is:
// 1. Angular creates the service instance.
// 2. `tasks` is initialized as an empty array.
// 3. The constructor is executed.
// 4. `loadTasks()` reads any existing tasks from LocalStorage.
// 5. The service is then available with the loaded data.
// Important: For your root service, this normally happens once per service instance, not with every single call to `getTasks()`.
  constructor() {
    this.loadTasks();
  }


  // ============================================================
  // GET TASKS
  //
  // We return a copy of the array.
  // This prevents a component from
  // accidentally modifying the service's internal array directly.
  // ============================================================

// We’ve already discussed this method in connection with `refreshTasks()`.
// Now let’s look at the implementation within the service itself.
// What does `TaskInterface[]` mean after the colon?
// That’s the return type.
// The method returns an array of tasks.
// What does `return` do?
// `return [...this.tasks];`
// `return` returns the value to the caller.
// What does `...this.tasks` do?
// That’s the JavaScript spread operator.
// It copies the elements of the existing array into a new array.
// Example:
// const original = [101, 102, 103];
// const copy = [...original];
// After that, `original` and `copy` are two different arrays with the same elements.
// In your TodoApp:
// this.tasks = [task101, task102];
// return [...this.tasks];
// returns a new array containing these two task objects.
// Why is this useful?
// Your component can modify the returned array without directly changing the array structure in the service.
// However, it’s only a shallow copy.
// The task objects themselves are not copied.
// Therefore, a direct modification such as:
// const tasks = this.taskService.getTasks();
// tasks[0].name = ‘Changed’;
// could still modify the corresponding object in the service.
// Your architecture should therefore continue to make changes via `updateTask()`.
  getTasks(): TaskInterface[] {
    return [...this.tasks];
  }


  // ============================================================
  // ADD TASK
  // ============================================================

// This method takes a task as a parameter.
// task: TaskInterface
// This means that the value passed in must match the structure of your TaskInterface.
// The key part
// this.tasks = [
// ...this.tasks,
// task
// ];
// Suppose the array contains:
// [task101, task102]
// Then it becomes:
// [task101, task102, task103]
// The spread operator first takes all existing elements.
// Then the new task is appended.
// The result is assigned to `this.tasks`.
// Why not `.push()`?
// You could also write:
// this.tasks.push(task);`
// That would directly modify the existing array.
// Your current approach, on the other hand, creates a new array.
// This approach is often referred to as the immutable update pattern.
// This is a common approach in Angular and other frameworks because new references make changes easier to track.
// Why this.saveTasks()?
// this.saveTasks();
// After adding the task, the updated list is stored in LocalStorage.
// Otherwise, the new task would only exist in memory and could be lost when the page reloads.
  addTask(task: TaskInterface): void {

    this.tasks = [
      ...this.tasks,
      task
    ];

    this.saveTasks();
  }


  // ============================================================
  // UPDATE TASK
  // ============================================================

//  Here we encounter the JavaScript method .map().
// What does .map() do?
// map() iterates through an array and creates a new array from it.
// A callback function is called for each element.
// The callback function determines which value should be placed at the same position in the new array.
// Your code:
// this.tasks.map(task =>
//  task.id === updatedTask.id
//    ? updatedTask
//    : task
// )
// means:
// Iterate through each task. If its ID matches the ID of the updated task, use the updated object. Otherwise, use the original task.

// Example
// Suppose:
// this.tasks = [
//  { id: 101, name: ‘Learn Angular’ },
//   { id: 102, name: ‘Learn RxJS’ },
//  { id: 103, name: ‘Learn PrimeNG’ }
// ];
// You pass in:
// updatedTask = {
//  id: 102,
//  name: ‘Fully Understand RxJS’
// };
// Then the following happens:
// Task    Check                  Result
// 101     101 === 102 → false    Keep the old task
// 102     102 === 102 → true     Replace with updatedTask
// 103     103 === 102 → false	  Keep the old task

// The result is:
// [
//  { id: 101, name: ‘Learn Angular’ },
//  { id: 102, name: ‘Understanding RxJS Completely’ },
//  { id: 103, name: ‘Learn PrimeNG’ }
// ]
// The examples contain only the properties relevant to the explanation.
// The ternary operator
// task.id === updatedTask.id
//  ? updatedTask
//  : task
// This is equivalent to:
// if (task.id === updatedTask.id) {
// return updatedTask;
// } else {
// return task;
// }
// After the update, the data is saved again:
// this.saveTasks();
  updateTask(updatedTask: TaskInterface): void {

    this.tasks = this.tasks.map(task =>
      task.id === updatedTask.id
        ? updatedTask
        : task
    );

    this.saveTasks();
  }


  // ============================================================
  // DELETE ONE TASK
  // ============================================================
// Here, you use .filter().

// Unlike .map(), .filter() creates a new array that contains only the elements for which the callback returns a truthy value.
// What does your condition mean?
// task => task.id !== id

// !== means “not equal to.”

// When you call:
// this.taskService.deleteTask(102);
// the condition for each task is:
// task.id !== 102
// Task ID    Condition             Remains in the array?
// 101        101 !== 102 → true    Yes
// 102        102 !== 102 → false    No
// 103        103 !== 102 → true    Yes

// This removes task 102.

// Afterward, the service saves the remaining tasks.

// Key point: filter() determines which elements are allowed to remain in the new array.
  deleteTask(id: number): void {

    this.tasks = this.tasks.filter(
      task => task.id !== id
    );

    this.saveTasks();
  }


  // ============================================================
  // DELETE MULTIPLE TASKS
  // ============================================================

// Now we’re introducing a new JavaScript concept: Set.
// What is a Set?
// A Set is a built-in JavaScript data structure that manages unique values.

// For example:
// const ids = [101, 102, 102, 103];

// const idSet = new Set(ids);

// The set then contains the values:
// 101, 102, 103

// The duplicate value 102 is stored only once.
// Why do we use a set?
// Because we want to quickly check whether a task ID is included in the list of IDs to be deleted.

// To do this, we use:
// idSet.has(task.id)

// .has() returns true or false.

// For example:
// idSet.has(102) // true
// idSet.has(999) // false

// Why the exclamation point !?
// Your code is:
// task => !idSet.has(task.id)

// The exclamation mark negates the Boolean value.

// For example:
// idSet.has(102)  // true
// !idSet.has(102) // false

// For .filter(), this means:
// Keep only the tasks whose IDs are not included in the set of IDs to be deleted.
  deleteTasks(ids: number[]): void {

    const idSet = new Set(ids);

    this.tasks = this.tasks.filter(
      task => !idSet.has(task.id)
    );

    this.saveTasks();
  }


  // ============================================================
  // TOGGLE COMPLETED / PENDING
  // ============================================================

// This method toggles a task between “Completed” and “Pending.”
// Step A: .map() iterates through all tasks
// this.tasks.map(task => {
// Each task is checked one by one.
// Step B: Tasks that do not match remain unchanged
// if (task.id !== id) {
// return task;
// }
// If the ID does not match, the original task object is returned.
// The callback function ends immediately for this task.
// Step C: Calculate the new status
// const newStatus =
//  task.status === TaskStatus.Completed
//    ? TaskStatus.Pending
//    : TaskStatus.Completed;
// Here, the ternary operator is used again.
// Current status    New status
// Completed    Pending
// Pending    Completed
// InProgress    Completed
// The last case is important: Your code only checks whether the task is already “Completed.”
// All other status values are set to “Completed.”
// Step D: Create a new task object
// return {
//  ...task,
// status: newStatus
// };
// The spread operator first takes the task’s existing properties.
// Then, `status` is overwritten with the new value.
// For example:
// {
//  id: 102,
//  name: ‘Learn Angular’,
//  status: TaskStatus.Pending
// }
// becomes:
// {
//  id: 102,
//  name: ‘Learn Angular’,
// status: TaskStatus.Completed
// }
// The remaining properties are preserved.
// Important: Here, you’re creating a new task object instead of directly modifying `task.status`.
// Finally:
// this.saveTasks();
// This permanently saves the new status.
  toggleTaskStatus(id: number): void {

    this.tasks = this.tasks.map(task => {

      if (task.id !== id) {
        return task;
      }

      const newStatus =
        task.status === TaskStatus.Completed
          ? TaskStatus.Pending
          : TaskStatus.Completed;

      return {
        ...task,
        status: newStatus
      };
    });

    this.saveTasks();
  }


  // ============================================================
  // SAVE TO LOCAL STORAGE
  // ============================================================

// Now let’s move on to the storage mechanism of your TodoApp.
// Why “private”?
// This method is an internal helper method of the service.
// Other components shouldn’t have to decide for themselves when to save data.
// Instead, the service handles this automatically after changes are made.
// What does JSON.stringify() do?
// LocalStorage stores strings.
// However, your tasks are JavaScript objects in an array.
// That’s why they must be converted to a string before being saved.
// JSON.stringify(this.tasks)
// converts, for example:
// [
// {
// id: 101,
// name: ‘Learn Angular’
// }
// ]
// into a JSON string:
// [{“id”:101,‘name’:“Learn Angular”}]
// What does `localStorage.setItem()` do?
// `localStorage.setItem(
// this.storageKey,
// tasksAsJson
// );
// This is a built-in browser API.
// The method expects two arguments:
// `localStorage.setItem(key, value);
// In your case:
// `localStorage.setItem(‘tasks’, tasksAsJson);
// This stores the task data in localStorage under the key “tasks.”
// When you reload the page, the data is usually preserved.
// However, localStorage is tied to the specific browser or browser profile 
// and the website’s origin. It is not a central database and does not automatically synchronize tasks across different devices.
  private saveTasks(): void {

    const tasksAsJson =
      JSON.stringify(this.tasks);

    localStorage.setItem(
      this.storageKey,
      tasksAsJson
    );
  }


  // ============================================================
  // LOAD FROM LOCAL STORAGE
  // ============================================================

// getItem() is a browser method.
// It retrieves the string stored under a specific key.
// If no entry exists, it returns null.
// Step B: Check if data exists
// if (!storedTasks) {
//  return;
// }
// If no data is stored, the method terminates.
// The internal array then remains empty:
// this.tasks = [];
// Step C: Convert JSON back to JavaScript data
// const parsedTasks: TaskInterface[] =
// JSON.parse(storedTasks);
// JSON.parse() is the counterpart to JSON.stringify().
// Method    Direction
// JSON.stringify()    JavaScript data → JSON string
// JSON.parse()    JSON string → JavaScript data
// For example:
// const json = ‘[{“id”:101,‘name’:“Learn Angular”}]’;
// const tasks = JSON.parse(json);
// Afterward, `tasks` again contains a JavaScript array with objects.
// The type declaration `TaskInterface[]` is a TypeScript assumption. `JSON.parse()` 
// does not automatically check whether the stored objects actually have all the properties of your interface.
  private loadTasks(): void {

    const storedTasks =
      localStorage.getItem(this.storageKey);

    if (!storedTasks) {
      return;
    }


    const parsedTasks: TaskInterface[] =
      JSON.parse(storedTasks);


    this.tasks = parsedTasks.map(task => ({
      ...task,

      // JSON stores Date objects as strings.
      // That's why you need to convert it back to a date.
      creationDate:
        new Date(task.creationDate),

      dueDate:
        task.dueDate
          ? new Date(task.dueDate)
          : null
    }));
  }

}
// How do TaskManagerComponent and TaskService work together?
// Let's say you click “Add Task” in your TodoApp.
// Here's what happens:
// User clicks “Add”
// The HTML triggers addTask().
// ↓ 
// TaskManagerComponent
// Validates the form data and creates newTask.
// ↓ 
// TaskService.addTask()
// Adds the new task to the internal array.
// ↓ 
// saveTasks()
// Saves the updated list to LocalStorage.
// ↓ 
// refreshTasks()
// The component retrieves the new list via getTasks().
// ↓ 
// Angular Template
// The new task list is displayed.

// This is the central idea behind separating the component and the service.
// The component handles user interaction.
// The service handles the data.


// Summary: Which methods come from where?
// Code                          Origin                       Purpose
// @Injectable                   Angular                      Configure a service for dependency injection
// constructor()                 TypeScript/JavaScript        Initialize a service
// private                       TypeScript                   Restrict access to class members
// readonly                      TypeScript                   Prevent reassignment
// getTasks()                    Your own method	            Return a list of tasks
// addTask()                     Your own method              Add a task
// updateTask()                  Your own method              Update a task
// deleteTask()                  Your own method              Delete a task
// deleteTasks()                 Your own method              Delete multiple tasks
// toggleTaskStatus()            Your own method              Toggle task status
// .map()                        JavaScript Array             Transform elements
// .filter()                     JavaScript Array             Select elements based on a condition
// new Set()                     JavaScript                   Create a set of unique values
// .has()                        JavaScript Set               Check if a value is present
// ...                           JavaScript                   Apply to array elements or object properties
// JSON.stringify()              JavaScript                   Convert data to a JSON string
// JSON.parse()                  JavaScript                   Parse a JSON string
// localStorage.setItem()        Browser API                  Store data
// localStorage.getItem()        Browser API                  Load data
// new Date()                    JavaScript                   Create a Date object

// The most important rule to remember:
// Your TaskService is the central management hub for your tasks. 
// It keeps the task list in memory, provides public methods for reading and modifying it, 
// and saves every change to LocalStorage via `saveTasks()`.
// As a result, the TaskManagerComponent does not need to know how tasks are saved, updated, 
// or deleted. It simply needs to call the corresponding service methods.
// This separation of the user interface (component) and data logic (service) is one of the most 
// important architectural principles you’ll learn in Angular.