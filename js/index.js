"use strict";

const date = new Date();

const getCurrentTime = () => {
    return date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
};

const TimelineNowMessage = () => {
    const currentHour = date.getHours();
    if (currentHour < 8) {
        return "Probably having a good night's sleep";
    } else if (currentHour < 18) {
        return "Probably working";
    } else {
        return "Probably enjoying the rest of the day before bedtime";
    }
};

const generateDiv = (className) => {
    const div = document.createElement("div");
    div.className = className;
    return div;
};

const generateTextElement = (tag, text, className) => {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className !== undefined) element.className = className;
    return element;
};

const generateImg = (name, level, color, icon, className) => {
    var img = new Image();
    img.src = `https://img.shields.io/badge/${name}-${level}-${color.toLowerCase()}?style=for-the-badge&logoColor=white&logo=`;
    img.src += icon === "" ? name : icon;
    if (className !== undefined) img.className = className;
    img.alt = `${level}-${name}`;
    return img;
};

fetch("/json/skills.json", { headers: { Accept: "application/json" } })
    .then((response) => response.json())
    .then((json) => {
        for (const category in json) {
            let categoryDiv = generateDiv("col-md-6");
            categoryDiv.appendChild(generateTextElement("h2", category));
            for (const subcategory in json[category]) {
                categoryDiv.appendChild(
                    generateTextElement("span", subcategory, "lead")
                );
                let imageDiv = generateDiv("mt-1 mb-3");
                for (const skill of json[category][subcategory]) {
                    imageDiv.appendChild(
                        generateImg(
                            skill.name,
                            skill.level,
                            skill.color,
                            skill.icon,
                            "pe-1 pb-1"
                        )
                    );
                }
                categoryDiv.appendChild(imageDiv);
            }
            document.getElementById("skills").appendChild(categoryDiv);
        }
    });
