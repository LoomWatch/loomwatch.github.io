import{$ as e,A as t,B as n,C as r,Ct as i,D as a,E as o,Et as s,F as c,G as l,H as u,I as d,J as f,K as p,L as m,M as h,N as g,O as _,P as v,Q as y,R as b,S as x,St as S,T as C,Tt as w,U as T,V as E,W as D,X as O,Y as k,Z as A,_ as ee,_t as te,a as ne,at as j,b as M,bt as N,c as re,ct as P,d as ie,dt as ae,et as F,f as I,ft as L,g as R,gt as oe,h as se,ht as z,i as ce,it as le,j as ue,k as de,l as fe,lt as pe,m as me,mt as he,n as B,nt as ge,o as _e,ot as V,p as ve,q as H,r as ye,readModel as U,rt as W,s as G,st as K,t as be,tt as xe,u as Se,ut as Ce,v as we,vt as q,w as Te,wt as J,x as Ee,xt as Y,y as De,yt as Oe,z as ke}from"./live.js";var Ae=[[`nameplate`,`name`],[`laptop`,`app`],[`job`,`job`],[`card`,`skills`],[`key`,`keys`],[`hook`,`keys`],[`hooks`,`keys`],[`dish`,`keys`],[`tray`,`reply`],[`envelope`,`reply`],[`reads`,`reads`],[`tools`,`tools`],[`pegboard`,null],[`bench`,null],[`figure`,`mind`]];function je(e){for(let t of e){let e=Ae.find(([e])=>t===e||t.startsWith(`${e}_`));if(e)return e[1]}return null}var Me=[{key:`web`,node:`web`,word:`Web`},{key:`edits`,node:`files`,word:`Files`},{key:`commands`,node:`cmd`,word:`Commands`}],Ne={reading:[{kind:`read`,weight:3},{kind:`checkJob`,weight:1}],thinking:[{kind:`scratch`,weight:3},{kind:`ponder`,weight:3},{kind:`lookUp`,weight:2}],tools:[{kind:`click`,weight:3},{kind:`type`,weight:2},{kind:`peer`,weight:2}],typing:[{kind:`type`,weight:5},{kind:`nod`,weight:1}]},Pe={read:[3,4.5],checkJob:[2.2,2.8],scratch:[2.4,3.2],ponder:[3.5,5],lookUp:[3,4],click:[2.5,4],peer:[2.5,3.5],type:[2.5,5],nod:[1.4,1.8]},Fe=new Set([`read`,`type`]);function Ie(e,t,n){let r=Ne[e].filter(({kind:e})=>e!==t||Fe.has(e)),i=r.reduce((e,{weight:t})=>e+t,0),a=Math.min(Math.max(n,0),.999999)*i;for(let{kind:e,weight:t}of r){if(a<t)return e;a-=t}return r[r.length-1].kind}function Le(e,t){let n=[];e.name!==t.name&&n.push({kind:`renamed`}),e.instructions!==t.instructions&&n.push({kind:`reread`}),e.app!==t.app&&n.push({kind:`rebenched`}),(e.model!==t.model||e.app!==t.app)&&n.push({kind:`rethought`});for(let r of t.skills)e.skills.includes(r)||n.push({kind:`pinned`,skill:r});for(let r of e.skills)t.skills.includes(r)||n.push({kind:`unpinned`,skill:r});for(let{key:r}of Me)!!e.allow[r]!=!!t.allow[r]&&n.push({kind:`key`,key:r,given:!!t.allow[r]});return n}var Re=[`research`,`write`,`edit`,`review`,`code`,`design`,`analyse`,`slides`,`document`,`sheet`,`chart`,`dashboard`,`video`],ze=[`clay`,`sage`,`sky`,`lilac`,`rose`,`orchid`,`plum`,`sunset`];[...Re],ze.length;function Be(e){let t=new Set(e.wear??[]),n=(e.wear??[]).find(B);return be.filter(e=>t.has(e)&&(!B(e)||e===n))}var Ve={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},He=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Ue=new W(-1,1,1,-1,0,1),We=new class extends m{constructor(){super(),this.setAttribute(`position`,new l([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new l([0,2,0,0,2,0],2))}},Ge=class{constructor(e){this._mesh=new A(We,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ue)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Ke=class extends He{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof z?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Y.clone(e.uniforms),this.material=new z({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ge(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},qe=class extends He{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Je=class extends He{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Ye=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new J);this._width=n.width,this._height=n.height,t=new s(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:H}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ke(Ve),this.copyPass.material.blending=0,this.timer=new N}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}qe!==void 0&&(r instanceof qe?n=!0:r instanceof Je&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new J);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Xe={name:`GTAOShader`,defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:`x`,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new J},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new O},cameraProjectionMatrixInverse:{value:new O},cameraWorldMatrix:{value:new O},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new w(-1,-1,-1)},sceneBoxMax:{value:new w(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Ze={name:`GTAODepthShader`,defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Qe={name:`GTAOBlendShader`,uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function $e(e=5){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),r=et(t),i=r.length,a=new Uint8Array(i*4);for(let e=0;e<i;++e){let t=r[e],n=2*Math.PI*t/i,o=new w(Math.cos(n),Math.sin(n),0).normalize();a[e*4]=(o.x*.5+.5)*255,a[e*4+1]=(o.y*.5+.5)*255,a[e*4+2]=127,a[e*4+3]=255}let o=new n(a,t,t);return o.wrapS=L,o.wrapT=L,o.needsUpdate=!0,o}function et(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;)i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]===0?(r[i*t+a]=e++,a++,i--):(a-=2,i++);return r}var tt={name:`PoissonDenoiseShader`,defines:{SAMPLES:16,SAMPLE_VECTORS:nt(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new J},cameraProjectionMatrixInverse:{value:new O},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function nt(e,t,n){let r=rt(e,t,n),i=`vec3[SAMPLES](`;for(let t=0;t<e;t++){let n=r[t];i+=`vec3(${n.x}, ${n.y}, ${n.z})${t<e-1?`,`:`)`}`}return i}function rt(e,t,n){let r=[];for(let i=0;i<e;i++){let a=2*Math.PI*t*i/e,o=(i/(e-1))**n;r.push(new w(Math.cos(a),Math.sin(a),o))}return r}var it=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,r,i,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,s=Math.floor(e+o),c=Math.floor(t+o),l=(3-Math.sqrt(3))/6,u=(s+c)*l,d=s-u,f=c-u,p=e-d,m=t-f,h,g;p>m?(h=1,g=0):(h=0,g=1);let _=p-h+l,v=m-g+l,y=p-1+2*l,b=m-1+2*l,x=s&255,S=c&255,C=this.perm[x+this.perm[S]]%12,w=this.perm[x+h+this.perm[S+g]]%12,T=this.perm[x+1+this.perm[S+1]]%12,E=.5-p*p-m*m;E<0?n=0:(E*=E,n=E*E*this._dot(this.grad3[C],p,m));let D=.5-_*_-v*v;D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[w],_,v));let O=.5-y*y-b*b;return O<0?i=0:(O*=O,i=O*O*this._dot(this.grad3[T],y,b)),70*(n+r+i)}noise3d(e,t,n){let r,i,a,o,s=(e+t+n)*(1/3),c=Math.floor(e+s),l=Math.floor(t+s),u=Math.floor(n+s),d=1/6,f=(c+l+u)*d,p=c-f,m=l-f,h=u-f,g=e-p,_=t-m,v=n-h,y,b,x,S,C,w;g>=_?_>=v?(y=1,b=0,x=0,S=1,C=1,w=0):g>=v?(y=1,b=0,x=0,S=1,C=0,w=1):(y=0,b=0,x=1,S=1,C=0,w=1):_<v?(y=0,b=0,x=1,S=0,C=1,w=1):g<v?(y=0,b=1,x=0,S=0,C=1,w=1):(y=0,b=1,x=0,S=1,C=1,w=0);let T=g-y+d,E=_-b+d,D=v-x+d,O=g-S+2*d,k=_-C+2*d,A=v-w+2*d,ee=g-1+3*d,te=_-1+3*d,ne=v-1+3*d,j=c&255,M=l&255,N=u&255,re=this.perm[j+this.perm[M+this.perm[N]]]%12,P=this.perm[j+y+this.perm[M+b+this.perm[N+x]]]%12,ie=this.perm[j+S+this.perm[M+C+this.perm[N+w]]]%12,ae=this.perm[j+1+this.perm[M+1+this.perm[N+1]]]%12,F=.6-g*g-_*_-v*v;F<0?r=0:(F*=F,r=F*F*this._dot3(this.grad3[re],g,_,v));let I=.6-T*T-E*E-D*D;I<0?i=0:(I*=I,i=I*I*this._dot3(this.grad3[P],T,E,D));let L=.6-O*O-k*k-A*A;L<0?a=0:(L*=L,a=L*L*this._dot3(this.grad3[ie],O,k,A));let R=.6-ee*ee-te*te-ne*ne;return R<0?o=0:(R*=R,o=R*R*this._dot3(this.grad3[ae],ee,te,ne)),32*(r+i+a+o)}noise4d(e,t,n,r){let i=this.grad4,a=this.simplex,o=this.perm,s=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,l,u,d,f,p,m=(e+t+n+r)*s,h=Math.floor(e+m),g=Math.floor(t+m),_=Math.floor(n+m),v=Math.floor(r+m),y=(h+g+_+v)*c,b=h-y,x=g-y,S=_-y,C=v-y,w=e-b,T=t-x,E=n-S,D=r-C,O=w>T?32:0,k=w>E?16:0,A=T>E?8:0,ee=w>D?4:0,te=T>D?2:0,ne=+(E>D),j=O+k+A+ee+te+ne,M=+(a[j][0]>=3),N=+(a[j][1]>=3),re=+(a[j][2]>=3),P=+(a[j][3]>=3),ie=+(a[j][0]>=2),ae=+(a[j][1]>=2),F=+(a[j][2]>=2),I=+(a[j][3]>=2),L=+(a[j][0]>=1),R=+(a[j][1]>=1),oe=+(a[j][2]>=1),se=+(a[j][3]>=1),z=w-M+c,ce=T-N+c,le=E-re+c,ue=D-P+c,de=w-ie+2*c,fe=T-ae+2*c,pe=E-F+2*c,me=D-I+2*c,he=w-L+3*c,B=T-R+3*c,ge=E-oe+3*c,_e=D-se+3*c,V=w-1+4*c,ve=T-1+4*c,H=E-1+4*c,ye=D-1+4*c,U=h&255,W=g&255,G=_&255,K=v&255,be=o[U+o[W+o[G+o[K]]]]%32,xe=o[U+M+o[W+N+o[G+re+o[K+P]]]]%32,Se=o[U+ie+o[W+ae+o[G+F+o[K+I]]]]%32,Ce=o[U+L+o[W+R+o[G+oe+o[K+se]]]]%32,we=o[U+1+o[W+1+o[G+1+o[K+1]]]]%32,q=.6-w*w-T*T-E*E-D*D;q<0?l=0:(q*=q,l=q*q*this._dot4(i[be],w,T,E,D));let Te=.6-z*z-ce*ce-le*le-ue*ue;Te<0?u=0:(Te*=Te,u=Te*Te*this._dot4(i[xe],z,ce,le,ue));let J=.6-de*de-fe*fe-pe*pe-me*me;J<0?d=0:(J*=J,d=J*J*this._dot4(i[Se],de,fe,pe,me));let Ee=.6-he*he-B*B-ge*ge-_e*_e;Ee<0?f=0:(Ee*=Ee,f=Ee*Ee*this._dot4(i[Ce],he,B,ge,_e));let Y=.6-V*V-ve*ve-H*H-ye*ye;return Y<0?p=0:(Y*=Y,p=Y*Y*this._dot4(i[we],V,ve,H,ye)),27*(l+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}_dot4(e,t,n,r,i){return e[0]*t+e[1]*n+e[2]*r+e[3]*i}},at=class e extends He{constructor(e,t,n=512,r=512,i,a,o){super(),this.width=n,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=$e(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new s(this.width,this.height,{type:H,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new z({defines:Object.assign({},Xe.defines),uniforms:Y.clone(Xe.uniforms),vertexShader:Xe.vertexShader,fragmentShader:Xe.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new y,this.normalMaterial.blending=0,this.pdMaterial=new z({defines:Object.assign({},tt.defines),uniforms:Y.clone(tt.uniforms),vertexShader:tt.vertexShader,fragmentShader:tt.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new z({defines:Object.assign({},Ze.defines),uniforms:Y.clone(Ze.uniforms),vertexShader:Ze.vertexShader,fragmentShader:Ze.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new z({uniforms:Y.clone(Ve.uniforms),vertexShader:Ve.vertexShader,fragmentShader:Ve.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new z({uniforms:Y.clone(Qe.uniforms),vertexShader:Qe.vertexShader,fragmentShader:Qe.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new Ge(null),this._originalClearColor=new b,this.setGBuffer(i?i.depthTexture:void 0,i?i.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e===void 0?(this.depthTexture=new u,this.depthTexture.format=E,this.depthTexture.type=i,this.normalRenderTarget=new s(this.width,this.height,{minFilter:xe,magFilter:xe,type:H,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1);let n=+!!this.normalTexture,r=this.depthTexture===this.normalTexture?`w`:`x`;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=nt(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,n,r){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case e.OUTPUT.Off:break;case e.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(t,this.blendMaterial,this.renderToScreen?null:n);break;default:console.warn(`THREE.GTAOPass: Unknown output type.`)}}_renderPass(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,i=t.clearAlpha||i,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(e){(e.isPoints||e.isLine||e.isLine2)&&e.visible&&(e.visible=!1,t.push(e))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new it,r=e*e*4,i=new Uint8Array(r);for(let n=0;n<e;n++)for(let r=0;r<e;r++){let a=n,o=r;i[(n*e+r)*4]=(t.noise(a,o)*.5+.5)*255,i[(n*e+r)*4+1]=(t.noise(a+e,o)*.5+.5)*255,i[(n*e+r)*4+2]=(t.noise(a,o+e)*.5+.5)*255,i[(n*e+r)*4+3]=(t.noise(a+e,o+e)*.5+.5)*255}let a=new n(i,e,e,pe,S);return a.wrapS=L,a.wrapT=L,a.needsUpdate=!0,a}};at.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var ot={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},st=class extends He{constructor(){super(),this.isOutputPass=!0,this.uniforms=Y.clone(ot.uniforms),this.material=new Ce({name:ot.name,uniforms:this.uniforms,vertexShader:ot.vertexShader,fragmentShader:ot.fragmentShader}),this._fsQuad=new Ge(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ke.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},ct=class extends He{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new b}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},lt={radius:.14,strength:.85},ut=class{composer;occlusion;constructor(e,t,n,r){let i=e.getDrawingBufferSize(new J);this.composer=new Ye(e,new s(i.x,i.y,{type:H,samples:4})),this.composer.setPixelRatio(1),this.composer.addPass(new ct(t,n)),this.occlusion=new at(t,n,i.x,i.y),this.occlusion.updateGtaoMaterial({radius:lt.radius,distanceExponent:1.4,thickness:1,scale:1,samples:16,distanceFallOff:1}),this.occlusion.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:16}),this.occlusion.blendIntensity=lt.strength;let a=this.occlusion,o=a._overrideVisibility.bind(a);a._overrideVisibility=()=>{o(),a._visibilityCache.push(...dt(t,r))},this.composer.addPass(this.occlusion),this.composer.addPass(new st),this.composer.setSize(i.x,i.y)}render(){this.composer.render()}setSize(e,t){this.composer.setSize(e,t)}dispose(){this.occlusion.dispose(),this.composer.dispose()}};function dt(e,t){let n=[];return e.traverse(e=>{e instanceof A&&e.visible&&!t(e)&&(e.visible=!1,n.push(e))}),n}function ft(e,{x:t,y:n,ux:r,uy:i,vx:a,vy:o}){let s=Math.hypot(r,i),c=Math.hypot(a,o);if(s<1||c<1)return;let[l,u,d,f]=[r/s,i/s,a/c,o/c],p=Math.abs(u)<.02&&Math.abs(d)<.02?`translate(${Math.round(t)}px, ${Math.round(n)}px)`:`matrix(${l.toFixed(4)}, ${u.toFixed(4)}, ${d.toFixed(4)}, ${f.toFixed(4)}, ${t.toFixed(1)}, ${n.toFixed(1)})`,m=`${s.toFixed(1)} ${c.toFixed(1)} ${p}`;e.dataset.at!==m&&(e.dataset.at=m,e.style.width=`${s.toFixed(1)}px`,e.style.height=`${c.toFixed(1)}px`,e.style.transform=p)}var pt={dark:{body:`#24242B`,kick:`#2B2B33`,hooks:`#24242B`,frame:`#1C1C21`,front:`#3A3A44`,mouth:`#0C0C10`,inside:`#24242B`,foam:`#1E1E24`,board:ye},light:{body:`#8E887F`,kick:`#7A746B`,hooks:`#6E6862`,frame:`#857F76`,front:`#A19B91`,mouth:`#4A463F`,inside:`#7A746B`,foam:`#6E6862`,board:{face:`#B5AEA2`,holes:`#9F978A`,thread:`rgba(138, 106, 22, 0.7)`}}};function mt(e,t,n){let r=pt[t],i=(e,t)=>{(e?.material)?.color.set(t)};i(e.body,r.body),i(e.kick,r.kick),i(e.hooks,r.hooks),i(e.frame,r.frame);for(let t of e.fronts)i(t,r.front);for(let t of e.mouths)i(t,r.mouth);for(let t of e.insides)i(t,r.inside);for(let t of e.foams)i(t,r.foam);let a=e.face?.material;a&&(a.map=n(t),a.needsUpdate=!0)}var ht={x:-.33,y:.1,z:.03,size:.66},gt={x:-.36,y:.62,z:.16},X={web:`web`,edits:`files`,commands:`cmd`},_t={name:`nameplate_face`,job:`job_sheet`,app:`laptop_face`},vt=.72,yt={bottom:.27,width:.42,height:.18,depth:.32,front:.26,open:.28},bt={reads:-.7,tools:.7},xt=.1,St=[.115,.105,.092,.08];function Ct(e,t){let n=k.clamp(t,1,4),r=St[n-1];return{at:new w((e-(n-1)/2)*(r+.014),.137,-.07),scale:r/xt}}var wt={reads:Array.from({length:4},(e,t)=>new w(0,.016,-.035-t*.042)),tools:Array.from({length:4},(e,t)=>Ct(t,4).at)},Tt=[`#E6CD97`,`#DCC08A`,`#E9D5AA`,`#D9BC80`],Et=.4,Dt=new b(`#E9C46A`),Ot=.12,kt=.5,At=.24,jt={bodyY:0,bodyRX:0,bodyRY:0,neckRX:0,neckRZ:0,lookX:0,lookY:-.3,armLRX:-1.42,armLRZ:-.05,armRRX:-1.42,armRRZ:.05,scale:1,band:0,screen:.12,typing:0,hands:0,click:0};function Mt(e){e.armRRX=-.25,e.armRRZ=-2.6,e.hands=-.3}var Z={x:-1.1,out:.5};function Nt(e){e.armLRX=-.3,e.armLRZ=2.2,e.armRRX=-.3,e.armRRZ=-2.2}function Pt(e){e.armLRX=Z.x,e.armRRX=Z.x,e.armLRZ=Z.out,e.armRRZ=-Z.out,e.neckRX=.03,e.neckRZ=-.24,e.bodyRX=.04}var Ft={open:1,lift:0,tilt:0,mouth:1},It={open:.72,lift:-.008,tilt:-.14,mouth:.85},Lt={still:Ft,starting:Ft,stopped:Ft,working:It,quiet:It,asking:{open:1,lift:.014,tilt:.1,mouth:.9},done:{open:.22,lift:.01,tilt:.08,mouth:1.3},failed:{open:.62,lift:.004,tilt:.28,mouth:.75}},Rt=1.1,zt=1.5,Bt=1.6,Vt=1.2,Ht=.12,Ut=new w(0,1,0),Wt=.06,Gt=1e3/30-4,Kt=new Set([`still`,`done`,`failed`,`stopped`]),qt=1,Jt=[{x:.5,z:-.19},{x:-.5,z:-.19},{x:.84,z:-.19},{x:-.84,z:-.24}],Yt=.5,Xt=.45,Zt=.35,Q=(e,t,n)=>k.smoothstep(n,e,t),Qt=e=>{for(let t=e;t;t=t.parent)if(!t.visible)return!1;return!0};function $t(e,t){return e.intersectObjects(t.filter(Qt),!1)[0]??null}var en=e=>Q(0,.18,e)*(1-Q(.72,1,e)),$=e=>Math.sin(Math.PI*k.clamp(e,0,1));function tn(e,t,n){let r=e=>Math.max(0,Math.sin(t*7.5+e))*(.65+.35*Math.sin(t*2.3+e));e.typing=k.lerp(e.typing,1,n),e.armLRX-=.05*r(0)*n,e.armRRX-=.05*r(Math.PI)*n,e.armLRZ+=.05*Math.sin(t*4.1)*n,e.armRRZ+=.05*Math.sin(t*3.3+1)*n,e.bodyY+=.003*Math.abs(Math.sin(t*15))*n}function nn(e,t){let n=Math.max(0,t);for(let t=1;t<e.length;t+=1){let r=e[t-1],i=e[t],a=r.distanceTo(i),o=Math.hypot(i.x-r.x,i.z-r.z);if(n<=a||t===e.length-1)return{point:r.clone().lerp(i,a>0?Math.min(1,n/a):1),heading:o>.001?Math.atan2(i.x-r.x,i.z-r.z):0};n-=a}return{point:e[0].clone(),heading:0}}function rn(e,t,n=0){let[r,i]=Pe[e],a=r+(i-r)*Math.random();return{kind:e,start:t-n*a,duration:a,next:null}}function an(e){let t=t=>{let n=e.getObjectByName(t);if(!n)throw Error(`The figure has no “${t}”.`);return n};return{body:t(`body`),neck:t(`neck`),head:t(`head`),armL:t(`arm_l`),armR:t(`arm_r`),handL:t(`hand_l`),handR:t(`hand_r`)}}function on(e,t,n,r,i){if(!n){t.bodyRY=t.lookX*Ot;return}let a=e.head.getWorldPosition(new w),o=(n===`viewer`?r.clone():n.clone()).sub(a);i!==0&&o.applyAxisAngle(Ut,-i);let s=o.z<-.1;t.lookX=k.clamp(o.x/.75,-1,1),t.lookY=k.clamp(o.y/.6,-1,1),t.bodyRY=k.clamp((s?-o.x:o.x)*.25,-.12,Ot)}function sn(e,t,n,i,a){e.body.position.y=t.bodyY,e.body.rotation.set(t.bodyRX,t.bodyRY,0),e.neck.rotation.set(t.neckRX-t.lookY*.05,0,t.neckRZ-t.lookX*.06),M(e.head,-t.lookY*At,t.lookX*kt),e.head.scale.setScalar(t.scale),e.armL.rotation.set(t.armLRX,0,t.armLRZ),e.armR.rotation.set(t.armRRX,0,t.armRRZ),r(e.body,Se(a));for(let[r,a,o]of[[e.handL,0,!1],[e.handR,1.9,!0]]){let e=Math.max(0,Math.sin(n*11+a))**3;r.rotation.x=t.hands+t.typing*.35*e*i+(o?t.click*.45:0)}}function cn(e){let t=[`l`,`r`].flatMap(t=>{let n=e.getObjectByName(`brow_${t}`);return n?[{node:n,y:n.position.y,z:n.rotation.z,side:t===`l`?1:-1}]:[]}),n=e.getObjectByName(`mouth`);return{brows:t,mouth:n?{node:n,x:n.scale.x}:null}}function ln(e,t,n,r=1){let i=t-n,a=i<0?1:i<.14?.12+.88*Math.abs(i/.07-1):1;for(let t of e)t.scale.y=a*r;return i>=.14?t+2.6+t*7.13%3.4:n}function un(e,t){let n=e/2,r=new te;return r.moveTo(-n+t,0),r.lineTo(n-t,0),r.absarc(n-t,t,t,-Math.PI/2,0,!1),r.lineTo(n,e-t),r.absarc(n-t,e-t,t,0,Math.PI/2,!1),r.lineTo(-n+t,e),r.absarc(-n+t,e-t,t,Math.PI/2,Math.PI,!1),r.lineTo(-n,t),r.absarc(-n+t,t,t,Math.PI,Math.PI*1.5,!1),r}function dn(e){let t=e.geometry.getAttribute(`uv`),n=e.geometry.getAttribute(`position`);return[[0,0],[1,0],[0,1]].map(([e,r])=>{let i=0;for(let n=1;n<t.count;n+=1)Math.hypot(t.getX(n)-e,t.getY(n)-r)<Math.hypot(t.getX(i)-e,t.getY(i)-r)&&(i=n);return new w().fromBufferAttribute(n,i)})}function fn(e,t,n,r,{reduced:i,away:a},o,s){let c=s.screen;switch(e){case`reading`:n.screen=.6;break;case`thinking`:n.screen=.3;break;case`tools`:n.screen=.9,!i&&r>=t.nextFlash&&(t.flash=Math.max(t.flash,.55+.45*Math.random()),t.nextFlash=r+.22+.7*Math.random())}if(i||a)return t.busy=null,o;let l=t=>Ne[e].some(e=>e.kind===t),u=t.busy;!u||!l(u.kind)?u=t.busy=rn(Ie(e,u?.kind??null,Math.random()),r):r>=u.start+u.duration?u=t.busy=rn(u.next&&l(u.next)?u.next:Ie(e,u.kind,Math.random()),r):!u.next&&r>=u.start+u.duration*.7&&(u.next=Ie(e,u.kind,Math.random()),u.next===u.kind&&(u=t.busy=rn(u.kind,r,.2)));let d=(r-u.start)/u.duration,f=en(d),p=(e,t)=>{n[e]=k.lerp(n[e],t,f)},m=(e,t)=>{n[e]+=t*f},h=(e,t,n)=>s.head().add(new w(e,t,n)),g;switch(u.kind){case`read`:{let e=Math.floor(r/1.6);p(`bodyRX`,.07),g=c().add(new w(-.08+.16*Q(0,.85,r/1.6%1),.04-e%4*.025,0));break}case`checkJob`:p(`armRRX`,-1.45),p(`armRRZ`,-.42),g=s.job();break;case`scratch`:{let e=Math.max(0,Math.sin(r*3.1))*Math.sin(r*17);p(`armRRX`,-.45),p(`armRRZ`,-2.45),m(`armRRZ`,.12*e),p(`hands`,-.6),m(`hands`,.3*e),p(`neckRZ`,.07),g=h(-.35,.3,.6);break}case`ponder`:p(`armRRX`,-2),p(`armRRZ`,-.75),p(`hands`,.5),m(`hands`,.2*Math.max(0,Math.sin(r*4.5))**4),p(`bodyRX`,-.03),g=h(-.5+.12*Math.sin(r*.7),.5+.06*Math.sin(r*1.1),.5);break;case`lookUp`:p(`armLRX`,-1.2),p(`armRRX`,-1.2),p(`bodyRX`,-.05),g=h(.3*Math.sin(r*.5),.9,.3);break;case`click`:p(`armRRX`,-1.5),p(`armRRZ`,.16+.07*Math.sin(r*1.7)),m(`click`,Math.max(0,Math.sin(r*5.3))**10),p(`bodyRX`,.03),g=c().add(new w(.06*Math.sin(r*1.7),.03*Math.sin(r*2.3),0));break;case`peer`:p(`bodyRX`,.12),p(`neckRX`,.06),g=c();break;case`type`:tn(n,r,f),g=c();break;case`nod`:m(`neckRX`,.12*Math.max(0,Math.sin(d*Math.PI*4))),g=c()}return f>.3?g:o}var pn=class{renderer;shading=null;scene=new he;camera=new le(24,1,.1,40);callbacks;reduced;raycaster=new ae;nodes=new Map;roles=new Map;pickables=[];disposables=[];keyHome=new Map;keyDish=new Map;cards=Array.from({length:6},()=>({group:null,skill:null}));files=Array.from({length:4},()=>({group:null,source:null}));drawerOpen={reads:null,tools:null};stocked=Array.from({length:4},()=>({group:null,tool:null}));faces=new Map;faceCorners=new Map;parts=new Map;flashes=new Map;view=null;loaded=!1;running=!1;frameId=0;last=0;width=1;height=1;pointer=null;hovered=null;hoveredKey=null;drag=null;press=null;actions=[];tweens=[];pose={...jt};face={...Ft};faceRest=null;nextFidget=7;nextBlink=2.5;now=0;events=0;flicker=0;screenLight=null;moodSince=0;movedAt=0;acting={busy:null,flash:0,nextFlash:0};rig=null;disposed=!1;seats=new Map;seatedAs=``;thoughtMark=new ge;errands=[];seenUses=new Set;trip=null;figureHome=new w;cupOnDesk=null;wound=null;builds=new Map;build=null;building=null;eyes=[];drawn={figure:``};options;tone;drawerParts={fronts:[],mouths:[],insides:[],foams:[]};boards=new Map;constructor(e,t,n,r={}){this.callbacks=t,this.reduced=n,this.options=r,this.tone=r.tone??`dark`,this.renderer=new v({canvas:e,antialias:!0,alpha:!0,powerPreference:`low-power`}),this.renderer.setClearColor(0,0),this.renderer.toneMapping=7,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1;let i=new g(this.renderer),a=new ue;this.scene.environment=i.fromScene(a,.04).texture,this.scene.environmentIntensity=.55,a.dispose(),i.dispose(),this.scene.add(new f(`#FFF6E8`,`#2A2A32`,.7));let o=new T(`#FFF3E2`,2.4);o.position.set(-1.1,4.6,3.2),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),o.shadow.camera.left=-2.2,o.shadow.camera.right=2.2,o.shadow.camera.top=2.4,o.shadow.camera.bottom=-1.2,o.shadow.camera.near=.5,o.shadow.camera.far=9,o.shadow.bias=-4e-4,o.shadow.normalBias=.02,o.shadow.radius=3,o.target.position.set(0,.7,-.3),this.scene.add(o,o.target);let s=new T(`#DDE6FF`,.9);s.position.set(2.5,2.2,-2.5),this.scene.add(s);let c=new V(8,8),l=new oe({opacity:.16}),u=new A(c,l);u.rotation.x=-Math.PI/2,u.receiveShadow=!0,this.scene.add(u),this.disposables.push(c,l)}async load(e){let t=(await U(e)).scene;this.wound=this.own(re()),t.traverse(e=>{if(e.name&&this.nodes.set(e.name,e),/_eye_[lr]$/.test(e.name)&&this.eyes.push(e),!(e instanceof A))return;let t=e.material.name;e.material.dispose(),e.material=this.material(t,e.name),this.roles.set(e,t);let n=e.name.endsWith(`_face`)||e.name.endsWith(`_label`)||e.name===`job_sheet`||e.name===`laptop_screen`,r=t===`glint`||t===`blush`;e.castShadow=!r&&!n,e.receiveShadow=!r,this.pickables.push(e),this.disposables.push(e.geometry)}),this.emptyFigure();for(let[e,t]of Object.entries(_t))this.faceCorners.set(e,dn(this.node(t)));this.scene.add(t),this.options.clipboardOnBoard&&this.hangClipboard(),this.buildDrawer(`reads`),this.buildDrawer(`tools`),this.tone!==`dark`&&this.repaint(),t.updateMatrixWorld(!0);for(let{key:e,node:t}of Me){let n=this.node(`key_${t}`);this.keyHome.set(e,{p:n.position.clone(),q:n.quaternion.clone()});let r=n.worldToLocal(new c().setFromObject(n).getCenter(new w));this.keyDish.set(e,r.multiplyScalar(-.72))}this.lights(),this.figureHome.copy(this.node(`figure`).position),await this.showBuild(this.view?.figure.kind??`tall`),this.placeThought(),await Te(this.renderer,this.scene,this.camera),this.loaded=!0,this.frame(),C(this.scene),this.view&&this.apply(null,this.view)}hangClipboard(){let e=this.node(`job`);this.node(`pegboard`).add(e),e.position.set(ht.x,ht.y,ht.z),e.rotation.set(Math.PI/2,0,0),e.scale.setScalar(ht.size),this.node(`job_stand`).visible=!1}placeThought(){let e=this.node(`head`);e.updateWorldMatrix(!0,!0);let t=new c;if(e.traverse(e=>{e instanceof A&&Qt(e)&&t.expandByObject(e)}),t.isEmpty())return;let n=e.worldToLocal(new w(0,t.max.y,0).setX((t.min.x+t.max.x)/2).setZ((t.min.z+t.max.z)/2));this.thoughtMark.position.set(0,n.y+Wt,0)}lights(){this.screenLight=new K(`#6AB8FF`,0,1.1,2),this.screenLight.position.set(0,.1,-.12),this.node(`laptop_lid`).add(this.screenLight)}set(e,t=!1){let n=t?null:this.view;t&&(this.events=e.events),this.view=e,this.loaded&&this.apply(n,e)}resize(e,t){let n=ee(this.renderer,e,t);if(this.shading){let e=this.renderer.getDrawingBufferSize(new J);this.shading.setSize(e.x,e.y)}this.width=n.width,this.height=n.height,this.camera.aspect=this.width/this.height,this.fit(),this.frame()}start(){this.running||(this.running=!0,this.last=performance.now(),this.frameId=requestAnimationFrame(this.tick))}stop(){this.running=!1,cancelAnimationFrame(this.frameId)}dispose(){this.stop(),this.disposed=!0,this.scene.traverse(e=>{e instanceof A&&e.material.dispose()});for(let e of this.disposables)e.dispose();this.scene.environment?.dispose(),this.shading?.dispose(),this.renderer.dispose()}pointerMove(e,t){if(this.pointer=new J(e,t),this.movedAt=this.now,this.drag){if(!this.drag.moved&&Math.hypot(e-this.drag.x,t-this.drag.y)>5){this.drag.moved=!0;let e=this.node(`key_${X[this.drag.key]}`);this.tweens=this.tweens.filter(t=>t.node!==e),this.scene.attach(e)}if(this.drag.moved){let n=new w;this.ray(e,t).ray.intersectPlane(this.drag.plane,n),n&&this.node(`key_${X[this.drag.key]}`).position.copy(n)}return}let n=this.pick(e,t);this.hovered=n?.part??null,this.hoveredKey=n?.key??null,this.callbacks.onHover(this.hovered,!!n?.key)}pointerDown(e,t){let n=this.pick(e,t);if(n?.key){let r=this.node(`key_${X[n.key]}`).getWorldPosition(new w),i=this.camera.getWorldDirection(new w).negate();return this.drag={key:n.key,x:e,y:t,moved:!1,plane:new j().setFromNormalAndCoplanarPoint(i,r)},!0}return this.press={part:n?.part??null,x:e,y:t},!1}pointerUp(e,t){let n=this.drag,r=this.press;if(this.drag=null,this.press=null,n&&this.view){let r=!!this.view.look.allow[n.key],i=!r;if(n.moved){let r=this.screen(this.node(`hook_${X[n.key]}`).getWorldPosition(new w)),a=this.screen(this.node(`dish`).getWorldPosition(new w));i=Math.hypot(e-r.x,t-r.y)<Math.hypot(e-a.x,t-a.y)}this.homeKey(n.key,i),i!==r&&this.callbacks.onKey(n.key,i)}else r&&r.part&&Math.hypot(e-r.x,t-r.y)<6&&this.callbacks.onPart(r.part)}pointerLeave(){this.pointer=null,this.movedAt=this.now,this.hovered=null,this.hoveredKey=null,this.callbacks.onHover(null,!1)}apply(e,t){let{look:n}=t,r=`${t.figure.kind}/${t.figure.color}/${t.figure.sign??``}/${Be(t.figure).join()}`;this.drawn.figure!==r&&(this.drawn.figure=r,this.wear(t.figure));for(let{node:e,word:t,key:n}of Me)this.faces.has(`key_${e}_label`)||this.paint(`key_${e}_label`,ne(t,n===`commands`));this.node(`envelope`).visible=t.hasReply||t.mood===`done`,this.pinCards(n.skills,e!==null),this.node(`reads`).visible=!!t.reads,this.slideDrawer(`reads`,!!t.reads?.length,e!==null),this.fileSources(t.reads??[],e!==null),this.node(`tools`).visible=!!t.tools,this.slideDrawer(`tools`,!!t.tools?.length,e!==null),this.hangTools(t.tools??[],e!==null);for(let{key:t}of Me){let r=this.node(`key_${X[t]}`),i=this.node(n.allow[t]?`hook_${X[t]}`:`dish_${X[t]}`);r.parent!==i&&this.drag?.key!==t&&!this.tweens.some(e=>e.node===r)&&this.homeKey(t,!!n.allow[t],e!==null)}t.events>this.events&&!this.reduced&&(this.flicker=1);for(let e of t.uses??[])this.seenUses.has(e.id)||(this.seenUses.add(e.id),!this.reduced&&this.errands.length<2&&this.errands.push(e));if(this.events=t.events,e){for(let t of Le(e.look,n))this.react(t);(e.figure.kind!==t.figure.kind||e.figure.color!==t.figure.color)&&this.react({kind:`redressed`}),e.reads&&t.reads&&hn(e.reads)!==hn(t.reads)&&this.react({kind:`filed`}),e.tools&&t.tools&&gn(e.tools)!==gn(t.tools)&&this.react({kind:`tooled`}),e.mood!==t.mood&&this.moodChanged(e.mood,t.mood)}}wear(e){if(e.kind!==this.build){this.showBuild(e.kind);return}let t=de(e.color);for(let e of[...this.meshes(`skin`),...this.meshes(`skin_wound`)])x(e.material,t);let n=t.clone().multiplyScalar(.86);for(let e of this.meshes(`skin_deep`))x(e.material,n);let i=`sign_${e.sign??`curl`}`,o=new Set(Be(e));this.node(`figure`).traverse(e=>{e.name.startsWith(`sign_`)&&(e.visible=e.name===i);let t=/^wear_([a-z_]+?)(_sleeve)?(_[lr])?(_pose_[a-z]+)?$/.exec(e.name);t&&(e.visible=o.has(t[1]),t[4]&&(e.userData.worn=e.visible))}),a(this.node(`figure`),se(o));let s=[...o].find(B);me(this.node(`figure`),s?De(this.node(`figure`),s):null),r(this.node(`figure`)),this.setCupDown(o.has(`coffee`)),this.placeThought()}setCupDown(e){let t=this.nodes.get(`bench`);if(!this.cupOnDesk){let e=this.node(`figure`).getObjectByName(`wear_coffee`);if(!t||!(e instanceof A))return;e.updateWorldMatrix(!0,!1),t.updateWorldMatrix(!0,!1),t.attach(e);let n=this.node(`figure`).getWorldQuaternion(new P);e.quaternion.copy(t.getWorldQuaternion(new P).invert().multiply(n)),e.geometry.computeBoundingBox();let r=e.geometry.boundingBox,i=new w((r.min.x+r.max.x)/2,r.min.y,(r.min.z+r.max.z)/2).multiply(e.scale).applyQuaternion(e.quaternion);e.position.set(gt.x,gt.y,gt.z).sub(i),this.cupOnDesk=e}this.cupOnDesk.visible=e}showFace(){let e=this.faceRest;if(e){for(let t of e.brows)t.node.position.y=t.y+this.face.lift,t.node.rotation.z=t.z+t.side*this.face.tilt;e.mouth&&(e.mouth.node.scale.x=e.mouth.x*this.face.mouth)}}emptyFigure(){let e=this.node(`figure`),t=new Set;this.cupOnDesk&&=(t.add(this.cupOnDesk),this.cupOnDesk.removeFromParent(),null);for(let n of[...e.children])n.traverse(e=>t.add(e)),e.remove(n);for(let e of t)if(e.name&&this.nodes.get(e.name)===e&&this.nodes.delete(e.name),e instanceof A){this.roles.delete(e),this.parts.delete(e);let t=this.pickables.indexOf(e);t>=0&&this.pickables.splice(t,1)}for(let e=this.eyes.length-1;e>=0;--e)t.has(this.eyes[e])&&this.eyes.splice(e,1);this.faceRest=null}async showBuild(e){if(this.building===e)return;this.building=e;let n=this.builds.get(e);n||(n=this.loadBuild(e),this.builds.set(e,n));let r=await n;if(this.building!==e||this.disposed)return;this.emptyFigure();let i=this.node(`figure`);for(let e of[...r.clone(!0).children])i.add(e);I(i),i.traverse(e=>{e!==i&&(e.name&&this.nodes.set(e.name,e),/_eye_[lr]$/.test(e.name)&&this.eyes.push(e),e instanceof A&&(e.material=e.material.clone(),e.material.name.startsWith(`wear_`)&&t(e.material,!!e.geometry.getAttribute(`stripeAt`)),this.roles.set(e,e.material.name),this.pickables.push(e)))});for(let[e,t]of this.roles)if(t===`skin`&&!Ee(e)&&this.node(`figure`).getObjectById(e.id))for(let t of we(e))this.disposables.push(t.material);this.rig=an(i),ve(i),this.faceRest=cn(i),this.node(`head`).add(this.thoughtMark),this.build=e,this.building=null,this.view&&this.wear(this.view.figure)}async loadBuild(e){let t=(await U(`${this.options.figures??`/agent/figure/`}${e}.glb`)).scene.getObjectByName(`figure`);if(!t)throw Error(`The ${e} figure has no “figure”.`);return o(t),t.traverse(e=>{if(!(e instanceof A))return;let n=e.material.name,r=e.material;n.startsWith(`wear_`)?(_(e,t),e.material=R(e)):e.material=this.material(n,e.name),r.dispose(),e.material.name=n;let i=n===`glint`||n===`freckle`;e.castShadow=!i,e.receiveShadow=!i,(e.name.startsWith(`sign_`)||e.name.startsWith(`wear_`))&&(e.visible=!1),this.disposables.push(e.geometry,e.material)}),t}paint(e,t){let n=this.node(e),r=n.material;r.map?.dispose(),r.map=t,r.color.set(`#FFFFFF`),r.needsUpdate=!0,this.faces.set(e,n)}pinCards(e,t){for(let n=0;n<6;n+=1){let r=e[n]??null,i=this.cards[n];i.skill!==r&&(i.group&&this.unpin(i.group,t),i.group=r?this.pin(n,r,t):null,i.skill=r)}}pin(e,t,n){let r=new p;r.name=`card_${e+1}_card`;let i=new d(.21,.155,.008),a=new A(i,new F({color:`#EFEAE0`,roughness:.8}));a.name=`card_${e+1}_board`,a.castShadow=!0;let o=new V(.2,.15),s=new A(o,new F({map:ce(t,e),roughness:.85}));s.name=`card_${e+1}_face`,s.position.z=.0045,s.material.map.flipY=!0;let c=new Oe(.014,16,10),l=new A(c,new F({color:[`#C0342E`,`#D8A93C`,`#2F7DD3`][e%3],roughness:.35}));l.position.set(0,.06,.016),l.castShadow=!0,r.add(a,s,l),r.rotation.z=k.degToRad(e*37%7-3),this.node(`card_${e+1}`).add(r);for(let e of[a,s,l])this.pickables.push(e),this.roles.set(e,`card`);return this.disposables.push(i,o,c),n&&!this.reduced&&(r.scale.setScalar(.01),r.position.z=.25,this.tween(r,new w(0,0,0),new P().setFromAxisAngle(new w(0,0,1),r.rotation.z),.5,.06)),r}unpin(e,t){let n=()=>{e.removeFromParent(),e.traverse(e=>{if(!(e instanceof A))return;let t=this.pickables.indexOf(e);t>=0&&this.pickables.splice(t,1),this.roles.delete(e),this.parts.delete(e),e.material.map?.dispose(),e.material.dispose()})};!t||this.reduced?n():this.tween(e,new w(0,-.4,.2),e.quaternion.clone(),.4,0,n,!0)}buildDrawer(t){let n=new p;n.name=t,n.position.set(bt[t],yt.bottom,yt.front);let r=new p;r.name=`${t}_drawer`,n.add(r);let i=(e,n,r,i,a,o)=>(n.name=`${t}_${r}`,n.position.set(i,a,o),n.castShadow=!0,n.receiveShadow=!0,e.add(n),this.pickables.push(n),this.roles.set(n,`drawer`),this.disposables.push(n.geometry),n),a=(e,t,n,r)=>new A(new d(e,t,n),r),{width:o,height:s,depth:c}=yt,l=i(n,new A(new V(o+.02,s+.02),new F({color:pt.dark.mouth,roughness:1})),`mouth`,0,s/2,.001);l.castShadow=!1,this.drawerParts.mouths.push(l);let u=i(r,a(o,s,.024,new e({color:pt.dark.front,roughness:.5,clearcoat:.35,clearcoatRoughness:.35})),`front`,0,s/2,.012);this.drawerParts.fronts.push(u),i(r,a(.13,.054,.006,this.material(`gold`,t)),`frame`,0,s*.68,.026),i(r,a(.11,.036,.004,this.material(`paper`,t)),`card`,0,s*.68,.029),i(r,a(.12,.016,.014,this.material(`gold`,t)),`pull`,0,s*.3,.044);for(let e of[-.05,.05])i(r,a(.012,.012,.022,this.material(`gold`,t)),`post_${e<0?`l`:`r`}`,e,s*.3,.034);let f=()=>this.material(`graphite`,t),m=[i(r,a(o-.03,.008,c,f()),`floor`,0,.012,-c/2),...[-1,1].map(e=>i(r,a(.008,s*.7,c,f()),`side_${e<0?`l`:`r`}`,e*(o/2-.02),s*.35+.008,-c/2)),i(r,a(o-.03,s*.7,.008,f()),`back`,0,s*.35+.008,-c)];this.drawerParts.insides.push(...m),t===`tools`&&this.drawerParts.foams.push(i(r,a(o-.048,.11900000000000001,c-.008,new F({color:pt.dark.foam,roughness:.95})),`foam`,0,.15100000000000002/2,-c/2)),wt[t].forEach((e,n)=>{let i=new p;i.name=`${t}_${n+1}`,i.position.copy(e),r.add(i),this.nodes.set(i.name,i)}),this.scene.add(n),n.updateMatrixWorld(!0);for(let e of[n,r,u])this.nodes.set(e.name,e)}slideDrawer(e,t,n){if(this.drawerOpen[e]===t)return;this.drawerOpen[e]=t;let r=this.node(`${e}_drawer`),i=new w(0,0,t?yt.open:0);this.tweens=this.tweens.filter(e=>e.node!==r),!n||this.reduced?r.position.copy(i):this.tween(r,i,r.quaternion.clone(),.45,0)}fileSources(e,t){for(let n=0;n<4;n+=1){let r=e[n]??null,i=r?mn(r):null,a=this.files[n];a.source!==i&&(a.group&&this.unpin(a.group,t),a.group=r?this.file(n,r,t):null,a.source=i)}}file(e,t,n){let r=new p;r.name=`reads_${e+1}_${t.kind}`;let i=[],a=(e,t,n,a,o,s,c=.8)=>{let l=new A(new d(e,t,.004),new F({color:new b(n).multiplyScalar(Et),roughness:c}));return l.position.set(a,o,s),l.castShadow=!0,l.receiveShadow=!0,r.add(l),i.push(l),l};if(t.kind===`folder`){let t=Tt[e%Tt.length];a(.3,.19,t,0,.095,-.004),a(.085,.028,t,[-.09,-.03,.03,.09][e%4],.2,-.004),a(.3,.172,new b(t).multiplyScalar(1.04),0,.086,.001)}else{a(.26,.2,`#F7F4EE`,0,.1,0,.9);for(let e=0;e<4;e+=1)a(e===3?.11:.18,.008,`#B9B1A2`,e===3?-.045:0,.15-e*.03,.003);t.kind===`page`&&a(.03,.03,`#24242B`,-.1,.17,.004,.5)}let o=new P().setFromAxisAngle(new w(1,0,0),-.12);r.quaternion.copy(o),this.node(`reads_${e+1}`).add(r);for(let e of i)this.pickables.push(e),this.roles.set(e,`file`),this.disposables.push(e.geometry);return n&&!this.reduced&&(r.scale.setScalar(.01),r.position.set(0,.25,.2),this.tween(r,new w(0,0,0),o,.5,.04)),r}hangTools(e,t){let n=Math.min(e.length,4);for(let r=0;r<4;r+=1){let i=e[r]??null,a=this.stocked[r],o=!!(i&&a.group&&a.tool?.name===i.name);i&&this.placeTool(r,n,t&&o),o?a.tool.icon!==i.icon&&this.paintTool(a.group,i):(a.group&&this.unpin(a.group,t),a.group=i?this.toolTile(r,i,t):null),a.tool=i}}placeTool(e,t,n){let r=this.node(`tools_${e+1}`),{at:i,scale:a}=Ct(e,t);r.position.equals(i)&&r.scale.x===a||(this.tweens=this.tweens.filter(e=>e.node!==r),!n||this.reduced?(r.position.copy(i),r.scale.setScalar(a)):this.tween(r,i,r.quaternion.clone(),.4,0,void 0,!1,a))}toolTile(t,n,r){let i=new p;i.name=`tools_${t+1}_tile`;let a=un(xt,xt*.24),o=.002,s=new A(new D(a,{depth:.008,bevelEnabled:!0,bevelThickness:o,bevelSize:o,bevelSegments:3,curveSegments:10}),new e({color:new b(`#F7F5F0`).multiplyScalar(Et),roughness:.32,clearcoat:.6,clearcoatRoughness:.2}));s.name=`tools_${t+1}_body`,s.position.z=-.008/2;let c=new q(a,10),l=c.getAttribute(`uv`);for(let e=0;e<l.count;e+=1)l.setXY(e,l.getX(e)/xt+.5,l.getY(e)/xt);let u=new A(c,new e({map:G(n.name,n.icon),color:new b().setScalar(Et),roughness:.32,clearcoat:.6,clearcoatRoughness:.2}));u.name=`tools_${t+1}_face`,u.position.z=.0064,i.add(s,u),i.rotation.set(-.22,0,k.degToRad(t*29%5-2)),this.node(`tools_${t+1}`).add(i);for(let e of[s,u])e.castShadow=!0,e.receiveShadow=!0,this.pickables.push(e),this.roles.set(e,`tool`),this.disposables.push(e.geometry);return r&&!this.reduced&&(i.scale.setScalar(.01),i.position.set(0,.25,.2),this.tween(i,new w(0,0,0),i.quaternion.clone(),.5,.06)),i}paintTool(e,t){let n=e.children.find(e=>e.name.endsWith(`_face`)).material;n.map?.dispose(),n.map=G(t.name,t.icon),n.needsUpdate=!0}homeKey(e,t,n=!0){let r=this.node(`key_${X[e]}`),i=this.node(t?`hook_${X[e]}`:`dish_${X[e]}`),a=t?this.keyHome.get(e):{p:this.keyDish.get(e),q:new P},o=t?1:vt;this.tweens=this.tweens.filter(e=>e.node!==r),r.parent!==i&&i.attach(r),!n||this.reduced?(r.position.copy(a.p),r.quaternion.copy(a.q),r.scale.setScalar(o)):this.tween(r,a.p,a.q,.55,.18,void 0,!1,o)}tween(e,t,n,r,i,a,o=!1,s=1){this.tweens.push({node:e,fromP:e.position.clone(),toP:t.clone(),fromQ:e.quaternion.clone(),toQ:n.clone(),fromS:e.scale.x,toS:o?.01:s,start:this.now,duration:r,arc:i,done:a})}react(e){if(this.reduced)return;let t=(e,t,n)=>this.actions.push({kind:e,start:this.now,duration:t,side:n});switch(e.kind){case`renamed`:t(`nameplate`,1.2);break;case`reread`:this.actions.some(e=>e.kind===`read`)||t(`read`,1.8);break;case`rethought`:t(`spark`,1.4);break;case`rebenched`:t(`plaque`,1.2);break;case`pinned`:t(`pin`,1.4);break;case`unpinned`:t(`unpin`,1);break;case`key`:t(e.given?`keyGive`:`keyTake`,1.1);break;case`redressed`:t(`redressed`,.9);break;case`filed`:t(`file`,1.4);break;case`tooled`:t(`tool`,1.4)}}moodChanged(e,t){if(this.moodSince=this.now,t===`done`&&e!==`done`&&!this.reduced){let e=this.node(`envelope`),t=this.node(`tray`),n={p:e.position.clone(),q:e.quaternion.clone()};e.position.copy(t.worldToLocal(this.node(`laptop_lid`).getWorldPosition(new w).add(new w(0,.2,0)))),this.tween(e,n.p,n.q,.9,.3)}}tick=e=>{if(!this.running||(this.frameId=requestAnimationFrame(this.tick),this.loaded&&e-this.last<Gt&&this.resting()))return;let t=Math.min(.05,Math.max(0,(e-this.last)/1e3));this.last=e,this.now+=t,this.loaded&&this.update(t),this.frame()};resting(){let e=this.view;return(!e||!Kt.has(e.mood)||e.dropping||this.actions.length>0||this.tweens.length>0||this.trip!==null||this.errands.length>0||this.seats.size>0||this.drag!==null||this.press!==null||this.flicker>0||this.acting.flash>0)&&(this.movedAt=this.now),this.now-Math.max(this.movedAt,this.moodSince)>=qt}isFigure(e){for(let t=e;t;t=t.parent)if(t.name===`figure`||t.name.startsWith(`helper_`))return!0;return!1}frame(){this.loaded&&(this.shading??=new ut(this.renderer,this.scene,this.camera,e=>this.isFigure(e)),this.shading.render(),this.callbacks.onFrame(this.anchors(),this.facesOnScreen()))}update(e){let t=this.view;if(!t)return;let n=this.now,r=+!this.reduced,i={...jt},a=null,o=()=>this.node(`laptop_lid`).getWorldPosition(new w).add(new w(0,.12,0));switch(t.mood){case`still`:i.bodyY=.004*Math.sin(n*1.7)*r,i.armLRX+=.035*Math.sin(n*1.3)*r,i.armRRX+=.035*Math.sin(n*1.3+1.7)*r;break;case`starting`:i.band=.7,i.screen=.45,a=`viewer`;break;case`working`:case`quiet`:!t.phase&&t.mood===`working`&&tn(i,n,r),i.band=1,i.screen=t.mood===`working`?.75:.5,a=o();break;case`asking`:if(i.band=1,i.screen=.5,t.asked){let e=!this.reduced&&(n-this.moodSince)%3.2>2.3;i.armRRX=-1.15,i.armRRZ=-.7,a=e?`viewer`:this.node(`dish_${X[t.asked]}`).getWorldPosition(new w)}else Mt(i),a=`viewer`;break;case`done`:Nt(i),a=`viewer`;break;case`failed`:Pt(i),i.lookY=-.6,a=o()}let s=t.mood===`working`||t.mood===`quiet`?t.phase??null:null;s?a=this.work(s,i,a??o(),o):this.acting.busy=null;let c=!s&&(t.mood===`working`||t.mood===`quiet`)?[...this.seats.values()].filter(e=>e.going===null&&e.finished===null):[];c.length>0&&!this.reduced&&(a=c[Math.floor(n/3.2)%c.length].rig.head.getWorldPosition(new w));let l=this.travel(i,e,t.mood===`working`||t.mood===`quiet`);if(l&&(a=l),t.dropping)a=this.node(`card_3`).getWorldPosition(new w);else if(!a&&(t.mood===`still`||t.mood===`stopped`||t.mood===`done`)){let e=this.hovered?this.partPoint(this.hovered):null;e?a=e:this.pointer&&!this.reduced?(i.lookX=k.clamp((this.pointer.x/this.width-.5)*2.2,-1,1),i.lookY=k.clamp(-(this.pointer.y/this.height-.38)*2.2,-1,1)):this.reduced||(i.lookX=.35*Math.sin(n*.31)+.15*Math.sin(n*.87),i.lookY=-.35+.25*Math.sin(n*.43))}if(t.mood===`still`&&!this.reduced&&n>this.nextFidget&&this.actions.length===0&&!this.pointer){let e=[`lookAround`,`stretch`,`checkJob`];this.actions.push({kind:e[Math.floor(n*7.31)%e.length],start:n,duration:2.2}),this.nextFidget=n+8+n*13.7%5}this.actions=this.actions.filter(e=>n<e.start+e.duration),this.flashes=new Map;for(let e of this.actions){let t=(n-e.start)/e.duration;if(t<0)continue;let r=en(t),s=(e,t)=>{i[e]=k.lerp(i[e],t,r)},c=e=>{a=r>.3?e:a};switch(e.kind){case`read`:case`checkJob`:c(this.node(`job`).getWorldPosition(new w)),s(`armRRX`,-1.45),s(`armRRZ`,-.42);break;case`nameplate`:c(this.node(`nameplate`).getWorldPosition(new w).add(new w(0,.25,0))),s(`neckRX`,.16),this.flashes.set(`name`,.55*(1-t));break;case`plaque`:c(o()),this.flashes.set(`app`,.6*(1-t)),i.band=Math.max(i.band,1-t);break;case`spark`:i.scale+=.12*$(t*1.6),i.neckRZ+=.09*Math.sin(t*40)*(1-t),this.flashes.set(`mind`,.45*(1-t));break;case`redressed`:i.scale+=.18*$(t*1.3),i.bodyY+=.03*$(t*1.3),a=`viewer`;break;case`pin`:case`unpin`:c(this.node(`card_3`).getWorldPosition(new w)),i.bodyY+=.025*$(t*2);break;case`file`:c(this.node(`reads_drawer`).getWorldPosition(new w).add(new w(0,.15,.1))),i.bodyY+=.025*$(t*2),this.flashes.set(`reads`,.5*(1-t));break;case`tool`:c(this.node(`tools_drawer`).getWorldPosition(new w).add(new w(0,.15,.1))),i.bodyY+=.025*$(t*2),this.flashes.set(`tools`,.5*(1-t));break;case`keyGive`:c(this.node(`hooks`).getWorldPosition(new w)),i.bodyY+=.025*$(t*2);break;case`keyTake`:c(this.node(`dish`).getWorldPosition(new w)),s(`bodyRX`,.05);break;case`lookAround`:c(this.node(t<.5?`hooks`:`card_3`).getWorldPosition(new w));break;case`stretch`:s(`hands`,-.3),s(`armLRX`,-.2),s(`armLRZ`,2),s(`armRRX`,-.2),s(`armRRZ`,-2),i.bodyY+=.015*$(t)}}let u=this.rig;if(!u)return;on(u,i,a,this.camera.position,this.node(`figure`).rotation.y);let d=this.reduced?1:1-Math.exp(-e*8);for(let e of Object.keys(i))this.pose[e]+=(i[e]-this.pose[e])*d;let f=this.pose;sn(u,f,n,r,i);let p=Lt[t.mood];for(let e of Object.keys(p))this.face[e]+=(p[e]-this.face[e])*d;if(this.showFace(),!this.reduced)this.nextBlink=ln(this.eyes,this.now,this.nextBlink,this.face.open);else for(let e of this.eyes)e.scale.y=this.face.open;let m=this.node(`laptop_light`).material;m.emissive.copy(fe),m.emissiveIntensity=f.band*(this.reduced?1:.75+.25*Math.sin(n*5))+this.acting.flash*.8,this.flicker=Math.max(0,this.flicker-e*4),this.acting.flash=Math.max(0,this.acting.flash-e*5);let h=this.node(`laptop_screen`).material;h.emissiveIntensity=f.screen+this.flicker*.9+this.acting.flash*1.2,this.screenLight&&(this.screenLight.intensity=(f.screen+this.flicker*.6)*.35+this.acting.flash*.9),this.highlight(t),this.liftAsked(t),this.seatHelpers(t,e),this.tweens=this.tweens.filter(e=>{let t=k.clamp((this.now-e.start)/e.duration,0,1),n=1-(1-t)**3;return e.node.position.lerpVectors(e.fromP,e.toP,n),e.node.position.y+=e.arc*$(t),e.node.quaternion.slerpQuaternions(e.fromQ,e.toQ,n),e.node.scale.setScalar(k.lerp(e.fromS,e.toS,n)),t>=1?(e.done?.(),!1):!0})}work(e,t,n,r){return fn(e,this.acting,t,this.now,{reduced:this.reduced,away:this.trip!==null},n,{screen:r,job:()=>this.node(`job`).getWorldPosition(new w),head:()=>this.node(`head`).getWorldPosition(new w)})}seatHelpers(e,t){let n=this.now,r=+!this.reduced,i=new Map((e.helpers??[]).map(e=>[e.id,e])),a=this.drawn.figure;if(a!==this.seatedAs){this.seatedAs=a;for(let e of this.seats.values())e.going??=n}for(let e of i.values()){if(this.seats.get(e.id)?.going===null||this.seats.has(e.id))continue;let t=new Set([...this.seats.values()].map(e=>e.slot)),n=Jt.findIndex((e,n)=>!t.has(n));n<0||this.seats.set(e.id,this.seat(e.id,n))}let o=this.reduced?1:1-Math.exp(-t*8);for(let e of[...this.seats.values()]){let a=i.get(e.id);!a&&e.going===null&&(e.going=n),a&&a.state!==`working`&&e.finished===null&&(e.finished=n);let s=e.going===null?Yt*(this.reduced?1:1-(1-Q(0,Xt,n-e.born))**2+.12*$((n-e.born)/Xt)*(n-e.born<Xt)):Yt*(this.reduced?0:1-Q(0,Zt,n-e.going));if(s<=.001&&e.going!==null){this.unseat(e);continue}e.group.scale.setScalar(s);let c={...jt},l=()=>e.lid.getWorldPosition(new w).add(new w(0,.12*Yt,0)),u=l();!a||a.state===`working`?(c.band=1,c.screen=.75,a?.phase?u=fn(a.phase,e.acting,c,n,{reduced:this.reduced,away:!1},l(),{screen:l,job:()=>this.node(`job`).getWorldPosition(new w),head:()=>e.rig.head.getWorldPosition(new w)}):(e.acting.busy=null,tn(c,n,r))):a.state===`done`?(e.acting.busy=null,c.screen=.3,c.neckRX+=.14*Math.max(0,Math.sin((n-(e.finished??n))*7))*r,c.bodyY+=.02*$((n-(e.finished??n))*1.4)*r,u=this.rig?.head.getWorldPosition(new w)??`viewer`):(e.acting.busy=null,c.armLRX=Z.x,c.armRRX=Z.x,c.armLRZ=Z.out,c.armRRZ=-Z.out,c.lookY=-.6,c.screen=.2),on(e.rig,c,u,this.camera.position,e.group.rotation.y);for(let t of Object.keys(c))e.pose[t]+=(c[t]-e.pose[t])*o;sn(e.rig,e.pose,n,r,c),this.reduced||(e.nextBlink=ln(e.eyes,n,e.nextBlink)),e.band.emissive.copy(fe),e.band.emissiveIntensity=e.pose.band*(this.reduced?1:.75+.25*Math.sin(n*5+e.slot))+e.acting.flash*.8,e.screen.emissiveIntensity=e.pose.screen+e.acting.flash*1.2,e.acting.flash=Math.max(0,e.acting.flash-t*5)}}seat(e,t){let n=Jt[t],r=this.node(`laptop`),i=r.clone(!0);i.position.set(0,0,0);let a=h(this.node(`figure`));a.position.copy(this.figureHome).sub(r.position),a.rotation.set(0,0,0);let o=new p;o.name=`helper_${t}`,o.add(i,a),o.position.set(n.x,r.position.y,n.z),o.rotation.y=n.x>0?-.28:.28,o.scale.setScalar(this.reduced?Yt:0);let s=e=>{let t=i.getObjectByName(e),n=t.material.clone();return t.material=n,n},c=s(`laptop_screen`),l=s(`laptop_light`),u=[];return a.traverse(e=>{/_eye_[lr]$/.test(e.name)&&u.push(e)}),this.scene.add(o),o.updateMatrixWorld(!0),{id:e,slot:t,group:o,rig:an(a),lid:i.getObjectByName(`laptop_lid`)??i,eyes:u,screen:c,band:l,acting:{busy:null,flash:0,nextFlash:0},pose:{...this.pose},nextBlink:this.now+1+t*.7,born:this.now,going:null,finished:null}}unseat(e){this.scene.remove(e.group),e.screen.dispose(),e.band.dispose(),this.seats.delete(e.id)}travel(e,t,n){if(!n&&this.errands.length>0&&(this.errands=[]),!this.trip){let e=this.errands.shift();if(this.trip=e?this.tripTo(e):null,!this.trip)return null}let r=this.trip,i=this.node(`figure`),[a,o,s,c]=r.legs,l=this.now-r.start,u=()=>r.item.getWorldPosition(new w),d=(t,n,r=1)=>{e[t]=k.lerp(e[t],n,r)},f=e=>{d(`armRRX`,-1.15,e),d(`armLRX`,-1.15,e),d(`armRRZ`,.28,e),d(`armLRZ`,-.28,e)};e.typing=0;let p=this.figureHome.clone(),m=0,h=-1,g;if(l<a+o+s){if(l>=a&&l<a+o){let e=(l-a)/o;p=r.path[r.path.length-1].clone(),p.y+=r.hop*$(e),m=r.face;let t=Q(0,.35,e)*(1-Q(.55,.9,e));r.reach===`up`?(d(`armRRX`,-2.75,t),d(`armRRZ`,.1,t)):(d(`armRRX`,-.85,t),d(`armLRX`,-.85,t),d(`bodyRX`,.3,t)),!r.picked&&e>=.5&&this.take(r),r.picked&&f(Q(.55,.9,e)),g=u()}else{let e=l<a,t=Q(0,1,e?l/a:(l-a-o)/s)*r.length,{point:n,heading:i}=nn(r.path,e?t:r.length-t);p=n,m=e?i:i+Math.PI,h=t,r.picked?f(1):(d(`armLRX`,-.5+.35*Math.sin(t*16)),d(`armRRX`,-.5-.35*Math.sin(t*16))),g=e?u():n.clone().add(new w(0,.9,0)).addScaledVector(new w(Math.sin(m),0,Math.cos(m)),.8)}}else if(l<a+o+s+c){let e=(l-a-o-s)/c;!r.returned&&e>=.6&&this.putBack(r);let t=1-Q(.55,.85,e);d(`armRRX`,-1.75,t),d(`armRRZ`,.3,t),d(`armLRX`,-1.3,t),g=r.returned?this.node(`laptop_lid`).getWorldPosition(new w).add(new w(0,.12,0)):u()}else return r.returned||this.putBack(r),i.position.copy(this.figureHome),i.rotation.set(0,0,0),this.trip=null,null;i.position.copy(p),i.position.y+=h>=0?.03*Math.abs(Math.sin(h*8)):0,i.rotation.z=h>=0?.07*Math.sin(h*8):0;let _=Math.atan2(Math.sin(m-i.rotation.y),Math.cos(m-i.rotation.y)),v=i.rotation.y+_*(1-Math.exp(-t*9));return i.rotation.y=Math.atan2(Math.sin(v),Math.cos(v)),g}tripTo(e){let t=this.figureHome,n,r,i,a=0,o=`down`,s;if(e.kind===`skill`){let c=this.cards.findIndex(t=>t.skill===e.name),l=this.cards[c]?.group;if(!l)return null;n=l,r=()=>this.cards[c].group===l;let u=l.getWorldPosition(new w);i=[t.clone(),new w(u.x,t.y,-.84)],a=k.clamp(u.y-.42-t.y,0,.4),o=`up`,s=.7}else{let a=e.kind===`read`?`reads`:`tools`,o=e.kind===`read`?this.files.findIndex(t=>t.source?.split(`
`)[1]===e.name):this.stocked.findIndex(t=>t.tool?.name===e.name),c=e.kind===`read`?this.files[o]?.group:this.stocked[o]?.group;if(!c)return null;n=c,r=()=>(e.kind===`read`?this.files[o].group:this.stocked[o].group)===c;let l=c.getWorldPosition(new w),u=Math.sign(bt[a])*Vt,d=l.z+.3;i=[t.clone(),new w(u,t.y,t.z),new w(u,Ht,d),new w(l.x,Ht,d)],s=e.kind===`read`?.55:.9}if(!n.parent)return null;let c=n.getWorldPosition(new w),l=i[i.length-1],u=Math.atan2(c.x-l.x,c.z-l.z),d=0;for(let e=1;e<i.length;e+=1)d+=i[e].distanceTo(i[e-1]);let f=Math.max(.8,d/Rt);return{item:n,home:{parent:n.parent,p:n.position.clone(),q:n.quaternion.clone(),s:n.scale.x},still:r,path:i,length:d,face:u,hop:a,reach:o,held:s,start:this.now,legs:[f,zt,f,Bt],picked:!1,returned:!1}}take(e){e.picked=!0,e.still()&&(this.tweens=this.tweens.filter(t=>t.node!==e.item),this.node(`hand_r`).attach(e.item),this.tween(e.item,new w(0,-.07,.06),new P().setFromAxisAngle(new w(1,0,0),-Math.PI/2),.35,0,void 0,!1,e.held))}putBack(e){e.returned=!0,e.picked&&e.still()&&(this.tweens=this.tweens.filter(t=>t.node!==e.item),e.home.parent.attach(e.item),this.tween(e.item,e.home.p,e.home.q,.6,.12,void 0,!1,e.home.s))}liftAsked(e){for(let{key:t}of Me){let n=this.node(`key_${X[t]}`);if(e.look.allow[t]||this.drag?.key===t||!n.parent||this.tweens.some(e=>e.node===n))continue;let r=e.asked===t?.06+(this.reduced?0:.02*Math.sin(this.now*5)):0,i=new w(0,1,0).applyQuaternion(n.parent.getWorldQuaternion(new P).invert());n.position.copy(this.keyDish.get(t)).addScaledVector(i,r)}}highlight(e){for(let[t,n]of this.roles){if(n===`eye`||n===`glint`||n===`screen`||t.name===`laptop_light`)continue;let r=this.partOf(t),i=t.material,a=r?this.flashes.get(r)??0:0;r&&r===this.hovered&&(a=Math.max(a,.16)),r&&r===e.open&&(a=Math.max(a,.1)),e.dropping&&t.name===`pegboard_face`&&(a=.12);let o=t.parent?.name??``;e.asked&&o===`key_${X[e.asked]}`&&(a=Math.max(a,this.reduced?.35:.2+.25*(.5+.5*Math.sin(this.now*6)))),this.hoveredKey&&o===`key_${X[this.hoveredKey]}`&&(a=Math.max(a,.3)),i.emissive.copy(Dt),i.emissiveIntensity=a}}anchors(){let e=(e,t)=>this.node(e).getWorldPosition(new w).add(new w(...t)),t=e(`card_1`,[0,0,0]).lerp(e(`card_2`,[0,0,0]),.5).add(new w(0,.11,0));return{mind:this.screen(e(`neck`,[.33,.3,0])),thought:this.screen(this.thoughtMark.getWorldPosition(new w)),app:this.screen(e(`laptop_face`,[0,0,0])),name:this.screen(e(`nameplate`,[0,0,0])),job:this.screen(e(`job`,[0,.3,-.12])),skills:this.screen(t),reads:this.screen(e(`reads_front`,[0,-yt.height/2-.012,.012])),tools:this.screen(e(`tools_front`,[0,-yt.height/2-.012,.012])),keys:this.screen(e(`hooks`,[0,.06,0])),dish:this.screen(e(`dish`,[0,-.01,.2])),reply:this.screen(e(`tray`,[0,.1,-.05]))}}facesOnScreen(){let e=e=>{let t=this.node(_t[e]),[n,r,i]=this.faceCorners.get(e).map(e=>this.screen(t.localToWorld(e.clone())));return{x:n.x,y:n.y,ux:r.x-n.x,uy:r.y-n.y,vx:i.x-n.x,vy:i.y-n.y}};return{name:e(`name`),job:e(`job`),app:e(`app`)}}partPoint(e){let t={mind:null,app:`laptop_lid`,name:`nameplate`,job:`job`,skills:`card_3`,reads:`reads_drawer`,tools:`tools_drawer`,keys:`hooks`,reply:`tray`}[e];return t?this.node(t).getWorldPosition(new w):null}screen(e){let t=e.clone().project(this.camera);return{x:(t.x+1)/2*this.width,y:(1-t.y)/2*this.height}}ray(e,t){return this.raycaster.setFromCamera(new J(e/this.width*2-1,-(t/this.height)*2+1),this.camera),this.raycaster}pick(e,t){let n=$t(this.ray(e,t),this.pickables);if(!n)return null;let r=[];for(let e=n.object;e;e=e.parent)e.name&&r.push(e.name);let i=Me.find(({node:e})=>r.includes(`key_${e}`))?.key??null;return{part:je(r),key:i}}partOf(e){if(this.parts.has(e))return this.parts.get(e)??null;let t=[];for(let n=e;n;n=n.parent)n.name&&t.push(n.name);let n=je(t);return this.parts.set(e,n),n}meshes(e){return[...this.roles].filter(([,t])=>t===e).map(([e])=>e)}node(e){let t=this.nodes.get(e);if(!t)throw Error(`The workbench has no “${e}”.`);return t}fit(){let e=new w(0,.8,-.3),t=new w(.06,.56,1).normalize(),n=[-1.06,1.06].flatMap(e=>[new w(e,1.62,-1.1),new w(e,.66,.38),new w(e,0,.38)]).concat([new w(0,1.62,-.6)]);this.camera.updateProjectionMatrix();let r=1,i=12;for(let a=0;a<24;a+=1){let a=(r+i)/2;this.camera.position.copy(e).addScaledVector(t,a),this.camera.lookAt(e),this.camera.updateMatrixWorld(),n.every(e=>{let t=e.clone().project(this.camera);return Math.abs(t.x)<.95&&t.y<.84&&t.y>-.96})?i=a:r=a}this.camera.position.copy(e).addScaledVector(t,i),this.camera.lookAt(e),this.camera.updateProjectionMatrix()}setTone(e){e!==this.tone&&(this.tone=e,this.nodes.has(`bench_body`)&&this.repaint())}repaint(){let e=e=>this.nodes.get(e);mt({body:e(`bench_body`),kick:e(`bench_kick`),hooks:e(`hooks_bar`),frame:e(`pegboard_panel`),face:e(`pegboard_face`),...this.drawerParts},this.tone,e=>this.boardFor(e))}material(e,t){return ie(e,t,{pegboard:()=>this.boardFor(`dark`),wound:this.wound})}boardFor(e){let t=this.boards.get(e)??this.own(_e(pt[e].board));return this.boards.set(e,t),t}own(e){return this.disposables.push(e),e}},mn=e=>`${e.kind}\n${e.name}\n${e.where}`,hn=e=>e.map(mn).join(`

`),gn=e=>e.map(e=>e.name).join(`
`);export{ht as CLIPBOARD_ON_BOARD,gt as COFFEE_ON_DESK,Z as FAILED_ARMS,pt as FURNITURE,Lt as MOOD_FACES,pn as WorkbenchScene,Nt as donePose,Pt as failedPose,$t as nearestShownHit,mt as paintFurniture,ft as placeFace,Mt as questionPose,cn as restOfFace};