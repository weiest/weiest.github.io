const DEFAULT_SPEED = 200;
const DEFAULT_PERIOD = 2000;
const DEFAULT_WAIT = 500;

const random = function (a, b) {
    return Math.random() - 0.5;
};

class TypeWriter {
    constructor(element, contents, speed, period) {
        this.contents = contents;
        this.element = element;
        this.speed = parseInt(speed, 10) || DEFAULT_SPEED;
        this.period = parseInt(period, 10) || DEFAULT_PERIOD;
        this.loopNum = 0;
        this.txt = "";
        this.isDeleting = false;
        this.tick();
    }
    tick() {
        let that = this;
        let i = this.loopNum % this.contents.length;
        let fullTxt = this.contents[i];
        let delta = this.speed - Math.random() * 100;
        this.txt = fullTxt.substring(
            0,
            this.txt.length + (this.isDeleting ? -1 : 1)
        );
        this.element.innerHTML = '<span class="wrap">' + this.txt + "</span>";
        if (this.isDeleting) delta /= 2;
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = DEFAULT_WAIT;
        }
        setTimeout(function () {
            that.tick();
        }, delta);
    }
}

window.onload = function () {
    let elements = document.getElementsByClassName("typewriter");
    for (let element of elements) {
        let contents = element.getAttribute("data-contents");
        let speed = element.getAttribute("data-speed");
        let period = element.getAttribute("data-period");
        let parsed_content = JSON.parse(contents);
        if (element.hasAttribute("randomize")) parsed_content.sort(random);
        if (contents) {
            new TypeWriter(element, parsed_content, speed, period);
        }
    }
};
