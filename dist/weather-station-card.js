const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let s=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=n.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&n.set(i,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new s(n,e,i)},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:h}=Object,p=globalThis,_=p.trustedTypes,m=_?_.emptyScript:"",y=p.reactiveElementPolyfillSupport,g=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},x=(e,t)=>!a(e,t),w={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&l(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:s}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const r=n?.call(this);s?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const e=this.properties,t=[...d(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(t)i.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of n){const n=document.createElement("style"),s=e.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=n;const r=s.fromAttribute(t,e.type);this[n]=r??this._$Ej?.get(n)??r,this._$Em=null}}requestUpdate(e,t,i,n=!1,s){if(void 0!==e){const r=this.constructor;if(!1===n&&(s=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??x)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[g("elementProperties")]=new Map,v[g("finalized")]=new Map,y?.({ReactiveElement:v}),(p.reactiveElementVersions??=[]).push("2.1.2");const b=globalThis,$=e=>e,k=b.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,F="?"+E,C=`<${F}>`,M=document,z=()=>M.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,O="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,B=/>/g,L=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),P=/'/g,D=/"/g,W=/^(?:script|style|textarea|title)$/i,R=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),G=R(1),K=R(2),U=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),I=new WeakMap,Z=M.createTreeWalker(M,129);function q(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,n=[];let s,r=2===t?"<svg>":3===t?"<math>":"",o=H;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===H?"!--"===l[1]?o=j:void 0!==l[1]?o=B:void 0!==l[2]?(W.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=L):void 0!==l[3]&&(o=L):o===L?">"===l[0]?(o=s??H,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?L:'"'===l[3]?D:P):o===D||o===P?o=L:o===j||o===B?o=H:(o=L,s=void 0);const u=o===L&&e[t+1].startsWith("/>")?" ":"";r+=o===H?i+C:c>=0?(n.push(a),i.slice(0,c)+A+i.slice(c)+E+u):i+E+(-2===c?t:u)}return[q(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class Q{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,r=0;const o=e.length-1,a=this.parts,[l,c]=J(e,t);if(this.el=Q.createElement(l,i),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=Z.nextNode())&&a.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(A)){const t=c[r++],i=n.getAttribute(e).split(E),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?ie:"?"===o[1]?ne:"@"===o[1]?se:te}),n.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:s}),n.removeAttribute(e));if(W.test(n.tagName)){const e=n.textContent.split(E),t=e.length-1;if(t>0){n.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],z()),Z.nextNode(),a.push({type:2,index:++s});n.append(e[t],z())}}}else if(8===n.nodeType)if(n.data===F)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=n.data.indexOf(E,e+1));)a.push({type:7,index:s}),e+=E.length-1}s++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,n){if(t===U)return t;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const r=N(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(t=X(e,s._$AS(e,t.values),s,n)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??M).importNode(t,!0);Z.currentNode=n;let s=Z.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new ee(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new re(s,this,e)),this._$AV.push(t),a=i[++o]}r!==a?.index&&(s=Z.nextNode(),r++)}return Z.currentNode=M,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),N(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==U&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new Y(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=I.get(e.strings);return void 0===t&&I.set(e.strings,t=new Q(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const s of e)n===t.length?t.push(i=new ee(this.O(z()),this.O(z()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,s){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,n){const s=this.strings;let r=!1;if(void 0===s)e=X(this,e,t,0),r=!N(e)||e!==this._$AH&&e!==U,r&&(this._$AH=e);else{const n=e;let o,a;for(e=s[0],o=0;o<s.length-1;o++)a=X(this,n[i+o],t,o),a===U&&(a=this._$AH[o]),r||=!N(a)||a!==this._$AH[o],a===V?e=V:e!==V&&(e+=(a??"")+s[o+1]),this._$AH[o]=a}r&&!n&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class ne extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class se extends te{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??V)===U)return;const i=this._$AH,n=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==V&&(i===V||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}let re=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}};const oe=b.litHtmlPolyfillSupport;oe?.(Q,ee),(b.litHtmlVersions??=[]).push("3.3.3");const ae=globalThis;class le extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let s=n._$litPart$;if(void 0===s){const e=i?.renderBefore??null;n._$litPart$=s=new ee(t.insertBefore(z(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}}le._$litElement$=!0,le.finalized=!0,ae.litElementHydrateSupport?.({LitElement:le});const ce=ae.litElementPolyfillSupport;var de,ue;ce?.({LitElement:le}),(ae.litElementVersions??=[]).push("4.2.2"),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(de||(de={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ue||(ue={}));var he=["closed","locked","off"],pe=function(e,t,i,n){n=n||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return s.detail=i,e.dispatchEvent(s),s},_e=function(e){pe(window,"haptic",e)},me=function(e,t,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(_e("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&pe(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),pe(window,"location-changed",{replace:i})}(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(function(e,t){(function(e,t,i){void 0===i&&(i=!0);var n,s=function(e){return e.substr(0,e.indexOf("."))}(t),r="group"===s?"homeassistant":s;switch(s){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}e.callService(r,n,{entity_id:t})})(e,t,he.includes(e.states[t].state))}(t,i.entity),_e("success"));break;case"call-service":if(!n.service)return void _e("failure");var s=n.service.split(".",2);t.callService(s[0],s[1],n.service_data,n.target),_e("success");break;case"fire-dom-event":pe(e,"ll-custom",n)}};const ye="weather-station-card",ge="weather-station-card-editor",fe="weather-station-compass-card",xe=[{key:"temperature_entity",icon:"mdi:thermometer"},{key:"humidity_entity",icon:"mdi:water-percent"},{key:"lux_entity",icon:"mdi:brightness-7"},{key:"uv_entity",icon:"mdi:sun-wireless"},{key:"rain_entity",icon:"mdi:weather-rainy"},{key:"rain_rate_entity",icon:"mdi:weather-pouring"},{key:"precipitation_entity",icon:"mdi:cup-water"},{key:"wind_speed_entity",icon:"mdi:weather-windy"},{key:"wind_direction_entity",icon:"mdi:compass"},{key:"wind_gust_entity",icon:"mdi:weather-windy-variant"},{key:"pressure_entity",icon:"mdi:gauge"},{key:"pressure_trend_entity",icon:"mdi:trending-up"},{key:"battery_entity",icon:"mdi:battery-high"},{key:"voltage_entity",icon:"mdi:flash"},{key:"capacitor_voltage_entity",icon:"mdi:sine-wave"},{key:"dewpoint_entity",icon:"mdi:water-thermometer"},{key:"apparent_temperature_entity",icon:"mdi:thermometer-lines"},{key:"wind_chill_entity",icon:"mdi:snowflake-thermometer"},{key:"humidex_entity",icon:"mdi:sun-thermometer"},{key:"heat_stress_entity",icon:"mdi:heat-wave"},{key:"condition_entity",icon:"mdi:weather-partly-cloudy"},{key:"sun_entity",icon:"mdi:weather-sunny"},{key:"azimuth_entity",icon:"mdi:compass-outline"},{key:"elevation_entity",icon:"mdi:angle-acute"},{key:"temperature_min_entity",icon:"mdi:thermometer-low"},{key:"temperature_max_entity",icon:"mdi:thermometer-high"},{key:"rain_today_entity",icon:"mdi:weather-pouring"}],we=["lux","temperature","feels_like","humidity","dewpoint","rain","wind","uv","pressure","heat_stress","battery"],ve={hide_title:!1,show_dewpoint:!0,show_pressure_trend:!0,show_battery:!0,show_voltage:!0,show_wind_gust:!0,show_interactions:!0,show_daynight:!0,show_sun:!0,show_minmax:!0,show_rain_today:!0,show_rain_hero:!0,show_beaufort:!0,show_feels_like:!0,show_heat_stress:!0,invert_wind_direction:!1,compact_mode:!1,compass_only:!1,night_palette:!0,lux_in_klux:!1,lux_scale:1,animate_icons:!0,lux_cloudy_max_klux:5,lux_partly_cloudy_max_klux:20,lux_sunny_max_klux:150,tile_order:[...we],pressure_trend_threshold:.3,manual_condition:""},be=["N","NE","E","SE","S","SW","W","NW"],$e=[{max:2,labelKey:"low",color:"#4caf50"},{max:5,labelKey:"moderate",color:"#ffb300"},{max:7,labelKey:"high",color:"#fb8c00"},{max:10,labelKey:"very_high",color:"#e53935"},{max:1/0,labelKey:"extreme",color:"#8e24aa"}],ke=[{max:100,labelKey:"dark",icon:"lux_dark"},{max:2e3,labelKey:"low_light",icon:"lux_low"},{max:2e4,labelKey:"bright",icon:"lux_bright"},{max:8e4,labelKey:"very_bright",icon:"lux_very_bright"},{max:1/0,labelKey:"full_sun",icon:"lux_full_sun"}];function Se(e){if(!e)return null;const t=Number(e.state);return Number.isFinite(t)?t:null}function Ae(e,t=.3){if(null==e||!Number.isFinite(e))return null;const i=Number(t)||.3;return e>=i?{icon:"trend_up",labelKey:"rising"}:e<=-i?{icon:"trend_down",labelKey:"falling"}:{icon:"trend_steady",labelKey:"steady"}}function Ee(e,t=!1){if(null==e||!Number.isFinite(Number(e)))return null;let i=Number(e);return t&&(i+=180),i=(i%360+360)%360,i}function Fe(e){if(null==e)return null;const t=Math.round(e%360/45)%8;return be[t]}function Ce(e,t={}){if(null==e||!Number.isFinite(Number(e)))return null;const i=Number(e),n=t.lux_in_klux?1e3*i:i,s=Number(t.lux_scale);return Number.isFinite(s)&&s>0?n*s:n}function Me(e){if(null==e)return"—";if(e>=1e3){const t=e/1e3;return t>=100?`${Math.round(t)} klux`:Math.round(10*t)/10+" klux"}return`${Math.round(e)} lux`}function ze(e){return null==e?"battery_unknown":e>=95?"battery":e>=70?"battery_high":e>=40?"battery_medium":e>=15?"battery_low":"battery_outline"}function Ne(e,t){const i=Number(e);return!Number.isFinite(i)||i<0?t:1e3*i}function Te(e,t){if(null==e||!Number.isFinite(Number(e)))return null;const i=Number(e);return String(t||"").toLowerCase().includes("f")?5*(i-32)/9:i}function Oe(e){return null!=e&&Number.isFinite(e)?e>=3?{icon:"rainy",labelKey:"rain"}:e>=0?{icon:"snowy",labelKey:"sleet"}:{icon:"snowy",labelKey:"snow"}:null}function He({isDay:e,rainMm:t,rainOn:i,lux:n,uv:s,settings:r={},tempC:o=null}){if(i||null!=t&&t>0){const e=Oe(o);return e||{icon:"rainy",labelKey:"rain"}}if(!e)return{icon:"night",labelKey:"clear_night"};const a=function(e={}){let t=Ne(e.lux_cloudy_max_klux,5e3),i=Ne(e.lux_partly_cloudy_max_klux,2e4),n=Ne(e.lux_sunny_max_klux,15e4);return i<=t&&(i=t+1e3),n<=i&&(n=i+1e3),{cloudy:t,partly:i,sunny:n}}(r);return null!=n&&Number.isFinite(n)?n<a.cloudy?{icon:"cloudy",labelKey:"cloudy"}:n<a.partly?{icon:"partly_cloudy",labelKey:"partly_cloudy"}:(a.sunny,{icon:"sunny",labelKey:"clear_sky"}):null!=s&&s>=3?{icon:"sunny",labelKey:"clear_sky"}:{icon:"partly_cloudy",labelKey:"partly_cloudy"}}function je(e,t=1){if(null==e||""===e)return null;const i=Number(e);if(!Number.isFinite(i))return null;const n=Math.pow(10,t);return Math.round(i*n)/n}function Be(e,t=""){return e&&e.attributes&&e.attributes.unit_of_measurement||t}function Le(e,t){if(!t)return null;const i=new Date(t);if(Number.isNaN(i.getTime()))return null;const n=e?.locale?.language||e?.language||e?.selectedLanguage||void 0;return i.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit"})}function Pe(e,t,i,n,s){const r=1-s,o=s*s,a=r*r;return{x:a*r*e.x+3*a*s*t.x+3*r*o*i.x+o*s*n.x,y:a*r*e.y+3*a*s*t.y+3*r*o*i.y+o*s*n.y}}const De={left:[{x:30,y:60},{x:44,y:49},{x:70,y:12},{x:100,y:12}],right:[{x:100,y:12},{x:130,y:12},{x:156,y:49},{x:170,y:60}]},We=[{x:3,y:78},{x:14,y:78},{x:24,y:66},{x:30,y:60}],Re=[{x:170,y:60},{x:176,y:66},{x:186,y:78},{x:197,y:78}],Ge=60,Ke=864e5,Ue=[We,De.left,De.right,Re];function Ve([e,t,i,n]){let s=0,r=Pe(e,t,i,n,0);for(let o=1;o<=24;o++){const a=Pe(e,t,i,n,o/24);s+=Math.hypot(a.x-r.x,a.y-r.y),r=a}return s}let Ie=null,Ze=null,qe=0;function Je(){if(Ie)return;Ie=Ue.map(Ve),qe=Ie.reduce((e,t)=>e+t,0),Ze=[];let e=0;for(const t of Ie)Ze.push(e),e+=t}function Qe(e,t){return Je(),(Ze[e]+t*Ie[e])/qe}function Xe([e,t,i,n],s){let r=Pe(e,t,i,n,0),o=0,a=1/0;for(let l=0;l<=120;l++){const c=l/120,d=Pe(e,t,i,n,c),u=Math.abs(d.y-s);u<a&&(a=u,r=d,o=c)}return{p:r,u:o}}function Ye(e){const t=Math.max(0,Math.min(1,e));if(t<=.5){const e=t/.5,i=Pe(De.left[0],De.left[1],De.left[2],De.left[3],e);return{x:i.x,y:i.y,t:t,g:Qe(1,e)}}const i=(t-.5)/.5,n=Pe(De.right[0],De.right[1],De.right[2],De.right[3],i);return{x:n.x,y:n.y,t:t,g:Qe(2,i)}}function et(e){const t=(e%360+360)%360;if(t>=90&&t<=270)return(t-90)/180;const i=(90-t+360)%360;return i<=180?i/180:t<90?0:1}function tt(e,t,i,n={}){let s=Number(e);const r=Number.isFinite(s);r&&(s=(s%360+360)%360);const o=Number(t),a=Number.isFinite(o),l=a?o<0:!i,c=Number.isFinite(n.nowMs)?n.nowMs:Date.now(),d=function(e={},t,i){const n=Date.parse(e.next_rising),s=Date.parse(e.next_setting);return Number.isFinite(n)&&Number.isFinite(s)?i?{sunriseMs:n-Ke,sunsetMs:s}:{sunriseMs:n,sunsetMs:s-Ke}:null}(n.sunAttrs||{},0,i&&!l);if(d&&Number.isFinite(d.sunriseMs)&&Number.isFinite(d.sunsetMs)){const{sunriseMs:e,sunsetMs:t}=d;if(t<e&&c>t&&c<e){const i=(t+e)/2;if(c<=i){const e=Math.max(1,i-t),n=Math.max(0,Math.min(1,(c-t)/e)),s=Pe(Re[0],Re[1],Re[2],Re[3],n);return{x:s.x,y:s.y,t:1,g:Qe(3,n),night:!0}}const n=Math.max(1,e-i),s=Math.max(0,Math.min(1,1-(e-c)/n)),r=Pe(We[0],We[1],We[2],We[3],s);return{x:r.x,y:r.y,t:0,g:Qe(0,s),night:!0}}if(e<t){if(c<e){const t=432e5,i=Math.max(0,Math.min(1,1-(e-c)/t)),n=Pe(We[0],We[1],We[2],We[3],i);return{x:n.x,y:n.y,t:0,g:Qe(0,i),night:!0}}if(c>t){const e=432e5,i=Math.max(0,Math.min(1,(c-t)/e)),n=Pe(Re[0],Re[1],Re[2],Re[3],i);return{x:n.x,y:n.y,t:1,g:Qe(3,i),night:!0}}const i=Ye((c-e)/(t-e));return{x:i.x,y:i.y,t:i.t,g:i.g,night:!1}}}if(r){if(l){const e=et(s)<.5,t=a?Math.min(1,-o/12):.4,i=Ge+18*t,n=e?We:Re,{p:r,u:l}=Xe(n,i),c=Qe(e?0:3,l);return{x:r.x,y:r.y,t:e?0:1,g:c,night:!0}}const e=Ye(et(s));return{x:e.x,y:e.y,t:e.t,g:e.g,night:!1}}if(l){const e=a?Math.min(1,-o/12):.4,t=Ge+18*e,{p:i,u:n}=Xe(Re,t);return{x:i.x,y:i.y,t:1,g:Qe(3,n),night:!0}}const u=a?Math.max(0,Math.min(1,o/90)):.5,h=Ge-48*u,{p:p,u:_}=Xe(De.left,h);return{x:p.x,y:p.y,t:.5*_,g:Qe(1,_),night:!1}}function it(e,t){if(null==e||!Number.isFinite(Number(e)))return null;const i=Number(e),n=String(t||"").toLowerCase();return n.includes("km/h")||n.includes("kmh")||n.includes("kph")?i/3.6:n.includes("mph")?.44704*i:n.includes("kn")||n.includes("kt")?.514444*i:i}function nt(e){if(null==e||!Number.isFinite(e))return null;return[{max:.5,n:0,key:"calm"},{max:1.6,n:1,key:"light_air"},{max:3.4,n:2,key:"light_breeze"},{max:5.5,n:3,key:"gentle_breeze"},{max:8,n:4,key:"moderate_breeze"},{max:10.8,n:5,key:"fresh_breeze"},{max:13.9,n:6,key:"strong_breeze"},{max:17.2,n:7,key:"near_gale"},{max:20.8,n:8,key:"gale"},{max:24.5,n:9,key:"strong_gale"},{max:28.5,n:10,key:"storm"},{max:32.7,n:11,key:"violent_storm"},{max:1/0,n:12,key:"hurricane"}].find(t=>e<t.max)}const st={en:{common:{card_title:"Weather Station",compass_title:"Compass",compass_configure:"Configure wind direction / speed entities.",card_name:"Weather Station Card",card_description:"A modern, Mushroom-inspired weather station card."},condition:{clear_sky:"Clear sky",cloudy:"Cloudy",rain:"Rain",snow:"Snow",sleet:"Sleet / mixed",clear_night:"Clear night",partly_cloudy:"Partly cloudy"},comfort:{freezing:"Feels freezing",cold:"Feels cold",humid:"Feels humid",hot:"Feels hot",comfortable:"Feels comfortable",mild:"Feels mild"},dewpoint:"Dewpoint {value} {unit}",feels_like:"Feels like {value} {unit}",feels:{apparent:"Apparent",wind_chill:"Wind chill",humidex:"Humidex"},heat_stress:{low:"Low",moderate:"Moderate",high:"High",extreme:"Extreme"},battery:{capacitor:"Cap"},sections:{light:"Light",temperature:"Temp",feels_like:"Feels like",humidity:"Humidity",dewpoint:"Dew point",rain:"Rain",wind:"Wind",uv:"UV Index",pressure:"Pressure",heat_stress:"Heat stress",battery:"Battery"},sun:{sunrise:"Sunrise",sunset:"Sunset",azimuth:"Azimuth",elevation:"Elevation"},rain:{detected:"Rain detected",wet:"Wet",dry:"Dry",today:"Today"},wind:{gust:"Gust {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Calm",light_air:"Light air",light_breeze:"Light breeze",gentle_breeze:"Gentle breeze",moderate_breeze:"Moderate breeze",fresh_breeze:"Fresh breeze",strong_breeze:"Strong breeze",near_gale:"Near gale",gale:"Gale",strong_gale:"Strong gale",storm:"Storm",violent_storm:"Violent storm",hurricane:"Hurricane"},lux:{dark:"Dark",low_light:"Low light",bright:"Bright",very_bright:"Very bright",full_sun:"Full sun"},uv:{low:"Low",moderate:"Moderate",high:"High",very_high:"Very high",extreme:"Extreme"},pressure:{rising:"Rising",falling:"Falling",steady:"Steady"},compass:{N:"N",NE:"NE",E:"E",SE:"SE",S:"S",SW:"SW",W:"W",NW:"NW"},editor:{entities:"Entities",settings:"Settings",title:"Card title",temperature_entity:"Temperature",humidity_entity:"Humidity",lux_entity:"Light / Lux (illuminance)",uv_entity:"UV Index",rain_entity:"Rain status",rain_rate_entity:"Rain rate",precipitation_entity:"Precipitation (total)",rain_today_entity:"Rain total today (optional)",wind_speed_entity:"Wind speed",wind_direction_entity:"Wind direction",wind_gust_entity:"Gust speed",pressure_entity:"Pressure",pressure_trend_entity:"Pressure trend (hPa/h)",battery_entity:"Battery",voltage_entity:"Battery voltage",capacitor_voltage_entity:"Capacitor voltage",dewpoint_entity:"Dew point",apparent_temperature_entity:"Apparent temperature",wind_chill_entity:"Wind chill",humidex_entity:"Humidex",heat_stress_entity:"Heat stress",condition_entity:"Weather condition",sun_entity:"Sun (sunrise / sunset)",azimuth_entity:"Azimuth (optional override)",elevation_entity:"Elevation (optional override)",temperature_min_entity:"Min temperature today (optional)",temperature_max_entity:"Max temperature today (optional)",show_daynight:"Day / night mode",hide_title:"Hide card title",show_sun:"Sunrise / sunset diagram",show_dewpoint:"Dew point",show_feels_like:"Feels like",show_heat_stress:"Heat stress",show_minmax:"Today min / max",show_rain_today:"Precipitation / rain today",show_rain_hero:"Rain status in hero (next to temperature)",show_beaufort:"Beaufort scale",show_wind_gust:"Wind gust",invert_wind_direction:"Invert wind direction (sensor reports toward, not from)",show_battery:"Battery",show_voltage:"Battery / capacitor voltage",show_pressure_trend:"Pressure trend",show_interactions:"Interactions",compact_mode:"Compact mode (hero + sun only)",compass_only:"Compass only (large standalone compass)",night_palette:"Night palette for sun diagram",lux_in_klux:"Lux sensor reports kilolux (0–200)",lux_scale:"Lux scale factor",lux_cloudy_max_klux:"Cloudy below (klux)",lux_partly_cloudy_max_klux:"Partly cloudy below (klux)",lux_sunny_max_klux:"Sunny below (klux); above = full sun",animate_icons:"Animate weather icons (sun / cloud / rain)",tile_order:"Tile order",tile_order_hint:"Change the order of sensor tiles in the grid. Empty entities stay hidden.",tile_order_reset:"Reset",tile_lux:"Light / Lux",tile_temperature:"Temperature",tile_feels_like:"Feels like",tile_humidity:"Humidity",tile_dewpoint:"Dew point",tile_rain:"Rain",tile_wind:"Wind",tile_uv:"UV Index",tile_pressure:"Pressure",tile_heat_stress:"Heat stress",tile_battery:"Battery",manual_condition:"Manual condition",pressure_trend_threshold:"Trend threshold (hPa/h)",automatic:"Automatic",sunny:"Sunny",cloudy:"Cloudy",rainy:"Rainy",night:"Night",hint:"Tip: map Zigbee2MQTT exposes 1:1 (rain_status → rain_entity, precipitation → precipitation_entity, etc.). Sections hide when their entity is missing. Tile order: settings.tile_order."}},nl:{common:{card_title:"Weerstation",compass_title:"Kompas",compass_configure:"Koppel windrichting- / windsnelheid-entiteiten.",card_name:"Weerstationkaart",card_description:"Een moderne, Mushroom-geïnspireerde weerstationkaart."},condition:{clear_sky:"Heldere lucht",cloudy:"Bewolkt",rain:"Regen",snow:"Sneeuw",sleet:"Natte sneeuw / mix",clear_night:"Heldere nacht",partly_cloudy:"Gedeeltelijk bewolkt"},comfort:{freezing:"Voelt vriezend",cold:"Voelt koud",humid:"Voelt vochtig",hot:"Voelt heet",comfortable:"Voelt comfortabel",mild:"Voelt mild"},dewpoint:"Dauwpunt {value} {unit}",feels_like:"Voelt als {value} {unit}",feels:{apparent:"Gevoeld",wind_chill:"Windchill",humidex:"Humidex"},heat_stress:{low:"Laag",moderate:"Matig",high:"Hoog",extreme:"Extreem"},battery:{capacitor:"Cap"},sections:{light:"Licht",temperature:"Temp",feels_like:"Voelt als",humidity:"Vochtigheid",dewpoint:"Dauwpunt",rain:"Regen",wind:"Wind",uv:"UV-index",pressure:"Luchtdruk",heat_stress:"Hittebelasting",battery:"Batterij"},sun:{sunrise:"Zonsopkomst",sunset:"Zonsondergang",azimuth:"Azimut",elevation:"Elevatie"},rain:{detected:"Regen gedetecteerd",wet:"Nat",dry:"Droog",today:"Vandaag"},wind:{gust:"Windstoot {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Windstil",light_air:"Zwakke wind",light_breeze:"Zwakke wind",gentle_breeze:"Matige wind",moderate_breeze:"Matige wind",fresh_breeze:"Vrij krachtige wind",strong_breeze:"Krachtige wind",near_gale:"Harde wind",gale:"Stormachtig",strong_gale:"Storm",storm:"Zware storm",violent_storm:"Zeer zware storm",hurricane:"Orkaan"},lux:{dark:"Donker",low_light:"Weinig licht",bright:"Helder",very_bright:"Zeer helder",full_sun:"Volle zon"},uv:{low:"Laag",moderate:"Matig",high:"Hoog",very_high:"Zeer hoog",extreme:"Extreem"},pressure:{rising:"Stijgend",falling:"Dalend",steady:"Stabiel"},compass:{N:"N",NE:"NO",E:"O",SE:"ZO",S:"Z",SW:"ZW",W:"W",NW:"NW"},editor:{entities:"Entiteiten",settings:"Instellingen",title:"Kaarttitel",temperature_entity:"Temperatuur",humidity_entity:"Luchtvochtigheid",lux_entity:"Licht / Lux (illuminance)",uv_entity:"UV-index",rain_entity:"Regenstatus",rain_rate_entity:"Regenintensiteit",precipitation_entity:"Neerslag (totaal)",rain_today_entity:"Regen totaal vandaag (optioneel)",wind_speed_entity:"Windsnelheid",wind_direction_entity:"Windrichting",wind_gust_entity:"Windstoot",pressure_entity:"Luchtdruk",pressure_trend_entity:"Luchtdruktrend (hPa/u)",battery_entity:"Batterij",voltage_entity:"Batterijspanning",capacitor_voltage_entity:"Condensatorspanning",dewpoint_entity:"Dauwpunt",apparent_temperature_entity:"Gevoelstemperatuur",wind_chill_entity:"Gevoelstemperatuur (wind)",humidex_entity:"Humidex",heat_stress_entity:"Hittebelasting",condition_entity:"Weersconditie",sun_entity:"Zon (zonsopkomst / zonsondergang)",azimuth_entity:"Azimut (optionele override)",elevation_entity:"Elevatie (optionele override)",temperature_min_entity:"Min temperatuur vandaag (optioneel)",temperature_max_entity:"Max temperatuur vandaag (optioneel)",show_daynight:"Dag / nacht modus",hide_title:"Kaarttitel verbergen",show_sun:"Zonsopkomst / zonsondergang diagram",show_dewpoint:"Dauwpunt",show_feels_like:"Gevoelstemperatuur",show_heat_stress:"Hittebelasting",show_minmax:"Vandaag min / max",show_rain_today:"Neerslag / regen vandaag",show_rain_hero:"Regenstatus in hero (bij temperatuur)",show_beaufort:"Beaufortschaal",show_wind_gust:"Windstoot",invert_wind_direction:"Windrichting omkeren (sensor geeft heen-richting i.p.v. herkomst)",show_battery:"Batterij",show_voltage:"Batterij- / condensatorspanning",show_pressure_trend:"Luchtdruktrend",show_interactions:"Interacties",compact_mode:"Compacte modus (alleen hero + zon)",compass_only:"Alleen kompas (groot los kompas)",night_palette:"Nachtpalet voor zondiagram",lux_in_klux:"Lux-sensor geeft kilolux (0–200)",lux_scale:"Lux-schaalfactor",lux_cloudy_max_klux:"Bewolkt onder (klux)",lux_partly_cloudy_max_klux:"Gedeeltelijk bewolkt onder (klux)",lux_sunny_max_klux:"Zonnig onder (klux); daarboven volle zon",animate_icons:"Animeer weericonen (zon / wolk / regen)",tile_order:"Tegelvolgorde",tile_order_hint:"Wijzig de volgorde van sensortegels in het raster. Ontbrekende entiteiten blijven verborgen.",tile_order_reset:"Reset",tile_lux:"Licht / Lux",tile_temperature:"Temperatuur",tile_feels_like:"Gevoelstemperatuur",tile_humidity:"Vochtigheid",tile_dewpoint:"Dauwpunt",tile_rain:"Regen",tile_wind:"Wind",tile_uv:"UV-index",tile_pressure:"Luchtdruk",tile_heat_stress:"Hittebelasting",tile_battery:"Batterij",manual_condition:"Handmatige conditie",pressure_trend_threshold:"Trenddrempel (hPa/u)",automatic:"Automatisch",sunny:"Zonnig",cloudy:"Bewolkt",rainy:"Regenachtig",night:"Nacht",hint:"Tip: koppel Zigbee2MQTT-exposes 1:1 (rain_status → rain_entity, precipitation → precipitation_entity, enz.). Secties verdwijnen zonder entiteit. Tegelvolgorde: settings.tile_order."}},es:{common:{card_title:"Estación meteorológica",compass_title:"Brújula",compass_configure:"Configura las entidades de dirección / velocidad del viento.",card_name:"Tarjeta de estación meteorológica",card_description:"Una tarjeta moderna de estación meteorológica inspirada en Mushroom."},condition:{clear_sky:"Cielo despejado",cloudy:"Nublado",rain:"Lluvia",snow:"Nieve",sleet:"Aguanieve / mixta",clear_night:"Noche despejada",partly_cloudy:"Parcialmente nublado"},comfort:{freezing:"Se siente gélido",cold:"Se siente frío",humid:"Se siente húmedo",hot:"Se siente caluroso",comfortable:"Se siente cómodo",mild:"Se siente templado"},dewpoint:"Punto de rocío {value} {unit}",feels_like:"Sensación térmica {value} {unit}",feels:{apparent:"Aparente",wind_chill:"Sensación por viento",humidex:"Humidex"},heat_stress:{low:"Bajo",moderate:"Moderado",high:"Alto",extreme:"Extremo"},battery:{capacitor:"Cap"},sections:{light:"Luz",temperature:"Temp",feels_like:"Sensación",humidity:"Humedad",dewpoint:"Punto de rocío",rain:"Lluvia",wind:"Viento",uv:"Índice UV",pressure:"Presión",heat_stress:"Estrés térmico",battery:"Batería"},sun:{sunrise:"Amanecer",sunset:"Atardecer",azimuth:"Azimut",elevation:"Elevación"},rain:{detected:"Lluvia detectada",wet:"Mojado",dry:"Seco",today:"Hoy"},wind:{gust:"Ráfaga {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Calma",light_air:"Ventolina",light_breeze:"Brisa ligera",gentle_breeze:"Brisa suave",moderate_breeze:"Brisa moderada",fresh_breeze:"Brisa fresca",strong_breeze:"Brisa fuerte",near_gale:"Viento fuerte",gale:"Temporal",strong_gale:"Temporal fuerte",storm:"Tempestad",violent_storm:"Tempestad violenta",hurricane:"Huracán"},lux:{dark:"Oscuro",low_light:"Poca luz",bright:"Brillante",very_bright:"Muy brillante",full_sun:"Sol pleno"},uv:{low:"Bajo",moderate:"Moderado",high:"Alto",very_high:"Muy alto",extreme:"Extremo"},pressure:{rising:"Subiendo",falling:"Bajando",steady:"Estable"},compass:{N:"N",NE:"NE",E:"E",SE:"SE",S:"S",SW:"SO",W:"O",NW:"NO"},editor:{entities:"Entidades",settings:"Ajustes",title:"Título de la tarjeta",temperature_entity:"Temperatura",humidity_entity:"Humedad",lux_entity:"Luz / Lux (iluminancia)",uv_entity:"Índice UV",rain_entity:"Estado de lluvia",rain_rate_entity:"Intensidad de lluvia",precipitation_entity:"Precipitación (total)",rain_today_entity:"Lluvia total hoy (opcional)",wind_speed_entity:"Velocidad del viento",wind_direction_entity:"Dirección del viento",wind_gust_entity:"Ráfaga de viento",pressure_entity:"Presión",pressure_trend_entity:"Tendencia de presión (hPa/h)",battery_entity:"Batería",voltage_entity:"Voltaje de batería",capacitor_voltage_entity:"Voltaje del condensador",dewpoint_entity:"Punto de rocío",apparent_temperature_entity:"Temperatura aparente",wind_chill_entity:"Sensación por viento",humidex_entity:"Humidex",heat_stress_entity:"Estrés térmico",condition_entity:"Condición meteorológica",sun_entity:"Sol (amanecer / atardecer)",azimuth_entity:"Azimut (opcional)",elevation_entity:"Elevación (opcional)",temperature_min_entity:"Temperatura mín. hoy (opcional)",temperature_max_entity:"Temperatura máx. hoy (opcional)",show_daynight:"Modo día / noche",hide_title:"Ocultar título de la tarjeta",show_sun:"Diagrama de amanecer / atardecer",show_dewpoint:"Punto de rocío",show_feels_like:"Sensación térmica",show_heat_stress:"Estrés térmico",show_minmax:"Mín / máx de hoy",show_rain_today:"Precipitación / lluvia hoy",show_rain_hero:"Estado de lluvia en el hero (junto a la temperatura)",show_beaufort:"Escala de Beaufort",show_wind_gust:"Ráfaga de viento",invert_wind_direction:"Invertir dirección (el sensor indica hacia dónde sopla)",show_battery:"Batería",show_voltage:"Voltaje de batería / condensador",show_pressure_trend:"Tendencia de presión",show_interactions:"Interacciones",compact_mode:"Modo compacto (solo hero + sol)",compass_only:"Solo brújula (brújula grande independiente)",night_palette:"Paleta nocturna del diagrama solar",lux_in_klux:"El sensor de lux reporta kilolux (0–200)",lux_scale:"Factor de escala de lux",lux_cloudy_max_klux:"Nublado por debajo de (klux)",lux_partly_cloudy_max_klux:"Parcialmente nublado por debajo de (klux)",lux_sunny_max_klux:"Soleado por debajo de (klux); por encima sol pleno",animate_icons:"Animar iconos del tiempo (sol / nube / lluvia)",tile_order:"Orden de mosaicos",tile_order_hint:"Cambia el orden de los mosaicos de sensores en la cuadrícula. Las entidades vacías siguen ocultas.",tile_order_reset:"Restablecer",tile_lux:"Luz / Lux",tile_temperature:"Temperatura",tile_feels_like:"Sensación térmica",tile_humidity:"Humedad",tile_dewpoint:"Punto de rocío",tile_rain:"Lluvia",tile_wind:"Viento",tile_uv:"Índice UV",tile_pressure:"Presión",tile_heat_stress:"Estrés térmico",tile_battery:"Batería",manual_condition:"Condición manual",pressure_trend_threshold:"Umbral de tendencia (hPa/h)",automatic:"Automático",sunny:"Soleado",cloudy:"Nublado",rainy:"Lluvioso",night:"Noche",hint:"Consejo: mapea los exposes de Zigbee2MQTT 1:1 (rain_status → rain_entity, etc.). Las secciones se ocultan sin entidad. Orden: settings.tile_order."}},de:{common:{card_title:"Wetterstation",compass_title:"Kompass",compass_configure:"Windrichtungs- / Windgeschwindigkeits-Entitäten zuweisen.",card_name:"Wetterstationskarte",card_description:"Eine moderne, von Mushroom inspirierte Wetterstationskarte."},condition:{clear_sky:"Klarer Himmel",cloudy:"Bewölkt",rain:"Regen",snow:"Schnee",sleet:"Schneeregen / gemischt",clear_night:"Klare Nacht",partly_cloudy:"Teilweise bewölkt"},comfort:{freezing:"Fühlt sich eiskalt an",cold:"Fühlt sich kalt an",humid:"Fühlt sich schwül an",hot:"Fühlt sich heiß an",comfortable:"Fühlt sich angenehm an",mild:"Fühlt sich mild an"},dewpoint:"Taupunkt {value} {unit}",feels_like:"Gefühlt {value} {unit}",feels:{apparent:"Gefühlte Temperatur",wind_chill:"Windchill",humidex:"Humidex"},heat_stress:{low:"Niedrig",moderate:"Mäßig",high:"Hoch",extreme:"Extrem"},battery:{capacitor:"Kap"},sections:{light:"Licht",temperature:"Temp",feels_like:"Gefühlt",humidity:"Feuchte",dewpoint:"Taupunkt",rain:"Regen",wind:"Wind",uv:"UV-Index",pressure:"Luftdruck",heat_stress:"Hitzestress",battery:"Batterie"},sun:{sunrise:"Sonnenaufgang",sunset:"Sonnenuntergang",azimuth:"Azimut",elevation:"Höhe"},rain:{detected:"Regen erkannt",wet:"Nass",dry:"Trocken",today:"Heute"},wind:{gust:"Böe {value} {unit}",beaufort:"{value} Bft"},beaufort:{calm:"Windstille",light_air:"Leichter Zug",light_breeze:"Leichte Brise",gentle_breeze:"Schwache Brise",moderate_breeze:"Mäßige Brise",fresh_breeze:"Frische Brise",strong_breeze:"Starker Wind",near_gale:"Steifer Wind",gale:"Stürmischer Wind",strong_gale:"Sturm",storm:"Schwerer Sturm",violent_storm:"Orkanartiger Sturm",hurricane:"Orkan"},lux:{dark:"Dunkel",low_light:"Wenig Licht",bright:"Hell",very_bright:"Sehr hell",full_sun:"Volle Sonne"},uv:{low:"Niedrig",moderate:"Mäßig",high:"Hoch",very_high:"Sehr hoch",extreme:"Extrem"},pressure:{rising:"Steigend",falling:"Fallend",steady:"Stabil"},compass:{N:"N",NE:"NO",E:"O",SE:"SO",S:"S",SW:"SW",W:"W",NW:"NW"},editor:{entities:"Entitäten",settings:"Einstellungen",title:"Kartentitel",temperature_entity:"Temperatur",humidity_entity:"Luftfeuchtigkeit",lux_entity:"Licht / Lux (Beleuchtungsstärke)",uv_entity:"UV-Index",rain_entity:"Regenstatus",rain_rate_entity:"Regenintensität",precipitation_entity:"Niederschlag (gesamt)",rain_today_entity:"Regenmenge heute (optional)",wind_speed_entity:"Windgeschwindigkeit",wind_direction_entity:"Windrichtung",wind_gust_entity:"Windböe",pressure_entity:"Luftdruck",pressure_trend_entity:"Luftdrucktrend (hPa/h)",battery_entity:"Batterie",voltage_entity:"Batteriespannung",capacitor_voltage_entity:"Kondensatorspannung",dewpoint_entity:"Taupunkt",apparent_temperature_entity:"Gefühlte Temperatur",wind_chill_entity:"Windchill",humidex_entity:"Humidex",heat_stress_entity:"Hitzestress",condition_entity:"Wetterlage",sun_entity:"Sonne (Aufgang / Untergang)",azimuth_entity:"Azimut (optional)",elevation_entity:"Höhe (optional)",temperature_min_entity:"Min. Temperatur heute (optional)",temperature_max_entity:"Max. Temperatur heute (optional)",show_daynight:"Tag-/Nachtmodus",hide_title:"Kartentitel ausblenden",show_sun:"Sonnenauf-/untergang Diagramm",show_dewpoint:"Taupunkt",show_feels_like:"Gefühlte Temperatur",show_heat_stress:"Hitzestress",show_minmax:"Heute Min / Max",show_rain_today:"Niederschlag / Regen heute",show_rain_hero:"Regenstatus im Hero (neben Temperatur)",show_beaufort:"Beaufort-Skala",show_wind_gust:"Windböe",invert_wind_direction:"Windrichtung umkehren (Sensor meldet Ziel-, nicht Herkunftsrichtung)",show_battery:"Batterie",show_voltage:"Batterie-/Kondensatorspannung",show_pressure_trend:"Luftdrucktrend",show_interactions:"Interaktionen",compact_mode:"Kompaktmodus (nur Hero + Sonne)",compass_only:"Nur Kompass (großes Einzelkompass)",night_palette:"Nachtpalette für Sonnendiagramm",lux_in_klux:"Lux-Sensor liefert Kilolux (0–200)",lux_scale:"Lux-Skalierungsfaktor",lux_cloudy_max_klux:"Bewölkt unter (klux)",lux_partly_cloudy_max_klux:"Teilweise bewölkt unter (klux)",lux_sunny_max_klux:"Sonnig unter (klux); darüber volle Sonne",animate_icons:"Wetter-Icons animieren (Sonne / Wolke / Regen)",tile_order:"Kachelreihenfolge",tile_order_hint:"Reihenfolge der Sensorkacheln im Raster ändern. Fehlende Entitäten bleiben ausgeblendet.",tile_order_reset:"Zurücksetzen",tile_lux:"Licht / Lux",tile_temperature:"Temperatur",tile_feels_like:"Gefühlte Temperatur",tile_humidity:"Luftfeuchtigkeit",tile_dewpoint:"Taupunkt",tile_rain:"Regen",tile_wind:"Wind",tile_uv:"UV-Index",tile_pressure:"Luftdruck",tile_heat_stress:"Hitzestress",tile_battery:"Batterie",manual_condition:"Manueller Zustand",pressure_trend_threshold:"Trendschwelle (hPa/h)",automatic:"Automatisch",sunny:"Sonnig",cloudy:"Bewölkt",rainy:"Regnerisch",night:"Nacht",hint:"Tipp: Zigbee2MQTT-Exposes 1:1 zuordnen (rain_status → rain_entity usw.). Abschnitte ohne Entität ausblenden. Reihenfolge: settings.tile_order."}}};function rt(e,t){return t.split(".").reduce((e,t)=>e&&null!=e[t]?e[t]:void 0,e)}function ot(e,t,i={}){const n=e&&(e.locale?.language||e.language||e.selectedLanguage)||"en",s=String(n).replace("_","-").split("-")[0].toLowerCase();let r=rt(st[s],t)??rt(st.en,t)??t;return"string"!=typeof r?t:(Object.keys(i).forEach(e=>{r=r.replace(`{${e}}`,String(i[e]))}),r)}let at=0;function lt(e="g"){return at+=1,`${e}${at}`}function ct(e,t=""){return G`<span class="wsc-icon ${t}" aria-hidden="true">${e}</span>`}function dt(e,t){return t.map(t=>K`
      <g
        class="icon-drop"
        style="animation-delay:${t.delay}s;animation-duration:${t.dur}s"
      >
        <rect
          x=${t.x}
          y=${t.y}
          width=${t.w??2.4}
          height=${t.h??10}
          rx="1.1"
          fill="url(#${e})"
          opacity=${t.opacity??.9}
        />
      </g>
    `)}const ut=[{x:14,y:39,delay:.05,dur:.92},{x:22,y:41,delay:.38,dur:1.08},{x:30,y:40,delay:.17,dur:.98},{x:37,y:42,delay:.52,dur:1.14},{x:45,y:39,delay:.24,dur:.86},{x:51,y:41,delay:.61,dur:1.02}],ht=[{x:16,y:41,delay:.08,dur:.94},{x:25,y:43,delay:.41,dur:1.06},{x:34,y:42,delay:.19,dur:.9},{x:42,y:44,delay:.55,dur:1.12},{x:48,y:41,delay:.28,dur:.88}];const pt=[{x:15,y:40,delay:.1,dur:1.35},{x:23,y:42,delay:.45,dur:1.55},{x:31,y:41,delay:.22,dur:1.42},{x:39,y:43,delay:.58,dur:1.28},{x:47,y:40,delay:.33,dur:1.48},{x:52,y:42,delay:.68,dur:1.38}];function _t(e){const t=lt("sn");return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${t}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8ECF2"/>
            <stop offset="100%" stop-color="#8A94A4"/>
          </linearGradient>
        </defs>
        <g class="icon-drift">
          <path fill="url(#${t}c)"
            d="M14 34c-5.5 0-10-4.2-10-9.4 0-4.5 3.2-8.3 7.6-9.3C12.6 9.4 17.8 6 24 6
               c7 0 12.9 4.8 14.3 11.4 1-.3 2-.4 3.1-.4 6.2 0 11.2 4.8 11.2 10.8
               S47.6 38 41.4 38H14z"/>
        </g>
        ${i=pt,i.map(e=>K`
      <g
        class="icon-drop"
        style="animation-delay:${e.delay}s;animation-duration:${e.dur}s"
      >
        <circle cx=${e.x} cy=${e.y} r=${e.r??2.2} fill="#A8C0FF" opacity=${e.opacity??.92}/>
      </g>
    `)}
      </svg>
    `,e);var i}function mt(e,t={}){const i=lt("th"),n=function(e,t){if(null==e||!Number.isFinite(Number(e)))return null;const i=Number(e);return String(t||"").toLowerCase().includes("f")?5*(i-32)/9:i}(t.value,t.unit),{cold:s,hot:r,t:o}=function(e){const t=Math.max(0,Math.min(1,((e??20)+30)/70)),i=[{p:0,r:10,g:132,b:255},{p:.43,r:90,g:200,b:250},{p:.64,r:52,g:199,b:89},{p:.79,r:255,g:159,b:10},{p:1,r:255,g:69,b:58}];let n=i[0],s=i[i.length-1];for(let e=0;e<i.length-1;e++)if(t>=i[e].p&&t<=i[e+1].p){n=i[e],s=i[e+1];break}const r=(t-n.p)/(s.p-n.p||1),o=Math.round(n.r+(s.r-n.r)*r),a=Math.round(n.g+(s.g-n.g)*r),l=Math.round(n.b+(s.b-n.b)*r),c=`rgb(${o},${a},${l})`;return{cold:`rgb(${Math.min(255,o+40)},${Math.min(255,a+40)},${Math.min(255,l+20)})`,hot:c,t:t}}(null!=n?n:20),a=4+20*o;return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${i}a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${s}"/>
            <stop offset="100%" stop-color="${r}"/>
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
    `,e)}function yt(e,t){const i=lt("lx"),n={dark:{opacity:.4,rayH:6,rays:4,disc:"#6B7280",ray:"#9CA3AF",glow:!1},low:{opacity:.65,rayH:8,rays:6,disc:"#F5D76E",ray:"#E0B000",glow:!1},bright:{opacity:.9,rayH:10,rays:8,disc:"#FFE56A",ray:"#FFB100",glow:!1},very:{opacity:1,rayH:11,rays:8,disc:"#FFE56A",ray:"#FF9F0A",glow:!0},full:{opacity:1,rayH:13,rays:12,disc:"#FFF3C4",ray:"#FF9500",glow:!0}}[e]||{opacity:1,rayH:10,rays:8,disc:"#FFE56A",ray:"#FFB100",glow:!1},s=360/n.rays,r=Array.from({length:n.rays},(e,t)=>t*s);return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${i}a" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFF8DC"/>
            <stop offset="55%" stop-color="${n.disc}"/>
            <stop offset="100%" stop-color="${n.ray}"/>
          </radialGradient>
          ${n.glow?K`<radialGradient id="${i}glow" cx="50%" cy="50%" r="50%">
                <stop offset="40%" stop-color="#FFB100" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#FFB100" stop-opacity="0"/>
              </radialGradient>`:V}
        </defs>
        ${n.glow?K`<circle cx="32" cy="32" r="30" fill="url(#${i}glow)"/>`:V}
        ${r.map(e=>K`
            <rect x="29.5" y="${7-(n.rayH-8)/2}" width="5" height="${n.rayH}" rx="2.5"
              fill="${n.ray}" opacity="${n.opacity}"
              transform="rotate(${e} 32 32)"/>
          `)}
        <circle cx="32" cy="32" r="${"dark"===e?11:13}" fill="url(#${i}a)" opacity="${n.opacity}"/>
        ${"dark"!==e?K`<circle cx="27" cy="27" r="3.5" fill="#fff" opacity="0.35"/>`:V}
      </svg>
    `,t)}function gt(e,t={}){const i=lt("wd"),n=null!=t.value&&Number.isFinite(Number(t.value))?String(Math.round(Number(t.value))):"";return ct(K`
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
        ${""!==n?K`
              <text x="46" y="46" text-anchor="middle" dominant-baseline="central"
                font-size="${n.length>1?15:18}" font-weight="800"
                font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
                fill="#1C1C1E"
                stroke="#fff" stroke-width="3" paint-order="stroke fill"
                stroke-linejoin="round">${n}</text>
            `:V}
      </svg>
    `,e)}function ft(e,t){const i=lt("bat"),n="full"===e||"high"===e?{a:"#30D158",b:"#248A3D"}:"medium"===e?{a:"#FFD60A",b:"#FF9F0A"}:"low"===e||"outline"===e?{a:"#FF453A",b:"#D70015"}:{a:"#8E8E93",b:"#636366"},s="full"===e?28:"high"===e?22:"medium"===e?14:"low"===e?8:"outline"===e?0:10;return ct(K`
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
        ${s?K`<rect x="22" y="${50-s}" width="20" height="${s}" rx="2.5" fill="url(#${i}a)"/>`:V}
      </svg>
    `,t)}function xt(e){return ct(K`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor"
          d="M12 4l6 7h-4v9h-4V11H6l6-7z"/>
      </svg>
    `,e)}function wt(e){return ct(K`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor"
          d="M12 20l-6-7h4V4h4v9h4l-6 7z"/>
      </svg>
    `,e)}function vt(e,t="",i={}){switch(e){case"sunny":case"clear_sky":return function(e){const t=lt("sun");return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${t}a" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="55%" stop-color="#FFB100"/>
            <stop offset="100%" stop-color="#FF8A00"/>
          </radialGradient>
          <linearGradient id="${t}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFCC33"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </linearGradient>
        </defs>
        <g class="icon-spin" style="transform-origin: 32px 32px">
          ${[0,45,90,135,180,225,270,315].map(e=>K`
              <rect x="29.5" y="4" width="5" height="11" rx="2.5"
                fill="url(#${t}b)"
                transform="rotate(${e} 32 32)"/>
            `)}
          <circle cx="32" cy="32" r="14" fill="url(#${t}a)"/>
          <circle cx="27" cy="27" r="4.5" fill="#fff" opacity="0.35"/>
        </g>
      </svg>
    `,e)}(t);case"night":case"clear_night":return function(e){const t=lt("moon");return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${t}a" x1="0.2" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stop-color="#F2F7FF"/>
            <stop offset="40%" stop-color="#B4C8FF"/>
            <stop offset="100%" stop-color="#6B8CFF"/>
          </linearGradient>
        </defs>
        <path fill="url(#${t}a)"
          d="M41 8.5A23 23 0 1 0 54 48.5 19 19 0 1 1 41 8.5Z"/>
        <circle cx="28" cy="24" r="3" fill="#fff" opacity="0.28"/>
      </svg>
    `,e)}(t);case"cloudy":return function(e){const t=lt("cld");return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${t}a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#B8C0CC"/>
            <stop offset="100%" stop-color="#7A8494"/>
          </linearGradient>
          <linearGradient id="${t}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8ECF2"/>
            <stop offset="100%" stop-color="#A8B0BE"/>
          </linearGradient>
        </defs>
        <g class="icon-drift">
          <ellipse cx="40" cy="30" rx="14" ry="10" fill="url(#${t}b)" opacity="0.85"/>
          <path fill="url(#${t}a)"
            d="M18 42c-6.6 0-12-5-12-11.2 0-5.4 3.8-10 9.1-11.2C16.6 13.4 22.8 9 30.2 9
               c8.4 0 15.4 5.8 17 13.5 1.2-.3 2.4-.5 3.7-.5 7.4 0 13.4 5.8 13.4 13
               0 7.2-6 13-13.4 13H18z"/>
          <ellipse cx="26" cy="28" rx="8" ry="5" fill="#fff" opacity="0.18"/>
        </g>
      </svg>
    `,e)}(t);case"partly_cloudy":return function(e){const t=lt("pc");return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${t}s" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="55%" stop-color="#FFB100"/>
            <stop offset="100%" stop-color="#FF8A00"/>
          </radialGradient>
          <linearGradient id="${t}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFCC33"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </linearGradient>
          <linearGradient id="${t}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#D8DEE8"/>
            <stop offset="100%" stop-color="#8A94A4"/>
          </linearGradient>
        </defs>
        <!-- Position/scale wrapper; spin lives on inner group so CSS rotate
             does not overwrite translate/scale. -->
        <g transform="translate(4 4) scale(0.55)">
          <g class="icon-spin icon-spin-slow" style="transform-origin: 32px 32px">
            ${[0,45,90,135,180,225,270,315].map(e=>K`
                <rect x="29.5" y="4" width="5" height="11" rx="2.5"
                  fill="url(#${t}b)"
                  transform="rotate(${e} 32 32)"/>
              `)}
            <circle cx="32" cy="32" r="14" fill="url(#${t}s)"/>
            <circle cx="27" cy="27" r="4.5" fill="#fff" opacity="0.35"/>
          </g>
        </g>
        <g class="icon-drift">
          <path fill="url(#${t}c)"
            d="M16 46c-5.5 0-10-4.2-10-9.4 0-4.5 3.2-8.3 7.6-9.3C14.6 21.4 19.8 18 26 18
               c7 0 12.9 4.8 14.3 11.4 1-.3 2-.4 3.1-.4 6.2 0 11.2 4.8 11.2 10.8
               S49.6 50 43.4 50H16z"/>
          <ellipse cx="28" cy="34" rx="7" ry="4" fill="#fff" opacity="0.16"/>
        </g>
      </svg>
    `,e)}(t);case"rainy":case"rain":return function(e){const t=lt("rn");return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${t}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#A8B4C8"/>
            <stop offset="100%" stop-color="#5A6478"/>
          </linearGradient>
          <linearGradient id="${t}d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="100%" stop-color="#0A84FF"/>
          </linearGradient>
        </defs>
        <g class="icon-drift">
          <path fill="url(#${t}c)"
            d="M14 34c-5.5 0-10-4.2-10-9.4 0-4.5 3.2-8.3 7.6-9.3C12.6 9.4 17.8 6 24 6
               c7 0 12.9 4.8 14.3 11.4 1-.3 2-.4 3.1-.4 6.2 0 11.2 4.8 11.2 10.8
               S47.6 38 41.4 38H14z"/>
        </g>
        ${dt(`${t}d`,ut)}
      </svg>
    `,e)}(t);case"partly_rainy":return function(e){const t=lt("pr");return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${t}s" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="100%" stop-color="#FF9500"/>
          </radialGradient>
          <linearGradient id="${t}c" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#C8D0DC"/>
            <stop offset="100%" stop-color="#6A7484"/>
          </linearGradient>
          <linearGradient id="${t}d" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="100%" stop-color="#0A84FF"/>
          </linearGradient>
        </defs>
        <g class="icon-spin icon-spin-slow" style="transform-origin: 18px 18px">
          <circle cx="18" cy="18" r="8" fill="url(#${t}s)"/>
          ${[225,270,315].map(e=>K`
              <rect x="15.5" y="3" width="5" height="7" rx="2.5"
                fill="#FFB100" transform="rotate(${e} 18 18)"/>
            `)}
        </g>
        <g class="icon-drift">
          <path fill="url(#${t}c)"
            d="M14 36c-5 0-9-3.8-9-8.5 0-4.1 2.9-7.5 6.9-8.4C12.8 13.6 17.5 10.5 23 10.5
               c6.3 0 11.7 4.4 13 10.3.9-.2 1.8-.3 2.8-.3 5.6 0 10.1 4.4 10.1 9.8
               S44.4 40 38.8 40H14z"/>
        </g>
        ${dt(`${t}d`,ht)}
      </svg>
    `,e)}(t);case"snowy":case"snow":return _t(t);case"thermometer":case"feels_like":return mt(t,i);case"dewpoint":return function(e){const t=lt("dp");return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${t}a" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="100%" stop-color="#0A84FF"/>
          </linearGradient>
          <linearGradient id="${t}b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FF9F0A"/>
            <stop offset="100%" stop-color="#FF453A"/>
          </linearGradient>
        </defs>
        <path fill="url(#${t}a)"
          d="M22 8C22 8 8 24 8 34c0 8 6.5 12 14 12s14-4 14-12C36 24 22 8 22 8z"/>
        <rect x="40" y="10" width="8" height="24" rx="4" fill="#C8CDD6"/>
        <rect x="42" y="20" width="4" height="12" rx="2" fill="url(#${t}b)"/>
        <circle cx="44" cy="42" r="8" fill="url(#${t}b)"/>
      </svg>
    `,e)}(t);case"heat_stress":return function(e,t={}){const i=lt("hs"),n=(null!=t.value&&Number.isFinite(Number(t.value))?Math.max(0,Math.min(100,Number(t.value))):50)/100,s=Math.round(200-140*n),r=Math.round(50-50*n),o=`rgb(255,${Math.max(40,s)},${Math.max(0,r)})`;return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${i}a" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="100%" stop-color="${o}"/>
          </radialGradient>
        </defs>
        <circle cx="32" cy="28" r="14" fill="url(#${i}a)"/>
        <path fill="none" stroke="${o}" stroke-width="3.5" stroke-linecap="round"
          d="M18 48c4-6 8-6 12 0s8 6 12 0 8-6 12 0"/>
        <path fill="none" stroke="${o}" stroke-width="3" stroke-linecap="round" opacity="0.55"
          d="M22 54c3-4 6-4 9 0s6 4 9 0"/>
      </svg>
    `,e)}(t,i);case"humidity":return function(e){const t=lt("hu");return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${t}a" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stop-color="#64D2FF"/>
            <stop offset="55%" stop-color="#0A84FF"/>
            <stop offset="100%" stop-color="#0040DD"/>
          </linearGradient>
        </defs>
        <path fill="url(#${t}a)"
          d="M32 6C32 6 12 28 12 42c0 11 9 16 20 16s20-5 20-16C52 28 32 6 32 6z"/>
        <ellipse cx="24" cy="28" rx="6" ry="9" fill="#fff" opacity="0.28"
          transform="rotate(-20 24 28)"/>
        <text x="32" y="44" text-anchor="middle" font-size="16" font-weight="700"
          font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
          fill="#fff">%</text>
      </svg>
    `,e)}(t);case"lux_dark":case"brightness_2":return yt("dark",t);case"lux_low":case"brightness_5":return yt("low",t);case"lux_bright":case"brightness_6":return yt("bright",t);case"lux_very_bright":case"brightness_7":return yt("very",t);case"lux_full_sun":return yt("full",t);case"uv":return function(e,t={}){const i=lt("uv"),n=t.value,s=null!=n&&""!==n&&Number.isFinite(Number(n))?String(Math.round(Number(n))):null!=n&&""!==n?String(n):"",r=t.color||"#ffb300";return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${i}s" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FFE56A"/>
            <stop offset="100%" stop-color="#FFB100"/>
          </radialGradient>
        </defs>
        ${[0,45,90,135,180,225,270,315].map(e=>K`
            <rect x="27.5" y="4" width="5" height="10" rx="2.5"
              fill="#FF9F0A" transform="rotate(${e} 30 28)"/>
          `)}
        <circle cx="30" cy="28" r="13" fill="url(#${i}s)"/>
        <circle cx="26" cy="24" r="3.5" fill="#fff" opacity="0.35"/>
        <rect x="34" y="36" width="26" height="26" rx="7" fill="${r}"/>
        <rect x="36" y="38" width="22" height="10" rx="4" fill="#fff" opacity="0.18"/>
        ${""!==s?K`<text x="47" y="50" text-anchor="middle" dominant-baseline="central"
              font-size="${s.length>1?14:16}" font-weight="800"
              font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
              fill="#fff">${s}</text>`:V}
      </svg>
    `,e)}(t,i);case"wind":return gt(t,i);case"wind_gust":return function(e,t={}){return gt(e,t)}(t,i);case"gauge":case"pressure":return function(e){const t=lt("ga");return ct(K`
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${t}r" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#E8EAED"/>
            <stop offset="50%" stop-color="#9AA0A8"/>
            <stop offset="100%" stop-color="#D8DCE2"/>
          </linearGradient>
          <radialGradient id="${t}f" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#4A5160"/>
            <stop offset="100%" stop-color="#1C1F26"/>
          </radialGradient>
          <linearGradient id="${t}n" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#FF453A"/>
            <stop offset="100%" stop-color="#FF6961"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="26" fill="url(#${t}r)"/>
        <circle cx="32" cy="32" r="20" fill="url(#${t}f)"/>
        ${[30,60,90,120,150,210,240,270,300,330].map(e=>K`
            <rect x="31" y="14" width="2" height="5" rx="1" fill="#C8CDD6"
              transform="rotate(${e} 32 32)"/>
          `)}
        <rect x="30.5" y="16" width="3" height="18" rx="1.5" fill="url(#${t}n)"/>
        <circle cx="32" cy="32" r="5" fill="url(#${t}n)"/>
        <circle cx="32" cy="32" r="2" fill="#fff" opacity="0.5"/>
      </svg>
    `,e)}(t);case"battery":case"battery_full":return ft("full",t);case"battery_high":return ft("high",t);case"battery_medium":return ft("medium",t);case"battery_low":return ft("low",t);case"battery_outline":return ft("outline",t);case"battery_unknown":return ft("unknown",t);case"arrow_up":case"trend_up":return xt(t);case"arrow_down":case"trend_down":return wt(t);case"trend_steady":return function(e){return ct(K`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M4 11h16v2H4z"/>
      </svg>
    `,e)}(t);case"compass_needle":case"navigation":return function(e){const t=lt("cn");return ct(K`
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${t}a" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stop-color="#0A84FF"/>
            <stop offset="100%" stop-color="#64D2FF"/>
          </linearGradient>
        </defs>
        <path fill="url(#${t}a)"
          d="M12 2.2 L16.2 17.2 L12 14.2 L7.8 17.2 Z"/>
        <circle cx="12" cy="12" r="2.4" fill="url(#${t}a)"/>
        <circle cx="12" cy="12" r="1.1" fill="#fff" opacity="0.9"/>
      </svg>
    `,e)}(t);default:return V}}class bt extends le{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}setConfig(e){const t={...ve,...e.settings||{}};t.tile_order=this._normalizeTileOrder(t.tile_order),e.type!==`custom:${fe}`&&e.type!==fe||(t.compass_only=!0),this._config={...e,settings:t}}_t(e,t){return ot(this.hass,e,t)}_isCompassOnly(){return!(!this._config?.settings?.compass_only&&this._config?.type!==`custom:${fe}`&&this._config?.type!==fe)}_normalizeTileOrder(e){const t=new Set(we),i=new Set,n=[];for(const s of Array.isArray(e)?e:[])t.has(s)&&!i.has(s)&&(n.push(s),i.add(s));for(const e of we)i.has(e)||n.push(e);return n}_schema(){if(this._isCompassOnly())return[{name:"title",selector:{text:{}}},{name:"wind_direction_entity",selector:{entity:{}}},{name:"wind_speed_entity",selector:{entity:{}}},{name:"wind_gust_entity",selector:{entity:{}}},{type:"expandable",name:"settings",title:this._t("editor.settings"),icon:"mdi:cog",schema:[{name:"",type:"grid",schema:[{name:"hide_title",selector:{boolean:{}}},{name:"show_beaufort",selector:{boolean:{}}},{name:"show_wind_gust",selector:{boolean:{}}},{name:"invert_wind_direction",selector:{boolean:{}}},{name:"show_interactions",selector:{boolean:{}}}]}]}];const e=this._config?.settings?.show_pressure_trend,t=!1===this._config?.settings?.show_daynight;return[{name:"title",selector:{text:{}}},{type:"expandable",name:"",title:this._t("editor.entities"),icon:"mdi:format-list-bulleted",schema:[{name:"temperature_entity",selector:{entity:{}}},{name:"humidity_entity",selector:{entity:{}}},{name:"lux_entity",selector:{entity:{}}},{name:"uv_entity",selector:{entity:{}}},{name:"",type:"grid",schema:[{name:"rain_entity",selector:{entity:{}}},{name:"rain_rate_entity",selector:{entity:{}}},{name:"precipitation_entity",selector:{entity:{}}},{name:"rain_today_entity",selector:{entity:{}}}]},{name:"",type:"grid",schema:[{name:"wind_speed_entity",selector:{entity:{}}},{name:"wind_direction_entity",selector:{entity:{}}},{name:"wind_gust_entity",selector:{entity:{}}}]},{name:"",type:"grid",schema:[{name:"pressure_entity",selector:{entity:{}}},{name:"pressure_trend_entity",selector:{entity:{}}}]},{name:"",type:"grid",schema:[{name:"battery_entity",selector:{entity:{}}},{name:"voltage_entity",selector:{entity:{}}},{name:"capacitor_voltage_entity",selector:{entity:{}}}]},{name:"",type:"grid",schema:[{name:"dewpoint_entity",selector:{entity:{}}},{name:"apparent_temperature_entity",selector:{entity:{}}},{name:"wind_chill_entity",selector:{entity:{}}},{name:"humidex_entity",selector:{entity:{}}},{name:"heat_stress_entity",selector:{entity:{}}}]},{name:"condition_entity",selector:{entity:{}}},{name:"sun_entity",selector:{entity:{domain:"sun"}}},{name:"",type:"grid",schema:[{name:"azimuth_entity",selector:{entity:{}}},{name:"elevation_entity",selector:{entity:{}}}]},{name:"",type:"grid",schema:[{name:"temperature_min_entity",selector:{entity:{}}},{name:"temperature_max_entity",selector:{entity:{}}}]}]},{type:"expandable",name:"settings",title:this._t("editor.settings"),icon:"mdi:cog",schema:[{name:"",type:"grid",schema:[{name:"show_daynight",selector:{boolean:{}}},{name:"hide_title",selector:{boolean:{}}},{name:"show_sun",selector:{boolean:{}}},{name:"night_palette",selector:{boolean:{}}},{name:"compact_mode",selector:{boolean:{}}},{name:"compass_only",selector:{boolean:{}}},{name:"lux_in_klux",selector:{boolean:{}}},{name:"lux_scale",selector:{number:{min:.01,max:100,step:.01,mode:"box"}}},{name:"show_dewpoint",selector:{boolean:{}}},{name:"show_feels_like",selector:{boolean:{}}},{name:"show_heat_stress",selector:{boolean:{}}},{name:"show_minmax",selector:{boolean:{}}},{name:"show_rain_today",selector:{boolean:{}}},{name:"show_rain_hero",selector:{boolean:{}}},{name:"show_beaufort",selector:{boolean:{}}},{name:"show_wind_gust",selector:{boolean:{}}},{name:"invert_wind_direction",selector:{boolean:{}}},{name:"show_battery",selector:{boolean:{}}},{name:"show_voltage",selector:{boolean:{}}},{name:"show_pressure_trend",selector:{boolean:{}}},{name:"show_interactions",selector:{boolean:{}}},{name:"animate_icons",selector:{boolean:{}}}]},{name:"lux_cloudy_max_klux",selector:{number:{min:.1,max:250,step:.5,unit_of_measurement:"klux",mode:"box"}}},{name:"lux_partly_cloudy_max_klux",selector:{number:{min:1,max:250,step:.5,unit_of_measurement:"klux",mode:"box"}}},{name:"lux_sunny_max_klux",selector:{number:{min:5,max:300,step:1,unit_of_measurement:"klux",mode:"box"}}},...t?[{name:"manual_condition",selector:{select:{mode:"dropdown",options:[{value:"",label:this._t("editor.automatic")},{value:"sunny",label:this._t("editor.sunny")},{value:"cloudy",label:this._t("editor.cloudy")},{value:"rainy",label:this._t("editor.rainy")},{value:"night",label:this._t("editor.night")}]}}}]:[],...e?[{name:"pressure_trend_threshold",selector:{number:{min:.1,max:10,step:.1,unit_of_measurement:"hPa/h",mode:"box"}}}]:[]]}]}_computeLabel=e=>e.name?this._t(`editor.${e.name}`)||e.title||e.name:e.title||"";_valueChanged(e){if(!this._config)return;const t=e.detail.value,i=this._config.settings?.tile_order,n=this._isCompassOnly(),s={...t,type:this._config.type||t.type,settings:{...ve,...t.settings||{},tile_order:this._normalizeTileOrder(t.settings?.tile_order||i),...n?{compass_only:!0}:{}}};Object.keys(s).forEach(e=>{""===s[e]&&e.endsWith("_entity")&&delete s[e]}),this._config=s,pe(this,"config-changed",{config:s})}_moveTile(e,t){const i=[...this._normalizeTileOrder(this._config.settings?.tile_order)],n=e+t;if(n<0||n>=i.length)return;const s=i[e];i[e]=i[n],i[n]=s;const r={...this._config,settings:{...this._config.settings,tile_order:i}};this._config=r,pe(this,"config-changed",{config:r})}_resetTileOrder(){const e={...this._config,settings:{...this._config.settings,tile_order:[...we]}};this._config=e,pe(this,"config-changed",{config:e})}_renderTileOrder(){if(this._config?.settings?.compact_mode||this._isCompassOnly())return V;const e=this._normalizeTileOrder(this._config.settings?.tile_order);return G`
      <div class="tile-order">
        <div class="tile-order-header">
          <div class="tile-order-title">${this._t("editor.tile_order")}</div>
          <button type="button" class="reset" @click=${this._resetTileOrder}>
            ${this._t("editor.tile_order_reset")}
          </button>
        </div>
        <div class="tile-order-hint">${this._t("editor.tile_order_hint")}</div>
        <div class="tile-order-list">
          ${e.map((t,i)=>G`
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
    `}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${this._renderTileOrder()}
      <div class="hint">${this._t("editor.hint")}</div>
    `:V}static get styles(){return r`
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
    `}}customElements.get(ge)||customElements.define(ge,bt);class $t extends le{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static async getConfigElement(){return document.createElement(ge)}static getStubConfig(){return{type:`custom:${ye}`,temperature_entity:"",humidity_entity:"",settings:{...ve}}}setConfig(e){if(!e)throw new Error("Invalid configuration");const t={...ve,...e.settings||{}};t.tile_order=this._normalizeTileOrder(t.tile_order),e.type!==`custom:${fe}`&&e.type!==fe||(t.compass_only=!0),this._config={...e,settings:t},this._pressureHistory=this._pressureHistory||[],this._tempStats=this._tempStats||null,this._tempHistoryKey=void 0}disconnectedCallback(){super.disconnectedCallback(),this._stopNeedleAnimation()}updated(){null!=this._needleTarget?this._startNeedleAnimation():this._stopNeedleAnimation()}_normalizeTileOrder(e){const t=new Set(we),i=new Set,n=[];for(const s of Array.isArray(e)?e:[])t.has(s)&&!i.has(s)&&(n.push(s),i.add(s));for(const e of we)i.has(e)||n.push(e);return n}getCardSize(){const e=this._config?.settings||{};return e.compass_only?4:e.compact_mode?!1===e.show_sun?2:3:6}_t(e,t){return ot(this.hass,e,t)}_hasDedicatedMinMax(){return!(!this._config?.temperature_min_entity&&!this._config?.temperature_max_entity)}_tempStorageKey(){const e=this._config?.temperature_entity;return e?`wsc-temp-stats:${e}`:null}_readStoredTempStats(){const e=this._tempStorageKey();if(!e)return null;try{const t=window.localStorage?.getItem(e);if(!t)return null;const i=JSON.parse(t);return i&&i.day===(new Date).toDateString()&&(Number.isFinite(i.min)&&Number.isFinite(i.max))?{day:i.day,min:i.min,max:i.max}:null}catch(e){return null}}_writeStoredTempStats(){const e=this._tempStorageKey();if(e&&this._tempStats)try{window.localStorage?.setItem(e,JSON.stringify(this._tempStats))}catch(e){}}_recordTemp(e){if(null==e||this._hasDedicatedMinMax())return;if(!(this._config.settings||{}).show_minmax)return;const t=(new Date).toDateString();if(this._tempStats&&this._tempStats.day===t)this._tempStats.min=Math.min(this._tempStats.min,e),this._tempStats.max=Math.max(this._tempStats.max,e);else{const i=this._readStoredTempStats();this._tempStats=i&&i.day===t?{day:t,min:Math.min(i.min,e),max:Math.max(i.max,e)}:{day:t,min:e,max:e},this._tempHistoryKey=void 0}this._writeStoredTempStats(),this._ensureTempHistory()}async _ensureTempHistory(){if(this._hasDedicatedMinMax())return;if(!(this._config.settings||{}).show_minmax)return;const e=this._config?.temperature_entity;if(!e||!this.hass?.callWS)return;const t=(new Date).toDateString(),i=`${e}|${t}`;if(this._tempHistoryKey!==i){this._tempHistoryKey=i;try{const i=new Date;i.setHours(0,0,0,0);const n=new Date,s=await this.hass.callWS({type:"history/history_during_period",start_time:i.toISOString(),end_time:n.toISOString(),entity_ids:[e],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),r=s?.[e]||[];let o=1/0,a=-1/0;for(const e of r){const t=Number.parseFloat(e.s??e.state);Number.isFinite(t)&&(o=Math.min(o,t),a=Math.max(a,t))}const l=Se(this._stateObj("temperature_entity"));if(null!=l&&(o=Math.min(o,l),a=Math.max(a,l)),!Number.isFinite(o)||!Number.isFinite(a))return;this._tempStats&&this._tempStats.day===t?this._tempStats={day:t,min:Math.min(this._tempStats.min,o),max:Math.max(this._tempStats.max,a)}:this._tempStats={day:t,min:o,max:a},this._writeStoredTempStats(),this.requestUpdate()}catch(e){this._tempHistoryKey=void 0}}}shouldUpdate(e){if(!this._config)return!1;if(e.has("_config"))return!0;if(!e.has("hass"))return!0;const t=e.get("hass");if(!t)return!0;return(this.hass?.locale?.language||this.hass?.language||this.hass?.selectedLanguage)!==(t.locale?.language||t.language||t.selectedLanguage)||xe.some(({key:e})=>{const i=this._config[e];return!!i&&t.states[i]!==this.hass.states[i]})}_stateObj(e){const t=this._config[e];if(t&&this.hass)return this.hass.states[t]}_isDay(){const e=this._config.settings||{};if(!e.show_daynight)return!0;const t=this._stateObj("sun_entity");if(t)return"above_horizon"===t.state;const i=Ce(Se(this._stateObj("lux_entity")),e);return null==i||i>50}_recordPressure(e){if(null==e)return;const t=Date.now();this._pressureHistory.push({t:t,v:e});const i=t-108e5;this._pressureHistory=this._pressureHistory.filter(e=>e.t>=i)}_pressureTrend(e){const t=Number(this._config.settings.pressure_trend_threshold)||.3,i=Se(this._stateObj("pressure_trend_entity"));if(null!=i)return Ae(i,t)||{icon:"trend_steady",labelKey:"steady"};if(this._pressureHistory.length<2||null==e)return{icon:"trend_steady",labelKey:"steady"};const n=this._pressureHistory[0],s=Math.max((Date.now()-n.t)/36e5,.05);return Ae((e-n.v)/s,t)||{icon:"trend_steady",labelKey:"steady"}}_dewPoint(e,t){const i=Se(this._stateObj("dewpoint_entity"));return null!=i?i:function(e,t){if(null==e||null==t||t<=0)return null;const i=243.12,n=Math.log(t/100)+17.62*e/(i+e),s=i*n/(17.62-n);return Math.round(10*s)/10}(e,t)}_feelsLike(e){const t=Se(this._stateObj("apparent_temperature_entity"));if(null!=t)return{value:t,key:"apparent_temperature_entity",kind:"apparent"};const i=Se(this._stateObj("wind_chill_entity")),n=Se(this._stateObj("humidex_entity"));return null!=e&&e<=10&&null!=i?{value:i,key:"wind_chill_entity",kind:"wind_chill"}:null!=e&&e>=22&&null!=n?{value:n,key:"humidex_entity",kind:"humidex"}:null!=i?{value:i,key:"wind_chill_entity",kind:"wind_chill"}:null!=n?{value:n,key:"humidex_entity",kind:"humidex"}:null}_precipToday(){const e=this._stateObj("precipitation_entity");return e||this._stateObj("rain_today_entity")}_actionConfig(e){if(!(this._config.settings||{}).show_interactions)return;const t=this._config[e],i=this._config[`${e.replace("_entity","")}_action`];return{entity:t,tap_action:i?.tap_action||{action:"more-info"},hold_action:i?.hold_action,double_tap_action:i?.double_tap_action}}_handleClick(e){const t=this._actionConfig(e);t&&t.entity&&function(e,t,i){var n;i.tap_action&&(n=i.tap_action),me(e,t,i,n)}(this,this.hass,t)}_clickable(e){const t=this._actionConfig(e);return!(!t||!t.entity||!function(e){return void 0!==e&&"none"!==e.action}(t.tap_action)&&!t.tap_action)}render(){if(!this._config||!this.hass)return V;const e=this._config.settings||{},t=Se(this._stateObj("temperature_entity")),i=Se(this._stateObj("humidity_entity")),n=Be(this._stateObj("temperature_entity"),"°C");this._recordTemp(t);const s=this._isDay(),r=this._stateObj("rain_entity"),o=this._stateObj("rain_rate_entity"),a=!!r&&function(e){if(!e)return!1;const t=e.state;if(!0===t||1===t)return!0;if(!1===t||0===t)return!1;const i=String(t??"").toLowerCase().trim();if(!i||["unavailable","unknown","none","null"].includes(i))return!1;if(["off","false","dry","no","0"].includes(i))return!1;if(["on","true","wet","raining","detected","rain","rainy","yes","1"].includes(i))return!0;if(/\b(rain|wet|precip)/.test(i))return!0;const n=Number(t);return Number.isFinite(n)&&n>0}(r),l=String(r?.state??"").toLowerCase(),c=["on","off","true","false","wet","dry","detected","raining"].includes(l),d=Se(o)??(c?null:Se(r)),u=Ce(Se(this._stateObj("lux_entity")),e),h=Se(this._stateObj("uv_entity")),p=Te(t,n),_=a||null!=d&&d>0;let m;const y=this._stateObj("condition_entity"),g=y?function(e,t=!0){if(null==e||""===e||"unknown"===e||"unavailable"===e)return null;const i=String(e),n=i.toLowerCase();return/rain|drizzle|shower|pour|wet/.test(n)?{icon:"rainy",labelKey:"rain",raw:i}:/snow|sleet|blizzard|ice|hail/.test(n)?{icon:"snowy",labelKey:"snow",raw:i}:/storm|thunder|lightning/.test(n)?{icon:"rainy",labelKey:"rain",raw:i}:/fog|mist|haze/.test(n)?{icon:"cloudy",labelKey:"cloudy",raw:i}:/part|few|scatter|broken/.test(n)&&/cloud/.test(n)?{icon:"partly_cloudy",labelKey:"partly_cloudy",raw:i}:/cloud|overcast/.test(n)?{icon:"cloudy",labelKey:"cloudy",raw:i}:/clear|sunny|fair|sun/.test(n)?t?{icon:"sunny",labelKey:"clear_sky",raw:i}:{icon:"night",labelKey:"clear_night",raw:i}:/night/.test(n)?{icon:"night",labelKey:"clear_night",raw:i}:{icon:t?"partly_cloudy":"night",labelKey:"partly_cloudy",raw:i}}(y.state,s):null;if(g)m=g;else if(!e.show_daynight&&this._config.settings.manual_condition){m={sunny:{icon:"sunny",labelKey:"clear_sky"},cloudy:{icon:"cloudy",labelKey:"cloudy"},rainy:{icon:"rainy",labelKey:"rain"},night:{icon:"night",labelKey:"clear_night"}}[this._config.settings.manual_condition]||He({isDay:s,rainMm:d,rainOn:a,lux:u,uv:h,settings:e,tempC:p})}else m=He({isDay:s,rainMm:d,rainOn:a,lux:u,uv:h,settings:e,tempC:p});if(_){m={...Oe(p)||{icon:"rainy",labelKey:"rain"},raw:m?.raw}}else if(s&&null!=u){m={...He({isDay:s,rainMm:0,rainOn:!1,lux:u,uv:h,settings:e}),raw:m?.raw}}const f=e.hide_title||""===this._config.title?"":this._config.title&&"Weather Station"!==this._config.title?this._config.title:this._t("common.card_title");if(e.compass_only){const t=e.hide_title||""===this._config.title?"":this._config.title&&"Weather Station"!==this._config.title&&"Compass"!==this._config.title?this._config.title:this._t("common.compass_title");return G`
        <ha-card>
          <div class="wsc compass-only">
            ${t?G`<div class="title">${t}</div>`:V}
            ${this._renderCompassPanel()}
          </div>
        </ha-card>
      `}return G`
      <ha-card>
        <div class="wsc ${e.compact_mode?"compact":"full"}">
          ${f?G`<div class="title">${f}</div>`:V}

          ${this._renderHero(m,t,n,i,a,d)}
          ${this._renderSun()}

          ${e.compact_mode?V:G`<div class="grid">
                ${this._renderTiles(u,t,n,i,r,a,d,h)}
              </div>`}
        </div>
      </ha-card>
    `}_renderTiles(e,t,i,n,s,r,o,a){const l=this._normalizeTileOrder(this._config.settings?.tile_order),c={lux:()=>this._renderLux(e),temperature:()=>this._renderTemperature(t,i),feels_like:()=>this._renderFeelsLike(i),humidity:()=>this._renderHumidity(n),dewpoint:()=>this._renderDewpoint(t,i,n),rain:()=>this._renderRain(s,r,o,t,i),wind:()=>this._renderWind(),uv:()=>this._renderUv(a),pressure:()=>this._renderPressure(),heat_stress:()=>this._renderHeatStress(),battery:()=>this._renderBattery()};return l.map(e=>c[e]?c[e]():V)}_renderSun(){const e=this._config.settings||{};if(!e.show_sun)return V;const t=this._stateObj("sun_entity"),i=this._stateObj("azimuth_entity"),n=this._stateObj("elevation_entity"),s=this._stateObj("uv_entity");if(!t&&!i&&!n)return V;const r=t&&t.attributes||{},o=!t||"above_horizon"===t.state,a=Se(n)??Number(r.elevation),l=Se(i)??Number(r.azimuth),c=Se(s),d=Le(this.hass,r.next_rising),u=Le(this.hass,r.next_setting),h=tt(l,a,o,{sunAttrs:r,nowMs:Date.now()}),p=h.night,_=function(e=4.6){Je();const t=[],i=Math.max(12,Math.round(qe/e)),n=qe/i;for(let e=0;e<=i;e++){const i=e*n;let s=0;for(;s<Ue.length-1&&i>Ze[s]+Ie[s];)s++;const r=Math.min(1,(i-Ze[s])/Ie[s]),[o,a,l,c]=Ue[s],d=Pe(o,a,l,c,r);t.push({x:d.x,y:d.y,above:d.y<=60.001,g:i/qe})}return t}(),m=h.x/200*100+"%",y=(h.y-0)/84*100+"%",g=Number.isFinite(a)?`${je(a,1)}°`:"—",f=Number.isFinite(l)?`${je(l,0)}°`:"—",x=t?"sun_entity":i?"azimuth_entity":"elevation_entity",w=!1!==e.night_palette&&p;return G`
      <div
        class="sun-panel ${w?"night-palette":""} ${this._clickable(x)?"tappable":""}"
        @click=${()=>this._handleClick(x)}
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
            ${_.map(e=>{const t=e.g<=h.g,i=`dot ${e.above?"day":"night"} ${t?"past":"future"}`,n=e.above?t?1.6:1.3:t?1.5:1.2;return K`<circle class=${i} cx=${e.x} cy=${e.y} r=${n} />`})}
          </svg>

          <div class="sun-marker ${p?"night":"day"}"
            style="left:${m};top:${y}">
            ${vt(p?"night":"sunny","sun-marker-icon")}
          </div>

          <div class="sun-center">
            <div class="sun-stat">
              <div class="sun-stat-value">${g}</div>
              <div class="sun-stat-label">${this._t("sun.elevation")}</div>
            </div>
            <div class="sun-stat">
              <div class="sun-stat-value">${f}</div>
              <div class="sun-stat-label">${this._t("sun.azimuth")}</div>
            </div>
            ${null!=c?G`
                  <div class="sun-stat">
                    <div class="sun-stat-value">${je(c,0)}</div>
                    <div class="sun-stat-label">${this._t("sections.uv")}</div>
                  </div>
                `:V}
          </div>

          ${t?G`
                <div class="sun-edge" style="left:${"20%"}">
                  ${d||"—"}
                </div>
                <div class="sun-edge" style="left:${"80%"}">
                  ${u||"—"}
                </div>
              `:V}
        </div>
      </div>
    `}_todayMinMax(){const e=Se(this._stateObj("temperature_min_entity")),t=Se(this._stateObj("temperature_max_entity")),i=null!=e?e:this._tempStats?this._tempStats.min:null,n=null!=t?t:this._tempStats?this._tempStats.max:null;return null==i||null==n?null:{min:i,max:n}}_renderHero(e,t,i,n,s,r){const o=this._config.settings||{},a=o.show_dewpoint?this._dewPoint(t,n):null,l=o.show_feels_like?this._feelsLike(t):null,c=null==l?function(e,t){return null==e?null:e<0?"freezing":e<10?"cold":e>27&&null!=t&&t>60?"humid":e>30?"hot":e>=18&&e<=26?"comfortable":"mild"}(t,n):null,d=o.show_minmax?this._todayMinMax():null,u=this._heroRainParts(s,r);this._needleTarget=null;const h=this._t(`condition.${e.labelKey}`),p=null!=l||null!=c||null!=a||u&&(u.rate||u.today),_=e=>{e.stopPropagation(),this._handleClick(this._stateObj("rain_entity")?"rain_entity":this._stateObj("rain_rate_entity")?"rain_rate_entity":"rain_today_entity")},m=this._clickable("rain_entity")||this._clickable("rain_rate_entity")||this._clickable("rain_today_entity");return G`
      <div
        class="hero ${p?"has-side":""} ${this._clickable("temperature_entity")?"tappable":""}"
        @click=${()=>this._handleClick("temperature_entity")}
      >
        ${vt(e.icon,"hero-icon "+(!1!==o.animate_icons?"animated":""))}
        <div class="hero-main">
          <div class="hero-condition">${h}</div>
          <div class="hero-temp-row">
            <div class="hero-temp">
              ${null!=t?`${je(t,1)} ${i}`:"—"}
            </div>
            ${u?.status?G`<span
                  class="hero-rain-status ${u.wet?"wet":"dry"} ${m?"tappable":""}"
                  @click=${_}
                  >${u.status}</span
                >`:V}
          </div>
          ${d?G`<div class="hero-minmax">
                <span class="mm mm-min">
                  ${vt("arrow_down","mm-icon")}
                  ${je(d.min,1)}°
                </span>
                <span class="mm mm-max">
                  ${vt("arrow_up","mm-icon")}
                  ${je(d.max,1)}°
                </span>
              </div>`:V}
        </div>
        ${p?G`<div class="hero-side">
              ${l?G`<div class="hero-stat">
                    <div class="hero-stat-label">${this._t("sections.feels_like")}</div>
                    <div class="hero-stat-value">
                      ${je(l.value,1)} ${i}
                    </div>
                  </div>`:c?G`<div class="hero-stat">
                      <div class="hero-stat-value hero-stat-comfort">
                        ${this._t(`comfort.${c}`)}
                      </div>
                    </div>`:V}
              ${null!=a?G`<div class="hero-stat">
                    <div class="hero-stat-label">${this._t("sections.dewpoint")}</div>
                    <div class="hero-stat-value">${je(a,1)} ${i}</div>
                  </div>`:V}
              ${u&&(u.rate||u.today)?G`<div
                    class="hero-stat hero-stat-rain ${m?"tappable":""}"
                    @click=${_}
                  >
                    ${u.rate?G`<div class="hero-stat-value">${u.rate}</div>`:V}
                    ${u.today?G`<div class="hero-stat-label">${u.today}</div>`:V}
                  </div>`:V}
            </div>`:V}
      </div>
    `}_heroRainParts(e,t){const i=this._config.settings||{};if(!1===i.show_rain_hero)return null;const n=this._stateObj("rain_entity"),s=this._stateObj("rain_rate_entity"),r=i.show_rain_today?this._precipToday():null,o=Se(r),a=null!=t?t:Se(s);if(!n&&null==a&&null==o)return null;const l=Be(s||n,"mm/h"),c=Be(r,"mm");return{wet:!!e,status:n?e?this._t("rain.wet"):this._t("rain.dry"):null,rate:null!=a?`${je(a,1)} ${l}`:null,today:null!=o?`${this._t("rain.today")} ${je(o,1)} ${c}`:null}}_tile({icon:e,iconOpts:t,label:i,value:n,sub:s,key:r,accent:o}){const a=!!r&&this._clickable(r);return G`
      <div
        class="tile ${a?"tappable":""}"
        @click=${r?()=>this._handleClick(r):void 0}
      >
        <span class="tile-icon" style=${o?`--tile-accent:${o}`:""}>
          ${vt(e,"",t||{})}
        </span>
        <div class="tile-body">
          <div class="tile-label">${i}</div>
          <div class="tile-value">${n}</div>
          ${s?G`<div class="tile-sub">${s}</div>`:V}
        </div>
      </div>
    `}_renderLux(e){if(!this._stateObj("lux_entity"))return V;const t=function(e){return null==e?null:ke.find(t=>e<=t.max)||ke[ke.length-1]}(e);return this._tile({icon:t?t.icon:"lux_very_bright",label:this._t("sections.light"),value:Me(e),sub:t?this._t(`lux.${t.labelKey}`):"",key:"lux_entity"})}_renderTemperature(e,t){return this._stateObj("temperature_entity")?this._tile({icon:"thermometer",iconOpts:{value:e,unit:t},label:this._t("sections.temperature"),value:null!=e?`${je(e,1)} ${t}`:"—",key:"temperature_entity"}):V}_renderHumidity(e){return this._stateObj("humidity_entity")?this._tile({icon:"humidity",label:this._t("sections.humidity"),value:null!=e?`${je(e,0)}%`:"—",key:"humidity_entity"}):V}_renderFeelsLike(e){if(!(this._config.settings||{}).show_feels_like)return V;const t=Se(this._stateObj("temperature_entity")),i=this._feelsLike(t);if(!i)return V;const n=Be(this._stateObj(i.key),e);return this._tile({icon:"feels_like",iconOpts:{value:i.value,unit:n},label:this._t("sections.feels_like"),value:`${je(i.value,1)} ${n}`,key:i.key})}_renderDewpoint(e,t,i){if(!(this._config.settings||{}).show_dewpoint)return V;if(!(this._stateObj("dewpoint_entity")||this._stateObj("temperature_entity")&&this._stateObj("humidity_entity")))return V;const n=this._dewPoint(e,i),s=Be(this._stateObj("dewpoint_entity"),t);return this._tile({icon:"dewpoint",label:this._t("sections.dewpoint"),value:null!=n?`${je(n,1)} ${s}`:"—",key:this._stateObj("dewpoint_entity")?"dewpoint_entity":"temperature_entity"})}_renderHeatStress(){if(!(this._config.settings||{}).show_heat_stress)return V;const e=this._stateObj("heat_stress_entity");if(!e)return V;const t=Se(e);let i,n="moderate";return null!=t&&(t<25?(n="low",i="#4caf50"):t<50?(n="moderate",i="#ffb300"):t<75?(n="high",i="#fb8c00"):(n="extreme",i="#e53935")),this._tile({icon:"heat_stress",iconOpts:{value:t},label:this._t("sections.heat_stress"),value:null!=t?`${je(t,0)}%`:"—",sub:this._t(`heat_stress.${n}`),key:"heat_stress_entity",accent:i})}_renderRain(e,t,i,n,s){const r=this._config.settings||{},o=this._stateObj("rain_rate_entity"),a=r.show_rain_today?this._precipToday():null,l=Se(a);if(!e&&null==o&&null==l)return V;const c=Be(o||e,"mm/h"),d=Be(a,"mm"),u=null!=i?i:Se(o),h=null!=u?`${je(u,1)} ${c}`:"",p=t||null!=u&&u>0,_=Te(n,s),m=p?Oe(_)?.icon||"rainy":"cloudy";let y,g="";e&&(g=t?this._t("rain.wet"):this._t("rain.dry")),y=null!=u?h:g||(null!=l?`${je(l,1)} ${d}`:"—");const f=[];null!=u&&g&&f.push(g),null!=l&&f.push(`${this._t("rain.today")} ${je(l,1)} ${d}`);let x="";2===f.length?x=G`<span>${f[0]}</span><span class="dot">·</span
        ><span>${f[1]}</span>`:1===f.length&&(x=f[0]);const w=e?"rain_entity":o?"rain_rate_entity":this._stateObj("precipitation_entity")?"precipitation_entity":"rain_today_entity";return this._tile({icon:m,label:this._t("sections.rain"),value:y,sub:x,key:w,accent:p?"var(--info-color, #2196f3)":void 0})}_renderWind(){const e=this._stateObj("wind_speed_entity");if(!e)return V;const t=this._config.settings||{},i=Se(e),n=Be(e,"m/s"),s=Fe(Ee(Se(this._stateObj("wind_direction_entity")),t.invert_wind_direction)),r=s?this._t(`compass.${s}`):null,o=this._stateObj("wind_gust_entity"),a=Se(o),l=Be(o,n),c=t.show_beaufort?nt(it(i,n)):null,d=t.show_wind_gust&&null!=a,u=[];return r&&u.push(r),c&&u.push(this._t("wind.beaufort",{value:c.n})),c&&u.push(this._t(`beaufort.${c.key}`)),d&&u.push(this._t("wind.gust",{value:je(a,0),unit:l})),G`
      <div
        class="tile wind ${this._clickable("wind_speed_entity")?"tappable":""}"
        @click=${()=>this._handleClick("wind_speed_entity")}
      >
        ${vt("wind","tile-icon",{value:c?c.n:0})}
        <div class="tile-body">
          <div class="tile-label">${this._t("sections.wind")}</div>
          <div class="tile-value">
            ${null!=i?`${je(i,1)} ${n}`:"—"}
          </div>
          ${u.length?G`<div class="tile-sub">
                ${u.map((e,t)=>G`${t?G`<span class="dot">·</span>`:V}<span>${e}</span>`)}
              </div>`:V}
        </div>
      </div>
    `}_renderCompass(e,t,{large:i=!1}={}){const n=((Number(e)+180)%360+360)%360;this._needleTarget=n;const s=null!=this._needleCurrent?this._needleCurrent:n;return G`
      <div
        class="compass ${i?"lg":""}"
        title="${t||""} (${je(e,0)}°)"
      >
        <svg
          class="needle-svg"
          viewBox="0 0 100 100"
          style="transform: rotate(${s}deg) scale(0.7)"
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
            d="M50 16 L61 70 L50 61 L39 70 Z"
          ></path>
          <circle cx="50" cy="50" r="6.5" fill="url(#wsc-needle)"></circle>
          <circle cx="50" cy="50" r="2.8" fill="#fff" opacity="0.95"></circle>
        </svg>
        <span class="c-n">${this._t("compass.N")}</span>
        <span class="c-e">${this._t("compass.E")}</span>
        <span class="c-s">${this._t("compass.S")}</span>
        <span class="c-w">${this._t("compass.W")}</span>
      </div>
    `}_renderCompassPanel(){const e=this._config.settings||{},t=this._stateObj("wind_speed_entity"),i=Ee(Se(this._stateObj("wind_direction_entity")),e.invert_wind_direction);if(null==i&&!t)return this._needleTarget=null,G`<div class="compass-panel empty">
        ${this._t("common.compass_configure")}
      </div>`;null==i&&(this._needleTarget=null);const n=Se(t),s=Be(t,"m/s"),r=Fe(i),o=r?this._t(`compass.${r}`):null,a=this._stateObj("wind_gust_entity"),l=Se(a),c=Be(a,s),d=e.show_beaufort?nt(it(n,s)):null,u=e.show_wind_gust&&null!=l,h=[];return d&&h.push(this._t("wind.beaufort",{value:d.n})),d&&h.push(this._t(`beaufort.${d.key}`)),u&&h.push(this._t("wind.gust",{value:je(l,0),unit:c})),G`
      <div
        class="compass-panel ${this._clickable("wind_direction_entity")||this._clickable("wind_speed_entity")?"tappable":""}"
        @click=${()=>this._handleClick(this._config.wind_direction_entity?"wind_direction_entity":"wind_speed_entity")}
      >
        ${null!=i?this._renderCompass(i,o,{large:!0}):G`<div class="compass lg placeholder"></div>`}
        <div class="compass-panel-dir">${o||"—"}</div>
        <div class="compass-panel-deg">
          ${null!=i?`${je(i,0)}°`:"—"}
        </div>
        <div class="compass-panel-speed">
          ${null!=n?`${je(n,1)} ${s}`:"—"}
        </div>
        ${h.length?G`<div class="compass-panel-meta">
              ${h.map((e,t)=>G`${t?G`<span class="dot">·</span>`:V}<span>${e}</span>`)}
            </div>`:V}
      </div>
    `}_shortestAngleDelta(e,t){const i=(Number(e)%360+360)%360;return((Number(t)%360+360)%360-i+540)%360-180}_applyNeedleTransform(e){const t=this.renderRoot?.querySelector?.(".needle-svg");t&&(t.style.transform=`rotate(${e}deg) scale(0.7)`)}_stopNeedleAnimation(){this._needleRaf&&(cancelAnimationFrame(this._needleRaf),this._needleRaf=null),this._needleLastTs=null}_startNeedleAnimation(){if(this._needleRaf)return;const e="undefined"!=typeof window&&window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,t=i=>{const n=this._needleTarget;if(null==n)return this._needleRaf=null,void(this._needleLastTs=null);null==this._needleCurrent&&(this._needleCurrent=n);const s=this._needleLastTs??i,r=Math.min(48,Math.max(0,i-s));this._needleLastTs=i;const o=this._shortestAngleDelta(this._needleCurrent,n),a=1-Math.exp(-r/700);this._needleCurrent+=o*a;const l=.001*i,c=e?0:5*(.62*Math.sin(1.35*l)+.38*Math.sin(2.1*l+1.1));this._applyNeedleTransform(this._needleCurrent+c),this._needleRaf=requestAnimationFrame(t)};this._needleRaf=requestAnimationFrame(t)}_renderUv(e){if(!this._stateObj("uv_entity"))return V;const t=function(e){return null==e?null:$e.find(t=>e<=t.max)||$e[$e.length-1]}(e),i=null!=e?je(e,0):null;return this._tile({icon:"uv",iconOpts:{value:null!=i?i:"",color:t?t.color:"#ffb300"},label:this._t("sections.uv"),value:null!=i?`${i}`:"—",sub:t?this._t(`uv.${t.labelKey}`):"",key:"uv_entity",accent:t?t.color:void 0})}_renderPressure(){const e=this._stateObj("pressure_entity");if(!e)return V;const t=this._config.settings||{},i=Se(e),n=Be(e,"hPa");this._recordPressure(i);const s=t.show_pressure_trend?this._pressureTrend(i):null,r=Se(this._stateObj("pressure_trend_entity")),o=Be(this._stateObj("pressure_trend_entity"),"hPa/h"),a=null!=r&&Math.abs(r)>=.05?`${r>0?"+":""}${je(r,2)} ${o}`:"",l=/hpa|mbar|\bmb\b/i.test(n)?0:1;return this._tile({icon:"gauge",label:this._t("sections.pressure"),value:null!=i?`${je(i,l)} ${n}`:"—",sub:s?G`${this._t(`pressure.${s.labelKey}`)}${a?G`<span class="dot">·</span><span>${a}</span>`:V}`:a,key:"pressure_entity"})}_renderBattery(){const e=this._config.settings||{};if(!e.show_battery)return V;const t=this._stateObj("battery_entity"),i=e.show_voltage?this._stateObj("voltage_entity"):null,n=e.show_voltage?this._stateObj("capacitor_voltage_entity"):null;if(!t&&!i&&!n)return V;const s=Se(t);let r;null!=s&&s<15?r="var(--error-color, #e53935)":null!=s&&s<40&&(r="var(--warning-color, #ffa726)");const o=Se(i),a=Be(i,"mV");let l="";null!=o&&(l="mv"===a.toLowerCase()||o>=1e3?`${je(o/1e3,2)} V`:`${je(o,0)} ${a}`);const c=Se(n),d=Be(n,"V"),u=null!=c?`${this._t("battery.capacitor")} ${je(c,2)} ${d}`:"";let h="";return h=l&&u?G`<span>${l}</span><span class="dot">·</span
        ><span>${u}</span>`:l||u,this._tile({icon:ze(s),label:this._t("sections.battery"),value:null!=s?`${je(s,0)}%`:l||(null!=c?`${je(c,2)} ${d}`:"—"),sub:null!=s?h:u&&l?u:"",key:t?"battery_entity":i?"voltage_entity":"capacitor_voltage_entity",accent:r})}static get styles(){return r`
      :host {
        --wsc-radius: 18px;
        --wsc-gap: 10px;
        /* Derive muted text from primary so contrast stays OK in light & dark themes
           even when --secondary-text-color is too dark for nested card surfaces. */
        --wsc-muted-text: color-mix(
          in srgb,
          var(--primary-text-color, #fff) 78%,
          transparent
        );
        container-type: inline-size;
        container-name: wsc;
        display: block;
        color: var(--primary-text-color);
      }
      ha-card {
        overflow: hidden;
      }
      .wsc {
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 0;
      }
      .wsc.full {
        gap: 8px;
      }
      .wsc.compact {
        gap: 6px;
        padding: 10px;
      }
      @container wsc (min-width: 520px) {
        .wsc.full {
          padding: 12px;
          gap: 10px;
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
        grid-template-columns: auto minmax(0, 1fr);
        align-items: center;
        gap: 14px 18px;
        padding: 18px 20px;
        border-radius: var(--wsc-radius);
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .hero.has-side {
        grid-template-columns: auto minmax(0, 1.2fr) minmax(110px, 0.9fr);
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
        width: 56px;
        height: 56px;
        align-self: center;
        overflow: visible;
      }
      .hero-icon.animated .icon-spin {
        transform-box: view-box;
        animation: wsc-spin 18s linear infinite;
      }
      .hero-icon.animated .icon-spin-slow {
        animation-duration: 28s;
      }
      .hero-icon.animated .icon-drift {
        animation: wsc-drift 5.5s ease-in-out infinite;
      }
      .hero-icon.animated .icon-drop {
        transform-box: fill-box;
        transform-origin: center top;
        animation: wsc-drop 1s linear infinite;
        will-change: transform, opacity;
      }
      @keyframes wsc-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes wsc-drift {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(3px); }
      }
      @keyframes wsc-drop {
        0% { transform: translate3d(0, -16px, 0); opacity: 0; }
        10% { opacity: 0.95; }
        90% { opacity: 0.95; }
        100% { transform: translate3d(0, 24px, 0); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .hero-icon.animated .icon-spin,
        .hero-icon.animated .icon-drift,
        .hero-icon.animated .icon-drop {
          animation: none;
        }
      }
      .hero-main {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }
      .hero-condition {
        font-size: 0.95rem;
        color: var(--wsc-muted-text, var(--secondary-text-color));
      }
      .hero-temp-row {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 8px 14px;
      }
      .hero-temp {
        font-size: 2.15rem;
        font-weight: 650;
        line-height: 1.05;
        color: var(--primary-text-color);
        letter-spacing: -0.02em;
      }
      .hero-rain-status {
        font-size: 1rem;
        font-weight: 650;
        line-height: 1.2;
        padding: 3px 10px;
        border-radius: 999px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        color: var(--primary-text-color);
      }
      .hero-rain-status.wet {
        color: var(--info-color, #2196f3);
        border-color: color-mix(in srgb, var(--info-color, #2196f3) 45%, transparent);
        background: color-mix(in srgb, var(--info-color, #2196f3) 14%, transparent);
      }
      .hero-rain-status.dry {
        color: var(--wsc-muted-text, var(--secondary-text-color));
      }
      .hero-minmax {
        display: flex;
        gap: 12px;
        margin-top: 4px;
        font-size: 0.95rem;
        font-weight: 550;
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
      .hero-side {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        gap: 10px;
        min-width: 0;
        text-align: right;
        padding-left: 8px;
        border-left: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      }
      .hero-stat {
        display: flex;
        flex-direction: column;
        gap: 1px;
        min-width: 0;
      }
      .hero-stat-label {
        font-size: 0.72rem;
        font-weight: 550;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: var(--wsc-muted-text, var(--secondary-text-color));
      }
      .hero-stat-value {
        font-size: 1.05rem;
        font-weight: 650;
        line-height: 1.15;
        color: var(--primary-text-color);
      }
      .hero-stat-comfort {
        font-size: 0.92rem;
        font-weight: 550;
      }
      .hero-stat-rain .hero-stat-label {
        text-transform: none;
        letter-spacing: 0;
        font-size: 0.8rem;
        font-weight: 500;
      }
      .dot {
        margin: 0 3px;
        opacity: 0.6;
      }

      /* Sun path panel — same surface as hero / tiles in light and dark mode */
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
      /* Night palette: cooler path colours only — panel chrome stays like other boxes. */
      .sun-panel.night-palette {
        --wsc-night-color: #5b7fd6;
      }
      .sun-panel.night-palette .dot.day.past {
        fill: #e8961e;
        opacity: 1;
      }
      .sun-panel.night-palette .dot.day.future {
        fill: #c4a06a;
        opacity: 0.35;
      }
      .sun-panel.night-palette .dot.night.past {
        fill: #5b7fd6;
        opacity: 1;
      }
      .sun-panel.night-palette .dot.night.future {
        opacity: 0.4;
      }
      .sun-panel.night-palette .sun-horizon {
        stroke: var(--primary-text-color, #3a3a3a);
        stroke-opacity: 0.35;
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
          rgba(255, 177, 0, 0.35) 0%,
          rgba(255, 177, 0, 0.12) 45%,
          rgba(255, 177, 0, 0) 72%
        );
        box-shadow: 0 0 12px rgba(255, 177, 0, 0.45);
      }
      .sun-marker .wsc-icon,
      .sun-marker-icon {
        width: 30px;
        height: 30px;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
      }
      .sun-marker.night {
        background: radial-gradient(
          circle,
          rgba(91, 127, 214, 0.3) 0%,
          rgba(91, 127, 214, 0.1) 45%,
          rgba(91, 127, 214, 0) 72%
        );
        box-shadow: 0 0 12px rgba(91, 127, 214, 0.4);
      }
      .sun-marker.night .wsc-icon,
      .sun-marker.night .sun-marker-icon {
        width: 26px;
        height: 26px;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
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
        color: var(--wsc-muted-text, var(--secondary-text-color));
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
        gap: 6px;
        min-width: 0;
      }
      /* Prefer 2 columns in typical phone / half-width panels so labels fit.
         3+ columns only when each tile has enough room. */
      @container wsc (max-width: 300px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
      @container wsc (min-width: 640px) {
        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
      @container wsc (min-width: 920px) {
        .grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
        }
      }
      @container wsc (max-width: 560px) {
        .tile {
          gap: 7px;
          padding: 8px 9px;
          align-items: center;
        }
        .tile-icon,
        .tile-icon .wsc-icon {
          width: 22px;
          height: 22px;
          margin-top: 0;
        }
        .tile-label {
          font-size: 0.62rem;
          letter-spacing: 0.02em;
        }
        .tile-value {
          font-size: 0.92rem;
        }
        .tile-sub {
          font-size: 0.7rem;
          line-height: 1.2;
        }
        .sun-panel {
          padding: 4px 8px 6px;
        }
        .sun-center {
          gap: 10px;
          top: 40%;
        }
        .sun-stat-value {
          font-size: 0.9rem;
        }
        .sun-stat-label {
          font-size: 0.58rem;
        }
        .sun-edge {
          font-size: 0.85rem;
        }
      }
      @container wsc (max-width: 520px) {
        .hero.has-side {
          grid-template-columns: auto minmax(0, 1fr);
        }
        .hero-side {
          grid-column: 2;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: flex-start;
          text-align: left;
          gap: 10px 18px;
          padding-left: 0;
          border-left: none;
          padding-top: 2px;
        }
        .hero-stat {
          min-width: 72px;
        }
      }
      @container wsc (max-width: 420px) {
        .hero {
          gap: 10px 12px;
          padding: 14px;
        }
        .hero-icon {
          width: 44px;
          height: 44px;
        }
        .hero-temp {
          font-size: 1.75rem;
        }
        .hero-rain-status {
          font-size: 0.88rem;
          padding: 2px 8px;
        }
        .hero-stat-value {
          font-size: 0.95rem;
        }
      }
      /* Fallback when container queries are unavailable */
      @supports not (container-type: inline-size) {
        @media (max-width: 360px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 680px) {
          .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 960px) {
          .grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
      }

      .tile {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border-radius: 14px;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.08));
        min-height: 0;
        min-width: 0;
        overflow: hidden;
        box-sizing: border-box;
      }
      .tile-icon {
        width: 24px;
        height: 24px;
        color: var(--tile-accent, var(--state-icon-color, var(--primary-color)));
        flex: 0 0 auto;
      }
      .tile-icon .wsc-icon {
        width: 24px;
        height: 24px;
      }
      .tile-body {
        display: flex;
        flex-direction: column;
        gap: 1px;
        min-width: 0;
        flex: 1 1 auto;
        overflow: hidden;
      }
      .tile-label {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.02em;
        line-height: 1.15;
        color: var(--wsc-muted-text, var(--secondary-text-color));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-value {
        font-size: 0.98rem;
        font-weight: 600;
        line-height: 1.2;
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-sub {
        font-size: 0.72rem;
        color: var(--wsc-muted-text, var(--secondary-text-color));
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 2px 4px;
        line-height: 1.2;
        white-space: normal;
        overflow: hidden;
      }
      .mini-icon {
        width: 14px;
        height: 14px;
      }

      .compass {
        position: relative;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        flex: 0 0 auto;
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.15));
        color: var(--wsc-muted-text, var(--secondary-text-color));
        font-size: 0.6rem;
      }
      .compass.lg {
        width: min(70vw, 220px);
        height: min(70vw, 220px);
        font-size: 1rem;
        font-weight: 600;
        box-shadow: inset 0 0 0 1.5px var(--divider-color, rgba(0, 0, 0, 0.18));
      }
      .compass.lg.placeholder {
        opacity: 0.35;
      }
      .compass .needle-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        transform-origin: 50% 50%;
        pointer-events: none;
        overflow: visible;
        z-index: 1;
        will-change: transform;
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
      .compass.lg .c-n { top: 18px; }
      .compass.lg .c-s { top: calc(100% - 18px); }
      .compass.lg .c-e { left: calc(100% - 18px); }
      .compass.lg .c-w { left: 18px; }

      .compass-only {
        padding: 8px 12px 16px;
      }
      .compass-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 12px 8px 8px;
        text-align: center;
      }
      .compass-panel.empty {
        padding: 28px 16px;
        color: var(--wsc-muted-text, var(--secondary-text-color));
        font-size: 0.9rem;
      }
      .compass-panel-dir {
        margin-top: 8px;
        font-size: 1.75rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        line-height: 1.1;
      }
      .compass-panel-deg {
        font-size: 1rem;
        color: var(--wsc-muted-text, var(--secondary-text-color));
      }
      .compass-panel-speed {
        margin-top: 4px;
        font-size: 1.35rem;
        font-weight: 650;
      }
      .compass-panel-meta {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px 6px;
        font-size: 0.85rem;
        color: var(--wsc-muted-text, var(--secondary-text-color));
      }
      .compass-panel-meta .dot {
        opacity: 0.55;
      }

      .tappable {
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .tappable:hover {
        background: var(--divider-color, rgba(0, 0, 0, 0.08));
      }
    `}}customElements.get(ye)||customElements.define(ye,$t);class kt extends $t{static getStubConfig(){return{type:`custom:${fe}`,title:"Compass",wind_direction_entity:"",wind_speed_entity:"",settings:{compass_only:!0,show_beaufort:!0,show_wind_gust:!0,invert_wind_direction:!1,show_interactions:!0}}}setConfig(e){super.setConfig({...e,type:e?.type||`custom:${fe}`,settings:{...e?.settings||{},compass_only:!0}})}}customElements.get(fe)||customElements.define(fe,kt),window.customCards=window.customCards||[],window.customCards.find(e=>e.type===ye)||window.customCards.push({type:ye,name:"Weather Station Card",description:"A modern, Mushroom-inspired weather station card.",preview:!0,documentationURL:"https://github.com/H3ss3ltje/lovelace-weather-station-card"}),window.customCards.find(e=>e.type===fe)||window.customCards.push({type:fe,name:"Weather Station Compass",description:"Large standalone wind compass with smooth needle.",preview:!0,documentationURL:"https://github.com/H3ss3ltje/lovelace-weather-station-card"}),console.info("%c WEATHER-STATION-CARD %c v1.8.9 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{$t as WeatherStationCard,kt as WeatherStationCompassCard};
