import{M as i,a as r,dn as l,b as p,f as m,aD as d,o as c,i as u,n as f,t as g,p as _,aE as b,r as v}from"./index.f0dfd67a.js";import{b as y}from"./index.10080a06.js";import"./index.bf34ba50.js";import"./FullscreenOutlined.bfd6238d.js";import"./index.2c22f6b2.js";import"./useWindowSizeFn.cec00f90.js";import"./useContentViewHeight.b68240d5.js";import"./useSortable.bda28dd1.js";import"./baseIteratee.2ce74701.js";import"./baseIsEqual.538f0df1.js";import"./get.8e29890b.js";import"./index.3f087296.js";import"./warning.a6acd733.js";import"./lock.e097928c.js";import"./ArrowLeftOutlined.eb21fe54.js";import"./isEqual.e968232d.js";import"./index.547c9ede.js";const C=r({name:"SelectItem",components:{Select:l},props:{event:{type:Number},disabled:{type:Boolean},title:{type:String},def:{type:[String,Number]},initValue:{type:[String,Number]},options:{type:Array,default:()=>[]}},setup(e){const{prefixCls:t}=p("setting-select-item"),a=m(()=>e.def?{value:e.def,defaultValue:e.initValue||e.def}:{});function n(o){e.event&&y(e.event,o)}return{prefixCls:t,handleChange:n,getBindValue:a}}});function S(e,t,a,n,o,h){const s=d("Select");return c(),u("div",{class:v(e.prefixCls)},[f("span",null,g(e.title),1),_(s,b(e.getBindValue,{class:`${e.prefixCls}-select`,onChange:e.handleChange,disabled:e.disabled,size:"small",options:e.options}),null,16,["class","onChange","disabled","options"])],2)}var F=i(C,[["render",S],["__scopeId","data-v-6707e46b"]]);export{F as default};