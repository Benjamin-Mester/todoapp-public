import { TestBed } from '@angular/core/testing';

import { TaskService } from './task';


describe('TaskService', () => {

  let service: TaskService;


  beforeEach(() => {

    // Damit jeder Test mit leerem LocalStorage startet.
    localStorage.clear();


    TestBed.configureTestingModule({});


    service =
      TestBed.inject(TaskService);

  });


  it('should be created', () => {

    expect(service).toBeTruthy();

  });

});
