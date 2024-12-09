import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

const appConfig = {
  imports: [AppComponent],  // Only import the component
  providers: [provideHttpClient()]  // Provide the HttpClient
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
