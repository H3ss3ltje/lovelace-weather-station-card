const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let s=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new s(n,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,m=globalThis,_=m.trustedTypes,p=_?_.emptyScript:"",y=m.reactiveElementPolyfillSupport,g=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!o(t,e),v={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&l(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const r=n?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=n;const r=s.fromAttribute(e,t.type);this[n]=r??this._$Ej?.get(n)??r,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){if(void 0!==t){const r=this.constructor;if(!1===n&&(s=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[g("elementProperties")]=new Map,w[g("finalized")]=new Map,y?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,$=t=>t,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+E,M=`<${z}>`,C=document,N=()=>C.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,W="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,j=/>/g,P=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,U=/"/g,B=/^(?:script|style|textarea|title)$/i,D=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),K=D(1),V=D(2),F=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),Z=new WeakMap,q=C.createTreeWalker(C,129);function G(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,n=[];let s,r=2===e?"<svg>":3===e?"<math>":"",a=H;for(let e=0;e<i;e++){const i=t[e];let o,l,d=-1,c=0;for(;c<i.length&&(a.lastIndex=c,l=a.exec(i),null!==l);)c=a.lastIndex,a===H?"!--"===l[1]?a=L:void 0!==l[1]?a=j:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=P):void 0!==l[3]&&(a=P):a===P?">"===l[0]?(a=s??H,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,o=l[1],a=void 0===l[3]?P:'"'===l[3]?U:R):a===U||a===R?a=P:a===L||a===j?a=H:(a=P,s=void 0);const h=a===P&&t[e+1].startsWith("/>")?" ":"";r+=a===H?i+M:d>=0?(n.push(o),i.slice(0,d)+A+i.slice(d)+E+h):i+E+(-2===d?e:h)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class J{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,r=0;const a=t.length-1,o=this.parts,[l,d]=Y(t,e);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=q.nextNode())&&o.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(A)){const e=d[r++],i=n.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?nt:"@"===a[1]?st:et}),n.removeAttribute(t)}else t.startsWith(E)&&(o.push({type:6,index:s}),n.removeAttribute(t));if(B.test(n.tagName)){const t=n.textContent.split(E),e=t.length-1;if(e>0){n.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],N()),q.nextNode(),o.push({type:2,index:++s});n.append(t[e],N())}}}else if(8===n.nodeType)if(n.data===z)o.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(E,t+1));)o.push({type:7,index:s}),t+=E.length-1}s++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,n){if(e===F)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const r=O(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,n)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??C).importNode(e,!0);q.currentNode=n;let s=q.nextNode(),r=0,a=0,o=i[0];for(;void 0!==o;){if(r===o.index){let e;2===o.type?e=new tt(s,s.nextSibling,this,t):1===o.type?e=new o.ctor(s,o.name,o.strings,this,t):6===o.type&&(e=new rt(s,this,t)),this._$AV.push(e),o=i[++a]}r!==o?.index&&(s=q.nextNode(),r++)}return q.currentNode=C,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new X(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new J(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new tt(this.O(N()),this.O(N()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}_$AI(t,e=this,i,n){const s=this.strings;let r=!1;if(void 0===s)t=Q(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const n=t;let a,o;for(t=s[0],a=0;a<s.length-1;a++)o=Q(this,n[i+a],e,a),o===F&&(o=this._$AH[a]),r||=!O(o)||o!==this._$AH[a],o===I?t=I:t!==I&&(t+=(o??"")+s[a+1]),this._$AH[a]=o}r&&!n&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}class nt extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}}class st extends et{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??I)===F)return;const i=this._$AH,n=t===I&&i!==I||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==I&&(i===I||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}let rt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}};const at=x.litHtmlPolyfillSupport;at?.(J,tt),(x.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;class lt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new tt(e.insertBefore(N(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}lt._$litElement$=!0,lt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:lt});const dt=ot.litElementPolyfillSupport;var ct,ht;dt?.({LitElement:lt}),(ot.litElementVersions??=[]).push("4.2.2"),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ct||(ct={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ht||(ht={}));var ut=["closed","locked","off"],mt=function(t,e,i,n){n=n||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return s.detail=i,t.dispatchEvent(s),s},_t=function(t){mt(window,"haptic",t)},pt=function(t,e,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some(function(t){return t.user===e.user.id})||(_t("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&mt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),mt(window,"location-changed",{replace:i})}(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var n,s=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===s?"homeassistant":s;switch(s){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}t.callService(r,n,{entity_id:e})})(t,e,ut.includes(t.states[e].state))}(e,i.entity),_t("success"));break;case"call-service":if(!n.service)return void _t("failure");var s=n.service.split(".",2);e.callService(s[0],s[1],n.service_data,n.target),_t("success");break;case"fire-dom-event":mt(t,"ll-custom",n)}};const yt="weather-station-card",gt="weather-station-card-editor",ft=[{key:"temperature_entity",icon:"mdi:thermometer"},{key:"humidity_entity",icon:"mdi:water-percent"},{key:"lux_entity",icon:"mdi:brightness-7"},{key:"uv_entity",icon:"mdi:sun-wireless"},{key:"rain_entity",icon:"mdi:weather-rainy"},{key:"wind_speed_entity",icon:"mdi:weather-windy"},{key:"wind_direction_entity",icon:"mdi:compass"},{key:"wind_gust_entity",icon:"mdi:weather-windy-variant"},{key:"pressure_entity",icon:"mdi:gauge"},{key:"battery_entity",icon:"mdi:battery-high"},{key:"sun_entity",icon:"mdi:weather-sunny"},{key:"azimuth_entity",icon:"mdi:compass-outline"},{key:"elevation_entity",icon:"mdi:angle-acute"},{key:"temperature_min_entity",icon:"mdi:thermometer-low"},{key:"temperature_max_entity",icon:"mdi:thermometer-high"},{key:"rain_today_entity",icon:"mdi:weather-pouring"}],bt={show_dewpoint:!1,show_pressure_trend:!1,show_battery:!0,show_wind_gust:!0,show_interactions:!0,show_daynight:!0,show_sun:!0,show_minmax:!0,show_rain_today:!0,show_beaufort:!0,show_expand:!0,pressure_trend_threshold:1,manual_condition:""},vt=["N","NE","E","SE","S","SW","W","NW"],wt=[{max:2,labelKey:"low",color:"#4caf50"},{max:5,labelKey:"moderate",color:"#ffb300"},{max:7,labelKey:"high",color:"#fb8c00"},{max:10,labelKey:"very_high",color:"#e53935"},{max:1/0,labelKey:"extreme",color:"#8e24aa"}],xt=[{max:100,labelKey:"dark",icon:"mdi:brightness-2"},{max:1e3,labelKey:"low_light",icon:"mdi:brightness-5"},{max:1e4,labelKey:"bright",icon:"mdi:brightness-6"},{max:1/0,labelKey:"very_bright",icon:"mdi:brightness-7"}];function $t(t){if(!t)return null;const e=Number(t.state);return Number.isFinite(e)?e:null}function kt(t,e){if(null==t||null==e||e<=0)return null;const i=243.12,n=Math.log(e/100)+17.62*t/(i+t),s=i*n/(17.62-n);return Math.round(10*s)/10}function St(t){if(null==t)return null;const e=Math.round(t%360/45)%8;return vt[e]}function At(t){return null==t?"—":t>=1e3?Math.round(t/100)/10+" klux":`${Math.round(t)} lux`}function Et(t){return null==t?"mdi:battery-unknown":t>=95?"mdi:battery":t>=70?"mdi:battery-high":t>=40?"mdi:battery-medium":t>=15?"mdi:battery-low":"mdi:battery-outline"}function zt({isDay:t,rainMm:e,rainOn:i,lux:n,uv:s}){if(i||null!=e&&e>0)return{icon:"mdi:weather-rainy",labelKey:"rain"};const r=null!=n&&n>8e3||null!=s&&s>=3;return t?null!=n&&n<4e3&&!r?{icon:"mdi:weather-cloudy",labelKey:"cloudy"}:r?{icon:"mdi:weather-sunny",labelKey:"clear_sky"}:{icon:"mdi:weather-partly-cloudy",labelKey:"partly_cloudy"}:{icon:"mdi:weather-night",labelKey:"clear_night"}}function Mt(t,e=1){if(null==t||""===t)return null;const i=Number(t);if(!Number.isFinite(i))return null;const n=Math.pow(10,e);return Math.round(i*n)/n}function Ct(t,e=""){return t&&t.attributes&&t.attributes.unit_of_measurement||e}function Nt(t,e){if(!e)return null;const i=new Date(e);if(Number.isNaN(i.getTime()))return null;const n=t?.locale?.language||t?.language||t?.selectedLanguage||void 0;return i.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit"})}function Ot(t,e,i,n,s){const r=1-s,a=s*s,o=r*r;return{x:o*r*t.x+3*o*s*e.x+3*r*a*i.x+a*s*n.x,y:o*r*t.y+3*o*s*e.y+3*r*a*i.y+a*s*n.y}}const Tt={left:[{x:30,y:60},{x:44,y:49},{x:70,y:12},{x:100,y:12}],right:[{x:100,y:12},{x:130,y:12},{x:156,y:49},{x:170,y:60}]},Wt=[{x:3,y:78},{x:14,y:78},{x:24,y:66},{x:30,y:60}],Ht=[{x:170,y:60},{x:176,y:66},{x:186,y:78},{x:197,y:78}],Lt=[Wt,Tt.left,Tt.right,Ht];function jt([t,e,i,n]){let s=0,r=Ot(t,e,i,n,0);for(let a=1;a<=24;a++){const o=Ot(t,e,i,n,a/24);s+=Math.hypot(o.x-r.x,o.y-r.y),r=o}return s}let Pt=null,Rt=null,Ut=0;function Bt(){if(Pt)return;Pt=Lt.map(jt),Ut=Pt.reduce((t,e)=>t+e,0),Rt=[];let t=0;for(const e of Pt)Rt.push(t),t+=e}function Dt(t,e){return Bt(),(Rt[t]+e*Pt[t])/Ut}function Kt([t,e,i,n],s){let r=Ot(t,e,i,n,0),a=0,o=1/0;for(let l=0;l<=120;l++){const d=l/120,c=Ot(t,e,i,n,d),h=Math.abs(c.y-s);h<o&&(o=h,r=c,a=d)}return{p:r,u:a}}function Vt(t,e){if(null==t||!Number.isFinite(Number(t)))return null;const i=Number(t),n=String(e||"").toLowerCase();return n.includes("km/h")||n.includes("kmh")||n.includes("kph")?i/3.6:n.includes("mph")?.44704*i:n.includes("kn")||n.includes("kt")?.514444*i:i}function Ft(t){if(null==t||!Number.isFinite(t))return null;return[{max:.5,n:0,key:"calm"},{max:1.6,n:1,key:"light_air"},{max:3.4,n:2,key:"light_breeze"},{max:5.5,n:3,key:"gentle_breeze"},{max:8,n:4,key:"moderate_breeze"},{max:10.8,n:5,key:"fresh_breeze"},{max:13.9,n:6,key:"strong_breeze"},{max:17.2,n:7,key:"near_gale"},{max:20.8,n:8,key:"gale"},{max:24.5,n:9,key:"strong_gale"},{max:28.5,n:10,key:"storm"},{max:32.7,n:11,key:"violent_storm"},{max:1/0,n:12,key:"hurricane"}].find(e=>t<e.max)}const It={en:{common:{card_title:"Weather Station",card_name:"Weather Station Card",card_description:"A modern, Mushroom-inspired weather station card."},condition:{clear_sky:"Clear sky",cloudy:"Cloudy",rain:"Rain",clear_night:"Clear night",partly_cloudy:"Partly cloudy"},comfort:{freezing:"Feels freezing",cold:"Feels cold",humid:"Feels humid",hot:"Feels hot",comfortable:"Feels comfortable",mild:"Feels mild"},dewpoint:"Dewpoint {value} {unit}",sections:{light:"Light",temperature:"Temp",humidity:"Humidity",rain:"Rain",wind:"Wind",uv:"UV Index",pressure:"Pressure",battery:"Battery",dewpoint:"Dew point"},sun:{sunrise:"Sunrise",sunset:"Sunset",azimuth:"Azimuth",elevation:"Elevation"},rain:{detected:"Rain detected",dry:"Dry",today:"Today"},wind:{gust:"Gust {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Calm",light_air:"Light air",light_breeze:"Light breeze",gentle_breeze:"Gentle breeze",moderate_breeze:"Moderate breeze",fresh_breeze:"Fresh breeze",strong_breeze:"Strong breeze",near_gale:"Near gale",gale:"Gale",strong_gale:"Strong gale",storm:"Storm",violent_storm:"Violent storm",hurricane:"Hurricane"},details:{more:"More details",less:"Less",min_today:"Min today",max_today:"Max today",rain_today:"Rain today",wind_gust:"Wind gust",beaufort:"Wind force"},lux:{dark:"Dark",low_light:"Low light",bright:"Bright",very_bright:"Very bright"},uv:{low:"Low",moderate:"Moderate",high:"High",very_high:"Very high",extreme:"Extreme"},pressure:{rising:"Rising",falling:"Falling",steady:"Steady"},compass:{N:"N",NE:"NE",E:"E",SE:"SE",S:"S",SW:"SW",W:"W",NW:"NW"},editor:{entities:"Entities",settings:"Settings",title:"Card title",temperature_entity:"Temperature",humidity_entity:"Humidity",lux_entity:"Light / Lux",uv_entity:"UV Index",rain_entity:"Rain",wind_speed_entity:"Wind speed",wind_direction_entity:"Wind direction",wind_gust_entity:"Wind gust",pressure_entity:"Pressure",battery_entity:"Battery",sun_entity:"Sun (sunrise / sunset)",azimuth_entity:"Azimuth (optional override)",elevation_entity:"Elevation (optional override)",temperature_min_entity:"Min temperature today (optional)",temperature_max_entity:"Max temperature today (optional)",rain_today_entity:"Rain total today (optional)",show_daynight:"Day / night mode",show_sun:"Sunrise / sunset diagram",show_dewpoint:"Dew point",show_minmax:"Today min / max",show_rain_today:"Rain total today",show_beaufort:"Beaufort scale",show_expand:"Expandable details",show_wind_gust:"Wind gust",show_battery:"Battery",show_pressure_trend:"Pressure trend",show_interactions:"Interactions",manual_condition:"Manual condition",pressure_trend_threshold:"Trend threshold",automatic:"Automatic",sunny:"Sunny",cloudy:"Cloudy",rainy:"Rainy",night:"Night",hint:"Tip: set individual tap / hold actions in YAML, e.g. temperature_action:, wind_action:. Sections are hidden automatically when their entity is not configured."}},nl:{common:{card_title:"Weerstation",card_name:"Weerstationkaart",card_description:"Een moderne, Mushroom-geïnspireerde weerstationkaart."},condition:{clear_sky:"Heldere lucht",cloudy:"Bewolkt",rain:"Regen",clear_night:"Heldere nacht",partly_cloudy:"Gedeeltelijk bewolkt"},comfort:{freezing:"Voelt vriezend",cold:"Voelt koud",humid:"Voelt vochtig",hot:"Voelt heet",comfortable:"Voelt comfortabel",mild:"Voelt mild"},dewpoint:"Dauwpunt {value} {unit}",sections:{light:"Licht",temperature:"Temp",humidity:"Vochtigheid",rain:"Regen",wind:"Wind",uv:"UV-index",pressure:"Luchtdruk",battery:"Batterij",dewpoint:"Dauwpunt"},sun:{sunrise:"Zonsopkomst",sunset:"Zonsondergang",azimuth:"Azimut",elevation:"Elevatie"},rain:{detected:"Regen gedetecteerd",dry:"Droog",today:"Vandaag"},wind:{gust:"Windstoot {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Windstil",light_air:"Zwakke wind",light_breeze:"Zwakke wind",gentle_breeze:"Matige wind",moderate_breeze:"Matige wind",fresh_breeze:"Vrij krachtige wind",strong_breeze:"Krachtige wind",near_gale:"Harde wind",gale:"Stormachtig",strong_gale:"Storm",storm:"Zware storm",violent_storm:"Zeer zware storm",hurricane:"Orkaan"},details:{more:"Meer details",less:"Minder",min_today:"Min vandaag",max_today:"Max vandaag",rain_today:"Regen vandaag",wind_gust:"Windstoot",beaufort:"Windkracht"},lux:{dark:"Donker",low_light:"Weinig licht",bright:"Helder",very_bright:"Zeer helder"},uv:{low:"Laag",moderate:"Matig",high:"Hoog",very_high:"Zeer hoog",extreme:"Extreem"},pressure:{rising:"Stijgend",falling:"Dalend",steady:"Stabiel"},compass:{N:"N",NE:"NO",E:"O",SE:"ZO",S:"Z",SW:"ZW",W:"W",NW:"NW"},editor:{entities:"Entiteiten",settings:"Instellingen",title:"Kaarttitel",temperature_entity:"Temperatuur",humidity_entity:"Luchtvochtigheid",lux_entity:"Licht / Lux",uv_entity:"UV-index",rain_entity:"Regen",wind_speed_entity:"Windsnelheid",wind_direction_entity:"Windrichting",wind_gust_entity:"Windstoot",pressure_entity:"Luchtdruk",battery_entity:"Batterij",sun_entity:"Zon (zonsopkomst / zonsondergang)",azimuth_entity:"Azimut (optionele override)",elevation_entity:"Elevatie (optionele override)",temperature_min_entity:"Min temperatuur vandaag (optioneel)",temperature_max_entity:"Max temperatuur vandaag (optioneel)",rain_today_entity:"Regen totaal vandaag (optioneel)",show_daynight:"Dag / nacht modus",show_sun:"Zonsopkomst / zonsondergang diagram",show_dewpoint:"Dauwpunt",show_minmax:"Vandaag min / max",show_rain_today:"Regen totaal vandaag",show_beaufort:"Beaufortschaal",show_expand:"Uitklapbare details",show_wind_gust:"Windstoot",show_battery:"Batterij",show_pressure_trend:"Luchtdruktrend",show_interactions:"Interacties",manual_condition:"Handmatige conditie",pressure_trend_threshold:"Trenddrempel",automatic:"Automatisch",sunny:"Zonnig",cloudy:"Bewolkt",rainy:"Regenachtig",night:"Nacht",hint:"Tip: stel aparte tip-/houdacties in via YAML, bijv. temperature_action:, wind_action:. Secties worden verborgen als hun entiteit niet is geconfigureerd."}},es:{common:{card_title:"Estación meteorológica",card_name:"Tarjeta de estación meteorológica",card_description:"Una tarjeta moderna de estación meteorológica inspirada en Mushroom."},condition:{clear_sky:"Cielo despejado",cloudy:"Nublado",rain:"Lluvia",clear_night:"Noche despejada",partly_cloudy:"Parcialmente nublado"},comfort:{freezing:"Se siente gélido",cold:"Se siente frío",humid:"Se siente húmedo",hot:"Se siente caluroso",comfortable:"Se siente cómodo",mild:"Se siente templado"},dewpoint:"Punto de rocío {value} {unit}",sections:{light:"Luz",temperature:"Temp",humidity:"Humedad",rain:"Lluvia",wind:"Viento",uv:"Índice UV",pressure:"Presión",battery:"Batería",dewpoint:"Punto de rocío"},sun:{sunrise:"Amanecer",sunset:"Atardecer",azimuth:"Azimut",elevation:"Elevación"},rain:{detected:"Lluvia detectada",dry:"Seco",today:"Hoy"},wind:{gust:"Ráfaga {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Calma",light_air:"Ventolina",light_breeze:"Brisa ligera",gentle_breeze:"Brisa suave",moderate_breeze:"Brisa moderada",fresh_breeze:"Brisa fresca",strong_breeze:"Brisa fuerte",near_gale:"Viento fuerte",gale:"Temporal",strong_gale:"Temporal fuerte",storm:"Temporal duro",violent_storm:"Temporal muy duro",hurricane:"Huracán"},details:{more:"Más detalles",less:"Menos",min_today:"Mín hoy",max_today:"Máx hoy",rain_today:"Lluvia hoy",wind_gust:"Ráfaga de viento",beaufort:"Fuerza del viento"},lux:{dark:"Oscuro",low_light:"Poca luz",bright:"Luminoso",very_bright:"Muy luminoso"},uv:{low:"Bajo",moderate:"Moderado",high:"Alto",very_high:"Muy alto",extreme:"Extremo"},pressure:{rising:"Subiendo",falling:"Bajando",steady:"Estable"},compass:{N:"N",NE:"NE",E:"E",SE:"SE",S:"S",SW:"SO",W:"O",NW:"NO"},editor:{entities:"Entidades",settings:"Ajustes",title:"Título de la tarjeta",temperature_entity:"Temperatura",humidity_entity:"Humedad",lux_entity:"Luz / Lux",uv_entity:"Índice UV",rain_entity:"Lluvia",wind_speed_entity:"Velocidad del viento",wind_direction_entity:"Dirección del viento",wind_gust_entity:"Ráfaga de viento",pressure_entity:"Presión",battery_entity:"Batería",sun_entity:"Sol (amanecer / atardecer)",azimuth_entity:"Azimut (opcional)",elevation_entity:"Elevación (opcional)",temperature_min_entity:"Temperatura mín. hoy (opcional)",temperature_max_entity:"Temperatura máx. hoy (opcional)",rain_today_entity:"Lluvia total hoy (opcional)",show_daynight:"Modo día / noche",show_sun:"Diagrama de amanecer / atardecer",show_dewpoint:"Punto de rocío",show_minmax:"Mín / máx de hoy",show_rain_today:"Lluvia total hoy",show_beaufort:"Escala de Beaufort",show_expand:"Detalles desplegables",show_wind_gust:"Ráfaga de viento",show_battery:"Batería",show_pressure_trend:"Tendencia de presión",show_interactions:"Interacciones",manual_condition:"Condición manual",pressure_trend_threshold:"Umbral de tendencia",automatic:"Automático",sunny:"Soleado",cloudy:"Nublado",rainy:"Lluvioso",night:"Noche",hint:"Consejo: configura acciones de toque / mantener en YAML, p. ej. temperature_action:, wind_action:. Las secciones se ocultan automáticamente si no hay entidad configurada."}},de:{common:{card_title:"Wetterstation",card_name:"Wetterstationskarte",card_description:"Eine moderne, von Mushroom inspirierte Wetterstationskarte."},condition:{clear_sky:"Klarer Himmel",cloudy:"Bewölkt",rain:"Regen",clear_night:"Klare Nacht",partly_cloudy:"Teilweise bewölkt"},comfort:{freezing:"Fühlt sich eiskalt an",cold:"Fühlt sich kalt an",humid:"Fühlt sich schwül an",hot:"Fühlt sich heiß an",comfortable:"Fühlt sich angenehm an",mild:"Fühlt sich mild an"},dewpoint:"Taupunkt {value} {unit}",sections:{light:"Licht",temperature:"Temp",humidity:"Feuchte",rain:"Regen",wind:"Wind",uv:"UV-Index",pressure:"Luftdruck",battery:"Batterie",dewpoint:"Taupunkt"},sun:{sunrise:"Sonnenaufgang",sunset:"Sonnenuntergang",azimuth:"Azimut",elevation:"Höhe"},rain:{detected:"Regen erkannt",dry:"Trocken",today:"Heute"},wind:{gust:"Böe {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Windstille",light_air:"Leiser Zug",light_breeze:"Leichte Brise",gentle_breeze:"Schwache Brise",moderate_breeze:"Mäßige Brise",fresh_breeze:"Frische Brise",strong_breeze:"Starker Wind",near_gale:"Steifer Wind",gale:"Stürmischer Wind",strong_gale:"Sturm",storm:"Schwerer Sturm",violent_storm:"Orkanartiger Sturm",hurricane:"Orkan"},details:{more:"Mehr Details",less:"Weniger",min_today:"Min heute",max_today:"Max heute",rain_today:"Regen heute",wind_gust:"Windböe",beaufort:"Windstärke"},lux:{dark:"Dunkel",low_light:"Wenig Licht",bright:"Hell",very_bright:"Sehr hell"},uv:{low:"Niedrig",moderate:"Mäßig",high:"Hoch",very_high:"Sehr hoch",extreme:"Extrem"},pressure:{rising:"Steigend",falling:"Fallend",steady:"Stabil"},compass:{N:"N",NE:"NO",E:"O",SE:"SO",S:"S",SW:"SW",W:"W",NW:"NW"},editor:{entities:"Entitäten",settings:"Einstellungen",title:"Kartentitel",temperature_entity:"Temperatur",humidity_entity:"Luftfeuchtigkeit",lux_entity:"Licht / Lux",uv_entity:"UV-Index",rain_entity:"Regen",wind_speed_entity:"Windgeschwindigkeit",wind_direction_entity:"Windrichtung",wind_gust_entity:"Windböe",pressure_entity:"Luftdruck",battery_entity:"Batterie",sun_entity:"Sonne (Aufgang / Untergang)",azimuth_entity:"Azimut (optional)",elevation_entity:"Höhe (optional)",temperature_min_entity:"Min. Temperatur heute (optional)",temperature_max_entity:"Max. Temperatur heute (optional)",rain_today_entity:"Regenmenge heute (optional)",show_daynight:"Tag-/Nachtmodus",show_sun:"Sonnenauf-/untergang Diagramm",show_dewpoint:"Taupunkt",show_minmax:"Heute Min / Max",show_rain_today:"Regenmenge heute",show_beaufort:"Beaufort-Skala",show_expand:"Ausklappbare Details",show_wind_gust:"Windböe",show_battery:"Batterie",show_pressure_trend:"Luftdrucktrend",show_interactions:"Interaktionen",manual_condition:"Manueller Zustand",pressure_trend_threshold:"Trendschwelle",automatic:"Automatisch",sunny:"Sonnig",cloudy:"Bewölkt",rainy:"Regnerisch",night:"Nacht",hint:"Tipp: Tippen-/Halten-Aktionen in YAML setzen, z. B. temperature_action:, wind_action:. Abschnitte werden ausgeblendet, wenn keine Entität konfiguriert ist."}}};function Zt(t,e){return e.split(".").reduce((t,e)=>t&&null!=t[e]?t[e]:void 0,t)}function qt(t,e,i={}){const n=t&&(t.locale?.language||t.language||t.selectedLanguage)||"en",s=String(n).replace("_","-").split("-")[0].toLowerCase();let r=Zt(It[s],e)??Zt(It.en,e)??e;return"string"!=typeof r?e:(Object.keys(i).forEach(t=>{r=r.replace(`{${t}}`,String(i[t]))}),r)}class Gt extends lt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(t){this._config={...t,settings:{...bt,...t.settings||{}}}}_t(t,e){return qt(this.hass,t,e)}_schema(){const t=this._config?.settings?.show_pressure_trend,e=!1===this._config?.settings?.show_daynight;return[{name:"title",selector:{text:{}}},{type:"expandable",name:"",title:this._t("editor.entities"),icon:"mdi:format-list-bulleted",schema:[{name:"temperature_entity",selector:{entity:{}}},{name:"humidity_entity",selector:{entity:{}}},{name:"lux_entity",selector:{entity:{}}},{name:"uv_entity",selector:{entity:{}}},{name:"rain_entity",selector:{entity:{}}},{name:"",type:"grid",schema:[{name:"wind_speed_entity",selector:{entity:{}}},{name:"wind_direction_entity",selector:{entity:{}}},{name:"wind_gust_entity",selector:{entity:{}}}]},{name:"pressure_entity",selector:{entity:{}}},{name:"battery_entity",selector:{entity:{}}},{name:"sun_entity",selector:{entity:{domain:"sun"}}},{name:"",type:"grid",schema:[{name:"azimuth_entity",selector:{entity:{}}},{name:"elevation_entity",selector:{entity:{}}}]},{name:"",type:"grid",schema:[{name:"temperature_min_entity",selector:{entity:{}}},{name:"temperature_max_entity",selector:{entity:{}}}]},{name:"rain_today_entity",selector:{entity:{}}}]},{type:"expandable",name:"settings",title:this._t("editor.settings"),icon:"mdi:cog",schema:[{name:"",type:"grid",schema:[{name:"show_daynight",selector:{boolean:{}}},{name:"show_sun",selector:{boolean:{}}},{name:"show_dewpoint",selector:{boolean:{}}},{name:"show_minmax",selector:{boolean:{}}},{name:"show_rain_today",selector:{boolean:{}}},{name:"show_beaufort",selector:{boolean:{}}},{name:"show_expand",selector:{boolean:{}}},{name:"show_wind_gust",selector:{boolean:{}}},{name:"show_battery",selector:{boolean:{}}},{name:"show_pressure_trend",selector:{boolean:{}}},{name:"show_interactions",selector:{boolean:{}}}]},...e?[{name:"manual_condition",selector:{select:{mode:"dropdown",options:[{value:"",label:this._t("editor.automatic")},{value:"sunny",label:this._t("editor.sunny")},{value:"cloudy",label:this._t("editor.cloudy")},{value:"rainy",label:this._t("editor.rainy")},{value:"night",label:this._t("editor.night")}]}}}]:[],...t?[{name:"pressure_trend_threshold",selector:{number:{min:.1,max:10,step:.1,unit_of_measurement:"%",mode:"box"}}}]:[]]}]}_computeLabel=t=>t.name?this._t(`editor.${t.name}`)||t.title||t.name:t.title||"";_valueChanged(t){if(!this._config)return;const e=t.detail.value,i={...e,settings:{...bt,...e.settings||{}}};Object.keys(i).forEach(t=>{""===i[t]&&t.endsWith("_entity")&&delete i[t]}),mt(this,"config-changed",{config:i})}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="hint">${this._t("editor.hint")}</div>
    `:I}static get styles(){return r`
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
    `}}customElements.get(gt)||customElements.define(gt,Gt);class Yt extends lt{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_expanded:{state:!0}}}static async getConfigElement(){return document.createElement(gt)}static getStubConfig(){return{type:`custom:${yt}`,temperature_entity:"",humidity_entity:"",settings:{...bt}}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...t,settings:{...bt,...t.settings||{}}},this._pressureHistory=this._pressureHistory||[],this._tempStats=this._tempStats||null,void 0===this._expanded&&(this._expanded=!1)}getCardSize(){return 6}_t(t,e){return qt(this.hass,t,e)}_toggleExpanded(t){t.stopPropagation(),this._expanded=!this._expanded}_recordTemp(t){if(null==t)return;const e=(new Date).toDateString();this._tempStats&&this._tempStats.day===e?(this._tempStats.min=Math.min(this._tempStats.min,t),this._tempStats.max=Math.max(this._tempStats.max,t)):this._tempStats={day:e,min:t,max:t}}shouldUpdate(t){if(!this._config)return!1;if(t.has("_config"))return!0;if(!t.has("hass"))return!0;const e=t.get("hass");if(!e)return!0;return(this.hass?.locale?.language||this.hass?.language||this.hass?.selectedLanguage)!==(e.locale?.language||e.language||e.selectedLanguage)||ft.some(({key:t})=>{const i=this._config[t];return!!i&&e.states[i]!==this.hass.states[i]})}_stateObj(t){const e=this._config[t];if(e&&this.hass)return this.hass.states[e]}_isDay(){if(!(this._config.settings||{}).show_daynight)return!0;const t=this._stateObj("sun_entity");if(t)return"above_horizon"===t.state;const e=$t(this._stateObj("lux_entity"));return null==e||e>50}_recordPressure(t){if(null==t)return;const e=Date.now();this._pressureHistory.push({t:e,v:t});const i=e-108e5;this._pressureHistory=this._pressureHistory.filter(t=>t.t>=i)}_pressureTrend(t){const e=Number(this._config.settings.pressure_trend_threshold)||1;if(this._pressureHistory.length<2||null==t)return{icon:"mdi:trending-neutral",labelKey:"steady"};const i=this._pressureHistory[0].v,n=(t-i)/i*100;return n>=e?{icon:"mdi:arrow-up",labelKey:"rising"}:n<=-e?{icon:"mdi:arrow-down",labelKey:"falling"}:{icon:"mdi:trending-neutral",labelKey:"steady"}}_actionConfig(t){if(!(this._config.settings||{}).show_interactions)return;const e=this._config[t],i=this._config[`${t.replace("_entity","")}_action`];return{entity:e,tap_action:i?.tap_action||{action:"more-info"},hold_action:i?.hold_action,double_tap_action:i?.double_tap_action}}_handleClick(t){const e=this._actionConfig(t);e&&e.entity&&function(t,e,i){var n;i.tap_action&&(n=i.tap_action),pt(t,e,i,n)}(this,this.hass,e)}_clickable(t){const e=this._actionConfig(t);return!(!e||!e.entity||!function(t){return void 0!==t&&"none"!==t.action}(e.tap_action)&&!e.tap_action)}render(){if(!this._config||!this.hass)return I;const t=this._config.settings||{},e=$t(this._stateObj("temperature_entity")),i=$t(this._stateObj("humidity_entity")),n=Ct(this._stateObj("temperature_entity"),"°C");this._recordTemp(e);const s=this._isDay(),r=this._stateObj("rain_entity"),a=!!r&&function(t){if(!t)return!1;const e=String(t.state).toLowerCase();if(["on","true","wet","raining","detected"].includes(e))return!0;const i=Number(t.state);return Number.isFinite(i)&&i>0}(r),o=$t(r),l=$t(this._stateObj("lux_entity")),d=$t(this._stateObj("uv_entity"));let c;if(!t.show_daynight&&this._config.settings.manual_condition){c={sunny:{icon:"mdi:weather-sunny",labelKey:"clear_sky"},cloudy:{icon:"mdi:weather-cloudy",labelKey:"cloudy"},rainy:{icon:"mdi:weather-rainy",labelKey:"rain"},night:{icon:"mdi:weather-night",labelKey:"clear_night"}}[this._config.settings.manual_condition]||zt({isDay:s,rainMm:o,rainOn:a,lux:l,uv:d})}else c=zt({isDay:s,rainMm:o,rainOn:a,lux:l,uv:d});const h=""===this._config.title?"":this._config.title&&"Weather Station"!==this._config.title?this._config.title:this._t("common.card_title");return K`
      <ha-card>
        <div class="wsc">
          ${h?K`<div class="title">${h}</div>`:I}

          ${this._renderHero(c,e,n,i)}
          ${this._renderSun()}

          <div class="grid">
            ${this._renderLux(l)}
            ${this._renderTemperature(e,n)}
            ${this._renderHumidity(i)}
            ${this._renderRain(r,a,o)}
            ${this._renderWind()}
            ${this._renderUv(d)}
            ${this._renderPressure()}
            ${this._renderBattery()}
          </div>

          ${this._renderExpand(e,n,i)}
        </div>
      </ha-card>
    `}_renderSun(){if(!(this._config.settings||{}).show_sun)return I;const t=this._stateObj("sun_entity"),e=this._stateObj("azimuth_entity"),i=this._stateObj("elevation_entity"),n=this._stateObj("uv_entity");if(!t&&!e&&!i)return I;const s=t&&t.attributes||{},r=!t||"above_horizon"===t.state,a=$t(i)??Number(s.elevation),o=$t(e)??Number(s.azimuth),l=$t(n),d=Nt(this.hass,s.next_rising),c=Nt(this.hass,s.next_setting),h=function(t,e,i){let n=Number(t);const s=Number.isFinite(n);s&&(n=(n%360+360)%360);const r=Number(e),a=Number.isFinite(r),o=!s||n<=180;if(a?r<0:!i){const t=60+18*(a?Math.min(1,-r/12):.4),e=o?Wt:Ht,{p:i,u:n}=Kt(e,t),s=Dt(o?0:3,n);return{x:i.x,y:i.y,t:o?0:1,g:s,night:!0}}const l=60-48*(a?Math.max(0,Math.min(1,r/90)):.5),d=o?Tt.left:Tt.right,{p:c,u:h}=Kt(d,l),u=o?.5*h:.5+.5*h,m=Dt(o?1:2,h);return{x:c.x,y:c.y,t:u,g:m,night:!1}}(o,a,r),u=h.night,m=function(t=4.6){Bt();const e=[],i=Math.max(12,Math.round(Ut/t)),n=Ut/i;for(let t=0;t<=i;t++){const i=t*n;let s=0;for(;s<Lt.length-1&&i>Rt[s]+Pt[s];)s++;const r=Math.min(1,(i-Rt[s])/Pt[s]),[a,o,l,d]=Lt[s],c=Ot(a,o,l,d,r);e.push({x:c.x,y:c.y,above:c.y<=60.001,g:i/Ut})}return e}(),_=h.x/200*100+"%",p=(h.y-0)/84*100+"%",y=Number.isFinite(a)?`${Mt(a,1)}°`:"—",g=Number.isFinite(o)?`${Mt(o,0)}°`:"—",f=t?"sun_entity":e?"azimuth_entity":"elevation_entity";return K`
      <div
        class="sun-panel ${this._clickable(f)?"tappable":""}"
        @click=${()=>this._handleClick(f)}
      >
        <div class="sun-scene ${u?"night":"day"}">
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
            ${m.map(t=>{const e=t.g<=h.g,i=`dot ${t.above?"day":"night"} ${e?"past":"future"}`,n=t.above?e?1.6:1.3:e?1.5:1.2;return V`<circle class=${i} cx=${t.x} cy=${t.y} r=${n} />`})}
          </svg>

          <ha-icon
            class="sun-marker ${u?"night":"day"}"
            style="left:${_};top:${p}"
            .icon=${u?"mdi:weather-night":"mdi:white-balance-sunny"}
          ></ha-icon>

          <div class="sun-center">
            <div class="sun-stat">
              <div class="sun-stat-value">${y}</div>
              <div class="sun-stat-label">${this._t("sun.elevation")}</div>
            </div>
            <div class="sun-stat">
              <div class="sun-stat-value">${g}</div>
              <div class="sun-stat-label">${this._t("sun.azimuth")}</div>
            </div>
            ${null!=l?K`
                  <div class="sun-stat">
                    <div class="sun-stat-value">${Mt(l,0)}</div>
                    <div class="sun-stat-label">${this._t("sections.uv")}</div>
                  </div>
                `:I}
          </div>

          ${t?K`
                <div class="sun-edge" style="left:${"20%"}">
                  ${d||"—"}
                </div>
                <div class="sun-edge" style="left:${"80%"}">
                  ${c||"—"}
                </div>
              `:I}
        </div>
      </div>
    `}_todayMinMax(){const t=$t(this._stateObj("temperature_min_entity")),e=$t(this._stateObj("temperature_max_entity")),i=null!=t?t:this._tempStats?this._tempStats.min:null,n=null!=e?e:this._tempStats?this._tempStats.max:null;return null==i||null==n?null:{min:i,max:n}}_renderHero(t,e,i,n){const s=this._config.settings||{},r=s.show_dewpoint?kt(e,n):null,a=function(t,e){return null==t?null:t<0?"freezing":t<10?"cold":t>27&&null!=e&&e>60?"humid":t>30?"hot":t>=18&&t<=26?"comfortable":"mild"}(e,n),o=s.show_minmax?this._todayMinMax():null,l=this._stateObj("wind_speed_entity"),d=$t(this._stateObj("wind_direction_entity")),c=$t(l),h=Ct(l,"m/s"),u=St(d),m=u?this._t(`compass.${u}`):null,_=l||null!=d;return K`
      <div
        class="hero ${_?"has-wind":""} ${this._clickable("temperature_entity")?"tappable":""}"
        @click=${()=>this._handleClick("temperature_entity")}
      >
        <ha-icon class="hero-icon" .icon=${t.icon}></ha-icon>
        <div class="hero-main">
          <div class="hero-condition">
            ${this._t(`condition.${t.labelKey}`)}
          </div>
          <div class="hero-temp">
            ${null!=e?`${Mt(e,1)} ${i}`:"—"}
          </div>
          ${o?K`<div class="hero-minmax">
                <span class="mm mm-min">
                  <ha-icon .icon=${"mdi:arrow-down-thin"}></ha-icon>
                  ${Mt(o.min,1)}°
                </span>
                <span class="mm mm-max">
                  <ha-icon .icon=${"mdi:arrow-up-thin"}></ha-icon>
                  ${Mt(o.max,1)}°
                </span>
              </div>`:I}
        </div>
        ${_?K`
              <div
                class="hero-wind ${this._clickable("wind_speed_entity")?"tappable":""}"
                @click=${t=>{t.stopPropagation(),this._handleClick("wind_speed_entity")}}
              >
                ${null!=d?this._renderCompass(d,m):I}
                ${null!=c?K`<div class="hero-wind-speed">
                      ${Mt(c,1)} ${h}
                    </div>`:I}
              </div>
            `:I}
        ${null!=e?K`<div class="hero-sub">
              ${a?K`<span>${this._t(`comfort.${a}`)}</span>`:I}
              ${null!=r?K`<span class="muted"
                    >${this._t("dewpoint",{value:r,unit:i})}</span
                  >`:I}
            </div>`:I}
      </div>
    `}_tile({icon:t,label:e,value:i,sub:n,key:s,accent:r}){const a=!!s&&this._clickable(s);return K`
      <div
        class="tile ${a?"tappable":""}"
        @click=${s?()=>this._handleClick(s):void 0}
      >
        <ha-icon
          class="tile-icon"
          style=${r?`--tile-accent:${r}`:""}
          .icon=${t}
        ></ha-icon>
        <div class="tile-body">
          <div class="tile-label">${e}</div>
          <div class="tile-value">${i}</div>
          ${n?K`<div class="tile-sub">${n}</div>`:I}
        </div>
      </div>
    `}_renderLux(t){if(!this._stateObj("lux_entity"))return I;const e=function(t){return null==t?null:xt.find(e=>t<e.max)||xt[xt.length-1]}(t);return this._tile({icon:e?e.icon:"mdi:brightness-7",label:this._t("sections.light"),value:At(t),sub:e?this._t(`lux.${e.labelKey}`):"",key:"lux_entity"})}_renderTemperature(t,e){return this._stateObj("temperature_entity")?this._tile({icon:"mdi:thermometer",label:this._t("sections.temperature"),value:null!=t?`${Mt(t,1)} ${e}`:"—",key:"temperature_entity"}):I}_renderHumidity(t){return this._stateObj("humidity_entity")?this._tile({icon:"mdi:water-percent",label:this._t("sections.humidity"),value:null!=t?`${Mt(t,0)}%`:"—",key:"humidity_entity"}):I}_renderRain(t,e,i){const n=this._config.settings||{},s=this._stateObj("rain_today_entity"),r=n.show_rain_today?$t(s):null;if(!t&&null==r)return I;const a=Ct(t,"mm/h"),o=Ct(s,"mm"),l=null!=i?`${Mt(i,1)} ${a}`:"",d=null!=r?`${this._t("rain.today")} ${Mt(r,1)} ${o}`:"";let c;return c=t&&d?K`<span>${l||this._t("rain.today")}</span
        ><span class="dot">·</span><span>${d}</span>`:t?l:d,this._tile({icon:e?"mdi:weather-rainy":"mdi:weather-partly-rainy",label:this._t("sections.rain"),value:t?e?this._t("rain.detected"):this._t("rain.dry"):null!=r?`${Mt(r,1)} ${o}`:"—",sub:t?c:d&&null!=r?this._t("rain.today"):c,key:t?"rain_entity":"rain_today_entity",accent:e?"var(--info-color, #2196f3)":void 0})}_renderWind(){const t=this._stateObj("wind_speed_entity");if(!t)return I;const e=this._config.settings||{},i=$t(t),n=Ct(t,"m/s"),s=St($t(this._stateObj("wind_direction_entity"))),r=s?this._t(`compass.${s}`):null,a=this._stateObj("wind_gust_entity"),o=$t(a),l=Ct(a,n),d=e.show_beaufort?Ft(Vt(i,n)):null;return K`
      <div
        class="tile wind ${this._clickable("wind_speed_entity")?"tappable":""}"
        @click=${()=>this._handleClick("wind_speed_entity")}
      >
        <ha-icon class="tile-icon" .icon=${"mdi:weather-windy"}></ha-icon>
        <div class="tile-body">
          <div class="tile-label">${this._t("sections.wind")}</div>
          <div class="tile-value">
            ${null!=i?`${Mt(i,1)} ${n}`:"—"}
          </div>
          ${r?K`<div class="tile-sub">${r}</div>`:I}
          ${d?K`<div class="tile-sub">
                ${this._t("wind.beaufort",{value:d.n})}
                <span class="dot">·</span> ${this._t(`beaufort.${d.key}`)}
              </div>`:I}
          ${e.show_wind_gust&&null!=o?K`<div class="tile-sub">
                <ha-icon class="mini-icon" .icon=${"mdi:weather-windy-variant"}></ha-icon>
                ${this._t("wind.gust",{value:Mt(o,0),unit:l})}
              </div>`:I}
        </div>
      </div>
    `}_renderCompass(t,e){return K`
      <div class="compass" title="${e||""} (${Mt(t,0)}°)">
        <span class="c-n">${this._t("compass.N")}</span>
        <span class="c-e">${this._t("compass.E")}</span>
        <span class="c-s">${this._t("compass.S")}</span>
        <span class="c-w">${this._t("compass.W")}</span>
        <div class="needle" style="transform: rotate(${t}deg)">
          <ha-icon .icon=${"mdi:navigation"}></ha-icon>
        </div>
      </div>
    `}_renderUv(t){if(!this._stateObj("uv_entity"))return I;const e=function(t){return null==t?null:wt.find(e=>t<=e.max)||wt[wt.length-1]}(t);return this._tile({icon:"mdi:sun-wireless",label:this._t("sections.uv"),value:null!=t?`${Mt(t,0)}`:"—",sub:e?this._t(`uv.${e.labelKey}`):"",key:"uv_entity",accent:e?e.color:void 0})}_renderPressure(){const t=this._stateObj("pressure_entity");if(!t)return I;const e=this._config.settings||{},i=$t(t),n=Ct(t,"hPa");this._recordPressure(i);const s=e.show_pressure_trend?this._pressureTrend(i):null;return this._tile({icon:"mdi:gauge",label:this._t("sections.pressure"),value:null!=i?`${Mt(i,0)} ${n}`:"—",sub:s?K`<ha-icon class="mini-icon" .icon=${s.icon}></ha-icon>
            ${this._t(`pressure.${s.labelKey}`)}`:"",key:"pressure_entity"})}_renderBattery(){if(!(this._config.settings||{}).show_battery)return I;const t=this._stateObj("battery_entity");if(!t)return I;const e=$t(t);let i;return null!=e&&e<15?i="var(--error-color, #e53935)":null!=e&&e<40&&(i="var(--warning-color, #ffa726)"),this._tile({icon:Et(e),label:this._t("sections.battery"),value:null!=e?`${Mt(e,0)}%`:"—",key:"battery_entity",accent:i})}_renderExpand(t,e,i){if(!(this._config.settings||{}).show_expand)return I;const n=[],s=kt(t,i);null!=s&&n.push({label:this._t("sections.dewpoint"),value:`${Mt(s,1)} ${e}`});const r=this._todayMinMax();r&&(n.push({label:this._t("details.min_today"),value:`${Mt(r.min,1)} ${e}`}),n.push({label:this._t("details.max_today"),value:`${Mt(r.max,1)} ${e}`}));const a=this._stateObj("rain_today_entity"),o=$t(a);null!=o&&n.push({label:this._t("details.rain_today"),value:`${Mt(o,1)} ${Ct(a,"mm")}`});const l=this._stateObj("wind_speed_entity"),d=Ft(Vt($t(l),Ct(l,"m/s")));d&&n.push({label:this._t("details.beaufort"),value:`${this._t("wind.beaufort",{value:d.n})} · ${this._t(`beaufort.${d.key}`)}`});const c=this._stateObj("wind_gust_entity"),h=$t(c);null!=h&&n.push({label:this._t("details.wind_gust"),value:`${Mt(h,0)} ${Ct(c,"m/s")}`});const u=this._stateObj("sun_entity");if(u){const t=Nt(this.hass,u.attributes?.next_rising),e=Nt(this.hass,u.attributes?.next_setting);t&&n.push({label:this._t("sun.sunrise"),value:t}),e&&n.push({label:this._t("sun.sunset"),value:e})}return n.length?K`
      <button class="details-toggle" @click=${this._toggleExpanded}>
        <span>${this._t(this._expanded?"details.less":"details.more")}</span>
        <ha-icon
          .icon=${this._expanded?"mdi:chevron-up":"mdi:chevron-down"}
        ></ha-icon>
      </button>
      ${this._expanded?K`<div class="details">
            ${n.map(t=>K`<div class="detail">
                <span class="detail-label">${t.label}</span>
                <span class="detail-value">${t.value}</span>
              </div>`)}
          </div>`:I}
    `:I}static get styles(){return r`
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
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-width: 0;
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
        gap: 4px;
        padding: 2px 0 2px 4px;
        border-radius: 12px;
        align-self: stretch;
      }
      .hero-wind .compass {
        width: 58px;
        height: 58px;
      }
      .hero-wind .compass .c-n { top: 9px; }
      .hero-wind .compass .c-s { top: 49px; }
      .hero-wind .compass .c-e { left: 49px; }
      .hero-wind .compass .c-w { left: 9px; }
      .hero-wind .compass .needle ha-icon {
        --mdc-icon-size: 24px;
      }
      .hero-wind-speed {
        font-size: 0.9rem;
        font-weight: 600;
        line-height: 1.1;
        color: var(--primary-text-color);
        white-space: nowrap;
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
      .sun-scene {
        position: relative;
        width: 100%;
        max-width: 460px;
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

      .details-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: 100%;
        padding: 6px;
        border: none;
        background: none;
        cursor: pointer;
        font: inherit;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--secondary-text-color);
        border-radius: 10px;
      }
      .details-toggle:hover {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        color: var(--primary-text-color);
      }
      .details-toggle ha-icon {
        --mdc-icon-size: 18px;
      }
      .details {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 6px 16px;
        padding: 4px 6px 6px;
      }
      @container wsc (max-width: 320px) {
        .details {
          grid-template-columns: 1fr;
        }
      }
      .detail {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 0.85rem;
        padding: 3px 0;
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.06));
      }
      .detail-label {
        color: var(--secondary-text-color);
      }
      .detail-value {
        color: var(--primary-text-color);
        font-weight: 500;
        text-align: right;
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
      }

      .tile {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        border-radius: var(--wsc-radius);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
        min-height: 56px;
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
    `}}customElements.get(yt)||customElements.define(yt,Yt),window.customCards=window.customCards||[],window.customCards.find(t=>t.type===yt)||window.customCards.push({type:yt,name:"Weather Station Card",description:"A modern, Mushroom-inspired weather station card.",preview:!0,documentationURL:"https://github.com/H3ss3ltje/lovelace-weather-station-card"}),console.info("%c WEATHER-STATION-CARD %c v1.4.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{Yt as WeatherStationCard};
