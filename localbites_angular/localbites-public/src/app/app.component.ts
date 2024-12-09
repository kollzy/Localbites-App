import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  locations: any[] = []; // Store fetched locations

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.http.get('http://localhost:3000/api/locations').subscribe({
      next: (data: any) => {
        this.locations = data; // Assign the fetched data to the locations array
        console.log('Locations:', this.locations); 
      },
      error: (err) => console.error('Error fetching locations:', err),
    });
  }
}
