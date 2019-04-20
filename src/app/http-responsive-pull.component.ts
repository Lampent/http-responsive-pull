import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {interval, Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './http-responsive-pull.component.html',
  styleUrls: ['./http-responsive-pull.component.css']
})
export class HttpResponsivePullComponent implements OnInit {
  employeesPath: string = 'http://dummy.restapiexample.com/api/v1/employees';
  employees: any[] = [];
  manualPoll: Subject<any> = new Subject<any>(); // Subject to trigger poll
  intervalPoll: Observable<number> = interval(3000); // interval Observable to make poll every 3000 sec

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    alert('click on the panda employee for manualPull');

    // when ever manualPoll will be fed pollEmployees() will emit and return *new interval Observable which pollEmployees() every 3 seconds
    // important to say whenever manualPoll will be fed previous interval Observable will be canceled
    this.manualPoll.pipe(switchMap(() => {
      this.pollEmployees('manual');
      return this.intervalPoll;
    })).subscribe(() => this.pollEmployees('interval'));

    this.manualPoll.next(); // this will initialize the pulling
  }

  pollEmployees(puller: string): void {
    this.httpClient.get(this.employeesPath).subscribe((employees: any) => {
      this.employees = employees; // assign the employees
      console.log('employees updated by ' + puller + 'poll'); // this will show how the puller is
    });
  }

  onClick(): void {
    this.manualPoll.next();
  }
}
