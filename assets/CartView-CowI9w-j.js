import{d as k,i as g,t as $,r as m,o as c,c as b,w as s,u as a,a as l,b as e,e as T,f as i,g as p,h as d,_ as q,n as P,F as C,k as V,q as w,p as I,l as S}from"./index-Dy7WNRmG.js";const B={key:0,class:"card-header"},N=["src"],F={class:"card-body"},A={class:"card-footer"},D={class:"card-footer-content"},O={class:"card-quantity"},R=k({__name:"ProductCart",props:{product:{}},setup(r){const o=g(),h=r,{product:t}=$(h),y=()=>{t.value.quantity&&(t.value.quantity++,o.getTotal())},f=()=>{t.value.quantity&&t.value.quantity>1&&(t.value.quantity--,o.getTotal())},v=u=>{o.removeFromCart(u)};return(u,_)=>{const n=m("el-button"),x=m("el-card");return c(),b(x,{class:"product"},{header:s(()=>[Array.isArray(a(t).images)&&a(t).images.length>0?(c(),l("div",B,[e("img",{src:a(t).images[0],alt:""},null,8,N)])):T("",!0)]),footer:s(()=>[e("div",A,[e("div",D,[i(n,{class:"card-button",type:"primary",onClick:y},{default:s(()=>[p(" +")]),_:1}),e("span",O,d(a(t).quantity),1),i(n,{class:"card-button",type:"primary",onClick:f},{default:s(()=>[p(" -")]),_:1})]),i(n,{class:"card-button",type:"primary",onClick:_[0]||(_[0]=J=>v(a(t)))},{default:s(()=>[p(" Delete")]),_:1})])]),default:s(()=>[e("div",F,[e("h3",null,d(a(t).title),1),e("div",{class:"card-text",ref:"card-text"},d(a(t).description),513),e("div",null,d(a(t).price)+"$",1)])]),_:1})}}}),E=q(R,[["__scopeId","data-v-c801c3f7"]]),L=r=>(I("data-v-794ae92b"),r=r(),S(),r),M=L(()=>e("h1",null," Cart",-1)),j={key:0,class:"cart"},z={class:"cart-total-content"},G={key:1,class:"cart-block"},H=k({__name:"CartView",setup(r){const o=g(),h=w(),t=P(()=>o.getTotalPrice),y=()=>{o.getToOrder(),h.push("/orders")};return(f,v)=>{const u=m("el-button"),_=m("el-card");return c(),l(C,null,[M,a(o).getCart.length>0?(c(),l("div",j,[(c(!0),l(C,null,V(a(o).getCart,n=>(c(),b(E,{key:n.id,product:n},null,8,["product"]))),128)),i(_,{class:"cart-total"},{default:s(()=>[e("div",z,[e("h3",null,"Сумма: "+d(t.value)+"$",1),i(u,{type:"primary",onClick:y},{default:s(()=>[p("Place an order")]),_:1},8,["onClick"])])]),_:1})])):(c(),l("div",G,"The basket is empty"))],64)}}}),Q=q(H,[["__scopeId","data-v-794ae92b"]]);export{Q as default};