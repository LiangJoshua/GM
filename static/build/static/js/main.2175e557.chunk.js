(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{221:function(e,n,a){"use strict";a.r(n);var i=a(1),t=a.n(i),r=a(15),l=a.n(r),m=(a(92),a(31)),o=a(32),g=a(36),c=a(34),s=a(35),u=(a(38),a(33)),p=a(22),d=a.n(p),h=function(e){function n(){var e,a;Object(m.a)(this,n);for(var i=arguments.length,t=new Array(i),r=0;r<i;r++)t[r]=arguments[r];return(a=Object(g.a)(this,(e=Object(c.a)(n)).call.apply(e,[this].concat(t)))).state={draftedPlayers:[],playerLists:[],userProfile:[]},a.initialize=a.initialize.bind(Object(u.a)(a)),a}return Object(s.a)(n,e),Object(o.a)(n,[{key:"initialize",value:function(){var e=[];e.push(t.a.createElement("div",null,t.a.createElement("img",{key:"NBA",src:"/NBA.jpg",alt:"logo",style:{width:114,height:75}}))),e.push(t.a.createElement("div",null,t.a.createElement("img",{className:"UserPic",src:this.props.user[1],alt:"logo"}))),e.push(t.a.createElement("p",{className:"username"},this.props.user[0])),e.push(t.a.createElement("p",{style:{fontSize:20}},"Win rate: ",this.props.winRate))}},{key:"componentDidMount",value:function(){this.initialize()}},{key:"render",value:function(){var e=this.state,n=e.draftedPlayers,a=e.userProfile;e.playerLists;return t.a.createElement("div",null,t.a.createElement(d.a,{container:!0,direction:"column"},t.a.createElement("div",{style:{textAlign:"center",color:"orangered"}},t.a.createElement("h1",null,"Draft Players")),t.a.createElement("div",null,t.a.createElement(d.a,{container:!0,direction:"row"},t.a.createElement("div",{className:"DraftingPage"},a),t.a.createElement("div",{className:"Playerlist"},n)))))}}]),n}(i.Component),y=a(82),f=a.n(y),v=a(83),E=a.n(v),k=a(23),C=a.n(k),w=a(49),b=a.n(w),B=a(84),D=a.n(B),G=a(85),J=a.n(G),P=a(86),j=a.n(P),A=a(37),M=a.n(A),O=a(24),L=[{name:"Lebrom James",img:"../img/LebronJames.png"},{name:"Stephen Curry",img:"../img/StephenCurry.png"},{name:"Jimmy Butler",img:"../img/JimmyButler.png"},{name:"Kemba Walker",img:"../img/KembaWalker.png"},{name:"Luka Doncic",img:"../img/LukaDoncic.png"},{name:"Lou Williams",img:"../img/LouWilliams.png"},{name:"James Harden",img:"../img/JamesHarden.png"},{name:"Kyrie Irving",img:"../img/KyrieIrving.png"},{name:"Bradley beal",img:"../img/BradleyBeal.png"},{name:"Aaron Gordon",img:"../img/AaronGordon.png"},{name:"Andre Iguodala",img:"../img/AndreIguodala.png"},{name:"Andrew Bogut",img:"../img/AndrewBogut.png"},{name:"Anthony Davis",img:"../img/AnthonyDavis.png"},{name:"Bismack Biyombo",img:"../img/BismackBiyombo.png"},{name:"Blake Griffin",img:"../img/BlakeGriffin.png"},{name:"Brandon Ingram",img:"../img/BrandonIngram.png"},{name:"Channing Frye",img:"../img/ChanningFrye.png"},{name:"Clint Capela",img:"../img/ClintCapela.png"},{name:"Danny Green",img:"../img/DannyGreen.png"},{name:"Demarcus Cousins",img:"../img/DemarcusCousins.png"},{name:"Devin Booker",img:"../img/DevinBooker.png"},{name:"Dwight Howard",img:"../img/DwightHoward.png"},{name:"Gordon Hayward",img:"../img/GordonHayward.png"},{name:"Ian Clark",img:"../img/IanClark.png"},{name:"Jamal Crawford",img:"../img/JamalCrawford.png"},{name:"Jaylen Brown",img:"../img/JaylenBrown.png"},{name:"Joel Embiid",img:"../img/JoelEmbiid.png"},{name:"JordanClarkson",img:"../img/JordanClarkson.png"},{name:"Marc Gasol",img:"../img/MarcGasol.png"},{name:"Marco Belinelli",img:"../img/MarcoBelinelli.png"},{name:"Markelle Fultz",img:"../img/MarkelleFultz.png"},{name:"Mike Conley",img:"../img/MikeConley.png"},{name:"Nikola Jokic",img:"../img/NikolaJokic.png"},{name:"Pau Gasol",img:"../img/PauGasol.png"},{name:"Paul George",img:"../img/PaulGeorge.png"},{name:"Rudy Gobert",img:"../img/RudyGobert.png"},{name:"Seth Curry",img:"../img/SethCurry.png"},{name:"Tyson Chandler",img:"../img/TysonChandler.png"},{name:"Vince Carter",img:"../img/VinceCarter.png"},{name:"Kyle Korver",img:"../img/KyleKorver.png"}],S=a(81),I=a.n(S),N={paddingTop:100,paddingBottom:100};var T=Object(O.withStyles)({avatar:{margin:10},bigAvatar:{margin:50,width:300,height:300}})(function(e){var n=e.classes;return t.a.createElement(d.a,{container:!0,direction:"column"},t.a.createElement(I.a,{src:"static/media/LebronJames.f72fec00.png",className:n.bigAvatar}),t.a.createElement(C.a,{variant:"h1",style:N},L[0].name))}),K={flexGrow:1,backgroundColor:"#282c34",backgroundRepeat:"repeat",paddingBottom:100},z={paddingTop:100,paddingBottom:100},W=Object(O.createMuiTheme)({palette:{type:"dark"}}),x=function(e){function n(){var e,a;Object(m.a)(this,n);for(var i=arguments.length,t=new Array(i),r=0;r<i;r++)t[r]=arguments[r];return(a=Object(g.a)(this,(e=Object(c.a)(n)).call.apply(e,[this].concat(t)))).state={anchorEl:null,drafting:!1,profiling:!1},a.handleClick=function(e){a.setState({anchorEl:e.currentTarget})},a.handleDrafting=function(e){console.log(e.nativeEvent.target.outerText),a.setState({anchorEl:null,drafting:!0,profiling:!1})},a.handleProfile=function(e){console.log(e.nativeEvent.target.outerText),a.setState({anchorEl:null,drafting:!1,profiling:!0})},a}return Object(s.a)(n,e),Object(o.a)(n,[{key:"render",value:function(){var e=this.state.anchorEl;return t.a.createElement(O.MuiThemeProvider,{theme:W},t.a.createElement("div",{style:K},t.a.createElement(f.a,{position:"static"},t.a.createElement(E.a,null,t.a.createElement("div",null,t.a.createElement(D.a,{color:"inherit","aria-label":"Menu",onClick:this.handleClick},t.a.createElement(J.a,null)),t.a.createElement(j.a,{id:"simple-menu",anchorEl:e,open:Boolean(e),onClose:this.handleDrafting},t.a.createElement(M.a,{onClick:this.handleProfile},"Profile"),t.a.createElement(M.a,{onClick:this.handleDrafting},"Drafting"),t.a.createElement(M.a,{onClick:this.handleDrafting},"Logout"))),t.a.createElement(C.a,{variant:"h6",color:"inherit",style:{flexGrow:1}},"GM"),t.a.createElement(b.a,{color:"inherit"},"Login"))),this.state.drafting?t.a.createElement(h,{user:["Faith Chau","/FaithChau.jpeg"],winRate:"30%"}):this.state.profiling?t.a.createElement(T,null):t.a.createElement("div",{align:"center"},t.a.createElement(C.a,{variant:"h1",style:z},"Sign-up now to Play!"),t.a.createElement(b.a,{color:"secondary",variant:"contained"},"Sign up"))))}}]),n}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(t.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},38:function(e,n,a){},87:function(e,n,a){e.exports=a(221)},92:function(e,n,a){}},[[87,1,2]]]);
//# sourceMappingURL=main.2175e557.chunk.js.map