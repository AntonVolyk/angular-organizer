import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Task {
    id?: string;
    title: string;
    date?: string;
}

interface CreateResponse {
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    static url = 'https://angular-organizer-87e91.firebaseio.com/tasks';

    constructor(private http: HttpClient) {
    }

    create(task: Task): Observable<Task> {
        return this.http
            .post<CreateResponse>(`${TaskService.url}/${task.date}.json`, task)
            .pipe(map(res => {
                return {...task, id: res.name};
            }));
    }

}
