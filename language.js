
function getURL() { 
    var arr = window.location.href.split("/"); 
    delete arr[arr.length - 1]; 
    return arr.join("/"); 
}

language = {
    getLanguageData : async function(lang){
        if (!lang || lang === ""){
            lang = "en";
        }

        const response = await fetch(getURL() + "/languages/${lang}.json");
        return response.json();
    },
    Load : async function(){
        const userLang = (navigator.language || navigator.userLanguage).split("-")[0];
        const langData = await language.getLanguageData(userLang);

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            element.innerHTML = langData[key];
        });
    }
}
