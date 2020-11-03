import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { ProductStoreService } from './core/service/product-store.service';
import { Product } from './core/models/product';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MatCardModule
      ],
      declarations: [
        AppComponent,
        ListComponent
      ],
      providers: [
        { provide: ProductStoreService,
          useFactory(): ProductStoreService{
            return {
              products: [
                {id: '1', name: 'unoTest'},
                {id: '2', name: 'dosTest'}],
                load(): void{}};
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('how mach list have', () => {
    const fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement;

    expect(app.query( By.css('.example-header-image') )).toBeNull();

    fixture.detectChanges();
    app = fixture.debugElement;
    expect(app.queryAll( By.css('.example-header-image') ).length  ).toBe(2);

  });

});
