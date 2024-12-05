import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FacadeService } from '../api/facade.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Products } from '../../model/products.interface';
import { User } from '../../model/user.interface';
import { JobsDetail } from '../model/jobs.interface';
import { ButtonComponent } from '../../reuseablecomponent/button/button.component';
import { TextInputComponent } from '../../reuseablecomponent/text-input/text-input.component';

const diffJobs = [
  {
    jobsId: 'jd1',
    job: 'Lead .Dot net Developer',
    exp: '11-16(in years)',
    location: 'Pune, Mumbai',
    checked: false,
  },
  {
    jobsId: 'jd2',
    job: 'Senior Software Engineer',
    exp: '7-12(in years)',
    location: 'Remote',
    checked: false,
  },
  {
    jobsId: 'jd3',
    job: 'Urgently Hiring - Angular Architect - Hybrid',
    exp: '12-18(in years)',
    location: 'pan india',
    checked: false,
  },
  {
    jobsId: 'jd4',
    job: 'NCR Voyix - Hiring - UI Architect',
    exp: '12-22(in years)',
    location: 'Hyderabad',
    checked: false,
  },
  {
    jobsId: 'jd5',
    job: 'Opportunity For UI Tech Specialist',
    exp: '8-13(in years)',
    location: 'Pune, Chennai, Bengaluru',
    checked: false,
  },
  {
    jobsId: 'jd6',
    job: 'UI Lead',
    exp: '8-13(in years)',
    location: 'Pune, Chennai, Bengaluru',
    checked: false,
  },
  {
    jobsId: 'jd7',
    job: 'Lead JavaScript Developer - OTT Platform',
    exp: '10-14(in years)',
    location: 'Hyderabad',
    checked: false,
  },
];

const diffJobsdup: JobsDetail[] = [
  {
    jobsId: 'jd1',
    job: 'Lead .Dot net Developer',
    exp: '11-16(in years)',
    location: 'Pune, Mumbai',
  },
  {
    jobsId: 'jd2',
    job: 'Senior Software Engineer',
    exp: '7-12(in years)',
    location: 'Remote',
  },
  {
    jobsId: 'jd3',
    job: 'Urgently Hiring - Angular Architect - Hybrid',
    exp: '12-18(in years)',
    location: 'pan india',
  },
  {
    jobsId: 'jd4',
    job: 'NCR Voyix - Hiring - UI Architect',
    exp: '12-22(in years)',
    location: 'Hyderabad',
  },
  {
    jobsId: 'jd5',
    job: 'Opportunity For UI Tech Specialist',
    exp: '8-13(in years)',
    location: 'Pune, Chennai, Bengaluru',
  },
  {
    jobsId: 'jd6',
    job: 'UI Lead',
    exp: '8-13(in years)',
    location: 'Pune, Chennai, Bengaluru',
  },
  {
    jobsId: 'jd7',
    job: 'Lead JavaScript Developer - OTT Platform',
    exp: '10-14(in years)',
    location: 'Hyderabad',
  },
];
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    FormsModule,
    RouterModule,
    AsyncPipe,
    ButtonComponent,
    TextInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  checkList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  checkListValue: { [key: number]: boolean } = {};
  selectedValueL: number[] = [];

  username: string = '';
  password: string = '';

  diffJobsdup2: JobsDetail[] = [];
  product$!: Observable<Products[]>;
  authUser$!: Observable<User[]>;

  loginForm!: FormGroup;
  jobsListForm!: FormGroup;

  jobsList!: {
    jobsId: string;
    job: string;
    exp: string;
    location: string;
    checked: boolean;
  }[];

  jobsList2!: {
    jobsId: any;
    job: string;
    exp: string;
    location: string;
    checked: boolean;
  }[];

  count: number = 0;
  btnTxt: string = 'Apply';
  jobsId: string[] = [];
  jobsId2: string[] = [];

  constructor(private fb: FormBuilder, private facadeService: FacadeService) {
    this.jobsListForm = this.fb.group({
      jobs: this.fb.array(
        diffJobs.map((job) =>
          this.fb.group({
            jobsId: job.jobsId,
            job: job.job,
            exp: job.exp,
            location: job.location,
            checked: job.checked,
          })
        )
      ),
    });
  }

  get jobsFormArray() {
    return this.jobsListForm.get('jobs') as FormArray;
  }
  ngOnInit(): void {
    this.createloginForm();
    this.jobsList = diffJobs;
    //this.jobsList2 = diffJobs;
    // this.jobsListForm = this.fb.group({
    //   checklist: new FormControl(''),
    // });
    diffJobsdup.forEach((item: any) => {
      item.checked = false;
    });
    this.diffJobsdup2 = diffJobsdup;
  }

  createloginForm() {
    this.loginForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  loginForm1() {
    this.facadeService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.facadeService.getAuthuserAndProducts();
    this.authUser$ = this.facadeService.users$;
    this.product$ = this.facadeService.products$;
  }

  onJoblistChange(event: any) {
    // if (event.target.checked) {
    //   this.count++;
    //   if (this.count == 1) {
    //     this.btnTxt = `Apply ${1} Job`;
    //   } else {
    //     this.btnTxt = `Apply ${this.count} Jobs`;
    //   }
    // } else {
    //   this.count--;
    //   if (this.count == 1) {
    //     this.btnTxt = `Apply ${1} Job`;
    //   } else {
    //     this.btnTxt = `Apply ${this.count} Jobs`;
    //   }
    // }
    this.jobsId = [];
    this.jobsList.forEach((value) => {
      if (value.checked) {
        this.jobsId.push(value.jobsId);
      }
    });
    console.log(this.jobsId);
    console.log(this.jobsList);
    if (this.jobsId.length === 1) {
      this.btnTxt = `Apply ${1} Job`;
    }
    if (this.jobsId.length > 1) {
      this.btnTxt = `Apply ${this.jobsId.length} Jobs`;
    }
    if (this.jobsId.length === 0) {
      this.btnTxt = `Apply Job`;
    }
  }

  onJoblistChange2() {
    let jobsID: string[] = [];
    this.diffJobsdup2.forEach((value: JobsDetail) => {
      if (value.checked) {
        jobsID.push(value.jobsId);
      }
    });
    console.log('jobsID######----', jobsID);
  }
  selectAll(event: any) {
    if (event.target.checked) {
      this.jobsId = [];
      this.jobsList.forEach((value) => {
        value.checked = true;
        this.jobsId.push(value.jobsId);
        if (this.jobsId.length > 1) {
          this.btnTxt = `Apply ${this.jobsId.length} Jobs`;
        }
      });
    } else {
      this.jobsList.forEach((value) => {
        value.checked = false;
        this.jobsId = [];
        if (this.jobsId.length === 0) {
          this.btnTxt = `Apply Job`;
        }
      });
    }
  }

  selectAll2(event: any) {
    const isChecked = event.target.checked;
    this.jobsFormArray.controls.forEach((control, index) => {
      control.get('checked')?.setValue(isChecked);
      if (isChecked) {
        if (!this.jobsId2.includes(diffJobs[index].jobsId)) {
          this.jobsId2.push(diffJobs[index].jobsId);
        }
      } else {
        this.jobsId2 = [];
      }
    });
    if (this.jobsId2.length > 1) {
      this.btnTxt = `Apply ${this.jobsId2.length} Jobs`;
    }
    if (this.jobsId2.length === 0) {
      this.btnTxt = `Apply Job`;
    }
    console.log(this.jobsId2);
  }
  setJoblist(event: any, jobId: string) {
    console.log(jobId);
    if (event.target.checked) {
      this.jobsId2.push(jobId);
    } else {
      const index = this.jobsId2.indexOf(jobId);
      console.log(index);
      if (index > -1) {
        this.jobsId2.splice(index, 1);
      }
    }
    if (this.jobsId2.length === 1) {
      this.btnTxt = `Apply ${1} Job`;
    }
    if (this.jobsId2.length > 1) {
      this.btnTxt = `Apply ${this.jobsId2.length} Jobs`;
    }
    if (this.jobsId2.length === 0) {
      this.btnTxt = `Apply Job`;
    }
    console.log('jobs 2:', this.jobsId2);
  }

  getIndex(index: number) {
    alert(index);
  }

  selectedValue() {
    this.selectedValueL = this.checkList.filter(
      (item) => this.checkListValue[item]
    );
    console.log(this.selectedValueL);
  }

  onSave() {
    alert('click on save button');
  }

  onDelete() {
    alert('click on delete button');
  }

  getUserName(event: string) {
    console.log(event);
  }
}
