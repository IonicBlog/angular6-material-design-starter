import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AdminLayoutComponent } from "./admin-layout.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("AdminLayoutComponent", () => {

  let fixture: ComponentFixture<AdminLayoutComponent>;
  let component: AdminLayoutComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [AdminLayoutComponent]
    });

    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
