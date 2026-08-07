const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=n.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&n.set(i,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new r(n,e,i)},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,m=globalThis,p=m.trustedTypes,_=p?p.emptyScript:"",g=m.reactiveElementPolyfillSupport,y=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!a(e,t),w={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&l(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:r}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const s=n?.call(this);r?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(t)i.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of n){const n=document.createElement("style"),r=e.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=t.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=n;const s=r.fromAttribute(t,e.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(e,t,i,n=!1,r){if(void 0!==e){const s=this.constructor;if(!1===n&&(r=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??b)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[y("elementProperties")]=new Map,v[y("finalized")]=new Map,g?.({ReactiveElement:v}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=e=>e,S=x.trustedTypes,k=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+E,T=`<${z}>`,M=document,N=()=>M.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,C=Array.isArray,L="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,W=/-->/g,j=/>/g,P=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,U=/"/g,B=/^(?:script|style|textarea|title)$/i,D=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),K=D(1),V=D(2),F=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),Z=new WeakMap,q=M.createTreeWalker(M,129);function Y(e,t){if(!C(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,n=[];let r,s=2===t?"<svg>":3===t?"<math>":"",o=H;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===H?"!--"===l[1]?o=W:void 0!==l[1]?o=j:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=P):void 0!==l[3]&&(o=P):o===P?">"===l[0]?(o=r??H,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?P:'"'===l[3]?U:R):o===U||o===R?o=P:o===W||o===j?o=H:(o=P,r=void 0);const h=o===P&&e[t+1].startsWith("/>")?" ":"";s+=o===H?i+T:c>=0?(n.push(a),i.slice(0,c)+A+i.slice(c)+E+h):i+E+(-2===c?t:h)}return[Y(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class J{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let r=0,s=0;const o=e.length-1,a=this.parts,[l,c]=G(e,t);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=q.nextNode())&&a.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(A)){const t=c[s++],i=n.getAttribute(e).split(E),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?ie:"?"===o[1]?ne:"@"===o[1]?re:te}),n.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:r}),n.removeAttribute(e));if(B.test(n.tagName)){const e=n.textContent.split(E),t=e.length-1;if(t>0){n.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],N()),q.nextNode(),a.push({type:2,index:++r});n.append(e[t],N())}}}else if(8===n.nodeType)if(n.data===z)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=n.data.indexOf(E,e+1));)a.push({type:7,index:r}),e+=E.length-1}r++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,n){if(t===F)return t;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const s=O(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e),r._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(t=Q(e,r._$AS(e,t.values),r,n)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??M).importNode(t,!0);q.currentNode=n;let r=q.nextNode(),s=0,o=0,a=i[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new ee(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new se(r,this,e)),this._$AV.push(t),a=i[++o]}s!==a?.index&&(r=q.nextNode(),s++)}return q.currentNode=M,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),O(e)?e===I||null==e||""===e?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>C(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==I&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new X(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new J(e)),t}k(e){C(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const r of e)n===t.length?t.push(i=new ee(this.O(N()),this.O(N()),this,this.options)):i=t[n],i._$AI(r),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,r){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}_$AI(e,t=this,i,n){const r=this.strings;let s=!1;if(void 0===r)e=Q(this,e,t,0),s=!O(e)||e!==this._$AH&&e!==F,s&&(this._$AH=e);else{const n=e;let o,a;for(e=r[0],o=0;o<r.length-1;o++)a=Q(this,n[i+o],t,o),a===F&&(a=this._$AH[o]),s||=!O(a)||a!==this._$AH[o],a===I?e=I:e!==I&&(e+=(a??"")+r[o+1]),this._$AH[o]=a}s&&!n&&this.j(e)}j(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===I?void 0:e}}class ne extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==I)}}class re extends te{constructor(e,t,i,n,r){super(e,t,i,n,r),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??I)===F)return;const i=this._$AH,n=e===I&&i!==I||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==I&&(i===I||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}let se=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}};const oe=x.litHtmlPolyfillSupport;oe?.(J,ee),(x.litHtmlVersions??=[]).push("3.3.3");const ae=globalThis;class le extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let r=n._$litPart$;if(void 0===r){const e=i?.renderBefore??null;n._$litPart$=r=new ee(t.insertBefore(N(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}le._$litElement$=!0,le.finalized=!0,ae.litElementHydrateSupport?.({LitElement:le});const ce=ae.litElementPolyfillSupport;var de,he;ce?.({LitElement:le}),(ae.litElementVersions??=[]).push("4.2.2"),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(de||(de={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(he||(he={}));var ue=["closed","locked","off"],me=function(e,t,i,n){n=n||{},i=null==i?{}:i;var r=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return r.detail=i,e.dispatchEvent(r),r},pe=function(e){me(window,"haptic",e)},_e=function(e,t,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(pe("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&me(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),me(window,"location-changed",{replace:i})}(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(function(e,t){(function(e,t,i){void 0===i&&(i=!0);var n,r=function(e){return e.substr(0,e.indexOf("."))}(t),s="group"===r?"homeassistant":r;switch(r){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}e.callService(s,n,{entity_id:t})})(e,t,ue.includes(e.states[t].state))}(t,i.entity),pe("success"));break;case"call-service":if(!n.service)return void pe("failure");var r=n.service.split(".",2);t.callService(r[0],r[1],n.service_data,n.target),pe("success");break;case"fire-dom-event":me(e,"ll-custom",n)}};const ge="weather-station-card",ye="weather-station-card-editor",fe=[{key:"temperature_entity",icon:"mdi:thermometer"},{key:"humidity_entity",icon:"mdi:water-percent"},{key:"lux_entity",icon:"mdi:brightness-7"},{key:"uv_entity",icon:"mdi:sun-wireless"},{key:"rain_entity",icon:"mdi:weather-rainy"},{key:"wind_speed_entity",icon:"mdi:weather-windy"},{key:"wind_direction_entity",icon:"mdi:compass"},{key:"wind_gust_entity",icon:"mdi:weather-windy-variant"},{key:"pressure_entity",icon:"mdi:gauge"},{key:"battery_entity",icon:"mdi:battery-high"},{key:"sun_entity",icon:"mdi:weather-sunny"},{key:"azimuth_entity",icon:"mdi:compass-outline"},{key:"elevation_entity",icon:"mdi:angle-acute"},{key:"temperature_min_entity",icon:"mdi:thermometer-low"},{key:"temperature_max_entity",icon:"mdi:thermometer-high"},{key:"rain_today_entity",icon:"mdi:weather-pouring"}],be=["lux","temperature","humidity","rain","wind","uv","pressure","battery"],we={show_dewpoint:!1,show_pressure_trend:!1,show_battery:!0,show_wind_gust:!0,show_interactions:!0,show_daynight:!0,show_sun:!0,show_minmax:!0,show_rain_today:!0,show_beaufort:!0,compact_mode:!1,night_palette:!0,tile_order:[...be],pressure_trend_threshold:1,manual_condition:""},ve=["N","NE","E","SE","S","SW","W","NW"],xe=[{max:2,labelKey:"low",color:"#4caf50"},{max:5,labelKey:"moderate",color:"#ffb300"},{max:7,labelKey:"high",color:"#fb8c00"},{max:10,labelKey:"very_high",color:"#e53935"},{max:1/0,labelKey:"extreme",color:"#8e24aa"}],$e=[{max:100,labelKey:"dark",icon:"mdi:brightness-2"},{max:1e3,labelKey:"low_light",icon:"mdi:brightness-5"},{max:1e4,labelKey:"bright",icon:"mdi:brightness-6"},{max:1/0,labelKey:"very_bright",icon:"mdi:brightness-7"}];function Se(e){if(!e)return null;const t=Number(e.state);return Number.isFinite(t)?t:null}function ke(e){if(null==e)return null;const t=Math.round(e%360/45)%8;return ve[t]}function Ae(e){return null==e?"—":e>=1e3?Math.round(e/100)/10+" klux":`${Math.round(e)} lux`}function Ee(e){return null==e?"mdi:battery-unknown":e>=95?"mdi:battery":e>=70?"mdi:battery-high":e>=40?"mdi:battery-medium":e>=15?"mdi:battery-low":"mdi:battery-outline"}function ze({isDay:e,rainMm:t,rainOn:i,lux:n,uv:r}){if(i||null!=t&&t>0)return{icon:"mdi:weather-rainy",labelKey:"rain"};const s=null!=n&&n>8e3||null!=r&&r>=3;return e?null!=n&&n<4e3&&!s?{icon:"mdi:weather-cloudy",labelKey:"cloudy"}:s?{icon:"mdi:weather-sunny",labelKey:"clear_sky"}:{icon:"mdi:weather-partly-cloudy",labelKey:"partly_cloudy"}:{icon:"mdi:weather-night",labelKey:"clear_night"}}function Te(e,t=1){if(null==e||""===e)return null;const i=Number(e);if(!Number.isFinite(i))return null;const n=Math.pow(10,t);return Math.round(i*n)/n}function Me(e,t=""){return e&&e.attributes&&e.attributes.unit_of_measurement||t}function Ne(e,t){if(!t)return null;const i=new Date(t);if(Number.isNaN(i.getTime()))return null;const n=e?.locale?.language||e?.language||e?.selectedLanguage||void 0;return i.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit"})}function Oe(e,t,i,n,r){const s=1-r,o=r*r,a=s*s;return{x:a*s*e.x+3*a*r*t.x+3*s*o*i.x+o*r*n.x,y:a*s*e.y+3*a*r*t.y+3*s*o*i.y+o*r*n.y}}const Ce={left:[{x:30,y:60},{x:44,y:49},{x:70,y:12},{x:100,y:12}],right:[{x:100,y:12},{x:130,y:12},{x:156,y:49},{x:170,y:60}]},Le=[{x:3,y:78},{x:14,y:78},{x:24,y:66},{x:30,y:60}],He=[{x:170,y:60},{x:176,y:66},{x:186,y:78},{x:197,y:78}],We=[Le,Ce.left,Ce.right,He];function je([e,t,i,n]){let r=0,s=Oe(e,t,i,n,0);for(let o=1;o<=24;o++){const a=Oe(e,t,i,n,o/24);r+=Math.hypot(a.x-s.x,a.y-s.y),s=a}return r}let Pe=null,Re=null,Ue=0;function Be(){if(Pe)return;Pe=We.map(je),Ue=Pe.reduce((e,t)=>e+t,0),Re=[];let e=0;for(const t of Pe)Re.push(e),e+=t}function De(e,t){return Be(),(Re[e]+t*Pe[e])/Ue}function Ke([e,t,i,n],r){let s=Oe(e,t,i,n,0),o=0,a=1/0;for(let l=0;l<=120;l++){const c=l/120,d=Oe(e,t,i,n,c),h=Math.abs(d.y-r);h<a&&(a=h,s=d,o=c)}return{p:s,u:o}}const Ve={en:{common:{card_title:"Weather Station",card_name:"Weather Station Card",card_description:"A modern, Mushroom-inspired weather station card."},condition:{clear_sky:"Clear sky",cloudy:"Cloudy",rain:"Rain",clear_night:"Clear night",partly_cloudy:"Partly cloudy"},comfort:{freezing:"Feels freezing",cold:"Feels cold",humid:"Feels humid",hot:"Feels hot",comfortable:"Feels comfortable",mild:"Feels mild"},dewpoint:"Dewpoint {value} {unit}",sections:{light:"Light",temperature:"Temp",humidity:"Humidity",rain:"Rain",wind:"Wind",uv:"UV Index",pressure:"Pressure",battery:"Battery",dewpoint:"Dew point"},sun:{sunrise:"Sunrise",sunset:"Sunset",azimuth:"Azimuth",elevation:"Elevation"},rain:{detected:"Rain detected",dry:"Dry",today:"Today"},wind:{gust:"Gust {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Calm",light_air:"Light air",light_breeze:"Light breeze",gentle_breeze:"Gentle breeze",moderate_breeze:"Moderate breeze",fresh_breeze:"Fresh breeze",strong_breeze:"Strong breeze",near_gale:"Near gale",gale:"Gale",strong_gale:"Strong gale",storm:"Storm",violent_storm:"Violent storm",hurricane:"Hurricane"},lux:{dark:"Dark",low_light:"Low light",bright:"Bright",very_bright:"Very bright"},uv:{low:"Low",moderate:"Moderate",high:"High",very_high:"Very high",extreme:"Extreme"},pressure:{rising:"Rising",falling:"Falling",steady:"Steady"},compass:{N:"N",NE:"NE",E:"E",SE:"SE",S:"S",SW:"SW",W:"W",NW:"NW"},editor:{entities:"Entities",settings:"Settings",title:"Card title",temperature_entity:"Temperature",humidity_entity:"Humidity",lux_entity:"Light / Lux",uv_entity:"UV Index",rain_entity:"Rain",wind_speed_entity:"Wind speed",wind_direction_entity:"Wind direction",wind_gust_entity:"Wind gust",pressure_entity:"Pressure",battery_entity:"Battery",sun_entity:"Sun (sunrise / sunset)",azimuth_entity:"Azimuth (optional override)",elevation_entity:"Elevation (optional override)",temperature_min_entity:"Min temperature today (optional)",temperature_max_entity:"Max temperature today (optional)",rain_today_entity:"Rain total today (optional)",show_daynight:"Day / night mode",show_sun:"Sunrise / sunset diagram",show_dewpoint:"Dew point",show_minmax:"Today min / max",show_rain_today:"Rain total today",show_beaufort:"Beaufort scale",show_wind_gust:"Wind gust",show_battery:"Battery",show_pressure_trend:"Pressure trend",show_interactions:"Interactions",compact_mode:"Compact mode (hero + sun only)",night_palette:"Night palette for sun diagram",tile_order:"Tile order",tile_order_hint:"Change the order of sensor tiles in the grid. Empty entities stay hidden.",tile_order_reset:"Reset",tile_lux:"Light / Lux",tile_temperature:"Temperature",tile_humidity:"Humidity",tile_rain:"Rain",tile_wind:"Wind",tile_uv:"UV Index",tile_pressure:"Pressure",tile_battery:"Battery",manual_condition:"Manual condition",pressure_trend_threshold:"Trend threshold",automatic:"Automatic",sunny:"Sunny",cloudy:"Cloudy",rainy:"Rainy",night:"Night",hint:"Tip: set individual tap / hold actions in YAML, e.g. temperature_action:, wind_action:. Sections are hidden automatically when their entity is not configured. Tile order can also be set in YAML under settings.tile_order."}},nl:{common:{card_title:"Weerstation",card_name:"Weerstationkaart",card_description:"Een moderne, Mushroom-geïnspireerde weerstationkaart."},condition:{clear_sky:"Heldere lucht",cloudy:"Bewolkt",rain:"Regen",clear_night:"Heldere nacht",partly_cloudy:"Gedeeltelijk bewolkt"},comfort:{freezing:"Voelt vriezend",cold:"Voelt koud",humid:"Voelt vochtig",hot:"Voelt heet",comfortable:"Voelt comfortabel",mild:"Voelt mild"},dewpoint:"Dauwpunt {value} {unit}",sections:{light:"Licht",temperature:"Temp",humidity:"Vochtigheid",rain:"Regen",wind:"Wind",uv:"UV-index",pressure:"Luchtdruk",battery:"Batterij",dewpoint:"Dauwpunt"},sun:{sunrise:"Zonsopkomst",sunset:"Zonsondergang",azimuth:"Azimut",elevation:"Elevatie"},rain:{detected:"Regen gedetecteerd",dry:"Droog",today:"Vandaag"},wind:{gust:"Windstoot {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Windstil",light_air:"Zwakke wind",light_breeze:"Zwakke wind",gentle_breeze:"Matige wind",moderate_breeze:"Matige wind",fresh_breeze:"Vrij krachtige wind",strong_breeze:"Krachtige wind",near_gale:"Harde wind",gale:"Stormachtig",strong_gale:"Storm",storm:"Zware storm",violent_storm:"Zeer zware storm",hurricane:"Orkaan"},lux:{dark:"Donker",low_light:"Weinig licht",bright:"Helder",very_bright:"Zeer helder"},uv:{low:"Laag",moderate:"Matig",high:"Hoog",very_high:"Zeer hoog",extreme:"Extreem"},pressure:{rising:"Stijgend",falling:"Dalend",steady:"Stabiel"},compass:{N:"N",NE:"NO",E:"O",SE:"ZO",S:"Z",SW:"ZW",W:"W",NW:"NW"},editor:{entities:"Entiteiten",settings:"Instellingen",title:"Kaarttitel",temperature_entity:"Temperatuur",humidity_entity:"Luchtvochtigheid",lux_entity:"Licht / Lux",uv_entity:"UV-index",rain_entity:"Regen",wind_speed_entity:"Windsnelheid",wind_direction_entity:"Windrichting",wind_gust_entity:"Windstoot",pressure_entity:"Luchtdruk",battery_entity:"Batterij",sun_entity:"Zon (zonsopkomst / zonsondergang)",azimuth_entity:"Azimut (optionele override)",elevation_entity:"Elevatie (optionele override)",temperature_min_entity:"Min temperatuur vandaag (optioneel)",temperature_max_entity:"Max temperatuur vandaag (optioneel)",rain_today_entity:"Regen totaal vandaag (optioneel)",show_daynight:"Dag / nacht modus",show_sun:"Zonsopkomst / zonsondergang diagram",show_dewpoint:"Dauwpunt",show_minmax:"Vandaag min / max",show_rain_today:"Regen totaal vandaag",show_beaufort:"Beaufortschaal",show_wind_gust:"Windstoot",show_battery:"Batterij",show_pressure_trend:"Luchtdruktrend",show_interactions:"Interacties",compact_mode:"Compacte modus (alleen hero + zon)",night_palette:"Nachtpalet voor zondiagram",tile_order:"Tegelvolgorde",tile_order_hint:"Wijzig de volgorde van sensortegels in het raster. Ontbrekende entiteiten blijven verborgen.",tile_order_reset:"Reset",tile_lux:"Licht / Lux",tile_temperature:"Temperatuur",tile_humidity:"Vochtigheid",tile_rain:"Regen",tile_wind:"Wind",tile_uv:"UV-index",tile_pressure:"Luchtdruk",tile_battery:"Batterij",manual_condition:"Handmatige conditie",pressure_trend_threshold:"Trenddrempel",automatic:"Automatisch",sunny:"Zonnig",cloudy:"Bewolkt",rainy:"Regenachtig",night:"Nacht",hint:"Tip: stel aparte tip-/houdacties in via YAML, bijv. temperature_action:, wind_action:. Secties worden verborgen als hun entiteit niet is geconfigureerd. Tegelvolgorde kan ook via settings.tile_order in YAML."}},es:{common:{card_title:"Estación meteorológica",card_name:"Tarjeta de estación meteorológica",card_description:"Una tarjeta moderna de estación meteorológica inspirada en Mushroom."},condition:{clear_sky:"Cielo despejado",cloudy:"Nublado",rain:"Lluvia",clear_night:"Noche despejada",partly_cloudy:"Parcialmente nublado"},comfort:{freezing:"Se siente gélido",cold:"Se siente frío",humid:"Se siente húmedo",hot:"Se siente caluroso",comfortable:"Se siente cómodo",mild:"Se siente templado"},dewpoint:"Punto de rocío {value} {unit}",sections:{light:"Luz",temperature:"Temp",humidity:"Humedad",rain:"Lluvia",wind:"Viento",uv:"Índice UV",pressure:"Presión",battery:"Batería",dewpoint:"Punto de rocío"},sun:{sunrise:"Amanecer",sunset:"Atardecer",azimuth:"Azimut",elevation:"Elevación"},rain:{detected:"Lluvia detectada",dry:"Seco",today:"Hoy"},wind:{gust:"Ráfaga {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Calma",light_air:"Ventolina",light_breeze:"Brisa ligera",gentle_breeze:"Brisa suave",moderate_breeze:"Brisa moderada",fresh_breeze:"Brisa fresca",strong_breeze:"Brisa fuerte",near_gale:"Viento fuerte",gale:"Temporal",strong_gale:"Temporal fuerte",storm:"Temporal duro",violent_storm:"Temporal muy duro",hurricane:"Huracán"},lux:{dark:"Oscuro",low_light:"Poca luz",bright:"Luminoso",very_bright:"Muy luminoso"},uv:{low:"Bajo",moderate:"Moderado",high:"Alto",very_high:"Muy alto",extreme:"Extremo"},pressure:{rising:"Subiendo",falling:"Bajando",steady:"Estable"},compass:{N:"N",NE:"NE",E:"E",SE:"SE",S:"S",SW:"SO",W:"O",NW:"NO"},editor:{entities:"Entidades",settings:"Ajustes",title:"Título de la tarjeta",temperature_entity:"Temperatura",humidity_entity:"Humedad",lux_entity:"Luz / Lux",uv_entity:"Índice UV",rain_entity:"Lluvia",wind_speed_entity:"Velocidad del viento",wind_direction_entity:"Dirección del viento",wind_gust_entity:"Ráfaga de viento",pressure_entity:"Presión",battery_entity:"Batería",sun_entity:"Sol (amanecer / atardecer)",azimuth_entity:"Azimut (opcional)",elevation_entity:"Elevación (opcional)",temperature_min_entity:"Temperatura mín. hoy (opcional)",temperature_max_entity:"Temperatura máx. hoy (opcional)",rain_today_entity:"Lluvia total hoy (opcional)",show_daynight:"Modo día / noche",show_sun:"Diagrama de amanecer / atardecer",show_dewpoint:"Punto de rocío",show_minmax:"Mín / máx de hoy",show_rain_today:"Lluvia total hoy",show_beaufort:"Escala de Beaufort",show_wind_gust:"Ráfaga de viento",show_battery:"Batería",show_pressure_trend:"Tendencia de presión",show_interactions:"Interacciones",compact_mode:"Modo compacto (solo hero + sol)",night_palette:"Paleta nocturna del diagrama solar",tile_order:"Orden de mosaicos",tile_order_hint:"Cambia el orden de los mosaicos de sensores en la cuadrícula. Las entidades vacías siguen ocultas.",tile_order_reset:"Restablecer",tile_lux:"Luz / Lux",tile_temperature:"Temperatura",tile_humidity:"Humedad",tile_rain:"Lluvia",tile_wind:"Viento",tile_uv:"Índice UV",tile_pressure:"Presión",tile_battery:"Batería",manual_condition:"Condición manual",pressure_trend_threshold:"Umbral de tendencia",automatic:"Automático",sunny:"Soleado",cloudy:"Nublado",rainy:"Lluvioso",night:"Noche",hint:"Consejo: configura acciones de toque / mantener en YAML, p. ej. temperature_action:, wind_action:. Las secciones se ocultan automáticamente si no hay entidad configurada. El orden también se puede definir en settings.tile_order."}},de:{common:{card_title:"Wetterstation",card_name:"Wetterstationskarte",card_description:"Eine moderne, von Mushroom inspirierte Wetterstationskarte."},condition:{clear_sky:"Klarer Himmel",cloudy:"Bewölkt",rain:"Regen",clear_night:"Klare Nacht",partly_cloudy:"Teilweise bewölkt"},comfort:{freezing:"Fühlt sich eiskalt an",cold:"Fühlt sich kalt an",humid:"Fühlt sich schwül an",hot:"Fühlt sich heiß an",comfortable:"Fühlt sich angenehm an",mild:"Fühlt sich mild an"},dewpoint:"Taupunkt {value} {unit}",sections:{light:"Licht",temperature:"Temp",humidity:"Feuchte",rain:"Regen",wind:"Wind",uv:"UV-Index",pressure:"Luftdruck",battery:"Batterie",dewpoint:"Taupunkt"},sun:{sunrise:"Sonnenaufgang",sunset:"Sonnenuntergang",azimuth:"Azimut",elevation:"Höhe"},rain:{detected:"Regen erkannt",dry:"Trocken",today:"Heute"},wind:{gust:"Böe {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Windstille",light_air:"Leiser Zug",light_breeze:"Leichte Brise",gentle_breeze:"Schwache Brise",moderate_breeze:"Mäßige Brise",fresh_breeze:"Frische Brise",strong_breeze:"Starker Wind",near_gale:"Steifer Wind",gale:"Stürmischer Wind",strong_gale:"Sturm",storm:"Schwerer Sturm",violent_storm:"Orkanartiger Sturm",hurricane:"Orkan"},lux:{dark:"Dunkel",low_light:"Wenig Licht",bright:"Hell",very_bright:"Sehr hell"},uv:{low:"Niedrig",moderate:"Mäßig",high:"Hoch",very_high:"Sehr hoch",extreme:"Extrem"},pressure:{rising:"Steigend",falling:"Fallend",steady:"Stabil"},compass:{N:"N",NE:"NO",E:"O",SE:"SO",S:"S",SW:"SW",W:"W",NW:"NW"},editor:{entities:"Entitäten",settings:"Einstellungen",title:"Kartentitel",temperature_entity:"Temperatur",humidity_entity:"Luftfeuchtigkeit",lux_entity:"Licht / Lux",uv_entity:"UV-Index",rain_entity:"Regen",wind_speed_entity:"Windgeschwindigkeit",wind_direction_entity:"Windrichtung",wind_gust_entity:"Windböe",pressure_entity:"Luftdruck",battery_entity:"Batterie",sun_entity:"Sonne (Aufgang / Untergang)",azimuth_entity:"Azimut (optional)",elevation_entity:"Höhe (optional)",temperature_min_entity:"Min. Temperatur heute (optional)",temperature_max_entity:"Max. Temperatur heute (optional)",rain_today_entity:"Regenmenge heute (optional)",show_daynight:"Tag-/Nachtmodus",show_sun:"Sonnenauf-/untergang Diagramm",show_dewpoint:"Taupunkt",show_minmax:"Heute Min / Max",show_rain_today:"Regenmenge heute",show_beaufort:"Beaufort-Skala",show_wind_gust:"Windböe",show_battery:"Batterie",show_pressure_trend:"Luftdrucktrend",show_interactions:"Interaktionen",compact_mode:"Kompaktmodus (nur Hero + Sonne)",night_palette:"Nachtpalette für Sonnendiagramm",tile_order:"Kachelreihenfolge",tile_order_hint:"Reihenfolge der Sensorkacheln im Raster ändern. Fehlende Entitäten bleiben ausgeblendet.",tile_order_reset:"Zurücksetzen",tile_lux:"Licht / Lux",tile_temperature:"Temperatur",tile_humidity:"Luftfeuchtigkeit",tile_rain:"Regen",tile_wind:"Wind",tile_uv:"UV-Index",tile_pressure:"Luftdruck",tile_battery:"Batterie",manual_condition:"Manueller Zustand",pressure_trend_threshold:"Trendschwelle",automatic:"Automatisch",sunny:"Sonnig",cloudy:"Bewölkt",rainy:"Regnerisch",night:"Nacht",hint:"Tipp: Tippen-/Halten-Aktionen in YAML setzen, z. B. temperature_action:, wind_action:. Abschnitte werden ausgeblendet, wenn keine Entität konfiguriert ist. Kachelreihenfolge auch unter settings.tile_order in YAML."}}};function Fe(e,t){return t.split(".").reduce((e,t)=>e&&null!=e[t]?e[t]:void 0,e)}function Ie(e,t,i={}){const n=e&&(e.locale?.language||e.language||e.selectedLanguage)||"en",r=String(n).replace("_","-").split("-")[0].toLowerCase();let s=Fe(Ve[r],t)??Fe(Ve.en,t)??t;return"string"!=typeof s?t:(Object.keys(i).forEach(e=>{s=s.replace(`{${e}}`,String(i[e]))}),s)}class Ze extends le{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(e){const t={...we,...e.settings||{}};t.tile_order=this._normalizeTileOrder(t.tile_order),this._config={...e,settings:t}}_t(e,t){return Ie(this.hass,e,t)}_normalizeTileOrder(e){const t=new Set(be),i=new Set,n=[];for(const r of Array.isArray(e)?e:[])t.has(r)&&!i.has(r)&&(n.push(r),i.add(r));for(const e of be)i.has(e)||n.push(e);return n}_schema(){const e=this._config?.settings?.show_pressure_trend,t=!1===this._config?.settings?.show_daynight;return[{name:"title",selector:{text:{}}},{type:"expandable",name:"",title:this._t("editor.entities"),icon:"mdi:format-list-bulleted",schema:[{name:"temperature_entity",selector:{entity:{}}},{name:"humidity_entity",selector:{entity:{}}},{name:"lux_entity",selector:{entity:{}}},{name:"uv_entity",selector:{entity:{}}},{name:"rain_entity",selector:{entity:{}}},{name:"",type:"grid",schema:[{name:"wind_speed_entity",selector:{entity:{}}},{name:"wind_direction_entity",selector:{entity:{}}},{name:"wind_gust_entity",selector:{entity:{}}}]},{name:"pressure_entity",selector:{entity:{}}},{name:"battery_entity",selector:{entity:{}}},{name:"sun_entity",selector:{entity:{domain:"sun"}}},{name:"",type:"grid",schema:[{name:"azimuth_entity",selector:{entity:{}}},{name:"elevation_entity",selector:{entity:{}}}]},{name:"",type:"grid",schema:[{name:"temperature_min_entity",selector:{entity:{}}},{name:"temperature_max_entity",selector:{entity:{}}}]},{name:"rain_today_entity",selector:{entity:{}}}]},{type:"expandable",name:"settings",title:this._t("editor.settings"),icon:"mdi:cog",schema:[{name:"",type:"grid",schema:[{name:"show_daynight",selector:{boolean:{}}},{name:"show_sun",selector:{boolean:{}}},{name:"night_palette",selector:{boolean:{}}},{name:"compact_mode",selector:{boolean:{}}},{name:"show_dewpoint",selector:{boolean:{}}},{name:"show_minmax",selector:{boolean:{}}},{name:"show_rain_today",selector:{boolean:{}}},{name:"show_beaufort",selector:{boolean:{}}},{name:"show_wind_gust",selector:{boolean:{}}},{name:"show_battery",selector:{boolean:{}}},{name:"show_pressure_trend",selector:{boolean:{}}},{name:"show_interactions",selector:{boolean:{}}}]},...t?[{name:"manual_condition",selector:{select:{mode:"dropdown",options:[{value:"",label:this._t("editor.automatic")},{value:"sunny",label:this._t("editor.sunny")},{value:"cloudy",label:this._t("editor.cloudy")},{value:"rainy",label:this._t("editor.rainy")},{value:"night",label:this._t("editor.night")}]}}}]:[],...e?[{name:"pressure_trend_threshold",selector:{number:{min:.1,max:10,step:.1,unit_of_measurement:"%",mode:"box"}}}]:[]]}]}_computeLabel=e=>e.name?this._t(`editor.${e.name}`)||e.title||e.name:e.title||"";_valueChanged(e){if(!this._config)return;const t=e.detail.value,i=this._config.settings?.tile_order,n={...t,settings:{...we,...t.settings||{},tile_order:this._normalizeTileOrder(t.settings?.tile_order||i)}};Object.keys(n).forEach(e=>{""===n[e]&&e.endsWith("_entity")&&delete n[e]}),this._config=n,me(this,"config-changed",{config:n})}_moveTile(e,t){const i=[...this._normalizeTileOrder(this._config.settings?.tile_order)],n=e+t;if(n<0||n>=i.length)return;const r=i[e];i[e]=i[n],i[n]=r;const s={...this._config,settings:{...this._config.settings,tile_order:i}};this._config=s,me(this,"config-changed",{config:s})}_resetTileOrder(){const e={...this._config,settings:{...this._config.settings,tile_order:[...be]}};this._config=e,me(this,"config-changed",{config:e})}_renderTileOrder(){if(this._config?.settings?.compact_mode)return I;const e=this._normalizeTileOrder(this._config.settings?.tile_order);return K`
      <div class="tile-order">
        <div class="tile-order-header">
          <div class="tile-order-title">${this._t("editor.tile_order")}</div>
          <button type="button" class="reset" @click=${this._resetTileOrder}>
            ${this._t("editor.tile_order_reset")}
          </button>
        </div>
        <div class="tile-order-hint">${this._t("editor.tile_order_hint")}</div>
        <div class="tile-order-list">
          ${e.map((t,i)=>K`
              <div class="tile-order-row">
                <span class="tile-order-label"
                  >${this._t(`editor.tile_${t}`)}</span
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
                    ?disabled=${i===e.length-1}
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
    `}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${this._renderTileOrder()}
      <div class="hint">${this._t("editor.hint")}</div>
    `:I}static get styles(){return s`
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
    `}}customElements.get(ye)||customElements.define(ye,Ze);class qe extends le{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static async getConfigElement(){return document.createElement(ye)}static getStubConfig(){return{type:`custom:${ge}`,temperature_entity:"",humidity_entity:"",settings:{...we}}}setConfig(e){if(!e)throw new Error("Invalid configuration");const t={...we,...e.settings||{}};t.tile_order=this._normalizeTileOrder(t.tile_order),this._config={...e,settings:t},this._pressureHistory=this._pressureHistory||[],this._tempStats=this._tempStats||null,this._tempHistoryKey=void 0}_normalizeTileOrder(e){const t=new Set(be),i=new Set,n=[];for(const r of Array.isArray(e)?e:[])t.has(r)&&!i.has(r)&&(n.push(r),i.add(r));for(const e of be)i.has(e)||n.push(e);return n}getCardSize(){const e=this._config?.settings||{};return e.compact_mode?!1===e.show_sun?2:3:6}_t(e,t){return Ie(this.hass,e,t)}_hasDedicatedMinMax(){return!(!this._config?.temperature_min_entity&&!this._config?.temperature_max_entity)}_tempStorageKey(){const e=this._config?.temperature_entity;return e?`wsc-temp-stats:${e}`:null}_readStoredTempStats(){const e=this._tempStorageKey();if(!e)return null;try{const t=window.localStorage?.getItem(e);if(!t)return null;const i=JSON.parse(t);return i&&i.day===(new Date).toDateString()&&(Number.isFinite(i.min)&&Number.isFinite(i.max))?{day:i.day,min:i.min,max:i.max}:null}catch(e){return null}}_writeStoredTempStats(){const e=this._tempStorageKey();if(e&&this._tempStats)try{window.localStorage?.setItem(e,JSON.stringify(this._tempStats))}catch(e){}}_recordTemp(e){if(null==e||this._hasDedicatedMinMax())return;if(!(this._config.settings||{}).show_minmax)return;const t=(new Date).toDateString();if(this._tempStats&&this._tempStats.day===t)this._tempStats.min=Math.min(this._tempStats.min,e),this._tempStats.max=Math.max(this._tempStats.max,e);else{const i=this._readStoredTempStats();this._tempStats=i&&i.day===t?{day:t,min:Math.min(i.min,e),max:Math.max(i.max,e)}:{day:t,min:e,max:e},this._tempHistoryKey=void 0}this._writeStoredTempStats(),this._ensureTempHistory()}async _ensureTempHistory(){if(this._hasDedicatedMinMax())return;if(!(this._config.settings||{}).show_minmax)return;const e=this._config?.temperature_entity;if(!e||!this.hass?.callWS)return;const t=(new Date).toDateString(),i=`${e}|${t}`;if(this._tempHistoryKey!==i){this._tempHistoryKey=i;try{const i=new Date;i.setHours(0,0,0,0);const n=new Date,r=await this.hass.callWS({type:"history/history_during_period",start_time:i.toISOString(),end_time:n.toISOString(),entity_ids:[e],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),s=r?.[e]||[];let o=1/0,a=-1/0;for(const e of s){const t=Number.parseFloat(e.s??e.state);Number.isFinite(t)&&(o=Math.min(o,t),a=Math.max(a,t))}const l=Se(this._stateObj("temperature_entity"));if(null!=l&&(o=Math.min(o,l),a=Math.max(a,l)),!Number.isFinite(o)||!Number.isFinite(a))return;this._tempStats&&this._tempStats.day===t?this._tempStats={day:t,min:Math.min(this._tempStats.min,o),max:Math.max(this._tempStats.max,a)}:this._tempStats={day:t,min:o,max:a},this._writeStoredTempStats(),this.requestUpdate()}catch(e){this._tempHistoryKey=void 0}}}shouldUpdate(e){if(!this._config)return!1;if(e.has("_config"))return!0;if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;return(this.hass?.locale?.language||this.hass?.language||this.hass?.selectedLanguage)!==(t.locale?.language||t.language||t.selectedLanguage)||fe.some(({key:e})=>{const i=this._config[e];return!!i&&t.states[i]!==this.hass.states[i]})}_stateObj(e){const t=this._config[e];if(t&&this.hass)return this.hass.states[t]}_isDay(){if(!(this._config.settings||{}).show_daynight)return!0;const e=this._stateObj("sun_entity");if(e)return"above_horizon"===e.state;const t=Se(this._stateObj("lux_entity"));return null==t||t>50}_recordPressure(e){if(null==e)return;const t=Date.now();this._pressureHistory.push({t:t,v:e});const i=t-108e5;this._pressureHistory=this._pressureHistory.filter(e=>e.t>=i)}_pressureTrend(e){const t=Number(this._config.settings.pressure_trend_threshold)||1;if(this._pressureHistory.length<2||null==e)return{icon:"mdi:trending-neutral",labelKey:"steady"};const i=this._pressureHistory[0].v,n=(e-i)/i*100;return n>=t?{icon:"mdi:arrow-up",labelKey:"rising"}:n<=-t?{icon:"mdi:arrow-down",labelKey:"falling"}:{icon:"mdi:trending-neutral",labelKey:"steady"}}_actionConfig(e){if(!(this._config.settings||{}).show_interactions)return;const t=this._config[e],i=this._config[`${e.replace("_entity","")}_action`];return{entity:t,tap_action:i?.tap_action||{action:"more-info"},hold_action:i?.hold_action,double_tap_action:i?.double_tap_action}}_handleClick(e){const t=this._actionConfig(e);t&&t.entity&&function(e,t,i){var n;i.tap_action&&(n=i.tap_action),_e(e,t,i,n)}(this,this.hass,t)}_clickable(e){const t=this._actionConfig(e);return!(!t||!t.entity||!function(e){return void 0!==e&&"none"!==e.action}(t.tap_action)&&!t.tap_action)}render(){if(!this._config||!this.hass)return I;const e=this._config.settings||{},t=Se(this._stateObj("temperature_entity")),i=Se(this._stateObj("humidity_entity")),n=Me(this._stateObj("temperature_entity"),"°C");this._recordTemp(t);const r=this._isDay(),s=this._stateObj("rain_entity"),o=!!s&&function(e){if(!e)return!1;const t=String(e.state).toLowerCase();if(["on","true","wet","raining","detected"].includes(t))return!0;const i=Number(e.state);return Number.isFinite(i)&&i>0}(s),a=Se(s),l=Se(this._stateObj("lux_entity")),c=Se(this._stateObj("uv_entity"));let d;if(!e.show_daynight&&this._config.settings.manual_condition){d={sunny:{icon:"mdi:weather-sunny",labelKey:"clear_sky"},cloudy:{icon:"mdi:weather-cloudy",labelKey:"cloudy"},rainy:{icon:"mdi:weather-rainy",labelKey:"rain"},night:{icon:"mdi:weather-night",labelKey:"clear_night"}}[this._config.settings.manual_condition]||ze({isDay:r,rainMm:a,rainOn:o,lux:l,uv:c})}else d=ze({isDay:r,rainMm:a,rainOn:o,lux:l,uv:c});const h=""===this._config.title?"":this._config.title&&"Weather Station"!==this._config.title?this._config.title:this._t("common.card_title");return K`
      <ha-card>
        <div class="wsc ${e.compact_mode?"compact":"full"}">
          ${h?K`<div class="title">${h}</div>`:I}

          ${this._renderHero(d,t,n,i)}
          ${this._renderSun()}

          ${e.compact_mode?I:K`<div class="grid">
                ${this._renderTiles(l,t,n,i,s,o,a,c)}
              </div>`}
        </div>
      </ha-card>
    `}_renderTiles(e,t,i,n,r,s,o,a){const l=this._normalizeTileOrder(this._config.settings?.tile_order),c={lux:()=>this._renderLux(e),temperature:()=>this._renderTemperature(t,i),humidity:()=>this._renderHumidity(n),rain:()=>this._renderRain(r,s,o),wind:()=>this._renderWind(),uv:()=>this._renderUv(a),pressure:()=>this._renderPressure(),battery:()=>this._renderBattery()};return l.map(e=>c[e]?c[e]():I)}_renderSun(){const e=this._config.settings||{};if(!e.show_sun)return I;const t=this._stateObj("sun_entity"),i=this._stateObj("azimuth_entity"),n=this._stateObj("elevation_entity"),r=this._stateObj("uv_entity");if(!t&&!i&&!n)return I;const s=t&&t.attributes||{},o=!t||"above_horizon"===t.state,a=Se(n)??Number(s.elevation),l=Se(i)??Number(s.azimuth),c=Se(r),d=Ne(this.hass,s.next_rising),h=Ne(this.hass,s.next_setting),u=function(e,t,i){let n=Number(e);const r=Number.isFinite(n);r&&(n=(n%360+360)%360);const s=Number(t),o=Number.isFinite(s),a=!r||n<=180;if(o?s<0:!i){const e=60+18*(o?Math.min(1,-s/12):.4),t=a?Le:He,{p:i,u:n}=Ke(t,e),r=De(a?0:3,n);return{x:i.x,y:i.y,t:a?0:1,g:r,night:!0}}const l=60-48*(o?Math.max(0,Math.min(1,s/90)):.5),c=a?Ce.left:Ce.right,{p:d,u:h}=Ke(c,l),u=a?.5*h:.5+.5*h,m=De(a?1:2,h);return{x:d.x,y:d.y,t:u,g:m,night:!1}}(l,a,o),m=u.night,p=function(e=4.6){Be();const t=[],i=Math.max(12,Math.round(Ue/e)),n=Ue/i;for(let e=0;e<=i;e++){const i=e*n;let r=0;for(;r<We.length-1&&i>Re[r]+Pe[r];)r++;const s=Math.min(1,(i-Re[r])/Pe[r]),[o,a,l,c]=We[r],d=Oe(o,a,l,c,s);t.push({x:d.x,y:d.y,above:d.y<=60.001,g:i/Ue})}return t}(),_=u.x/200*100+"%",g=(u.y-0)/84*100+"%",y=Number.isFinite(a)?`${Te(a,1)}°`:"—",f=Number.isFinite(l)?`${Te(l,0)}°`:"—",b=t?"sun_entity":i?"azimuth_entity":"elevation_entity",w=!1!==e.night_palette&&m;return K`
      <div
        class="sun-panel ${w?"night-palette":""} ${this._clickable(b)?"tappable":""}"
        @click=${()=>this._handleClick(b)}
      >
        <div class="sun-scene ${m?"night":"day"}">
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
            ${p.map(e=>{const t=e.g<=u.g,i=`dot ${e.above?"day":"night"} ${t?"past":"future"}`,n=e.above?t?1.6:1.3:t?1.5:1.2;return V`<circle class=${i} cx=${e.x} cy=${e.y} r=${n} />`})}
          </svg>

          <ha-icon
            class="sun-marker ${m?"night":"day"}"
            style="left:${_};top:${g}"
            .icon=${m?"mdi:weather-night":"mdi:white-balance-sunny"}
          ></ha-icon>

          <div class="sun-center">
            <div class="sun-stat">
              <div class="sun-stat-value">${y}</div>
              <div class="sun-stat-label">${this._t("sun.elevation")}</div>
            </div>
            <div class="sun-stat">
              <div class="sun-stat-value">${f}</div>
              <div class="sun-stat-label">${this._t("sun.azimuth")}</div>
            </div>
            ${null!=c?K`
                  <div class="sun-stat">
                    <div class="sun-stat-value">${Te(c,0)}</div>
                    <div class="sun-stat-label">${this._t("sections.uv")}</div>
                  </div>
                `:I}
          </div>

          ${t?K`
                <div class="sun-edge" style="left:${"20%"}">
                  ${d||"—"}
                </div>
                <div class="sun-edge" style="left:${"80%"}">
                  ${h||"—"}
                </div>
              `:I}
        </div>
      </div>
    `}_todayMinMax(){const e=Se(this._stateObj("temperature_min_entity")),t=Se(this._stateObj("temperature_max_entity")),i=null!=e?e:this._tempStats?this._tempStats.min:null,n=null!=t?t:this._tempStats?this._tempStats.max:null;return null==i||null==n?null:{min:i,max:n}}_renderHero(e,t,i,n){const r=this._config.settings||{},s=r.show_dewpoint?function(e,t){if(null==e||null==t||t<=0)return null;const i=243.12,n=Math.log(t/100)+17.62*e/(i+e),r=i*n/(17.62-n);return Math.round(10*r)/10}(t,n):null,o=function(e,t){return null==e?null:e<0?"freezing":e<10?"cold":e>27&&null!=t&&t>60?"humid":e>30?"hot":e>=18&&e<=26?"comfortable":"mild"}(t,n),a=r.show_minmax?this._todayMinMax():null,l=this._stateObj("wind_speed_entity"),c=Se(this._stateObj("wind_direction_entity")),d=Se(l),h=Me(l,"m/s"),u=ke(c),m=u?this._t(`compass.${u}`):null,p=l||null!=c;return K`
      <div
        class="hero ${p?"has-wind":""} ${this._clickable("temperature_entity")?"tappable":""}"
        @click=${()=>this._handleClick("temperature_entity")}
      >
        <ha-icon class="hero-icon" .icon=${e.icon}></ha-icon>
        <div class="hero-main">
          <div class="hero-condition">
            ${this._t(`condition.${e.labelKey}`)}
          </div>
          <div class="hero-temp">
            ${null!=t?`${Te(t,1)} ${i}`:"—"}
          </div>
          ${a?K`<div class="hero-minmax">
                <span class="mm mm-min">
                  <ha-icon .icon=${"mdi:arrow-down-thin"}></ha-icon>
                  ${Te(a.min,1)}°
                </span>
                <span class="mm mm-max">
                  <ha-icon .icon=${"mdi:arrow-up-thin"}></ha-icon>
                  ${Te(a.max,1)}°
                </span>
              </div>`:I}
        </div>
        ${p?K`
              <div
                class="hero-wind ${this._clickable("wind_speed_entity")?"tappable":""}"
                @click=${e=>{e.stopPropagation(),this._handleClick("wind_speed_entity")}}
              >
                ${null!=c?this._renderCompass(c,m):I}
                ${null!=d?K`<div class="hero-wind-speed">
                      ${Te(d,1)} ${h}
                    </div>`:I}
              </div>
            `:I}
        ${null!=t?K`<div class="hero-sub">
              ${o?K`<span>${this._t(`comfort.${o}`)}</span>`:I}
              ${null!=s?K`<span class="muted"
                    >${this._t("dewpoint",{value:s,unit:i})}</span
                  >`:I}
            </div>`:I}
      </div>
    `}_tile({icon:e,label:t,value:i,sub:n,key:r,accent:s}){const o=!!r&&this._clickable(r);return K`
      <div
        class="tile ${o?"tappable":""}"
        @click=${r?()=>this._handleClick(r):void 0}
      >
        <ha-icon
          class="tile-icon"
          style=${s?`--tile-accent:${s}`:""}
          .icon=${e}
        ></ha-icon>
        <div class="tile-body">
          <div class="tile-label">${t}</div>
          <div class="tile-value">${i}</div>
          ${n?K`<div class="tile-sub">${n}</div>`:I}
        </div>
      </div>
    `}_renderLux(e){if(!this._stateObj("lux_entity"))return I;const t=function(e){return null==e?null:$e.find(t=>e<t.max)||$e[$e.length-1]}(e);return this._tile({icon:t?t.icon:"mdi:brightness-7",label:this._t("sections.light"),value:Ae(e),sub:t?this._t(`lux.${t.labelKey}`):"",key:"lux_entity"})}_renderTemperature(e,t){return this._stateObj("temperature_entity")?this._tile({icon:"mdi:thermometer",label:this._t("sections.temperature"),value:null!=e?`${Te(e,1)} ${t}`:"—",key:"temperature_entity"}):I}_renderHumidity(e){return this._stateObj("humidity_entity")?this._tile({icon:"mdi:water-percent",label:this._t("sections.humidity"),value:null!=e?`${Te(e,0)}%`:"—",key:"humidity_entity"}):I}_renderRain(e,t,i){const n=this._config.settings||{},r=this._stateObj("rain_today_entity"),s=n.show_rain_today?Se(r):null;if(!e&&null==s)return I;const o=Me(e,"mm/h"),a=Me(r,"mm"),l=null!=i?`${Te(i,1)} ${o}`:"",c=null!=s?`${this._t("rain.today")} ${Te(s,1)} ${a}`:"";let d;return d=e&&c?K`<span>${l||this._t("rain.today")}</span
        ><span class="dot">·</span><span>${c}</span>`:e?l:c,this._tile({icon:t?"mdi:weather-rainy":"mdi:weather-partly-rainy",label:this._t("sections.rain"),value:e?t?this._t("rain.detected"):this._t("rain.dry"):null!=s?`${Te(s,1)} ${a}`:"—",sub:e?d:c&&null!=s?this._t("rain.today"):d,key:e?"rain_entity":"rain_today_entity",accent:t?"var(--info-color, #2196f3)":void 0})}_renderWind(){const e=this._stateObj("wind_speed_entity");if(!e)return I;const t=this._config.settings||{},i=Se(e),n=Me(e,"m/s"),r=ke(Se(this._stateObj("wind_direction_entity"))),s=r?this._t(`compass.${r}`):null,o=this._stateObj("wind_gust_entity"),a=Se(o),l=Me(o,n),c=t.show_beaufort?(d=function(e,t){if(null==e||!Number.isFinite(Number(e)))return null;const i=Number(e),n=String(t||"").toLowerCase();return n.includes("km/h")||n.includes("kmh")||n.includes("kph")?i/3.6:n.includes("mph")?.44704*i:n.includes("kn")||n.includes("kt")?.514444*i:i}(i,n),null!=d&&Number.isFinite(d)?[{max:.5,n:0,key:"calm"},{max:1.6,n:1,key:"light_air"},{max:3.4,n:2,key:"light_breeze"},{max:5.5,n:3,key:"gentle_breeze"},{max:8,n:4,key:"moderate_breeze"},{max:10.8,n:5,key:"fresh_breeze"},{max:13.9,n:6,key:"strong_breeze"},{max:17.2,n:7,key:"near_gale"},{max:20.8,n:8,key:"gale"},{max:24.5,n:9,key:"strong_gale"},{max:28.5,n:10,key:"storm"},{max:32.7,n:11,key:"violent_storm"},{max:1/0,n:12,key:"hurricane"}].find(e=>d<e.max):null):null;var d;return K`
      <div
        class="tile wind ${this._clickable("wind_speed_entity")?"tappable":""}"
        @click=${()=>this._handleClick("wind_speed_entity")}
      >
        <ha-icon class="tile-icon" .icon=${"mdi:weather-windy"}></ha-icon>
        <div class="tile-body">
          <div class="tile-label">${this._t("sections.wind")}</div>
          <div class="tile-value">
            ${null!=i?`${Te(i,1)} ${n}`:"—"}
          </div>
          ${s||c?K`<div class="tile-sub wind-meta">
                ${s?K`<span>${s}</span>`:I}
                ${s&&c?K`<span class="dot">·</span>`:I}
                ${c?K`<span
                      >${this._t("wind.beaufort",{value:c.n})}</span
                    >`:I}
              </div>`:I}
          ${c?K`<div class="tile-sub wind-desc">
                ${this._t(`beaufort.${c.key}`)}
              </div>`:I}
          ${t.show_wind_gust&&null!=a?K`<div class="tile-sub">
                <ha-icon class="mini-icon" .icon=${"mdi:weather-windy-variant"}></ha-icon>
                ${this._t("wind.gust",{value:Te(a,0),unit:l})}
              </div>`:I}
        </div>
      </div>
    `}_renderCompass(e,t){return K`
      <div class="compass" title="${t||""} (${Te(e,0)}°)">
        <span class="c-n">${this._t("compass.N")}</span>
        <span class="c-e">${this._t("compass.E")}</span>
        <span class="c-s">${this._t("compass.S")}</span>
        <span class="c-w">${this._t("compass.W")}</span>
        <div class="needle" style="transform: rotate(${e}deg)">
          <ha-icon .icon=${"mdi:navigation"}></ha-icon>
        </div>
      </div>
    `}_renderUv(e){if(!this._stateObj("uv_entity"))return I;const t=function(e){return null==e?null:xe.find(t=>e<=t.max)||xe[xe.length-1]}(e);return this._tile({icon:"mdi:sun-wireless",label:this._t("sections.uv"),value:null!=e?`${Te(e,0)}`:"—",sub:t?this._t(`uv.${t.labelKey}`):"",key:"uv_entity",accent:t?t.color:void 0})}_renderPressure(){const e=this._stateObj("pressure_entity");if(!e)return I;const t=this._config.settings||{},i=Se(e),n=Me(e,"hPa");this._recordPressure(i);const r=t.show_pressure_trend?this._pressureTrend(i):null;return this._tile({icon:"mdi:gauge",label:this._t("sections.pressure"),value:null!=i?`${Te(i,0)} ${n}`:"—",sub:r?K`<ha-icon class="mini-icon" .icon=${r.icon}></ha-icon>
            ${this._t(`pressure.${r.labelKey}`)}`:"",key:"pressure_entity"})}_renderBattery(){if(!(this._config.settings||{}).show_battery)return I;const e=this._stateObj("battery_entity");if(!e)return I;const t=Se(e);let i;return null!=t&&t<15?i="var(--error-color, #e53935)":null!=t&&t<40&&(i="var(--warning-color, #ffa726)"),this._tile({icon:Ee(t),label:this._t("sections.battery"),value:null!=t?`${Te(t,0)}%`:"—",key:"battery_entity",accent:i})}static get styles(){return s`
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
      .hero-icon {
        grid-row: 1 / 3;
        --mdc-icon-size: 46px;
        color: var(--state-icon-color, var(--primary-color));
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
        gap: 6px;
        padding: 2px 0 2px 8px;
        border-radius: 12px;
        align-self: stretch;
      }
      .hero-wind .compass {
        width: 76px;
        height: 76px;
        font-size: 0.72rem;
      }
      .hero-wind .compass .c-n { top: 11px; }
      .hero-wind .compass .c-s { top: 65px; }
      .hero-wind .compass .c-e { left: 65px; }
      .hero-wind .compass .c-w { left: 11px; }
      .hero-wind .compass .needle ha-icon {
        --mdc-icon-size: 30px;
      }
      .hero-wind-speed {
        font-size: 0.95rem;
        font-weight: 600;
        line-height: 1.1;
        color: var(--primary-text-color);
        white-space: nowrap;
      }
      @container wsc (max-width: 380px) {
        .hero {
          gap: 4px 10px;
          padding: 12px;
        }
        .hero-icon {
          --mdc-icon-size: 38px;
        }
        .hero-temp {
          font-size: 1.65rem;
        }
        .hero-wind {
          padding-left: 2px;
          gap: 4px;
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
        .hero-wind .compass .needle ha-icon {
          --mdc-icon-size: 24px;
        }
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
      .hero-minmax .mm ha-icon {
        --mdc-icon-size: 15px;
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
        color: #a8c0ff;
        filter: drop-shadow(0 0 10px rgba(123, 156, 255, 0.75));
        --mdc-icon-size: 24px;
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
        --mdc-icon-size: 26px;
        color: #ffc107;
        filter: drop-shadow(0 0 6px rgba(255, 193, 7, 0.55));
        z-index: 2;
        pointer-events: none;
        transition: left 0.6s ease, top 0.6s ease;
      }
      .sun-marker.night {
        color: var(--wsc-night-color, #3f6fd6);
        filter: drop-shadow(0 0 6px rgba(63, 111, 214, 0.5));
        --mdc-icon-size: 22px;
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
        --mdc-icon-size: 24px;
        color: var(--tile-accent, var(--state-icon-color, var(--primary-color)));
        flex: 0 0 auto;
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
        --mdc-icon-size: 15px;
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

      .tappable {
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .tappable:hover {
        background: var(--divider-color, rgba(0, 0, 0, 0.08));
      }
    `}}customElements.get(ge)||customElements.define(ge,qe),window.customCards=window.customCards||[],window.customCards.find(e=>e.type===ge)||window.customCards.push({type:ge,name:"Weather Station Card",description:"A modern, Mushroom-inspired weather station card.",preview:!0,documentationURL:"https://github.com/H3ss3ltje/lovelace-weather-station-card"}),console.info("%c WEATHER-STATION-CARD %c v1.5.2 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{qe as WeatherStationCard};
