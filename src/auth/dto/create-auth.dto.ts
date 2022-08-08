import { IsDefined, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsDefined()
  login: string;
  @IsString()
  @IsDefined()
  password: string;
}
