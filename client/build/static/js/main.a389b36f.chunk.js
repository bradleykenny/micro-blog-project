(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{30:function(e,a,t){},46:function(e,a,t){},58:function(e,a,t){e.exports=t(92)},63:function(e,a,t){},65:function(e,a,t){},90:function(e,a,t){},91:function(e,a,t){},92:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(23),o=t.n(l),c=(t(63),t(6)),s=t(19),u=t(5),m=t(15),i=(t(64),t(65),t(47)),p=t.n(i),E=t(18),f=(t(30),t(7)),h=t.n(f),d=function(e){var a=JSON.parse(localStorage.getItem("user")||""),t=Object(n.useState)(!!e.likes.includes(a.username)),l=Object(c.a)(t,2),o=l[0],s=l[1],m=Object(u.g)(),i=Date.parse(e.timestamp),f=p()(i,"h:MMtt | dS mmm yyyy");return r.a.createElement(E.a,null,r.a.createElement("a",{href:"/profile/"+e.username},r.a.createElement("img",{alt:"Avatar",src:e.avatar})),r.a.createElement("div",{className:"card_text"},r.a.createElement("a",{href:"/profile/"+e.username},r.a.createElement("h2",null,"@",e.username)),r.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.text}}),r.a.createElement("ul",null,r.a.createElement("p",{onClick:function(){h.a.post("http://localhost:5000/api/posts/"+e.id+"/like",{user:e.username}).then((function(e){s(!o)}))}},o?"Unlike":"Like"),r.a.createElement("p",{onClick:function(){m.push("/post/"+e.id)}},"More")),r.a.createElement("h6",null,f)))},g=t(20),b=function(e){var a=Object(n.useState)([]),t=Object(c.a)(a,2),l=t[0],o=t[1],s=Object(n.useState)(10),u=Object(c.a)(s,2),m=u[0],i=u[1];Object(n.useEffect)((function(){h.a.get("http://localhost:5000/api/posts/"+m).then((function(e){o(e.data),e.data.forEach((function(e){h.a.get("http://localhost:5000/api/user/"+e.user).then((function(a){var t=a.data,n={avatar:t.avatar,follows:t.follows,username:t.username};e.user=n}))}))}))}),[]);return r.a.createElement(r.a.Fragment,null,l.map((function(e){return r.a.createElement(d,{key:e.id,id:e.id,username:e.user,text:e.content,likes:e.likes,avatar:e.avatar,timestamp:e.timestamp})})),r.a.createElement(g.a,{onClick:function(){h.a.get("http://localhost:5000/api/posts/"+(m+10)).then((function(e){o(e.data),i(m+10),e.data.forEach((function(e){h.a.get("http://localhost:5000/api/user/"+e.user).then((function(a){var t=a.data,n={avatar:t.avatar,follows:t.follows,username:t.username};e.user=n}))}))}))},style:{marginBottom:"15px"}},"Load More"))},v=t(21),y=t(10),O=function(e){return r.a.createElement("div",null,r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(v.a,null,r.a.createElement(y.a,{xs:4},e.user&&r.a.createElement(E.a,null,r.a.createElement("a",{href:"/profile/"+e.user.username},r.a.createElement("img",{src:e.user.avatar,alt:"Avatar"})),r.a.createElement("div",{className:"card_text"},r.a.createElement("a",{href:"/profile/"+e.user.username},r.a.createElement("h2",null,"@",e.user.username)),r.a.createElement("p",null,r.a.createElement("i",null,"Some information here coming soon")),r.a.createElement("p",null,"Followers: ",e.user.follows.length),r.a.createElement("p",null,"Following: ",e.user.follows.length)))),r.a.createElement(y.a,{xs:6},e.user&&r.a.createElement(S,{user:e.user}),r.a.createElement(b,null)),r.a.createElement(y.a,null))))},j=t(8),w=t(55),k=(t(46),function(e){var a=Object(n.useState)(""),t=Object(c.a)(a,2),l=t[0],o=t[1],s=Object(n.useState)(""),i=Object(c.a)(s,2),p=i[0],f=i[1],d=Object(n.useState)(!1),b=Object(c.a)(d,2),O=b[0],k=b[1],S=Object(u.g)(),x=e.user,C=e.setUser;return x?r.a.createElement(u.a,{to:"/home"}):r.a.createElement(m.a,null,r.a.createElement(v.a,null,r.a.createElement(y.a,null),r.a.createElement(y.a,{xs:6},r.a.createElement(E.a,null,r.a.createElement(j.a,{onSubmit:function(e){e.preventDefault(),h.a.post("http://localhost:5000/api/login",{username:l,password:p}).then((function(e){C(e.data),localStorage.setItem("user",JSON.stringify(e.data)),S.push("/home")})).catch((function(e){401===e.response.status&&k(!0)}))}},O&&r.a.createElement(w.a,{variant:"danger"},"Username and/or password incorrect."),r.a.createElement(j.a.Group,{controlId:"formBasicEmail"},r.a.createElement(j.a.Label,null,"Username"),r.a.createElement(j.a.Control,{type:"text",placeholder:"Enter username",onChange:function(e){return o(e.target.value)}})),r.a.createElement(j.a.Group,{controlId:"formBasicPassword"},r.a.createElement(j.a.Label,null,"Password"),r.a.createElement(j.a.Control,{type:"password",placeholder:"Enter password",value:p,onChange:function(e){return f(e.target.value)}})),r.a.createElement(g.a,{variant:"primary",type:"submit",block:!0},"Submit")),r.a.createElement(E.a.Link,{href:"/register",className:"registerLink"},"Don't have an account?"))),r.a.createElement(y.a,null)))}),S=(t(89),function(e){var a=Object(n.useState)(""),t=Object(c.a)(a,2),l=t[0],o=t[1],s=Object(n.useState)(!1),u=Object(c.a)(s,2),i=u[0],p=u[1],f=function(){p(!i)};return e.user?i?r.a.createElement(m.a,null,r.a.createElement(v.a,{className:"d-flex justify-content-center"},r.a.createElement(y.a,{className:"align-items-center"},r.a.createElement(E.a,null,r.a.createElement(E.a.Body,null,r.a.createElement(g.a,{variant:"secondary",size:"sm",style:{float:"right",marginTop:"-5px"},onClick:f},"Hide"),r.a.createElement(j.a,{onSubmit:function(a){a.preventDefault(),l.length>0&&h.a.post("http://localhost:5000/api/posts/create",{user:e.user.username,content:l,likes:[]}).then((function(e){alert("Content posted!"),o("")}))}},r.a.createElement(j.a.Group,{controlId:"formUsername"},r.a.createElement(j.a.Label,null,"What do you want to say?"),r.a.createElement(j.a.Control,{name:"content",type:"text",placeholder:"Content",onChange:function(e){e.preventDefault();var a=e.target,t=a.name,n=a.value;switch(t){case"content":o(n)}},value:l})),r.a.createElement(g.a,{variant:"primary",type:"submit",className:"btn-block"},"Submit"))))))):r.a.createElement(m.a,null,r.a.createElement(E.a,{style:{paddingTop:"10px"}},r.a.createElement(E.a.Body,null,r.a.createElement(g.a,{variant:"primary",type:"submit",className:"btn-block",onClick:f},"Create a post")))):r.a.createElement("p",null,"Please log in to create a post")}),x=t(17),C=(t(90),function(e){var a=Object(u.g)();return r.a.createElement(x.a,{variant:"pills",activeKey:"1",id:"nav"},r.a.createElement("a",{href:"/home",className:"logo"},r.a.createElement("span",{className:"logo_m"},"micro"),r.a.createElement("span",{className:"logo_b"},"blog")),r.a.createElement(x.a.Item,null,r.a.createElement(x.a.Link,{eventKey:"1",href:"/home"},"Home")),r.a.createElement(x.a.Item,null,r.a.createElement(x.a.Link,{href:"/about"},"About")),e.username?r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a.Item,null,r.a.createElement(x.a.Link,{eventKey:"3",href:"/profile"},"@",e.username)),r.a.createElement(x.a.Item,null,r.a.createElement(x.a.Link,{eventKey:"3",href:"/home",onClick:function(){localStorage.removeItem("user"),a.push("/home")}},"Logout"))):r.a.createElement(x.a.Item,null,r.a.createElement(x.a.Link,{eventKey:"3",href:"/login"},"Login")))}),L=function(e){var a=Object(n.useState)(""),t=Object(c.a)(a,2),l=t[0],o=t[1],s=Object(n.useState)(""),i=Object(c.a)(s,2),p=i[0],f=i[1],d=Object(n.useState)(""),b=Object(c.a)(d,2),O=b[0],w=b[1],k=Object(u.g)(),S=e.user,x=e.setUser;return S?r.a.createElement(u.a,{to:"/home"}):r.a.createElement(m.a,null,r.a.createElement(v.a,null,r.a.createElement(y.a,null),r.a.createElement(y.a,{xs:6},r.a.createElement(E.a,null,r.a.createElement(j.a,{onSubmit:function(e){e.preventDefault(),h.a.post("http://localhost:5000/api/register",{username:l,password:p,password2:O}).then((function(e){h.a.post("http://localhost:5000/api/login",{username:l,password:p}).then((function(e){x(e.data),localStorage.setItem("user",JSON.stringify(e.data)),k.push("/home")})).catch((function(e){return console.log(e)}))}))}},r.a.createElement(j.a.Group,{controlId:"formBasicEmail"},r.a.createElement(j.a.Label,null,"Username"),r.a.createElement(j.a.Control,{type:"text",placeholder:"Enter username",onChange:function(e){return o(e.target.value)}})),r.a.createElement(j.a.Group,{controlId:"formBasicPassword"},r.a.createElement(j.a.Label,null,"Password"),r.a.createElement(j.a.Control,{type:"password",placeholder:"Enter password",value:p,onChange:function(e){return f(e.target.value)}})),r.a.createElement(j.a.Group,{controlId:"formBasicPassword"},r.a.createElement(j.a.Label,null,"Confirm password"),r.a.createElement(j.a.Control,{type:"password",placeholder:"Confirm password",value:O,onChange:function(e){return w(e.target.value)}})),r.a.createElement(g.a,{variant:"primary",type:"submit",block:!0},"Submit")),r.a.createElement(E.a.Link,{href:"/login",className:"registerLink"},"Don't have an account?"))),r.a.createElement(y.a,null)))},I=t(54),N=(t(91),function(e){var a=Object(n.useState)([]),t=Object(c.a)(a,2),l=t[0],o=t[1],s=Object(n.useState)(10),m=Object(c.a)(s,2),i=m[0],p=m[1],E=Object(n.useState)({follows:[],_id:"",username:"",password:"",avatar:"",__v:0}),f=Object(c.a)(E,2),b=f[0],v=f[1],y=Object(u.h)().username;Object(n.useEffect)((function(){h.a.get("http://localhost:5000/api/user/"+y).then((function(e){v(e.data)})),h.a.get("http://localhost:5000/api/posts/user/"+y+"/"+i).then((function(e){o(e.data),e.data.forEach((function(e){h.a.get("http://localhost:5000/api/user/"+e.user).then((function(a){var t=a.data,n={avatar:t.avatar,follows:t.follows,username:t.username};e.user=n}))}))}))}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(I.a,{fluid:!0},r.a.createElement("img",{src:b.avatar,id:"jumbo_img"}),r.a.createElement("h1",{id:"jumbo_username"},"@",b.username)),l.map((function(e){return r.a.createElement(d,{id:e.id,username:e.user,text:e.content,likes:e.likes,avatar:e.avatar,timestamp:e.timestamp})})),r.a.createElement(g.a,{onClick:function(){p(i+10)},style:{marginBottom:"15px"}},"Load More"))}),_=function(e){var a=Object(u.h)().id,t=Object(n.useState)({likes:[],_id:"",id:"",user:{avatar:"",follows:[],username:""},timestamp:"",content:"",__v:0}),l=Object(c.a)(t,2),o=l[0],s=l[1];return Object(n.useEffect)((function(){h.a.get("http://localhost:5000/api/posts/get/"+a).then((function(e){var a=e.data;console.log(a),h.a.get("http://localhost:5000/api/user/"+a.user).then((function(e){var t=e.data,n={avatar:t.avatar,follows:t.follows,username:t.username};a.user=n,s(a)}))}))}),[]),r.a.createElement(d,{key:o.id,id:o.id,username:o.user.username,text:o.content,likes:o.likes,avatar:o.user.avatar,timestamp:o.timestamp})},B=function(){var e=Object(n.useState)(null),a=Object(c.a)(e,2),t=a[0],l=a[1];return Object(n.useEffect)((function(){var e=JSON.parse(localStorage.getItem("user"));e&&l(e)}),[]),r.a.createElement("div",{className:"App"},r.a.createElement(C,{username:t?t.username:""}),r.a.createElement(s.a,null,r.a.createElement(u.d,null,r.a.createElement(u.b,{path:"/home"},r.a.createElement(O,{user:t})),r.a.createElement(u.b,{path:"/about"},r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(b,null))),r.a.createElement(u.b,{path:"/profile/:username"},r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(N,null))),r.a.createElement(u.b,{path:"/login"},r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(k,{user:t,setUser:l}))),r.a.createElement(u.b,{path:"/register"},r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(L,{user:t,setUser:l}))),r.a.createElement(u.b,{path:"/post/:id"},r.a.createElement(m.a,{style:{paddingTop:"100px"}},r.a.createElement(_,null))),r.a.createElement(u.b,{path:"/"},r.a.createElement(u.a,{to:"/home"})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[58,1,2]]]);
//# sourceMappingURL=main.a389b36f.chunk.js.map