console.log("Insterted");
let style = `* {padding: 0px;margin: 0px;}#animatible {position: fixed;top:0px;right:0px;z-index: -2;visibility: hidden;height: 100vh;width: 100%;background-color: #333;display: flex;align-items: center;justify-content: center;flex-direction: row;background-color: transparent;animation: background 1ms forwards;}.ball {height: 15px;width: 15px;display: inline-block;background: yellow;border-radius: 50%;position: relative;animation-name: bounce;animation-duration: 0.8s;animation-direction: normal;animation-iteration-count: infinite;animation-direction: alternate-reverse;animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);animation-delay: 0s;}.ball:nth-child(1) {animation-delay: 0ms;}.ball:nth-child(2) {animation-delay: 100ms;}.ball:nth-child(3) {animation-delay: 190ms;}.ball:nth-child(4) {animation-delay: 290ms;}.ball:nth-child(5) {animation-delay: 185ms;}.ball:nth-child(6) {animation-delay: 100ms;}.ball:nth-child(7) {animation-delay: 10ms;}@keyframes background {0% {  background-color: transparent;z-index: 10000;}100% {  background-color: #333;  visibility: visible;  z-index: 10000;}}@keyframes bounce {0% {  display: inline-block;  transform: rotateY(40deg);  top: 0px;  background: yellow;  box-shadow: 0px 0px 1px 0px rgba(238, 241, 5, 0.603);}100% {  transform: rotateY(0deg);  display: inline-block;  top: -80px;  background: yellowgreen;  box-shadow: 0px 80px 5px 0px rgba(238, 241, 5, 0.603);}}`;
let loaderElement = document.createElement("div");
loaderElement.innerHTML += `<div id="animatible"><div class="background"><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div></div></div>`;
document.body.appendChild(loaderElement);
let styleELement = document.head.querySelector("style");
if (!styleELement) styleELement = document.createElement("style");
styleELement.append(style);
document.head.append(styleELement);

window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.removeChild(loaderElement);
  }, 1000);
});
