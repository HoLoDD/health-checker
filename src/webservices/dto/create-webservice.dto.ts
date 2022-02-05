import { ApiProperty } from '@nestjs/swagger';

export class CreateWebserviceDto {
  @ApiProperty({ example: 'Google', description: 'Name' })
  readonly name: string;

  @ApiProperty({ example: 'https://www.google.com', description: 'URL' })
  readonly url: string;

  @ApiProperty({
    example: '400',
    description: 'Maximum allowable latency value in ms',
  })
  readonly latency: number;

  @ApiProperty({
    example: '5',
    description: 'ID of user who will get notifications',
  })
  readonly userid: number;
}
