(self.webpackChunkwebtool_zbar_qr=self.webpackChunkwebtool_zbar_qr||[]).push([[198],{719:(t,a,e)=>{let n=function(){return Promise.reject(new Error("server side render not support"))};new Function("try {return this===window;}catch(e){ return false;}")()&&(n=e(650)),t.exports=n},198:(t,a,e)=>{"use strict";e.r(a),e.d(a,{default:()=>i});const n={template:'<div class="d-inline-block" v-if="id"><b-form-file :id="id" placeholder="請選擇檔案..." @change="parseFile" accept=".jpg, .png" plain style="display:none;"></b-form-file><label class="btn btn-secondary btn-sm" :for="id"><b-icon-card-image></b-icon-card-image></label></div>',props:[],data:function(){return{id:""}},mounted:function(){this.id=`img-${this._uid}`},methods:{parseFile:function(t){const a=this,e=t.srcElement,n=e.files[0];e.value="";const s=new window.FileReader;s.addEventListener("load",(function(){const t=s.result,e=new window.Image;e.onload=function(){const{width:n,height:s}=this;Object.assign(a,{width:n,height:s,url:t}),a.$emit("load",e,a)},e.src=t}),!1),n&&s.readAsDataURL(n)}}};var s=e(719);const i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container-fluid px-0"},[e("nav",{staticClass:"navbar navbar-dark bg-dark"},[e("div",{staticClass:"navbar-brand d-flex"},[e("div",[t._v("webtool-zbar-qr")]),e("open-image",{staticClass:"ml-1",on:{load:t.scan}})],1)]),e("div",{staticClass:"container-fluid"},[e("b-card",{attrs:{"no-body":""}},[e("b-card-header",{attrs:{"header-tag":"nav"}},[e("b-nav",{staticClass:"mb-1",attrs:{"card-header":"",tabs:""}},[e("b-nav-item",{attrs:{active:"image"===t.tabIndex},on:{click:function(a){t.tabIndex="image"}}},[t._v("圖片")]),t.result?e("b-nav-item",{attrs:{active:"result"===t.tabIndex},on:{click:function(a){t.tabIndex="result"}}},[t._v("結果")]):t._e()],1)],1),e("b-card-body",{directives:[{name:"show",rawName:"v-show",value:"image"===t.tabIndex,expression:"tabIndex==='image'"}]},[e("div",{staticClass:"d-flex align-items-center justify-content-around mt-2"},[e("canvas",{ref:"canvas",staticClass:"w-50"}),e("canvas",{ref:"qrcode",staticClass:"w-50"})])]),"result"===t.tabIndex?e("b-card-body",[e("pre",[t._v(t._s(t.result))])]):t._e()],1)],1)])},staticRenderFns:[],components:{"open-image":n},data:()=>({tabIndex:"image",result:""}),methods:{scan:async function(t){const a=this.$refs.canvas,{width:e,height:n}=t;Object.assign(a,{width:e,height:n});const i=await window.createImageBitmap(t),r=a.getContext("2d");r.drawImage(i,0,0,e,n);const c=r.getImageData(0,0,e,n),d=await s(c);this.result=JSON.stringify(d,null,4);const o=this.$refs.qrcode,l=o.getContext("2d"),b=512,u=512,h=d.shift();if(!h)return void l.clearRect(0,0,b,u);const m=h.loc;Object.assign(o,{width:b,height:u});const f=l.createImageData(b,u),v=(m[3].x-m[0].x)/b,g=(m[1].x-m[0].x)/u,w=(m[2].x+m[0].x-m[3].x-m[1].x)/(b*u),p=m[0].x,x=(m[3].y-m[0].y)/b,y=(m[1].y-m[0].y)/u,I=(m[2].y+m[0].y-m[3].y-m[1].y)/(b*u),_=m[0].y;for(let t=0;t<u;t++)for(let a=0;a<b;a++){const n=4*(t*b+a),s=parseInt(v*a+g*t+w*a*t+p),i=4*(parseInt(x*a+y*t+I*a*t+_)*e+s);f.data[n]=c.data[i],f.data[n+1]=c.data[i+1],f.data[n+2]=c.data[i+2],f.data[n+3]=c.data[i+3]}l.putImageData(f,0,0)}}}}}]);