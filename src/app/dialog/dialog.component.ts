import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  freshnessList=["Brand New", "Second Hand","Refurbished"
  ];
  productForm !: FormGroup;
  //⬆️ ☝️ ! tells, that the field is non-null non-undefined. : is just the separator between field name and type.


  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    //⬆️ ☝️ injecting formBuilder in constructor
   }

  ngOnInit(): void {
    //to initialize our form
    this.productForm=this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    })
  }
  addProduct(){
if(this.productForm.valid){
  this.api.postProduct(this.productForm.value)
  .subscribe({
    next:(res)=>{
      alert("Product added successfully")
    },
    error:()=>{
      alert("error while adding product")
    }
  })
}
  }

}
