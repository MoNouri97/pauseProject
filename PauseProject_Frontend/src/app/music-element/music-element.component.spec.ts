import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicElementComponent } from './music-element.component';

describe('MusicElementComponent', () => {
  let component: MusicElementComponent;
  let fixture: ComponentFixture<MusicElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
