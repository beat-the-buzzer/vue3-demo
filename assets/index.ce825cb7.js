import{a4 as j,p as f,s as R,ax as U,S as T,a as $,$ as M,a0 as z,w as N,x as q,L as W,V as y,K as G,cw as X,ek as Y,af as Z,f as B,_ as D,Y as O,Z as E,ag as J,dG as Q,df as K,M as tt,bH as x,bR as et,el as nt,b as rt,j as _,b_ as L,aD as b,o as S,i as ot,k as w,l as A,r as at,F as it}from"./index.f0dfd67a.js";import{c as V,u as st}from"./index.bf34ba50.js";import ct from"./SessionTimeoutLogin.963d6c8c.js";import{s as lt,g as ut}from"./scrollTo.b91ca773.js";import"./FullscreenOutlined.bfd6238d.js";import"./index.2c22f6b2.js";import"./useWindowSizeFn.cec00f90.js";import"./useContentViewHeight.b68240d5.js";import"./useSortable.bda28dd1.js";import"./baseIteratee.2ce74701.js";import"./baseIsEqual.538f0df1.js";import"./get.8e29890b.js";import"./index.3f087296.js";import"./warning.a6acd733.js";import"./lock.e097928c.js";import"./Login.ac7b8182.js";import"./LoginForm.3a6d46d7.js";import"./index.7b2a15b2.js";import"./index.e4f0febd.js";import"./index.696e4060.js";import"./responsiveObserve.d58acf45.js";import"./isEqual.e968232d.js";import"./useSize.fd3657e5.js";import"./index.547c9ede.js";import"./LoginFormTitle.f792bfe0.js";import"./GithubFilled.89dd7865.js";import"./index.34c1ff5f.js";import"./ForgetPasswordForm.940f1f76.js";import"./index.0f38e4f6.js";import"./RegisterForm.5e942220.js";import"./index.d506842c.js";import"./MobileForm.72f3e321.js";import"./QrCodeForm.61941bac.js";import"./download.bb32ecd2.js";function pt(e){var t,n=function(s){return function(){t=null,e.apply(void 0,j(s))}},r=function(){if(t==null){for(var s=arguments.length,c=new Array(s),a=0;a<s;a++)c[a]=arguments[a];t=requestAnimationFrame(n(c))}};return r.cancel=function(){return cancelAnimationFrame(t)},r}var mt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"}}]},name:"vertical-align-top",theme:"outlined"},ft=mt;function F(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?Object(arguments[t]):{},r=Object.keys(n);typeof Object.getOwnPropertySymbols=="function"&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(o){return Object.getOwnPropertyDescriptor(n,o).enumerable}))),r.forEach(function(o){vt(e,o,n[o])})}return e}function vt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var C=function(t,n){var r=F({},t,n.attrs);return f(R,F({},r,{icon:ft}),null)};C.displayName="VerticalAlignTopOutlined";C.inheritAttrs=!1;var gt=C,dt={visibilityHeight:T.number.def(400),duration:T.number.def(450),target:Function,prefixCls:T.string,onClick:T.func},Tt=$({name:"ABackTop",inheritAttrs:!1,props:dt,emits:["click"],setup:function(t,n){var r=n.slots,o=n.attrs,s=n.emit,c=M("configProvider",z),a=N(),l=q({visible:!1,scrollEvent:null}),m=function(){return a.value&&a.value.ownerDocument?a.value.ownerDocument:window},I=function(u){var p=t.target,v=p===void 0?m:p,g=t.duration;lt(0,{getContainer:v,duration:g}),s("click",u)},h=pt(function(i){var u=t.visibilityHeight,p=ut(i.target,!0);l.visible=p>u}),P=function(){var u=t.target,p=u||m,v=p();l.scrollEvent=K(v,"scroll",function(g){h(g)}),h({target:v})},k=function(){l.scrollEvent&&l.scrollEvent.remove(),h.cancel()};W(function(){return t.target},function(){k(),y(function(){P()})}),G(function(){y(function(){P()})}),X(function(){y(function(){P()})}),Y(function(){k()}),Z(function(){k()});var d=B(function(){return c.getPrefixCls("back-top",t.prefixCls)});return function(){var i,u,p=f("div",{class:"".concat(d.value,"-content")},[f("div",{class:"".concat(d.value,"-icon")},[f(gt,null,null)])]),v=D(D({},o),{onClick:I,class:(i={},O(i,"".concat(d.value),!0),O(i,"".concat(o.class),o.class),O(i,"".concat(d.value,"-rtl"),c.direction==="rtl"),i)}),g=l.visible?f("div",E(E({},v),{},{ref:a}),[((u=r.default)===null||u===void 0?void 0:u.call(r))||p]):null,H=J("fade");return f(Q,H,{default:function(){return[g]}})}}}),_t=U(Tt);const bt=$({name:"LayoutFeatures",components:{BackTop:_t,LayoutLockPage:V(()=>x(()=>import("./index.f52798d3.js"),["assets/index.f52798d3.js","assets/index.f0dfd67a.js","assets/index.6e4dac46.css","assets/LockPage.254bd799.js","assets/LockPage.592307e9.css","assets/lock.e097928c.js","assets/header.d801b988.js"])),SettingDrawer:V(()=>x(()=>import("./index.10080a06.js").then(function(e){return e.i}),["assets/index.10080a06.js","assets/index.5c7227e9.css","assets/index.f0dfd67a.js","assets/index.6e4dac46.css","assets/index.bf34ba50.js","assets/index.3fe8c93f.css","assets/FullscreenOutlined.bfd6238d.js","assets/index.2c22f6b2.js","assets/index.55076fdd.css","assets/useWindowSizeFn.cec00f90.js","assets/useContentViewHeight.b68240d5.js","assets/useSortable.bda28dd1.js","assets/_baseIteratee.2ce74701.js","assets/_baseIsEqual.538f0df1.js","assets/get.8e29890b.js","assets/index.3f087296.js","assets/index.d1fb21df.css","assets/warning.a6acd733.js","assets/lock.e097928c.js","assets/ArrowLeftOutlined.eb21fe54.js","assets/isEqual.e968232d.js","assets/index.547c9ede.js","assets/index.17eb4c41.css"])),SessionTimeoutLogin:ct},setup(){const{getUseOpenBackTop:e,getShowSettingButton:t,getSettingButtonPosition:n,getFullContent:r}=et(),o=nt(),{prefixCls:s}=rt("setting-drawer-fearure"),{getShowHeader:c}=st(),a=B(()=>o.getSessionTimeout),l=B(()=>{if(!_(t))return!1;const m=_(n);return m===L.AUTO?!_(c)||_(r):m===L.FIXED});return{getTarget:()=>document.body,getUseOpenBackTop:e,getIsFixedSettingDrawer:l,prefixCls:s,getIsSessionTimeout:a}}});function St(e,t,n,r,o,s){const c=b("LayoutLockPage"),a=b("BackTop"),l=b("SettingDrawer"),m=b("SessionTimeoutLogin");return S(),ot(it,null,[f(c),e.getUseOpenBackTop?(S(),w(a,{key:0,target:e.getTarget},null,8,["target"])):A("",!0),e.getIsFixedSettingDrawer?(S(),w(l,{key:1,class:at(e.prefixCls)},null,8,["class"])):A("",!0),e.getIsSessionTimeout?(S(),w(m,{key:2})):A("",!0)],64)}var ne=tt(bt,[["render",St]]);export{ne as default};
