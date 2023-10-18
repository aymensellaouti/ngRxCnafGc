import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CvComponent } from "./cv.component";
import { Spy, provideAutoSpy } from "jasmine-auto-spies";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SubscriberSpy, subscribeSpyTo } from "@hirez_io/observer-spy";

fdescribe("CvComponent", () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;
  /*  On a définit un espion un spy */
  let cvServiceSpy: Spy<CvService>;
  /* On a définit un éspion d'inscription */
  let cv$ObserverSpy: SubscriberSpy<Cv[]>;
  let juniors$ObserverSpy: SubscriberSpy<Cv[]>;
  let seniors$ObserverSpy: SubscriberSpy<Cv[]>;
  let fakeCvs: Cv[] = [
    new Cv(1, "aymen", "sellaouti", "teacher", "as.jpg", "1234", 40),
    new Cv(2, "nidhal", "jelassi", "enfant", "       ", "1234", 41),
    new Cv(2, "skander", "sellaouti", "enfant", "       ", "1234", 4),
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvComponent],
      providers: [provideAutoSpy(CvService)],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    cvServiceSpy = TestBed.inject<any>(CvService);
    cvServiceSpy.getCvs.and.nextWith(fakeCvs);
    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cv$ObserverSpy = subscribeSpyTo(component.cvs$);
    juniors$ObserverSpy = subscribeSpyTo(component.juniors$);
    seniors$ObserverSpy = subscribeSpyTo(component.seniors$);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should get All FakeCvs", () => {
    expect(cv$ObserverSpy.getLastValue()).toEqual(fakeCvs);
  });
  it("should get All Seniors", () => {
    expect(seniors$ObserverSpy.getLastValue()?.length).toEqual(2);
  });
  it("should get All Juniors", () => {
    expect(juniors$ObserverSpy.getLastValue()?.length).toEqual(1);
  });
});
