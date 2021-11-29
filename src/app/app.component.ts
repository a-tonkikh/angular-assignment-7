import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatus = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  forbiddenProjectName = 'Test';
  showErrors = false;

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required, this.forbiddenName.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(null),
    });

    this.projectForm.statusChanges.subscribe(
      (status) => {
        if (status === 'PENDING') {
          this.showErrors = false;
        } else {
          this.showErrors = true;
        }
      }
    );
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  forbiddenName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === this.forbiddenProjectName) {
          resolve({'nameIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
