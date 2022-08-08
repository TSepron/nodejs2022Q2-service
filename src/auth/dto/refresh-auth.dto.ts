import { IsDefined, IsString } from 'class-validator';

export class RefreshAuthDto {
  @IsString()
  @IsDefined()
  refreshToken: string; // uuid v4
}
