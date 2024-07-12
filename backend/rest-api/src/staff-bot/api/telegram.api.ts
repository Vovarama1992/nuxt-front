export class TelegramAPI {
  constructor() {}

  async getFileURI(fileId: string) {
    const filePathURI = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`;
    const req = await fetch(filePathURI);
    const result: {
      ok: boolean;
      result: {
        file_id: string;
        file_size: number;
        file_path: string;
      };
    } = await req.json();

    return `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${result.result.file_path}`;
  }
}
