(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(1),u=n.n(o);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){l(e,t,n[t])})}return e}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var u,l=e[Symbol.iterator]();!(r=(u=l.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(i){a=!0,o=i}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(e,t){return t.map(function(t){return t(e)}).filter(function(e){return void 0!==e})}function f(e){var t=c(Object(r.useState)(e),2),n=t[0],a=t[1];return{formValues:n,resetFormValues:function(){return a(e)},resetInputValue:function(t){return function(e,t,n){var r=n[e];t(function(t){return i({},t,l({},e,r))})}(t,a,e)},updateInputValue:function(e){return function(e,t){var n=e.target,r=n.name,a="checkbox"===n.type?n.checked:n.value;t(function(e){return i({},e,l({},r,a))})}(e,a)},setInputValue:function(e,t){return a(function(n){return i({},n,l({},e,t))})},setFormValues:a}}function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=c(Object(r.useState)({}),2),n=t[0],a=t[1];return{formErrors:n,numberOfErrors:Object.values(n).filter(function(e){return e.length>0}).length,validateForm:function(t){return function(e,t,n){var r=Object.keys(n);if(0===r.length)return!0;for(var a={},o=0;o<r.length;o++){var u=r[o];a[u]=s(e[u],n[u])}return t(a),0===Object.values(a).filter(function(e){return e.length>0}).length}(t,a,e)},validateInputValue:function(t){return function(e,t,n){var r=e.target.name;if(n.hasOwnProperty(r)){var a=e.target.value;t(function(e){return i({},e,l({},r,s(a,n[r])))})}}(t,a,e)},clearFormErrors:function(){return a({})},clearInputErrors:function(e){return function(e,t){t(function(t){return i({},t,l({},e,[]))})}(e,a)},setInputErrors:function(e,t){return a(function(n){return i({},n,l({},e,t))})}}}function d(e){if(null===e||void 0===e||""===e)return"This field is required."}function p(e){if(!1===/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e))return"Please enter a valid email address."}function v(e){if(!1===(/[a-z]/.test(e)&&/[0-9]/.test(e)))return"Please use letters and numbers."}function b(e){var t=e.id,n=e.label,r=e.type,o=e.value,u=e.onChange,l=e.onBlur,i=e.errors;return a.a.createElement("div",{style:{margin:"20px 0"}},a.a.createElement("label",{htmlFor:t},n),a.a.createElement("br",null),a.a.createElement("input",{id:t,name:t,type:r,value:o,onChange:u,onBlur:l}),a.a.createElement("br",null),i&&a.a.createElement("ul",{style:{color:"red",margin:"8px 0",padding:0,listStyle:"none"}},i.map(function(e,t){return a.a.createElement("li",{key:t},"- ",e)})))}function y(e){var t=e.id,n=e.label,r=e.value,o=e.onChange,u=e.options,l=e.errors;return a.a.createElement("div",{style:{margin:"20px 0"}},a.a.createElement("div",{style:{marginBottom:"6px"}},n),a.a.createElement("div",{style:{marginLeft:"16px"}},u.map(function(e){return a.a.createElement("span",{key:e.value,style:{marginRight:"6px"}},a.a.createElement("label",{htmlFor:"".concat(t,"-").concat(e.value)},e.label),a.a.createElement("input",{id:"".concat(t,"-").concat(e.value),name:t,type:"radio",value:e.value,checked:e.value===r,onChange:o}))})),l&&a.a.createElement("ul",{style:{color:"red",margin:"8px 0",padding:0,listStyle:"none"}},l.map(function(e,t){return a.a.createElement("li",{key:t},"- ",e)})))}function E(){var e=f({email:"",password:"",confirmPassword:"",iLoveHooks:""}),t=e.formValues,n=e.updateInputValue,r=e.resetFormValues,o=e.resetInputValue,u=m({email:[d,p],password:[d,v,function(e){return function(e,t){if(e.length<t)return"Please use ".concat(t," or more characters.")}(e,6)}],confirmPassword:[d,function(e){return function(e,t){if(e!==t)return"Passwords don't match"}(e,t.password)}],iLoveHooks:[d]}),l=u.formErrors,i=u.numberOfErrors,c=u.validateForm,s=u.validateInputValue,E=u.clearFormErrors,h=u.clearInputErrors;return a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),c(t)&&alert("Validation successful!")},noValidate:!0},a.a.createElement("h1",null,"Form with hooks"),i>0&&a.a.createElement("small",null,i," field",1!==i&&"s"," need",1===i&&"s"," your attention."),a.a.createElement(b,{id:"email",label:"Email",type:"email",value:t.email,onChange:n,onBlur:s,errors:l.email}),a.a.createElement(b,{id:"password",label:"Password",type:"password",value:t.password,onChange:n,onBlur:s,errors:l.password}),a.a.createElement(b,{id:"confirmPassword",label:"Confirm password",type:"password",value:t.confirmPassword,onChange:n,onBlur:s,errors:l.confirmPassword}),a.a.createElement(y,{id:"iLoveHooks",label:"I love hooks!",value:t.iLoveHooks,onChange:function(e){n(e),s(e)},options:[{label:"Yes",value:"yes"},{label:"Yes",value:"alsoYes"}],errors:l.iLoveHooks}),a.a.createElement("button",{type:"submit"},"Create some hooks!"),a.a.createElement("button",{type:"button",onClick:function(){r(),E()}},"Reset form"),a.a.createElement("button",{type:"button",onClick:function(){return o("email")}},"Reset email"),a.a.createElement("button",{type:"button",onClick:function(){return h("email")}},"Clear email errors"))}var h=document.getElementById("root");u.a.render(a.a.createElement(function(){return a.a.createElement(E,null)},null),h)},2:function(e,t,n){e.exports=n(10)}},[[2,1,2]]]);
//# sourceMappingURL=main.11cd6c32.chunk.js.map