import { IsBoolean, IsInt, IsString, Length } from 'class-validator';

export class CreateCastMemberDto {
  @IsString()
  @Length(2, 50)
  characterName: string;

  @IsBoolean()
  isLeadRole: boolean;

  @IsInt()
  movieId: number;

  @IsInt()
  actorId: number;
}
