import{M as i,a as r,dm as l,b as p,f as m,aD as d,o as c,i as u,n as f,t as g,p as _,aE as b,r as v}from"./index.aff2e8c4.js";import{b as y}from"./index.5842b516.js";import"./index.24554a56.js";import"./FullscreenOutlined.549b485c.js";import"./index.c3bb32c6.js";import"./useWindowSizeFn.02b33eb1.js";import"./useContentViewHeight.c56364d6.js";import"./useSortable.5c65ce66.js";import"./_baseIteratee.1f2ebc4e.js";import"./_baseIsEqual.04f3a187.js";import"./get.508b0e6e.js";import"./index.0ed2b8df.js";import"./warning.a1617abb.js";import"./lock.c2030143.js";import"./ArrowLeftOutlined.051f2f97.js";import"./isEqual.1c6e29f5.js";import"./index.7fc15d81.js";const C=r({name:"SelectItem",components:{Select:l},props:{event:{type:Number},disabled:{type:Boolean},title:{type:String},def:{type:[String,Number]},initValue:{type:[String,Number]},options:{type:Array,default:()=>[]}},setup(e){const{prefixCls:t}=p("setting-select-item"),a=m(()=>e.def?{value:e.def,defaultValue:e.initValue||e.def}:{});function n(o){e.event&&y(e.event,o)}return{prefixCls:t,handleChange:n,getBindValue:a}}});function S(e,t,a,n,o,h){const s=d("Select");return c(),u("div",{class:v(e.prefixCls)},[f("span",null,g(e.title),1),_(s,b(e.getBindValue,{class:`${e.prefixCls}-select`,onChange:e.handleChange,disabled:e.disabled,size:"small",options:e.options}),null,16,["class","onChange","disabled","options"])],2)}var F=i(C,[["render",S],["__scopeId","data-v-6707e46b"]]);export{F as default};