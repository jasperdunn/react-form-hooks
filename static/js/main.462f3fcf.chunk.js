(this["webpackJsonp@jasperdunn/react-form-hooks-example"]=this["webpackJsonp@jasperdunn/react-form-hooks-example"]||[]).push([[0],{3:function(e,t,r){e.exports=r(8)},8:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(2),l=r.n(o),u=function(){return(u=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function i(e,t){for(var r=0;r<t.length;r++){var n=t[r](e);if(n)return n}}function s(e,t,r){var n=Object.keys(r);if(0===n.length)return!0;for(var a={},o=0;o<n.length;o++){var l=n[o];a[l]=i(e[l],r[l])}return t(a),0===Object.values(a).filter((function(e){return Boolean(e)})).length}function c(e,t,r,n){var a,o=n;if("string"===typeof r?a=r:(a=r.target.name,o=r.target.value),!Object.prototype.hasOwnProperty.call(t,a))return!1;var l=i(o,t[a]);return e((function(e){var t;return u(u({},e),((t={})[a]=l,t))})),!1===Boolean(l)}function m(e){var t=Object(n.useState)(e),r=t[0],a=t[1];return{formValues:r,resetFormValues:function(){return a(e)},resetInputValue:function(t){return function(e,t,r){var n=r[e];t((function(t){var r;return u(u({},t),((r={})[e]=n,r))}))}(t,a,e)},setInputValue:function(e,t){return function(e,t,r){var n,a=r;if("string"===typeof t)n=t;else{var o=t.target;n=o.name,a="checkbox"===o.type?o.checked:o.value}e((function(e){var t;return u(u({},e),((t={})[n]=a,t))}))}(a,e,t)},setFormValues:a}}function f(e){void 0===e&&(e={});var t=Object(n.useMemo)((function(){return function(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++)r[t[n]]=void 0;return r}(e)}),[e]),r=Object(n.useState)(t),a=r[0],o=r[1];return{formErrors:a,numberOfErrors:Object.values(a).filter((function(e){return Boolean(e)})).length,isFormValid:function(t){return s(t,o,e)},isInputValid:function(t,r){return c(o,e,t,r)},validateForm:function(t){return s(t,o,e)},validateInputValue:function(t,r){return c(o,e,t,r)},clearFormErrors:function(){return o(t)},clearInputError:function(e){return function(e,t){var r="string"===typeof e?e:e.target.name;t((function(e){var t;return u(u({},e),((t={})[r]=void 0,t))}))}(e,o)},setInputError:function(e,t){return o((function(r){var n;return u(u({},r),((n={})[e]=t,n))}))}}}function p(e){if(null===e||void 0===e||""===e)return"This field is required."}function d(e){return e.length>=1&&e.length<=254&&/^.+@.+\..+$/.test(e)?void 0:"Please enter a valid email address."}function v(e){if(!1===(/[a-z]/.test(e)&&/[0-9]/.test(e)))return"Please use letters and numbers."}function b({name:e,label:t,type:r,value:n,onChange:o,onBlur:l,error:u}){return a.a.createElement("div",{style:{margin:"20px 0"}},a.a.createElement("label",{htmlFor:e},t),a.a.createElement("br",null),a.a.createElement("input",{id:e,"data-testid":e,name:e,type:r,value:n,onChange:o,onBlur:l}),u&&a.a.createElement(a.a.Fragment,null,a.a.createElement("br",null),a.a.createElement("div",{"data-testid":"".concat(e,"-error"),style:{color:"red",margin:"8px 0",padding:0,listStyle:"none"}},u)))}function h({name:e,label:t,value:r,onChange:n,options:o,error:l}){return a.a.createElement("div",{style:{margin:"20px 0"}},a.a.createElement("div",{style:{marginBottom:"6px"}},t),a.a.createElement("div",{style:{marginLeft:"16px"}},o.map(t=>a.a.createElement("span",{key:t.value,style:{marginRight:"6px"}},a.a.createElement("label",{htmlFor:"".concat(e,"-").concat(t.value)},t.label),a.a.createElement("input",{id:"".concat(e,"-").concat(t.value),name:e,type:"radio",value:t.value,checked:t.value===r,onChange:n})))),l&&a.a.createElement("div",{style:{color:"red",margin:"8px 0",padding:0,listStyle:"none"}},l))}function g(){const e=m({email:"",password:"",confirmPassword:"",iLoveHooks:""}),t=e.formValues,r=e.setInputValue,n=e.resetFormValues,o=e.resetInputValue,l=f({email:[p,d],password:[p,v,e=>function(e,t){if(e.length<t)return"Please use ".concat(t," or more characters.")}(e,6)],confirmPassword:[p,e=>function(e,t,r){if(e!==t)return r}(e,t.password,"Passwords don't match")],iLoveHooks:[p]}),u=l.formErrors,i=l.numberOfErrors,s=l.validateForm,c=l.validateInputValue,g=l.clearFormErrors,E=l.clearInputError;return a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),s(t)&&alert("Validation successful!")},noValidate:!0},a.a.createElement("h1",null,"Form with hooks"),i>0&&a.a.createElement("small",null,i," field",1!==i&&"s"," need",1===i&&"s"," your attention."),a.a.createElement(b,{name:"email",label:"Email - (validate on blur)",type:"email",value:t.email,onChange:r,onBlur:c,error:u.email}),a.a.createElement(b,{name:"password",label:"Password - (clear errors on blur)",type:"password",value:t.password,onChange:r,onBlur:E,error:u.password}),a.a.createElement(b,{name:"confirmPassword",label:"Confirm password",type:"password",value:t.confirmPassword,onChange:r,error:u.confirmPassword}),a.a.createElement(h,{name:"iLoveHooks",label:"I love hooks!",value:t.iLoveHooks,onChange:function(e){r(e),c(e)},options:[{label:"Yes",value:"yes"},{label:"Yes",value:"alsoYes"}],error:u.iLoveHooks}),a.a.createElement("button",{type:"submit"},"Create some hooks!"),a.a.createElement("button",{type:"button",onClick:function(){n(),g()}},"Reset form"),a.a.createElement("button",{type:"button",onClick:()=>o("email")},"Reset email"),a.a.createElement("button",{type:"button",onClick:()=>E("email")},"Clear email errors"))}function E(){return a.a.createElement(g,null)}const y=document.getElementById("root");l.a.render(a.a.createElement(E,null),y)}},[[3,1,2]]]);
//# sourceMappingURL=main.462f3fcf.chunk.js.map