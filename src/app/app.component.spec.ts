import { TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/common/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListComponent } from './list/list.component';

import { timer, of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { ProductStoreService } from './core/service/product-store.service';
import { Routes, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';

describe('AppComponent', () => {
  let routes: Routes = [
    {
      path: '',
      component: ListComponent
    }
  ];

  let location: Location;
  let router: Router;
  let fixture;
  let service: ProductStoreService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductStoreService,
          useFactory() {
            return {
              products: of([]),
              loadProduct: function(key) {
                if (key === '123') {
                  this.products = of([
                    {
                      id: 1,
                      brand: '1',
                      description: '1',
                      image: '1',
                      price: 1,
                      discount: 1
                    }
                  ]);
                }
              }
            };
          }
        }
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
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
        ReactiveFormsModule
      ],
      declarations: [AppComponent, HeaderComponent, ListComponent]
    }).compileComponents();
    service = TestBed.get(ProductStoreService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a empty list', done => {
    fixture.detectChanges();
    router.navigate(['']).then(() => {
      const app = fixture.debugElement;
      expect(app.queryAll(By.css('.example-card')).length).toBe(0);
      done();
    });
  });

  it('should render a list of 1 element', done => {
    fixture.detectChanges();
    const app = fixture.debugElement;
    router.navigate(['']).then(function() {
      const header: HeaderComponent = app.query(By.directive(HeaderComponent))
        .componentInstance;
      header.registerForm.get('search').setValue('123');
      const loadProductSpy = spyOn(service, 'loadProduct').and.callThrough();
      header.registerForm.updateValueAndValidity({
        onlySelf: false,
        emitEvent: true
      });
      timer(900).subscribe(i => {
        fixture.detectChanges();
        expect(loadProductSpy).toHaveBeenCalled();
        expect(app.queryAll(By.css('.example-card')).length).toBe(1);
        done();
      });
    });
  });
});
