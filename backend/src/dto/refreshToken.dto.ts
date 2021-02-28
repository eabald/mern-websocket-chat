import { IsString } from 'class-validator';

class RefreshTokenDto {
  @IsString()
  public refreshToken: string;

}

export default RefreshTokenDto;
