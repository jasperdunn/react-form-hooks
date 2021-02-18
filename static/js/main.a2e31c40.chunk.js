(this["webpackJsonp@jasperdunn/react-form-hooks-example"]=this["webpackJsonp@jasperdunn/react-form-hooks-example"]||[]).push([[0],{9:function(e,r,t){"use strict";t.r(r);var n=t(0),o=t(1),a=t(3),s=t.n(a),l=function(){return(l=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var o in r=arguments[t])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e}).apply(this,arguments)};function u(e,r){for(var t=0;t<r.length;t++){var n=r[t](e);if(n)return n}}function i(e){var r=Object(o.useState)(e),t=r[0],n=r[1];return{formValues:t,resetFormValues:function(){return n(e)},resetInputValue:function(r){return function(e,r,t){var n=t[e];r((function(r){var t;return l(l({},r),((t={})[e]=n,t))}))}(r,n,e)},setInputValue:function(e,r){return function(e,r,t){var n,o=t;if("string"===typeof r)n=r;else{var a=r.target;n=a.name,o="checkbox"===a.type?a.checked:a.value}e((function(e){var r;return l(l({},e),((r={})[n]=o,r))}))}(n,e,r)},setFormValues:n}}function c(e){var r=Object(o.useState)({}),t=r[0],n=r[1];return{formErrors:t,numberOfErrors:Object.values(t).filter((function(e){return Boolean(e)})).length,validateForm:function(r){return function(e,r,t){if(!t)return!0;var n=Object.keys(t);if(0===n.length)return!0;for(var o={},a=0;a<n.length;a++){var s=n[a];o[s]=u(e[s],t[s])}return r(o),0===Object.values(o).filter((function(e){return Boolean(e)})).length}(r,n,e)},validateInputValue:function(r,t){return function(e,r,t,n){if(!t)return!0;var o,a=n;if("string"===typeof r?o=r:(o=r.target.name,a=r.target.value),!Object.prototype.hasOwnProperty.call(t,o))return!1;var s=u(a,t[o]);return e((function(e){var r;return l(l({},e),((r={})[o]=s,r))})),!1===Boolean(s)}(n,r,e,t)},clearFormErrors:function(){return n({})},clearInputError:function(e){return function(e,r){var t="string"===typeof e?e:e.target.name;r((function(e){var r;return l(l({},e),((r={})[t]=void 0,r))}))}(e,n)},setInputError:function(e,r){return n((function(t){var n;return l(l({},t),((n={})[e]=r,n))}))}}}function f(e){if(null===e||void 0===e||""===e||0===e||!1===e||"string"===typeof e&&0===e.length)return"This field is required."}function d(e){var r="Please enter a valid email address.";return e.length>=1&&e.length<=254&&/^.+@.+\..+$/.test(e)?void 0:r}function m(e){if(!1===(/[a-z]/.test(e)&&/[0-9]/.test(e)))return"Please use letters and numbers."}function v(e){var r=e.name,t=e.label,o=e.type,a=e.value,s=e.onChange,l=e.onBlur,u=e.error;return Object(n.jsxs)("div",{style:{margin:"20px 0"},children:[Object(n.jsx)("label",{htmlFor:r,children:t}),Object(n.jsx)("br",{}),Object(n.jsx)("input",{id:r,"data-testid":r,name:r,type:o,value:a,onChange:s,onBlur:l}),u&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("br",{}),Object(n.jsx)("div",{"data-testid":"".concat(r,"-error"),style:{color:"red",margin:"8px 0",padding:0,listStyle:"none"},children:u})]})]})}function p(e){var r=e.name,t=e.label,o=e.value,a=e.onChange,s=e.options,l=e.error;return Object(n.jsxs)("div",{style:{margin:"20px 0"},children:[Object(n.jsx)("div",{style:{marginBottom:"6px"},children:t}),Object(n.jsx)("div",{style:{marginLeft:"16px"},children:s.map((function(e){return Object(n.jsxs)("span",{style:{marginRight:"6px"},children:[Object(n.jsx)("label",{htmlFor:"".concat(r,"-").concat(e.value),children:e.label}),Object(n.jsx)("input",{id:"".concat(r,"-").concat(e.value),name:r,type:"radio",value:e.value,checked:e.value===o,onChange:a})]},e.value)}))}),l&&Object(n.jsx)("div",{style:{color:"red",margin:"8px 0",padding:0,listStyle:"none"},children:l})]})}function b(){var e=i({email:"",password:"",confirmPassword:"",iLoveHooks:""}),r=e.formValues,t=e.setInputValue,o=e.resetFormValues,a=e.resetInputValue,s=c({email:[f,d],password:[f,m,function(e){return function(e,r){if(e.length<r)return"Please use ".concat(r," or more characters.")}(e,6)}],confirmPassword:[f,function(e){return function(e,r,t){if(e!==r)return t}(e,r.password,"Passwords don't match")}],iLoveHooks:[f]}),l=s.formErrors,u=s.numberOfErrors,b=s.validateForm,j=s.validateInputValue,h=s.clearFormErrors,g=s.clearInputError;return Object(n.jsxs)("form",{onSubmit:function(e){e.preventDefault(),b(r)&&alert("Validation successful!")},noValidate:!0,children:[Object(n.jsx)("h1",{children:"Form with hooks"}),u>0&&Object(n.jsxs)("small",{children:[u," field",1!==u&&"s"," need",1===u&&"s"," your attention."]}),Object(n.jsx)(v,{name:"email",label:"Email - (validate on blur)",type:"email",value:r.email,onChange:t,onBlur:j,error:l.email}),Object(n.jsx)(v,{name:"password",label:"Password - (clear errors on blur)",type:"password",value:r.password,onChange:t,onBlur:g,error:l.password}),Object(n.jsx)(v,{name:"confirmPassword",label:"Confirm password",type:"password",value:r.confirmPassword,onChange:t,error:l.confirmPassword}),Object(n.jsx)(p,{name:"iLoveHooks",label:"I love hooks!",value:r.iLoveHooks,onChange:function(e){t(e),j(e)},options:[{label:"Yes",value:"yes"},{label:"Yes",value:"alsoYes"}],error:l.iLoveHooks}),Object(n.jsx)("button",{type:"submit",children:"Create some hooks!"}),Object(n.jsx)("button",{type:"button",onClick:function(){o(),h()},children:"Reset form"}),Object(n.jsx)("button",{type:"button",onClick:function(){return a("email")},children:"Reset email"}),Object(n.jsx)("button",{type:"button",onClick:function(){return g("email")},children:"Clear email errors"})]})}function j(){return Object(n.jsx)(b,{})}var h=document.getElementById("root");s.a.render(Object(n.jsx)(j,{}),h)}},[[9,1,2]]]);
//# sourceMappingURL=main.a2e31c40.chunk.js.map