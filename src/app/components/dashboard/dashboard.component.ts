import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface TableData {
  country: string;
  gender: string;
  ageGroup: string;
  [key: string]: string | number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['country', 'gender', 'ageGroup', '2019', '2020', '2021', '2022', '2023'];
  dataSource = new MatTableDataSource<TableData>();
  
  // Additional variables to store totals
  maleTotal: number = 0;
  femaleTotal: number = 0;
  country1Total: number = 0;
  country2Total: number = 0;

  ngOnInit() {
    const tableData: TableData[] = [
      { country: 'Country 1', gender: 'Male', ageGroup: 'Age 20-40', '2019': 4, '2020': 5, '2021': 3, '2022': 10, '2023': 3 },
      { country: 'Country 1', gender: 'Female', ageGroup: 'Age 20-40', '2019': 2, '2020': 3, '2021': 1, '2022': 5, '2023': 2 },
      { country: 'Country 2', gender: 'Male', ageGroup: 'Age 20-40', '2019': 3, '2020': 2, '2021': 4, '2022': 8, '2023': 1 },
      // ... add more data here ...
    ];
    this.dataSource.data = tableData;

    // Calculate totals
    this.calculateTotals();
  }

  private calculateTotals() {
    this.dataSource.data.forEach(row => {
      if (row.gender === 'Male') {
        this.maleTotal += this.sumRowValues(row);
      } else if (row.gender === 'Female') {
        this.femaleTotal += this.sumRowValues(row);
      }

      // You can adjust the conditions based on your specific requirements
      if (row.country === 'Country 1') {
        this.country1Total += this.sumRowValues(row);
      } else if (row.country === 'Country 2') {
        this.country2Total += this.sumRowValues(row);
      }
    });
  }

  private sumRowValues(row: TableData): number {
    return this.displayedColumns
      .filter(column => typeof row[column] === 'number')
      .reduce((sum, column) => sum + (row[column] as number), 0);
  }
}
