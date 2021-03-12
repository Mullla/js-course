(()=>{"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var t,n,r,o,a,c,i,l;c=document.getElementById("timer-hours"),i=document.getElementById("timer-minutes"),l=document.getElementById("timer-seconds"),function e(){var t,n,r,o=(t=(new Date("22 march 2021").getTime()-(new Date).getTime())/1e3,n=Math.floor(t%60),r=Math.floor(t/60%60),{timeRemaining:t,hours:Math.floor(t/60/60%24),minutes:r,seconds:n}),a=function(e){return e<10?"0"+e:e};c.textContent=a(o.hours),i.textContent=a(o.minutes),l.textContent=a(o.seconds),o.timeRemaining>0?setInterval(e,1e3):(c.textContent="00",c.style.color="crimson",i.textContent="00",i.style.color="crimson",l.textContent="00",l.style.color="crimson")}(),function(){var e=document.querySelector("menu");document.addEventListener("click",(function(n){var r=n.target;(r.closest("div.menu")||r.classList.contains("close-btn")||r.closest("li>a")||e.classList.contains("active-menu")&&!r.closest(".active-menu"))&&e.classList.toggle("active-menu"),t(n)}));var t=function(e){var t=e.target;if(t.closest("li>a")||t.closest("a>img")){e.preventDefault();var n=(t=t.closest("a")).getAttribute("href").substr(1);document.getElementById(n).scrollIntoView({behavior:"smooth",block:"start"})}}}(),function(){var e=document.querySelector(".popup");document.querySelectorAll(".popup-btn").forEach((function(n){n.addEventListener("click",(function(){document.documentElement.clientWidth>768?(e.style.display="block",t()):e.style.display="block"}))})),e.addEventListener("click",(function(t){var n=t.target;n.classList.contains("popup-close")?e.style.display="none":(n=n.closest(".popup-content"))||(e.style.display="none")}));var t=function(){var t,n=0;!function r(){n++,t=requestAnimationFrame(r),n<30?e.style.opacity=n/30:cancelAnimationFrame(t)}()}}(),r=document.querySelector(".service-header"),o=r.querySelectorAll(".service-header-tab"),a=document.querySelectorAll(".service-tab"),r.addEventListener("click",(function(e){var t=e.target;(t=t.closest(".service-header-tab"))&&o.forEach((function(e,n){e===t&&function(e){for(var t=0;t<a.length;t++)e===t?(a[t].classList.remove("d-none"),o[t].classList.add("active")):(a[t].classList.add("d-none"),o[t].classList.remove("active"))}(n)}))})),function(){var e=document.querySelector(".portfolio-content"),t=e.querySelectorAll(".portfolio-item");!function(e,t){var n=document.createElement("ul");n.classList.add("portfolio-dots"),e.append(n);for(var r=0;r<t;r++){var o=document.createElement("li");o.classList.add("dot"),n.append(o)}}(e,t.length);var n,r=e.querySelectorAll(".dot"),o=0,a=function(e,t,n){e[t].classList.remove(n)},c=function(e,t,n){e[t].classList.add(n)},i=function(){a(t,o,"portfolio-item-active"),a(r,o,"dot-active"),++o>=t.length&&(o=0),c(t,o,"portfolio-item-active"),c(r,o,"dot-active")},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;n=setInterval(i,e)};e.addEventListener("click",(function(e){e.preventDefault();var n=e.target;n.matches(".portfolio-btn, .dot")&&(a(t,o,"portfolio-item-active"),a(r,o,"dot-active"),n.matches("#arrow-right")?o++:n.matches("#arrow-left")?o--:n.matches(".dot")&&r.forEach((function(e,t){e===n&&(o=t)})),o>=t.length&&(o=0),o<0&&(o=t.length-1),c(t,o,"portfolio-item-active"),c(r,o,"dot-active"))})),e.addEventListener("mouseover",(function(e){(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(n)})),e.addEventListener("mouseout",(function(e){e.target.matches(".portfolio-btn, .dot")&&l(1500)})),l(1500)}(),(n=document.getElementById("command")).addEventListener("mouseover",(function(e){var n=e.target;n.classList.contains("command__photo")&&(t=n.src,n.src=n.dataset.img)})),n.addEventListener("mouseout",(function(e){var n=e.target;n.classList.contains("command__photo")&&(n.src=t)})),document.querySelectorAll('input[type="email"]').forEach((function(e){!function(e){e.addEventListener("input",(function(e){var t=e.target;t.value=t.value.replace(/[^a-z\@\*\-\_\.\!\~\']+/gi,""),t.addEventListener("blur",(function(){t.value=t.value.replace(/([^a-z\-\_\.\!\~\*\'@]+|^\-*|\-*$)/gi,"").replace(/\-{2,}/g,"-")}))}))}(e)})),function(){var e=document.querySelectorAll('input[name="user_name"]'),t=document.querySelector('input[name="user_message"]');e.forEach((function(e){e.addEventListener("input",(function(e){var t=e.target,r=t.value.replace(/[^а-яё\-\s]/gi,"");r=r.replace(/(\-|\s)\1{1,}/g,"$1"),t.value=r,t.addEventListener("blur",(function(){t.value=n(t)}))}))}));var n=function(e){var t=e.value.trim().split(" ");return(t=t.map((function(t){return"-"!==t.slice(0,1)&&"-"!==t.slice(-1)||(t="-"===t.slice(0,1)&&"-"!==t.slice(-1)?t.replace(/\-/,""):"-"===t.slice(-1)&&"-"!==t.slice(0,1)?t.substring(1,t.length-1):t.substring(1,t.length-1).replace(/\-/,"")),"user_name"===e.name&&(t=t.toUpperCase().slice(0,1)+t.toLowerCase().substring(1)),t}))).join(" ")};t.addEventListener("input",(function(e){var t=e.target;t.value=t.value.replace(/[^а-яё\s\-]/gi,""),t.addEventListener("blur",(function(){t.value=n(t)}))}))}(),document.querySelectorAll('input[type="text"].calc-item').forEach((function(e){return function(e){e.addEventListener("input",(function(e){var t=e.target;t.value=t.value.replace(/[^0-9]+/i,""),t.addEventListener("blur",(function(){t.value=t.value.replace(/[^\d]+/g,"")}))}))}(e)})),document.querySelectorAll('input[name="user_phone"]').forEach((function(e){!function(e){e.addEventListener("input",(function(e){var t=e.target;t.value=t.value.replace(/[^\d()\-]+/i,""),t.addEventListener("blur",(function(){t.value=t.value.replace(/([^\d\)\(\-]+|^\-*|\-*$)/g,"").replace(/\-{2,}/g,"-")}))}))}(e)})),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=document.querySelector(".calc-block"),n=t.querySelector(".calc-type"),r=t.querySelector(".calc-square"),o=t.querySelector(".calc-day"),a=t.querySelector(".calc-count"),c=document.getElementById("total"),i=function(e){var t=e.timing,n=e.draw,r=e.duration,o=performance.now();requestAnimationFrame((function e(a){var c=(a-o)/r;c>1&&(c=1);var i=t(c);n(i),c<1&&requestAnimationFrame(e)}))},l=function(){var t=0,l=1,u=1,s=n.options[n.selectedIndex].value,d=+r.value;a.value>1&&(l+=(a.value-1)/10),o.value&&o.value<5?u*=2:o.value&&o.value<10&&(u*=1.5),s&&d&&(t=e*d*s*l*u),i({duration:1e3,timing:function(e){return e},draw:function(e){c.textContent=Math.ceil(t*e)}})};t.addEventListener("change",(function(e){e.target.matches(".calc-type, .calc-square, .calc-day, .calc-count")&&l()}))}(),function(){var t=document.querySelectorAll("form"),n=document.createElement("div");n.style.cssText="font-size: 2rem; color: ghostwhite;";var r=new Set,o=function(t){var n,o=[],a=function(t,n){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,l=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var e=r.next();return i=e.done,e},e:function(e){l=!0,c=e},f:function(){try{i||null==r.return||r.return()}finally{if(l)throw c}}}}(t.elements);try{for(a.s();!(n=a.n()).done;){var c=n.value;"button"!==c.tagName.toLowerCase()&&"button"!==c.type&&o.push(c)}}catch(e){a.e(e)}finally{a.f()}o.forEach((function(e){var t,n,o,a,c;n=/[^\+\d+]/g,o=/[^а-яё\s]+/gi,a=/[^а-яё\s\.,:;\-\!\?\d]+/gi,c=(t=e).closest("form").querySelector(".form-btn"),t.addEventListener("input",(function(){"tel"===t.type?(t.value=t.value.replace(n,""),t.value.length<7||t.value.length>13?r.delete(t):r.add(t)):"user_name"===t.name?(t.value=t.value.replace(o,""),t.value.length<2?r.delete(t):r.add(t)):"user_message"===t.name&&(t.value=t.value.replace(a,"")),"email"===t.type&&(t.value?r.add(t):r.delete(t)),3===r.size?c.disabled=!1:c.disabled=!0}))}))};t.forEach((function(e){e.querySelector(".form-btn").disabled=!0,o(e),e.addEventListener("submit",(function(t){t.preventDefault(),e.append(n),n.innerHTML='<span class="loader"></span>';var r=c(e);a(r).then((function(e){if(200!==e.status)throw new Error("status network ".concat(e.status));n.textContent="Спасибо! Мы скоро с Вами свяжемся",setTimeout((function(){return n.remove()}),3e3)})).then((function(){setTimeout((function(){return document.querySelector(".popup").style.display="none"}),1e3)})).catch((function(e){n.textContent="Что-то пошло не так...",console.error(e)})),t.target.reset()}))}));var a=function(e){return fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})},c=function(e){var t=new FormData(e),n={};return t.forEach((function(e,t){n[t]=e})),n}}()})();