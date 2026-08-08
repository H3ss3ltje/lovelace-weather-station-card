const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new r(n,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,m=p.trustedTypes,_=m?m.emptyScript:"",g=p.reactiveElementPolyfillSupport,y=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!a(t,e),x={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&l(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const s=n?.call(this);r?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),r=t.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=n;const s=r.fromAttribute(e,t.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(t,e,i,n=!1,r){if(void 0!==t){const s=this.constructor;if(!1===n&&(r=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??w)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:r},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==r||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[y("elementProperties")]=new Map,b[y("finalized")]=new Map,g?.({ReactiveElement:b}),(p.reactiveElementVersions??=[]).push("2.1.2");const v=globalThis,$=t=>t,k=v.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+E,F=`<${z}>`,M=document,C=()=>M.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,O="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,L=/>/g,D=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,j=/"/g,P=/^(?:script|style|textarea|title)$/i,R=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),U=R(1),G=R(2),K=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),I=new WeakMap,Z=M.createTreeWalker(M,129);function q(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,n=[];let r,s=2===e?"<svg>":3===e?"<math>":"",o=B;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===B?"!--"===l[1]?o=H:void 0!==l[1]?o=L:void 0!==l[2]?(P.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=D):void 0!==l[3]&&(o=D):o===D?">"===l[0]?(o=r??B,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?D:'"'===l[3]?j:W):o===j||o===W?o=D:o===H||o===L?o=B:(o=D,r=void 0);const h=o===D&&t[e+1].startsWith("/>")?" ":"";s+=o===B?i+F:c>=0?(n.push(a),i.slice(0,c)+A+i.slice(c)+E+h):i+E+(-2===c?e:h)}return[q(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class J{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let r=0,s=0;const o=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=J.createElement(l,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=Z.nextNode())&&a.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(A)){const e=c[s++],i=n.getAttribute(t).split(E),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?it:"?"===o[1]?nt:"@"===o[1]?rt:et}),n.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:r}),n.removeAttribute(t));if(P.test(n.tagName)){const t=n.textContent.split(E),e=t.length-1;if(e>0){n.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],C()),Z.nextNode(),a.push({type:2,index:++r});n.append(t[e],C())}}}else if(8===n.nodeType)if(n.data===z)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=n.data.indexOf(E,t+1));)a.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,n){if(e===K)return e;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const s=N(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(t),r._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,n)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??M).importNode(e,!0);Z.currentNode=n;let r=Z.nextNode(),s=0,o=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new tt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++o]}s!==a?.index&&(r=Z.nextNode(),s++)}return Z.currentNode=M,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),N(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new X(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new J(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const r of t)n===e.length?e.push(i=new tt(this.O(C()),this.O(C()),this,this.options)):i=e[n],i._$AI(r),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,n){const r=this.strings;let s=!1;if(void 0===r)t=Q(this,t,e,0),s=!N(t)||t!==this._$AH&&t!==K,s&&(this._$AH=t);else{const n=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Q(this,n[i+o],e,o),a===K&&(a=this._$AH[o]),s||=!N(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}s&&!n&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class nt extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class rt extends et{constructor(t,e,i,n,r){super(t,e,i,n,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===K)return;const i=this._$AH,n=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}let st=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}};const ot=v.litHtmlPolyfillSupport;ot?.(J,tt),(v.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;class lt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let r=n._$litPart$;if(void 0===r){const t=i?.renderBefore??null;n._$litPart$=r=new tt(e.insertBefore(C(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}lt._$litElement$=!0,lt.finalized=!0,at.litElementHydrateSupport?.({LitElement:lt});const ct=at.litElementPolyfillSupport;var dt,ht;ct?.({LitElement:lt}),(at.litElementVersions??=[]).push("4.2.2"),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(dt||(dt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ht||(ht={}));var ut=["closed","locked","off"],pt=function(t,e,i,n){n=n||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return r.detail=i,t.dispatchEvent(r),r},mt=function(t){pt(window,"haptic",t)},_t=function(t,e,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some(function(t){return t.user===e.user.id})||(mt("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&pt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),pt(window,"location-changed",{replace:i})}(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var n,r=function(t){return t.substr(0,t.indexOf("."))}(e),s="group"===r?"homeassistant":r;switch(r){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}t.callService(s,n,{entity_id:e})})(t,e,ut.includes(t.states[e].state))}(e,i.entity),mt("success"));break;case"call-service":if(!n.service)return void mt("failure");var r=n.service.split(".",2);e.callService(r[0],r[1],n.service_data,n.target),mt("success");break;case"fire-dom-event":pt(t,"ll-custom",n)}};const gt="weather-station-card",yt="weather-station-card-editor",ft=[{key:"temperature_entity",icon:"mdi:thermometer"},{key:"humidity_entity",icon:"mdi:water-percent"},{key:"lux_entity",icon:"mdi:brightness-7"},{key:"uv_entity",icon:"mdi:sun-wireless"},{key:"rain_entity",icon:"mdi:weather-rainy"},{key:"wind_speed_entity",icon:"mdi:weather-windy"},{key:"wind_direction_entity",icon:"mdi:compass"},{key:"wind_gust_entity",icon:"mdi:weather-windy-variant"},{key:"pressure_entity",icon:"mdi:gauge"},{key:"battery_entity",icon:"mdi:battery-high"},{key:"sun_entity",icon:"mdi:weather-sunny"},{key:"azimuth_entity",icon:"mdi:compass-outline"},{key:"elevation_entity",icon:"mdi:angle-acute"},{key:"temperature_min_entity",icon:"mdi:thermometer-low"},{key:"temperature_max_entity",icon:"mdi:thermometer-high"},{key:"rain_today_entity",icon:"mdi:weather-pouring"}],wt=["lux","temperature","humidity","rain","wind","uv","pressure","battery"],xt={show_dewpoint:!1,show_pressure_trend:!1,show_battery:!0,show_wind_gust:!0,show_interactions:!0,show_daynight:!0,show_sun:!0,show_minmax:!0,show_rain_today:!0,show_beaufort:!0,compact_mode:!1,night_palette:!0,lux_in_klux:!1,tile_order:[...wt],pressure_trend_threshold:1,manual_condition:""},bt=["N","NE","E","SE","S","SW","W","NW"],vt=[{max:2,labelKey:"low",color:"#4caf50"},{max:5,labelKey:"moderate",color:"#ffb300"},{max:7,labelKey:"high",color:"#fb8c00"},{max:10,labelKey:"very_high",color:"#e53935"},{max:1/0,labelKey:"extreme",color:"#8e24aa"}],$t=[{max:100,labelKey:"dark",icon:"lux_dark"},{max:2e3,labelKey:"low_light",icon:"lux_low"},{max:2e4,labelKey:"bright",icon:"lux_bright"},{max:8e4,labelKey:"very_bright",icon:"lux_very_bright"},{max:1/0,labelKey:"full_sun",icon:"lux_full_sun"}];function kt(t){if(!t)return null;const e=Number(t.state);return Number.isFinite(e)?e:null}function St(t){if(null==t)return null;const e=Math.round(t%360/45)%8;return bt[e]}function At(t,e={}){if(null==t||!Number.isFinite(Number(t)))return null;const i=Number(t);return e.lux_in_klux?1e3*i:i}function Et(t){if(null==t)return"—";if(t>=1e3){const e=t/1e3;return e>=100?`${Math.round(e)} klux`:Math.round(10*e)/10+" klux"}return`${Math.round(t)} lux`}function zt(t){return null==t?"battery_unknown":t>=95?"battery":t>=70?"battery_high":t>=40?"battery_medium":t>=15?"battery_low":"battery_outline"}function Ft({isDay:t,rainMm:e,rainOn:i,lux:n,uv:r}){if(i||null!=e&&e>0)return{icon:"rainy",labelKey:"rain"};const s=null!=n&&n>2e4||null!=r&&r>=3;return t?null!=n&&n<5e3&&!s?{icon:"cloudy",labelKey:"cloudy"}:s?{icon:"sunny",labelKey:"clear_sky"}:{icon:"partly_cloudy",labelKey:"partly_cloudy"}:{icon:"night",labelKey:"clear_night"}}function Mt(t,e=1){if(null==t||""===t)return null;const i=Number(t);if(!Number.isFinite(i))return null;const n=Math.pow(10,e);return Math.round(i*n)/n}function Ct(t,e=""){return t&&t.attributes&&t.attributes.unit_of_measurement||e}function Nt(t,e){if(!e)return null;const i=new Date(e);if(Number.isNaN(i.getTime()))return null;const n=t?.locale?.language||t?.language||t?.selectedLanguage||void 0;return i.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit"})}function Tt(t,e,i,n,r){const s=1-r,o=r*r,a=s*s;return{x:a*s*t.x+3*a*r*e.x+3*s*o*i.x+o*r*n.x,y:a*s*t.y+3*a*r*e.y+3*s*o*i.y+o*r*n.y}}const Ot={left:[{x:30,y:60},{x:44,y:49},{x:70,y:12},{x:100,y:12}],right:[{x:100,y:12},{x:130,y:12},{x:156,y:49},{x:170,y:60}]},Bt=[{x:3,y:78},{x:14,y:78},{x:24,y:66},{x:30,y:60}],Ht=[{x:170,y:60},{x:176,y:66},{x:186,y:78},{x:197,y:78}],Lt=[Bt,Ot.left,Ot.right,Ht];function Dt([t,e,i,n]){let r=0,s=Tt(t,e,i,n,0);for(let o=1;o<=24;o++){const a=Tt(t,e,i,n,o/24);r+=Math.hypot(a.x-s.x,a.y-s.y),s=a}return r}let Wt=null,jt=null,Pt=0;function Rt(){if(Wt)return;Wt=Lt.map(Dt),Pt=Wt.reduce((t,e)=>t+e,0),jt=[];let t=0;for(const e of Wt)jt.push(t),t+=e}function Ut(t,e){return Rt(),(jt[t]+e*Wt[t])/Pt}function Gt([t,e,i,n],r){let s=Tt(t,e,i,n,0),o=0,a=1/0;for(let l=0;l<=120;l++){const c=l/120,d=Tt(t,e,i,n,c),h=Math.abs(d.y-r);h<a&&(a=h,s=d,o=c)}return{p:s,u:o}}function Kt(t,e){if(null==t||!Number.isFinite(Number(t)))return null;const i=Number(t),n=String(e||"").toLowerCase();return n.includes("km/h")||n.includes("kmh")||n.includes("kph")?i/3.6:n.includes("mph")?.44704*i:n.includes("kn")||n.includes("kt")?.514444*i:i}function Vt(t){if(null==t||!Number.isFinite(t))return null;return[{max:.5,n:0,key:"calm"},{max:1.6,n:1,key:"light_air"},{max:3.4,n:2,key:"light_breeze"},{max:5.5,n:3,key:"gentle_breeze"},{max:8,n:4,key:"moderate_breeze"},{max:10.8,n:5,key:"fresh_breeze"},{max:13.9,n:6,key:"strong_breeze"},{max:17.2,n:7,key:"near_gale"},{max:20.8,n:8,key:"gale"},{max:24.5,n:9,key:"strong_gale"},{max:28.5,n:10,key:"storm"},{max:32.7,n:11,key:"violent_storm"},{max:1/0,n:12,key:"hurricane"}].find(e=>t<e.max)}const It={en:{common:{card_title:"Weather Station",card_name:"Weather Station Card",card_description:"A modern, Mushroom-inspired weather station card."},condition:{clear_sky:"Clear sky",cloudy:"Cloudy",rain:"Rain",clear_night:"Clear night",partly_cloudy:"Partly cloudy"},comfort:{freezing:"Feels freezing",cold:"Feels cold",humid:"Feels humid",hot:"Feels hot",comfortable:"Feels comfortable",mild:"Feels mild"},dewpoint:"Dewpoint {value} {unit}",sections:{light:"Light",temperature:"Temp",humidity:"Humidity",rain:"Rain",wind:"Wind",uv:"UV Index",pressure:"Pressure",battery:"Battery",dewpoint:"Dew point"},sun:{sunrise:"Sunrise",sunset:"Sunset",azimuth:"Azimuth",elevation:"Elevation"},rain:{detected:"Rain detected",dry:"Dry",today:"Today"},wind:{gust:"Gust {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Calm",light_air:"Light air",light_breeze:"Light breeze",gentle_breeze:"Gentle breeze",moderate_breeze:"Moderate breeze",fresh_breeze:"Fresh breeze",strong_breeze:"Strong breeze",near_gale:"Near gale",gale:"Gale",strong_gale:"Strong gale",storm:"Storm",violent_storm:"Violent storm",hurricane:"Hurricane"},lux:{dark:"Dark",low_light:"Low light",bright:"Bright",very_bright:"Very bright",full_sun:"Full sun"},uv:{low:"Low",moderate:"Moderate",high:"High",very_high:"Very high",extreme:"Extreme"},pressure:{rising:"Rising",falling:"Falling",steady:"Steady"},compass:{N:"N",NE:"NE",E:"E",SE:"SE",S:"S",SW:"SW",W:"W",NW:"NW"},editor:{entities:"Entities",settings:"Settings",title:"Card title",temperature_entity:"Temperature",humidity_entity:"Humidity",lux_entity:"Light / Lux",uv_entity:"UV Index",rain_entity:"Rain",wind_speed_entity:"Wind speed",wind_direction_entity:"Wind direction",wind_gust_entity:"Wind gust",pressure_entity:"Pressure",battery_entity:"Battery",sun_entity:"Sun (sunrise / sunset)",azimuth_entity:"Azimuth (optional override)",elevation_entity:"Elevation (optional override)",temperature_min_entity:"Min temperature today (optional)",temperature_max_entity:"Max temperature today (optional)",rain_today_entity:"Rain total today (optional)",show_daynight:"Day / night mode",show_sun:"Sunrise / sunset diagram",show_dewpoint:"Dew point",show_minmax:"Today min / max",show_rain_today:"Rain total today",show_beaufort:"Beaufort scale",show_wind_gust:"Wind gust",show_battery:"Battery",show_pressure_trend:"Pressure trend",show_interactions:"Interactions",compact_mode:"Compact mode (hero + sun only)",night_palette:"Night palette for sun diagram",lux_in_klux:"Lux sensor reports kilolux (0–200)",tile_order:"Tile order",tile_order_hint:"Change the order of sensor tiles in the grid. Empty entities stay hidden.",tile_order_reset:"Reset",tile_lux:"Light / Lux",tile_temperature:"Temperature",tile_humidity:"Humidity",tile_rain:"Rain",tile_wind:"Wind",tile_uv:"UV Index",tile_pressure:"Pressure",tile_battery:"Battery",manual_condition:"Manual condition",pressure_trend_threshold:"Trend threshold",automatic:"Automatic",sunny:"Sunny",cloudy:"Cloudy",rainy:"Rainy",night:"Night",hint:"Tip: set individual tap / hold actions in YAML, e.g. temperature_action:, wind_action:. Sections are hidden automatically when their entity is not configured. Tile order can also be set in YAML under settings.tile_order."}},nl:{common:{card_title:"Weerstation",card_name:"Weerstationkaart",card_description:"Een moderne, Mushroom-geïnspireerde weerstationkaart."},condition:{clear_sky:"Heldere lucht",cloudy:"Bewolkt",rain:"Regen",clear_night:"Heldere nacht",partly_cloudy:"Gedeeltelijk bewolkt"},comfort:{freezing:"Voelt vriezend",cold:"Voelt koud",humid:"Voelt vochtig",hot:"Voelt heet",comfortable:"Voelt comfortabel",mild:"Voelt mild"},dewpoint:"Dauwpunt {value} {unit}",sections:{light:"Licht",temperature:"Temp",humidity:"Vochtigheid",rain:"Regen",wind:"Wind",uv:"UV-index",pressure:"Luchtdruk",battery:"Batterij",dewpoint:"Dauwpunt"},sun:{sunrise:"Zonsopkomst",sunset:"Zonsondergang",azimuth:"Azimut",elevation:"Elevatie"},rain:{detected:"Regen gedetecteerd",dry:"Droog",today:"Vandaag"},wind:{gust:"Windstoot {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Windstil",light_air:"Zwakke wind",light_breeze:"Zwakke wind",gentle_breeze:"Matige wind",moderate_breeze:"Matige wind",fresh_breeze:"Vrij krachtige wind",strong_breeze:"Krachtige wind",near_gale:"Harde wind",gale:"Stormachtig",strong_gale:"Storm",storm:"Zware storm",violent_storm:"Zeer zware storm",hurricane:"Orkaan"},lux:{dark:"Donker",low_light:"Weinig licht",bright:"Helder",very_bright:"Zeer helder",full_sun:"Volle zon"},uv:{low:"Laag",moderate:"Matig",high:"Hoog",very_high:"Zeer hoog",extreme:"Extreem"},pressure:{rising:"Stijgend",falling:"Dalend",steady:"Stabiel"},compass:{N:"N",NE:"NO",E:"O",SE:"ZO",S:"Z",SW:"ZW",W:"W",NW:"NW"},editor:{entities:"Entiteiten",settings:"Instellingen",title:"Kaarttitel",temperature_entity:"Temperatuur",humidity_entity:"Luchtvochtigheid",lux_entity:"Licht / Lux",uv_entity:"UV-index",rain_entity:"Regen",wind_speed_entity:"Windsnelheid",wind_direction_entity:"Windrichting",wind_gust_entity:"Windstoot",pressure_entity:"Luchtdruk",battery_entity:"Batterij",sun_entity:"Zon (zonsopkomst / zonsondergang)",azimuth_entity:"Azimut (optionele override)",elevation_entity:"Elevatie (optionele override)",temperature_min_entity:"Min temperatuur vandaag (optioneel)",temperature_max_entity:"Max temperatuur vandaag (optioneel)",rain_today_entity:"Regen totaal vandaag (optioneel)",show_daynight:"Dag / nacht modus",show_sun:"Zonsopkomst / zonsondergang diagram",show_dewpoint:"Dauwpunt",show_minmax:"Vandaag min / max",show_rain_today:"Regen totaal vandaag",show_beaufort:"Beaufortschaal",show_wind_gust:"Windstoot",show_battery:"Batterij",show_pressure_trend:"Luchtdruktrend",show_interactions:"Interacties",compact_mode:"Compacte modus (alleen hero + zon)",night_palette:"Nachtpalet voor zondiagram",lux_in_klux:"Lux-sensor geeft kilolux (0–200)",tile_order:"Tegelvolgorde",tile_order_hint:"Wijzig de volgorde van sensortegels in het raster. Ontbrekende entiteiten blijven verborgen.",tile_order_reset:"Reset",tile_lux:"Licht / Lux",tile_temperature:"Temperatuur",tile_humidity:"Vochtigheid",tile_rain:"Regen",tile_wind:"Wind",tile_uv:"UV-index",tile_pressure:"Luchtdruk",tile_battery:"Batterij",manual_condition:"Handmatige conditie",pressure_trend_threshold:"Trenddrempel",automatic:"Automatisch",sunny:"Zonnig",cloudy:"Bewolkt",rainy:"Regenachtig",night:"Nacht",hint:"Tip: stel aparte tip-/houdacties in via YAML, bijv. temperature_action:, wind_action:. Secties worden verborgen als hun entiteit niet is geconfigureerd. Tegelvolgorde kan ook via settings.tile_order in YAML."}},es:{common:{card_title:"Estación meteorológica",card_name:"Tarjeta de estación meteorológica",card_description:"Una tarjeta moderna de estación meteorológica inspirada en Mushroom."},condition:{clear_sky:"Cielo despejado",cloudy:"Nublado",rain:"Lluvia",clear_night:"Noche despejada",partly_cloudy:"Parcialmente nublado"},comfort:{freezing:"Se siente gélido",cold:"Se siente frío",humid:"Se siente húmedo",hot:"Se siente caluroso",comfortable:"Se siente cómodo",mild:"Se siente templado"},dewpoint:"Punto de rocío {value} {unit}",sections:{light:"Luz",temperature:"Temp",humidity:"Humedad",rain:"Lluvia",wind:"Viento",uv:"Índice UV",pressure:"Presión",battery:"Batería",dewpoint:"Punto de rocío"},sun:{sunrise:"Amanecer",sunset:"Atardecer",azimuth:"Azimut",elevation:"Elevación"},rain:{detected:"Lluvia detectada",dry:"Seco",today:"Hoy"},wind:{gust:"Ráfaga {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Calma",light_air:"Ventolina",light_breeze:"Brisa ligera",gentle_breeze:"Brisa suave",moderate_breeze:"Brisa moderada",fresh_breeze:"Brisa fresca",strong_breeze:"Brisa fuerte",near_gale:"Viento fuerte",gale:"Temporal",strong_gale:"Temporal fuerte",storm:"Temporal duro",violent_storm:"Temporal muy duro",hurricane:"Huracán"},lux:{dark:"Oscuro",low_light:"Poca luz",bright:"Luminoso",very_bright:"Muy luminoso",full_sun:"Sol pleno"},uv:{low:"Bajo",moderate:"Moderado",high:"Alto",very_high:"Muy alto",extreme:"Extremo"},pressure:{rising:"Subiendo",falling:"Bajando",steady:"Estable"},compass:{N:"N",NE:"NE",E:"E",SE:"SE",S:"S",SW:"SO",W:"O",NW:"NO"},editor:{entities:"Entidades",settings:"Ajustes",title:"Título de la tarjeta",temperature_entity:"Temperatura",humidity_entity:"Humedad",lux_entity:"Luz / Lux",uv_entity:"Índice UV",rain_entity:"Lluvia",wind_speed_entity:"Velocidad del viento",wind_direction_entity:"Dirección del viento",wind_gust_entity:"Ráfaga de viento",pressure_entity:"Presión",battery_entity:"Batería",sun_entity:"Sol (amanecer / atardecer)",azimuth_entity:"Azimut (opcional)",elevation_entity:"Elevación (opcional)",temperature_min_entity:"Temperatura mín. hoy (opcional)",temperature_max_entity:"Temperatura máx. hoy (opcional)",rain_today_entity:"Lluvia total hoy (opcional)",show_daynight:"Modo día / noche",show_sun:"Diagrama de amanecer / atardecer",show_dewpoint:"Punto de rocío",show_minmax:"Mín / máx de hoy",show_rain_today:"Lluvia total hoy",show_beaufort:"Escala de Beaufort",show_wind_gust:"Ráfaga de viento",show_battery:"Batería",show_pressure_trend:"Tendencia de presión",show_interactions:"Interacciones",compact_mode:"Modo compacto (solo hero + sol)",night_palette:"Paleta nocturna del diagrama solar",lux_in_klux:"El sensor de lux reporta kilolux (0–200)",tile_order:"Orden de mosaicos",tile_order_hint:"Cambia el orden de los mosaicos de sensores en la cuadrícula. Las entidades vacías siguen ocultas.",tile_order_reset:"Restablecer",tile_lux:"Luz / Lux",tile_temperature:"Temperatura",tile_humidity:"Humedad",tile_rain:"Lluvia",tile_wind:"Viento",tile_uv:"Índice UV",tile_pressure:"Presión",tile_battery:"Batería",manual_condition:"Condición manual",pressure_trend_threshold:"Umbral de tendencia",automatic:"Automático",sunny:"Soleado",cloudy:"Nublado",rainy:"Lluvioso",night:"Noche",hint:"Consejo: configura acciones de toque / mantener en YAML, p. ej. temperature_action:, wind_action:. Las secciones se ocultan automáticamente si no hay entidad configurada. El orden también se puede definir en settings.tile_order."}},de:{common:{card_title:"Wetterstation",card_name:"Wetterstationskarte",card_description:"Eine moderne, von Mushroom inspirierte Wetterstationskarte."},condition:{clear_sky:"Klarer Himmel",cloudy:"Bewölkt",rain:"Regen",clear_night:"Klare Nacht",partly_cloudy:"Teilweise bewölkt"},comfort:{freezing:"Fühlt sich eiskalt an",cold:"Fühlt sich kalt an",humid:"Fühlt sich schwül an",hot:"Fühlt sich heiß an",comfortable:"Fühlt sich angenehm an",mild:"Fühlt sich mild an"},dewpoint:"Taupunkt {value} {unit}",sections:{light:"Licht",temperature:"Temp",humidity:"Feuchte",rain:"Regen",wind:"Wind",uv:"UV-Index",pressure:"Luftdruck",battery:"Batterie",dewpoint:"Taupunkt"},sun:{sunrise:"Sonnenaufgang",sunset:"Sonnenuntergang",azimuth:"Azimut",elevation:"Höhe"},rain:{detected:"Regen erkannt",dry:"Trocken",today:"Heute"},wind:{gust:"Böe {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Windstille",light_air:"Leiser Zug",light_breeze:"Leichte Brise",gentle_breeze:"Schwache Brise",moderate_breeze:"Mäßige Brise",fresh_breeze:"Frische Brise",strong_breeze:"Starker Wind",near_gale:"Steifer Wind",gale:"Stürmischer Wind",strong_gale:"Sturm",storm:"Schwerer Sturm",violent_storm:"Orkanartiger Sturm",hurricane:"Orkan"},lux:{dark:"Dunkel",low_light:"Wenig Licht",bright:"Hell",very_bright:"Sehr hell",full_sun:"Volle Sonne"},uv:{low:"Niedrig",moderate:"Mäßig",high:"Hoch",very_high:"Sehr hoch",extreme:"Extrem"},pressure:{rising:"Steigend",falling:"Fallend",steady:"Stabil"},compass:{N:"N",NE:"NO",E:"O",SE:"SO",S:"S",SW:"SW",W:"W",NW:"NW"},editor:{entities:"Entitäten",settings:"Einstellungen",title:"Kartentitel",temperature_entity:"Temperatur",humidity_entity:"Luftfeuchtigkeit",lux_entity:"Licht / Lux",uv_entity:"UV-Index",rain_entity:"Regen",wind_speed_entity:"Windgeschwindigkeit",wind_direction_entity:"Windrichtung",wind_gust_entity:"Windböe",pressure_entity:"Luftdruck",battery_entity:"Batterie",sun_entity:"Sonne (Aufgang / Untergang)",azimuth_entity:"Azimut (optional)",elevation_entity:"Höhe (optional)",temperature_min_entity:"Min. Temperatur heute (optional)",temperature_max_entity:"Max. Temperatur heute (optional)",rain_today_entity:"Regenmenge heute (optional)",show_daynight:"Tag-/Nachtmodus",show_sun:"Sonnenauf-/untergang Diagramm",show_dewpoint:"Taupunkt",show_minmax:"Heute Min / Max",show_rain_today:"Regenmenge heute",show_beaufort:"Beaufort-Skala",show_wind_gust:"Windböe",show_battery:"Batterie",show_pressure_trend:"Luftdrucktrend",show_interactions:"Interaktionen",compact_mode:"Kompaktmodus (nur Hero + Sonne)",night_palette:"Nachtpalette für Sonnendiagramm",lux_in_klux:"Lux-Sensor liefert Kilolux (0–200)",tile_order:"Kachelreihenfolge",tile_order_hint:"Reihenfolge der Sensorkacheln im Raster ändern. Fehlende Entitäten bleiben ausgeblendet.",tile_order_reset:"Zurücksetzen",tile_lux:"Licht / Lux",tile_temperature:"Temperatur",tile_humidity:"Luftfeuchtigkeit",tile_rain:"Regen",tile_wind:"Wind",tile_uv:"UV-Index",tile_pressure:"Luftdruck",tile_battery:"Batterie",manual_condition:"Manueller Zustand",pressure_trend_threshold:"Trendschwelle",automatic:"Automatisch",sunny:"Sonnig",cloudy:"Bewölkt",rainy:"Regnerisch",night:"Nacht",hint:"Tipp: Tippen-/Halten-Aktionen in YAML setzen, z. B. temperature_action:, wind_action:. Abschnitte werden ausgeblendet, wenn keine Entität konfiguriert ist. Kachelreihenfolge auch unter settings.tile_order in YAML."}}};function Zt(t,e){return e.split(".").reduce((t,e)=>t&&null!=t[e]?t[e]:void 0,t)}function qt(t,e,i={}){const n=t&&(t.locale?.language||t.language||t.selectedLanguage)||"en",r=String(n).replace("_","-").split("-")[0].toLowerCase();let s=Zt(It[r],e)??Zt(It.en,e)??e;return"string"!=typeof s?e:(Object.keys(i).forEach(t=>{s=s.replace(`{${t}}`,String(i[t]))}),s)}let Yt=0;function Jt(t="g"){return Yt+=1,`${t}${Yt}`}function Qt(t,e=""){return U`<span class="wsc-icon ${e}" aria-hidden="true">${t}</span>`}function Xt(t,e={}){const i=Jt("th"),n=function(t,e){if(null==t||!Number.isFinite(Number(t)))return null;const i=Number(t);return String(e||"").toLowerCase().includes("f")?5*(i-32)/9:i}(e.value,e.unit),{cold:r,hot:s,t:o}=function(t){const e=Math.max(0,Math.min(1,((t??20)+30)/70)),i=[{p:0,r:10,g:132,b:255},{p:.43,r:90,g:200,b:250},{p:.64,r:52,g:199,b:89},{p:.79,r:255,g:159,b:10},{p:1,r:255,g:69,b:58}];let n=i[0],r=i[i.length-1];for(let t=0;t<i.length-1;t++)if(e>=i[t].p&&e<=i[t+1].p){n=i[t],r=i[t+1];break}const s=(e-n.p)/(r.p-n.p||1),o=Math.round(n.r+(r.r-n.r)*s),a=Math.round(n.g+(r.g-n.g)*s),l=Math.round(n.b+(r.b-n.b)*s),c=`rgb(${o},${a},${l})`;return{cold:`rgb(${Math.min(255,o+40)},${Math.min(255,a+40)},${Math.min(255,l+20)})`,hot:c,t:e}}(null!=n?n:20),a=4+20*o;return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${i}a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${r}"/>
            <stop offset="100%" stop-color="${s}"/>
          </linearGradient>
          <linearGradient id="${i}b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#F2F4F8"/>
            <stop offset="100%" stop-color="#A8B0BE"/>
          </linearGradient>
        </defs>
        <rect x="26" y="6" width="12" height="36" rx="6" fill="url(#${i}b)"/>
        <rect x="29" y="${40-a}" width="6" height="${a}" rx="3" fill="url(#${i}a)"/>
        <circle cx="32" cy="48" r="12" fill="url(#${i}a)"/>
        <circle cx="28" cy="44" r="3.5" fill="#fff" opacity="0.35"/>
        <circle cx="32" cy="48" r="5" fill="#fff" opacity="0.2"/>
      </svg>
    `,t)}function te(t,e){const i=Jt("lx"),n={dark:{opacity:.4,rayH:6,rays:4,disc:"#6B7280",ray:"#9CA3AF",glow:!1},low:{opacity:.65,rayH:8,rays:6,disc:"#F5D76E",ray:"#E0B000",glow:!1},bright:{opacity:.9,rayH:10,rays:8,disc:"#FFE56A",ray:"#FFB100",glow:!1},very:{opacity:1,rayH:11,rays:8,disc:"#FFE56A",ray:"#FF9F0A",glow:!0},full:{opacity:1,rayH:13,rays:12,disc:"#FFF3C4",ray:"#FF9500",glow:!0}}[t]||{opacity:1,rayH:10,rays:8,disc:"#FFE56A",ray:"#FFB100",glow:!1},r=360/n.rays,s=Array.from({length:n.rays},(t,e)=>e*r);return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${i}a" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFF8DC"/>
            <stop offset="55%" stop-color="${n.disc}"/>
            <stop offset="100%" stop-color="${n.ray}"/>
          </radialGradient>
          ${n.glow?G`<radialGradient id="${i}glow" cx="50%" cy="50%" r="50%">
                <stop offset="40%" stop-color="#FFB100" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#FFB100" stop-opacity="0"/>
              </radialGradient>`:V}
        </defs>
        ${n.glow?G`<circle cx="32" cy="32" r="30" fill="url(#${i}glow)"/>`:V}
        ${s.map(t=>G`
            <rect x="29.5" y="${7-(n.rayH-8)/2}" width="5" height="${n.rayH}" rx="2.5"
              fill="${n.ray}" opacity="${n.opacity}"
              transform="rotate(${t} 32 32)"/>
          `)}
        <circle cx="32" cy="32" r="${"dark"===t?11:13}" fill="url(#${i}a)" opacity="${n.opacity}"/>
        ${"dark"!==t?G`<circle cx="27" cy="27" r="3.5" fill="#fff" opacity="0.35"/>`:V}
      </svg>
    `,e)}function ee(t,e={}){const i=Jt("wd"),n=null!=e.value&&Number.isFinite(Number(e.value))?String(Math.round(Number(e.value))):"";return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${i}a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#AEAEB2"/>
            <stop offset="100%" stop-color="#636366"/>
          </linearGradient>
        </defs>
        <!-- Top stroke with upward hook -->
        <path fill="none" stroke="url(#${i}a)" stroke-width="6.5" stroke-linecap="round"
          d="M6 22 H36 C47 22 51 15 44 10"/>
        <!-- Bottom stroke with downward hook; open space holds the Bft number -->
        <path fill="none" stroke="url(#${i}a)" stroke-width="6.5" stroke-linecap="round"
          d="M6 38 H28 C40 38 44 48 36 54"/>
        ${""!==n?G`
              <text x="46" y="46" text-anchor="middle" dominant-baseline="central"
                font-size="${n.length>1?15:18}" font-weight="800"
                font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
                fill="#1C1C1E"
                stroke="#fff" stroke-width="3" paint-order="stroke fill"
                stroke-linejoin="round">${n}</text>
            `:V}
      </svg>
    `,t)}function ie(t,e){const i=Jt("bat"),n="full"===t||"high"===t?{a:"#30D158",b:"#248A3D"}:"medium"===t?{a:"#FFD60A",b:"#FF9F0A"}:"low"===t||"outline"===t?{a:"#FF453A",b:"#D70015"}:{a:"#8E8E93",b:"#636366"},r="full"===t?28:"high"===t?22:"medium"===t?14:"low"===t?8:"outline"===t?0:10;return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${i}a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${n.a}"/>
            <stop offset="100%" stop-color="${n.b}"/>
          </linearGradient>
          <linearGradient id="${i}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8ECF2"/>
            <stop offset="100%" stop-color="#8A94A4"/>
          </linearGradient>
        </defs>
        <rect x="24" y="6" width="16" height="6" rx="2" fill="url(#${i}b)"/>
        <rect x="16" y="10" width="32" height="46" rx="6" fill="url(#${i}b)"/>
        <rect x="20" y="14" width="24" height="38" rx="3.5" fill="#1C1F26" opacity="0.55"/>
        ${r?G`<rect x="22" y="${50-r}" width="20" height="${r}" rx="2.5" fill="url(#${i}a)"/>`:V}
      </svg>
    `,e)}function ne(t){return Qt(G`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor"
          d="M12 4l6 7h-4v9h-4V11H6l6-7z"/>
      </svg>
    `,t)}function re(t){return Qt(G`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor"
          d="M12 20l-6-7h4V4h4v9h4l-6 7z"/>
      </svg>
    `,t)}function se(t,e="",i={}){switch(t){case"sunny":case"clear_sky":return function(t){const e=Jt("sun");return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${e}a" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="55%" stop-color="#FFB100"/>
            <stop offset="100%" stop-color="#FF8A00"/>
          </radialGradient>
          <linearGradient id="${e}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFCC33"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </linearGradient>
        </defs>
        ${[0,45,90,135,180,225,270,315].map(t=>G`
            <rect x="29.5" y="4" width="5" height="11" rx="2.5"
              fill="url(#${e}b)"
              transform="rotate(${t} 32 32)"/>
          `)}
        <circle cx="32" cy="32" r="14" fill="url(#${e}a)"/>
        <circle cx="27" cy="27" r="4.5" fill="#fff" opacity="0.35"/>
      </svg>
    `,t)}(e);case"night":case"clear_night":return function(t){const e=Jt("moon");return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${e}a" x1="0.2" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stop-color="#F2F7FF"/>
            <stop offset="40%" stop-color="#B4C8FF"/>
            <stop offset="100%" stop-color="#6B8CFF"/>
          </linearGradient>
        </defs>
        <path fill="url(#${e}a)"
          d="M41 8.5A23 23 0 1 0 54 48.5 19 19 0 1 1 41 8.5Z"/>
        <circle cx="28" cy="24" r="3" fill="#fff" opacity="0.28"/>
      </svg>
    `,t)}(e);case"cloudy":return function(t){const e=Jt("cld");return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${e}a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#B8C0CC"/>
            <stop offset="100%" stop-color="#7A8494"/>
          </linearGradient>
          <linearGradient id="${e}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8ECF2"/>
            <stop offset="100%" stop-color="#A8B0BE"/>
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="30" rx="14" ry="10" fill="url(#${e}b)" opacity="0.85"/>
        <path fill="url(#${e}a)"
          d="M18 42c-6.6 0-12-5-12-11.2 0-5.4 3.8-10 9.1-11.2C16.6 13.4 22.8 9 30.2 9
             c8.4 0 15.4 5.8 17 13.5 1.2-.3 2.4-.5 3.7-.5 7.4 0 13.4 5.8 13.4 13
             0 7.2-6 13-13.4 13H18z"/>
        <ellipse cx="26" cy="28" rx="8" ry="5" fill="#fff" opacity="0.18"/>
      </svg>
    `,t)}(e);case"partly_cloudy":return function(t){const e=Jt("pc");return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${e}s" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </radialGradient>
          <linearGradient id="${e}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#D8DEE8"/>
            <stop offset="100%" stop-color="#8A94A4"/>
          </linearGradient>
        </defs>
        <circle cx="22" cy="22" r="10" fill="url(#${e}s)"/>
        ${[210,240,270,300,330].map(t=>G`
            <rect x="19.5" y="3" width="5" height="8" rx="2.5"
              fill="#FFB100" transform="rotate(${t} 22 22)"/>
          `)}
        <path fill="url(#${e}c)"
          d="M16 46c-5.5 0-10-4.2-10-9.4 0-4.5 3.2-8.3 7.6-9.3C14.6 21.4 19.8 18 26 18
             c7 0 12.9 4.8 14.3 11.4 1-.3 2-.4 3.1-.4 6.2 0 11.2 4.8 11.2 10.8
             S49.6 50 43.4 50H16z"/>
        <ellipse cx="28" cy="34" rx="7" ry="4" fill="#fff" opacity="0.16"/>
      </svg>
    `,t)}(e);case"rainy":case"rain":return function(t){const e=Jt("rn");return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${e}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#A8B4C8"/>
            <stop offset="100%" stop-color="#5A6478"/>
          </linearGradient>
          <linearGradient id="${e}d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="100%" stop-color="#0A84FF"/>
          </linearGradient>
        </defs>
        <path fill="url(#${e}c)"
          d="M14 34c-5.5 0-10-4.2-10-9.4 0-4.5 3.2-8.3 7.6-9.3C12.6 9.4 17.8 6 24 6
             c7 0 12.9 4.8 14.3 11.4 1-.3 2-.4 3.1-.4 6.2 0 11.2 4.8 11.2 10.8
             S47.6 38 41.4 38H14z"/>
        <rect x="18" y="42" width="5" height="14" rx="2.5" fill="url(#${e}d)"/>
        <rect x="30" y="44" width="5" height="14" rx="2.5" fill="url(#${e}d)"/>
        <rect x="42" y="42" width="5" height="14" rx="2.5" fill="url(#${e}d)"/>
      </svg>
    `,t)}(e);case"partly_rainy":return function(t){const e=Jt("pr");return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${e}s" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </radialGradient>
          <linearGradient id="${e}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#C8D0DC"/>
            <stop offset="100%" stop-color="#6A7484"/>
          </linearGradient>
          <linearGradient id="${e}d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="100%" stop-color="#0A84FF"/>
          </linearGradient>
        </defs>
        <circle cx="18" cy="18" r="8" fill="url(#${e}s)"/>
        ${[225,270,315].map(t=>G`
            <rect x="15.5" y="3" width="5" height="7" rx="2.5"
              fill="#FFB100" transform="rotate(${t} 18 18)"/>
          `)}
        <path fill="url(#${e}c)"
          d="M14 36c-5 0-9-3.8-9-8.5 0-4.1 2.9-7.5 6.9-8.4C12.8 13.6 17.5 10.5 23 10.5
             c6.3 0 11.7 4.4 13 10.3.9-.2 1.8-.3 2.8-.3 5.6 0 10.1 4.4 10.1 9.8
             S44.4 40 38.8 40H14z"/>
        <rect x="18" y="44" width="4.5" height="12" rx="2.2" fill="url(#${e}d)"/>
        <rect x="29" y="46" width="4.5" height="12" rx="2.2" fill="url(#${e}d)"/>
        <rect x="40" y="44" width="4.5" height="12" rx="2.2" fill="url(#${e}d)"/>
      </svg>
    `,t)}(e);case"thermometer":return Xt(e,i);case"humidity":return function(t){const e=Jt("hu");return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${e}a" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="55%" stop-color="#0A84FF"/>
            <stop offset="100%" stop-color="#0040DD"/>
          </linearGradient>
        </defs>
        <path fill="url(#${e}a)"
          d="M32 6C32 6 12 28 12 42c0 11 9 16 20 16s20-5 20-16C52 28 32 6 32 6z"/>
        <ellipse cx="24" cy="28" rx="6" ry="9" fill="#fff" opacity="0.28"
          transform="rotate(-20 24 28)"/>
        <text x="32" y="44" text-anchor="middle" font-size="16" font-weight="700"
          font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
          fill="#fff">%</text>
      </svg>
    `,t)}(e);case"lux_dark":case"brightness_2":return te("dark",e);case"lux_low":case"brightness_5":return te("low",e);case"lux_bright":case"brightness_6":return te("bright",e);case"lux_very_bright":case"brightness_7":return te("very",e);case"lux_full_sun":return te("full",e);case"uv":return function(t,e={}){const i=Jt("uv"),n=e.value,r=null!=n&&""!==n&&Number.isFinite(Number(n))?String(Math.round(Number(n))):null!=n&&""!==n?String(n):"",s=e.color||"#ffb300";return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${i}s" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="100%" stop-color="#FFB100"/>
          </radialGradient>
        </defs>
        ${[0,45,90,135,180,225,270,315].map(t=>G`
            <rect x="27.5" y="4" width="5" height="10" rx="2.5"
              fill="#FF9F0A" transform="rotate(${t} 30 28)"/>
          `)}
        <circle cx="30" cy="28" r="13" fill="url(#${i}s)"/>
        <circle cx="26" cy="24" r="3.5" fill="#fff" opacity="0.35"/>
        <rect x="34" y="36" width="26" height="26" rx="7" fill="${s}"/>
        <rect x="36" y="38" width="22" height="10" rx="4" fill="#fff" opacity="0.18"/>
        ${""!==r?G`<text x="47" y="50" text-anchor="middle" dominant-baseline="central"
              font-size="${r.length>1?14:16}" font-weight="800"
              font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
              fill="#fff">${r}</text>`:V}
      </svg>
    `,t)}(e,i);case"wind":return ee(e,i);case"wind_gust":return function(t,e={}){return ee(t,e)}(e,i);case"gauge":case"pressure":return function(t){const e=Jt("ga");return Qt(G`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${e}r" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#E8EAED"/>
            <stop offset="50%" stop-color="#9AA0A8"/>
            <stop offset="100%" stop-color="#D8DCE2"/>
          </linearGradient>
          <radialGradient id="${e}f" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#4A5160"/>
            <stop offset="100%" stop-color="#1C1F26"/>
          </radialGradient>
          <linearGradient id="${e}n" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#FF453A"/>
            <stop offset="100%" stop-color="#FF6961"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="26" fill="url(#${e}r)"/>
        <circle cx="32" cy="32" r="20" fill="url(#${e}f)"/>
        ${[30,60,90,120,150,210,240,270,300,330].map(t=>G`
            <rect x="31" y="14" width="2" height="5" rx="1" fill="#C8CDD6"
              transform="rotate(${t} 32 32)"/>
          `)}
        <rect x="30.5" y="16" width="3" height="18" rx="1.5" fill="url(#${e}n)"/>
        <circle cx="32" cy="32" r="5" fill="url(#${e}n)"/>
        <circle cx="32" cy="32" r="2" fill="#fff" opacity="0.5"/>
      </svg>
    `,t)}(e);case"battery":case"battery_full":return ie("full",e);case"battery_high":return ie("high",e);case"battery_medium":return ie("medium",e);case"battery_low":return ie("low",e);case"battery_outline":return ie("outline",e);case"battery_unknown":return ie("unknown",e);case"arrow_up":case"trend_up":return ne(e);case"arrow_down":case"trend_down":return re(e);case"trend_steady":return function(t){return Qt(G`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M4 11h16v2H4z"/>
      </svg>
    `,t)}(e);case"compass_needle":case"navigation":return function(t){const e=Jt("cn");return Qt(G`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${e}a" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stop-color="#0A84FF"/>
            <stop offset="100%" stop-color="#64D2FF"/>
          </linearGradient>
        </defs>
        <path fill="url(#${e}a)"
          d="M12 2.2 L16.2 17.2 L12 14.2 L7.8 17.2 Z"/>
        <circle cx="12" cy="12" r="2.4" fill="url(#${e}a)"/>
        <circle cx="12" cy="12" r="1.1" fill="#fff" opacity="0.9"/>
      </svg>
    `,t)}(e);default:return V}}class oe extends lt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){const e={...xt,...t.settings||{}};e.tile_order=this._normalizeTileOrder(e.tile_order),this._config={...t,settings:e}}_t(t,e){return qt(this.hass,t,e)}_normalizeTileOrder(t){const e=new Set(wt),i=new Set,n=[];for(const r of Array.isArray(t)?t:[])e.has(r)&&!i.has(r)&&(n.push(r),i.add(r));for(const t of wt)i.has(t)||n.push(t);return n}_schema(){const t=this._config?.settings?.show_pressure_trend,e=!1===this._config?.settings?.show_daynight;return[{name:"title",selector:{text:{}}},{type:"expandable",name:"",title:this._t("editor.entities"),icon:"mdi:format-list-bulleted",schema:[{name:"temperature_entity",selector:{entity:{}}},{name:"humidity_entity",selector:{entity:{}}},{name:"lux_entity",selector:{entity:{}}},{name:"uv_entity",selector:{entity:{}}},{name:"rain_entity",selector:{entity:{}}},{name:"",type:"grid",schema:[{name:"wind_speed_entity",selector:{entity:{}}},{name:"wind_direction_entity",selector:{entity:{}}},{name:"wind_gust_entity",selector:{entity:{}}}]},{name:"pressure_entity",selector:{entity:{}}},{name:"battery_entity",selector:{entity:{}}},{name:"sun_entity",selector:{entity:{domain:"sun"}}},{name:"",type:"grid",schema:[{name:"azimuth_entity",selector:{entity:{}}},{name:"elevation_entity",selector:{entity:{}}}]},{name:"",type:"grid",schema:[{name:"temperature_min_entity",selector:{entity:{}}},{name:"temperature_max_entity",selector:{entity:{}}}]},{name:"rain_today_entity",selector:{entity:{}}}]},{type:"expandable",name:"settings",title:this._t("editor.settings"),icon:"mdi:cog",schema:[{name:"",type:"grid",schema:[{name:"show_daynight",selector:{boolean:{}}},{name:"show_sun",selector:{boolean:{}}},{name:"night_palette",selector:{boolean:{}}},{name:"compact_mode",selector:{boolean:{}}},{name:"lux_in_klux",selector:{boolean:{}}},{name:"show_dewpoint",selector:{boolean:{}}},{name:"show_minmax",selector:{boolean:{}}},{name:"show_rain_today",selector:{boolean:{}}},{name:"show_beaufort",selector:{boolean:{}}},{name:"show_wind_gust",selector:{boolean:{}}},{name:"show_battery",selector:{boolean:{}}},{name:"show_pressure_trend",selector:{boolean:{}}},{name:"show_interactions",selector:{boolean:{}}}]},...e?[{name:"manual_condition",selector:{select:{mode:"dropdown",options:[{value:"",label:this._t("editor.automatic")},{value:"sunny",label:this._t("editor.sunny")},{value:"cloudy",label:this._t("editor.cloudy")},{value:"rainy",label:this._t("editor.rainy")},{value:"night",label:this._t("editor.night")}]}}}]:[],...t?[{name:"pressure_trend_threshold",selector:{number:{min:.1,max:10,step:.1,unit_of_measurement:"%",mode:"box"}}}]:[]]}]}_computeLabel=t=>t.name?this._t(`editor.${t.name}`)||t.title||t.name:t.title||"";_valueChanged(t){if(!this._config)return;const e=t.detail.value,i=this._config.settings?.tile_order,n={...e,settings:{...xt,...e.settings||{},tile_order:this._normalizeTileOrder(e.settings?.tile_order||i)}};Object.keys(n).forEach(t=>{""===n[t]&&t.endsWith("_entity")&&delete n[t]}),this._config=n,pt(this,"config-changed",{config:n})}_moveTile(t,e){const i=[...this._normalizeTileOrder(this._config.settings?.tile_order)],n=t+e;if(n<0||n>=i.length)return;const r=i[t];i[t]=i[n],i[n]=r;const s={...this._config,settings:{...this._config.settings,tile_order:i}};this._config=s,pt(this,"config-changed",{config:s})}_resetTileOrder(){const t={...this._config,settings:{...this._config.settings,tile_order:[...wt]}};this._config=t,pt(this,"config-changed",{config:t})}_renderTileOrder(){if(this._config?.settings?.compact_mode)return V;const t=this._normalizeTileOrder(this._config.settings?.tile_order);return U`
      <div class="tile-order">
        <div class="tile-order-header">
          <div class="tile-order-title">${this._t("editor.tile_order")}</div>
          <button type="button" class="reset" @click=${this._resetTileOrder}>
            ${this._t("editor.tile_order_reset")}
          </button>
        </div>
        <div class="tile-order-hint">${this._t("editor.tile_order_hint")}</div>
        <div class="tile-order-list">
          ${t.map((e,i)=>U`
              <div class="tile-order-row">
                <span class="tile-order-label"
                  >${this._t(`editor.tile_${e}`)}</span
                >
                <div class="tile-order-actions">
                  <button
                    type="button"
                    ?disabled=${0===i}
                    @click=${()=>this._moveTile(i,-1)}
                    title="Up"
                  >
                    <ha-icon .icon=${"mdi:chevron-up"}></ha-icon>
                  </button>
                  <button
                    type="button"
                    ?disabled=${i===t.length-1}
                    @click=${()=>this._moveTile(i,1)}
                    title="Down"
                  >
                    <ha-icon .icon=${"mdi:chevron-down"}></ha-icon>
                  </button>
                </div>
              </div>
            `)}
        </div>
      </div>
    `}render(){return this.hass&&this._config?U`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${this._renderTileOrder()}
      <div class="hint">${this._t("editor.hint")}</div>
    `:V}static get styles(){return s`
      .hint {
        margin-top: 12px;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
      .tile-order {
        margin-top: 16px;
        padding: 12px;
        border-radius: 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .tile-order-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .tile-order-title {
        font-weight: 600;
        color: var(--primary-text-color);
      }
      .tile-order-hint {
        margin: 4px 0 10px;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        line-height: 1.35;
      }
      .tile-order-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .tile-order-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 6px 8px;
        border-radius: 8px;
        background: var(--card-background-color, #fff);
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .tile-order-label {
        font-size: 0.9rem;
        color: var(--primary-text-color);
      }
      .tile-order-actions {
        display: flex;
        gap: 2px;
      }
      .tile-order-actions button,
      .reset {
        border: none;
        background: transparent;
        color: var(--primary-color);
        cursor: pointer;
        padding: 2px 4px;
        border-radius: 6px;
        font: inherit;
        font-size: 0.8rem;
      }
      .tile-order-actions button:hover:not(:disabled),
      .reset:hover {
        background: var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .tile-order-actions button:disabled {
        opacity: 0.35;
        cursor: default;
      }
      .tile-order-actions ha-icon {
        --mdc-icon-size: 20px;
      }
    `}}customElements.get(yt)||customElements.define(yt,oe);class ae extends lt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static async getConfigElement(){return document.createElement(yt)}static getStubConfig(){return{type:`custom:${gt}`,temperature_entity:"",humidity_entity:"",settings:{...xt}}}setConfig(t){if(!t)throw new Error("Invalid configuration");const e={...xt,...t.settings||{}};e.tile_order=this._normalizeTileOrder(e.tile_order),this._config={...t,settings:e},this._pressureHistory=this._pressureHistory||[],this._tempStats=this._tempStats||null,this._tempHistoryKey=void 0}_normalizeTileOrder(t){const e=new Set(wt),i=new Set,n=[];for(const r of Array.isArray(t)?t:[])e.has(r)&&!i.has(r)&&(n.push(r),i.add(r));for(const t of wt)i.has(t)||n.push(t);return n}getCardSize(){const t=this._config?.settings||{};return t.compact_mode?!1===t.show_sun?2:3:6}_t(t,e){return qt(this.hass,t,e)}_hasDedicatedMinMax(){return!(!this._config?.temperature_min_entity&&!this._config?.temperature_max_entity)}_tempStorageKey(){const t=this._config?.temperature_entity;return t?`wsc-temp-stats:${t}`:null}_readStoredTempStats(){const t=this._tempStorageKey();if(!t)return null;try{const e=window.localStorage?.getItem(t);if(!e)return null;const i=JSON.parse(e);return i&&i.day===(new Date).toDateString()&&(Number.isFinite(i.min)&&Number.isFinite(i.max))?{day:i.day,min:i.min,max:i.max}:null}catch(t){return null}}_writeStoredTempStats(){const t=this._tempStorageKey();if(t&&this._tempStats)try{window.localStorage?.setItem(t,JSON.stringify(this._tempStats))}catch(t){}}_recordTemp(t){if(null==t||this._hasDedicatedMinMax())return;if(!(this._config.settings||{}).show_minmax)return;const e=(new Date).toDateString();if(this._tempStats&&this._tempStats.day===e)this._tempStats.min=Math.min(this._tempStats.min,t),this._tempStats.max=Math.max(this._tempStats.max,t);else{const i=this._readStoredTempStats();this._tempStats=i&&i.day===e?{day:e,min:Math.min(i.min,t),max:Math.max(i.max,t)}:{day:e,min:t,max:t},this._tempHistoryKey=void 0}this._writeStoredTempStats(),this._ensureTempHistory()}async _ensureTempHistory(){if(this._hasDedicatedMinMax())return;if(!(this._config.settings||{}).show_minmax)return;const t=this._config?.temperature_entity;if(!t||!this.hass?.callWS)return;const e=(new Date).toDateString(),i=`${t}|${e}`;if(this._tempHistoryKey!==i){this._tempHistoryKey=i;try{const i=new Date;i.setHours(0,0,0,0);const n=new Date,r=await this.hass.callWS({type:"history/history_during_period",start_time:i.toISOString(),end_time:n.toISOString(),entity_ids:[t],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),s=r?.[t]||[];let o=1/0,a=-1/0;for(const t of s){const e=Number.parseFloat(t.s??t.state);Number.isFinite(e)&&(o=Math.min(o,e),a=Math.max(a,e))}const l=kt(this._stateObj("temperature_entity"));if(null!=l&&(o=Math.min(o,l),a=Math.max(a,l)),!Number.isFinite(o)||!Number.isFinite(a))return;this._tempStats&&this._tempStats.day===e?this._tempStats={day:e,min:Math.min(this._tempStats.min,o),max:Math.max(this._tempStats.max,a)}:this._tempStats={day:e,min:o,max:a},this._writeStoredTempStats(),this.requestUpdate()}catch(t){this._tempHistoryKey=void 0}}}shouldUpdate(t){if(!this._config)return!1;if(t.has("_config"))return!0;if(!t.has("hass"))return!0;const e=t.get("hass");if(!e)return!0;return(this.hass?.locale?.language||this.hass?.language||this.hass?.selectedLanguage)!==(e.locale?.language||e.language||e.selectedLanguage)||ft.some(({key:t})=>{const i=this._config[t];return!!i&&e.states[i]!==this.hass.states[i]})}_stateObj(t){const e=this._config[t];if(e&&this.hass)return this.hass.states[e]}_isDay(){const t=this._config.settings||{};if(!t.show_daynight)return!0;const e=this._stateObj("sun_entity");if(e)return"above_horizon"===e.state;const i=At(kt(this._stateObj("lux_entity")),t);return null==i||i>50}_recordPressure(t){if(null==t)return;const e=Date.now();this._pressureHistory.push({t:e,v:t});const i=e-108e5;this._pressureHistory=this._pressureHistory.filter(t=>t.t>=i)}_pressureTrend(t){const e=Number(this._config.settings.pressure_trend_threshold)||1;if(this._pressureHistory.length<2||null==t)return{icon:"trend_steady",labelKey:"steady"};const i=this._pressureHistory[0].v,n=(t-i)/i*100;return n>=e?{icon:"trend_up",labelKey:"rising"}:n<=-e?{icon:"trend_down",labelKey:"falling"}:{icon:"trend_steady",labelKey:"steady"}}_actionConfig(t){if(!(this._config.settings||{}).show_interactions)return;const e=this._config[t],i=this._config[`${t.replace("_entity","")}_action`];return{entity:e,tap_action:i?.tap_action||{action:"more-info"},hold_action:i?.hold_action,double_tap_action:i?.double_tap_action}}_handleClick(t){const e=this._actionConfig(t);e&&e.entity&&function(t,e,i){var n;i.tap_action&&(n=i.tap_action),_t(t,e,i,n)}(this,this.hass,e)}_clickable(t){const e=this._actionConfig(t);return!(!e||!e.entity||!function(t){return void 0!==t&&"none"!==t.action}(e.tap_action)&&!e.tap_action)}render(){if(!this._config||!this.hass)return V;const t=this._config.settings||{},e=kt(this._stateObj("temperature_entity")),i=kt(this._stateObj("humidity_entity")),n=Ct(this._stateObj("temperature_entity"),"°C");this._recordTemp(e);const r=this._isDay(),s=this._stateObj("rain_entity"),o=!!s&&function(t){if(!t)return!1;const e=String(t.state).toLowerCase();if(["on","true","wet","raining","detected"].includes(e))return!0;const i=Number(t.state);return Number.isFinite(i)&&i>0}(s),a=kt(s),l=At(kt(this._stateObj("lux_entity")),t),c=kt(this._stateObj("uv_entity"));let d;if(!t.show_daynight&&this._config.settings.manual_condition){d={sunny:{icon:"sunny",labelKey:"clear_sky"},cloudy:{icon:"cloudy",labelKey:"cloudy"},rainy:{icon:"rainy",labelKey:"rain"},night:{icon:"night",labelKey:"clear_night"}}[this._config.settings.manual_condition]||Ft({isDay:r,rainMm:a,rainOn:o,lux:l,uv:c})}else d=Ft({isDay:r,rainMm:a,rainOn:o,lux:l,uv:c});const h=""===this._config.title?"":this._config.title&&"Weather Station"!==this._config.title?this._config.title:this._t("common.card_title");return U`
      <ha-card>
        <div class="wsc ${t.compact_mode?"compact":"full"}">
          ${h?U`<div class="title">${h}</div>`:V}

          ${this._renderHero(d,e,n,i)}
          ${this._renderSun()}

          ${t.compact_mode?V:U`<div class="grid">
                ${this._renderTiles(l,e,n,i,s,o,a,c)}
              </div>`}
        </div>
      </ha-card>
    `}_renderTiles(t,e,i,n,r,s,o,a){const l=this._normalizeTileOrder(this._config.settings?.tile_order),c={lux:()=>this._renderLux(t),temperature:()=>this._renderTemperature(e,i),humidity:()=>this._renderHumidity(n),rain:()=>this._renderRain(r,s,o),wind:()=>this._renderWind(),uv:()=>this._renderUv(a),pressure:()=>this._renderPressure(),battery:()=>this._renderBattery()};return l.map(t=>c[t]?c[t]():V)}_renderSun(){const t=this._config.settings||{};if(!t.show_sun)return V;const e=this._stateObj("sun_entity"),i=this._stateObj("azimuth_entity"),n=this._stateObj("elevation_entity"),r=this._stateObj("uv_entity");if(!e&&!i&&!n)return V;const s=e&&e.attributes||{},o=!e||"above_horizon"===e.state,a=kt(n)??Number(s.elevation),l=kt(i)??Number(s.azimuth),c=kt(r),d=Nt(this.hass,s.next_rising),h=Nt(this.hass,s.next_setting),u=function(t,e,i){let n=Number(t);const r=Number.isFinite(n);r&&(n=(n%360+360)%360);const s=Number(e),o=Number.isFinite(s),a=!r||n<=180;if(o?s<0:!i){const t=60+18*(o?Math.min(1,-s/12):.4),e=a?Bt:Ht,{p:i,u:n}=Gt(e,t),r=Ut(a?0:3,n);return{x:i.x,y:i.y,t:a?0:1,g:r,night:!0}}const l=60-48*(o?Math.max(0,Math.min(1,s/90)):.5),c=a?Ot.left:Ot.right,{p:d,u:h}=Gt(c,l),u=a?.5*h:.5+.5*h,p=Ut(a?1:2,h);return{x:d.x,y:d.y,t:u,g:p,night:!1}}(l,a,o),p=u.night,m=function(t=4.6){Rt();const e=[],i=Math.max(12,Math.round(Pt/t)),n=Pt/i;for(let t=0;t<=i;t++){const i=t*n;let r=0;for(;r<Lt.length-1&&i>jt[r]+Wt[r];)r++;const s=Math.min(1,(i-jt[r])/Wt[r]),[o,a,l,c]=Lt[r],d=Tt(o,a,l,c,s);e.push({x:d.x,y:d.y,above:d.y<=60.001,g:i/Pt})}return e}(),_=u.x/200*100+"%",g=(u.y-0)/84*100+"%",y=Number.isFinite(a)?`${Mt(a,1)}°`:"—",f=Number.isFinite(l)?`${Mt(l,0)}°`:"—",w=e?"sun_entity":i?"azimuth_entity":"elevation_entity",x=!1!==t.night_palette&&p;return U`
      <div
        class="sun-panel ${x?"night-palette":""} ${this._clickable(w)?"tappable":""}"
        @click=${()=>this._handleClick(w)}
      >
        <div class="sun-scene ${p?"night":"day"}">
          <svg
            class="sun-svg"
            viewBox="0 0 200 84"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              class="sun-horizon"
              x1="4"
              y1=${60}
              x2="196"
              y2=${60}
            />
            ${m.map(t=>{const e=t.g<=u.g,i=`dot ${t.above?"day":"night"} ${e?"past":"future"}`,n=t.above?e?1.6:1.3:e?1.5:1.2;return G`<circle class=${i} cx=${t.x} cy=${t.y} r=${n} />`})}
          </svg>

          <div class="sun-marker ${p?"night":"day"}"
            style="left:${_};top:${g}">
            ${se(p?"night":"sunny","sun-marker-icon")}
          </div>

          <div class="sun-center">
            <div class="sun-stat">
              <div class="sun-stat-value">${y}</div>
              <div class="sun-stat-label">${this._t("sun.elevation")}</div>
            </div>
            <div class="sun-stat">
              <div class="sun-stat-value">${f}</div>
              <div class="sun-stat-label">${this._t("sun.azimuth")}</div>
            </div>
            ${null!=c?U`
                  <div class="sun-stat">
                    <div class="sun-stat-value">${Mt(c,0)}</div>
                    <div class="sun-stat-label">${this._t("sections.uv")}</div>
                  </div>
                `:V}
          </div>

          ${e?U`
                <div class="sun-edge" style="left:${"20%"}">
                  ${d||"—"}
                </div>
                <div class="sun-edge" style="left:${"80%"}">
                  ${h||"—"}
                </div>
              `:V}
        </div>
      </div>
    `}_todayMinMax(){const t=kt(this._stateObj("temperature_min_entity")),e=kt(this._stateObj("temperature_max_entity")),i=null!=t?t:this._tempStats?this._tempStats.min:null,n=null!=e?e:this._tempStats?this._tempStats.max:null;return null==i||null==n?null:{min:i,max:n}}_renderHero(t,e,i,n){const r=this._config.settings||{},s=r.show_dewpoint?function(t,e){if(null==t||null==e||e<=0)return null;const i=243.12,n=Math.log(e/100)+17.62*t/(i+t),r=i*n/(17.62-n);return Math.round(10*r)/10}(e,n):null,o=function(t,e){return null==t?null:t<0?"freezing":t<10?"cold":t>27&&null!=e&&e>60?"humid":t>30?"hot":t>=18&&t<=26?"comfortable":"mild"}(e,n),a=r.show_minmax?this._todayMinMax():null,l=this._stateObj("wind_speed_entity"),c=kt(this._stateObj("wind_direction_entity")),d=kt(l),h=Ct(l,"m/s"),u=St(c),p=u?this._t(`compass.${u}`):null,m=l||null!=c;return U`
      <div
        class="hero ${m?"has-wind":""} ${this._clickable("temperature_entity")?"tappable":""}"
        @click=${()=>this._handleClick("temperature_entity")}
      >
        ${se(t.icon,"hero-icon")}
        <div class="hero-main">
          <div class="hero-condition">
            ${this._t(`condition.${t.labelKey}`)}
          </div>
          <div class="hero-temp">
            ${null!=e?`${Mt(e,1)} ${i}`:"—"}
          </div>
          ${a?U`<div class="hero-minmax">
                <span class="mm mm-min">
                  ${se("arrow_down","mm-icon")}
                  ${Mt(a.min,1)}°
                </span>
                <span class="mm mm-max">
                  ${se("arrow_up","mm-icon")}
                  ${Mt(a.max,1)}°
                </span>
              </div>`:V}
        </div>
        ${m?U`
              <div
                class="hero-wind ${this._clickable("wind_speed_entity")?"tappable":""}"
                @click=${t=>{t.stopPropagation(),this._handleClick("wind_speed_entity")}}
              >
                ${null!=c?this._renderCompass(c,p):V}
                ${null!=d?U`<div class="hero-wind-speed">
                      ${Mt(d,1)} ${h}
                    </div>`:V}
              </div>
            `:V}
        ${null!=e?U`<div class="hero-sub">
              ${o?U`<span>${this._t(`comfort.${o}`)}</span>`:V}
              ${null!=s?U`<span class="muted"
                    >${this._t("dewpoint",{value:s,unit:i})}</span
                  >`:V}
            </div>`:V}
      </div>
    `}_tile({icon:t,iconOpts:e,label:i,value:n,sub:r,key:s,accent:o}){const a=!!s&&this._clickable(s);return U`
      <div
        class="tile ${a?"tappable":""}"
        @click=${s?()=>this._handleClick(s):void 0}
      >
        <span class="tile-icon" style=${o?`--tile-accent:${o}`:""}>
          ${se(t,"",e||{})}
        </span>
        <div class="tile-body">
          <div class="tile-label">${i}</div>
          <div class="tile-value">${n}</div>
          ${r?U`<div class="tile-sub">${r}</div>`:V}
        </div>
      </div>
    `}_renderLux(t){if(!this._stateObj("lux_entity"))return V;const e=function(t){return null==t?null:$t.find(e=>t<=e.max)||$t[$t.length-1]}(t);return this._tile({icon:e?e.icon:"lux_very_bright",label:this._t("sections.light"),value:Et(t),sub:e?this._t(`lux.${e.labelKey}`):"",key:"lux_entity"})}_renderTemperature(t,e){return this._stateObj("temperature_entity")?this._tile({icon:"thermometer",iconOpts:{value:t,unit:e},label:this._t("sections.temperature"),value:null!=t?`${Mt(t,1)} ${e}`:"—",key:"temperature_entity"}):V}_renderHumidity(t){return this._stateObj("humidity_entity")?this._tile({icon:"humidity",label:this._t("sections.humidity"),value:null!=t?`${Mt(t,0)}%`:"—",key:"humidity_entity"}):V}_renderRain(t,e,i){const n=this._config.settings||{},r=this._stateObj("rain_today_entity"),s=n.show_rain_today?kt(r):null;if(!t&&null==s)return V;const o=Ct(t,"mm/h"),a=Ct(r,"mm"),l=null!=i?`${Mt(i,1)} ${o}`:"",c=null!=s?`${this._t("rain.today")} ${Mt(s,1)} ${a}`:"";let d;return d=t&&c?U`<span>${l||this._t("rain.today")}</span
        ><span class="dot">·</span><span>${c}</span>`:t?l:c,this._tile({icon:e?"rainy":"cloudy",label:this._t("sections.rain"),value:t?e?this._t("rain.detected"):this._t("rain.dry"):null!=s?`${Mt(s,1)} ${a}`:"—",sub:t?d:c&&null!=s?this._t("rain.today"):d,key:t?"rain_entity":"rain_today_entity",accent:e?"var(--info-color, #2196f3)":void 0})}_renderWind(){const t=this._stateObj("wind_speed_entity");if(!t)return V;const e=this._config.settings||{},i=kt(t),n=Ct(t,"m/s"),r=St(kt(this._stateObj("wind_direction_entity"))),s=r?this._t(`compass.${r}`):null,o=this._stateObj("wind_gust_entity"),a=kt(o),l=Ct(o,n),c=e.show_beaufort?Vt(Kt(i,n)):null;return U`
      <div
        class="tile wind ${this._clickable("wind_speed_entity")?"tappable":""}"
        @click=${()=>this._handleClick("wind_speed_entity")}
      >
        ${se("wind","tile-icon",{value:c?c.n:0})}
        <div class="tile-body">
          <div class="tile-label">${this._t("sections.wind")}</div>
          <div class="tile-value">
            ${null!=i?`${Mt(i,1)} ${n}`:"—"}
          </div>
          ${s||c?U`<div class="tile-sub wind-meta">
                ${s?U`<span>${s}</span>`:V}
                ${s&&c?U`<span class="dot">·</span>`:V}
                ${c?U`<span
                      >${this._t("wind.beaufort",{value:c.n})}</span
                    >`:V}
              </div>`:V}
          ${c?U`<div class="tile-sub wind-desc">
                ${this._t(`beaufort.${c.key}`)}
              </div>`:V}
          ${e.show_wind_gust&&null!=a?U`<div class="tile-sub">
                ${se("wind_gust","mini-icon",{value:Vt(Kt(a,l))?.n??""})}
                ${this._t("wind.gust",{value:Mt(a,0),unit:l})}
              </div>`:V}
        </div>
      </div>
    `}_renderCompass(t,e){return U`
      <div class="compass" title="${e||""} (${Mt(t,0)}°)">
        <svg
          class="needle-svg"
          viewBox="0 0 100 100"
          style="transform: rotate(${t}deg)"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="wsc-needle" x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stop-color="#0A84FF"></stop>
              <stop offset="100%" stop-color="#64D2FF"></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#wsc-needle)"
            d="M50 14 L62 72 L50 62 L38 72 Z"
          ></path>
          <circle cx="50" cy="50" r="7" fill="url(#wsc-needle)"></circle>
          <circle cx="50" cy="50" r="3" fill="#fff" opacity="0.95"></circle>
        </svg>
        <span class="c-n">${this._t("compass.N")}</span>
        <span class="c-e">${this._t("compass.E")}</span>
        <span class="c-s">${this._t("compass.S")}</span>
        <span class="c-w">${this._t("compass.W")}</span>
      </div>
    `}_renderUv(t){if(!this._stateObj("uv_entity"))return V;const e=function(t){return null==t?null:vt.find(e=>t<=e.max)||vt[vt.length-1]}(t),i=null!=t?Mt(t,0):null;return this._tile({icon:"uv",iconOpts:{value:null!=i?i:"",color:e?e.color:"#ffb300"},label:this._t("sections.uv"),value:null!=i?`${i}`:"—",sub:e?this._t(`uv.${e.labelKey}`):"",key:"uv_entity",accent:e?e.color:void 0})}_renderPressure(){const t=this._stateObj("pressure_entity");if(!t)return V;const e=this._config.settings||{},i=kt(t),n=Ct(t,"hPa");this._recordPressure(i);const r=e.show_pressure_trend?this._pressureTrend(i):null;return this._tile({icon:"gauge",label:this._t("sections.pressure"),value:null!=i?`${Mt(i,0)} ${n}`:"—",sub:r?U`${se(r.icon,"mini-icon")}
            ${this._t(`pressure.${r.labelKey}`)}`:"",key:"pressure_entity"})}_renderBattery(){if(!(this._config.settings||{}).show_battery)return V;const t=this._stateObj("battery_entity");if(!t)return V;const e=kt(t);let i;return null!=e&&e<15?i="var(--error-color, #e53935)":null!=e&&e<40&&(i="var(--warning-color, #ffa726)"),this._tile({icon:zt(e),label:this._t("sections.battery"),value:null!=e?`${Mt(e,0)}%`:"—",key:"battery_entity",accent:i})}static get styles(){return s`
      :host {
        --wsc-radius: 18px;
        --wsc-gap: 10px;
        container-type: inline-size;
        container-name: wsc;
        display: block;
      }
      ha-card {
        overflow: hidden;
      }
      .wsc {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }
      .wsc.full {
        gap: 10px;
      }
      .wsc.compact {
        gap: 8px;
        padding: 12px;
      }
      @container wsc (min-width: 520px) {
        .wsc.full {
          padding: 14px;
          gap: 12px;
        }
      }
      .title {
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        color: var(--primary-text-color);
      }

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
      .hero.has-wind {
        grid-template-columns: auto 1fr auto;
      }
      .wsc-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        line-height: 0;
        color: inherit;
      }
      .wsc-icon svg {
        width: 100%;
        height: 100%;
        display: block;
        overflow: visible;
      }

      .hero-icon {
        grid-row: 1 / 3;
        width: 46px;
        height: 46px;
      }
      .hero-main {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .hero-wind {
        grid-column: 3;
        grid-row: 1 / 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        justify-self: center;
        gap: 6px;
        padding: 4px 6px;
        border-radius: 12px;
        align-self: center;
        width: max-content;
        min-width: 84px;
        box-sizing: border-box;
      }
      .hero-wind .compass {
        width: 76px;
        height: 76px;
        font-size: 0.72rem;
        margin: 0 auto;
      }
      .hero-wind .compass .c-n { top: 11px; }
      .hero-wind .compass .c-s { top: 65px; }
      .hero-wind .compass .c-e { left: 65px; }
      .hero-wind .compass .c-w { left: 11px; }
      .hero-wind-speed {
        font-size: 0.95rem;
        font-weight: 600;
        line-height: 1.1;
        color: var(--primary-text-color);
        white-space: nowrap;
        text-align: center;
        width: 100%;
      }
      @container wsc (max-width: 380px) {
        .hero {
          gap: 4px 10px;
          padding: 12px;
        }
        .hero-icon {
          width: 38px;
          height: 38px;
        }
        .hero-temp {
          font-size: 1.65rem;
        }
        .hero-wind {
          padding: 2px 4px;
          gap: 4px;
          min-width: 68px;
        }
        .hero-wind .compass {
          width: 60px;
          height: 60px;
          font-size: 0.62rem;
        }
        .hero-wind .compass .c-n { top: 9px; }
        .hero-wind .compass .c-s { top: 51px; }
        .hero-wind .compass .c-e { left: 51px; }
        .hero-wind .compass .c-w { left: 9px; }
        .hero-wind-speed {
          font-size: 0.82rem;
        }
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
      .hero-minmax {
        display: flex;
        gap: 10px;
        margin-top: 2px;
        font-size: 0.9rem;
        font-weight: 500;
      }
      .hero-minmax .mm {
        display: inline-flex;
        align-items: center;
        gap: 1px;
      }
      .hero-minmax .mm-icon {
        width: 15px;
        height: 15px;
      }
      .hero-minmax .mm-min {
        color: var(--info-color, #2196f3);
      }
      .hero-minmax .mm-max {
        color: var(--warning-color, #ff9800);
      }
      .dot {
        margin: 0 3px;
        opacity: 0.6;
      }

      /* Sun path panel — matches the hero box (card bg + subtle border) */
      .sun-panel {
        padding: 6px 12px 8px;
        border-radius: var(--wsc-radius);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
        overflow: hidden;
      }
      .sun-panel.night-palette {
        background: #152038;
        box-shadow: inset 0 0 0 1px rgba(123, 156, 255, 0.22);
      }
      @supports (background: color-mix(in srgb, red, blue)) {
        .sun-panel.night-palette {
          background: linear-gradient(
            180deg,
            color-mix(in srgb, #1a2744 55%, var(--ha-card-background, var(--card-background-color, #121212))) 0%,
            var(--ha-card-background, var(--card-background-color, #121212)) 100%
          );
          box-shadow: inset 0 0 0 1px color-mix(in srgb, #6b8cff 22%, var(--divider-color, transparent));
        }
      }
      .sun-scene {
        position: relative;
        width: 100%;
        max-width: 520px;
        margin: 0 auto;
      }
      /* height:auto lets the inline SVG take its own intrinsic height from the
         viewBox ratio (200:84) in every browser — no reliance on aspect-ratio,
         which was collapsing to a flat line in some HA webviews. */
      .sun-svg {
        display: block;
        width: 100%;
        height: auto;
        overflow: visible;
      }
      /* Evenly spaced day-curve dots. Orange above the horizon, blue below.
         Traveled dots are bold; upcoming dots are faint. */
      .dot.day {
        fill: #e8961e;
      }
      .dot.night {
        fill: var(--wsc-night-color, #3f6fd6);
      }
      .dot.past {
        opacity: 1;
      }
      .dot.future {
        opacity: 0.4;
      }
      .dot.night.future {
        opacity: 0.35;
      }
      /* Night palette: cooler moon path + soft panel. Traveled dots stay
         fully highlighted (orange above, blue below); only upcoming stay faint. */
      .sun-panel.night-palette {
        --wsc-night-color: #7b9cff;
      }
      .sun-panel.night-palette .dot.day.past {
        fill: #ffb14a;
        opacity: 1;
      }
      .sun-panel.night-palette .dot.day.future {
        fill: #9a7340;
        opacity: 0.28;
      }
      .sun-panel.night-palette .dot.night.past {
        fill: #9bb4ff;
        opacity: 1;
      }
      .sun-panel.night-palette .dot.night.future {
        opacity: 0.4;
      }
      .sun-panel.night-palette .sun-horizon {
        stroke: #9bb0ff;
        stroke-opacity: 0.45;
      }
      .sun-panel.night-palette .sun-marker.night {
        background: radial-gradient(
          circle,
          rgba(40, 52, 90, 0.95) 0%,
          rgba(40, 52, 90, 0.7) 45%,
          rgba(40, 52, 90, 0) 72%
        );
        box-shadow: 0 0 14px rgba(123, 156, 255, 0.75);
      }
      .sun-panel.night-palette .sun-marker.night .wsc-icon {
        width: 26px;
        height: 26px;
        filter: drop-shadow(0 0 8px rgba(168, 192, 255, 0.9));
      }
      .sun-panel.night-palette .sun-stat-value,
      .sun-panel.night-palette .sun-edge {
        color: var(--primary-text-color);
      }
      /* Horizon at 0° — solid so "below horizon" is readable. */
      .sun-horizon {
        stroke: var(--primary-text-color, #3a3a3a);
        stroke-width: 0.8;
        stroke-opacity: 0.4;
        stroke-linecap: round;
      }
      .sun-marker {
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 4;
        pointer-events: none;
        transition: left 0.6s ease, top 0.6s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: radial-gradient(
          circle,
          rgba(255, 255, 255, 0.95) 0%,
          rgba(255, 255, 255, 0.75) 42%,
          rgba(255, 255, 255, 0) 72%
        );
        box-shadow: 0 0 14px rgba(255, 177, 0, 0.65);
      }
      .sun-marker .wsc-icon,
      .sun-marker-icon {
        width: 30px;
        height: 30px;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25));
      }
      .sun-marker.night {
        background: radial-gradient(
          circle,
          rgba(30, 40, 70, 0.95) 0%,
          rgba(30, 40, 70, 0.7) 45%,
          rgba(30, 40, 70, 0) 72%
        );
        box-shadow: 0 0 14px rgba(123, 156, 255, 0.7);
      }
      .sun-marker.night .wsc-icon,
      .sun-marker.night .sun-marker-icon {
        width: 26px;
        height: 26px;
        filter: drop-shadow(0 0 6px rgba(168, 192, 255, 0.8));
      }
      .sun-center {
        position: absolute;
        left: 50%;
        top: 42%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 18px;
        text-align: center;
        z-index: 1;
        pointer-events: none;
      }
      .sun-stat-value {
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.1;
        color: var(--primary-text-color);
      }
      .sun-stat-label {
        font-size: 0.62rem;
        color: var(--secondary-text-color);
        line-height: 1.1;
      }
      /* Times sit just below the horizon line; font matches elev/az values. */
      .sun-edge {
        position: absolute;
        top: 75%;
        transform: translate(-50%, 0);
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.1;
        color: var(--primary-text-color);
        white-space: nowrap;
        z-index: 3;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--wsc-gap);
        min-width: 0;
      }
      /* Card-width breakpoints (not viewport) so narrow phone columns stay readable */
      @container wsc (max-width: 320px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
      @container wsc (min-width: 480px) {
        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
      /* Full-station dashboard: 4 columns on wide cards (desktop / tablet landscape) */
      @container wsc (min-width: 720px) {
        .grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .tile {
          padding: 11px 12px;
        }
      }
      /* Fallback when container queries are unavailable */
      @supports not (container-type: inline-size) {
        @media (max-width: 360px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 520px) {
          .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 780px) {
          .grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (max-width: 400px) {
          .hero-wind .compass {
            width: 60px;
            height: 60px;
          }
        }
      }

      .tile {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 11px;
        border-radius: var(--wsc-radius);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
        min-height: 54px;
        min-width: 0;
        overflow: hidden;
        box-sizing: border-box;
      }
      .tile-icon {
        width: 28px;
        height: 28px;
        color: var(--tile-accent, var(--state-icon-color, var(--primary-color)));
        flex: 0 0 auto;
      }
      .tile-icon .wsc-icon {
        width: 28px;
        height: 28px;
      }
      .tile-body {
        display: flex;
        flex-direction: column;
        min-width: 0;
        flex: 1 1 auto;
        overflow: hidden;
      }
      .tile-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-value {
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-sub {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .wind .tile-body {
        overflow: visible;
      }
      .wind .wind-meta {
        flex-wrap: wrap;
      }
      .wind .wind-desc {
        white-space: normal;
        overflow: visible;
        text-overflow: unset;
        line-height: 1.25;
      }
      .mini-icon {
        width: 16px;
        height: 16px;
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
      .compass .needle-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        transform-origin: 50% 50%;
        transition: transform 0.4s ease;
        pointer-events: none;
        overflow: visible;
        z-index: 1;
      }
      .compass span {
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 2;
      }
      .compass .c-n { top: 8px; left: 50%; }
      .compass .c-s { top: 44px; left: 50%; }
      .compass .c-e { top: 50%; left: 44px; }
      .compass .c-w { top: 50%; left: 8px; }

      .tappable {
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .tappable:hover {
        background: var(--divider-color, rgba(0, 0, 0, 0.08));
      }
    `}}customElements.get(gt)||customElements.define(gt,ae),window.customCards=window.customCards||[],window.customCards.find(t=>t.type===gt)||window.customCards.push({type:gt,name:"Weather Station Card",description:"A modern, Mushroom-inspired weather station card.",preview:!0,documentationURL:"https://github.com/H3ss3ltje/lovelace-weather-station-card"}),console.info("%c WEATHER-STATION-CARD %c v1.6.5 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{ae as WeatherStationCard};
