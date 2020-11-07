import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductStoreService } from '../core/service/product-store.service';
import { By } from '@angular/platform-browser';
import { of, timer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule
      ],
      providers: [
        {
          provide: ProductStoreService,
          useFactory() {
            return {
              products: of([]),
              loadProduct: function(key) {
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
            };
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('how mach card have', done => {
    const fixture = TestBed.createComponent(ListComponent);
    let app = fixture.debugElement;
    expect(app.query(By.css('.example-card'))).toBeNull();

    component.productService.loadProduct('');
    fixture.detectChanges();
    component.productService.products.subscribe(i => {
      app = fixture.debugElement;
      expect(app.queryAll(By.css('.example-card')).length).toBe(1);
      done();
    });
  });
});
