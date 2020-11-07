import { Component, OnInit} from '@angular/core';
import { ProductStoreService } from '../../service/product-store.service';
import { switchMap, debounceTime,  } from 'rxjs/operators';
import {FormBuilder, FormGroup, } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  registerForm: FormGroup;

  constructor(fb: FormBuilder, private productService: ProductStoreService) {
    this.registerForm = fb.group({search: ['']});
   }
   ngOnInit(): void {
     this.registerForm.controls['search'].valueChanges.pipe(
      debounceTime(500),
      switchMap(value => {
        console.log(value);
        const id = Number(value);
        if ( Number.isInteger(id) || value.length > 2 ){
          this.productService.loadProduct(value);
        }
       return value;
     })
     ).subscribe(null);
   }

}
