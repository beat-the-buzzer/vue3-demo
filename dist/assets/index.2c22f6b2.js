import{a as h,aK as v,w as a,b as y,f as x,o as w,i as H,p as S,B,n as R,r as f,j as e,bB as u,bg as b,M as z}from"./index.f0dfd67a.js";import{u as C}from"./useWindowSizeFn.cec00f90.js";import{a as k}from"./useContentViewHeight.b68240d5.js";const L=["src"],$=h({__name:"index",props:{frameSrc:v.string.def("")},setup(p){const s=a(!0),m=a(50),i=a(window.innerHeight),r=a(),{headerHeightRef:d}=k(),{prefixCls:o}=y("iframe-page");C(l,150,{immediate:!0});const c=x(()=>({height:`${e(i)}px`}));function l(){const n=e(r);if(!n)return;const t=d.value;m.value=t,i.value=window.innerHeight-t;const g=document.documentElement.clientHeight-t;n.style.height=`${g}px`}function _(){s.value=!1,l()}return(n,t)=>(w(),H("div",{class:f(e(o)),style:u(c.value)},[S(e(b),{spinning:s.value,size:"large",style:u(c.value)},{default:B(()=>[R("iframe",{src:p.frameSrc,class:f(`${e(o)}__main`),ref_key:"frameRef",ref:r,onLoad:_},null,42,L)]),_:1},8,["spinning","style"])],6))}});var V=z($,[["__scopeId","data-v-179381bf"]]);export{V as default};