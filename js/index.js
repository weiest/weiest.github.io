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
