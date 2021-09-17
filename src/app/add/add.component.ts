import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  bookmarkForm: FormGroup;
  imgSelected = false;
  bookmark;
  url;
  name;
  pictureurl;
  formErrors = {
    'img': '',
    'bookmarkName': '',
    'bookmarkURL': '',
  };
  validationMessages = {
    'bookmarkName': {
      'required': 'bookmarkName is required.',
      'minlength': 'bookmarkName must be at least 2 characters long',
      'maxlength': 'bookmarkName cannot be more than 25 characters long',
    },
    'bookmarkURL': {
      'required': 'bookmarkURL is required.',
      'pattern': 'URL not in vaild format'
      
    }
  };
  constructor(public dialogRef: MatDialogRef<AddComponent>,
    private fb: FormBuilder) { 
      this.createForm();
    }

  ngOnInit() {
    
    
  }
  createForm() {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.bookmarkForm = this.fb.group({
      bookmarkName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      bookmarkURL: ['', [Validators.required,Validators.pattern(urlRegex)]],
    });
    this.bookmarkForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    
    this.onValueChanged(); //  (re)set from validation messages
  }
  onValueChanged(data?: any) {
    if (!this.bookmarkForm) { return; }
    const form = this.bookmarkForm;
    for (const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
  }
  onSelectFile(e) {
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=> {
        this.pictureurl=event.target.result;
        this.imgSelected= true;
      }
    }
  }
  onSubmit() {
    this.bookmark = this.bookmarkForm.value;
    var count = localStorage.getItem("count")==null?1:localStorage.getItem("count");
    count=Number(count)+1;
    count.toString;
    localStorage.setItem("count", JSON.stringify(count));
    console.log(localStorage);
    window.localStorage.setItem(`${count}`,JSON.stringify(this.bookmark));
    console.log(window.localStorage);
    this.dialogRef.close();
  }

}
