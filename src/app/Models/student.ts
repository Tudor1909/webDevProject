export class Student{
    name: string;
    isCompleted: boolean;
    startDate: string;
    deadline: Date;
    /*estmatedTimeForCompletion: Number;*/

    constructor()
    {
      this.name = '';    
      this.isCompleted = false;
      this.deadline = new Date();
      this.startDate = '';
    }

    //print(): string {
    //  return `Student: {${this.Name}, ${this.Alter}, ${this.isCompleted}, ${this.Deadline}; }\n`;
    //}
}
