import { Bot, InlineKeyboard } from "grammy";
import { Command } from "./command.class";
import { IAppContext } from "../context/context.interface";
import { ParseModeFlavor } from "@grammyjs/parse-mode";
import { TelegramAPI } from "../api/telegram.api";
import { ServiceAPI } from "../api/service.api";

export class PhotoCommand extends Command {
  constructor(
    readonly bot: Bot<ParseModeFlavor<IAppContext>>,
    private readonly telegramAPI: TelegramAPI,
    private readonly serviceAPI: ServiceAPI
  ) {
    super(bot);
  }

  handle(): void {
    this.bot.on("message:photo", async (ctx) => {
      for (const photo of ctx.message.photo) {
        const uri = await this.telegramAPI.getFileURI(photo.file_id);
        await this.serviceAPI.sendPhotoUri({
          photo_uri: uri,
          width: photo.width,
          height: photo.height,
          size: photo.file_size,
          telegram_file_id: photo.file_id,
          name: photo.file_unique_id,
          type: uri.split(".").at(-1),
        });
      }
    });
  }
}
