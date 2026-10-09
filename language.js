
language = {
    Load : async function(){
        const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
        const langData = await getLanguageData(userLang);

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            element.innerHTML = langData[key];
        });
    }
}
