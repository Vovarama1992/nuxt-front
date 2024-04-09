import { Controller, Get } from '@nestjs/common';

@Controller('profiles')
export class ProfilesController {
  @Get('')
  async getProfiles() {
    return false;
  }

  @Get(':id')
  async getProfile() {
    return false;
  }
}
