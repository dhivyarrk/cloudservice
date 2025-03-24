import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensaccessoriesComponent } from './womensaccessories.component';

describe('WomensaccessoriesComponent', () => {
  let component: WomensaccessoriesComponent;
  let fixture: ComponentFixture<WomensaccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomensaccessoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensaccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
