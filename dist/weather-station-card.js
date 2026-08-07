const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,_=p.trustedTypes,m=_?_.emptyScript:"",y=p.reactiveElementPolyfillSupport,g=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[g("elementProperties")]=new Map,v[g("finalized")]=new Map,y?.({ReactiveElement:v}),(p.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,O=`<${k}>`,P=document,H=()=>P.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,j=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,D=/"/g,W=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),F=new WeakMap,q=P.createTreeWalker(P,129);function G(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=T;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===T?"!--"===l[1]?o=R:void 0!==l[1]?o=j:void 0!==l[2]?(W.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=z):void 0!==l[3]&&(o=z):o===z?">"===l[0]?(o=n??T,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?z:'"'===l[3]?D:L):o===D||o===L?o=z:o===R||o===j?o=T:(o=z,n=void 0);const d=o===z&&t[e+1].startsWith("/>")?" ":"";r+=o===T?i+O:c>=0?(s.push(a),i.slice(0,c)+S+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=K.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[r++],i=s.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:X}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(W.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],H()),q.nextNode(),a.push({type:2,index:++n});s.append(t[e],H())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===I)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);q.currentNode=s;let n=q.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=q.nextNode(),r++)}return q.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),U(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new K(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(H()),this.O(H()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=Z(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=Z(this,s[i+o],e,o),a===I&&(a=this._$AH[o]),r||=!U(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??V)===I)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}let st=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}};const nt=w.litHtmlPolyfillSupport;nt?.(K,Q),(w.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class ot extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(H(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;var lt,ct;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2"),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(lt||(lt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ct||(ct={}));var ht=["closed","locked","off"],dt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return n.detail=i,t.dispatchEvent(n),n},ut=function(t){dt(window,"haptic",t)},pt=function(t,e,i,s){if(s||(s={action:"more-info"}),!s.confirmation||s.confirmation.exemptions&&s.confirmation.exemptions.some(function(t){return t.user===e.user.id})||(ut("warning"),confirm(s.confirmation.text||"Are you sure you want to "+s.action+"?")))switch(s.action){case"more-info":(i.entity||i.camera_image)&&dt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":s.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),dt(window,"location-changed",{replace:i})}(0,s.navigation_path);break;case"url":s.url_path&&window.open(s.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var s,n=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===n?"homeassistant":n;switch(n){case"lock":s=i?"unlock":"lock";break;case"cover":s=i?"open_cover":"close_cover";break;default:s=i?"turn_on":"turn_off"}t.callService(r,s,{entity_id:e})})(t,e,ht.includes(t.states[e].state))}(e,i.entity),ut("success"));break;case"call-service":if(!s.service)return void ut("failure");var n=s.service.split(".",2);e.callService(n[0],n[1],s.service_data,s.target),ut("success");break;case"fire-dom-event":dt(t,"ll-custom",s)}};const _t="weather-station-card",mt="weather-station-card-editor",yt=[{key:"temperature_entity",label:"Temperature",icon:"mdi:thermometer"},{key:"humidity_entity",label:"Humidity",icon:"mdi:water-percent"},{key:"lux_entity",label:"Light / Lux",icon:"mdi:brightness-7"},{key:"uv_entity",label:"UV Index",icon:"mdi:sun-wireless"},{key:"rain_entity",label:"Rain",icon:"mdi:weather-rainy"},{key:"wind_speed_entity",label:"Wind speed",icon:"mdi:weather-windy"},{key:"wind_direction_entity",label:"Wind direction",icon:"mdi:compass"},{key:"wind_gust_entity",label:"Wind gust",icon:"mdi:weather-windy-variant"},{key:"pressure_entity",label:"Pressure",icon:"mdi:gauge"},{key:"battery_entity",label:"Battery",icon:"mdi:battery-high"},{key:"sun_entity",label:"Sun (day/night)",icon:"mdi:weather-sunny"}],gt={show_dewpoint:!1,show_pressure_trend:!1,show_battery:!0,show_wind_gust:!0,show_interactions:!0,show_daynight:!0,pressure_trend_threshold:1,manual_condition:""},ft=["N","NE","E","SE","S","SW","W","NW"],bt=[{max:2,label:"Low",color:"#4caf50"},{max:5,label:"Moderate",color:"#ffb300"},{max:7,label:"High",color:"#fb8c00"},{max:10,label:"Very high",color:"#e53935"},{max:1/0,label:"Extreme",color:"#8e24aa"}],$t=[{max:100,label:"Dark",icon:"mdi:brightness-2"},{max:1e3,label:"Low light",icon:"mdi:brightness-5"},{max:1e4,label:"Bright",icon:"mdi:brightness-6"},{max:1/0,label:"Very bright",icon:"mdi:brightness-7"}];function vt(t){if(!t)return null;const e=Number(t.state);return Number.isFinite(e)?e:null}function wt(t){return null==t?"—":t>=1e3?Math.round(t/100)/10+" klux":`${Math.round(t)} lux`}function xt(t){return null==t?"mdi:battery-unknown":t>=95?"mdi:battery":t>=70?"mdi:battery-high":t>=40?"mdi:battery-medium":t>=15?"mdi:battery-low":"mdi:battery-outline"}function At({isDay:t,rainMm:e,rainOn:i,lux:s,uv:n}){if(i||null!=e&&e>0)return{icon:"mdi:weather-rainy",label:"Rain"};const r=null!=s&&s>8e3||null!=n&&n>=3;return t?null!=s&&s<4e3&&!r?{icon:"mdi:weather-cloudy",label:"Cloudy"}:r?{icon:"mdi:weather-sunny",label:"Clear sky"}:{icon:"mdi:weather-partly-cloudy",label:"Partly cloudy"}:{icon:"mdi:weather-night",label:"Clear night"}}function Et(t,e=1){if(null==t||""===t)return null;const i=Number(t);if(!Number.isFinite(i))return null;const s=Math.pow(10,e);return Math.round(i*s)/s}function St(t,e=""){return t&&t.attributes&&t.attributes.unit_of_measurement||e}class Ct extends ot{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){this._config={...t,settings:{...gt,...t.settings||{}}}}_schema(){const t=this._config?.settings?.show_pressure_trend;return[{name:"title",selector:{text:{}}},{type:"expandable",name:"",title:"Entities",icon:"mdi:format-list-bulleted",schema:[{name:"temperature_entity",selector:{entity:{}}},{name:"humidity_entity",selector:{entity:{}}},{name:"lux_entity",selector:{entity:{}}},{name:"uv_entity",selector:{entity:{}}},{name:"rain_entity",selector:{entity:{}}},{name:"",type:"grid",schema:[{name:"wind_speed_entity",selector:{entity:{}}},{name:"wind_direction_entity",selector:{entity:{}}},{name:"wind_gust_entity",selector:{entity:{}}}]},{name:"pressure_entity",selector:{entity:{}}},{name:"battery_entity",selector:{entity:{}}},{name:"sun_entity",selector:{entity:{domain:"sun"}}}]},{type:"expandable",name:"settings",title:"Settings",icon:"mdi:cog",schema:[{name:"",type:"grid",schema:[{name:"show_daynight",selector:{boolean:{}}},{name:"show_dewpoint",selector:{boolean:{}}},{name:"show_wind_gust",selector:{boolean:{}}},{name:"show_battery",selector:{boolean:{}}},{name:"show_pressure_trend",selector:{boolean:{}}},{name:"show_interactions",selector:{boolean:{}}}]},...!1===this._config?.settings?.show_daynight?[{name:"manual_condition",selector:{select:{mode:"dropdown",options:[{value:"",label:"Automatic"},{value:"sunny",label:"Sunny"},{value:"cloudy",label:"Cloudy"},{value:"rainy",label:"Rainy"},{value:"night",label:"Night"}]}}}]:[],...t?[{name:"pressure_trend_threshold",selector:{number:{min:.1,max:10,step:.1,unit_of_measurement:"%",mode:"box"}}}]:[]]}]}_computeLabel=t=>({title:"Card title",temperature_entity:"Temperature",humidity_entity:"Humidity",lux_entity:"Light / Lux",uv_entity:"UV Index",rain_entity:"Rain",wind_speed_entity:"Wind speed",wind_direction_entity:"Wind direction",wind_gust_entity:"Wind gust",pressure_entity:"Pressure",battery_entity:"Battery",sun_entity:"Sun (day/night)",show_daynight:"Day / night mode",show_dewpoint:"Dew point",show_wind_gust:"Wind gust",show_battery:"Battery",show_pressure_trend:"Pressure trend",show_interactions:"Interactions",manual_condition:"Manual condition",pressure_trend_threshold:"Trend threshold"}[t.name]||t.title||t.name);_valueChanged(t){if(!this._config)return;const e=t.detail.value,i={...e,settings:{...gt,...e.settings||{}}};Object.keys(i).forEach(t=>{""===i[t]&&t.endsWith("_entity")&&delete i[t]}),dt(this,"config-changed",{config:i})}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="hint">
        Tip: set individual tap / hold actions in YAML, e.g.
        <code>temperature_action:</code>, <code>wind_action:</code>. Sections are
        hidden automatically when their entity is not configured.
      </div>
    `:V}static get styles(){return r`
      .hint {
        margin-top: 12px;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
      code {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
        padding: 1px 5px;
        border-radius: 6px;
      }
    `}}customElements.get(mt)||customElements.define(mt,Ct);class kt extends ot{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static async getConfigElement(){return document.createElement(mt)}static getStubConfig(){return{type:`custom:${_t}`,title:"Weather Station",temperature_entity:"",humidity_entity:"",settings:{...gt}}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={title:"Weather Station",...t,settings:{...gt,...t.settings||{}}},this._pressureHistory=this._pressureHistory||[]}getCardSize(){return 6}shouldUpdate(t){if(!this._config)return!1;if(t.has("_config"))return!0;if(!t.has("hass"))return!0;const e=t.get("hass");return!e||yt.some(({key:t})=>{const i=this._config[t];return!!i&&e.states[i]!==this.hass.states[i]})}_stateObj(t){const e=this._config[t];if(e&&this.hass)return this.hass.states[e]}_isDay(){if(!(this._config.settings||{}).show_daynight)return!0;const t=this._stateObj("sun_entity");if(t)return"above_horizon"===t.state;const e=vt(this._stateObj("lux_entity"));return null==e||e>50}_recordPressure(t){if(null==t)return;const e=Date.now();this._pressureHistory.push({t:e,v:t});const i=e-108e5;this._pressureHistory=this._pressureHistory.filter(t=>t.t>=i)}_pressureTrend(t){const e=Number(this._config.settings.pressure_trend_threshold)||1;if(this._pressureHistory.length<2||null==t)return{icon:"mdi:trending-neutral",label:"Steady"};const i=this._pressureHistory[0].v,s=(t-i)/i*100;return s>=e?{icon:"mdi:arrow-up",label:"Rising"}:s<=-e?{icon:"mdi:arrow-down",label:"Falling"}:{icon:"mdi:trending-neutral",label:"Steady"}}_actionConfig(t){if(!(this._config.settings||{}).show_interactions)return;const e=this._config[t],i=this._config[`${t.replace("_entity","")}_action`];return{entity:e,tap_action:i?.tap_action||{action:"more-info"},hold_action:i?.hold_action,double_tap_action:i?.double_tap_action}}_handleClick(t){const e=this._actionConfig(t);e&&e.entity&&function(t,e,i){var s;i.tap_action&&(s=i.tap_action),pt(t,e,i,s)}(this,this.hass,e)}_clickable(t){const e=this._actionConfig(t);return!(!e||!e.entity||!function(t){return void 0!==t&&"none"!==t.action}(e.tap_action)&&!e.tap_action)}render(){if(!this._config||!this.hass)return V;const t=this._config.settings||{},e=vt(this._stateObj("temperature_entity")),i=vt(this._stateObj("humidity_entity")),s=St(this._stateObj("temperature_entity"),"°C"),n=this._isDay(),r=this._stateObj("rain_entity"),o=!!r&&function(t){if(!t)return!1;const e=String(t.state).toLowerCase();if(["on","true","wet","raining","detected"].includes(e))return!0;const i=Number(t.state);return Number.isFinite(i)&&i>0}(r),a=vt(r),l=vt(this._stateObj("lux_entity")),c=vt(this._stateObj("uv_entity"));let h;if(!t.show_daynight&&this._config.settings.manual_condition){h={sunny:{icon:"mdi:weather-sunny",label:"Clear sky"},cloudy:{icon:"mdi:weather-cloudy",label:"Cloudy"},rainy:{icon:"mdi:weather-rainy",label:"Rain"},night:{icon:"mdi:weather-night",label:"Clear night"}}[this._config.settings.manual_condition]||At({isDay:n,rainMm:a,rainOn:o,lux:l,uv:c})}else h=At({isDay:n,rainMm:a,rainOn:o,lux:l,uv:c});return B`
      <ha-card>
        <div class="wsc">
          ${this._config.title?B`<div class="title">${this._config.title}</div>`:V}

          ${this._renderHero(h,e,s,i)}

          <div class="grid">
            ${this._renderLux(l)}
            ${this._renderTemperature(e,s)}
            ${this._renderHumidity(i)}
            ${this._renderRain(r,o,a)}
            ${this._renderWind()}
            ${this._renderUv(c)}
            ${this._renderPressure()}
            ${this._renderBattery()}
          </div>
        </div>
      </ha-card>
    `}_renderHero(t,e,i,s){const n=(this._config.settings||{}).show_dewpoint?function(t,e){if(null==t||null==e||e<=0)return null;const i=243.12,s=Math.log(e/100)+17.62*t/(i+t),n=i*s/(17.62-s);return Math.round(10*n)/10}(e,s):null;return B`
      <div
        class="hero ${this._clickable("temperature_entity")?"tappable":""}"
        @click=${()=>this._handleClick("temperature_entity")}
      >
        <ha-icon class="hero-icon" .icon=${t.icon}></ha-icon>
        <div class="hero-main">
          <div class="hero-condition">${t.label}</div>
          <div class="hero-temp">
            ${null!=e?`${Et(e,1)} ${i}`:"—"}
          </div>
        </div>
        ${null!=e?B`<div class="hero-sub">
              <span>${function(t,e){return null==t?"":t<0?"Feels freezing":t<10?"Feels cold":t>27&&null!=e&&e>60?"Feels humid":t>30?"Feels hot":t>=18&&t<=26?"Feels comfortable":"Feels mild"}(e,s)}</span>
              ${null!=n?B`<span class="muted">Dewpoint ${n} ${i}</span>`:V}
            </div>`:V}
      </div>
    `}_tile({icon:t,label:e,value:i,sub:s,key:n,accent:r}){const o=!!n&&this._clickable(n);return B`
      <div
        class="tile ${o?"tappable":""}"
        @click=${n?()=>this._handleClick(n):void 0}
      >
        <ha-icon
          class="tile-icon"
          style=${r?`--tile-accent:${r}`:""}
          .icon=${t}
        ></ha-icon>
        <div class="tile-body">
          <div class="tile-label">${e}</div>
          <div class="tile-value">${i}</div>
          ${s?B`<div class="tile-sub">${s}</div>`:V}
        </div>
      </div>
    `}_renderLux(t){if(!this._stateObj("lux_entity"))return V;const e=function(t){return null==t?null:$t.find(e=>t<e.max)||$t[$t.length-1]}(t);return this._tile({icon:e?e.icon:"mdi:brightness-7",label:"Light",value:wt(t),sub:e?e.label:"",key:"lux_entity"})}_renderTemperature(t,e){return this._stateObj("temperature_entity")?this._tile({icon:"mdi:thermometer",label:"Temperature",value:null!=t?`${Et(t,1)} ${e}`:"—",key:"temperature_entity"}):V}_renderHumidity(t){return this._stateObj("humidity_entity")?this._tile({icon:"mdi:water-percent",label:"Humidity",value:null!=t?`${Et(t,0)}%`:"—",key:"humidity_entity"}):V}_renderRain(t,e,i){if(!t)return V;const s=St(t,"mm/h");return this._tile({icon:e?"mdi:weather-rainy":"mdi:weather-partly-rainy",label:"Rain",value:e?"Rain detected":"Dry",sub:null!=i?`${Et(i,1)} ${s}`:"",key:"rain_entity",accent:e?"var(--info-color, #2196f3)":void 0})}_renderWind(){const t=this._stateObj("wind_speed_entity");if(!t)return V;const e=this._config.settings||{},i=vt(t),s=St(t,"m/s"),n=vt(this._stateObj("wind_direction_entity")),r=function(t){if(null==t)return null;const e=Math.round(t%360/45)%8;return ft[e]}(n),o=this._stateObj("wind_gust_entity"),a=vt(o),l=St(o,s);return B`
      <div
        class="tile wind ${this._clickable("wind_speed_entity")?"tappable":""}"
        @click=${()=>this._handleClick("wind_speed_entity")}
      >
        <div class="wind-info">
          <ha-icon class="tile-icon" .icon=${"mdi:weather-windy"}></ha-icon>
          <div class="tile-body">
            <div class="tile-label">Wind</div>
            <div class="tile-value">
              ${null!=i?`${Et(i,1)} ${s}`:"—"}
            </div>
            ${r?B`<div class="tile-sub">${r}</div>`:V}
            ${e.show_wind_gust&&null!=a?B`<div class="tile-sub">
                  <ha-icon class="mini-icon" .icon=${"mdi:weather-windy-variant"}></ha-icon>
                  Gust ${Et(a,0)} ${l}
                </div>`:V}
          </div>
        </div>
        ${null!=n?this._renderCompass(n,r):V}
      </div>
    `}_renderCompass(t,e){return B`
      <div class="compass" title="${e||""} (${Et(t,0)}°)">
        <span class="c-n">N</span>
        <span class="c-e">E</span>
        <span class="c-s">S</span>
        <span class="c-w">W</span>
        <div class="needle" style="transform: rotate(${t}deg)">
          <ha-icon .icon=${"mdi:navigation"}></ha-icon>
        </div>
      </div>
    `}_renderUv(t){if(!this._stateObj("uv_entity"))return V;const e=function(t){return null==t?null:bt.find(e=>t<=e.max)||bt[bt.length-1]}(t);return this._tile({icon:"mdi:sun-wireless",label:"UV Index",value:null!=t?`${Et(t,0)}`:"—",sub:e?e.label:"",key:"uv_entity",accent:e?e.color:void 0})}_renderPressure(){const t=this._stateObj("pressure_entity");if(!t)return V;const e=this._config.settings||{},i=vt(t),s=St(t,"hPa");this._recordPressure(i);const n=e.show_pressure_trend?this._pressureTrend(i):null;return this._tile({icon:"mdi:gauge",label:"Pressure",value:null!=i?`${Et(i,0)} ${s}`:"—",sub:n?B`<ha-icon class="mini-icon" .icon=${n.icon}></ha-icon> ${n.label}`:"",key:"pressure_entity"})}_renderBattery(){if(!(this._config.settings||{}).show_battery)return V;const t=this._stateObj("battery_entity");if(!t)return V;const e=vt(t);let i;return null!=e&&e<15?i="var(--error-color, #e53935)":null!=e&&e<40&&(i="var(--warning-color, #ffa726)"),this._tile({icon:xt(e),label:"Battery",value:null!=e?`${Et(e,0)}%`:"—",key:"battery_entity",accent:i})}static get styles(){return r`
      :host {
        --wsc-radius: 18px;
        --wsc-gap: 10px;
      }
      ha-card {
        overflow: hidden;
      }
      .wsc {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .title {
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        color: var(--primary-text-color);
      }

      /* Hero */
      .hero {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto;
        align-items: center;
        gap: 4px 16px;
        padding: 16px;
        border-radius: var(--wsc-radius);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .hero-icon {
        grid-row: 1 / 3;
        --mdc-icon-size: 46px;
        color: var(--state-icon-color, var(--primary-color));
      }
      .hero-main {
        display: flex;
        flex-direction: column;
      }
      .hero-condition {
        font-size: 0.95rem;
        color: var(--secondary-text-color);
      }
      .hero-temp {
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.1;
        color: var(--primary-text-color);
      }
      .hero-sub {
        grid-column: 2;
        display: flex;
        flex-wrap: wrap;
        gap: 4px 12px;
        font-size: 0.85rem;
        color: var(--secondary-text-color);
      }
      .hero-sub .muted {
        opacity: 0.8;
      }

      /* Grid of tiles */
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--wsc-gap);
      }
      @media (min-width: 500px) {
        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      .tile {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border-radius: var(--wsc-radius);
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        min-height: 56px;
      }
      .tile-icon {
        --mdc-icon-size: 26px;
        color: var(--tile-accent, var(--state-icon-color, var(--primary-color)));
        flex: 0 0 auto;
      }
      .tile-body {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .tile-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--secondary-text-color);
      }
      .tile-value {
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--primary-text-color);
        white-space: nowrap;
      }
      .tile-sub {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .mini-icon {
        --mdc-icon-size: 15px;
      }

      /* Wind + compass */
      .wind {
        justify-content: space-between;
      }
      .wind-info {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
      }
      .compass {
        position: relative;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        flex: 0 0 auto;
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.15));
        color: var(--secondary-text-color);
        font-size: 0.6rem;
      }
      .compass span {
        position: absolute;
        transform: translate(-50%, -50%);
      }
      .compass .c-n { top: 8px; left: 50%; }
      .compass .c-s { top: 44px; left: 50%; }
      .compass .c-e { top: 50%; left: 44px; }
      .compass .c-w { top: 50%; left: 8px; }
      .compass .needle {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.4s ease;
      }
      .compass .needle ha-icon {
        --mdc-icon-size: 22px;
        color: var(--primary-color);
      }

      /* Interactions */
      .tappable {
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .tappable:hover {
        background: var(--divider-color, rgba(0, 0, 0, 0.08));
      }
    `}}customElements.get(_t)||customElements.define(_t,kt),window.customCards=window.customCards||[],window.customCards.find(t=>t.type===_t)||window.customCards.push({type:_t,name:"Weather Station Card",description:"A modern, Mushroom-inspired weather station card.",preview:!0,documentationURL:"https://github.com/your-username/lovelace-weather-station-card"}),console.info("%c WEATHER-STATION-CARD %c v1.0.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{kt as WeatherStationCard};
