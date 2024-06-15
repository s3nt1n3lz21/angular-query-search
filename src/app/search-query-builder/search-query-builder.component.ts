import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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
  queries = [
    { field: '', condition: '', value: '' }
  ];

  constructor(private http: HttpClient) {}

  addQuery() {
    this.queries.push({ field: '', condition: '', value: '' });
  }

  removeQuery(index: number) {
    this.queries.splice(index, 1);
  }

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

  onFieldChange(index: number) {
    // Reset condition and value when the field changes
    this.queries[index].condition = '';
    this.queries[index].value = '';
  }

  onConditionChange(index: number) {
    // Reset value when the condition changes
    this.queries[index].value = '';
  }

  buildQuery() {
    return this.queries.map(query => {
      if (query.field && query.condition && query.value) {
        return `${query.field} ${query.condition} ${query.value}`;
      }
      return '';
    }).join(' AND ');
  }

  submitQuery() {
    const queryStr = this.buildQuery();
    this.http.post('your-api-endpoint', { query: queryStr }).subscribe(response => {
      console.log(response);
    });
}
}

// Possible Further Improvements
// Add validation to the form and queries
// Use a datepicker component for date fields
// Use an API Service with API Cache