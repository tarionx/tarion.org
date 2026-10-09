
language = {
    getLanguageData : async function(lang, returns){
        if (!lang || lang === ""){
            lang = "en";
        }

        const response = await fetch(returns + "/languages/${lang}.json");
        console.log(returns);
        console.log(returns + "/languages/${lang}.json");
        return response.json();
    },
    Load : async function(returns = 0){
        const userLang = (navigator.language || navigator.userLanguage).split("-")[0];

        returnsPath = "";
        for (var i = 0; i < returns.length; i++){
            returnsPath += "../";
        }

        const langData = await language.getLanguageData(userLang, returnsPath);

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            element.innerHTML = langData[key];
        });
    }
}
