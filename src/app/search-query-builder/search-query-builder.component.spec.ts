import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQueryBuilderComponent } from './search-query-builder.component';

describe('SearchQueryBuilderComponent', () => {
  let component: SearchQueryBuilderComponent;
  let fixture: ComponentFixture<SearchQueryBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchQueryBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchQueryBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
