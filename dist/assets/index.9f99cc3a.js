import{a as H,ae as X,p as r,S as n,$ as de,w as D,aq as le,ar as fe,Z as U,X as me,Y as I,cU as ge,cP as ye,as as oe,T as te,cV as he,aw as _e,ab as be,bS as ne,f as p,a5 as xe,L as Se,_ as K,a4 as re,cW as Ce,bg as Ie}from"./index.aff2e8c4.js";import{C as pe,R as Le}from"./index.79dd75aa.js";import{u as Pe}from"./useBreakpoint.6750cf66.js";import{r as ie}from"./responsiveObserve.5316f9fe.js";var we={avatar:n.any,description:n.any,prefixCls:n.string,title:n.any},Oe=H({name:"AListItemMeta",props:we,displayName:"AListItemMeta",__ANT_LIST_ITEM_META:!0,slots:["avatar","description","title"],setup:function(e,_){var a=_.slots,s=X("list",e),g=s.prefixCls;return function(){var L,b,i,w,O,d,y="".concat(g.value,"-item-meta"),l=(L=e.title)!==null&&L!==void 0?L:(b=a.title)===null||b===void 0?void 0:b.call(a),o=(i=e.description)!==null&&i!==void 0?i:(w=a.description)===null||w===void 0?void 0:w.call(a),m=(O=e.avatar)!==null&&O!==void 0?O:(d=a.avatar)===null||d===void 0?void 0:d.call(a),x=r("div",{class:"".concat(g.value,"-item-meta-content")},[l&&r("h4",{class:"".concat(g.value,"-item-meta-title")},[l]),o&&r("div",{class:"".concat(g.value,"-item-meta-description")},[o])]);return r("div",{class:y},[m&&r("div",{class:"".concat(g.value,"-item-meta-avatar")},[m]),(l||o)&&x])}}}),ue=Symbol("ListContextKey"),ze=globalThis&&globalThis.__rest||function(v,e){var _={};for(var a in v)Object.prototype.hasOwnProperty.call(v,a)&&e.indexOf(a)<0&&(_[a]=v[a]);if(v!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,a=Object.getOwnPropertySymbols(v);s<a.length;s++)e.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(v,a[s])&&(_[a[s]]=v[a[s]]);return _},Me={prefixCls:n.string,extra:n.any,actions:n.array,grid:n.any,colStyle:n.style},je=H({name:"AListItem",inheritAttrs:!1,Meta:Oe,props:Me,slots:["actions","extra"],setup:function(e,_){var a=_.slots,s=_.attrs,g=de(ue,{grid:D(),itemLayout:D()}),L=g.itemLayout,b=g.grid,i=X("list",e),w=i.prefixCls,O=function(){var l,o=((l=a.default)===null||l===void 0?void 0:l.call(a))||[],m;return o.forEach(function(x){ge(x)&&!ye(x)&&(m=!0)}),m&&o.length>1},d=function(){var l,o,m=(l=e.extra)!==null&&l!==void 0?l:(o=a.extra)===null||o===void 0?void 0:o.call(a);return L.value==="vertical"?!!m:!O()};return function(){var y,l,o,m,x,V=s.class,E=ze(s,["class"]),h=w.value,M=(y=e.extra)!==null&&y!==void 0?y:(l=a.extra)===null||l===void 0?void 0:l.call(a),B=(o=a.default)===null||o===void 0?void 0:o.call(a),u=(m=e.actions)!==null&&m!==void 0?m:le((x=a.actions)===null||x===void 0?void 0:x.call(a));u=u&&!Array.isArray(u)?[u]:u;var T=u&&u.length>0&&r("ul",{class:"".concat(h,"-item-action"),key:"actions"},[u.map(function(k,F){return r("li",{key:"".concat(h,"-item-action-").concat(F)},[k,F!==u.length-1&&r("em",{class:"".concat(h,"-item-action-split")},null)])})]),W=b.value?"div":"li",j=r(W,U(U({},E),{},{class:me("".concat(h,"-item"),I({},"".concat(h,"-item-no-flex"),!d()),V)}),{default:function(){return[L.value==="vertical"&&M?[r("div",{class:"".concat(h,"-item-main"),key:"content"},[B,T]),r("div",{class:"".concat(h,"-item-extra"),key:"extra"},[M])]:[B,T,fe(M,{key:"extra"})]]}});return b.value?r(pe,{flex:1,style:e.colStyle},{default:function(){return[j]}}):j}}}),Ae={gutter:n.oneOfType([n.number,n.arrayOf(Number)]),column:n.number,xs:n.number,sm:n.number,md:n.number,lg:n.number,xl:n.number,xxl:n.number},Ee=oe("small","default","large"),Te={bordered:n.looseBool,dataSource:n.array,extra:n.any,grid:n.shape(Ae).loose,itemLayout:n.oneOf(oe("horizontal","vertical")),loading:te(n.oneOfType([n.looseBool,n.object])),loadMore:n.any,pagination:te(n.oneOfType([n.shape(he()).loose,n.looseBool])),prefixCls:n.string,rowKey:n.any,renderItem:n.any,size:n.oneOf(Ee),split:n.looseBool,header:n.any,footer:n.any,locale:{type:Object}},P=H({name:"AList",Item:je,props:_e(Te,{dataSource:[],bordered:!1,split:!0,loading:!1,pagination:!1}),slots:["extra","loadMore","renderItem","header","footer"],setup:function(e,_){var a=_.slots,s,g;be(ue,{grid:ne(e,"grid"),itemLayout:ne(e,"itemLayout")});var L={current:1,total:0},b=X("list",e),i=b.prefixCls,w=b.direction,O=b.renderEmpty,d=p(function(){return e.pagination&&xe(e.pagination)==="object"?e.pagination:{}}),y=D((s=d.value.defaultCurrent)!==null&&s!==void 0?s:1),l=D((g=d.value.defaultPageSize)!==null&&g!==void 0?g:10);Se(d,function(){"current"in d.value&&(y.value=d.value.current),"pageSize"in d.value&&(l.value=d.value.pageSize)});var o=function(c){return function(f,S){y.value=f,l.value=S,d.value[c]&&d.value[c](f,S)}},m=o("onChange"),x=o("onShowSizeChange"),V=function(c){var f;return r("div",{class:"".concat(i.value,"-empty-text")},[((f=e.locale)===null||f===void 0?void 0:f.emptyText)||c("List")])},E=p(function(){return typeof e.loading=="boolean"?{spinning:e.loading}:e.loading}),h=p(function(){return E.value&&E.value.spinning}),M=p(function(){var t="";switch(e.size){case"large":t="lg";break;case"small":t="sm";break}return t}),B=p(function(){var t;return t={},I(t,"".concat(i.value),!0),I(t,"".concat(i.value,"-vertical"),e.itemLayout==="vertical"),I(t,"".concat(i.value,"-").concat(M.value),M.value),I(t,"".concat(i.value,"-split"),e.split),I(t,"".concat(i.value,"-bordered"),e.bordered),I(t,"".concat(i.value,"-loading"),h.value),I(t,"".concat(i.value,"-grid"),!!e.grid),I(t,"".concat(i.value,"-rtl"),w.value==="rtl"),t}),u=p(function(){var t=K(K(K({},L),{total:e.dataSource.length,current:y.value,pageSize:l.value}),e.pagination||{}),c=Math.ceil(t.total/t.pageSize);return t.current>c&&(t.current=c),t}),T=p(function(){var t=re(e.dataSource);return e.pagination&&e.dataSource.length>(u.value.current-1)*u.value.pageSize&&(t=re(e.dataSource).splice((u.value.current-1)*u.value.pageSize,u.value.pageSize)),t}),W=Pe(),j=p(function(){for(var t=0;t<ie.length;t+=1){var c=ie[t];if(W.value[c])return c}}),k=p(function(){if(!!e.grid){var t=j.value&&e.grid[j.value]?e.grid[j.value]:e.grid.column;if(t)return{width:"".concat(100/t,"%"),maxWidth:"".concat(100/t,"%")}}}),F=function(c,f,S){var z,A=(z=e.renderItem)!==null&&z!==void 0?z:a.renderItem;if(!A)return null;var C;return typeof e.rowKey=="function"?C=e.rowKey(f):typeof e.rowKey=="string"?C=f[e.rowKey]:C=f.key,C||(C="list-item-".concat(S)),c[S]=C,A({item:f,index:S})};return function(){var t,c,f,S,z,A,C,Y=(t=e.loadMore)!==null&&t!==void 0?t:(c=a.loadMore)===null||c===void 0?void 0:c.call(a),$=(f=e.footer)!==null&&f!==void 0?f:(S=a.footer)===null||S===void 0?void 0:S.call(a),Z=(z=e.header)!==null&&z!==void 0?z:(A=a.header)===null||A===void 0?void 0:A.call(a),J=le((C=a.default)===null||C===void 0?void 0:C.call(a)),Q=[],ce=!!(Y||e.pagination||$),ve=K(K({},B.value),I({},"".concat(i.value,"-something-after-last-item"),ce)),ee=e.pagination?r("div",{class:"".concat(i.value,"-pagination")},[r(Ce,U(U({},u.value),{},{onChange:m,onShowSizeChange:x}),null)]):null,q=h.value&&r("div",{style:{minHeight:"53px"}},null);if(T.value.length>0){var ae=T.value.map(function(N,G){return F(Q,N,G)}),se=ae.map(function(N,G){return r("div",{key:Q[G],style:k.value},[N])});q=e.grid?r(Le,{gutter:e.grid.gutter},{default:function(){return[se]}}):r("ul",{class:"".concat(i.value,"-items")},[ae])}else!J.length&&!h.value&&(q=V(O.value));var R=u.value.position||"bottom";return r("div",{class:ve},[(R==="top"||R==="both")&&ee,Z&&r("div",{class:"".concat(i.value,"-header")},[Z]),r(Ie,E.value,{default:function(){return[q,J]}}),$&&r("div",{class:"".concat(i.value,"-footer")},[$]),Y||(R==="bottom"||R==="both")&&ee])}}});P.install=function(v){return v.component(P.name,P),v.component(P.Item.name,P.Item),v.component(P.Item.Meta.name,P.Item.Meta),v};var Fe=P;export{Fe as L};