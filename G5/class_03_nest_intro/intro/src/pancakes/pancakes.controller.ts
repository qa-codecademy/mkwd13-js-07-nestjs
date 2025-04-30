import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

interface Pancake {
  id: number;
  name: string;
  ingredients: string[];
  size: 's' | 'm' | 'l';
  weight: number;
}

type UpsertPancake = Omit<Pancake, 'id'>; // Insert + Update = Upsert
// type UpsertPancake = Pick<Pancake, 'name' | 'ingredients' | 'size' | 'weight'>;

// localhost:3000/pancakes/

@Controller('pancakes')
export class PancakesController {
  private pancakes: Pancake[] = [];

  // localhost:3000/pancakes/
  @Get()
  getPancakes(): Pancake[] {
    return this.pancakes;
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
}
