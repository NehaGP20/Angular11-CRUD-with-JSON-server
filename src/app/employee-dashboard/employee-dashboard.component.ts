import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './personal-model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, 
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      ename : [''],
      ephone : [''],
      eemail : [''],
      ecity : [''],
      ehobbies : [''],
      eskills : ['']
      
    })

    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.ename = this.formValue.value.ename;
    this.employeeModelObj.ephone = this.formValue.value.ephone;
    this.employeeModelObj.eemail = this.formValue.value.eemail;
    this.employeeModelObj.ecity = this.formValue.value.ecity;
    this.employeeModelObj.ehobbies = this.formValue.value.ehobbies;
    this.employeeModelObj.eskills = this.formValue.value.eskills;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res => {
      console.log(res);
     // alert("Employee Added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err =>{
      alert("Something went wrong");
    })
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id)
    .subscribe(res => {
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }

  onEdit(row: any){
    this.employeeModelObj.id = row.id;
    this.formValue.controls['ename'].setValue(row.ename);
    this.formValue.controls['ephone'].setValue(row.ephone);
    this.formValue.controls['eemail'].setValue(row.eemail);
    this.formValue.controls['ecity'].setValue(row.ecity);
    this.formValue.controls['ehobbies'].setValue(row.ehobbies);
    this.formValue.controls['eskills'].setValue(row.eskills);

    this.showAdd = false;
    this.showUpdate = true;
  }

  updateEmployeeDetails(){
    this.employeeModelObj.ename = this.formValue.value.ename;
    this.employeeModelObj.ephone = this.formValue.value.ephone;
    this.employeeModelObj.eemail = this.formValue.value.eemail;
    this.employeeModelObj.ecity = this.formValue.value.ecity;
    this.employeeModelObj.ehobbies = this.formValue.value.ehobbies;
    this.employeeModelObj.eskills = this.formValue.value.eskills;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res => {
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}
