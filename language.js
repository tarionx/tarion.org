
language = {
    getLanguageData : async function(lang, basePath){
        if (!lang || lang === ""){
            lang = "en";
        }

        const url = '${basePath}languages/${lang}.json';
        const response = await fetch(url);
    
        return response.json();
    },
    Load : async function(returns = 0){
        const userLang = (navigator.language || navigator.userLanguage).split("-")[0];

        const basePath = returns > 0 ? "../".repeat(returns) : "./";
        const langData = await language.getLanguageData(userLang, basePath);

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            element.innerHTML = langData[key];
        });
    }
}
