(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{31:function(e,a,t){},47:function(e,a,t){},58:function(e,a,t){e.exports=t(92)},63:function(e,a,t){},65:function(e,a,t){},90:function(e,a,t){},91:function(e,a,t){},92:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(23),c=t.n(l),o=(t(63),t(6)),s=t(19),u=t(5),m=t(15),i=(t(64),t(65),t(48)),p=t.n(i),E=t(17),f=(t(31),t(7)),d=t.n(f),h=function(e){var a=JSON.parse(localStorage.getItem("user")||"{}"),t=Object(n.useState)(!!e.likes.includes(a.username)),l=Object(o.a)(t,2),c=l[0],s=l[1],m=Object(u.g)(),i=Date.parse(e.timestamp),f=p()(i,"h:MMtt | dS mmm yyyy");return r.a.createElement(E.a,null,r.a.createElement("a",{href:"/profile/"+e.username},r.a.createElement("img",{alt:"Avatar",src:e.avatar})),r.a.createElement("div",{className:"card_text"},r.a.createElement("a",{href:"/profile/"+e.username},r.a.createElement("h2",null,"@",e.username)),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.text}}),r.a.createElement("ul",null,a.token&&r.a.createElement("p",{onClick:function(){var t={headers:{Authorization:"Bearer "+a.token}};d.a.post("/api/posts/"+e.id+"/like",{user:e.username},t).then((function(e){s(!c)}))}},c?"Unlike":"Like"),r.a.createElement("p",{onClick:function(){m.push("/post/"+e.id)}},"More")),r.a.createElement("h6",null,f)))},g=t(20),b=function(e){var a=Object(n.useState)([]),t=Object(o.a)(a,2),l=t[0],c=t[1],s=Object(n.useState)(10),u=Object(o.a)(s,2),m=u[0],i=u[1];Object(n.useEffect)((function(){d.a.get("/api/posts/"+m).then((function(e){c(e.data),e.data.forEach((function(e){d.a.get("/api/user/"+e.user).then((function(a){var t=a.data,n={avatar:t.avatar,follows:t.follows,username:t.username};e.user=n}))}))}))}),[]);return r.a.createElement(r.a.Fragment,null,l.map((function(e){return r.a.createElement(h,{key:e.id,id:e.id,username:e.user,text:e.content,likes:e.likes,avatar:e.avatar,timestamp:e.timestamp})})),r.a.createElement(g.a,{onClick:function(){d.a.get("/api/posts/"+(m+10)).then((function(e){c(e.data),i(m+10),e.data.forEach((function(e){d.a.get("/api/user/"+e.user).then((function(a){var t=a.data,n={avatar:t.avatar,follows:t.follows,username:t.username};e.user=n}))}))}))},style:{marginBottom:"15px"}},"Load More"))},v=t(21),O=t(10),j=function(e){return r.a.createElement("div",null,r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(v.a,null,r.a.createElement(O.a,{xs:4},e.user&&r.a.createElement(E.a,null,r.a.createElement("a",{href:"/profile/"+e.user.username},r.a.createElement("img",{src:e.user.avatar,alt:"Avatar"})),r.a.createElement("div",{className:"card_text"},r.a.createElement("a",{href:"/profile/"+e.user.username},r.a.createElement("h2",null,"@",e.user.username)),r.a.createElement("p",null,r.a.createElement("i",null,"Some information here coming soon")),r.a.createElement("p",null,"Followers: ",e.user.follows.length),r.a.createElement("p",null,"Following: ",e.user.follows.length)))),r.a.createElement(O.a,{xs:6},e.user&&r.a.createElement(S,{user:e.user}),r.a.createElement(b,null)),r.a.createElement(O.a,null))))},y=t(8),w=t(27),k=(t(47),function(e){var a=Object(n.useState)(""),t=Object(o.a)(a,2),l=t[0],c=t[1],s=Object(n.useState)(""),i=Object(o.a)(s,2),p=i[0],f=i[1],h=Object(n.useState)(!1),b=Object(o.a)(h,2),j=b[0],k=b[1],S=Object(u.g)(),x=e.user,C=e.setUser;return x?r.a.createElement(u.a,{to:"/home"}):r.a.createElement(m.a,null,r.a.createElement(v.a,null,r.a.createElement(O.a,null),r.a.createElement(O.a,{xs:6},r.a.createElement(E.a,null,r.a.createElement(y.a,{onSubmit:function(e){e.preventDefault(),d.a.post("/api/login",{username:l,password:p}).then((function(e){C(e.data),localStorage.setItem("user",JSON.stringify(e.data)),S.push("/home")})).catch((function(e){401===e.response.status&&k(!0)}))}},j&&r.a.createElement(w.a,{variant:"danger"},"Username and/or password incorrect."),r.a.createElement(y.a.Group,{controlId:"formBasicEmail"},r.a.createElement(y.a.Label,null,"Username"),r.a.createElement(y.a.Control,{type:"text",placeholder:"Enter username",onChange:function(e){return c(e.target.value)}})),r.a.createElement(y.a.Group,{controlId:"formBasicPassword"},r.a.createElement(y.a.Label,null,"Password"),r.a.createElement(y.a.Control,{type:"password",placeholder:"Enter password",value:p,onChange:function(e){return f(e.target.value)}})),r.a.createElement(g.a,{variant:"primary",type:"submit",block:!0},"Submit")),r.a.createElement(E.a.Link,{href:"/register",className:"registerLink"},"Don't have an account?"))),r.a.createElement(O.a,null)))}),S=(t(89),function(e){var a=Object(n.useState)(""),t=Object(o.a)(a,2),l=t[0],c=t[1],s=Object(n.useState)(!1),i=Object(o.a)(s,2),p=i[0],f=i[1],h=Object(u.g)(),b=function(){f(!p)};return e.user?p?r.a.createElement(m.a,null,r.a.createElement(v.a,{className:"d-flex justify-content-center"},r.a.createElement(O.a,{className:"align-items-center"},r.a.createElement(E.a,null,r.a.createElement(E.a.Body,null,r.a.createElement(g.a,{variant:"secondary",size:"sm",style:{float:"right",marginTop:"-5px"},onClick:b},"Hide"),r.a.createElement(y.a,{onSubmit:function(a){if(a.preventDefault(),l.length>0){var t={headers:{Authorization:"Bearer "+e.user.token}};d.a.post("/api/posts/create",{content:l},t).then((function(e){alert("Content posted!"),h.push("/"),c("")}))}}},r.a.createElement(y.a.Group,{controlId:"formUsername"},r.a.createElement(y.a.Label,null,"What do you want to say?"),r.a.createElement(y.a.Control,{name:"content",type:"text",placeholder:"Content",onChange:function(e){e.preventDefault();var a=e.target,t=a.name,n=a.value;switch(t){case"content":c(n)}},value:l})),r.a.createElement(g.a,{variant:"primary",type:"submit",className:"btn-block"},"Submit"))))))):r.a.createElement(m.a,null,r.a.createElement(E.a,{style:{paddingTop:"10px"}},r.a.createElement(E.a.Body,null,r.a.createElement(g.a,{variant:"primary",type:"submit",className:"btn-block",onClick:b},"Create a post")))):r.a.createElement("p",null,"Please log in to create a post")}),x=t(18),C=(t(90),function(e){var a=Object(u.g)();return r.a.createElement(x.a,{variant:"pills",activeKey:"1",id:"nav"},r.a.createElement("a",{href:"/home",className:"logo"},r.a.createElement("span",{className:"logo_m"},"micro"),r.a.createElement("span",{className:"logo_b"},"blog")),r.a.createElement(x.a.Item,null,r.a.createElement(x.a.Link,{eventKey:"1",href:"/home"},"Home")),e.username?r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a.Item,null,r.a.createElement(x.a.Link,{eventKey:"3",href:"/profile"},"@",e.username)),r.a.createElement(x.a.Item,null,r.a.createElement(x.a.Link,{eventKey:"3",href:"/home",onClick:function(){localStorage.removeItem("user"),a.push("/home")}},"Logout"))):r.a.createElement(x.a.Item,null,r.a.createElement(x.a.Link,{eventKey:"3",href:"/login"},"Login")))}),L=function(e){var a=Object(n.useState)(""),t=Object(o.a)(a,2),l=t[0],c=t[1],s=Object(n.useState)(""),i=Object(o.a)(s,2),p=i[0],f=i[1],h=Object(n.useState)(""),b=Object(o.a)(h,2),j=b[0],k=b[1],S=Object(n.useState)(!1),x=Object(o.a)(S,2),C=x[0],L=x[1],I=Object(u.g)(),N=e.user,_=e.setUser;return N?r.a.createElement(u.a,{to:"/home"}):r.a.createElement(m.a,null,r.a.createElement(v.a,null,r.a.createElement(O.a,null),r.a.createElement(O.a,{xs:6},r.a.createElement(E.a,null,r.a.createElement(y.a,{onSubmit:function(e){e.preventDefault(),p===j?d.a.post("/api/register",{username:l,password:p,password2:j}).then((function(e){d.a.post("/api/login",{username:l,password:p}).then((function(e){_(e.data),localStorage.setItem("user",JSON.stringify(e.data)),I.push("/home")})).catch((function(e){return console.log(e)}))})):L(!0)}},C&&r.a.createElement(w.a,{variant:"danger"},"Passwords are not the same."),r.a.createElement(y.a.Group,{controlId:"formBasicEmail"},r.a.createElement(y.a.Label,null,"Username"),r.a.createElement(y.a.Control,{type:"text",placeholder:"Enter username",onChange:function(e){return c(e.target.value)}})),r.a.createElement(y.a.Group,{controlId:"formBasicPassword"},r.a.createElement(y.a.Label,null,"Password"),r.a.createElement(y.a.Control,{type:"password",placeholder:"Enter password",value:p,onChange:function(e){return f(e.target.value)}})),r.a.createElement(y.a.Group,{controlId:"formBasicPassword"},r.a.createElement(y.a.Label,null,"Confirm password"),r.a.createElement(y.a.Control,{type:"password",placeholder:"Confirm password",value:j,onChange:function(e){return k(e.target.value)}})),r.a.createElement(g.a,{variant:"primary",type:"submit",block:!0},"Submit")),r.a.createElement(E.a.Link,{href:"/login",className:"registerLink"},"Don't have an account?"))),r.a.createElement(O.a,null)))},I=t(55),N=(t(91),function(e){var a=Object(n.useState)([]),t=Object(o.a)(a,2),l=t[0],c=t[1],s=Object(n.useState)(10),m=Object(o.a)(s,2),i=m[0],p=m[1],E=Object(n.useState)({follows:[],_id:"",username:"",password:"",avatar:"",__v:0}),f=Object(o.a)(E,2),b=f[0],v=f[1],O=Object(n.useState)(!1),j=Object(o.a)(O,2),y=j[0],w=(j[1],Object(u.h)().username);Object(n.useEffect)((function(){d.a.get("/api/user/"+w).then((function(e){v(e.data)})),d.a.get("/api/posts/user/"+w+"/"+i).then((function(e){c(e.data),e.data.forEach((function(e){d.a.get("/api/user/"+e.user).then((function(a){var t=a.data,n={avatar:t.avatar,follows:t.follows,username:t.username};e.user=n}))}))}))}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(I.a,{fluid:!0},r.a.createElement("img",{src:b.avatar,id:"jumbo_img"}),r.a.createElement("h1",{id:"jumbo_username"},"@",b.username),r.a.createElement("br",null),r.a.createElement(g.a,{size:"sm"},y?"Unfollow":"Follow")),l.map((function(e){return r.a.createElement(h,{id:e.id,username:e.user,text:e.content,likes:e.likes,avatar:e.avatar,timestamp:e.timestamp})})),r.a.createElement(g.a,{onClick:function(){p(i+10)},style:{marginBottom:"15px"}},"Load More"))}),_=function(e){var a=Object(u.h)().id,t=Object(n.useState)({likes:[],_id:"",id:"",user:{avatar:"",follows:[],username:""},timestamp:"",content:"",__v:0}),l=Object(o.a)(t,2),c=l[0],s=l[1];return Object(n.useEffect)((function(){d.a.get("/api/posts/get/"+a).then((function(e){var a=e.data;console.log(a),d.a.get("/api/user/"+a.user).then((function(e){var t=e.data,n={avatar:t.avatar,follows:t.follows,username:t.username};a.user=n,s(a)}))}))}),[]),r.a.createElement(h,{key:c.id,id:c.id,username:c.user.username,text:c.content,likes:c.likes,avatar:c.user.avatar,timestamp:c.timestamp})},B=function(){var e=Object(n.useState)(null),a=Object(o.a)(e,2),t=a[0],l=a[1];return Object(n.useEffect)((function(){var e=JSON.parse(localStorage.getItem("user"));e&&l(e)}),[]),r.a.createElement("div",{className:"App"},r.a.createElement(C,{username:t?t.username:""}),r.a.createElement(s.a,null,r.a.createElement(u.d,null,r.a.createElement(u.b,{path:"/home"},r.a.createElement(j,{user:t})),r.a.createElement(u.b,{path:"/about"},r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(b,null))),r.a.createElement(u.b,{path:"/profile/:username"},r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(N,null))),r.a.createElement(u.b,{path:"/login"},r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(k,{user:t,setUser:l}))),r.a.createElement(u.b,{path:"/register"},r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(L,{user:t,setUser:l}))),r.a.createElement(u.b,{path:"/post/:id"},r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(_,null))),r.a.createElement(u.b,{path:"/"},r.a.createElement(u.a,{to:"/home"})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[58,1,2]]]);
//# sourceMappingURL=main.28012494.chunk.js.map