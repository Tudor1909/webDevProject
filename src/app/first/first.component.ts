import { Component } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Data } from '@angular/router';
import { Student } from '../Models/student';
import { StudentService } from '../Services/student.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent {

  constructor(private studentService: StudentService){}

  inputValue: string = '';
  dbData: Student[] = [];
  dbDataCompleted: Student[] = [];

  activityName: string = ''; 
  activityStartDate: Date = new Date();
  activityDeadline: Date = new Date();
  
  selectedForCompletion: Student[] = [];
  deselectCompletion: Student[] = [];
  showDetailed: boolean = false;
  showDetailedC: boolean = false;

  parseDate(date: Date): string {
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  }
  isAfter(currentDate: Date, referenceDate: Date): boolean {
    if (currentDate.getFullYear < referenceDate.getFullYear)
      return false;
    if (currentDate.getMonth < referenceDate.getMonth)
      return false;
    if (currentDate.getDate < referenceDate.getDate)
      return false;
    return true;
  }

  getActivities(): void{
    this.studentService.getActivity().subscribe(result => { this.dbData = result.filter((activity) => !activity.isCompleted); });
    this.showDetailed = true;
  }

  getFinishedActivities() {
    this.studentService.getFinishedActivities().subscribe(result => { this.dbDataCompleted = result.filter((activity) => activity.isCompleted) });
  }

  addActivity(): void {
    console.log(this.activityDeadline instanceof Date);
    if (this.activityName != '' && this.isAfter(this.activityDeadline, new Date())) {
      let newActivity = { name: this.activityName, isCompleted: false, deadline: this.activityDeadline, startDate: this.parseDate(new Date()) };
      this.studentService.addActivity(newActivity);
      this.showDetailed = true;
    }
    else return;
  }

  finishActivity(activityToFinish: Student[]) {
    let index;
    console.log(activityToFinish);

    for (let activity of activityToFinish) {
      activity.isCompleted = true;
      index = this.dbData.indexOf(activity);
      if (index > -1)
        this.dbData.splice(index, 1);
      this.dbDataCompleted.push(activity);
    }    
  }

  undoCompletion(finishActivity: Student[]) {
    let index;

    for (let activity of finishActivity) {
      activity.isCompleted = false;
      index = this.dbDataCompleted.indexOf(activity);
      if (index > -1)
        this.dbDataCompleted.splice(index, 1);
      this.dbData.push(activity);
    }
  }

  hideCurrentActivities(activities: MatSelectionList): void {
    this.dbData = [];
  }

  hideCompletedActivities(activities: MatSelectionList): void {
    this.dbDataCompleted = [];
  }

  update(activity: Student[], compActivity: Student[]) {
    const elems = [...activity, ...compActivity];
    let res = [];
    for (let act of elems) {
      res.push({name: act.name, startDate: act.startDate, isCompleted: act.isCompleted, deadline: act.deadline });
    }
    this.studentService.updateActivity(res)
  }
}
