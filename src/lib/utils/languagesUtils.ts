import Router from 'next/router';

class LanguagesUtils {

    public getLanguages = () => {

        var rs = {
            "vi": {
                "title": "Tiếng Việt",
                "file_path": "/images/vi_rec.png"
            },
            "en": {
                "title": "English",
                "file_path": "/images/en_rec.png"
            }
        }

        return rs
    }

    public getLanguage(lan: string) {

        switch (lan) {
            case "en":
                return {
                    "title": "English",
                    "file_path": "/images/en_rec.png"
                }
            case "vi":
                return {
                    "title": "Tiếng Việt",
                    "file_path": "/images/vi_rec.png"
                }
            default:
                return {
                    "title": "Tiếng Việt",
                    "file_path": "/images/vi_rec.png"
                }
        }
    }

    public changeLanguage = (newLocale: string) => {
        Router.push(Router.pathname, Router.asPath, { locale: newLocale });
    }
}

const languagesUtils = new LanguagesUtils();
export default languagesUtils;



