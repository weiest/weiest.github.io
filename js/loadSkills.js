"use strict";
import {generateElement} from '/js/common.js'

fetch("/json/skills.json", { headers: { Accept: "application/json" } })
    .then((response) => response.json())
    .then((json) => {
        const generateImg = (name, level, color, icon, className) => {
            var img = new Image();
            img.src = `https://img.shields.io/badge/${name}-${level}-${color.toLowerCase()}?style=for-the-badge&logoColor=white&logo=`;
            img.src += icon === "" ? name : icon;
            if (className !== null) img.className = className;
            img.alt = `${level}-${name}`;
            return img;
        };

        const skillsDiv = generateElement("div", null, "row g-5 mb-5");
        for (const column of json.columns) {
            let columnDiv = generateElement("div", null, "col-md-6");
            for (const category in column) {
                columnDiv.appendChild(generateElement("h2", category));
                for (const subcategory in column[category]) {
                    columnDiv.appendChild(
                        generateElement("span", subcategory, "lead")
                    );
                    let imageDiv = generateElement("div", null, "mt-1 mb-3");
                    for (const skill of column[category][subcategory]) {
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
                    columnDiv.appendChild(imageDiv);
                }
            }
            skillsDiv.appendChild(columnDiv);
        }
        return skillsDiv;
    })
    .then((skills) => {
        const mainDiv = document.getElementById("skills");
        mainDiv.innerHTML = `
                <strong>Beginner</strong>: Self taught or unconfident <br>
                <strong>Intermediate</strong>: Taught in classes or have work/project experience in the skill<br>
                <strong>Advance</strong>: Confident with knowledge, preferred, and/or long experience with skill.
                <hr class="col-3 col-md-2">
            `;
        mainDiv.appendChild(skills);
    });
