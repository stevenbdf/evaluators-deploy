(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,a,t){},102:function(e,a,t){"use strict";t.r(a);var n=t(1),o=t.n(n),l=t(9),r=t.n(l),c=(t(48),t(49),t(50),t(10)),i=t(11),s=t(13),m=t(12),d=t(14),u=t(103),v=t(42),p=t(3),E=function(e){function a(){var e,t;Object(c.a)(this,a);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(t=Object(s.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(o)))).state={isOpen:!1},t.toggleCollapse=function(){t.setState({isOpen:!t.state.isOpen})},t}return Object(d.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){return o.a.createElement(p.q,{color:"default-color",dark:!0,expand:"md"},o.a.createElement(p.r,null,o.a.createElement("strong",{className:"white-text d-none d-md-block"},"Sistema de Control de Evaluadores"),o.a.createElement("strong",{className:"white-text d-block d-md-none"},"SCE")),o.a.createElement(p.t,{onClick:this.toggleCollapse}),o.a.createElement(p.h,{id:"navbarCollapse3",isOpen:this.state.isOpen,navbar:!0},o.a.createElement(p.s,{right:!0},o.a.createElement(p.o,null,o.a.createElement(p.p,{to:"/"},"Registro")),o.a.createElement(p.o,null,o.a.createElement(p.p,{to:"/admin"},"Administrador")),o.a.createElement(p.o,null,o.a.createElement(p.p,{to:"/admin"},"Usuario")),o.a.createElement(p.o,null,o.a.createElement(p.p,{to:"/"},"Cerrar Sesi\xf3n")))))}},{key:"handleClick",value:function(){}}]),a}(n.Component),h=(t(101),t(29)),f=function(){return o.a.createElement("div",null,o.a.createElement(p.i,null,o.a.createElement(p.u,{center:!0,className:"my-5"},o.a.createElement(p.g,{size:"12",md:"8",lg:"6"},o.a.createElement(p.b,null,o.a.createElement(p.c,null,o.a.createElement("form",null,o.a.createElement("p",{className:"h4 text-center py-4"},"Registro de Evaluadores"),o.a.createElement("div",{className:"teal-text"},o.a.createElement(p.k,{label:"Nombre completo",icon:"user",group:!0,type:"text",validate:!0,error:"wrong",success:"right"}),o.a.createElement(p.k,{label:"Correo electronico",icon:"envelope",group:!0,type:"email",validate:!0,error:"wrong",success:"right"}),o.a.createElement(p.k,{label:"Telefono",icon:"hashtag",group:!0,type:"number",validate:!0,error:"wrong",success:"right"}),o.a.createElement(p.u,{className:"mb-4"},o.a.createElement(p.g,{size:"1"},o.a.createElement(p.j,{icon:"calendar-alt",className:"iconRegister"})),o.a.createElement(p.g,null,o.a.createElement("select",{className:"browser-default custom-select"},o.a.createElement("option",null,"Seleccione un horario..."),o.a.createElement("option",{value:"1"},"Jueves 8:00am-12:00pm"),o.a.createElement("option",{value:"2"},"Jueves 1:00pm-4:00pm"),o.a.createElement("option",{value:"3"},"Viernes 8:00am-12:00pm"),o.a.createElement("option",{value:"4"},"Viernes 1:00pm-4:00pm"),o.a.createElement("option",{value:"5"},"Sabado 8:00am-12:00pm"),o.a.createElement("option",{value:"6"},"Sabado 1:00pm-4:00pm"),o.a.createElement("option",{value:"7"},"Domingo 8:00am-12:00pm"),o.a.createElement("option",{value:"8"},"Domingo 1:00pm-4:00pm")))),o.a.createElement(p.u,{className:"mt-4 pt-2"},o.a.createElement(p.g,{size:"1"},o.a.createElement(p.j,{icon:"university",className:"iconRegister"})),o.a.createElement(p.g,null,o.a.createElement("select",{className:"browser-default custom-select"},o.a.createElement("option",null,"Seleccione un grado academico..."),o.a.createElement("option",{value:"1"},"Bachillerato T\xe9cnico"),o.a.createElement("option",{value:"2"},"Tecnico Universitario"),o.a.createElement("option",{value:"3"},"Ingenieria"),o.a.createElement("option",{value:"4"},"Licenciatura"),o.a.createElement("option",{value:"5"},"Maestria"),o.a.createElement("option",{value:"6"},"Doctorado"))))),o.a.createElement("div",{className:"text-center py-4 mt-3"},o.a.createElement(h.a,{to:"/admin"},o.a.createElement(p.a,{color:"teal",type:"submit"},"Enviar",o.a.createElement(p.j,{icon:"paper-plane",className:"ml-2"})))))))))))};var b=function(e){return o.a.createElement(p.g,{size:"12",sm:"6",md:"4",className:"mt-4"},o.a.createElement(p.b,{className:"text-center",style:{height:350}},o.a.createElement(p.j,{icon:e.icon,style:{fontSize:150},className:"mt-2"}),o.a.createElement(p.c,null,o.a.createElement(p.f,null,e.titulo),o.a.createElement(p.e,null,e.descripcion),o.a.createElement(h.a,{to:e.link},o.a.createElement(p.a,null,"Acceder")))))},g={cards:[{id:1,titulo:"Candidatos",icon:"plus",link:"/candidates",descripcion:"Visualiza los evaluadores que se han postulado."},{id:2,titulo:"Evaluadores",icon:"address-card",link:"/evaluators",descripcion:"Gestiona los evaluadores ya aprobados."},{id:3,titulo:"Asignaciones",icon:"check-square",link:"/candidates",descripcion:"Relaciona evaluadores a sus respectivos proyectos."},{id:4,titulo:"Control",icon:"list-alt",link:"/candidates",descripcion:"Visualiza informaci\xf3n de los evaluadores aprobados."},{id:5,titulo:"Estado",icon:"bolt",link:"/candidates",descripcion:"Cambia de estado a los evaluadores aprobados."},{id:6,titulo:"Usuarios",icon:"users",link:"/candidates",descripcion:"Gestiona las personas con acceso al sistema."}]},C=function(){return o.a.createElement("div",null,o.a.createElement(p.i,{fluid:!0},o.a.createElement(p.u,{center:!0,className:"my-5"},o.a.createElement(p.g,null,o.a.createElement(p.b,null,o.a.createElement(p.c,null,o.a.createElement("h1",{className:"text-center"},"Sistema de Control de Evaluadores"),o.a.createElement(p.u,{center:!0},g.cards.map(function(e){return o.a.createElement(b,Object.assign({key:e.id},e))}))))))))},k=t(25),N=t(15),w=t.n(N),y=[{label:"#",field:"id",sort:"asc"},{label:"Nombre",field:"nombre",sort:"asc"},{label:"Correo",field:"correo",sort:"asc"},{label:"Telefono",field:"telefono",sort:"asc"},{label:"Horario",field:"horario",sort:"asc"},{label:"Nivel Academico",field:"nivel",sort:"asc"},{label:"Acciones",field:"acciones",sort:"asc"}];function j(){w.a.fire("\xa1Aprobado!","Evaluador aprobado.","success")}function x(){w.a.fire({title:"\xbfEstas seguro?",text:"No podras recuperar la informaci\xf3n de un candidato rechazado.",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"Cancelar",confirmButtonText:"Si, rechazar"}).then(function(e){e.value&&w.a.fire("\xa1Rechazado!","Evaluador rechazado.","success")})}for(var B=0;B<k.length;B++)k[B].handle=o.a.createElement("div",{className:"text-center"},o.a.createElement(p.a,{color:"green",size:"sm",onClick:j},o.a.createElement(p.j,{icon:"check",className:"mr-2"})," Aprobar"),o.a.createElement(p.a,{color:"red",size:"sm",onClick:x},o.a.createElement(p.j,{icon:"times",className:"mr-2"})," Rechazar"));var S=function(){return o.a.createElement("div",{className:"text-center"},o.a.createElement(p.i,{fluid:!0},o.a.createElement(p.u,{center:!0,className:"my-5"},o.a.createElement(p.g,null,o.a.createElement(p.b,null,o.a.createElement(p.d,null,o.a.createElement("h1",{className:"text-center"},"Candidatos a Evaluadores")),o.a.createElement(p.c,null,o.a.createElement(p.v,{btn:!0,responsive:!0,hover:!0},o.a.createElement(p.x,{columns:y}),o.a.createElement(p.w,{rows:k}))))))))},O=t(41),T=t(20),z=t(8),J=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(m.a)(a).call(this,e))).toggle=function(e){t.setState({id:e,nombre:z[e-1].nombre,correo:z[e-1].correo,telefono:z[e-1].telefono,horario:z[e-1].horario,nivel:z[e-1].nivel,modal:!t.state.modal,vecesClick:t.vecesClick++})},t.toggleModal=function(){t.setState({modal:!t.state.modal})},t.columns=[{label:"#",field:"id",sort:"asc"},{label:"Nombre",field:"nombre",sort:"asc"},{label:"Correo",field:"correo",sort:"asc"},{label:"Telefono",field:"telefono",sort:"asc"},{label:"Horario",field:"horario",sort:"asc"},{label:"Nivel Academico",field:"nivel",sort:"asc"},{label:"Acciones",field:"acciones",sort:"asc"}],t.handleClick=function(e){return t.toggle(e.target.id)},t.state={modal:!1,id:0,nombre:"",correo:"",telefono:"",horario:"",nivel:"",vecesClick:0},t.handleChange=t.handleChange.bind(Object(T.a)(Object(T.a)(t))),t}return Object(d.a)(a,e),Object(i.a)(a,[{key:"aproveAlert",value:function(){w.a.fire("\xa1Modificado!","Cambios guardados.","success"),this.setState({modal:!this.state.modal})}},{key:"handleChange",value:function(e){var a=e.target,t="checkbox"===a.type?a.checked:a.value,n=a.name;this.setState(Object(O.a)({},n,t))}},{key:"componentWillMount",value:function(){for(var e=0;e<z.length;e++){var a=z[e].id;z[e].handle=o.a.createElement("div",{className:"text-center"},o.a.createElement(p.a,{id:a,color:"orange",size:"sm",onClick:this.handleClick},o.a.createElement(p.j,{icon:"pen",className:"mr-2"})," Editar"))}}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement(p.i,{fluid:!0},o.a.createElement(p.u,{center:!0,className:"my-5"},o.a.createElement(p.g,null,o.a.createElement(p.b,null,o.a.createElement(p.d,null,o.a.createElement("h1",{className:"text-center"},"Evaluadores Aprobados"),o.a.createElement(p.g,{md:"4",className:"offset-md-8"},o.a.createElement(p.k,{label:"Buscar",icon:"search"}))),o.a.createElement(p.c,null,o.a.createElement(p.v,{btn:!0,responsive:!0,hover:!0,className:"text-center"},o.a.createElement(p.x,{columns:this.columns}),o.a.createElement(p.w,{rows:z})))))),o.a.createElement(p.l,{isOpen:this.state.modal,toggle:this.toggleModal},o.a.createElement(p.n,{toggle:this.toggleModal},"Editar Evaluador"),o.a.createElement(p.m,null,o.a.createElement("form",null,o.a.createElement(p.k,{label:"Codigo:",hint:this.state.id.toString(),disabled:!0,type:"text"}),o.a.createElement(p.k,{label:"Nombre:",name:"nombre",value:this.state.nombre,type:"text",onChange:this.handleChange}),o.a.createElement(p.k,{label:"Correo:",name:"correo",value:this.state.correo,type:"email",onChange:this.handleChange}),o.a.createElement(p.k,{label:"Telefono:",name:"telefono",value:this.state.telefono.toString(),type:"text",onChange:this.handleChange}),o.a.createElement("label",{className:"d-block"},"Horario:",o.a.createElement("select",{className:"browser-default custom-select",value:this.state.horario,onChange:this.handleChange},o.a.createElement("option",{value:"Jueves 8:00am-12:00pm"},"Jueves 8:00am-12:00pm"),o.a.createElement("option",{value:"Jueves 1:00pm-4:00pm"},"Jueves 1:00pm-4:00pm"),o.a.createElement("option",{value:"Viernes 8:00am-12:00pm"},"Viernes 8:00am-12:00pm"),o.a.createElement("option",{value:"Viernes 1:00pm-4:00pm"},"Viernes 1:00pm-4:00pm"),o.a.createElement("option",{value:"Sabado 8:00am-12:00pm"},"Sabado 8:00am-12:00pm"),o.a.createElement("option",{value:"Sabado 1:00pm-4:00pm"},"Sabado 1:00pm-4:00pm"),o.a.createElement("option",{value:"Domingo 8:00am-12:00pm"},"Domingo 8:00am-12:00pm"),o.a.createElement("option",{value:"Domingo 1:00pm-4:00pm"},"Domingo 1:00pm-4:00pm"))),o.a.createElement("label",{className:"d-block"},"Nivel Academico:",o.a.createElement("select",{className:"browser-default custom-select",value:this.state.nivel,onChange:this.handleChange},o.a.createElement("option",{value:"Bachillerato T\xe9cnico"},"Bachillerato T\xe9cnico"),o.a.createElement("option",{value:"T\xe9cnico Universitario"},"T\xe9cnico Universitario"),o.a.createElement("option",{value:"Ingenieria"},"Ingenieria"),o.a.createElement("option",{value:"Licenciatura"},"Licenciatura"),o.a.createElement("option",{value:"Maestria"},"Maestria"),o.a.createElement("option",{value:"Doctorado"},"Doctorado"))),o.a.createElement("div",{className:"float-right"},o.a.createElement(p.a,{color:"secondary",onClick:this.toggleModal},"Cerrar"),o.a.createElement(p.a,{color:"primary",onClick:function(){e.aproveAlert()}},"Guardar cambios")))))))}}]),a}(n.Component),A=function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){return o.a.createElement(u.a,null,o.a.createElement("div",null,o.a.createElement(E,null),o.a.createElement(v.a,{exact:!0,path:"/",component:f}),o.a.createElement(v.a,{path:"/admin",component:C}),o.a.createElement(v.a,{path:"/candidates",component:S}),o.a.createElement(v.a,{path:"/evaluators",component:J})))}}]),a}(n.Component),D=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function V(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(o.a.createElement(A,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/evaluators-deploy",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/evaluators-deploy","/service-worker.js");D?function(e){fetch(e).then(function(a){404===a.status||-1===a.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):V(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e):V(e)})}}()},25:function(e){e.exports=[{id:1,nombre:"Steven Benjamin Diaz Flores",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Jueves 8:00am-12:00pm",nivel:"Bachillerato T\xe9cnico",handle:""},{id:2,nombre:"Steven Benjamin Diaz Flores",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Jueves 8:00am-12:00pm",nivel:"Bachillerato T\xe9cnico",handle:""},{id:3,nombre:"Steven Benjamin Diaz Flores",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Jueves 8:00am-12:00pm",nivel:"Bachillerato T\xe9cnico",handle:""},{id:4,nombre:"Steven Benjamin Diaz Flores",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Jueves 8:00am-12:00pm",nivel:"Bachillerato T\xe9cnico",handle:""},{id:5,nombre:"Steven Benjamin Diaz Flores",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Jueves 8:00am-12:00pm",nivel:"Bachillerato T\xe9cnico",handle:""},{id:6,nombre:"Steven Benjamin Diaz Flores",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Jueves 8:00am-12:00pm",nivel:"T\xe9cnico Universitario",handle:""}]},43:function(e,a,t){e.exports=t(102)},8:function(e){e.exports=[{id:1,nombre:"Steven Benjamin Diaz Flores",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Jueves 8:00am-12:00pm",nivel:"Bachillerato T\xe9cnico",handle:""},{id:2,nombre:"Carlos",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Jueves 8:00am-12:00pm",nivel:"Bachillerato T\xe9cnico",handle:""},{id:3,nombre:"Amelia",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Viernes 1:00pm-4:00pm",nivel:"Bachillerato T\xe9cnico",handle:""},{id:4,nombre:"Freddy",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Jueves 8:00am-12:00pm",nivel:"Bachillerato T\xe9cnico",handle:""},{id:5,nombre:"Claudia",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Viernes 1:00pm-4:00pm",nivel:"Bachillerato T\xe9cnico",handle:""},{id:6,nombre:"Rodrigo",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Jueves 8:00am-12:00pm",nivel:"T\xe9cnico Universitario",handle:""},{id:7,nombre:"Elliot",correo:"stevenbdf@gmail.com",telefono:"77814435",horario:"Jueves 8:00am-12:00pm",nivel:"T\xe9cnico Universitario",handle:""}]}},[[43,1,2]]]);
//# sourceMappingURL=main.d3d73d21.chunk.js.map