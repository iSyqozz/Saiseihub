(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
const blob = document.getElementById("blob");
const numCircles = 20;
const minSize = 20;
const maxSize = 100;
const minDuration = 1;
const maxDuration = 2;
const background = document.querySelector('.background');
function generate_glamour_behind() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.width = `${getRandomInt(minSize, maxSize)}px`;
        circle.style.height = circle.style.width;
        circle.style.left = `${getRandomInt(0, 100)}%`;
        circle.style.top = `${getRandomInt(0, 100)}%`;
        circle.style.animationDuration = `${getRandomInt(minDuration, maxDuration)}s`;
        background.appendChild(circle);
    }
}
setInterval(() => {
    while (background.lastElementChild) {
        background.removeChild(background.lastElementChild);
    }
    generate_glamour_behind();
}, 2000);
function getRandomChar() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return characters.charAt(Math.floor(Math.random() * characters.length));
}
const span1 = document.querySelector("#span1");
const span2 = document.querySelector("#span2");
const span3 = document.querySelector("#span3");
const span4 = document.querySelector("#span4");
const span5 = document.querySelector("#span5");
const span6 = document.querySelector("#span6");
const span7 = document.querySelector("#span7");
const span8 = document.querySelector("#span8");
const span9 = document.querySelector("#span9");
const span10 = document.querySelector("#span10");
const span11 = document.querySelector("#span11");
span1.addEventListener("mouseover", () => {
    span1.setAttribute('class', 'hovered');
    const original = span1.textContent;
    const interval = setInterval(() => {
        const currentChar = span1.textContent;
        const randomChar = getRandomChar();
        if (randomChar !== currentChar) {
            span1.textContent = randomChar;
        }
    }, 5);
    span1.addEventListener("mouseout", () => {
        clearInterval(interval);
        span1.textContent = original;
        span1.removeAttribute('hovered');
    });
});
span2.addEventListener("mouseover", () => {
    span2.setAttribute('class', 'hovered');
    const original = span2.textContent;
    const interval = setInterval(() => {
        const currentChar = span2.textContent;
        const randomChar = getRandomChar();
        if (randomChar !== currentChar) {
            span2.textContent = randomChar;
        }
    }, 5);
    span2.addEventListener("mouseout", () => {
        clearInterval(interval);
        span2.textContent = original;
        span2.removeAttribute('.hovered');
    });
});
span3.addEventListener("mouseover", () => {
    span3.setAttribute('class', 'hovered');
    const original = span3.textContent;
    const interval = setInterval(() => {
        const currentChar = span3.textContent;
        const randomChar = getRandomChar();
        if (randomChar !== currentChar) {
            span3.textContent = randomChar;
        }
    }, 5);
    span3.addEventListener("mouseout", () => {
        clearInterval(interval);
        span3.textContent = original;
        span3.removeAttribute('.hovered');
    });
});
span4.addEventListener("mouseover", () => {
    span4.setAttribute('class', 'hovered');
    const original = span4.textContent;
    const interval = setInterval(() => {
        const currentChar = span4.textContent;
        const randomChar = getRandomChar();
        if (randomChar !== currentChar) {
            span4.textContent = randomChar;
        }
    }, 5);
    span4.addEventListener("mouseout", () => {
        clearInterval(interval);
        span4.textContent = original;
        span4.removeAttribute('.hovered');
    });
});
span5.addEventListener("mouseover", () => {
    span5.setAttribute('class', 'hovered');
    const original = span5.textContent;
    const interval = setInterval(() => {
        const currentChar = span5.textContent;
        const randomChar = getRandomChar();
        if (randomChar !== currentChar) {
            span5.textContent = randomChar;
        }
    }, 5);
    span5.addEventListener("mouseout", () => {
        clearInterval(interval);
        span5.textContent = original;
        span5.removeAttribute('.hovered');
    });
});
span6.addEventListener("mouseover", () => {
    span6.setAttribute('class', 'hovered');
    const original = span6.textContent;
    const interval = setInterval(() => {
        const currentChar = span6.textContent;
        const randomChar = getRandomChar();
        if (randomChar !== currentChar) {
            span6.textContent = randomChar;
        }
    }, 5);
    span6.addEventListener("mouseout", () => {
        clearInterval(interval);
        span6.textContent = original;
        span6.removeAttribute('.hovered');
    });
});
span8.addEventListener("mouseover", () => {
    span8.setAttribute('class', 'hovered');
    const original = span8.textContent;
    const interval = setInterval(() => {
        const currentChar = span8.textContent;
        const randomChar = getRandomChar();
        if (randomChar !== currentChar) {
            span8.textContent = randomChar;
        }
    }, 5);
    span8.addEventListener("mouseout", () => {
        clearInterval(interval);
        span8.textContent = original;
        span8.removeAttribute('.hovered');
    });
});
span9.addEventListener("mouseover", () => {
    span9.setAttribute('class', 'hovered');
    const original = span9.textContent;
    const interval = setInterval(() => {
        const currentChar = span9.textContent;
        const randomChar = getRandomChar();
        if (randomChar !== currentChar) {
            span9.textContent = randomChar;
        }
    }, 5);
    span9.addEventListener("mouseout", () => {
        clearInterval(interval);
        span9.textContent = original;
        span9.removeAttribute('.hovered');
    });
});
span10.addEventListener("mouseover", () => {
    span10.setAttribute('class', 'hovered');
    const original = span10.textContent;
    const interval = setInterval(() => {
        const currentChar = span10.textContent;
        const randomChar = getRandomChar();
        if (randomChar !== currentChar) {
            span10.textContent = randomChar;
        }
    }, 5);
    span10.addEventListener("mouseout", () => {
        clearInterval(interval);
        span10.textContent = original;
        span10.removeAttribute('.hovered');
    });
});
span11.addEventListener("mouseover", () => {
    span11.setAttribute('class', 'hovered');
    const original = span11.textContent;
    const interval = setInterval(() => {
        const currentChar = span11.textContent;
        const randomChar = getRandomChar();
        if (randomChar !== currentChar) {
            span11.textContent = randomChar;
        }
    }, 5);
    span11.addEventListener("mouseout", () => {
        clearInterval(interval);
        span11.textContent = original;
        span11.removeAttribute('.hovered');
    });
});
const all_characters = document.querySelectorAll('.coming-soon span');
const soon = document.querySelector('.coming-soon');
setInterval(() => {
    soon.style.fontFamily = "'Rubik Glitch', cursive";
    soon.style.color = "rgb(25, 25, 26)";
    soon.style.textShadow = "1px 1px 10px white";
    setTimeout(() => {
        soon.style.fontFamily = "'Fira Mono', monospace";
        soon.style.color = "white";
        soon.style.textShadow = "";
    }, 800);
}, 3200);
document.body.onpointermove = event => {
    const { clientX, clientY } = event;
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`,
    }, { duration: 500, fill: "forwards" });
};

},{}]},{},[1]);
