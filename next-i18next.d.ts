// types/next-i18next.d.ts
import 'next-i18next';

declare module 'next-i18next' {
    interface UseTranslationResponse {
        t: (key: string, options?: any) => string;
        i18n: {
            changeLanguage: (lng: string) => void;
        };
    }
}
