(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{101:function(e,t,A){"use strict";A.r(t);var a=A(0),n=A.n(a),r=A(24),o=A.n(r),s=(A(63),A(20)),i=A(5),c=A(4),g=A(3),u=A.n(g),E=A(6),l=A(7),Q=A(2);A(34);var C={jap:{5:["\u30a4\u30f3\u30bf\u30fc\u30cd\u30c3\u30c8","\u5bb6\u5177","\u30c6\u30ec\u30d3","\u30d0\u30b9\u30eb\u30fc\u30e0","\u30a8\u30a2\u30b3\u30f3","\u30de\u30c3\u30c8\u30ec\u30b9","\u305d\u306e\u4ed6"],6:["\u90e8\u5c4b","\u306b\u304a\u3044","\u305d\u306e\u4ed6","\u30d0\u30b9\u30eb\u30fc\u30e0","\u30ea\u30cd\u30f3"],8:["\u4f7f\u7528\u3057\u306a\u3044","\u6e05\u6f54\u3055","\u98a8\u5442\u306e\u6e29\u5ea6","\u9867\u5ba2\u304c\u591a\u3044","\u305d\u306e\u4ed6"],9:["\u4f7f\u7528\u3057\u306a\u3044","\u30de\u30c4\u30b5\u30fc\u30b8\u306e\u8cea","\u30eb\u30b9\u30bf\u30c3\u30d5\u306e\u614b\u5ea6","\u5c4b\u5185\u306e\u74b0\u5883","\u305d\u306e\u4ed6"],title:"\u6539\u5584\u70b9:"},eng:{5:["Internet","Furniture","TV","Bathroom","Mattress","Air conditioner","Other"],6:["Room","Bathroom","Smell","Linen","Other"],8:["Not use","Temperature","Cleanliness","Many customer","Other"],9:["Not use","Quality","Attitude","Environment","Other"],title:"Improve point : "}},h={jap:"\u30a2\u30f3\u30b1\u30fc\u30c8\u306b\u5354\u529b\u3044\u305f\u3060\u304d\u3001\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\u3002",eng:"Thank you for Survey."};A(48),A(49),A(50),A(51),A(52);var p=A(103),v=function(e){return e().type},B=Object(p.a)({resetSurvey:void 0,fillSurvey:function(e){return e},onChangeSurvey:function(e){return e}}),m=Object(p.a)({resetRoten:void 0,fillRoten:function(e){return e},onChangeRoten:function(e){return e}});A(17),A(18);var d=A(8),w=A.n(d);A(53);A(15),A(23),A(26),A(95);A(54),A(55),A(96);var I=A(56),f=A.n(I);A(97);var G=function(){return n.a.createElement("div",{className:"not_found"},n.a.createElement("div",{className:"not_found-content"},n.a.createElement("div",{className:"not_found-content_title1"},"404"),n.a.createElement("div",{className:"not_found-content_title2"},"PAGE NOT FOUND"),n.a.createElement("div",null,"---"),n.a.createElement("div",{className:"logo",style:{width:"100%"}},n.a.createElement("img",{src:f.a,alt:"logo",width:200})),n.a.createElement("button",{className:"btn btn-primary p-3 mt-3 mb-3",onClick:function(){return window.open("https://azumayavietnam.com/","_self")}},"Home page Azumaya Viet Nam")))},Y=A(57),x=A.n(Y);var S=function(){var e=Object(c.useParams)(),t=e.language,A=e.idBranch,r=Object(a.useState)(5),o=Object(Q.a)(r,2),s=o[0],i=o[1];return Object(a.useEffect)((function(){if(s>0&&A){var e=setTimeout((function(){return i(s-1)}),1e3);return function(){return clearTimeout(e)}}}),[s]),n.a.createElement("div",{style:{textAlign:"center",padding:"65px"}},n.a.createElement("div",null,"-----------"),n.a.createElement("div",{style:{fontSize:"1.2rem",fontWeight:"600"}},h["jap"===t?"jap":"eng"]),n.a.createElement("img",{src:x.a,alt:"thankyou",onClick:A?function(){return window.open("/","_self")}:""}),n.a.createElement("div",null,"-----------"),A&&n.a.createElement("div",null,0===s?window.open("/","_self"):n.a.createElement("div",{style:{fontSize:"1.2rem",fontWeight:"600"}},s+("jap"===t?"\u79d2\u3067\u30db\u30fc\u30e0\u30da\u30fc\u30ea\u306b\u623b\u308a\u307e\u3059\u3002":" seconds go to home"))))};function b(e,t){var A="/user/take_copy/"+e;return w.a.get("".concat(A),{headers:{Authorization:t}})}function D(e,t,A){var a="/user/save_copy/"+e;return w.a.post("".concat(a),t,{headers:{Authorization:A}})}var N=A(31);var y=function(){var e=Object(a.useState)({copy1:"",copy2:""}),t=Object(Q.a)(e,2),A=t[0],r=t[1],o=Object(a.useState)("test"),s=Object(Q.a)(o,2),i=s[0],c=s[1];function g(e,t){var a=Object(E.a)({},A);a[e]=t,r(a)}return Object(a.useEffect)((function(){(function(){var e=Object(l.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b("vanhaicddt2","token");case 2:(t=e.sent)&&r({copy1:t.data.data.copy1,copy2:t.data.data.copy2}),console.log("result",t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),n.a.createElement("div",{className:"App p-5",style:{textAlign:"center",alignItems:"center",margin:"auto"}},n.a.createElement("h1",{style:{width:"100%"}},"Copy Test by Hai"),n.a.createElement("div",{style:{color:""}},"MSG: ",i),n.a.createElement("div",{class:"form-group",style:{position:"relative"}},n.a.createElement("label",{for:"exampleInputEmail1"},"Text Copy 1"),n.a.createElement("input",{value:A.copy1,type:"text",name:"copy1",class:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"copy 1",onChange:function(e){return g(e.target.name,e.target.value)}}),n.a.createElement(N.CopyToClipboard,{text:A.copy1,onCopy:function(){return c("Success copy 1")}},n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",style:{position:"absolute",top:"31px",right:"0"},width:"24",height:"24",fill:"none",viewBox:"0 0 24 24",class:"icon-sm"},n.a.createElement("path",{fill:"currentColor","fill-rule":"evenodd",d:"M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z","clip-rule":"evenodd"})))),n.a.createElement("div",{class:"form-group",style:{position:"relative"}},n.a.createElement("label",{for:"exampleInputEmail1"},"Text Copy 2"),n.a.createElement("input",{value:A.copy2,type:"text",name:"copy2",class:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"copy 2",onChange:function(e){return g(e.target.name,e.target.value)}}),n.a.createElement(N.CopyToClipboard,{text:A.copy2,onCopy:function(){return c("Success copy 2")}},n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",style:{position:"absolute",top:"31px",right:"0"},width:"24",height:"24",fill:"none",viewBox:"0 0 24 24",class:"icon-sm"},n.a.createElement("path",{fill:"currentColor","fill-rule":"evenodd",d:"M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z","clip-rule":"evenodd"})))),n.a.createElement("button",{className:"btn btn-primary mt-3",onClick:function(){(function(){var e=Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D("vanhaicddt2",A,"token");case 2:e.sent;case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}},"Change Content"))};var R=function(){return n.a.createElement("section",{style:{marginTop:"unset"}},n.a.createElement(c.Switch,null,n.a.createElement(c.Route,{path:"/survey/complete/:language",component:S,exact:!0}),n.a.createElement(c.Route,{path:"/",component:y,exact:!0}),n.a.createElement(c.Route,{path:"/*",component:G,exact:!0})))};var U=function(){return Object(i.b)(),Object(i.c)((function(e){return e.token})),Object(i.c)((function(e){return e.auth})),n.a.createElement(s.a,null,n.a.createElement("div",{className:"App"},n.a.createElement(R,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var q=A(16),W={isLoading:!0,day:"",time:"",league:"Japan",table:"Online",roomNumber:"",branchID:"",from:"",question1:0,question2:0,question3:0,question4:0,question5:[{answer:0,subAnswer:0,nameSubAnswer:""},{answer:0,subAnswer:0,nameSubAnswer:""},{answer:0,subAnswer:0,nameSubAnswer:""},{answer:0,subAnswer:0,nameSubAnswer:""},{answer:0,subAnswer:0,nameSubAnswer:""},{answer:0,subAnswer:0,nameSubAnswer:""},{answer:0,subAnswer:0,nameSubAnswer:""},{answer:0,subAnswer:0,nameSubAnswer:""},{answer:0,subAnswer:0,nameSubAnswer:""},{answer:0,subAnswer:0,nameSubAnswer:""}],question6:[],question7:0,question8:""},L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case v(B.fillSurvey):return Object(E.a)(Object(E.a)(Object(E.a)({},e),t.payload),{},{isLoading:!1});case v(B.onChangeSurvey):var A=t.payload,a=A.index,n=A.target,r=A.value,o=Object(E.a)({},e);if("question6"===n)o.question6.length>0&&o.question6.includes(r)?o.question6.splice(o.question6.indexOf(r),1):o.question6.push(r);else if("question5"===n)r>2&&(o.question5[a].subAnswer=0,o.question5[a].nameSubAnswer=""),o.question5[a].answer=r;else if("question5Sub"===n){var s=a.indexSub,i=a.indexQuestion5;o.question5[i].subAnswer=r,o.question5[i].nameSubAnswer=C.jap[i][s]}else o[n]=r;return o;case v(B.resetSurvey):return W;default:return e}},V={isLoading:!0,day:"",time:"",league:"Japan",table:"roomScan",roomNumber:"",branchID:"",from:"",question1:""},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case v(m.fillRoten):return Object(E.a)(Object(E.a)(Object(E.a)({},e),t.payload),{},{isLoading:!1});case v(m.onChangeRoten):var A=t.payload,a=(A.index,A.target),n=A.value,r=Object(E.a)({},e);return r[a]=n,r;case v(m.resetRoten):return V;default:return e}},K=Object(q.b)({survey:L,roten:k}),F=Object(q.c)(K,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());var j=function(e){var t=e.children;return n.a.createElement(i.a,{store:F},t)};o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(j,null,n.a.createElement(U,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},17:function(e,t){e.exports="data:image/png;base64,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"},18:function(e,t){e.exports="data:image/png;base64,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LPY7sN/F1B/cQwgilOgRIrTajzVo81lXqO7ge8F2ThGu6waUvRdoe4EjSmdq7h+eVWY+w9UID3qEGBIy8/M0r2KjZv7yoWCj3zbVB0N0SC37d2z/rltUpVmPPKx55esIQYQaPUIMGduW3qZ9K/9FUZWYK7yoq0Uy2WFQe9FRtvTLmrniQVcLhA+TZTBkNe0/qDfmfl5Hyt9WjkabQMx2n6A/OtQanwwz4VzNfuVxRUvHuE+AcCIIMeTVrl6vbdd/U41N+0wUjjKBmOU+QW90qM1EYK3y8k7XDNMDHHXFPPcJEG4EIbxRvWKN3r3pdjV1VAYb/2aYfiK6Z6fB2I1zczPGmQB8QEXXLnKfAEMDQQjv1DzxvHZ89S7V1dj1h7aHGDWN/8QvAuyJwM4DbQ56gAXFMzXl0R8SgBiyCEJ469i297X9K99V1WtPmUAcqUzlmV8Cv3e3sLtD2Adj22eDjrlgiaaZAMyfOcV9CgxNBCG819Hapo/u+qk++vEDalOdsjTC9BJzveklxnt/9nFo8f/2SX/3LU2659vKyOZeKvxAEAIn+XjNJu3+0cM6+MKK4B6i7SUOxVA8Hn6292dngY5ddL3OuOsbGrlorvsJwB8EIZBA9bLV2veLx1S5/skgFG0g2gd8R0I669QufbcPwrYBaCfAlFy6VGV3fknFN13pfgLwE0EI9MDHazer8ncrVfHYCjW173X3E2042ok2meZIrx6j7fHZ+312wot9BLbt+eVmTtS4W69XyReuo+cHnIQgBHqp7Ui9ap54TodWrdehlWt1rOEDN3yabV6zg1fbaxyocIyHXps5WoNhzvhrk/KHn63RSxZp9NWXqfi6y5VZONz9EwBORhACSXB44+s6uvltHd30po68/KbqKrYF8RQPRNtjtK8ZwWEf63vivf21O36czP7+xQ97N88edkXf8ffx4GsPXu2/xz7suvDic1Vw8XkqmPtJnTZvtv2XAOgBghBIkY62djVs32mOD9Ww4yM17TmglsoatRy0R7WazRFrt703O3TZaF7j20jZ4dZMDTOvOYpkZis6tlg5wVEUHLkTS5U3dZLypp1ljsnKyPJ7yQfQXwQhAMBrJwch2zABALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvEYQAgC8RhACALxGEAIAvBYxRyz+FgAA/9AjBAB4jSAEAHhM+l9CYWezvvRCjQAAAABJRU5ErkJggg=="},26:function(e,t,A){e.exports=A.p+"static/media/logo_az.a1cf0c4d.png"},34:function(e,t,A){},48:function(e,t,A){e.exports=A.p+"static/media/1start.485f9c5e.png"},49:function(e,t,A){e.exports=A.p+"static/media/2start.4bd7255a.png"},50:function(e,t,A){e.exports=A.p+"static/media/3start.8f05a630.png"},51:function(e,t,A){e.exports=A.p+"static/media/4start.1ae305b0.png"},52:function(e,t,A){e.exports=A.p+"static/media/5start.b065a474.png"},53:function(e,t,A){e.exports=A.p+"static/media/loading.7fc09f7a.gif"},54:function(e,t,A){e.exports=A.p+"static/media/scan_qr3.e86aac39.png"},55:function(e,t,A){e.exports=A.p+"static/media/touch_tablet.75a00a33.png"},56:function(e,t,A){e.exports=A.p+"static/media/logo_full.623d5050.png"},57:function(e,t,A){e.exports=A.p+"static/media/thankyouGirl.0ddd0068.gif"},58:function(e,t,A){e.exports=A(101)},63:function(e,t,A){},95:function(e,t,A){},96:function(e,t,A){},97:function(e,t,A){}},[[58,1,2]]]);
//# sourceMappingURL=main.285e7d5f.chunk.js.map