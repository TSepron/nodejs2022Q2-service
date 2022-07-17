import { IsUUID } from 'class-validator';

export class ParamIdDto {
  @IsUUID(4)
  id: string;
}
