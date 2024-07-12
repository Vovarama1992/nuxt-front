import { PhotoMetaData } from './interfaces/service.interfaces';

export class ServiceAPI {
  private url: string;

  constructor() {
    this.url = process.env.SERVICE_API_URL;
  }

  async sendPhotoUri(metaData: PhotoMetaData): Promise<{ profile_id: number }> {
    try {
      const result = await fetch(`${this.url}/v1/dashboard/photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metaData),
      });

      return await result.json();
    } catch (err) {
      throw err;
    }
  }

  async signIn(telegramId: number): Promise<{ code: string }> {
    try {
      const result = await fetch(`${this.url}/v1/auth/sign-in/telegram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegram_id: telegramId,
        }),
      });

      return await result.json();
    } catch (err) {
      console.error(err);
      throw new Error('не удалось создать код для верификации');
    }
  }
}
