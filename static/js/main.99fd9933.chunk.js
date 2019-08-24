(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{3:function(e,t,n){e.exports=n(9)},9:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(2),u=n.n(o);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);return Object.getOwnPropertySymbols&&n.push.apply(n,Object.getOwnPropertySymbols(e)),t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(n,!0).forEach(function(t){l(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var u,l=e[Symbol.iterator]();!(r=(u=l.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(i){a=!0,o=i}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function f(e,t){return t.map(function(t){return t(e)}).filter(function(e){return void 0!==e})}function m(e){var t=s(Object(r.useState)(e),2),n=t[0],a=t[1];return{formValues:n,resetFormValues:function(){return a(e)},resetInputValue:function(t){return function(e,t,n){var r=n[e];t(function(t){return c({},t,l({},e,r))})}(t,a,e)},updateInputValue:function(e){return function(e,t){var n=e.target,r=n.name,a="checkbox"===n.type?n.checked:n.value;t(function(e){return c({},e,l({},r,a))})}(e,a)},setInputValue:function(e,t){return function(e,t,n){var r=e,a=t;if(e.nativeEvent&&e.nativeEvent instanceof Event){r=e.target.name;var o=e.target;a="checkbox"===o.type?o.checked:o.value}n(function(e){return c({},e,l({},r,a))})}(e,t,a)},setFormValues:a}}function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(r.useMemo)(function(){return function(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++)n[t[r]]=[];return n}(e)},[e]),n=s(Object(r.useState)(t),2),a=n[0],o=n[1];return{formErrors:a,numberOfErrors:Object.values(a).filter(function(e){return e.length>0}).length,validateForm:function(t){return function(e,t,n){var r=Object.keys(n);if(0===r.length)return!0;for(var a={},o=0;o<r.length;o++){var u=r[o];a[u]=f(e[u],n[u])}return t(a),0===Object.values(a).filter(function(e){return e.length>0}).length}(t,o,e)},validateInputValue:function(t){return function(e,t,n,r){var a=e,o=t;if(e.nativeEvent&&e.nativeEvent instanceof Event&&(a=e.target.name,o=e.target.value),!r.hasOwnProperty(a))return!1;var u=f(o,r[a]);return n(function(e){return c({},e,l({},a,u))}),0===u.length}(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o,e)},clearFormErrors:function(){return o(t)},clearInputErrors:function(e){return function(e,t){var n="string"===typeof e?e:e.target.name;t(function(e){return c({},e,l({},n,[]))})}(e,o)},setInputErrors:function(e,t){return o(function(n){return c({},n,l({},e,t))})}}}function v(e){if(null===e||void 0===e||""===e)return"This field is required."}function d(e){return e.length>=1&&e.length<=254&&/^.+@.+\..+$/.test(e)?void 0:"Please enter a valid email address."}function b(e){if(!1===(/[a-z]/.test(e)&&/[0-9]/.test(e)))return"Please use letters and numbers."}function y(e){var t=e.id,n=e.label,r=e.type,o=e.value,u=e.onChange,l=e.onBlur,i=e.errors;return a.a.createElement("div",{style:{margin:"20px 0"}},a.a.createElement("label",{htmlFor:t},n),a.a.createElement("br",null),a.a.createElement("input",{id:t,"data-testid":t,name:t,type:r,value:o,onChange:u,onBlur:l}),a.a.createElement("br",null),i&&i.length>0&&a.a.createElement("ul",{"data-testid":"".concat(t,"-errors"),style:{color:"red",margin:"8px 0",padding:0,listStyle:"none"}},i.map(function(e,t){return a.a.createElement("li",{key:t},"- ",e)})))}function g(e){var t=e.id,n=e.label,r=e.value,o=e.onChange,u=e.options,l=e.errors;return a.a.createElement("div",{style:{margin:"20px 0"}},a.a.createElement("div",{style:{marginBottom:"6px"}},n),a.a.createElement("div",{style:{marginLeft:"16px"}},u.map(function(e){return a.a.createElement("span",{key:e.value,style:{marginRight:"6px"}},a.a.createElement("label",{htmlFor:"".concat(t,"-").concat(e.value)},e.label),a.a.createElement("input",{id:"".concat(t,"-").concat(e.value),name:t,type:"radio",value:e.value,checked:e.value===r,onChange:o}))})),l&&l.length>0&&a.a.createElement("ul",{style:{color:"red",margin:"8px 0",padding:0,listStyle:"none"}},l.map(function(e,t){return a.a.createElement("li",{key:t},"- ",e)})))}function h(){var e=m({email:"",password:"",confirmPassword:"",iLoveHooks:""}),t=e.formValues,n=e.setInputValue,r=e.updateInputValue,o=e.resetFormValues,u=e.resetInputValue,l=p({email:[v,d],password:[v,b,function(e){return function(e,t){if(e.length<t)return"Please use ".concat(t," or more characters.")}(e,6)}],confirmPassword:[v,function(e){return function(e,t){if(e!==t)return"Passwords don't match"}(e,t.password)}],iLoveHooks:[v]}),i=l.formErrors,c=l.numberOfErrors,s=l.validateForm,f=l.validateInputValue,h=l.clearFormErrors,E=l.clearInputErrors;return a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),s(t)&&alert("Validation successful!")},noValidate:!0},a.a.createElement("h1",null,"Form with hooks"),c>0&&a.a.createElement("small",null,c," field",1!==c&&"s"," need",1===c&&"s"," your attention."),a.a.createElement(y,{id:"email",label:"Email - (validate on blur)",type:"email",value:t.email,onChange:n,onBlur:f,errors:i.email}),a.a.createElement(y,{id:"password",label:"Password - (clear errors on blur)",type:"password",value:t.password,onChange:r,onBlur:E,errors:i.password}),a.a.createElement(y,{id:"confirmPassword",label:"Confirm password",type:"password",value:t.confirmPassword,onChange:r,errors:i.confirmPassword}),a.a.createElement(g,{id:"iLoveHooks",label:"I love hooks!",value:t.iLoveHooks,onChange:function(e){r(e),f(e)},options:[{label:"Yes",value:"yes"},{label:"Yes",value:"alsoYes"}],errors:i.iLoveHooks}),a.a.createElement("button",{type:"submit"},"Create some hooks!"),a.a.createElement("button",{type:"button",onClick:function(){o(),h()}},"Reset form"),a.a.createElement("button",{type:"button",onClick:function(){return u("email")}},"Reset email"),a.a.createElement("button",{type:"button",onClick:function(){return E("email")}},"Clear email errors"))}var E=document.getElementById("root");u.a.render(a.a.createElement(function(){return a.a.createElement(h,null)},null),E)}},[[3,1,2]]]);
//# sourceMappingURL=main.99fd9933.chunk.js.map