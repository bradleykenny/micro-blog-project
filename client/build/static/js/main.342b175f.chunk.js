(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{26:function(e,a,t){},50:function(e,a,t){e.exports=t(83)},55:function(e,a,t){},56:function(e,a,t){},81:function(e,a,t){},83:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(41),c=t.n(l),o=(t(55),t(7)),m=t(21),s=t(5),u=(t(56),t(15)),i=t(42),E=t.n(i),p=t(18),f=(t(26),function(e){var a=Object(n.useState)(!1),t=Object(o.a)(a,2),l=t[0],c=t[1],m=Date.parse(e.timestamp),s=E()(m,"h:MMtt | dS mmm yyyy");return r.a.createElement(p.a,null,r.a.createElement("a",{href:"/profile/"+e.username},r.a.createElement("img",{alt:"Avatar",src:e.avatar})),r.a.createElement("div",{className:"card_text"},r.a.createElement("a",{href:"/profile/"+e.username},r.a.createElement("h2",null,"@",e.username)),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.text}}),r.a.createElement("ul",null,r.a.createElement("p",{onClick:function(){c(!l)}},l?"Unlike":"Like"),r.a.createElement("p",null," More")),r.a.createElement("h6",null,s)))}),d=t(12),h=t.n(d),g=t(23),b=function(e){var a=Object(n.useState)([]),t=Object(o.a)(a,2),l=t[0],c=t[1],m=Object(n.useState)(10),s=Object(o.a)(m,2),u=s[0],i=s[1];Object(n.useEffect)((function(){h.a.get("/api/posts/"+u).then((function(e){c(e.data),e.data.forEach((function(e){h.a.get("/api/user/"+e.user).then((function(a){var t=a.data,n={avatar:t.avatar,follows:t.follows,username:t.username};e.user=n}))}))}))}),[]);return r.a.createElement(r.a.Fragment,null,l.map((function(e){return r.a.createElement(f,{username:e.user,text:e.content,likes:0,avatar:e.avatar,timestamp:e.timestamp})})),r.a.createElement(g.a,{onClick:function(){console.log(u),h.a.get("/api/posts/"+(u+10)).then((function(e){c(e.data),i(u+10),e.data.forEach((function(e){h.a.get("/api/user/"+e.user).then((function(a){var t=a.data,n={avatar:t.avatar,follows:t.follows,username:t.username};e.user=n}))}))}))},style:{marginBottom:"15px"}},"Load More"))},v=t(19),y=t(9),w=function(e){return r.a.createElement("div",null,r.a.createElement(u.a,{style:{paddingTop:"100px"}},r.a.createElement(v.a,null,r.a.createElement(y.a,{xs:4},e.user&&r.a.createElement(p.a,null,r.a.createElement("a",{href:"/profile/"+e.user.username},r.a.createElement("img",{src:e.user.avatar,alt:"Avatar"})),r.a.createElement("div",{className:"card_text"},r.a.createElement("a",{href:"/profile/"+e.user.username},r.a.createElement("h2",null,"@",e.user.username)),r.a.createElement("p",null,r.a.createElement("i",null,"Some information here coming soon")),r.a.createElement("p",null,"Followers: ",e.user.follows.length),r.a.createElement("p",null,"Following: ",e.user.follows.length)))),r.a.createElement(y.a,{xs:6},e.user&&r.a.createElement(S,{user:e.user}),r.a.createElement(b,null)),r.a.createElement(y.a,null))))},O=t(6),j=function(e){var a=Object(n.useState)(""),t=Object(o.a)(a,2),l=t[0],c=t[1],m=Object(n.useState)(""),i=Object(o.a)(m,2),E=i[0],f=i[1],d=Object(s.g)(),b=e.user,w=e.setUser;return b?r.a.createElement(s.a,{to:"/home"}):r.a.createElement(u.a,null,r.a.createElement(v.a,null,r.a.createElement(y.a,null),r.a.createElement(y.a,{xs:6},r.a.createElement(p.a,null,r.a.createElement(O.a,{onSubmit:function(e){e.preventDefault(),h.a.post("/api/login",{username:l,password:E}).then((function(e){w(e.data),localStorage.setItem("user",JSON.stringify(e.data)),d.push("/home")}))}},r.a.createElement(O.a.Group,{controlId:"formBasicEmail"},r.a.createElement(O.a.Label,null,"Username"),r.a.createElement(O.a.Control,{type:"text",placeholder:"Enter username",onChange:function(e){return c(e.target.value)}})),r.a.createElement(O.a.Group,{controlId:"formBasicPassword"},r.a.createElement(O.a.Label,null,"Password"),r.a.createElement(O.a.Control,{type:"password",placeholder:"Password",value:E,onChange:function(e){return f(e.target.value)}})),r.a.createElement(g.a,{variant:"primary",type:"submit"},"Submit")))),r.a.createElement(y.a,null)))},S=(t(80),function(e){var a=Object(n.useState)(""),t=Object(o.a)(a,2),l=t[0],c=t[1],m=Object(n.useState)(!1),s=Object(o.a)(m,2),i=s[0],E=s[1],f=function(){E(!i)};return e.user?i?r.a.createElement(u.a,null,r.a.createElement(v.a,{className:"d-flex justify-content-center"},r.a.createElement(y.a,{className:"align-items-center"},r.a.createElement(p.a,null,r.a.createElement(p.a.Body,null,r.a.createElement(g.a,{variant:"secondary",size:"sm",style:{float:"right",marginTop:"-5px"},onClick:f},"Hide"),r.a.createElement(O.a,{onSubmit:function(a){a.preventDefault(),l.length>0&&h.a.post("/api/posts/create",{user:e.user.username,content:l,likes:[]}).then((function(e){alert("Content posted!"),c("")}))}},r.a.createElement(O.a.Group,{controlId:"formUsername"},r.a.createElement(O.a.Label,null,"What do you want to say?"),r.a.createElement(O.a.Control,{name:"content",type:"text",placeholder:"Content",onChange:function(e){e.preventDefault();var a=e.target,t=a.name,n=a.value;switch(t){case"content":c(n)}}})),r.a.createElement(g.a,{variant:"primary",type:"submit",className:"btn-block"},"Submit"))))))):r.a.createElement(u.a,null,r.a.createElement(p.a,{style:{paddingTop:"10px"}},r.a.createElement(p.a.Body,null,r.a.createElement(g.a,{variant:"primary",type:"submit",className:"btn-block",onClick:f},"Create a post")))):r.a.createElement("p",null,"Please log in to create a post")}),C=t(14),x=(t(81),function(e){var a=Object(s.g)();return r.a.createElement(C.a,{variant:"pills",activeKey:"1",id:"nav"},r.a.createElement("a",{href:"/home",className:"logo"},r.a.createElement("span",{className:"logo_m"},"micro"),r.a.createElement("span",{className:"logo_b"},"blog")),r.a.createElement(C.a.Item,null,r.a.createElement(C.a.Link,{eventKey:"1",href:"/home"},"Home")),r.a.createElement(C.a.Item,null,r.a.createElement(C.a.Link,{href:"/about"},"About")),e.username?r.a.createElement(r.a.Fragment,null,r.a.createElement(C.a.Item,null,r.a.createElement(C.a.Link,{eventKey:"3",href:"/profile"},"@",e.username)),r.a.createElement(C.a.Item,null,r.a.createElement(C.a.Link,{eventKey:"3",href:"/home",onClick:function(){localStorage.removeItem("user"),a.push("/home")}},"Logout"))):r.a.createElement(C.a.Item,null,r.a.createElement(C.a.Link,{eventKey:"3",href:"/login"},"Login")))}),k=function(e){var a=Object(n.useState)(""),t=Object(o.a)(a,2),l=t[0],c=t[1],m=Object(n.useState)(""),i=Object(o.a)(m,2),E=i[0],f=i[1],d=Object(n.useState)(""),b=Object(o.a)(d,2),w=b[0],j=b[1],S=Object(s.g)(),C=e.user,x=e.setUser;return C?r.a.createElement(s.a,{to:"/home"}):r.a.createElement(u.a,null,r.a.createElement(v.a,null,r.a.createElement(y.a,null),r.a.createElement(y.a,{xs:6},r.a.createElement(p.a,null,r.a.createElement(O.a,{onSubmit:function(e){e.preventDefault(),h.a.post("/api/register",{username:l,password:E,password2:w}).then((function(e){h.a.post("/api/login",{username:l,password:E}).then((function(e){x(e.data),localStorage.setItem("user",JSON.stringify(e.data)),S.push("/home")})).catch((function(e){return console.log(e)}))}))}},r.a.createElement(O.a.Group,{controlId:"formBasicEmail"},r.a.createElement(O.a.Label,null,"Username"),r.a.createElement(O.a.Control,{type:"text",placeholder:"Enter username",onChange:function(e){return c(e.target.value)}})),r.a.createElement(O.a.Group,{controlId:"formBasicPassword"},r.a.createElement(O.a.Label,null,"Password"),r.a.createElement(O.a.Control,{type:"password",placeholder:"Password",value:E,onChange:function(e){return f(e.target.value)}})),r.a.createElement(O.a.Group,{controlId:"formBasicPassword"},r.a.createElement(O.a.Label,null,"Confirm password"),r.a.createElement(O.a.Control,{type:"password",placeholder:"Confirm password",value:w,onChange:function(e){return j(e.target.value)}})),r.a.createElement(g.a,{variant:"primary",type:"submit"},"Submit")))),r.a.createElement(y.a,null)))},I=(t(82),function(){var e=Object(n.useState)(null),a=Object(o.a)(e,2),t=a[0],l=a[1];return Object(n.useEffect)((function(){var e=JSON.parse(localStorage.getItem("user"));e&&l(e)}),[]),r.a.createElement("div",{className:"App"},r.a.createElement(x,{username:t?t.username:""}),r.a.createElement(m.a,null,r.a.createElement(s.d,null,r.a.createElement(s.b,{path:"/home"},r.a.createElement(w,{user:t})),r.a.createElement(s.b,{path:"/about"},r.a.createElement(u.a,{style:{paddingTop:"100px"}},r.a.createElement(b,null))),r.a.createElement(s.b,{path:"/profile"},r.a.createElement(u.a,{style:{paddingTop:"100px"}},r.a.createElement(b,null))),r.a.createElement(s.b,{path:"/login"},r.a.createElement(u.a,{style:{paddingTop:"100px"}},r.a.createElement(j,{user:t,setUser:l}))),r.a.createElement(s.b,{path:"/register"},r.a.createElement(u.a,{style:{paddingTop:"100px"}},r.a.createElement(k,{user:t,setUser:l}))),r.a.createElement(s.b,{path:"/"},r.a.createElement(s.a,{to:"/home"})))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.342b175f.chunk.js.map