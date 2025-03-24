import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsshoesComponent } from './kidsshoes.component';

describe('KidsshoesComponent', () => {
  let component: KidsshoesComponent;
  let fixture: ComponentFixture<KidsshoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KidsshoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidsshoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
