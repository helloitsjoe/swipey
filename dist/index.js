!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.swipey=t():e.swipey=t()}(self,(function(){return(()=>{"use strict";var e={207:(e,t,o)=>{o.r(t),o.d(t,{Directions:()=>c,Types:()=>u,default:()=>a});var n=["delta","timeout","fromTop","element","logger"],r=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.logger,o=void 0===t?console:t,r=0,i=Object.keys(e);r<i.length;r++){var c=i[r];n.includes(c)||o.warn("".concat(c," is not a valid option"))}},i=function(){return Date.now()},c={DOWN:"DOWN",UP:"UP",LEFT:"LEFT",RIGHT:"RIGHT"},u={SWIPE:"SWIPE",DRAG:"DRAG"},d=c.DOWN,l=c.UP,s=c.LEFT;function a(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};r(o);var n,c,u,a,f,p,v=o.delta,y=void 0===v?100:v,m=o.timeout,g=void 0===m?1/0:m,h=o.fromTop,b=void 0!==h&&h,T=o.element,E=void 0===T?document:T,O=function(e){u=e.touches[0].clientX,a=e.touches[0].clientY,f=window.scrollY,p=i()},P=function(o){var r,v;n=o.changedTouches[0].clientX,c=o.changedTouches[0].clientY,(!b||0===f)&&(r=e===s?u-n:n-u,v=e===l?a-c:c-a,([l,d].includes(e)?v:r)>=y)&&i()-p<g&&t(o),p=null};return E.addEventListener("touchstart",O),E.addEventListener("touchend",P),function(){E.removeEventListener("touchstart",O),E.removeEventListener("touchend",P)}}}},t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={exports:{}};return e[n](r,r.exports,o),r.exports}return o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(207)})()}));
//# sourceMappingURL=index.js.map