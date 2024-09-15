// hooks/useTranslation.ts
import { useRouter } from '@/navigation';
import { useTranslation as useNextTranslation } from 'next-i18next';

export const useTranslation = () => {
    const { t, i18n } = useNextTranslation();
    const router = useRouter();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);

        // Get the current pathname and query
        const { pathname, search } = window.location;

        // Construct the new URL
        const newPath = `/${lng}${pathname}`; // Prepend locale to the path

        // Redirect to the new locale URL
        router.push(`${newPath}${search}`);
    };

    return {
        t,
        i18n,
        changeLanguage,
    };
};
