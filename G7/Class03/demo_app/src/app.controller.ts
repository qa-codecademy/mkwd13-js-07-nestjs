import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Decorator
/**
 * When we provide @Controller decorator to a class
 * we make that class a controller meaning that class can handle incoming requests and responses
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * app.get('/');
   */
  // localhost:3000
  @Get() 
  getHello(): string {
    // return this.appService.getHello();
    return "Hello from G7"
  }

  // localhost:3000/movies
  // app.get('/movies', (req, res) => {../rest of the code})
  @Get('/movies')
  getMovies(){
    return [{name: "Harry Potter"}, {name: "The Hobbit"}]
  }
}
