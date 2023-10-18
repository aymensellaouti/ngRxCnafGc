import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  TestPipePureComponent } from './test-pipe-pure.component';

describe('TestPipeImpureComponent', () => {
  let component: TestPipePureComponent;
  let fixture: ComponentFixture<TestPipePureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPipePureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPipePureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
