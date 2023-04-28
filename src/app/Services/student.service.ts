import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Student } from '../Models/student';
import { addDoc, getDoc, getDocsFromServer, collection, collectionData, updateDoc, doc, Firestore, getFirestore }
                        from '@angular/fire/firestore'
import { getDocs } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})

export class StudentService {

  constructor(private fs: Firestore) { }

  addActivity(student: Student) {
    const myCollection = collection(this.fs, 'activities')
    addDoc(myCollection, student);
  }

  getActivity(): Observable<Student[]> {
    const myCollection: any = collection(this.fs, 'activities');
    return collectionData(myCollection);
  }

  getFinishedActivities(): Observable<Student[]> {
    const myCollection: any = collection(this.fs, 'activities');
    return collectionData(myCollection);
  }

  updateActivity(activity: any) {
    const myCollection = collection(this.fs, 'activities');
    const docRef = doc(this.fs, 'activities');
    for (let act of activity)
      updateDoc(docRef, act).catch(err => console.error(err));
  }

}
