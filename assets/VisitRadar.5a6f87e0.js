import{a as r,w as i,L as u,o as s,k as l,B as d,n,bB as m,j as f}from"./index.aff2e8c4.js";import{C as c}from"./index.9a7421d4.js";import"./index.0ed2b8df.js";import"./index.79dd75aa.js";import{u as h}from"./useECharts.6bcfcb32.js";import"./index.5b212262.js";import"./warning.a1617abb.js";import"./responsiveObserve.5316f9fe.js";const k=r({__name:"VisitRadar",props:{loading:Boolean,width:{type:String,default:"100%"},height:{type:String,default:"300px"}},setup(t){const a=t,e=i(null),{setOptions:o}=h(e);return u(()=>a.loading,()=>{a.loading||o({legend:{bottom:0,data:["\u8BBF\u95EE","\u8D2D\u4E70"]},tooltip:{},radar:{radius:"60%",splitNumber:8,indicator:[{text:"\u7535\u8111",max:100},{text:"\u5145\u7535\u5668",max:100},{text:"\u8033\u673A",max:100},{text:"\u624B\u673A",max:100},{text:"Ipad",max:100},{text:"\u8033\u673A",max:100}]},series:[{type:"radar",symbolSize:0,areaStyle:{shadowBlur:0,shadowColor:"rgba(0,0,0,.2)",shadowOffsetX:0,shadowOffsetY:10,opacity:1},data:[{value:[90,50,86,40,50,20],name:"\u8BBF\u95EE",itemStyle:{color:"#b6a2de"}},{value:[70,75,70,76,20,85],name:"\u8D2D\u4E70",itemStyle:{color:"#5ab1ef"}}]}]})},{immediate:!0}),(p,x)=>(s(),l(f(c),{title:"\u8F6C\u5316\u7387",loading:t.loading},{default:d(()=>[n("div",{ref_key:"chartRef",ref:e,style:m({width:t.width,height:t.height})},null,4)]),_:1},8,["loading"]))}});export{k as default};
