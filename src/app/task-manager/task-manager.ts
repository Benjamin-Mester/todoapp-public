// TaskManagerComponent: This component is responsible for the user interface, forms, checkboxes, and user actions.

// 1. import statements: They make classes, functions, interfaces, and modules from Angular, PrimeNG, and your own files available.
// 2. @Component({...}): This decorator describes your Angular component and specifies how Angular should use and render it.
// Imports – Providing Tools

// Angular Core, Reactive Forms, Router, PrimeNG, custom models, and TaskService

// @Component – Configuring the Component

// Selector, standalone mode, template dependencies, HTML, and CSS

// TaskManagerComponent – Your TodoApp User Interface

// Angular can create the component and render its user interface.

// An `import` statement is part of the JavaScript/TypeScript module system.

// It essentially means:
// I want to use specific exported elements from another module in this file.

// The general syntax is:
// import { Name1, Name2 } from ‘module-name’;

// Here,:
// - `import` is a JavaScript keyword.
// - { Name1, Name2 } is the list of required exports.
// - from specifies where these exports come from.
// - ‘module-name’ is the module path.
// The curly braces here indicate that you are importing named exports.
// Why are imports used?
// Imagine if you had to program all Angular functions and PrimeNG components yourself.

// Among other things, you’d have to develop your own form fields, tables, calendars, buttons, routing functions, and validations.

// Instead, you use ready-made libraries.

// Imports make their functions available in your TypeScript file.

// Summary: Where Does It Come From?
// Component                             Origin                      Purpose
// import                                JavaScript/TypeScript       Use other modules
// Component                             Angular Core                Define a component
// OnInit                                Angular Core                Lifecycle interface
// signal, computed, effect              Angular Core                Reactive state management
// FormControl, FormGroup, Validators    Angular Forms               Form logic
// ReactiveFormsModule                   Angular Forms               Form directives in the template
// NgClass, DatePipe                     Angular Common              CSS classes and date formatting
// ActivatedRoute                        Angular Router              Read URL parameters
// PrimeNG Modules                       PrimeNG                     Visible UI components
// MessageService, ConfirmationService   PrimeNG API                 Controlling messages and dialogs
// TaskInterface, etc.                   Your task.model.ts          Custom data types and enums
// TaskService                           Your own service            Task data management
// @Component                            Angular                     Metadata for the component
// selector                              Angular                     HTML element name
// standalone                            Angular                     Standalone component
// imports: [...]                        Angular                     Template dependencies
// templateUrl                           Angular                     Associated HTML file
// styleUrls                             Angular                     Associated CSS files

// The most important thing to remember for your TodoApp:
// The import statements make tools available in your TypeScript file. 
// The @Component decorator then tells Angular how your TaskManagerComponent is structured, 
// which template functions it’s allowed to use, and which HTML and CSS files belong to it.

// And especially important for your continued understanding of Angular: a TypeScript import, 
// an entry in `@Component.imports`, and providing a service via dependency injection are three different things.

import {
  Component,
  OnInit,
  signal,
  computed,
  effect
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  NgClass,
  DatePipe
} from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import {
  MessageService,
  ConfirmationService
} from 'primeng/api';

import {
  TaskInterface,
  TaskPriority,
  TaskStatus,
  UserInterface,
  ColleaguesInterface
} from '../task.model';

import {
  TaskService
} from '../services/task';


@Component({
  selector: 'app-task-manager',

  standalone: true,

  imports: [
    ReactiveFormsModule,
    NgClass,
    DatePipe,
    TableModule,
    SelectModule,
    DatePickerModule,
    TextareaModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    ToastModule,
    CardModule,
    ConfirmDialogModule
  ],

  templateUrl: './task-manager.html',

  styleUrls: ['./task-manager.css']
})
export class TaskManagerComponent implements OnInit {


  // ============================================================
  // THEME SIGNAL
  //
  // When the program starts, we first read the stored value
  // from local storage.
  //
  // If “dark” is stored there:
  // -> Dark Mode
  //
  // Else:
  // -> Light Mode
  // ============================================================

  theme = signal<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark'
      ? 'dark'
      : 'light'
        // ? : – the so-called ternary operator, a shorthand form of an if/else statement.
  );


  // ============================================================
  // COMPUTED THEME VALUES
  //
  // These values are automatically recalculated,
  // as soon as theme() changes.
  // ============================================================

  themeIcon = computed(() =>
    this.theme() === 'dark'
      ? 'pi pi-sun'
      : 'pi pi-moon'
        // ? : – the so-called ternary operator, a shorthand form of an if/else statement.
  );


  themeLabel = computed(() =>
    this.theme() === 'dark'
      ? 'Light Mode'
      : 'Dark Mode'
        // ? : – the so-called ternary operator, a shorthand form of an if/else statement.
  );


  // ============================================================
  // TASK LIST
  //
  // The component maintains the list for display.
  //
  // The actual management and storage, however,
  // is handled by the TaskService.
  // ============================================================

  tasks: TaskInterface[] = [];
  // “tasks” is the name of the property.
  // “TaskInterface[]” refers to an array of Task objects.
  // “=” [] means that the list is initially empty.

  // ============================================================
  // BULK SELECTION
  //
  // There is a separate
  // FormControl<boolean> for each task ID.
  // ============================================================

  taskSelectionControls =
    new Map<number, FormControl<boolean>>();


  // ============================================================
  // USERS
  // ============================================================

  users: UserInterface[] = [
    {
      id: 1,
      name: 'Benjamin',
      email: 'bm@fantasycompany.com'
    }
  ];

  // ============================================================
  // Colleagues
  // ============================================================
              
  colleagues: ColleaguesInterface[] = [
    {
      id: 1,
      name: 'Joe',
      email: 'jr@fantasycompany.com'
    },
    {
      id: 2,
      name: 'Benjamin',
      email: 'bm@fantasycompany.com'
    },
    {
      id: 3,
      name: 'Mandy',
      email: 'mc@fantasycompany.com'
    },
    {
      id: 4,
      name: 'Jake',
      email: 'jt@fantasycompany.com'
    },
    {
      id: 5,
      name: 'Simon',
      email: 'sd@fantasycompany.com'
    },
    {
      id: 6,
      name: 'Sally',
      email: 'sm@fantasycompany.com'
    },
    {
      id: 7,
      name: 'Jim',
      email: 'jh@fantasycompany.com'
    },
    {
      id: 8,
      name: 'Laura',
      email: 'ls@fantasycompany.com'
    }
  ];

  // ============================================================
  // PRIORITY OPTIONS
  // ============================================================

  priorityOptions = [
    {
      label: 'Low',
      value: TaskPriority.Low
    },
    {
      label: 'Medium',
      value: TaskPriority.Medium
    },
    {
      label: 'High',
      value: TaskPriority.High
    }
  ];


  // ============================================================
  // STATUS OPTIONS
  // ============================================================

  statusOptions = [
    {
      label: 'Pending',
      value: TaskStatus.Pending
    },
    {
      label: 'In Progress',
      value: TaskStatus.InProgress
    },
    {
      label: 'Completed',
      value: TaskStatus.Completed
    }
  ];


  // ============================================================
  // EMAIL VALIDATION REGEX
  // ============================================================
  // This is a regular expression, also known as a regex.
  // In simple terms, this pattern matches:
  // Text  @  Text  .  Text
  readonly emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  // ============================================================
  // CREATE FORM
  // ============================================================

  // Reactive Forms.
  // This code defines the form you can use to create a new task. 
  // It specifies which input fields exist, their data types, the default values used, and which inputs are valid.

  // `taskForm` is a property of your `TaskManagerComponent`. We use it to store the form object.
  // `new` is a JavaScript/TypeScript keyword. We use it to create a new instance of a class.
  // `FormGroup` is a class from `@angular/forms` that groups multiple form controls together.
  // The curly braces `{ ... }` contain an object in which each field name is assigned a `FormControl`.
  taskForm = new FormGroup({
    // Important: FormGroup refers to the entire form. FormControl refers to a single field with its own value and validation status.
    // The first parameter is the initial value.
    // ‘’
    // This is an empty string.
    // Angular recognizes the control type as FormControl<string>.
    // nonNullable: true
    // This option means that the value of this control must not be null.
    // With a standard:
    // new FormControl(‘’)

    // Angular can generally reset the value to null.
    // With:
    // new FormControl(‘’, {
    // nonNullable: true
    // })

    // the control remains set to a string type. A `reset()` call without an explicit new value normally restores the original initial value `‘’`.
    // This is useful because we’ll later use methods like this:
    // formValue.title.trim()

    //`trim()` is a string method. We couldn’t call it on a null value.
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
        //        `validators` is the property for validation rules.
        // The array [...] contains the validator functions.
        // `Validators.required` is a validator provided by Angular.
        // It checks whether a value is present.
        // Input    Validators.required
        // ‘Learn Angular’    valid
        // ‘’    invalid
        // ‘   ’    valid
        // The last case is important: Validators.required does not automatically recognize spaces alone as an empty string.
        // That is why we additionally used trim() in our addTask() and saveEdit() logic.
      ]
    }),

    description: new FormControl('', {
      nonNullable: true
    }),

    // Required field with validation
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]
    }),

    // Here, the initial value is not a string literal such as ‘’, but a value from our TaskPriority enum.
    // It's important to note that the control stores the enum value, not the entire options object, because we use `p-select optionValue="value"`.
    priority: new FormControl(
      TaskPriority.Medium,
      {
        nonNullable: true
      }
    ),
    
    // Here we'll learn about a different notation.
    // What does <UserInterface | null> mean?
    // This is an explicit type specification using a generic type parameter.
    // We're telling Angular:
    // This FormControl may contain either an object of type UserInterface or the value null.
    assignedTo:
      new FormControl<UserInterface | null>(
        null
      ),

    taskFrom:
      new FormControl<ColleaguesInterface | null>(
        null
      ),

    dueDate:
      new FormControl<Date | null>(
        null
      )

  });


  // ============================================================
  // EDIT FORM
  // You'll notice that its structure is almost identical to that of the taskForm discussed earlier. 
  // This is no coincidence: Both forms use the same task data but serve different purposes.
  // - taskForm is used to create a new task.
  // - editForm is used to edit an existing task.
  // One important difference is that your editForm also includes the status field.
  // ============================================================

  // Component        Meaning
  // ============================================================
  // editForm         Property of your TaskManagerComponent
  // =                Assignment operator
  // new              Creates a new instance
  // FormGroup        Angular class for managing multiple form fields
  // { ... }          Object containing the individual FormControls

  // The FormGroup handles the overall management.
  // For example, it knows whether the entire form is valid:
  // this.editForm.valid
  // this.editForm.invalid

  // And it can retrieve all the values it contains at once:
  // this.editForm.getRawValue()
  // Important: The FormGroup is not the visible HTML form itself. It is the TypeScript object that manages the form’s values and states.
  editForm = new FormGroup({
    // The field contains a string and begins with ‘’.
    // nonNullable: true ensures that the control value cannot be null by default.
    // Validators.required requires a value to be present.
    // When you edit an existing task, this initial value is overwritten by startEdit():
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    description: new FormControl('', {
      nonNullable: true
    }),

    // Two validation rules apply here:
    // 1. Validators.required: The input cannot be empty.
    // 2. Validators.pattern(this.emailPattern): The input must match the defined email pattern.
    // The actual validation pattern is defined in `this.emailPattern`, which you defined elsewhere in your component.
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]
    }),

    priority: new FormControl(
      TaskPriority.Medium,
      {
        nonNullable: true
      }
    ),
    // This control contains either:
    // - a complete object of type UserInterface
    // - or null, if no user is assigned.

    // The first null specifies the data type that the FormControl can accept. Type Definition: The value may also be zero.
    // The second null determines the value that the FormControl actually receives when it is created. Initial value
    // The value is zero at the start.
    // Let's look at the parentheses ( ).
    // Inside them, you pass an actual value to the FormControl constructor.
    // The second `null` means:
    // When Angular creates this FormControl, no user is selected initially.

    // The angle brackets < > answer the question: “What CAN be written inside them?”
    // The parentheses ( ) answer the question: “What is written at the beginning?”

    assignedTo:
      new FormControl<UserInterface | null>(
        null
      ),
    
    taskFrom:
      new FormControl<ColleaguesInterface | null>(
        null
      ),
// Here, the value can be either a Date object or null.
// This allows the user to select a due date or leave the field blank.
    dueDate:
      new FormControl<Date | null>(
        null
      ),

    status: new FormControl(
      TaskStatus.Pending,
      {
        nonNullable: true
      }
    )

  });

// Your FormGroup will initially be created with default values. As soon as you click “Edit,” 
// the values for the selected task will be loaded into it.
//  ▼
//editForm – Initial state
//title = '' · priority = Medium · status = Pending
//  ▼
//startEdit(102)
//Find Task 102 and call setValue()
//  ▼
//editForm – Values from Task 102
//title = 'RxJS lernen' · priority = High · status = InProgress
//  ▼
//The user edits the fields
//Not yet saved in TaskService
//  ▼
//saveEdit(102)
//Validate → getRawValue() → updateTask()

// The form thus serves as a kind of temporary workspace.
//You can change values without immediately updating the saved task.
//The edited values are not applied until you call saveEdit().

// Note: The editForm is not the task itself, but an editable working copy 
// of its form values. Only the saveEdit() method transfers the changes to your TaskService.

  // ============================================================
  // ROUTE STATE
  // ============================================================

  // Within your TaskManagerComponent, you define a property called selectedTaskId.
  // This property stores the ID of the task that was selected via the URL.

  // For example:
  // http://localhost:4200/102

  // Here, 102 represents a task ID.
  // The variable could then contain:
  // selectedTaskId = 102;
  // If no task was selected via the URL, it should contain null instead.
  // Create a property named `selectedTaskId` in my component. It can contain either a number
  // or null. Set its initial value to null, because no task is selected via the route at first.
  selectedTaskId: number | null = null;

  // We'll break down the line
  // selectedTaskId:    number | null        =   null
  // Property name      Allowed data types       Actual initial value

  // selectedTaskId:
  // This is a property of your component.
  // You can access it within the component using `this`:
  // `this.selectedTaskId`

  // How does the task ID from the URL get into the variable?
  // That’s the most important connection.
  // In your Angular TodoApp, we defined a route in `app.routes.ts` using this pattern:
  // export const routes: Routes = [
  //  {
  //    path: ‘’,
  //    component: TaskManagerComponent
  //  },
  //  {
  //    path: ‘:id’,
  //    component: TaskManagerComponent
  //  }
  // ];

  

  // ============================================================
  // EDIT STATE
  // ============================================================

  editingTaskId: number | null = null;
// 

  // ============================================================
  // ENUMS FOR TEMPLATE
  // ============================================================

  TaskPriority = TaskPriority;
  // Left: Property of your component         Right: imported enum
  // So what you're saying is essentially:
  // Create a property named TaskPriority in my component and assign it the imported enum TaskPriority.
  // task-manager.html – Template

  // Kann jetzt die Enum-Werte über die Eigenschaften der Komponente verwenden.
  // @if (task.status === TaskStatus.Completed) {
  //  <span>Completed</span>
  // }
  TaskStatus = TaskStatus;


  // ============================================================
  // DEPENDENCY INJECTION
  //
  // We also register our effect() here.
  //
  // effect() reads theme().
  //
  // As a result, Angular automatically detects:
  //
  // “This effect depends on the theme signal.”
  //
  // Every time theme() changes,
  // the effect is played again.
  // ============================================================

  // Three important Angular concepts come together here:
  // 1. Constructor – What happens when Angular creates your component?
  // 2. Dependency Injection – How does your component gain access to other services?
  // 3. Signals and effect() – How does Angular automatically respond to changes in your theme?

  // When Angular creates my TaskManagerComponent, provide it with the four required services. 
  // Also, set up a reactive effect that stores the current theme value in the browser and automatically updates it when changes occur.

  // A constructor is a special method of a JavaScript/TypeScript class.
  // It is automatically executed when a new instance is created.
  
  // In Angular, Angular itself typically creates the instance of your component. This also triggers the execution of its constructor.
  // Angular creates TaskManagerComponent
  // Component instantiation
  //  ▼
  // Constructor is executed
  // Dependencies are provided
  //  ▼
  // effect() is registered
  // Theme changes can be observed
  //  ▼
  // Component is running
  // The effect runs for the duration of the component's lifetime

  // Important: The constructor itself runs only once each time a component instance is created. 
  // The effect() method registered within it, however, can be executed multiple times.

  // Angular uses dependency injection (DI) here.
  // This means your component doesn't create these services itself; instead, it lets Angular provide them.
  //  Why don't we just write `new MessageService()`?
  // Because Angular handles the management of these dependencies.
  // For example, it can reuse services, control their lifecycle, and swap them out for testing.
  // This makes your components less tightly coupled to the actual creation of the services.
  constructor(
    private messageService: MessageService,        // This is a service from PrimeNG that you're already using for your Toast notifications.
    // Component        Meaning
    // ============================================================
    // private          The property is accessible within the class
    // messageService   Name of the property
    // :                Separates the name and type
    // MessageService   Type of the required dependency
    private confirmationService: ConfirmationService,
    // This is also a PrimeNG service. It controls your confirmation dialogs.
    private route: ActivatedRoute,
    // This service comes from the Angular Router. It allows you to retrieve information about the currently active route.
    private taskService: TaskService
    // This is the task management service you developed yourself.
    // for example:
    // this.taskService.getTasks();
    // this.taskService.addTask(newTask);
    // this.taskService.updateTask(updatedTask);
    // this.taskService.deleteTask(id);
    // It handles data management, including storing your data in LocalStorage.
    // Once they have been deployed, all four services are available within your component via `this`.
  ) {
    // effect() is an Angular function from @angular/core.
    // It registers a function that reads signal values and is re-executed when these signal dependencies change.
    // The function inside `effect()` is an arrow function:
    // This is comparable to:
    // “Angular, execute this function and monitor which signals it reads. If any of these signals change, execute the function again.”
    effect(() => {

      localStorage.setItem(
        'theme',
        // Expression                Meaning
        // ============================================================
        // this.theme                The signal itself
        // this.theme()              The current value of the signal
        // this.theme.set(‘dark’)    Set the signal to “dark”
        // this.theme.update(...)    Update the signal based on the previous value
        this.theme()
        // And because this call occurs within an `effect()` function, Angular registers `theme` as a reactive dependency of that effect.
      );
       // localStorage is a browser API, not an Angular function.
       // It allows you to permanently store key-value pairs in the browser, even after the page is reloaded.
       // The method:
       // setItem(key, value)
       // takes two arguments.
       // In your case:
       // localStorage.setItem(‘theme’, ‘dark’);

       // Means:
       // Store the string “dark” under the key “theme.”

       // In the browser, this looks something like this:
       // Key      Value
       // theme    dark
       // The next time you call it with “light,” the existing value for this key will be overwritten.
       // Important: localStorage.setItem() stores the theme value. It does not switch the design itself. 
       // The actual display must be handled by the rest of your theme logic.
       // So you don't have to call `localStorage.setItem()` yourself every time in your `toggleTheme()` method.
       // The effect handles this synchronization automatically.

       // Why do we register effect() in the constructor?
       // There is an Angular-specific reason for this.
       // By default, effect() requires an injection context.
       // An injection context is an environment in which Angular provides its dependency injection infrastructure.
       // The constructor of a component created by Angular is such a context.
    });

  }


  // ============================================================
  // TOGGLE THEME
  // Each time the page is loaded, it should switch between the light and dark themes.
  // Check the current theme. If it's “light,” change it to “dark.” Otherwise, change it to “light.”
  // ============================================================

  // Component        Meaning
  // ============================================================
  // toggleTheme      Name of your method
  // ()               The method does not require any parameters
  // : void           The method does not return a value
  // this.theme       Access to your theme signal
  // .update()        Angular signal method for updating the value
  // current          The current value of the signal
  // =>               Arrow function
  // ===              Strict comparison
  // ? :              Ternary operator (shorthand for if/else)
  toggleTheme(): void {
    
    // An arrow function is a concise way to write a function.
    // Here, you pass it to `update()`.
    // Angular calls this function with the current value of the signal.
    // Important: `current` is not a special Angular variable. You chose this parameter name yourself.
// The name `current` is easy to understand simply because it refers to the current value.
// And how does Angular know what `current` is?
// Because `update()` calls the function and passes the previous signal value as an argument.
// To put it simply, you can think of the internal logic like this:
// const current = this.theme();

// const newValue =
//  current === ‘light’ ? ‘dark’ : ‘light’;

// this.theme.set(newValue);

// This isn’t the actual internal Angular source code, but it illustrates the principle.
    this.theme.update(current =>
      current === 'light'
        ? 'dark'
        : 'light'
         // ? : – the so-called ternary operator, a shorthand form of an if/else statement.
    );
         // In your short notation:
         // current => current === ‘light’ ? ‘dark’ : ‘light’
         // the expression to the right of the arrow is automatically returned. This is called an implicit return value.
  }


  // ============================================================
  // INITIALIZATION
  // A particularly important method in your Angular TodoApp: ngOnInit().
  // This method brings together several concepts that we’ve already discussed individually:
  // - Angular lifecycle hooks
  // - Your own TaskService
  // - The refreshTasks() method
  // - The Angular Router with ActivatedRoute
  // - RxJS and subscribe()
  // - Arrow functions
  // - The ternary operator ? :
  // - Your selectedTaskId variable
  // The interesting thing is: this is where the individual components of your application are connected.
  
  // When my TaskManager component is initialized, first load the existing tasks from the TaskService. 
  // Then monitor the URL and store the task ID it contains in `selectedTaskId`.
  // This serves two different purposes.

  // Angular initializes TaskManagerComponent

  // 1. Load tasks
  // this.refreshTasks()
  // The component retrieves the existing tasks from the service.

  // 2. Monitor the route
  // this.route.paramMap.subscribe(...)
  // The component responds to the task ID in the URL.
  // ============================================================


  // ngOnInit() is a special method that Angular refers to as a lifecycle hook.
  // Lifecycle means life cycle.
  // An Angular component has a life cycle: it is created, initialized, updated multiple times if necessary, and eventually destroyed.
  // Angular provides various methods that allow us to respond to specific phases.
  // For example:
  // Lifecycle Hook     Task
  // constructor()      Creates the class instance and retrieves dependencies
  // ngOnInit()         Called once during initialization
  // ngOnChanges()      Responds to changes in specific component inputs
  // ngOnDestroy()      Called before the component is destroyed

  // When is ngOnInit() executed?
  // In simple terms, the sequence looks like this:
  // 1. Angular creates the component
  //  ▼
  // 2. constructor()
  // Provide services, register theme effects
  //  ▼
  // 3. ngOnInit()
  // Load tasks and watch routes
  //  ▼
  // 4. The component continues to be rendered and updated

  // More specifically, ngOnInit() is executed after the component's inputs have been initialized and during Angular's first change-detection cycle.
  // OnInit: On Initialization

  // How does Angular know to call this method?
  // Because ngOnInit is a reserved lifecycle method name.
  ngOnInit(): void {

    // Retrieve tasks from the TaskService.
    // Here, you call a method from your own `TaskManagerComponent`.
    // This is important:
    // `refreshTasks()` is not a built-in Angular method. It is a method you created yourself for your `TodoApp`.
    // In your application, we used it to refresh the task list from the `TaskService`.
    // Why do we need this at startup?
// Let's say you created three tasks yesterday.
// Your TaskService saved them to LocalStorage.
// Today, you open the TodoApp again.
// The component then needs to retrieve the saved tasks so they appear in your table.
// That’s why calling `refreshTasks()` during initialization makes sense.
// Important: `ngOnInit()` itself does not read directly from LocalStorage here. Your service logic handles that. 
// `refreshTasks()` transfers the data from the service to the component.
    this.refreshTasks();

    // Read the route.
    // Let's start with:
    // this.route

    // This is your ActivatedRoute object.
    // You received it in the constructor via dependency injection:
    // constructor(
    // private route: ActivatedRoute
    // ) {}

    // ActivatedRoute is an Angular router service.
    // It provides information about the currently active route.
    // paramMap is an Observable.
    // This concept comes from RxJS, which we've already discussed.
    // An Observable can return values over time.
    // In this case, it returns ParamMap objects containing the current route parameters.
    // This is especially useful when the URL changes while the same component instance continues to be used.

    // Here, we use the RxJS method `subscribe()`.
    // This allows us to register a function that is executed as soon as the observable provides a new value.
    // What does `params =>` mean?
    // This is another arrow function.
    // `params` is the parameter of this function.
    // Angular or RxJS passes the current ParamMap with each emission.
    // The name `params` can be chosen freely.
    // If Angular reuses the same component instance for navigation, ngOnInit() will not be executed again.
    // However, your existing paramMap subscription can receive the new parameter.
    // This allows selectedTaskId to be updated.
    this.route.paramMap.subscribe(params => {

      const idParam =
        params.get('id');
        // Now we'll read the value named “id” from the ParamMap.
        // is a method of the Angular class ParamMap.
        // It returns either:
        // - a string, if the parameter is present
        // - or null, if it is missing

        // Example A : URL with Task ID
        // http://localhost:4200/102
        // Then:
        // params.get(‘id’)
        // returns the value:
        // “102”
        // Note: This is a string, not a number!

        // Example B: URL without a task ID
        //http://localhost:4200/
        //Then:
        //params.get(‘id’)
        //returns the value:
        //null
        //Therefore, your variable `idParam` has the derived type:
        //string | null


// This is similar to our previous explanation of union types.
      this.selectedTaskId =
        idParam
          ? Number(idParam)
          : null;
            // ? : – the so-called ternary operator, a shorthand form of an if/else statement.
    });
           // The general form is:
           // Condition ? ValueIfTrue : ValueIfFalse
           // In your case:
           // Component            Meaning
           // ============================================================
           // idParam              Is there a truthy value?
           // ? Number(idParam)    If so, convert it to a number
           // : null               Otherwise, use null
  }

  // ngOnInit() is executed once per component instance.
  // But the function inside:
  // subscribe(params => {
  // ...
  // })
  // can be executed multiple times.
  // Why?
  // Because the Observable can provide new parameter values over time.

  // Event                                                 ngOnInit()          subscribe callback
  // =================================================================================================================
  // Component is reinitialized                            Executed            Called for the current route
  // URL parameter changes when the component is reused    Not called again    Called again
  // Component is destroyed                                Not called again    Subscription should be terminated



  // ============================================================
  // REFRESH TASKS
  // It ensures that your component can continuously retrieve the current task list from your TaskService.
  // In the process, we'll also learn why you should always call `this.refreshTasks()` after creating, editing, or deleting a task.
  // Retrieve the current list of all tasks from my TaskService and store it in the `tasks` property of my TaskManagerComponent.

  // Component    Meaning
  // private    The method is only accessible within this TypeScript class
  // refreshTasks    Custom method name
  // ()    The method does not expect any parameters
  // : void    The method does not return a value
  // this.tasks    Your component's task list
  // =	Assignment operator
  // this.taskService    Your TaskService provided via dependency injection
  // .getTasks()    A custom method that returns the tasks
  // ============================================================

  private refreshTasks(): void {

    this.tasks =
      this.taskService.getTasks();
      // There are three steps here.
      // 1. TaskService
      // this.taskService.getTasks() is called.
      // The service returns the current task list.
      //  ▼
      // 2. Assignment
      // The return value is assigned to this.tasks.
      //  ▼
      // 3. TaskManagerComponent
      // this.tasks now contains the task list returned by the service.
      //  ▼
      // The Angular template can display this list.
  }


  // ============================================================
  // SELECTION CONTROL
  // Managing the checkboxes for selecting individual tasks.
  // This method is particularly interesting because it brings together several concepts at once:
  // - TypeScript methods and return types
  // - Angular Reactive Forms with FormControl
  // - JavaScript's Map with .get() and .set()
  // - The condition if (!control)
  // - The difference between a task and its selection state

  // Return the checkbox control for a specific task. If a checkbox control does not yet exist for this task, create a new one, 
  // save it, and then return it.
  // What’s special about this: A separate FormControl<boolean> is managed for each task. If the method is called again later 
  // for the same task ID, it uses the existing control.
  // Why do we need this method?
  // Let’s think back to your TodoApp.
  // For example, you have three tasks:
  // Task ID    Task                 Selected?
  // ============================================================
  // 101        Learn Angular        No
  // 102        Understand RxJS      Yes
  // 103        Test PrimeNG         No
  // Each task has a checkbox that you can use to select it for actions such as bulk deletion.
  // To do this, Angular needs to know which checkbox belongs to which task and whether it is checked.
  // Your getSelectionControl(id) method handles exactly this mapping.

  // TaskManager – Checkbox Mapping
  // ============================================================
  // Task List     FormControls
  // Task 101      false
  // Task 102      true
  // Task 103      false

  // Each task ID corresponds to its own checkbox control.
  // ============================================================

  getSelectionControl(
    id: number
  ): FormControl<boolean> {
     // Component              Meaning
     // ============================================================
     // getSelectionControl    Name of the method you developed yourself
     // id: number             Expects a numeric task ID
     // : after )              Introduces the return type
     // FormControl<boolean>   Returns an Angular FormControl whose value is a boolean
     // {                      Start of the method block 
    
     // What does FormControl<boolean> mean?
     // A FormControl is part of Angular Reactive Forms.
     // It manages the state of a form field.
     // Important: The method does not return “true” or “false” directly, but rather the entire FormControl object.

     // First, a local variable is declared:
    let control =
      this.taskSelectionControls.get(id);
     // Second, the map searches for the control corresponding to the passed task ID:
     // The .get() method is a built-in JavaScript map method. It does not originate from Angular.
    if (!control) {
      // There are two possibilities.
      // Case A: The control already exists.
      // You will then receive the stored FormControl<boolean> object.
      // Case B: The control does not yet exist.
      // Then .get() returns:
      // undefined

      // Therefore, the derived type of the local variable is initially:
      // FormControl<boolean> | undefined

      // – Is there no control yet?
      // if (!control) {
      // This checks whether the variable `control` contains a falsy value.
      // Since your map returns either a `FormControl` object or `undefined`, the condition in this specific case means:
      // If no control has been found for this task ID yet, execute the following block.

      // Important: This does not check whether the checkbox is checked.
      // An existing FormControl(false) is still an object and therefore truthy.
      // The condition therefore distinguishes between whether the control exists and whether it does not exist, not between 
      // whether it is checked or unchecked.

      // new creates a new instance of the FormControl class.
      // This creates a standalone object that can manage the state of a checkbox.
      control =
        new FormControl(false, {   // That is the default value. The checkbox should not be selected when it is first created.
          nonNullable: true
          // This option ensures that the FormControl is not reset to null and that its type does not have to contain a null value.
          // Without this option, Angular would normally derive a nullable control:
          // FormControl<boolean | null>
        });
        
          // The FormControl you just created is now saved in your map.
          // .set() is also a built-in JavaScript map method.
          // It takes the following parameters:
          // map.set(key, value)
          // In your code:
          // this.taskSelectionControls.set(102, control);
      this.taskSelectionControls.set(
        id,
        control
      );

    }

     // This causes your method to return the found or newly created FormControl object to the caller.
    return control;

  }


  // ============================================================
  // ADD TASK
  // This method brings together many of the concepts we've already discussed: Angular Reactive Forms, 
  // validation, TypeScript interfaces, JavaScript objects, your TaskService, checkbox controls, and PrimeNG messages.
  // Your method performs seven tasks:
  // 1 Check Form
  // Are the entries valid?

  // 2 Read Form Values
  // getRawValue()

  // 3 Clean up the title
  // trim() and checking for empty strings

  // 4 Create a Task Object
  // TaskInterface, ID, Date, optional fields

  // 5 Save Task
  // taskService.addTask()

  // 6 Refresh the page
  // refreshTasks() and Checkbox-Control

  // 7 Report Success and Reset
  // MessageService and resetTaskForm()
  // ============================================================

  // Component    Meaning
  // ============================================================
  // addTask      Method name of your choice
  // ()           The method expects no arguments
  // : void       It returns no value
  // {            Start of the method block
   addTask(): void {
    // This is a property of Angular Reactive Forms.
    // It is true if the form status is INVALID.
    // For example:
    // Input                                         Result
    // ============================================================
    // Title missing                                 Invalid
    // Email missing                                 Invalid
    // Email does not match the specified pattern    Invalid
    // All validation rules met                      Valid
    // Important: The actual email validation depends on your `this.emailPattern`.
    if (this.taskForm.invalid) {
      // This Angular method marks all form controls as “touched.”
      // This is especially useful if your HTML displays error messages only for fields that have been touched.
      // Without markAllAsTouched(), required fields that haven't been clicked yet might not initially display their error messages.
      // Important: markAllAsTouched() does not validate the form. It changes the interaction state of the fields, not their values.
      this.taskForm.markAllAsTouched();


      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid entry',
        detail:
          'Please check the mandatory fields and the email address.'
      });

      // This immediately terminates the entire addTask() method.
      // The task is not created.
      return;

    }

      // A local constant named `formValue` is created here.
      // `getRawValue()` is a method of Angular Reactive Forms.
      // It returns an object containing the current values of your form fields.
    const formValue =
      this.taskForm.getRawValue();

      // .trim() is a built-in JavaScript string method.
      // It removes leading and trailing spaces and other corresponding whitespace characters.
    const taskTitle =
      formValue.title.trim();

      // Here, you check the title that has already been cleaned up.
      // In JavaScript, an empty string ‘’ is considered falsy.
      // Therefore:
      // !taskTitle
      // is equal to true if taskTitle is empty.
    if (!taskTitle) {

      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid entry',
        detail:
          'The Task title must not be empty.'
      });


      return;

    }

    // Here, you create a new JavaScript object.
    // newTask is the name of your local constant.
    // : TaskInterface means that TypeScript checks whether the object matches the structure of your TaskInterface.
    // The interface comes from your task.model.ts file.
    const newTask: TaskInterface = {
      // Date.now() is a built-in JavaScript method.
      // It returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
      // The result is a number.
      // For example:
      // 1760000000000

      // In your TodoApp, you use this timestamp as the task ID.
      // This is a simple solution for a small learning project.
      // Important: Date.now() does not guarantee unique IDs. If two tasks are created within the same millisecond, identical 
      // IDs may occur. For your future application, crypto.randomUUID() with appropriately adjusted ID typing would be an alternative, for example.
      id:
        Date.now(),
      // Here, you transfer the cleaned-up form title to the new task object.
      name:
        taskTitle,
      // Here, copy the description from the form and remove any spaces at the beginning and end.
      description: 
        formValue.description.trim(),
      // The email address is also cleaned up.
      // This is useful because it removes any spaces accidentally entered at the beginning or end of the email address.
      // However, there’s one small quirk in your code: Angular form validation occurs before this `trim()` call.
      // If your email validation rules do not accept leading or trailing spaces, such an input will be rejected during the 
      // first validation check, before the cleaning step takes place.
      email:
        formValue.email.trim(),

      // Here, you create a new JavaScript Date object with the current date and time.
      // The difference from Date.now():
      // Expression    Return Value
      // Date.now()    Number with a timestamp in milliseconds
      // new Date()    JavaScript Date object
      // In your code:
      // - Date.now() generates the task ID.
      // - new Date() stores the creation time.  
      creationDate:
        new Date(),
      // Here, you enter the due date selected in the form.
      // If none was selected, the value can be zero.
      // This is different from `creationDate`: The creation date is set automatically, while the due date comes from the user's input.
      dueDate:
        formValue.dueDate,
      // Here, you set the initial status of each new task to “Pending.”
      // This means:
      // Every newly created task starts out as “not yet completed.”
      // The user does not select this status themselves in your Create form.
      status:
        TaskStatus.Pending,
      // The priority selected by the user is applied here.
      priority:
        formValue.priority,
      // Here, you're combining two concepts:
      // 1. The logical AND operator &&
      // 2. The spread operator ...
      // The goal is to add the assignedTo property to the task only if a value actually exists.
      // Case A: A user has been selected
      // Assume:
      // formValue.assignedTo = {
      //  id: 1,
      //  name: ‘Alex’,
      //  email: ‘alex@example.com’
      // };
      // Then formValue.assignedTo is truthy.
      // The expression:
      // formValue.assignedTo && {
      //  assignedTo: formValue.assignedTo
      // }

      // returns the object:
      // {
      //  assignedTo: {
      //    id: 1,
      //    name: ‘Alex’,
      //   email: ‘alex@example.com’
      // }
      // }
      // The spread operator:
      // ...{
      //  assignedTo: formValue.assignedTo
      // }
      // inserts its property into the surrounding `newTask` object.
      // Case B: No user was selected
      // Assume:
      // formValue.assignedTo = null;
      // Then:
      // formValue.assignedTo && {
      // assignedTo: formValue.assignedTo
      // }
      // returns the value null.
      // With object spread, no properties are inherited from null.
      // As a result, `newTask` does not receive an `assignedTo` property at all.
      // This is different from:
      // assignedTo: null
      // Because in that case, the property would exist and have the value null.
      // The same logic written out in more detail
      // Your shorthand:
      // const newTask = {
      //  name: taskTitle,
      //  ...(formValue.assignedTo && {
      //    assignedTo: formValue.assignedTo
      // })
      // };

      // corresponds, in essence, to the following for your intended form values:
      // const newTask = {
      //   name: taskTitle
      // };

      // if (formValue.assignedTo) {
      //  newTask.assignedTo = formValue.assignedTo;
      // }

      // The second syntax would require appropriate typing for `newTask` in TypeScript. 
      // The first syntax is therefore particularly convenient in your existing object literal.
      ...(formValue.assignedTo && {
        assignedTo:
          formValue.assignedTo
      }),
      
      ...(formValue.taskFrom && {
        taskFrom:
          formValue.taskFrom
      }),

    };

  // Your Task object is now complete.
  // You pass it to the addTask() method of your own TaskService.
  // It’s important to distinguish between two methods that happen to have the same name:
  // this.addTask()

  // would be your component’s method.
  // In contrast:
  // this.taskService.addTask(newTask)

  // is your TaskService’s method.
  // Their functions differ.
  // Method                            Responsibility
  // ============================================================
  // TaskManagerComponent.addTask()    Validate input, assemble the task, coordinate the user interface
  // TaskService.addTask(newTask)      Add the task to the managed database and save it
  // In your TodoApp so far, the service also handles storage in LocalStorage.
    this.taskService.addTask(
      newTask
    );

    // We just discussed this method in detail.
    // It essentially calls:
    // this.tasks = this.taskService.getTasks();
    // .
    // This allows your component to retrieve the current task list from the service.
    // This is necessary so that the newly created task also appears in the table.
    // The order is intentional:
    // this.taskService.addTask(newTask);
    // this.refreshTasks();
    // First, the task is saved in the service, then the component list is refreshed.
    this.refreshTasks();

    // Now a selection control is created for the new task.
    // You're already familiar with this from your getSelectionControl(id) method.
    // Here, you use the built-in JavaScript map method:
    // .set(key, value)
    // The key is:
    // newTask.id
    // The value is:
    // new FormControl(false, {
    // nonNullable: true
    // })
    // This gives the new task a checkbox that is initially unselected.
    this.taskSelectionControls.set(

      newTask.id,

      new FormControl(false, {
        nonNullable: true
      })

    );


    this.messageService.add({
      severity: 'success',
      summary: 'successful',
      detail: 'Task was added.'
    });

   // Finally, you call another custom method of your component.
   // It resets the form fields to their default values.
    this.resetTaskForm();

  }


  // ============================================================
  // RESET CREATE FORM
  // ============================================================

  resetTaskForm(): void {

    this.taskForm.reset({

      title: '',

      description: '',

      email: '',

      priority:
        TaskPriority.Medium,

      assignedTo:
        null,

      taskFrom:
        null,

      dueDate:
        null

    });

  }


  
  // ============================================================
  // START EDIT

  // The key concept is this:
  // While editing, we initially change only the values in our `editForm`. 
  // We don't transfer these changes to the `TaskService` until we save them.
  // ============================================================

  startEdit(id: number): void {

    const task =
      this.tasks.find(            // find() searches the this.tasks array for the first task whose ID matches the id parameter.
        task => task.id === id
      );


    if (!task) {                 // If no task is found, exit the method immediately.
      return;
    }

// You use `editingTaskId` to track which task is currently being edited.
    this.editingTaskId =
      id;

// editForm is your Angular Reactive Form—that is, a FormGroup containing multiple FormControl fields.
// The setValue() method sets the values of all controls in this FormGroup.
// Let's take a look at Task 102:
// Then setValue() transfers the values:
// Form field       Value from the task
// ============================================================
// title            ‘Learning RxJS’
// description      ‘Understanding operators’
// email            ‘test@example.com’
// priority         TaskPriority.High
// assignedTo       null
// taskFrom         null
// dueDate          null
// status           TaskStatus.Pending

// On the left is the name of the FormControl; on the right is the property of the Task object.
// This is not an error, even though the names are different.
    this.editForm.setValue({

      title:
        task.name,

      description:
        task.description,

      email:
        task.email,

      priority:
        task.priority,

      assignedTo:
        task.assignedTo ?? null, // Use the replacement value. If it is null or undefined, use null.
        // The ?? operator is called the nullish coalescing operator.
        // It means:
        // Use the left-hand value unless it is null or undefined. Otherwise, use the right-hand value.
        // In your application, `assignedTo` and `taskFrom` can be optional.
        // By setting them to `null`, we ensure that the form has a defined empty state when no assignment exists.
      taskFrom:
        task.taskFrom ?? null, // Use the replacement value. If it is null or undefined, use null.

      dueDate:
        task.dueDate,

      status:
        task.status

    });

  }


  // ============================================================
  // SAVE EDIT
  // ============================================================

  // `this.editForm.invalid` is a property of the `FormGroup`.
  // Angular uses the defined validators to check whether the form values are valid.
  // For example, in our TodoApp, you have validators for required fields and the email format.
  // If at least one control has a validation error, the form is invalid.

  saveEdit(id: number): void {

    if (this.editForm.invalid) {
       // This method marks all controls as “touched,” meaning they have been touched by the user.
       // Why?
       // Because Angular templates often don't display error messages until a field is both “touched” and “invalid.”
      this.editForm.markAllAsTouched();


      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid entry',
        detail:
          'Please check the mandatory fields and the email address.'
      });

      // The method is terminating. No changes will be saved.
      return;

    }

       // We store this object in the constant formValue.
       // We can then access individual properties:
       // formValue.title
       // formValue.email
       // formValue.priority
    const formValue =
       // Here's a new, important method:
       // getRawValue().
       // It returns an object containing the current values of all controls in the FormGroup, including disabled controls.  
       // The difference from `this.editForm.value` is important: With `value`, disabled controls may be missing, 
       // whereas `getRawValue()` returns their values as well.
    this.editForm.getRawValue();
      

    const newTitle =
       // We store this object in the constant `formValue`.
       // We can then access individual properties:  
    formValue.title.trim();   // trim() is a JavaScript string method.
                              // It removes spaces and other whitespace characters from the beginning and end of a string.
                              // Spaces within the text are preserved.
     
      // Here we use the logical NOT operator again!
      // An empty string ‘’ is a falsy value in JavaScript.
      // Therefore:
      // !‘’ // true

      // If newTitle is empty after removing the spaces, we display a warning and exit the method.
      // Why this second check, even though we already have validators?
      // A `Validators.required` does not automatically recognize a string consisting solely of spaces as invalid.
      // Our additional `trim()` check closes exactly this gap.
    if (!newTitle) {

      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid entry',
        detail:
          'The Task title must not be empty.'
      });


      return;

    }

      // Search for the original task again
      // We're searching for the task object again using its ID.
      // Why?
      // Because we don't want to just use the form values when saving.
      // After all, our task has other properties as well, such as:
      // id
      // creationDate

      // These should be retained.
      // In addition, the task may have been deleted between the time it was started and the time the changes were saved.
    const existingTask =
      this.tasks.find(
        task => task.id === id
      );


    if (!existingTask) {    // We'll cancel if it's no longer present in this.tasks.
      return;
    }

    // – Create the updated object
    // We create a new object of type TaskInterface.
    const updatedTask: TaskInterface = {

      // This is the spread operator, or spread syntax.
      // It transfers the existing task object's enumerable properties to the new object.
      ...existingTask,

      // In essence, this means:
      // First, copy all the properties from `existingTask`, and then overwrite `name`.
      // The original ID and creation date are retained.
      // One more detail: `spread` creates a shallow copy here. Nested objects—such as an `assignedTo` 
      // user object—are not automatically deep-copied.
      name:
        newTitle,

      description:
        formValue.description.trim(),

      email:
        formValue.email.trim(),

      priority:
        formValue.priority,

      dueDate:
        formValue.dueDate,

      status:
        formValue.status

    };

// Here, we check whether a user has been selected in the form.
// Case A: A user has been selected
    if (formValue.assignedTo) {
      // The object is truthy.
      // Therefore, the following is executed:
      // The updated task is assigned to a user.
      updatedTask.assignedTo =
        formValue.assignedTo;
      
      // Case B: No user is selected
      // In that case, the following might apply:
    } else {
       // “delete” is a JavaScript operator that removes a property from an object.
       // The resulting object will then no longer contain an `assignedTo` property.
       // This differs from:
       // task.assignedTo = null;
       // Because if it were set to `null`, the property would still exist but would have an empty value.
       // Syntax                           Meaning
       // ==================================================================================================
       // assignedTo: user                 Property exists, assigned to a user
       // assignedTo: null                 Property exists, but no assignment
       // delete updatedTask.assignedTo    Property completely removed

       // Since `assignedTo` is optional in your task model, this approach makes sense.
      delete updatedTask.assignedTo;

    };

    if (formValue.taskFrom) {

      updatedTask.taskFrom =
        formValue.taskFrom;

    } else {

      delete updatedTask.taskFrom;

    }

       // Now we pass the fully prepared task object to our TaskService.
       // That is the key difference between editing and saving.
    this.taskService.updateTask(
      updatedTask
    );

// The component loads the updated task list from the service.
    this.refreshTasks();

// This indicates that:
// No tasks are currently being processed.
    this.editingTaskId =
      null;

// The form will be reset.
    this.resetEditForm();


    this.messageService.add({
      severity: 'success',
      summary: 'Saved',
      detail: 'Task was updated.'
    });

  }


  // ============================================================
  // CANCEL EDIT
  // This method has no parameters.
  // That isn't necessary anyway, because we don't want to modify or save any specific task.
  // We simply want to exit edit mode.
  // ============================================================

  cancelEdit(): void {
    // As a result, no task will be marked as “in progress” anymore.
    this.editingTaskId =
      null;

    // The form will be reset.
    this.resetEditForm();

  }


  // ============================================================
  // RESET EDIT FORM
  // ============================================================

  // reset() is a method of the Angular FormGroup.
  // It resets the form values to the passed-in initial values and also resets the form’s interaction state—for example, to “pristine” and “untouched.”
  // This is important because, the next time the form is edited, old entries or previous “field was touched” states should not be automatically carried over.
  // Why do we have `reset()` here and `setValue()` in `startEdit()`?
  // Method          Task
  // ============================================================
  // setValue()      Populate the form with the values from an existing task
  // getRawValue()   Retrieve the current form values
  // reset()         Reset the form values and interaction state
  resetEditForm(): void {

    this.editForm.reset({

      title: '',

      description: '',

      email: '',

      priority:
        TaskPriority.Medium,

      assignedTo:
        null,

      taskFrom:
        null,

      dueDate:
        null,

      status:
        TaskStatus.Pending

    });

  }


  // ============================================================
  // COMPLETE / REOPEN
  // ============================================================

//  Now let’s take a closer look at the Complete/Reopen function in our Angular TodoApp. 
//  It’s an excellent example of how several TypeScript concepts work together:
// - Methods and parameters
// - Arrays and the find() method
// - Arrow functions (=>)
// - The strict equality operator (===)
// - The logical NOT operator (!)
// - The ternary operator (? :)
// - Enums (TaskStatus)
// - The interaction between TaskManagerComponent and TaskService

// The purpose of the method is:
// If a task is not yet complete, it is completed. If it is already complete, it is reopened.

// So we have a method that switches between two states.
  toggleTask(id: number): void {         // The user clicks “Complete” or “Reopen”
// Here, we define a method within our TaskManagerComponent.
// Component	     Meaning
// ============================================================
// toggleTask	     Method Name
// id	             Parameter accepted by the method
// number	         The ID must be a number
// void	           The method does not return a value
// {	             Start of the Methodology Framework


    const task =
      this.tasks.find(             // Find Task 102 in the array
      // Difference between find() and filter()
      // find()	                                             filter()
      // ==========================================================================================
      // Find the first matching element	                   Find all matching elements
      // Returns a single element	                           Returns an array
      // Returns “undefined” if nothing is found	           Returns [] if nothing is found
      // result:
      // {
      // id: 102,
      // name: 'learn RxJS'
      // }
      // So the variable `task` contains the task object that was found—not just its ID, and not an array.

        task => task.id === id
        // Arrow-function
        // “Take a task and check whether its ID matches the ID you're looking for.”
        // When id = 102, the check proceeds as follows:

        // Iteration    Current Task    Check                Result
        // ==========================================================================================
        // 1            Task 101        101 === 102          false
        // 2            Task 102        102 === 102          true
        // 3            Task 103        No longer checked    –

        // As soon as find() finds the first matching task, it stops searching.

        // Note:
        
        // const task = this.tasks.find(
        //  task => task.id === id
        // );
        
        //  We have “task” here twice.
        //  This is allowed because they are two different variables with different scopes.
        // - The outer `const task` stores the search result.
        // - The inner `task` is the parameter of the arrow function and represents the array element currently being checked.

      );


    if (!task) {                    // This is where the logical NOT operator ! is used. It inverts a truth value.
      return;                      // Cancel if the task does not exist. End of the method toggleTask()
    }


    const newStatus =

      task.status === TaskStatus.Completed

        ? TaskStatus.Pending
        : TaskStatus.Completed;
         // ? : – the so-called ternary operator, a shorthand form of an if/else statement.

    this.taskService.toggleTaskStatus(
      id
    );

    // Save status and update task list
    this.refreshTasks();

// PrimeNG's MessageService for displaying small notifications. These are called toast messages.
// The curly braces { ... } contain an object with the settings for this message.
// “severity” determines the type or format of the message.
// For example, PrimeNG supports:
// Severity	Meaning
// 'success'	Success, typically green
// 'info'	Information, typically blue
// 'warn'	Warning
// 'error'	Error
// In our system, the notification should depend on whether a task has just been completed or reopened.
// Passing a JavaScript object with three properties to the add() method of the PrimeNG MessageService.
// Message Object
          //│
          //├── severity  → Type of Report
          //│
          //├── summary   → Headline
          //│
          //└── detail    → Description

//Structure of this Toast notification
//severity	'success' – defines the display
//summary	'Abgeschlossen' – the headline
//detail	'Task completed.' – the description text
    this.messageService.add({
      //`add` is a method of the `MessageService` 
      // So, in this context, `add()` means “add a message.”
      // The MessageService provides the message. The PrimeNG component `<p-toast>` receives it and displays it.
      severity:
        newStatus === TaskStatus.Completed 
        // Is the value of `newStatus` exactly the same as `TaskStatus.Completed`? `TaskStatus` is an enum in `task.model.ts`.
          ? 'success'
          : 'info',
            // ? : – the so-called ternary operator, a shorthand form of an if/else statement.

      summary:
        newStatus === TaskStatus.Completed
          ? 'Completed'
          : 'Reopend',
            // ? : – the so-called ternary operator, a shorthand form of an if/else statement.
      detail:
        newStatus === TaskStatus.Completed
          ? 'Task was completed.'
          : 'Task was reopened.'
           // ? : – the so-called ternary operator, a shorthand form of an if/else statement.
    });

  }


  // ============================================================
  // DELETE / BULK DELETE
  // It searches through all the tasks in our TodoApp and creates a new array that contains only the tasks whose checkboxes are selected.
  // Important: No tasks are deleted at this point! We're just determining which tasks have been selected.
  // ============================================================

  // Here we define a method of our TaskManagerComponent.
  // Component     Meaning
  // ============================================================
  // deleteTask    Name of the method
  // id            Parameter accepted by the method
  // number        The parameter must be a number
  // void          The method does not return a value
  // { ... }       Method body containing the statements to be executed

  // For example, the user could click “Delete” for Task 102.
  // The method would then be called as follows:
  // this.deleteTask(102);
  // The variable id would then contain the value 102.
  deleteTask(id: number): void {

  // Here, we declare a new constant named `selectedTasks`.
  // It will subsequently hold the result of our filtering.
  // You can think of it as a new container:
  // this.tasks
  //  │
  //  │ All existing tasks
  //  ▼
  //filter()
  //  │
  //  │ Selected tasks only
  //  ▼
  //selectedTasks
  
  // Since `filter()` returns an array, `selectedTasks` is also an array.
  //TypeScript automatically infers the type. In our case, it is:
  //`TaskInterface[]`
  //This means: an array of objects of type `TaskInterface`.
    const selectedTasks =
      this.tasks.filter(task =>
      // `this.tasks` is our array containing all the tasks. For example,
      // this.tasks = [
      // { id: 101, name: 'Angular lernen' },
      // { id: 102, name: 'RxJS lernen' },
      // { id: 103, name: 'Cookies verstehen' }
      // ];
      // The filter() method is part of JavaScript arrays.
      // It examines each element and decides:
      // - true → The element is added to the new array.
      // - false → The element is not added.
      // The original array remains unchanged.

      // this.tasks.filter(task => : That's an arrow function.
      // “Take the next task from the array and perform the following check on it.”
      // filter() calls this function for each task.

      // Important: `task` is not an additional variable that we need to declare beforehand. 
      // It is introduced as a parameter of the arrow function and receives each element from 
      // `this.tasks` in sequence.

      //Find the correct checkbox
        this
          .getSelectionControl(task.id)
          // In our TodoApp, we manage checkbox selections using FormControl<boolean>.
          // The getSelectionControl() method returns the selection control for the specified task ID.
          // For example:
          // this.getSelectionControl(102)
          // returns the FormControl associated with the checkbox for Task 102.
          // However, in our code, the ID is passed dynamically:
          // this.getSelectionControl(task.id)
          // On each iteration, task.id is a different number.
          // Task 101
          // │
          // ▼
          // getSelectionControl(101)
          // │
          // ▼
          // Checkbox control from Task 101
          // Task 102
          // │
          // ▼
          // getSelectionControl(102)
          // │
          // ▼
          // Checkbox control from Task 102
          .value // Is the checkbox selected?
          // true  // Checkbox checked
          // false // Checkbox unchecked
          // “Only add the task to the new selectedTasks array if its checkbox is checked.”
      );
         // filter() has a built-in rule
         // The JavaScript array method filter() expects a function that evaluates a condition for each array element.
         // The rule is:
         // - If the function returns true, the element is added to the new array.
         // - If it returns false, the element is not added.

         // The key point: `filter()` returns the original array element, not the Boolean value `true`.
         // Because we use a FormControl<boolean> for each checkbox, .value returns either true or false.
         // So the `if (isSelected === true)` is essentially already inside `filter()`! That's why you don't need to write it yourself.
         // A small technical detail: `filter()` doesn't necessarily require the Boolean `true`; instead, it requires a truthy return 
         // value. For example, the number 1 would also cause the selection to be applied.
         // It's not your code that determines whether “true” is used. Your code only determines which condition is checked. 
         // The `filter()` method uses the return value to determine which elements end up in the result.

    // ==========================================================
    // BULK DELETE
    // ==========================================================

    // What makes this code special is that it doesn’t simply delete multiple tasks. It first asks for confirmation, 
    // then deletes the data, resets the checkbox state, exits edit mode if necessary, and displays a success message.

    // Overview of the entire process
    //                                                  selectedTasks
    //                                         Array containing the selected tasks
    //                                                       │
    //                                                       ▼
    //                                            if (selectedTasks.length > 0)
    //                                          (Was at least one task selected?)
    //                                                       │
    //                                                       ▼
    //                                           confirmationService.confirm()
    //                                          (Display confirmation dialog)
    //                  │                                                                             │
    //                  ▼                                                                             ▼
    //                 Yes                                                                            No

    //           Execute accept()                                                                   Cancel
    //      (Retrieve IDs, delete tasks,                                                 (No deletion; tasks are retained)
    //        clean up, display toast)

    if (selectedTasks.length > 0) {

      this.confirmationService.confirm({
      // Request confirmation dialog. Service from PrimeNG
        header:
          'Bulk deletion',

        message:
          `Would you really like to delete ${selectedTasks.length} selected Task(s) ?`,
          // This is a template literal interpolation.
          // The backticks (`) allow us to insert variables or expressions directly into a string using ${...}.
          // If `selectedTasks.length` is equal to 3, the result is:
          // Do you really want to delete 3 selected tasks?
        icon:
          'pi pi-exclamation-triangle',
          // Display the PrimeIcons warning icon.
        acceptLabel:
          'Yes',
          // Text for the confirmation button.
        rejectLabel:
          'No',
          // Text for the “Reject” button.
        acceptButtonStyleClass:
          'p-button-danger',
          // CSS class for the confirmation button; here, it's displayed in red with a “Danger” icon.

         // What happens when you call confirm()?
         // Very important: The function which is in " accept: () => { " is not executed immediately when confirm() is called.
         // Instead, we pass it to the ConfirmationService. PrimeNG calls it later when the user clicks “Yes.”
         // It's called a call back function
         // │
         // ▼
         // A dialog box appears
         // │
         // ▼
         // The user clicks “Yes” only then the function is executed. 
         // │
         // ▼
          accept: () => {        // Property of an object: But this time, it doesn't receive a string or a Boolean — it receives a function.
         // │                       This is an arrow function with no parameters.  
         // │
         // ▼
         // Code within the function is executed
        
         // – Convert task objects to IDs
          const selectedIds =
            // Here, we use another JavaScript array method: map().
            // While filter() selects elements based on a condition, map() generates a new value from each element.
            selectedTasks.map(
              task => task.id
              // The arrow function:
              // task => task.id
              // returns the id property for each Task object.

              //                     From Task Objects to IDs
              // ==========================================================
              //          selectedTasks                     selectedIds
              // ==========================================================
              // id: 101                                        101
              // name: Learn Angular                       
              // ==========================================================
              // id: 103                                        103
              // name: Understand Cookies
              // ==========================================================
              //          -> map(task => task.id) extracts only the IDs

            );

          this.taskService.deleteTasks(
            selectedIds
          );
          // Now the actual deletion takes place.
          // Here, your TaskManagerComponent accesses the custom TaskService you programmed.
          // As a reminder: We deliberately moved the actual data management to the service.
          // TaskManagerComponent
          // │
          // │  deleteTasks([101, 103])    (Numbers which are in selectedIDs)
          // ▼
          // TaskService
          // │
          // ├── delete Task 101 
          // ├── delete Task 103 
          // │
          // └── Save changes
          //  (LocalStorage)
          

          // After deletion, the component must retrieve its current task list from the service again.
          // TaskService
          // └── Task 101 and 103 deleted
          // │
          // ▼
          // refreshTasks()
          // │
          // ▼
          // this.tasks updates
          // │
          // ▼
          // Angular updates
          // the displayed table
          
          this.refreshTasks();
          

          selectedIds.forEach(id => {     // – Clean up the checkbox management
                                          // Here we have another array method: forEach().
                                          // It iterates through each element of the array and executes a function for each one.
            this.taskSelectionControls.delete(id);
                    // In our TodoApp, `taskSelectionControls` is a map that maps task IDs to their checkbox form controls.
                    // For example:In our TodoApp, `taskSelectionControls` is a map that maps task IDs to their checkbox form controls.
                    //For example:
                    //taskSelectionControls (Map)
                    // │
                    // ├── 101 → FormControl(true)
                    // ├── 102 → FormControl(false)
                    // └── 103 → FormControl(true)

                    // After deleting 101 and 103:
                    // taskSelectionControls (Map)
                    // │
                    // └── 102 → FormControl(false)

                    // This is important because Tasks 101 and 103 no longer exist. So we no longer need their checkbox controls either.
                    // Simply deletes an entry from the map.
                    // The actual task data has already been removed by taskService.deleteTasks().
          });


          if (
            this.editingTaskId !== null &&       // !== means “is not equal to” (strict inequality comparison).
                                                 // “Is there even a task currently in edit mode?”
            selectedIds.includes(             
              // `includes()` is another JavaScript array method.
              // It checks whether a specific value is present in an array.
              // “Is the task we just worked on one of the tasks we just deleted?”
              // The && operator combines both conditions
              // && is the logical AND operator.
              // The entire expression is true only if both conditions are met.

              // Task in progress?	          Was the edited task deleted?	          Result
              // No                         	–	                                      false
              // Yes                          No	                                    false
              // Yes                          Yes                                     true

              // If the edited task has been deleted, we will:
              this.editingTaskId
            )
          ) {

            this.editingTaskId =
              null;


            this.resetEditForm();
            // This exits edit mode and resets the edit form.
            // Why is this important?
            // Imagine you're editing Task 103 and, at the same time, delete Tasks 101 and 103 using the checkboxes. 
            // Without this check, the edit status might still refer to Task 103, even though that task no longer exists.
            
          }

          // PrimeNG's MessageService displays a toast notification.
          // This time, we don't need a ternary operator because we're already inside the confirmed delete action.
          // So we know which message to display:
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail:
              `${selectedTasks.length} Task(s) was/were deletd.`
              // This inserts the number of selected tasks into the message body.
          });

        }

      });


      return;
      // `return` terminates the execution of the current method, `deleteTask()`.
      // There is no return value here because our method was declared as `void`.
      // The reason:
      // If at least one task is selected, we have already triggered the bulk delete dialog.
      // The remaining code in the method should not also perform the normal individual deletion.
      // Very important: The return statement does not wait for the user to click “Yes” or “No.”
      // The dialog is displayed, and the deleteTask() method ends. Only later, when the user clicks “Yes,” is the passed accept callback function executed.
      // This also means that if the user clicks “No,” the individual deletion is not initiated afterward.

    }



    // This code is executed only
    // if NO tasks are selected.
    // ==========================================================
    // SINGLE DELETE
    // ==========================================================

    // Remove the task from the saved data
    // Here, we access our custom-programmed TaskService.
    // Let's break down the expression:
    // Component        Meaning
    // ==========================================================
    // this	            The current instance of our TaskManagerComponent
    // taskService	    The integrated service for managing our tasks
    // .deleteTask()	  Service method that deletes a task
    // id	              ID of the task to be deleted

    // Suppose the user clicks the Delete button in Task 102.
    // In that case, our component method would be called with the following parameter, for example:
    // deleteTask(102);
    // Our TaskService removes Task 102 from its data and saves the updated list to LocalStorage.
    // Important: The actual data deletion takes place within the service, not in this line itself. 
    // This line simply calls the service method designed for that purpose.
    this.taskService.deleteTask(
      id
    );
    
    // Update the task list in the component
    // You'll recall: We designed our TodoApp so that the TaskService manages the data and the TaskManagerComponent uses that data for display.
    // After `taskService.deleteTask(102)`, the service now contains only tasks 101 and 103.
    // However, the component may still have its previous array copy.
    // That is why we call:
    this.refreshTasks();
    
    // Remove associated checkbox management
    // As a reminder: `taskSelectionControls` is a map in which we store a `FormControl<boolean>` for each task ID.
    // Note: Map.delete() is a method that already exists in JavaScript. We did not write it ourselves. It removes an entry based on its key.
    this.taskSelectionControls.delete(
      id
    );

    // Check whether the deleted task has been edited

    if (this.editingTaskId === id) {     // - Was this particular task just completed?
                                         // In our TodoApp, we have the following property:
                                         // editingTaskId: number | null = null;
                                         // It keeps track of which task is currently in edit mode.
                                         // For example this.editingTaskId = 102;
                                         // This means that Task 102 is currently being processed.
                                         // Now the user deletes Task 102:
                                         // id = 102;
                                         // Our condition checks:
                                         // this.editingTaskId === id
                                         // so 102 === 102
                                         // result = true if block is beeing executed

                                         // if we have 103 === 102: result = false
                                         // Then, although we'll delete Task 102, we'll leave Task 103 in edit mode.
      
      // If we delete the task we're currently working on, we have to exit edit mode.
      // So we set it to null
      // In this context, zero is not an error, but a state that is intentionally used.
      // We could interpret this property conceptually as follows:  
            // editingTaskId = 102
            // → Task 102 is being processed
            
            // editingTaskId = 103
            // → Task 103 is being processed

            // editingTaskId = null
            // → No task is being processed                               
      this.editingTaskId =
        null;

      // Now we'll also reset our Reactive Form for editing.
      // If Task 102 is deleted, we no longer need its processing values.
      // That is why we call our custom method: this.resetEditForm();
      // It ensures that the editing form returns to its intended initial state.
      // It is important to understand the difference between these two statements:
      // Statement                    Task
      // ==========================================================
      // this.editingTaskId = null    Remembers that no task is being edited
      // this.resetEditForm()         Resets the values and state of the editing form

      // The two go hand in hand, but serve different purposes.
      this.resetEditForm();

    }

    // Notify the user about the deletion
    this.messageService.add({
      severity: 'info',        // Information Notice
      summary: 'Deleted',     // Headline
      detail: 'Task was deleted.' // Description

      // Unlike with “Bulk Delete,” we don't need a dynamic number in the message text here because only a single task was deleted.
      // This section does not include a Yes/No confirmation prompt.
      // This is a deliberate distinction in the program's current workflow: Several selected tasks are deleted only after confirmation, 
      // while individual tasks are deleted immediately.

      // Difference Between Single Delete and Bulk Delete
      // Process    	                Single Delete	                     Bulk Delete
      // =========================================================================================
      // What tasks?	                A task by its ID	                 All Selected Tasks
      // Extinguishing Method         deleteTask(id)	                   deleteTasks(selectedIds)
      // Confirmation	                Not in this section	               Yes/No Dialog Box
      // Checkbox Management	        Map.delete(id)	                   forEach() mit Map.delete(id)
      // Edit Mode        	          Comparisaon with ===               Checking with includes()
      // Toast	                      „The task has been deleted.“	     „X task(s) were deleted.“

      // The Most Important Relationship
      // In our TodoApp, there are three different states that we take into account after a deletion:

            // 1. Saved Task Data
            // taskService.deleteTask(id) removes the task.

            // 2. UI and Checkbox State
            // refreshTasks() Updates the list, and `taskSelectionControls.delete(id)` removes the selection control.

            // 3. Processing Status
            // If the deleted task was being edited at the time, we exit edit mode and reset the form.

      // Note: In our application, deleting a task doesn't just mean removing its data. We must also ensure that 
      // the user interface, checkbox management, and edit mode are updated to reflect the actual data state.
      // And that is precisely why this seemingly simple deletion process consists of several steps.
    });

  }

}