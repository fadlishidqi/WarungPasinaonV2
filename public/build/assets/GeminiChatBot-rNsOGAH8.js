import{r as h,j as c}from"./app-Bn18S2az.js";import{M as ge,i as me,u as re,P as pe,a as Ee,b as Ce,L as ve,m as F}from"./proxy-BtnhdsBh.js";class ye extends h.Component{getSnapshotBeforeUpdate(t){const n=this.props.childRef.current;if(n&&t.isPresent&&!this.props.isPresent){const s=n.offsetParent,o=me(s)&&s.offsetWidth||0,i=this.props.sizeRef.current;i.height=n.offsetHeight||0,i.width=n.offsetWidth||0,i.top=n.offsetTop,i.left=n.offsetLeft,i.right=o-i.width-i.left}return null}componentDidUpdate(){}render(){return this.props.children}}function _e({children:e,isPresent:t,anchorX:n,root:s}){const o=h.useId(),i=h.useRef(null),a=h.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:r}=h.useContext(ge);return h.useInsertionEffect(()=>{const{width:u,height:g,top:C,left:m,right:l}=a.current;if(t||!i.current||!u||!g)return;const d=n==="left"?`left: ${m}`:`right: ${l}`;i.current.dataset.motionPopId=o;const f=document.createElement("style");r&&(f.nonce=r);const E=s??document.head;return E.appendChild(f),f.sheet&&f.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${g}px !important;
            ${d}px !important;
            top: ${C}px !important;
          }
        `),()=>{E.removeChild(f),E.contains(f)&&E.removeChild(f)}},[t]),c.jsx(ye,{isPresent:t,childRef:i,sizeRef:a,children:h.cloneElement(e,{ref:i})})}const xe=({children:e,initial:t,isPresent:n,onExitComplete:s,custom:o,presenceAffectsLayout:i,mode:a,anchorX:r,root:u})=>{const g=re(be),C=h.useId();let m=!0,l=h.useMemo(()=>(m=!1,{id:C,initial:t,isPresent:n,custom:o,onExitComplete:d=>{g.set(d,!0);for(const f of g.values())if(!f)return;s&&s()},register:d=>(g.set(d,!1),()=>g.delete(d))}),[n,g,s]);return i&&m&&(l={...l}),h.useMemo(()=>{g.forEach((d,f)=>g.set(f,!1))},[n]),h.useEffect(()=>{!n&&!g.size&&s&&s()},[n]),a==="popLayout"&&(e=c.jsx(_e,{isPresent:n,anchorX:r,root:u,children:e})),c.jsx(pe.Provider,{value:l,children:e})};function be(){return new Map}const k=e=>e.key||"";function B(e){const t=[];return h.Children.forEach(e,n=>{h.isValidElement(n)&&t.push(n)}),t}const we=({children:e,custom:t,initial:n=!0,onExitComplete:s,presenceAffectsLayout:o=!0,mode:i="sync",propagate:a=!1,anchorX:r="left",root:u})=>{const[g,C]=Ee(a),m=h.useMemo(()=>B(e),[e]),l=a&&!g?[]:m.map(k),d=h.useRef(!0),f=h.useRef(m),E=re(()=>new Map),[H,L]=h.useState(m),[w,D]=h.useState(m);Ce(()=>{d.current=!1,f.current=m;for(let _=0;_<w.length;_++){const v=k(w[_]);l.includes(v)?E.delete(v):E.get(v)!==!0&&E.set(v,!1)}},[w,l.length,l.join("-")]);const p=[];if(m!==H){let _=[...m];for(let v=0;v<w.length;v++){const R=w[v],b=k(R);l.includes(b)||(_.splice(v,0,R),p.push(R))}return i==="wait"&&p.length&&(_=p),D(B(_)),L(m),null}const{forceRender:x}=h.useContext(ve);return c.jsx(c.Fragment,{children:w.map(_=>{const v=k(_),R=a&&!g?!1:m===w||l.includes(v),b=()=>{if(E.has(v))E.set(v,!0);else return;let G=!0;E.forEach(he=>{he||(G=!1)}),G&&(x==null||x(),D(f.current),a&&(C==null||C()),s&&s())};return c.jsx(xe,{isPresent:R,initial:!d.current||n?void 0:!1,custom:t,presenceAffectsLayout:o,mode:i,root:u,onExitComplete:R?void 0:b,anchorX:r,children:_},v)})})};var K;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(K||(K={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var P;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(P||(P={}));var Y;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(Y||(Y={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q=["user","model","function","system"];var V;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",e.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(V||(V={}));var W;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(W||(W={}));var J;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(J||(J={}));var z;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(z||(z={}));var S;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.BLOCKLIST="BLOCKLIST",e.PROHIBITED_CONTENT="PROHIBITED_CONTENT",e.SPII="SPII",e.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",e.OTHER="OTHER"})(S||(S={}));var X;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(X||(X={}));var Q;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(Q||(Q={}));var Z;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(Z||(Z={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class A extends y{constructor(t,n){super(t),this.response=n}}class ce extends y{constructor(t,n,s,o){super(t),this.status=n,this.statusText=s,this.errorDetails=o}}class O extends y{}class le extends y{}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Re="https://generativelanguage.googleapis.com",Ie="v1beta",Oe="0.24.1",Ne="genai-js";var N;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(N||(N={}));class Ae{constructor(t,n,s,o,i){this.model=t,this.task=n,this.apiKey=s,this.stream=o,this.requestOptions=i}toString(){var t,n;const s=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||Ie;let i=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||Re}/${s}/${this.model}:${this.task}`;return this.stream&&(i+="?alt=sse"),i}}function Se(e){const t=[];return e!=null&&e.apiClient&&t.push(e.apiClient),t.push(`${Ne}/${Oe}`),t.join(" ")}async function Te(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",Se(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let s=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(o){throw new O(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${o.message}`)}for(const[o,i]of s.entries()){if(o==="x-goog-api-key")throw new O(`Cannot set reserved header name ${o}`);if(o==="x-goog-api-client")throw new O(`Header name ${o} can only be set using the apiClient field`);n.append(o,i)}}return n}async function Me(e,t,n,s,o,i){const a=new Ae(e,t,n,s,i);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},Ge(i)),{method:"POST",headers:await Te(a),body:o})}}async function j(e,t,n,s,o,i={},a=fetch){const{url:r,fetchOptions:u}=await Me(e,t,n,s,o,i);return je(r,u,a)}async function je(e,t,n=fetch){let s;try{s=await n(e,t)}catch(o){Le(o,e)}return s.ok||await De(s,e),s}function Le(e,t){let n=e;throw n.name==="AbortError"?(n=new le(`Request aborted when fetching ${t.toString()}: ${e.message}`),n.stack=e.stack):e instanceof ce||e instanceof O||(n=new y(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function De(e,t){let n="",s;try{const o=await e.json();n=o.error.message,o.error.details&&(n+=` ${JSON.stringify(o.error.details)}`,s=o.error.details)}catch{}throw new ce(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,s)}function Ge(e){const t={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const n=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),U(e.candidates[0]))throw new A(`${I(e)}`,e);return ke(e)}else if(e.promptFeedback)throw new A(`Text not available. ${I(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),U(e.candidates[0]))throw new A(`${I(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),ee(e)[0]}else if(e.promptFeedback)throw new A(`Function call not available. ${I(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),U(e.candidates[0]))throw new A(`${I(e)}`,e);return ee(e)}else if(e.promptFeedback)throw new A(`Function call not available. ${I(e)}`,e)},e}function ke(e){var t,n,s,o;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const a of(o=(s=e.candidates)===null||s===void 0?void 0:s[0].content)===null||o===void 0?void 0:o.parts)a.text&&i.push(a.text),a.executableCode&&i.push("\n```"+a.executableCode.language+`
`+a.executableCode.code+"\n```\n"),a.codeExecutionResult&&i.push("\n```\n"+a.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}function ee(e){var t,n,s,o;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const a of(o=(s=e.candidates)===null||s===void 0?void 0:s[0].content)===null||o===void 0?void 0:o.parts)a.functionCall&&i.push(a.functionCall);if(i.length>0)return i}const Ue=[S.RECITATION,S.SAFETY,S.LANGUAGE];function U(e){return!!e.finishReason&&Ue.includes(e.finishReason)}function I(e){var t,n,s;let o="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)o+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(o+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(o+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((s=e.candidates)===null||s===void 0)&&s[0]){const i=e.candidates[0];U(i)&&(o+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(o+=`: ${i.finishMessage}`))}return o}function T(e){return this instanceof T?(this.v=e,this):new T(e)}function He(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=n.apply(e,t||[]),o,i=[];return o={},a("next"),a("throw"),a("return"),o[Symbol.asyncIterator]=function(){return this},o;function a(l){s[l]&&(o[l]=function(d){return new Promise(function(f,E){i.push([l,d,f,E])>1||r(l,d)})})}function r(l,d){try{u(s[l](d))}catch(f){m(i[0][3],f)}}function u(l){l.value instanceof T?Promise.resolve(l.value.v).then(g,C):m(i[0][2],l)}function g(l){r("next",l)}function C(l){r("throw",l)}function m(l,d){l(d),i.shift(),i.length&&r(i[0][0],i[0][1])}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const te=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function $e(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=Ke(t),[s,o]=n.tee();return{stream:Be(s),response:Fe(o)}}async function Fe(e){const t=[],n=e.getReader();for(;;){const{done:s,value:o}=await n.read();if(s)return $(Pe(t));t.push(o)}}function Be(e){return He(this,arguments,function*(){const n=e.getReader();for(;;){const{value:s,done:o}=yield T(n.read());if(o)break;yield yield T($(s))}})}function Ke(e){const t=e.getReader();return new ReadableStream({start(s){let o="";return i();function i(){return t.read().then(({value:a,done:r})=>{if(r){if(o.trim()){s.error(new y("Failed to parse stream"));return}s.close();return}o+=a;let u=o.match(te),g;for(;u;){try{g=JSON.parse(u[1])}catch{s.error(new y(`Error parsing JSON response: "${u[1]}"`));return}s.enqueue(g),o=o.substring(u[0].length),u=o.match(te)}return i()}).catch(a=>{let r=a;throw r.stack=a.stack,r.name==="AbortError"?r=new le("Request aborted when reading from the stream"):r=new y("Error reading from the stream"),r})}}})}function Pe(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const s of e){if(s.candidates){let o=0;for(const i of s.candidates)if(n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:o}),n.candidates[o].citationMetadata=i.citationMetadata,n.candidates[o].groundingMetadata=i.groundingMetadata,n.candidates[o].finishReason=i.finishReason,n.candidates[o].finishMessage=i.finishMessage,n.candidates[o].safetyRatings=i.safetyRatings,i.content&&i.content.parts){n.candidates[o].content||(n.candidates[o].content={role:i.content.role||"user",parts:[]});const a={};for(const r of i.content.parts)r.text&&(a.text=r.text),r.functionCall&&(a.functionCall=r.functionCall),r.executableCode&&(a.executableCode=r.executableCode),r.codeExecutionResult&&(a.codeExecutionResult=r.codeExecutionResult),Object.keys(a).length===0&&(a.text=""),n.candidates[o].content.parts.push(a)}o++}s.usageMetadata&&(n.usageMetadata=s.usageMetadata)}return n}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function de(e,t,n,s){const o=await j(t,N.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),s);return $e(o)}async function ue(e,t,n,s){const i=await(await j(t,N.GENERATE_CONTENT,e,!1,JSON.stringify(n),s)).json();return{response:$(i)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function M(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return Ye(t)}function Ye(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let s=!1,o=!1;for(const i of e)"functionResponse"in i?(n.parts.push(i),o=!0):(t.parts.push(i),s=!0);if(s&&o)throw new y("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!o)throw new y("No content is provided for sending chat message.");return s?t:n}function qe(e,t){var n;let s={model:t==null?void 0:t.model,generationConfig:t==null?void 0:t.generationConfig,safetySettings:t==null?void 0:t.safetySettings,tools:t==null?void 0:t.tools,toolConfig:t==null?void 0:t.toolConfig,systemInstruction:t==null?void 0:t.systemInstruction,cachedContent:(n=t==null?void 0:t.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const o=e.generateContentRequest!=null;if(e.contents){if(o)throw new O("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=e.contents}else if(o)s=Object.assign(Object.assign({},s),e.generateContentRequest);else{const i=M(e);s.contents=[i]}return{generateContentRequest:s}}function ne(e){let t;return e.contents?t=e:t={contents:[M(e)]},e.systemInstruction&&(t.systemInstruction=fe(e.systemInstruction)),t}function Ve(e){return typeof e=="string"||Array.isArray(e)?{content:M(e)}:e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const se=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],We={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function Je(e){let t=!1;for(const n of e){const{role:s,parts:o}=n;if(!t&&s!=="user")throw new y(`First content should be with role 'user', got ${s}`);if(!q.includes(s))throw new y(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(q)}`);if(!Array.isArray(o))throw new y("Content should have 'parts' property with an array of Parts");if(o.length===0)throw new y("Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const r of o)for(const u of se)u in r&&(i[u]+=1);const a=We[s];for(const r of se)if(!a.includes(r)&&i[r]>0)throw new y(`Content with role '${s}' can't contain '${r}' part`);t=!0}}function oe(e){var t;if(e.candidates===void 0||e.candidates.length===0)return!1;const n=(t=e.candidates[0])===null||t===void 0?void 0:t.content;if(n===void 0||n.parts===void 0||n.parts.length===0)return!1;for(const s of n.parts)if(s===void 0||Object.keys(s).length===0||s.text!==void 0&&s.text==="")return!1;return!0}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ie="SILENT_ERROR";class ze{constructor(t,n,s,o={}){this.model=n,this.params=s,this._requestOptions=o,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,s!=null&&s.history&&(Je(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var s,o,i,a,r,u;await this._sendPromise;const g=M(t),C={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(o=this.params)===null||o===void 0?void 0:o.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(u=this.params)===null||u===void 0?void 0:u.cachedContent,contents:[...this._history,g]},m=Object.assign(Object.assign({},this._requestOptions),n);let l;return this._sendPromise=this._sendPromise.then(()=>ue(this._apiKey,this.model,C,m)).then(d=>{var f;if(oe(d.response)){this._history.push(g);const E=Object.assign({parts:[],role:"model"},(f=d.response.candidates)===null||f===void 0?void 0:f[0].content);this._history.push(E)}else{const E=I(d.response);E&&console.warn(`sendMessage() was unsuccessful. ${E}. Inspect response object for details.`)}l=d}).catch(d=>{throw this._sendPromise=Promise.resolve(),d}),await this._sendPromise,l}async sendMessageStream(t,n={}){var s,o,i,a,r,u;await this._sendPromise;const g=M(t),C={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(o=this.params)===null||o===void 0?void 0:o.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(u=this.params)===null||u===void 0?void 0:u.cachedContent,contents:[...this._history,g]},m=Object.assign(Object.assign({},this._requestOptions),n),l=de(this._apiKey,this.model,C,m);return this._sendPromise=this._sendPromise.then(()=>l).catch(d=>{throw new Error(ie)}).then(d=>d.response).then(d=>{if(oe(d)){this._history.push(g);const f=Object.assign({},d.candidates[0].content);f.role||(f.role="model"),this._history.push(f)}else{const f=I(d);f&&console.warn(`sendMessageStream() was unsuccessful. ${f}. Inspect response object for details.`)}}).catch(d=>{d.message!==ie&&console.error(d)}),l}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xe(e,t,n,s){return(await j(t,N.COUNT_TOKENS,e,!1,JSON.stringify(n),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qe(e,t,n,s){return(await j(t,N.EMBED_CONTENT,e,!1,JSON.stringify(n),s)).json()}async function Ze(e,t,n,s){const o=n.requests.map(a=>Object.assign(Object.assign({},a),{model:t}));return(await j(t,N.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:o}),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(t,n,s={}){this.apiKey=t,this._requestOptions=s,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=fe(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var s;const o=ne(t),i=Object.assign(Object.assign({},this._requestOptions),n);return ue(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},o),i)}async generateContentStream(t,n={}){var s;const o=ne(t),i=Object.assign(Object.assign({},this._requestOptions),n);return de(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},o),i)}startChat(t){var n;return new ze(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const s=qe(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),o=Object.assign(Object.assign({},this._requestOptions),n);return Xe(this.apiKey,this.model,s,o)}async embedContent(t,n={}){const s=Ve(t),o=Object.assign(Object.assign({},this._requestOptions),n);return Qe(this.apiKey,this.model,s,o)}async batchEmbedContents(t,n={}){const s=Object.assign(Object.assign({},this._requestOptions),n);return Ze(this.apiKey,this.model,t,s)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new y("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new ae(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,s){if(!t.name)throw new O("Cached content must contain a `name` field.");if(!t.model)throw new O("Cached content must contain a `model` field.");const o=["model","systemInstruction"];for(const a of o)if(n!=null&&n[a]&&t[a]&&(n==null?void 0:n[a])!==t[a]){if(a==="model"){const r=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,u=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(r===u)continue}throw new O(`Different value for "${a}" specified in modelParams (${n[a]}) and cachedContent (${t[a]})`)}const i=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new ae(this.apiKey,i,s)}}const st=({position:e="bottom-right"})=>{const t="AIzaSyDf0ayxNa5vhgZXlDq7l6NF4tmKidm64pE",[n,s]=h.useState(!1),[o,i]=h.useState([{role:"model",text:"Halo! Saya WarungPasinaonBot, pustakawan digital di TBM Warung Pasinaon. Ada yang bisa saya bantu?",timestamp:new Date,isComplete:!0}]),[a,r]=h.useState(""),[u,g]=h.useState(!1),[C,m]=h.useState(!1),l=h.useRef(null),d=h.useRef(null),f=h.useRef(null);h.useEffect(()=>{d.current=new et(t),f.current=d.current.getGenerativeModel({model:"gemini-2.0-flash-exp",systemInstruction:`Kamu adalah WarungPasinaonBot, pustakawan digital di TBM Warung Pasinaon. Tugasmu:
- Menjawab pertanyaan tentang koleksi buku
- Memberi rekomendasi bacaan sesuai umur dan minat
- Menjelaskan aturan peminjaman dan jam operasional
- Mendorong budaya literasi dengan ide kreatif

Gaya bahasa:
- Gunakan bahasa Indonesia santun dan mudah dipahami
- Sisipkan istilah Jawa ringan seperti "monggo" atau "nuwun sewu"
- Berikan respons lengkap dalam satu kali kirim`})},[t]),h.useEffect(()=>{E()},[o]);const E=()=>{var p;(p=l.current)==null||p.scrollIntoView({behavior:"smooth"})},H=async p=>{if(f.current)try{g(!0),m(!0);const x=o.filter(b=>b.isComplete&&b!==o[0]).map(b=>({role:b.role,parts:[{text:b.text}]})),R=(await f.current.startChat({history:x,generationConfig:{maxOutputTokens:1e3,temperature:.7}}).sendMessage(p)).response.text();setTimeout(()=>{m(!1);const b={role:"model",text:R,timestamp:new Date,isComplete:!0};i(G=>[...G,b])},1e3)}catch(x){console.error("Error generating response:",x),setTimeout(()=>{m(!1);const _={role:"model",text:"Nuwun sewu, terjadi kesalahan. Monggo dicoba lagi nanti ya! 🙏",timestamp:new Date,isComplete:!0};i(v=>[...v,_])},1e3)}finally{g(!1)}},L=async()=>{if(!a.trim()||u)return;const p={role:"user",text:a,timestamp:new Date,isComplete:!0};i(x=>[...x,p]),r(""),await H(a)},w=p=>{p.key==="Enter"&&!p.shiftKey&&(p.preventDefault(),L())},D={"bottom-right":"bottom-4 right-4 sm:bottom-6 sm:right-6","bottom-left":"bottom-4 left-4 sm:bottom-6 sm:left-6"};return c.jsx("div",{className:`fixed ${D[e]} z-[9999]`,style:{zIndex:9999},children:c.jsx(we,{children:n?c.jsxs(F.div,{className:`\r
                            bg-white border border-gray-200 shadow-xl\r
                            rounded-lg overflow-hidden\r
                            fixed inset-x-4 bottom-4 top-4\r
                            sm:relative sm:inset-auto sm:w-80 sm:h-[500px]\r
                            flex flex-col\r
                        `,initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},style:{maxHeight:"calc(100vh - 2rem)"},children:[c.jsxs("div",{className:"bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white p-4 flex justify-between items-center",children:[c.jsxs("div",{className:"flex items-center space-x-3",children:[c.jsx("div",{className:"w-8 h-8 bg-white rounded-full flex items-center justify-center",children:c.jsx("span",{className:"text-sm",children:"🤖"})}),c.jsxs("div",{children:[c.jsx("h3",{className:"font-semibold text-sm sm:text-base",children:"WarungPasinaon Bot"}),c.jsxs("div",{className:"flex items-center space-x-1",children:[c.jsx("div",{className:"w-2 h-2 bg-green-400 rounded-full animate-pulse"}),c.jsx("span",{className:"text-xs opacity-90",children:"Online"})]})]})]}),c.jsx("button",{onClick:()=>s(!1),className:"hover:bg-gray-800 rounded-full p-2 transition-colors","aria-label":"Tutup chat",children:c.jsx("svg",{className:"w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",children:c.jsx("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})})]}),c.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50",children:[o.map((p,x)=>c.jsx("div",{className:`flex ${p.role==="user"?"justify-end":"justify-start"}`,children:c.jsxs("div",{className:`
                                            max-w-[85%] sm:max-w-xs px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-sm
                                            ${p.role==="user"?"bg-blue-600 text-white rounded-br-sm":"bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"}
                                        `,children:[c.jsx("div",{className:"leading-relaxed",children:p.text}),c.jsx("div",{className:`text-xs mt-1 opacity-70 ${p.role==="user"?"text-blue-100":"text-gray-500"}`,children:p.timestamp.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})})]})},x)),C&&c.jsx("div",{className:"flex justify-start",children:c.jsx("div",{className:"bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm max-w-xs px-4 py-3",children:c.jsxs("div",{className:"flex space-x-1 items-center",children:[c.jsx("div",{className:"w-2 h-2 bg-blue-400 rounded-full animate-bounce"}),c.jsx("div",{className:"w-2 h-2 bg-blue-400 rounded-full animate-bounce",style:{animationDelay:"0.2s"}}),c.jsx("div",{className:"w-2 h-2 bg-blue-400 rounded-full animate-bounce",style:{animationDelay:"0.4s"}})]})})}),c.jsx("div",{ref:l})]}),c.jsx("div",{className:"p-3 sm:p-4 border-t border-gray-200 bg-white",children:c.jsxs("div",{className:"flex space-x-3",children:[c.jsx("input",{type:"text",value:a,onChange:p=>r(p.target.value),onKeyPress:w,placeholder:"Ketik pesan Anda...",className:`\r
                                        flex-1 px-3 py-2 sm:px-4 sm:py-3 \r
                                        border border-gray-300 rounded-lg \r
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent\r
                                        bg-white text-gray-900 text-sm\r
                                        placeholder-gray-500\r
                                    `,disabled:u||C}),c.jsx("button",{onClick:L,disabled:!a.trim()||u||C,className:`\r
                                        bg-blue-600 hover:bg-blue-700 text-white\r
                                        px-3 py-2 sm:px-4 sm:py-3 rounded-lg \r
                                        transition-colors duration-200\r
                                        disabled:opacity-50 disabled:cursor-not-allowed\r
                                        flex items-center justify-center\r
                                        min-w-[44px] sm:min-w-[48px]\r
                                    `,children:u?c.jsx("svg",{className:"w-4 h-4 sm:w-5 sm:h-5 animate-spin",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:c.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}):c.jsx("svg",{className:"w-4 h-4 sm:w-5 sm:h-5",fill:"currentColor",viewBox:"0 0 20 20",children:c.jsx("path",{d:"M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"})})})]})})]}):c.jsx(F.button,{onClick:()=>s(!0),className:`\r
                            bg-gray-900 hover:bg-gray-800 text-white \r
                            rounded-full p-3 sm:p-4 shadow-lg \r
                            transition-colors duration-200\r
                            border-2 border-gray-700\r
                        `,initial:{scale:0},animate:{scale:1},exit:{scale:0},whileTap:{scale:.95},"aria-label":"Buka chat bot",children:c.jsx("svg",{className:"w-5 h-5 sm:w-6 sm:h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:c.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"})})})})})};export{we as A,st as G};
