import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	constructor(private readonly i18n: I18nService) {}

	async catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const statusCode = exception.getStatus();

		let message = exception.getResponse() as {
			key: string;
			args: Record<string, any>;
		};

		message = await this.i18n.translate(message.key, {
			lang: host.switchToHttp().getRequest().i18nLang,
			args: message.args,
		});

		response.status(statusCode).json({ statusCode, message });
	}
}
