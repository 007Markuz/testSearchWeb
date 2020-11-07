import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductStoreService } from '../../service/product-store.service';
import { timer } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service : ProductStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[ FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientTestingModule,
        MatIconModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        LayoutModule,
        ReactiveFormsModule],
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

  it('should call service on change values Numeric ', ( done) => {
    component.registerForm.get('search').setValue('123');
    const loadProductSpy  = spyOn(service, 'loadProduct');
    component.registerForm.updateValueAndValidity({ onlySelf:false,emitEvent:true });
    timer(900).subscribe(i=>{
      expect(loadProductSpy).toHaveBeenCalled();
      done();
    });
  });

  it('should call service on change values text ', ( done) => {
    component.registerForm.get('search').setValue('test');
    const loadProductSpy  = spyOn(service, 'loadProduct');
    component.registerForm.updateValueAndValidity({ onlySelf:false,emitEvent:true });
    timer(900).subscribe(i=>{
      expect(loadProductSpy).toHaveBeenCalled();
      done();
    });
  });

  it('should not call service on change values incomplete ', ( done) => {
    component.registerForm.get('search').setValue('te');
    const loadProductSpy  = spyOn(service, 'loadProduct');
    component.registerForm.updateValueAndValidity({ onlySelf:false,emitEvent:true });
    timer(900).subscribe(i=>{
      expect(loadProductSpy).not.toHaveBeenCalled();
      done();
    });
  });

});
