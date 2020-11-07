import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ProductStoreService } from '../../service/product-store.service';
import { timer } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service : ProductStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[ FormsModule, ReactiveFormsModule, CommonModule],
      providers:[
        {provide:ProductStoreService,
          useFactory(){ return{

            loadProduct(){}

        }}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.get(ProductStoreService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service on change values ', ( done) => {
    component.registerForm.get('search').setValue('123');
    const loadProductSpy  = spyOn(service, 'loadProduct');
    component.registerForm.updateValueAndValidity({ onlySelf:false,emitEvent:true });
    timer(900).subscribe(i=>{
      expect(loadProductSpy).toHaveBeenCalled();
      done();
    });
  });

});
