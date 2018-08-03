import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BrandsFormComponent } from "./form.component";

describe("FormComponent", () => {
  let component: BrandsFormComponent;
  let fixture: ComponentFixture<BrandsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrandsFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
