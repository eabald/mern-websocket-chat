import { IsBoolean, IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public password: string;

  @IsBoolean()
  public terms: boolean;
}

export default CreateUserDto;
