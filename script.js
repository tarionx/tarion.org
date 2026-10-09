
document.addEventListener("DOMContentLoaded", () => {
    // Mobile Nav
    const mobileNavButton = document.getElementById("mobile-nav-toggle");
    const mobileNav = document.getElementById("mobile-nav");

    mobileNavButton.addEventListener("click", () => {
        mobileNav.classList.toggle("active");
    })

    document.addEventListener("click", function(event) {
        const isInsideMobileNav = mobileNav.contains(event.target);
        const isClickToggle = mobileNavButton.contains(event.target);

        if (!isInsideMobileNav && !isClickToggle){
            mobileNav.classList.remove("active");
        }
    })

    document.addEventListener("touchstart", function(event) {
        const isInsideMobileNav = mobileNav.contains(event.target);
        const isClickToggle = mobileNavButton.contains(event.target);

        if (!isInsideMobileNav && !isClickToggle){
            mobileNav.classList.remove("active");
        }
    })

    const mobileNavLinks = mobileNav.querySelectorAll("a");
    mobileNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("active");
        })
    })
})

// Language support
async function getLanguageData(lang){
    if (!lang || lang === ""){
        lang = "en";
    }

    const response = await fetch(`languages/${lang}.json`);
    return response.json();
}


async function getProjectsData(){
    const response = await fetch(`projects.json`);
    return response.json();
}
async function getSkillsData(){
    const response = await fetch(`skills.json`);
    return response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
    const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
    const langData = await getLanguageData(userLang);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        element.innerHTML = langData[key];
    });

    // Load Projects from projects.json
    const projects = await getProjectsData();
    if (projects != null){
        for (var key in projects){
            var project = projects[key];

            var newProject = document.createElement("div");
            newProject.setAttribute("class", "project");

            var title = document.createElement("h1");
            title.setAttribute("data-i18n", key);
            newProject.appendChild(title);

            var description = document.createElement("p");
            description.setAttribute("data-i18n", project.description);
            newProject.appendChild(description);

            var projectSkills = document.createElement("ul");
            for (var skillKey in project.skills){
                var newSkill = document.createElement("li");
                newSkill.innerHTML = project.skills[skillKey];
                projectSkills.appendChild(newSkill);
            }
            newProject.appendChild(projectSkills);

            var projectLinks = document.createElement("ul");
            for (var projectKey in project.links){
                var newLink = document.createElement("li");
                projectLinks.appendChild(newLink);

                var button = document.createElement("a");
                button.setAttribute("href", project.links[projectKey].link);
                button.innerHTML = "<i class='" + project.links[projectKey].icon + "'></i>"
                newLink.appendChild(button);
            }
            newProject.appendChild(projectLinks);

            document.getElementsByClassName("projects")[0].appendChild(newProject);
        }
    }

    const skills = await getSkillsData();
    if (skills != null){
        var skillsList = document.getElementById("skills-list");

        for (var key in skills){
            var skillName = skills[key];
            
            var newSkill = document.createElement("li");
            newSkill.innerHTML = skillName;
            skillsList.appendChild(newSkill);
        }
    }
})