import{d as O,i as w,s as C,a as c,u as r,b as s,F as l,k as f,f as n,w as o,r as m,o as t,c as S,h as d,g as k,p as x,l as B,E as T,_ as V}from"./index-xefsen5L.js";const I=a=>(x("data-v-d837b32d"),a=a(),B(),a),N=I(()=>s("h1",null,"Orders",-1)),E={key:0,class:"cart"},P={class:"cart-list"},F={class:"cart-total-content"},$={class:""},D={key:1,class:"cart-block"},L=O({__name:"OrdersView",setup(a){const e=w();C(async()=>{await e.fetchProducts(),e.getTotal()});const y=()=>{e.checkout(),v()},g=i=>{e.cancelOrder(i)},v=()=>{T.success({title:"Success",message:"The order has been successfully placed",showClose:!1})};return(i,M)=>{const _=m("el-card"),u=m("el-button");return t(),c(l,null,[N,r(e).getOrders.length>0?(t(),c("div",E,[s("div",P,[(t(!0),c(l,null,f(r(e).getOrders,p=>(t(),S(_,{class:"cart-item",key:p.id},{default:o(()=>[(t(!0),c(l,null,f(p.products,(h,b)=>(t(),c("div",{class:"cart-item-body",key:b},[s("h3",null,d(h.title),1),s("p",null,d(h.price)+"$",1)]))),128))]),_:2},1024))),128))]),n(_,{class:"cart-total"},{default:o(()=>[s("div",F,[s("div",$,[n(u,{type:"primary",onClick:y},{default:o(()=>[k("Place an order")]),_:1}),n(u,{type:"primary",onClick:g},{default:o(()=>[k("Cancel")]),_:1})]),s("h3",null,"Сумма: "+d(r(e).getTotalPrice)+"$",1)])]),_:1})])):(t(),c("div",D,"There are no orders"))],64)}}}),q=V(L,[["__scopeId","data-v-d837b32d"]]);export{q as default};
