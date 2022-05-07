import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];
  paymentForm!: FormGroup;
  //⬆️ ☝️ ! tells, that the field is non-null non-undefined. : is just the separator between field name and type.

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    //⬆️ ☝️ injecting formBuilder in constructor
  }

  ngOnInit(): void {
    //to initialize our form
    this.paymentForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      // freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
  }
  addProduct() {
    if (this.paymentForm.valid) {
      this.api.postProduct(this.paymentForm.value).subscribe({
        next: (res) => {
          alert('Entry added successfully');
          this.paymentForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert('error while adding Entry');
        },
      });
    }
  }
}
