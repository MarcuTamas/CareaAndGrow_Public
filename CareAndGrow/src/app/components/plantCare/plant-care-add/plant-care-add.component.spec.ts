import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCareAddComponent } from './plant-care-add.component';

describe('PlantCareAddComponent', () => {
  let component: PlantCareAddComponent;
  let fixture: ComponentFixture<PlantCareAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantCareAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantCareAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
