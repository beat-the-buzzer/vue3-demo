import{a as i,w as r,L as s,o as l,k as n,B as d,n as m,bB as u,j as f}from"./index.aff2e8c4.js";import{C as c}from"./index.9a7421d4.js";import"./index.0ed2b8df.js";import"./index.79dd75aa.js";import{u as h}from"./useECharts.6bcfcb32.js";import"./index.5b212262.js";import"./warning.a1617abb.js";import"./responsiveObserve.5316f9fe.js";const v=i({__name:"SaleRadar",props:{loading:Boolean,width:{type:String,default:"100%"},height:{type:String,default:"400px"}},setup(t){const e=t,a=r(null),{setOptions:o}=h(a);return s(()=>e.loading,()=>{e.loading||o({legend:{bottom:0,data:["Visits","Sales"]},tooltip:{},radar:{radius:"60%",splitNumber:8,indicator:[{text:"2017",max:100},{text:"2017",max:100},{text:"2018",max:100},{text:"2019",max:100},{text:"2020",max:100},{text:"2021",max:100}]},series:[{type:"radar",symbolSize:0,areaStyle:{shadowBlur:0,shadowColor:"rgba(0,0,0,.2)",shadowOffsetX:0,shadowOffsetY:10,opacity:1},data:[{value:[90,50,86,40,50,20],name:"Visits",itemStyle:{color:"#b6a2de"}},{value:[70,75,70,76,20,85],name:"Sales",itemStyle:{color:"#67e0e3"}}]}]})},{immediate:!0}),(p,x)=>(l(),n(f(c),{title:"\u9500\u552E\u7EDF\u8BA1",loading:t.loading},{default:d(()=>[m("div",{ref_key:"chartRef",ref:a,style:u({width:t.width,height:t.height})},null,4)]),_:1},8,["loading"]))}});export{v as default};
