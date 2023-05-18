import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCareDetailComponent } from './plant-care-detail.component';

describe('PlantCareDetailComponent', () => {
  let component: PlantCareDetailComponent;
  let fixture: ComponentFixture<PlantCareDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantCareDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantCareDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
