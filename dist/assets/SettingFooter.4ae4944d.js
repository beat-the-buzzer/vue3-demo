import{M as k,a as b,bL as h,b as R,c as v,b$ as M,v as O,bV as B,aD as l,o as T,i as $,p as o,B as i,C as p,t as u,r as A,eE as j,j as g,cc as f,er as D,es as F,G as N}from"./index.aff2e8c4.js";import{C as P}from"./CopyOutlined.084534de.js";import{R as V}from"./useSortable.5c65ce66.js";import"./_baseIteratee.1f2ebc4e.js";import"./_baseIsEqual.04f3a187.js";import"./get.508b0e6e.js";const w=b({name:"SettingFooter",components:{CopyOutlined:P,RedoOutlined:V},setup(){const e=h(),{prefixCls:d}=R("setting-footer"),{t:s}=v(),{createSuccessModal:m,createMessage:r}=N(),C=M(),c=O(),t=B();function a(){const{isSuccessRef:n}=j(JSON.stringify(g(t.getProjectConfig),null,2));g(n)&&m({title:s("layout.setting.operatingTitle"),content:s("layout.setting.operatingContent")})}function S(){try{t.setProjectConfig(f);const{colorWeak:n,grayMode:_}=f;D(n),F(_),r.success(s("layout.setting.resetSuccess"))}catch(n){r.error(n)}}function y(){localStorage.clear(),t.resetAllState(),e.resetState(),C.resetState(),c.resetState(),location.reload()}return{prefixCls:d,t:s,handleCopy:a,handleResetSetting:S,handleClearAndRedo:y}}});function x(e,d,s,m,r,C){const c=l("CopyOutlined"),t=l("a-button"),a=l("RedoOutlined");return T(),$("div",{class:A(e.prefixCls)},[o(t,{type:"primary",block:"",onClick:e.handleCopy},{default:i(()=>[o(c,{class:"mr-2"}),p(" "+u(e.t("layout.setting.copyBtn")),1)]),_:1},8,["onClick"]),o(t,{color:"warning",block:"",onClick:e.handleResetSetting,class:"my-3"},{default:i(()=>[o(a,{class:"mr-2"}),p(" "+u(e.t("common.resetText")),1)]),_:1},8,["onClick"]),o(t,{color:"error",block:"",onClick:e.handleClearAndRedo},{default:i(()=>[o(a,{class:"mr-2"}),p(" "+u(e.t("layout.setting.clearBtn")),1)]),_:1},8,["onClick"])],2)}var L=k(w,[["render",x],["__scopeId","data-v-2d4de409"]]);export{L as default};
