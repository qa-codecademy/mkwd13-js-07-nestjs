import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Next,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

interface Pancake {
  id: number;
  name: string;
  ingredients: string[];
  size: 's' | 'm' | 'l';
  weight: number;
}

type UpsertPancake = Omit<Pancake, 'id'>; // Insert + Update = Upsert
// type UpsertPancake = Pick<Pancake, 'name' | 'ingredients' | 'size' | 'weight'>;

interface PancakesSearchParams {
  minWeight: string;
  ingredient: string;
  size: 's' | 'm' | 'l';
}

// localhost:3000/pancakes/

@Controller('pancakes')
export class PancakesController {
  private pancakes: Pancake[] = [];

  // localhost:3000/pancakes/
  @Get()
  getPancakes(@Query() searchParams: PancakesSearchParams): Pancake[] {
    console.log('searchParams', searchParams);

    let filteredPancakes = [...this.pancakes];

    if (searchParams.minWeight) {
      filteredPancakes = filteredPancakes.filter(
        (p) => p.weight >= Number(searchParams.minWeight),
      );
    }

    if (searchParams.ingredient) {
      filteredPancakes = filteredPancakes.filter((p) =>
        p.ingredients.includes(searchParams.ingredient),
      );
    }

    if (searchParams.size) {
      filteredPancakes = filteredPancakes.filter(
        (p) => p.size === searchParams.size,
      );
    }

    return filteredPancakes;
  }

  // localhost:3000/pancakes/:id
  @Get('/:id')
  getPancakeById(@Param('id') id: string): Pancake | undefined {
    console.log('get by id', id);
    return this.pancakes.find((p) => p.id === Number(id));
  }

  // localhost:3000/pancakes/name/:name
  @Get('/name/:name')
  getPancakeByName(@Param('name') name: string) {
    console.log('get by name', name);
    return this.pancakes.find((p) => p.name === name);
  }

  // localhost:3000/pancakes/
  @Post()
  createPancake(@Body() bodyPancake: UpsertPancake): Pancake {
    console.log('aaa');
    const newPancake = {
      ...bodyPancake,
      id: Date.now(),
    } satisfies Pancake;

    this.pancakes.push(newPancake);

    return newPancake;
  }

  // localhost:3000/pancakes/:id
  @Put('/:id')
  updatePancake(
    @Body() updatePancakeData: UpsertPancake,
    @Param('id') id: string,
  ) {
    const pancakeIndex = this.pancakes.findIndex(
      (pancake) => pancake.id === parseInt(id),
    );

    const updatedPancake = {
      ...updatePancakeData,
      id: parseInt(id),
    } satisfies Pancake;

    this.pancakes[pancakeIndex] = updatedPancake;

    return updatedPancake;
  }

  @Patch('/:id')
  partiallyUpdatePancake(
    @Body() updatePancakeData: Partial<UpsertPancake>,
    @Param('id') id: string,
  ) {
    const pancakeIndex = this.pancakes.findIndex(
      (pancake) => pancake.id === parseInt(id),
    );

    const updatedPancake = {
      ...this.pancakes[pancakeIndex], // Get all info from the old pancake
      ...updatePancakeData, // apply changes from the new pancake
      id: parseInt(id),
    } satisfies Pancake;

    this.pancakes[pancakeIndex] = updatedPancake;

    return updatedPancake;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  deletePancake(@Param('id') id: string): void {
    this.pancakes = this.pancakes.filter((p) => p.id !== Number(id));
  }

  @Get('/count')
  getPancakeCount(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    console.log(req);
    // console.log(res);
    // return 0;
    res.status(200).json({
      count: 0,
    });
  }

  @Get('/test')
  @Header('X-Custom-Header', 'pancakes-test')
  testHeaders() {
    return {
      test: 'test',
    };
  }
}

// calcualteTwoNumbers(num1: number, num2: number) {
//   return num1 + num2
// }
// const a = 2
// const b = 3
// const ivo = 2
// const daniel = 3

// calcualteTwoNumbers(a, b)
// calcualteTwoNumbers(ivo, daniel)
