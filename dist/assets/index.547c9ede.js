import{ax as h,a as x,$ as g,a0 as y,f as l,Y as r,aq as C,p as d}from"./index.f0dfd67a.js";var P={prefixCls:String,type:{type:String,default:"horizontal"},dashed:{type:Boolean,default:!1},orientation:{type:String,default:"center"},plain:{type:Boolean,default:!1}},m=x({name:"ADivider",props:P,setup:function(t,s){var o=s.slots,c=g("configProvider",y),i=l(function(){return c.getPrefixCls("divider",t.prefixCls)}),v=l(function(){var e,a=t.type,u=t.dashed,p=t.plain,n=i.value;return e={},r(e,n,!0),r(e,"".concat(n,"-").concat(a),!0),r(e,"".concat(n,"-dashed"),!!u),r(e,"".concat(n,"-plain"),!!p),r(e,"".concat(n,"-rtl"),c.direction==="rtl"),e}),f=l(function(){return t.orientation.length>0?"-"+t.orientation:t.orientation});return function(){var e,a=C((e=o.default)===null||e===void 0?void 0:e.call(o));return d("div",{class:[v.value,a.length?"".concat(i.value,"-with-text ").concat(i.value,"-with-text").concat(f.value):""],role:"separator"},[a.length?d("span",{class:"".concat(i.value,"-inner-text")},[a]):null])}}}),w=h(m);export{w as D};