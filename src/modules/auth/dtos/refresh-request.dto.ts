import { IsNotEmpty } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class RefreshTokenDto {
	@IsNotEmpty({ message: i18nValidationMessage("validation.isNotEmpty") })
	refreshToken: string;
}
