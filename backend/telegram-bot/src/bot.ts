import { Telegraf } from "telegraf";

interface ResponseFilePath {
  ok: boolean;
  result: {
    file_id: string;
    file_size: number;
    file_path: string;
  }
}

export class Bot {
  private bot;

  constructor(private readonly token: string) {
    this.bot = new Telegraf(token);
  }

  async run() {
    await this.bot.launch();
  }

  mount() {
    this.bot.start(async (ctx) => await ctx.reply("Hello!"));

    this.bot.on('photo', async (ctx) => {
      for (const photo of ctx.message.photo) {
        const filePath = await this.getFileLink(photo.file_id);
        const stream = await this.getFileStream(filePath);

        await fetch('http://localhost:3000/v1/dashboard/photos', {
          method: 'POST',
          body: stream,
          ...{ duplex: 'half' }
        })
      }
    });
  }

  private async getFileLink(fileId: string) {
    const filePathURI = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`;

    const req = await fetch(filePathURI);
    const result: ResponseFilePath = await req.json();

    return `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${result.result.file_path}`
  }

  private async getFileStream(uri: string) {
    return (await fetch(uri)).body;
  } 
}