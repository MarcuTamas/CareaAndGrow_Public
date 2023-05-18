import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsCareListPreviewComponent } from './plants-care-list-preview.component';

describe('PlantsCareListPreviewComponent', () => {
  let component: PlantsCareListPreviewComponent;
  let fixture: ComponentFixture<PlantsCareListPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsCareListPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsCareListPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
