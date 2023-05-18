import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsCareListComponent } from './plants-care-list.component';

describe('PlantsCareListComponent', () => {
  let component: PlantsCareListComponent;
  let fixture: ComponentFixture<PlantsCareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsCareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsCareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
