import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  locations: any[] = []; // Stores the fetched locations

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.fetchLocations();
  }

  // Fetch locations from the LocationService
  fetchLocations(): void {
    this.locationService.getLocations().subscribe(
      (data) => {
        this.locations = data;
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }
}


