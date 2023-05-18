import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCareDeleteComponent } from './plant-care-delete.component';

describe('PlantCareDeleteComponent', () => {
  let component: PlantCareDeleteComponent;
  let fixture: ComponentFixture<PlantCareDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantCareDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantCareDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
