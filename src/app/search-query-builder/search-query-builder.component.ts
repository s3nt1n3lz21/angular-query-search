import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-query-builder',
  templateUrl: './search-query-builder.component.html',
  styleUrls: ['./search-query-builder.component.scss']
})
export class SearchQueryBuilderComponent {
  fields = ['Title', 'Project', 'Assignee', 'Creator', 'Status', 'Created', 'Story Points', 'Hours Worked'];
  conditions = {
    text: ['Contains', 'Is', 'Is Not'],
    categorical: ['Is', 'Is Not'],
    date: ['=', '>', '<'],
    number: ['=', '>', '<']
  };

  searchQuery = '';
  queries: string[] = [];
  
  currentField = '';
  currentCondition = '';
  currentValue = '';

  constructor(private http: HttpClient) {}

  getConditions(field: string) {
    if (['Title', 'Assignee', 'Creator', 'Project'].includes(field)) {
      return this.conditions.text;
    } else if (field === 'Status') {
      return this.conditions.categorical;
    } else if (field === 'Created') {
      return this.conditions.date;
    } else if (['Story Points', 'Hours Worked'].includes(field)) {
      return this.conditions.number;
    }
    return [];
  }

  addQuery() {
    if (this.currentField && this.currentCondition && this.currentValue) {
      const query = `${this.currentField} ${this.currentCondition} ${this.currentValue}`;
      this.queries.push(query);
      this.updateSearchQuery();
      this.resetCurrentInputs();
    }
  }

  removeQuery(index: number) {
    this.queries.splice(index, 1);
    this.updateSearchQuery();
  }

  updateSearchQuery() {
    this.searchQuery = this.queries.join(' AND ');
  }

  resetCurrentInputs() {
    this.currentField = '';
    this.currentCondition = '';
    this.currentValue = '';
  }

  submitQuery() {
    const queryStr = this.searchQuery;
    this.http.post('api-endpoint', { query: queryStr }).subscribe(response => {
      console.log(response);
    });
  }
}


// Possible Further Improvements
// Add validation to the form and queries, e.g. that queries are complete.
// Allow the user to enter AND or OR queries, e.g. another field allowing them to select AND or OR.
// Use a datepicker component for date fields
// Use an API Service with API Cache