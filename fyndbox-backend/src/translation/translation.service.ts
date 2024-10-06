import { Injectable, OnModuleInit } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class TranslationService implements OnModuleInit {
  private translations: Record<string, any> = {};

  onModuleInit() {
    this.loadTranslations();
  }

  private loadTranslations() {
    const languages = ['en', 'sv'];

    languages.forEach((lang) => {
      try {
        const translationsPath = path.join(
          __dirname, // Adjust this based on how your dist folder is structured
          '..',
          '..',
          'node_modules',
          '@fyndbox',
          'shared',
          'constants',
          'i18n',
          `${lang}.json`,
        );

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const translations = require(translationsPath);
        this.translations[lang] = translations;
      } catch (error) {
        console.error(
          `Failed to load translations for language ${lang}: ${error}`,
        );
      }
      /*   try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const translations = require(
          `@fyndbox/Shared/constants/i18n/${lang}.json`,
        );
        this.translations[lang] = translations;
      } catch (error) {
        console.error(
          `Failed to load translations for language ${lang}: ${error}`,
        );
      } */
    });
  }

  getTranslation(
    key: string,
    lang: string = 'en',
    params?: Record<string, string>,
  ): string {
    const translation = this.translations[lang];

    if (!translation) {
      return `Missing translations for language: ${lang}`;
    }

    const keys = key.split('.');
    let currentPart = translation;

    for (const part of keys) {
      if (!currentPart || currentPart[part] === undefined) {
        return `Missing translation for ${key}`;
      }
      currentPart = currentPart[part];
    }

    let translatedString = currentPart;

    if (params) {
      Object.keys(params).forEach((paramKey) => {
        const regex = new RegExp(`{{${paramKey}}}`, 'g');
        translatedString = translatedString.replace(regex, params[paramKey]);
      });
    }

    return translatedString || `Missing translation for ${key}`;
  }
}
