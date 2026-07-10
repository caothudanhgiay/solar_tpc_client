import Router from 'next/router';

class LanguagesUtils {

    public getLanguages = () => {

        var rs = {
            "vi": {
                "title": "Tiếng Việt",
                "file_path": "/images/vi_rec.webp"
            },
            "en": {
                "title": "English",
                "file_path": "/images/en_rec.webp"
            }
        }

        return rs
    }

    public getLanguage(lan: string) {

        switch (lan) {
            case "en":
                return {
                    "title": "English",
                    "file_path": "/images/en_rec.webp"
                }
            case "vi":
                return {
                    "title": "Tiếng Việt",
                    "file_path": "/images/vi_rec.webp"
                }
            default:
                return {
                    "title": "Tiếng Việt",
                    "file_path": "/images/vi_rec.webp"
                }
        }
    }

    public changeLanguage = (newLocale: string) => {
        Router.push(Router.pathname, Router.asPath, { locale: newLocale });
    }
}

const languagesUtils = new LanguagesUtils();
export default languagesUtils;



