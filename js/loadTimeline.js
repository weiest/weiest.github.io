"use strict";
import {generateElement} from '/js/common.js'

fetch("/json/timeline.json", { headers: { Accept: "application/json" } })
    .then((response) => response.json())
    .then((json) => {
        json.timeline.push({
            year: "Now",
            months: [
                {
                    month: "<span id='time'></span>",
                    events: [
                        {
                            icon: null,
                            event: "<span id='today'></span>",
                        },
                    ],
                },
            ],
        });
        json.timeline.push({
            year: "Future",
            months: [
                {
                    month: "???",
                    events: [
                        {
                            icon: null,
                            event: "Built a <a href='#top' style='text-decoration: none; color: inherit;'><span class='highlight'>Time Machine</span></a> to go back to the start.",
                        },
                    ],
                },
            ],
        });
        return json;
    })
    .then((json) => {
        const timelineDiv = generateElement("div", null, "timeline-div");
        for (const years of json.timeline) {
            let yearsSection = generateElement("section", null, "year");
            yearsSection.appendChild(generateElement("h3", years.year));
            for (const month of years.months) {
                let monthSection = generateElement("section");
                monthSection.appendChild(generateElement("h4", month.month));
                let eventUl = generateElement("ul", null, null);
                for (const event in month.events) {
                    let temp = month.events[event];
                    eventUl.appendChild(
                        generateElement("li", temp.event, temp.icon)
                    );
                }
                monthSection.appendChild(eventUl);
                yearsSection.appendChild(monthSection);
            }
            timelineDiv.appendChild(yearsSection);
        }

        return timelineDiv;
    })
    .then((timeline) => {
        const mainDiv = document.getElementById("timeline");
        mainDiv.innerHTML = ``;
        mainDiv.appendChild(timeline);
    })
    .then(() => {
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

        document.getElementById("time").innerText = getCurrentTime();
        document.getElementById("today").innerText = TimelineNowMessage();
    });
