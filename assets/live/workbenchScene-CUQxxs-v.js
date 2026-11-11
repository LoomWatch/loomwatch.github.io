import{$ as e,A as t,B as n,C as r,Ct as i,D as a,E as o,F as s,G as c,H as l,I as u,J as d,K as f,L as p,M as m,N as h,O as g,P as _,Q as v,R as y,S as b,St as x,T as S,U as C,V as w,W as T,X as E,Y as D,Z as O,_ as ee,_t as te,a as ne,at as k,b as A,bt as j,c as M,ct as N,d as re,dt as ie,et as ae,f as oe,ft as P,g as F,gt as I,h as L,ht as se,i as ce,it as le,j as ue,k as de,l as fe,lt as R,m as pe,mt as me,n as z,nt as he,o as ge,ot as _e,p as ve,pt as ye,q as B,r as be,readModel as xe,rt as V,s as H,st as U,t as W,tt as Se,u as Ce,v as we,vt as G,w as Te,x as K,xt as q,y as J,yt as Ee,z as De}from"./live.js";var Oe=[[`nameplate`,`name`],[`laptop`,`app`],[`job`,`job`],[`card`,`skills`],[`key`,`keys`],[`hook`,`keys`],[`hooks`,`keys`],[`dish`,`keys`],[`tray`,`reply`],[`envelope`,`reply`],[`reads`,`reads`],[`tools`,`tools`],[`pegboard`,null],[`bench`,null],[`figure`,`mind`]];function ke(e){for(let t of e){let e=Oe.find(([e])=>t===e||t.startsWith(`${e}_`));if(e)return e[1]}return null}var Ae=[{key:`web`,node:`web`,word:`Web`},{key:`edits`,node:`files`,word:`Files`},{key:`commands`,node:`cmd`,word:`Commands`}],je={reading:[{kind:`read`,weight:3},{kind:`checkJob`,weight:1}],thinking:[{kind:`scratch`,weight:3},{kind:`ponder`,weight:3},{kind:`lookUp`,weight:2}],tools:[{kind:`click`,weight:3},{kind:`type`,weight:2},{kind:`peer`,weight:2}],typing:[{kind:`type`,weight:5},{kind:`nod`,weight:1}]},Me={read:[3,4.5],checkJob:[2.2,2.8],scratch:[2.4,3.2],ponder:[3.5,5],lookUp:[3,4],click:[2.5,4],peer:[2.5,3.5],type:[2.5,5],nod:[1.4,1.8]},Ne=new Set([`read`,`type`]);function Pe(e,t,n){let r=je[e].filter(({kind:e})=>e!==t||Ne.has(e)),i=r.reduce((e,{weight:t})=>e+t,0),a=Math.min(Math.max(n,0),.999999)*i;for(let{kind:e,weight:t}of r){if(a<t)return e;a-=t}return r[r.length-1].kind}function Fe(e,t){let n=[];e.name!==t.name&&n.push({kind:`renamed`}),e.instructions!==t.instructions&&n.push({kind:`reread`}),e.app!==t.app&&n.push({kind:`rebenched`}),(e.model!==t.model||e.app!==t.app)&&n.push({kind:`rethought`});for(let r of t.skills)e.skills.includes(r)||n.push({kind:`pinned`,skill:r});for(let r of e.skills)t.skills.includes(r)||n.push({kind:`unpinned`,skill:r});for(let{key:r}of Ae)!!e.allow[r]!=!!t.allow[r]&&n.push({kind:`key`,key:r,given:!!t.allow[r]});return n}var Ie=[`research`,`write`,`edit`,`review`,`code`,`design`,`analyse`,`slides`,`document`,`sheet`,`chart`,`dashboard`,`video`],Le=[`clay`,`sage`,`sky`,`lilac`,`rose`,`orchid`,`plum`,`sunset`];[...Ie],Le.length;function Re(e){let t=new Set(e.wear??[]),n=(e.wear??[]).find(z);return W.filter(e=>t.has(e)&&(!z(e)||e===n))}var ze={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},Be=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Ve=new ae(-1,1,1,-1,0,1),He=new class extends _{constructor(){super(),this.setAttribute(`position`,new l([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new l([0,2,0,0,2,0],2))}},Ue=class{constructor(e){this._mesh=new d(He,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ve)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},We=class extends Be{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof P?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=G.clone(e.uniforms),this.material=new P({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ue(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Ge=class extends Be{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Ke=class extends Be{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},qe=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new q);this._width=n.width,this._height=n.height,t=new i(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:T}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new We(ze),this.copyPass.material.blending=0,this.timer=new te}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Ge!==void 0&&(r instanceof Ge?n=!0:r instanceof Ke&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new q);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Je={name:`GTAOShader`,defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:`x`,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new q},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new B},cameraProjectionMatrixInverse:{value:new B},cameraWorldMatrix:{value:new B},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new x(-1,-1,-1)},sceneBoxMax:{value:new x(1,1,1)}},vertexShader:`

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
		}`},Ye={name:`GTAODepthShader`,defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Xe={name:`GTAOBlendShader`,uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Ze(e=5){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=Qe(t),r=n.length,i=new Uint8Array(r*4);for(let e=0;e<r;++e){let t=n[e],a=2*Math.PI*t/r,o=new x(Math.cos(a),Math.sin(a),0).normalize();i[e*4]=(o.x*.5+.5)*255,i[e*4+1]=(o.y*.5+.5)*255,i[e*4+2]=127,i[e*4+3]=255}let a=new p(i,t,t);return a.wrapS=R,a.wrapT=R,a.needsUpdate=!0,a}function Qe(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;)i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]===0?(r[i*t+a]=e++,a++,i--):(a-=2,i++);return r}var $e={name:`PoissonDenoiseShader`,defines:{SAMPLES:16,SAMPLE_VECTORS:et(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new q},cameraProjectionMatrixInverse:{value:new B},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function et(e,t,n){let r=tt(e,t,n),i=`vec3[SAMPLES](`;for(let t=0;t<e;t++){let n=r[t];i+=`vec3(${n.x}, ${n.y}, ${n.z})${t<e-1?`,`:`)`}`}return i}function tt(e,t,n){let r=[];for(let i=0;i<e;i++){let a=2*Math.PI*t*i/e,o=(i/(e-1))**n;r.push(new x(Math.cos(a),Math.sin(a),o))}return r}var nt=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,r,i,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,s=Math.floor(e+o),c=Math.floor(t+o),l=(3-Math.sqrt(3))/6,u=(s+c)*l,d=s-u,f=c-u,p=e-d,m=t-f,h,g;p>m?(h=1,g=0):(h=0,g=1);let _=p-h+l,v=m-g+l,y=p-1+2*l,b=m-1+2*l,x=s&255,S=c&255,C=this.perm[x+this.perm[S]]%12,w=this.perm[x+h+this.perm[S+g]]%12,T=this.perm[x+1+this.perm[S+1]]%12,E=.5-p*p-m*m;E<0?n=0:(E*=E,n=E*E*this._dot(this.grad3[C],p,m));let D=.5-_*_-v*v;D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[w],_,v));let O=.5-y*y-b*b;return O<0?i=0:(O*=O,i=O*O*this._dot(this.grad3[T],y,b)),70*(n+r+i)}noise3d(e,t,n){let r,i,a,o,s=(e+t+n)*(1/3),c=Math.floor(e+s),l=Math.floor(t+s),u=Math.floor(n+s),d=1/6,f=(c+l+u)*d,p=c-f,m=l-f,h=u-f,g=e-p,_=t-m,v=n-h,y,b,x,S,C,w;g>=_?_>=v?(y=1,b=0,x=0,S=1,C=1,w=0):g>=v?(y=1,b=0,x=0,S=1,C=0,w=1):(y=0,b=0,x=1,S=1,C=0,w=1):_<v?(y=0,b=0,x=1,S=0,C=1,w=1):g<v?(y=0,b=1,x=0,S=0,C=1,w=1):(y=0,b=1,x=0,S=1,C=1,w=0);let T=g-y+d,E=_-b+d,D=v-x+d,O=g-S+2*d,ee=_-C+2*d,te=v-w+2*d,ne=g-1+3*d,k=_-1+3*d,A=v-1+3*d,j=c&255,M=l&255,N=u&255,re=this.perm[j+this.perm[M+this.perm[N]]]%12,ie=this.perm[j+y+this.perm[M+b+this.perm[N+x]]]%12,ae=this.perm[j+S+this.perm[M+C+this.perm[N+w]]]%12,oe=this.perm[j+1+this.perm[M+1+this.perm[N+1]]]%12,P=.6-g*g-_*_-v*v;P<0?r=0:(P*=P,r=P*P*this._dot3(this.grad3[re],g,_,v));let F=.6-T*T-E*E-D*D;F<0?i=0:(F*=F,i=F*F*this._dot3(this.grad3[ie],T,E,D));let I=.6-O*O-ee*ee-te*te;I<0?a=0:(I*=I,a=I*I*this._dot3(this.grad3[ae],O,ee,te));let L=.6-ne*ne-k*k-A*A;return L<0?o=0:(L*=L,o=L*L*this._dot3(this.grad3[oe],ne,k,A)),32*(r+i+a+o)}noise4d(e,t,n,r){let i=this.grad4,a=this.simplex,o=this.perm,s=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,l,u,d,f,p,m=(e+t+n+r)*s,h=Math.floor(e+m),g=Math.floor(t+m),_=Math.floor(n+m),v=Math.floor(r+m),y=(h+g+_+v)*c,b=h-y,x=g-y,S=_-y,C=v-y,w=e-b,T=t-x,E=n-S,D=r-C,O=w>T?32:0,ee=w>E?16:0,te=T>E?8:0,ne=w>D?4:0,k=T>D?2:0,A=+(E>D),j=O+ee+te+ne+k+A,M=+(a[j][0]>=3),N=+(a[j][1]>=3),re=+(a[j][2]>=3),ie=+(a[j][3]>=3),ae=+(a[j][0]>=2),oe=+(a[j][1]>=2),P=+(a[j][2]>=2),F=+(a[j][3]>=2),I=+(a[j][0]>=1),L=+(a[j][1]>=1),se=+(a[j][2]>=1),ce=+(a[j][3]>=1),le=w-M+c,ue=T-N+c,de=E-re+c,fe=D-ie+c,R=w-ae+2*c,pe=T-oe+2*c,me=E-P+2*c,z=D-F+2*c,he=w-I+3*c,ge=T-L+3*c,_e=E-se+3*c,ve=D-ce+3*c,ye=w-1+4*c,B=T-1+4*c,be=E-1+4*c,xe=D-1+4*c,V=h&255,H=g&255,U=_&255,W=v&255,Se=o[V+o[H+o[U+o[W]]]]%32,Ce=o[V+M+o[H+N+o[U+re+o[W+ie]]]]%32,we=o[V+ae+o[H+oe+o[U+P+o[W+F]]]]%32,G=o[V+I+o[H+L+o[U+se+o[W+ce]]]]%32,Te=o[V+1+o[H+1+o[U+1+o[W+1]]]]%32,K=.6-w*w-T*T-E*E-D*D;K<0?l=0:(K*=K,l=K*K*this._dot4(i[Se],w,T,E,D));let q=.6-le*le-ue*ue-de*de-fe*fe;q<0?u=0:(q*=q,u=q*q*this._dot4(i[Ce],le,ue,de,fe));let J=.6-R*R-pe*pe-me*me-z*z;J<0?d=0:(J*=J,d=J*J*this._dot4(i[we],R,pe,me,z));let Ee=.6-he*he-ge*ge-_e*_e-ve*ve;Ee<0?f=0:(Ee*=Ee,f=Ee*Ee*this._dot4(i[G],he,ge,_e,ve));let De=.6-ye*ye-B*B-be*be-xe*xe;return De<0?p=0:(De*=De,p=De*De*this._dot4(i[Te],ye,B,be,xe)),27*(l+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}_dot4(e,t,n,r,i){return e[0]*t+e[1]*n+e[2]*r+e[3]*i}},rt=class e extends Be{constructor(e,t,n=512,r=512,a,o,c){super(),this.width=n,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Ze(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new i(this.width,this.height,{type:T,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new P({defines:Object.assign({},Je.defines),uniforms:G.clone(Je.uniforms),vertexShader:Je.vertexShader,fragmentShader:Je.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new D,this.normalMaterial.blending=0,this.pdMaterial=new P({defines:Object.assign({},$e.defines),uniforms:G.clone($e.uniforms),vertexShader:$e.vertexShader,fragmentShader:$e.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new P({defines:Object.assign({},Ye.defines),uniforms:G.clone(Ye.uniforms),vertexShader:Ye.vertexShader,fragmentShader:Ye.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new P({uniforms:G.clone(ze.uniforms),vertexShader:ze.vertexShader,fragmentShader:ze.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new P({uniforms:G.clone(Xe.uniforms),vertexShader:Xe.vertexShader,fragmentShader:Xe.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new Ue(null),this._originalClearColor=new s,this.setGBuffer(a?a.depthTexture:void 0,a?a.normalTexture:void 0),o!==void 0&&this.updateGtaoMaterial(o),c!==void 0&&this.updatePdMaterial(c)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e===void 0?(this.depthTexture=new De,this.depthTexture.format=y,this.depthTexture.type=j,this.normalRenderTarget=new i(this.width,this.height,{minFilter:v,magFilter:v,type:T,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1);let n=+!!this.normalTexture,r=this.depthTexture===this.normalTexture?`w`:`x`;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=et(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,n,r){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case e.OUTPUT.Off:break;case e.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(t,this.blendMaterial,this.renderToScreen?null:n);break;default:console.warn(`THREE.GTAOPass: Unknown output type.`)}}_renderPass(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,i=t.clearAlpha||i,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(e){(e.isPoints||e.isLine||e.isLine2)&&e.visible&&(e.visible=!1,t.push(e))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new nt,n=e*e*4,r=new Uint8Array(n);for(let n=0;n<e;n++)for(let i=0;i<e;i++){let a=n,o=i;r[(n*e+i)*4]=(t.noise(a,o)*.5+.5)*255,r[(n*e+i)*4+1]=(t.noise(a+e,o)*.5+.5)*255,r[(n*e+i)*4+2]=(t.noise(a,o+e)*.5+.5)*255,r[(n*e+i)*4+3]=(t.noise(a+e,o+e)*.5+.5)*255}let i=new p(r,e,e,_e,Ee);return i.wrapS=R,i.wrapT=R,i.needsUpdate=!0,i}};rt.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var it={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},at=class extends Be{constructor(){super(),this.isOutputPass=!0,this.uniforms=G.clone(it.uniforms),this.material=new U({name:it.name,uniforms:this.uniforms,vertexShader:it.vertexShader,fragmentShader:it.fragmentShader}),this._fsQuad=new Ue(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},u.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},ot=class extends Be{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new s}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},st={radius:.14,strength:.85},ct=class{composer;occlusion;constructor(e,t,n,r){let a=e.getDrawingBufferSize(new q);this.composer=new qe(e,new i(a.x,a.y,{type:T,samples:4})),this.composer.setPixelRatio(1),this.composer.addPass(new ot(t,n)),this.occlusion=new rt(t,n,a.x,a.y),this.occlusion.updateGtaoMaterial({radius:st.radius,distanceExponent:1.4,thickness:1,scale:1,samples:16,distanceFallOff:1}),this.occlusion.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:16}),this.occlusion.blendIntensity=st.strength;let o=this.occlusion,s=o._overrideVisibility.bind(o);o._overrideVisibility=()=>{s(),o._visibilityCache.push(...lt(t,r))},this.composer.addPass(this.occlusion),this.composer.addPass(new at),this.composer.setSize(a.x,a.y)}render(){this.composer.render()}setSize(e,t){this.composer.setSize(e,t)}dispose(){this.occlusion.dispose(),this.composer.dispose()}};function lt(e,t){let n=[];return e.traverse(e=>{e instanceof d&&e.visible&&!t(e)&&(e.visible=!1,n.push(e))}),n}function ut(e,{x:t,y:n,ux:r,uy:i,vx:a,vy:o}){let s=Math.hypot(r,i),c=Math.hypot(a,o);if(s<1||c<1)return;let[l,u,d,f]=[r/s,i/s,a/c,o/c],p=Math.abs(u)<.02&&Math.abs(d)<.02?`translate(${Math.round(t)}px, ${Math.round(n)}px)`:`matrix(${l.toFixed(4)}, ${u.toFixed(4)}, ${d.toFixed(4)}, ${f.toFixed(4)}, ${t.toFixed(1)}, ${n.toFixed(1)})`,m=`${s.toFixed(1)} ${c.toFixed(1)} ${p}`;e.dataset.at!==m&&(e.dataset.at=m,e.style.width=`${s.toFixed(1)}px`,e.style.height=`${c.toFixed(1)}px`,e.style.transform=p)}var Y={dark:{body:`#24242B`,kick:`#2B2B33`,hooks:`#24242B`,frame:`#1C1C21`,front:`#3A3A44`,mouth:`#0C0C10`,inside:`#24242B`,foam:`#1E1E24`,board:be},light:{body:`#8E887F`,kick:`#7A746B`,hooks:`#6E6862`,frame:`#857F76`,front:`#A19B91`,mouth:`#4A463F`,inside:`#7A746B`,foam:`#6E6862`,board:{face:`#B5AEA2`,holes:`#9F978A`,thread:`rgba(138, 106, 22, 0.7)`}}};function dt(e,t,n){let r=Y[t],i=(e,t)=>{(e?.material)?.color.set(t)};i(e.body,r.body),i(e.kick,r.kick),i(e.hooks,r.hooks),i(e.frame,r.frame);for(let t of e.fronts)i(t,r.front);for(let t of e.mouths)i(t,r.mouth);for(let t of e.insides)i(t,r.inside);for(let t of e.foams)i(t,r.foam);let a=e.face?.material;a&&(a.map=n(t),a.needsUpdate=!0)}var ft={x:-.33,y:.1,z:.03,size:.66},pt={x:-.36,y:.62,z:.16},X={web:`web`,edits:`files`,commands:`cmd`},mt={name:`nameplate_face`,job:`job_sheet`,app:`laptop_face`},ht=.72,gt={bottom:.27,width:.42,height:.18,depth:.32,front:.26,open:.28},_t={reads:-.7,tools:.7},vt=.1,yt=[.115,.105,.092,.08];function bt(e,t){let n=f.clamp(t,1,4),r=yt[n-1];return{at:new x((e-(n-1)/2)*(r+.014),.137,-.07),scale:r/vt}}var xt={reads:Array.from({length:4},(e,t)=>new x(0,.016,-.035-t*.042)),tools:Array.from({length:4},(e,t)=>bt(t,4).at)},St=[`#E6CD97`,`#DCC08A`,`#E9D5AA`,`#D9BC80`],Ct=.4,wt=new s(`#E9C46A`),Tt=.12,Et=.5,Dt=.24,Ot={bodyY:0,bodyRX:0,bodyRY:0,neckRX:0,neckRZ:0,lookX:0,lookY:-.3,armLRX:-1.42,armLRZ:-.05,armRRX:-1.42,armRRZ:.05,scale:1,band:0,screen:.12,typing:0,hands:0,click:0};function kt(e){e.armRRX=-.25,e.armRRZ=-2.6,e.hands=-.3}var Z={x:-1.1,out:.5};function At(e){e.armLRX=-.3,e.armLRZ=2.2,e.armRRX=-.3,e.armRRZ=-2.2}function jt(e){e.armLRX=Z.x,e.armRRX=Z.x,e.armLRZ=Z.out,e.armRRZ=-Z.out,e.neckRX=.03,e.neckRZ=-.24,e.bodyRX=.04}var Mt={open:1,lift:0,tilt:0,mouth:1},Nt={open:.72,lift:-.008,tilt:-.14,mouth:.85},Pt={still:Mt,starting:Mt,stopped:Mt,working:Nt,quiet:Nt,asking:{open:1,lift:.014,tilt:.1,mouth:.9},done:{open:.22,lift:.01,tilt:.08,mouth:1.3},failed:{open:.62,lift:.004,tilt:.28,mouth:.75}},Ft=1.1,It=1.5,Lt=1.6,Rt=1.2,zt=.12,Bt=new x(0,1,0),Vt=.06,Ht=1e3/30-4,Ut=new Set([`still`,`done`,`failed`,`stopped`]),Wt=1,Gt=[{x:.5,z:-.19},{x:-.5,z:-.19},{x:.84,z:-.19},{x:-.84,z:-.24}],Kt=.5,qt=.45,Jt=.35,Q=(e,t,n)=>f.smoothstep(n,e,t),Yt=e=>{for(let t=e;t;t=t.parent)if(!t.visible)return!1;return!0},Xt=e=>Q(0,.18,e)*(1-Q(.72,1,e)),$=e=>Math.sin(Math.PI*f.clamp(e,0,1));function Zt(e,t,n){let r=e=>Math.max(0,Math.sin(t*7.5+e))*(.65+.35*Math.sin(t*2.3+e));e.typing=f.lerp(e.typing,1,n),e.armLRX-=.05*r(0)*n,e.armRRX-=.05*r(Math.PI)*n,e.armLRZ+=.05*Math.sin(t*4.1)*n,e.armRRZ+=.05*Math.sin(t*3.3+1)*n,e.bodyY+=.003*Math.abs(Math.sin(t*15))*n}function Qt(e,t){let n=Math.max(0,t);for(let t=1;t<e.length;t+=1){let r=e[t-1],i=e[t],a=r.distanceTo(i),o=Math.hypot(i.x-r.x,i.z-r.z);if(n<=a||t===e.length-1)return{point:r.clone().lerp(i,a>0?Math.min(1,n/a):1),heading:o>.001?Math.atan2(i.x-r.x,i.z-r.z):0};n-=a}return{point:e[0].clone(),heading:0}}function $t(e,t,n=0){let[r,i]=Me[e],a=r+(i-r)*Math.random();return{kind:e,start:t-n*a,duration:a,next:null}}function en(e){let t=t=>{let n=e.getObjectByName(t);if(!n)throw Error(`The figure has no “${t}”.`);return n};return{body:t(`body`),neck:t(`neck`),head:t(`head`),armL:t(`arm_l`),armR:t(`arm_r`),handL:t(`hand_l`),handR:t(`hand_r`)}}function tn(e,t,n,r,i){if(!n){t.bodyRY=t.lookX*Tt;return}let a=e.head.getWorldPosition(new x),o=(n===`viewer`?r.clone():n.clone()).sub(a);i!==0&&o.applyAxisAngle(Bt,-i);let s=o.z<-.1;t.lookX=f.clamp(o.x/.75,-1,1),t.lookY=f.clamp(o.y/.6,-1,1),t.bodyRY=f.clamp((s?-o.x:o.x)*.25,-.12,Tt)}function nn(e,t,n,r){e.body.position.y=t.bodyY,e.body.rotation.set(t.bodyRX,t.bodyRY,0),e.neck.rotation.set(t.neckRX-t.lookY*.05,0,t.neckRZ-t.lookX*.06),e.head.rotation.set(-t.lookY*Dt,t.lookX*Et,0),e.head.scale.setScalar(t.scale),e.armL.rotation.set(t.armLRX,0,t.armLRZ),e.armR.rotation.set(t.armRRX,0,t.armRRZ),A(e.body);for(let[i,a,o]of[[e.handL,0,!1],[e.handR,1.9,!0]]){let e=Math.max(0,Math.sin(n*11+a))**3;i.rotation.x=t.hands+t.typing*.35*e*r+(o?t.click*.45:0)}}function rn(e){let t=[`l`,`r`].flatMap(t=>{let n=e.getObjectByName(`brow_${t}`);return n?[{node:n,y:n.position.y,z:n.rotation.z,side:t===`l`?1:-1}]:[]}),n=e.getObjectByName(`mouth`);return{brows:t,mouth:n?{node:n,x:n.scale.x}:null}}function an(e,t,n,r=1){let i=t-n,a=i<0?1:i<.14?.12+.88*Math.abs(i/.07-1):1;for(let t of e)t.scale.y=a*r;return i>=.14?t+2.6+t*7.13%3.4:n}function on(e,t){let n=e/2,r=new me;return r.moveTo(-n+t,0),r.lineTo(n-t,0),r.absarc(n-t,t,t,-Math.PI/2,0,!1),r.lineTo(n,e-t),r.absarc(n-t,e-t,t,0,Math.PI/2,!1),r.lineTo(-n+t,e),r.absarc(-n+t,e-t,t,Math.PI/2,Math.PI,!1),r.lineTo(-n,t),r.absarc(-n+t,t,t,Math.PI,Math.PI*1.5,!1),r}function sn(e){let t=e.geometry.getAttribute(`uv`),n=e.geometry.getAttribute(`position`);return[[0,0],[1,0],[0,1]].map(([e,r])=>{let i=0;for(let n=1;n<t.count;n+=1)Math.hypot(t.getX(n)-e,t.getY(n)-r)<Math.hypot(t.getX(i)-e,t.getY(i)-r)&&(i=n);return new x().fromBufferAttribute(n,i)})}function cn(e,t,n,r,{reduced:i,away:a},o,s){let c=s.screen;switch(e){case`reading`:n.screen=.6;break;case`thinking`:n.screen=.3;break;case`tools`:n.screen=.9,!i&&r>=t.nextFlash&&(t.flash=Math.max(t.flash,.55+.45*Math.random()),t.nextFlash=r+.22+.7*Math.random())}if(i||a)return t.busy=null,o;let l=t=>je[e].some(e=>e.kind===t),u=t.busy;!u||!l(u.kind)?u=t.busy=$t(Pe(e,u?.kind??null,Math.random()),r):r>=u.start+u.duration?u=t.busy=$t(u.next&&l(u.next)?u.next:Pe(e,u.kind,Math.random()),r):!u.next&&r>=u.start+u.duration*.7&&(u.next=Pe(e,u.kind,Math.random()),u.next===u.kind&&(u=t.busy=$t(u.kind,r,.2)));let d=(r-u.start)/u.duration,p=Xt(d),m=(e,t)=>{n[e]=f.lerp(n[e],t,p)},h=(e,t)=>{n[e]+=t*p},g=(e,t,n)=>s.head().add(new x(e,t,n)),_;switch(u.kind){case`read`:{let e=Math.floor(r/1.6);m(`bodyRX`,.07),_=c().add(new x(-.08+.16*Q(0,.85,r/1.6%1),.04-e%4*.025,0));break}case`checkJob`:m(`armRRX`,-1.45),m(`armRRZ`,-.42),_=s.job();break;case`scratch`:{let e=Math.max(0,Math.sin(r*3.1))*Math.sin(r*17);m(`armRRX`,-.45),m(`armRRZ`,-2.45),h(`armRRZ`,.12*e),m(`hands`,-.6),h(`hands`,.3*e),m(`neckRZ`,.07),_=g(-.35,.3,.6);break}case`ponder`:m(`armRRX`,-2),m(`armRRZ`,-.75),m(`hands`,.5),h(`hands`,.2*Math.max(0,Math.sin(r*4.5))**4),m(`bodyRX`,-.03),_=g(-.5+.12*Math.sin(r*.7),.5+.06*Math.sin(r*1.1),.5);break;case`lookUp`:m(`armLRX`,-1.2),m(`armRRX`,-1.2),m(`bodyRX`,-.05),_=g(.3*Math.sin(r*.5),.9,.3);break;case`click`:m(`armRRX`,-1.5),m(`armRRZ`,.16+.07*Math.sin(r*1.7)),h(`click`,Math.max(0,Math.sin(r*5.3))**10),m(`bodyRX`,.03),_=c().add(new x(.06*Math.sin(r*1.7),.03*Math.sin(r*2.3),0));break;case`peer`:m(`bodyRX`,.12),m(`neckRX`,.06),_=c();break;case`type`:Zt(n,r,p),_=c();break;case`nod`:h(`neckRX`,.12*Math.max(0,Math.sin(d*Math.PI*4))),_=c()}return p>.3?_:o}var ln=class{renderer;shading=null;scene=new ie;camera=new Se(24,1,.1,40);callbacks;reduced;raycaster=new N;nodes=new Map;roles=new Map;pickables=[];disposables=[];keyHome=new Map;keyDish=new Map;cards=Array.from({length:6},()=>({group:null,skill:null}));files=Array.from({length:4},()=>({group:null,source:null}));drawerOpen={reads:null,tools:null};stocked=Array.from({length:4},()=>({group:null,tool:null}));faces=new Map;faceCorners=new Map;parts=new Map;flashes=new Map;view=null;loaded=!1;running=!1;frameId=0;last=0;width=1;height=1;pointer=null;hovered=null;hoveredKey=null;drag=null;press=null;actions=[];tweens=[];pose={...Ot};face={...Mt};faceRest=null;nextFidget=7;nextBlink=2.5;now=0;events=0;flicker=0;screenLight=null;moodSince=0;movedAt=0;acting={busy:null,flash:0,nextFlash:0};rig=null;disposed=!1;seats=new Map;seatedAs=``;thoughtMark=new e;errands=[];seenUses=new Set;trip=null;figureHome=new x;cupOnDesk=null;wound=null;builds=new Map;build=null;building=null;eyes=[];drawn={figure:``};options;tone;drawerParts={fronts:[],mouths:[],insides:[],foams:[]};boards=new Map;constructor(e,r,i,a={}){this.callbacks=r,this.reduced=i,this.options=a,this.tone=a.tone??`dark`,this.renderer=new ue({canvas:e,antialias:!0,alpha:!0,powerPreference:`low-power`}),this.renderer.setClearColor(0,0),this.renderer.toneMapping=7,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1;let o=new t(this.renderer),s=new g;this.scene.environment=o.fromScene(s,.04).texture,this.scene.environmentIntensity=.55,s.dispose(),o.dispose(),this.scene.add(new c(`#FFF6E8`,`#2A2A32`,.7));let l=new n(`#FFF3E2`,2.4);l.position.set(-1.1,4.6,3.2),l.castShadow=!0,l.shadow.mapSize.set(2048,2048),l.shadow.camera.left=-2.2,l.shadow.camera.right=2.2,l.shadow.camera.top=2.4,l.shadow.camera.bottom=-1.2,l.shadow.camera.near=.5,l.shadow.camera.far=9,l.shadow.bias=-4e-4,l.shadow.normalBias=.02,l.shadow.radius=3,l.target.position.set(0,.7,-.3),this.scene.add(l,l.target);let u=new n(`#DDE6FF`,.9);u.position.set(2.5,2.2,-2.5),this.scene.add(u);let f=new V(8,8),p=new ye({opacity:.16}),m=new d(f,p);m.rotation.x=-Math.PI/2,m.receiveShadow=!0,this.scene.add(m),this.disposables.push(f,p)}async load(e){let t=(await xe(e)).scene;this.wound=this.own(M()),t.traverse(e=>{if(e.name&&this.nodes.set(e.name,e),/_eye_[lr]$/.test(e.name)&&this.eyes.push(e),!(e instanceof d))return;let t=e.material.name;e.material.dispose(),e.material=this.material(t,e.name),this.roles.set(e,t);let n=e.name.endsWith(`_face`)||e.name.endsWith(`_label`)||e.name===`job_sheet`||e.name===`laptop_screen`,r=t===`glint`||t===`blush`;e.castShadow=!r&&!n,e.receiveShadow=!r,this.pickables.push(e),this.disposables.push(e.geometry)}),this.emptyFigure();for(let[e,t]of Object.entries(mt))this.faceCorners.set(e,sn(this.node(t)));this.scene.add(t),this.options.clipboardOnBoard&&this.hangClipboard(),this.buildDrawer(`reads`),this.buildDrawer(`tools`),this.tone!==`dark`&&this.repaint(),t.updateMatrixWorld(!0);for(let{key:e,node:t}of Ae){let n=this.node(`key_${t}`);this.keyHome.set(e,{p:n.position.clone(),q:n.quaternion.clone()});let r=n.worldToLocal(new m().setFromObject(n).getCenter(new x));this.keyDish.set(e,r.multiplyScalar(-.72))}this.lights(),this.figureHome.copy(this.node(`figure`).position),await this.showBuild(this.view?.figure.kind??`tall`),this.placeThought(),await K(this.renderer,this.scene,this.camera),this.loaded=!0,this.frame(),b(this.scene),this.view&&this.apply(null,this.view)}hangClipboard(){let e=this.node(`job`);this.node(`pegboard`).add(e),e.position.set(ft.x,ft.y,ft.z),e.rotation.set(Math.PI/2,0,0),e.scale.setScalar(ft.size),this.node(`job_stand`).visible=!1}placeThought(){let e=this.node(`head`);e.updateWorldMatrix(!0,!0);let t=new m;if(e.traverse(e=>{e instanceof d&&Yt(e)&&t.expandByObject(e)}),t.isEmpty())return;let n=e.worldToLocal(new x(0,t.max.y,0).setX((t.min.x+t.max.x)/2).setZ((t.min.z+t.max.z)/2));this.thoughtMark.position.set(0,n.y+Vt,0)}lights(){this.screenLight=new le(`#6AB8FF`,0,1.1,2),this.screenLight.position.set(0,.1,-.12),this.node(`laptop_lid`).add(this.screenLight)}set(e,t=!1){let n=t?null:this.view;t&&(this.events=e.events),this.view=e,this.loaded&&this.apply(n,e)}resize(e,t){let n=F(this.renderer,e,t);if(this.shading){let e=this.renderer.getDrawingBufferSize(new q);this.shading.setSize(e.x,e.y)}this.width=n.width,this.height=n.height,this.camera.aspect=this.width/this.height,this.fit(),this.frame()}start(){this.running||(this.running=!0,this.last=performance.now(),this.frameId=requestAnimationFrame(this.tick))}stop(){this.running=!1,cancelAnimationFrame(this.frameId)}dispose(){this.stop(),this.disposed=!0,this.scene.traverse(e=>{e instanceof d&&e.material.dispose()});for(let e of this.disposables)e.dispose();this.scene.environment?.dispose(),this.shading?.dispose(),this.renderer.dispose()}pointerMove(e,t){if(this.pointer=new q(e,t),this.movedAt=this.now,this.drag){if(!this.drag.moved&&Math.hypot(e-this.drag.x,t-this.drag.y)>5){this.drag.moved=!0;let e=this.node(`key_${X[this.drag.key]}`);this.tweens=this.tweens.filter(t=>t.node!==e),this.scene.attach(e)}if(this.drag.moved){let n=new x;this.ray(e,t).ray.intersectPlane(this.drag.plane,n),n&&this.node(`key_${X[this.drag.key]}`).position.copy(n)}return}let n=this.pick(e,t);this.hovered=n?.part??null,this.hoveredKey=n?.key??null,this.callbacks.onHover(this.hovered,!!n?.key)}pointerDown(e,t){let n=this.pick(e,t);if(n?.key){let r=this.node(`key_${X[n.key]}`).getWorldPosition(new x),i=this.camera.getWorldDirection(new x).negate();return this.drag={key:n.key,x:e,y:t,moved:!1,plane:new he().setFromNormalAndCoplanarPoint(i,r)},!0}return this.press={part:n?.part??null,x:e,y:t},!1}pointerUp(e,t){let n=this.drag,r=this.press;if(this.drag=null,this.press=null,n&&this.view){let r=!!this.view.look.allow[n.key],i=!r;if(n.moved){let r=this.screen(this.node(`hook_${X[n.key]}`).getWorldPosition(new x)),a=this.screen(this.node(`dish`).getWorldPosition(new x));i=Math.hypot(e-r.x,t-r.y)<Math.hypot(e-a.x,t-a.y)}this.homeKey(n.key,i),i!==r&&this.callbacks.onKey(n.key,i)}else r&&r.part&&Math.hypot(e-r.x,t-r.y)<6&&this.callbacks.onPart(r.part)}pointerLeave(){this.pointer=null,this.movedAt=this.now,this.hovered=null,this.hoveredKey=null,this.callbacks.onHover(null,!1)}apply(e,t){let{look:n}=t,r=`${t.figure.kind}/${t.figure.color}/${t.figure.sign??``}/${Re(t.figure).join()}`;this.drawn.figure!==r&&(this.drawn.figure=r,this.wear(t.figure));for(let{node:e,word:t,key:n}of Ae)this.faces.has(`key_${e}_label`)||this.paint(`key_${e}_label`,ne(t,n===`commands`));this.node(`envelope`).visible=t.hasReply||t.mood===`done`,this.pinCards(n.skills,e!==null),this.node(`reads`).visible=!!t.reads,this.slideDrawer(`reads`,!!t.reads?.length,e!==null),this.fileSources(t.reads??[],e!==null),this.node(`tools`).visible=!!t.tools,this.slideDrawer(`tools`,!!t.tools?.length,e!==null),this.hangTools(t.tools??[],e!==null);for(let{key:t}of Ae){let r=this.node(`key_${X[t]}`),i=this.node(n.allow[t]?`hook_${X[t]}`:`dish_${X[t]}`);r.parent!==i&&this.drag?.key!==t&&!this.tweens.some(e=>e.node===r)&&this.homeKey(t,!!n.allow[t],e!==null)}t.events>this.events&&!this.reduced&&(this.flicker=1);for(let e of t.uses??[])this.seenUses.has(e.id)||(this.seenUses.add(e.id),!this.reduced&&this.errands.length<2&&this.errands.push(e));if(this.events=t.events,e){for(let t of Fe(e.look,n))this.react(t);(e.figure.kind!==t.figure.kind||e.figure.color!==t.figure.color)&&this.react({kind:`redressed`}),e.reads&&t.reads&&dn(e.reads)!==dn(t.reads)&&this.react({kind:`filed`}),e.tools&&t.tools&&fn(e.tools)!==fn(t.tools)&&this.react({kind:`tooled`}),e.mood!==t.mood&&this.moodChanged(e.mood,t.mood)}}wear(e){if(e.kind!==this.build){this.showBuild(e.kind);return}let t=o(e.color);for(let e of[...this.meshes(`skin`),...this.meshes(`skin_wound`)])J(e.material,t);let n=t.clone().multiplyScalar(.86);for(let e of this.meshes(`skin_deep`))J(e.material,n);let r=`sign_${e.sign??`curl`}`,i=new Set(Re(e));this.node(`figure`).traverse(e=>{e.name.startsWith(`sign_`)&&(e.visible=e.name===r);let t=/^wear_([a-z_]+?)(_sleeve)?(_[lr])?(_pose_[a-z]+)?$/.exec(e.name);t&&(e.visible=i.has(t[1]),t[4]&&(e.userData.worn=e.visible))}),Te(this.node(`figure`),pe(i));let a=[...i].find(z);ve(this.node(`figure`),a?we(this.node(`figure`),a):null),A(this.node(`figure`)),this.setCupDown(i.has(`coffee`)),this.placeThought()}setCupDown(e){let t=this.nodes.get(`bench`);if(!this.cupOnDesk){let e=this.node(`figure`).getObjectByName(`wear_coffee`);if(!t||!(e instanceof d))return;e.updateWorldMatrix(!0,!1),t.updateWorldMatrix(!0,!1),t.attach(e);let n=this.node(`figure`).getWorldQuaternion(new k);e.quaternion.copy(t.getWorldQuaternion(new k).invert().multiply(n)),e.geometry.computeBoundingBox();let r=e.geometry.boundingBox,i=new x((r.min.x+r.max.x)/2,r.min.y,(r.min.z+r.max.z)/2).multiply(e.scale).applyQuaternion(e.quaternion);e.position.set(pt.x,pt.y,pt.z).sub(i),this.cupOnDesk=e}this.cupOnDesk.visible=e}showFace(){let e=this.faceRest;if(e){for(let t of e.brows)t.node.position.y=t.y+this.face.lift,t.node.rotation.z=t.z+t.side*this.face.tilt;e.mouth&&(e.mouth.node.scale.x=e.mouth.x*this.face.mouth)}}emptyFigure(){let e=this.node(`figure`),t=new Set;this.cupOnDesk&&=(t.add(this.cupOnDesk),this.cupOnDesk.removeFromParent(),null);for(let n of[...e.children])n.traverse(e=>t.add(e)),e.remove(n);for(let e of t)if(e.name&&this.nodes.get(e.name)===e&&this.nodes.delete(e.name),e instanceof d){this.roles.delete(e),this.parts.delete(e);let t=this.pickables.indexOf(e);t>=0&&this.pickables.splice(t,1)}for(let e=this.eyes.length-1;e>=0;--e)t.has(this.eyes[e])&&this.eyes.splice(e,1);this.faceRest=null}async showBuild(e){if(this.building===e)return;this.building=e;let t=this.builds.get(e);t||(t=this.loadBuild(e),this.builds.set(e,t));let n=await t;if(this.building!==e||this.disposed)return;this.emptyFigure();let r=this.node(`figure`);for(let e of[...n.clone(!0).children])r.add(e);re(r),r.traverse(e=>{e!==r&&(e.name&&this.nodes.set(e.name,e),/_eye_[lr]$/.test(e.name)&&this.eyes.push(e),e instanceof d&&(e.material=e.material.clone(),e.material.name.startsWith(`wear_`)&&a(e.material,!!e.geometry.getAttribute(`stripeAt`)),this.roles.set(e,e.material.name),this.pickables.push(e)))});for(let[e,t]of this.roles)if(t===`skin`&&this.node(`figure`).getObjectById(e.id))for(let t of ee(e))this.disposables.push(t.material);this.rig=en(r),oe(r),this.faceRest=rn(r),this.node(`head`).add(this.thoughtMark),this.build=e,this.building=null,this.view&&this.wear(this.view.figure)}async loadBuild(e){let t=(await xe(`${this.options.figures??`/agent/figure/`}${e}.glb`)).scene.getObjectByName(`figure`);if(!t)throw Error(`The ${e} figure has no “figure”.`);return r(t),t.traverse(e=>{if(!(e instanceof d))return;let n=e.material.name,r=e.material;n.startsWith(`wear_`)?(S(e,t),e.material=L(e)):e.material=this.material(n,e.name),r.dispose(),e.material.name=n;let i=n===`glint`||n===`freckle`;e.castShadow=!i,e.receiveShadow=!i,(e.name.startsWith(`sign_`)||e.name.startsWith(`wear_`))&&(e.visible=!1),this.disposables.push(e.geometry,e.material)}),t}paint(e,t){let n=this.node(e),r=n.material;r.map?.dispose(),r.map=t,r.color.set(`#FFFFFF`),r.needsUpdate=!0,this.faces.set(e,n)}pinCards(e,t){for(let n=0;n<6;n+=1){let r=e[n]??null,i=this.cards[n];i.skill!==r&&(i.group&&this.unpin(i.group,t),i.group=r?this.pin(n,r,t):null,i.skill=r)}}pin(e,t,n){let r=new C;r.name=`card_${e+1}_card`;let i=new h(.21,.155,.008),a=new d(i,new O({color:`#EFEAE0`,roughness:.8}));a.name=`card_${e+1}_board`,a.castShadow=!0;let o=new V(.2,.15),s=new d(o,new O({map:ce(t,e),roughness:.85}));s.name=`card_${e+1}_face`,s.position.z=.0045,s.material.map.flipY=!0;let c=new I(.014,16,10),l=new d(c,new O({color:[`#C0342E`,`#D8A93C`,`#2F7DD3`][e%3],roughness:.35}));l.position.set(0,.06,.016),l.castShadow=!0,r.add(a,s,l),r.rotation.z=f.degToRad(e*37%7-3),this.node(`card_${e+1}`).add(r);for(let e of[a,s,l])this.pickables.push(e),this.roles.set(e,`card`);return this.disposables.push(i,o,c),n&&!this.reduced&&(r.scale.setScalar(.01),r.position.z=.25,this.tween(r,new x(0,0,0),new k().setFromAxisAngle(new x(0,0,1),r.rotation.z),.5,.06)),r}unpin(e,t){let n=()=>{e.removeFromParent(),e.traverse(e=>{if(!(e instanceof d))return;let t=this.pickables.indexOf(e);t>=0&&this.pickables.splice(t,1),this.roles.delete(e),this.parts.delete(e),e.material.map?.dispose(),e.material.dispose()})};!t||this.reduced?n():this.tween(e,new x(0,-.4,.2),e.quaternion.clone(),.4,0,n,!0)}buildDrawer(e){let t=new C;t.name=e,t.position.set(_t[e],gt.bottom,gt.front);let n=new C;n.name=`${e}_drawer`,t.add(n);let r=(t,n,r,i,a,o)=>(n.name=`${e}_${r}`,n.position.set(i,a,o),n.castShadow=!0,n.receiveShadow=!0,t.add(n),this.pickables.push(n),this.roles.set(n,`drawer`),this.disposables.push(n.geometry),n),i=(e,t,n,r)=>new d(new h(e,t,n),r),{width:a,height:o,depth:s}=gt,c=r(t,new d(new V(a+.02,o+.02),new O({color:Y.dark.mouth,roughness:1})),`mouth`,0,o/2,.001);c.castShadow=!1,this.drawerParts.mouths.push(c);let l=r(n,i(a,o,.024,new E({color:Y.dark.front,roughness:.5,clearcoat:.35,clearcoatRoughness:.35})),`front`,0,o/2,.012);this.drawerParts.fronts.push(l),r(n,i(.13,.054,.006,this.material(`gold`,e)),`frame`,0,o*.68,.026),r(n,i(.11,.036,.004,this.material(`paper`,e)),`card`,0,o*.68,.029),r(n,i(.12,.016,.014,this.material(`gold`,e)),`pull`,0,o*.3,.044);for(let t of[-.05,.05])r(n,i(.012,.012,.022,this.material(`gold`,e)),`post_${t<0?`l`:`r`}`,t,o*.3,.034);let u=()=>this.material(`graphite`,e),f=[r(n,i(a-.03,.008,s,u()),`floor`,0,.012,-s/2),...[-1,1].map(e=>r(n,i(.008,o*.7,s,u()),`side_${e<0?`l`:`r`}`,e*(a/2-.02),o*.35+.008,-s/2)),r(n,i(a-.03,o*.7,.008,u()),`back`,0,o*.35+.008,-s)];this.drawerParts.insides.push(...f),e===`tools`&&this.drawerParts.foams.push(r(n,i(a-.048,.11900000000000001,s-.008,new O({color:Y.dark.foam,roughness:.95})),`foam`,0,.15100000000000002/2,-s/2)),xt[e].forEach((t,r)=>{let i=new C;i.name=`${e}_${r+1}`,i.position.copy(t),n.add(i),this.nodes.set(i.name,i)}),this.scene.add(t),t.updateMatrixWorld(!0);for(let e of[t,n,l])this.nodes.set(e.name,e)}slideDrawer(e,t,n){if(this.drawerOpen[e]===t)return;this.drawerOpen[e]=t;let r=this.node(`${e}_drawer`),i=new x(0,0,t?gt.open:0);this.tweens=this.tweens.filter(e=>e.node!==r),!n||this.reduced?r.position.copy(i):this.tween(r,i,r.quaternion.clone(),.45,0)}fileSources(e,t){for(let n=0;n<4;n+=1){let r=e[n]??null,i=r?un(r):null,a=this.files[n];a.source!==i&&(a.group&&this.unpin(a.group,t),a.group=r?this.file(n,r,t):null,a.source=i)}}file(e,t,n){let r=new C;r.name=`reads_${e+1}_${t.kind}`;let i=[],a=(e,t,n,a,o,c,l=.8)=>{let u=new d(new h(e,t,.004),new O({color:new s(n).multiplyScalar(Ct),roughness:l}));return u.position.set(a,o,c),u.castShadow=!0,u.receiveShadow=!0,r.add(u),i.push(u),u};if(t.kind===`folder`){let t=St[e%St.length];a(.3,.19,t,0,.095,-.004),a(.085,.028,t,[-.09,-.03,.03,.09][e%4],.2,-.004),a(.3,.172,new s(t).multiplyScalar(1.04),0,.086,.001)}else{a(.26,.2,`#F7F4EE`,0,.1,0,.9);for(let e=0;e<4;e+=1)a(e===3?.11:.18,.008,`#B9B1A2`,e===3?-.045:0,.15-e*.03,.003);t.kind===`page`&&a(.03,.03,`#24242B`,-.1,.17,.004,.5)}let o=new k().setFromAxisAngle(new x(1,0,0),-.12);r.quaternion.copy(o),this.node(`reads_${e+1}`).add(r);for(let e of i)this.pickables.push(e),this.roles.set(e,`file`),this.disposables.push(e.geometry);return n&&!this.reduced&&(r.scale.setScalar(.01),r.position.set(0,.25,.2),this.tween(r,new x(0,0,0),o,.5,.04)),r}hangTools(e,t){let n=Math.min(e.length,4);for(let r=0;r<4;r+=1){let i=e[r]??null,a=this.stocked[r],o=!!(i&&a.group&&a.tool?.name===i.name);i&&this.placeTool(r,n,t&&o),o?a.tool.icon!==i.icon&&this.paintTool(a.group,i):(a.group&&this.unpin(a.group,t),a.group=i?this.toolTile(r,i,t):null),a.tool=i}}placeTool(e,t,n){let r=this.node(`tools_${e+1}`),{at:i,scale:a}=bt(e,t);r.position.equals(i)&&r.scale.x===a||(this.tweens=this.tweens.filter(e=>e.node!==r),!n||this.reduced?(r.position.copy(i),r.scale.setScalar(a)):this.tween(r,i,r.quaternion.clone(),.4,0,void 0,!1,a))}toolTile(e,t,n){let r=new C;r.name=`tools_${e+1}_tile`;let i=on(vt,vt*.24),a=.002,o=new d(new w(i,{depth:.008,bevelEnabled:!0,bevelThickness:a,bevelSize:a,bevelSegments:3,curveSegments:10}),new E({color:new s(`#F7F5F0`).multiplyScalar(Ct),roughness:.32,clearcoat:.6,clearcoatRoughness:.2}));o.name=`tools_${e+1}_body`,o.position.z=-.008/2;let c=new se(i,10),l=c.getAttribute(`uv`);for(let e=0;e<l.count;e+=1)l.setXY(e,l.getX(e)/vt+.5,l.getY(e)/vt);let u=new d(c,new E({map:H(t.name,t.icon),color:new s().setScalar(Ct),roughness:.32,clearcoat:.6,clearcoatRoughness:.2}));u.name=`tools_${e+1}_face`,u.position.z=.0064,r.add(o,u),r.rotation.set(-.22,0,f.degToRad(e*29%5-2)),this.node(`tools_${e+1}`).add(r);for(let e of[o,u])e.castShadow=!0,e.receiveShadow=!0,this.pickables.push(e),this.roles.set(e,`tool`),this.disposables.push(e.geometry);return n&&!this.reduced&&(r.scale.setScalar(.01),r.position.set(0,.25,.2),this.tween(r,new x(0,0,0),r.quaternion.clone(),.5,.06)),r}paintTool(e,t){let n=e.children.find(e=>e.name.endsWith(`_face`)).material;n.map?.dispose(),n.map=H(t.name,t.icon),n.needsUpdate=!0}homeKey(e,t,n=!0){let r=this.node(`key_${X[e]}`),i=this.node(t?`hook_${X[e]}`:`dish_${X[e]}`),a=t?this.keyHome.get(e):{p:this.keyDish.get(e),q:new k},o=t?1:ht;this.tweens=this.tweens.filter(e=>e.node!==r),r.parent!==i&&i.attach(r),!n||this.reduced?(r.position.copy(a.p),r.quaternion.copy(a.q),r.scale.setScalar(o)):this.tween(r,a.p,a.q,.55,.18,void 0,!1,o)}tween(e,t,n,r,i,a,o=!1,s=1){this.tweens.push({node:e,fromP:e.position.clone(),toP:t.clone(),fromQ:e.quaternion.clone(),toQ:n.clone(),fromS:e.scale.x,toS:o?.01:s,start:this.now,duration:r,arc:i,done:a})}react(e){if(this.reduced)return;let t=(e,t,n)=>this.actions.push({kind:e,start:this.now,duration:t,side:n});switch(e.kind){case`renamed`:t(`nameplate`,1.2);break;case`reread`:this.actions.some(e=>e.kind===`read`)||t(`read`,1.8);break;case`rethought`:t(`spark`,1.4);break;case`rebenched`:t(`plaque`,1.2);break;case`pinned`:t(`pin`,1.4);break;case`unpinned`:t(`unpin`,1);break;case`key`:t(e.given?`keyGive`:`keyTake`,1.1);break;case`redressed`:t(`redressed`,.9);break;case`filed`:t(`file`,1.4);break;case`tooled`:t(`tool`,1.4)}}moodChanged(e,t){if(this.moodSince=this.now,t===`done`&&e!==`done`&&!this.reduced){let e=this.node(`envelope`),t=this.node(`tray`),n={p:e.position.clone(),q:e.quaternion.clone()};e.position.copy(t.worldToLocal(this.node(`laptop_lid`).getWorldPosition(new x).add(new x(0,.2,0)))),this.tween(e,n.p,n.q,.9,.3)}}tick=e=>{if(!this.running||(this.frameId=requestAnimationFrame(this.tick),this.loaded&&e-this.last<Ht&&this.resting()))return;let t=Math.min(.05,Math.max(0,(e-this.last)/1e3));this.last=e,this.now+=t,this.loaded&&this.update(t),this.frame()};resting(){let e=this.view;return(!e||!Ut.has(e.mood)||e.dropping||this.actions.length>0||this.tweens.length>0||this.trip!==null||this.errands.length>0||this.seats.size>0||this.drag!==null||this.press!==null||this.flicker>0||this.acting.flash>0)&&(this.movedAt=this.now),this.now-Math.max(this.movedAt,this.moodSince)>=Wt}isFigure(e){for(let t=e;t;t=t.parent)if(t.name===`figure`||t.name.startsWith(`helper_`))return!0;return!1}frame(){this.loaded&&(this.shading??=new ct(this.renderer,this.scene,this.camera,e=>this.isFigure(e)),this.shading.render(),this.callbacks.onFrame(this.anchors(),this.facesOnScreen()))}update(e){let t=this.view;if(!t)return;let n=this.now,r=+!this.reduced,i={...Ot},a=null,o=()=>this.node(`laptop_lid`).getWorldPosition(new x).add(new x(0,.12,0));switch(t.mood){case`still`:i.bodyY=.004*Math.sin(n*1.7)*r,i.armLRX+=.035*Math.sin(n*1.3)*r,i.armRRX+=.035*Math.sin(n*1.3+1.7)*r;break;case`starting`:i.band=.7,i.screen=.45,a=`viewer`;break;case`working`:case`quiet`:!t.phase&&t.mood===`working`&&Zt(i,n,r),i.band=1,i.screen=t.mood===`working`?.75:.5,a=o();break;case`asking`:if(i.band=1,i.screen=.5,t.asked){let e=!this.reduced&&(n-this.moodSince)%3.2>2.3;i.armRRX=-1.15,i.armRRZ=-.7,a=e?`viewer`:this.node(`dish_${X[t.asked]}`).getWorldPosition(new x)}else kt(i),a=`viewer`;break;case`done`:At(i),a=`viewer`;break;case`failed`:jt(i),i.lookY=-.6,a=o()}let s=t.mood===`working`||t.mood===`quiet`?t.phase??null:null;s?a=this.work(s,i,a??o(),o):this.acting.busy=null;let c=!s&&(t.mood===`working`||t.mood===`quiet`)?[...this.seats.values()].filter(e=>e.going===null&&e.finished===null):[];c.length>0&&!this.reduced&&(a=c[Math.floor(n/3.2)%c.length].rig.head.getWorldPosition(new x));let l=this.travel(i,e,t.mood===`working`||t.mood===`quiet`);if(l&&(a=l),t.dropping)a=this.node(`card_3`).getWorldPosition(new x);else if(!a&&(t.mood===`still`||t.mood===`stopped`||t.mood===`done`)){let e=this.hovered?this.partPoint(this.hovered):null;e?a=e:this.pointer&&!this.reduced?(i.lookX=f.clamp((this.pointer.x/this.width-.5)*2.2,-1,1),i.lookY=f.clamp(-(this.pointer.y/this.height-.38)*2.2,-1,1)):this.reduced||(i.lookX=.35*Math.sin(n*.31)+.15*Math.sin(n*.87),i.lookY=-.35+.25*Math.sin(n*.43))}if(t.mood===`still`&&!this.reduced&&n>this.nextFidget&&this.actions.length===0&&!this.pointer){let e=[`lookAround`,`stretch`,`checkJob`];this.actions.push({kind:e[Math.floor(n*7.31)%e.length],start:n,duration:2.2}),this.nextFidget=n+8+n*13.7%5}this.actions=this.actions.filter(e=>n<e.start+e.duration),this.flashes=new Map;for(let e of this.actions){let t=(n-e.start)/e.duration;if(t<0)continue;let r=Xt(t),s=(e,t)=>{i[e]=f.lerp(i[e],t,r)},c=e=>{a=r>.3?e:a};switch(e.kind){case`read`:case`checkJob`:c(this.node(`job`).getWorldPosition(new x)),s(`armRRX`,-1.45),s(`armRRZ`,-.42);break;case`nameplate`:c(this.node(`nameplate`).getWorldPosition(new x).add(new x(0,.25,0))),s(`neckRX`,.16),this.flashes.set(`name`,.55*(1-t));break;case`plaque`:c(o()),this.flashes.set(`app`,.6*(1-t)),i.band=Math.max(i.band,1-t);break;case`spark`:i.scale+=.12*$(t*1.6),i.neckRZ+=.09*Math.sin(t*40)*(1-t),this.flashes.set(`mind`,.45*(1-t));break;case`redressed`:i.scale+=.18*$(t*1.3),i.bodyY+=.03*$(t*1.3),a=`viewer`;break;case`pin`:case`unpin`:c(this.node(`card_3`).getWorldPosition(new x)),i.bodyY+=.025*$(t*2);break;case`file`:c(this.node(`reads_drawer`).getWorldPosition(new x).add(new x(0,.15,.1))),i.bodyY+=.025*$(t*2),this.flashes.set(`reads`,.5*(1-t));break;case`tool`:c(this.node(`tools_drawer`).getWorldPosition(new x).add(new x(0,.15,.1))),i.bodyY+=.025*$(t*2),this.flashes.set(`tools`,.5*(1-t));break;case`keyGive`:c(this.node(`hooks`).getWorldPosition(new x)),i.bodyY+=.025*$(t*2);break;case`keyTake`:c(this.node(`dish`).getWorldPosition(new x)),s(`bodyRX`,.05);break;case`lookAround`:c(this.node(t<.5?`hooks`:`card_3`).getWorldPosition(new x));break;case`stretch`:s(`hands`,-.3),s(`armLRX`,-.2),s(`armLRZ`,2),s(`armRRX`,-.2),s(`armRRZ`,-2),i.bodyY+=.015*$(t)}}let u=this.rig;if(!u)return;tn(u,i,a,this.camera.position,this.node(`figure`).rotation.y);let d=this.reduced?1:1-Math.exp(-e*8);for(let e of Object.keys(i))this.pose[e]+=(i[e]-this.pose[e])*d;let p=this.pose;nn(u,p,n,r);let m=Pt[t.mood];for(let e of Object.keys(m))this.face[e]+=(m[e]-this.face[e])*d;if(this.showFace(),!this.reduced)this.nextBlink=an(this.eyes,this.now,this.nextBlink,this.face.open);else for(let e of this.eyes)e.scale.y=this.face.open;let h=this.node(`laptop_light`).material;h.emissive.copy(fe),h.emissiveIntensity=p.band*(this.reduced?1:.75+.25*Math.sin(n*5))+this.acting.flash*.8,this.flicker=Math.max(0,this.flicker-e*4),this.acting.flash=Math.max(0,this.acting.flash-e*5);let g=this.node(`laptop_screen`).material;g.emissiveIntensity=p.screen+this.flicker*.9+this.acting.flash*1.2,this.screenLight&&(this.screenLight.intensity=(p.screen+this.flicker*.6)*.35+this.acting.flash*.9),this.highlight(t),this.liftAsked(t),this.seatHelpers(t,e),this.tweens=this.tweens.filter(e=>{let t=f.clamp((this.now-e.start)/e.duration,0,1),n=1-(1-t)**3;return e.node.position.lerpVectors(e.fromP,e.toP,n),e.node.position.y+=e.arc*$(t),e.node.quaternion.slerpQuaternions(e.fromQ,e.toQ,n),e.node.scale.setScalar(f.lerp(e.fromS,e.toS,n)),t>=1?(e.done?.(),!1):!0})}work(e,t,n,r){return cn(e,this.acting,t,this.now,{reduced:this.reduced,away:this.trip!==null},n,{screen:r,job:()=>this.node(`job`).getWorldPosition(new x),head:()=>this.node(`head`).getWorldPosition(new x)})}seatHelpers(e,t){let n=this.now,r=+!this.reduced,i=new Map((e.helpers??[]).map(e=>[e.id,e])),a=this.drawn.figure;if(a!==this.seatedAs){this.seatedAs=a;for(let e of this.seats.values())e.going??=n}for(let e of i.values()){if(this.seats.get(e.id)?.going===null||this.seats.has(e.id))continue;let t=new Set([...this.seats.values()].map(e=>e.slot)),n=Gt.findIndex((e,n)=>!t.has(n));n<0||this.seats.set(e.id,this.seat(e.id,n))}let o=this.reduced?1:1-Math.exp(-t*8);for(let e of[...this.seats.values()]){let a=i.get(e.id);!a&&e.going===null&&(e.going=n),a&&a.state!==`working`&&e.finished===null&&(e.finished=n);let s=e.going===null?Kt*(this.reduced?1:1-(1-Q(0,qt,n-e.born))**2+.12*$((n-e.born)/qt)*(n-e.born<qt)):Kt*(this.reduced?0:1-Q(0,Jt,n-e.going));if(s<=.001&&e.going!==null){this.unseat(e);continue}e.group.scale.setScalar(s);let c={...Ot},l=()=>e.lid.getWorldPosition(new x).add(new x(0,.12*Kt,0)),u=l();!a||a.state===`working`?(c.band=1,c.screen=.75,a?.phase?u=cn(a.phase,e.acting,c,n,{reduced:this.reduced,away:!1},l(),{screen:l,job:()=>this.node(`job`).getWorldPosition(new x),head:()=>e.rig.head.getWorldPosition(new x)}):(e.acting.busy=null,Zt(c,n,r))):a.state===`done`?(e.acting.busy=null,c.screen=.3,c.neckRX+=.14*Math.max(0,Math.sin((n-(e.finished??n))*7))*r,c.bodyY+=.02*$((n-(e.finished??n))*1.4)*r,u=this.rig?.head.getWorldPosition(new x)??`viewer`):(e.acting.busy=null,c.armLRX=Z.x,c.armRRX=Z.x,c.armLRZ=Z.out,c.armRRZ=-Z.out,c.lookY=-.6,c.screen=.2),tn(e.rig,c,u,this.camera.position,e.group.rotation.y);for(let t of Object.keys(c))e.pose[t]+=(c[t]-e.pose[t])*o;nn(e.rig,e.pose,n,r),this.reduced||(e.nextBlink=an(e.eyes,n,e.nextBlink)),e.band.emissive.copy(fe),e.band.emissiveIntensity=e.pose.band*(this.reduced?1:.75+.25*Math.sin(n*5+e.slot))+e.acting.flash*.8,e.screen.emissiveIntensity=e.pose.screen+e.acting.flash*1.2,e.acting.flash=Math.max(0,e.acting.flash-t*5)}}seat(e,t){let n=Gt[t],r=this.node(`laptop`),i=r.clone(!0);i.position.set(0,0,0);let a=de(this.node(`figure`));a.position.copy(this.figureHome).sub(r.position),a.rotation.set(0,0,0);let o=new C;o.name=`helper_${t}`,o.add(i,a),o.position.set(n.x,r.position.y,n.z),o.rotation.y=n.x>0?-.28:.28,o.scale.setScalar(this.reduced?Kt:0);let s=e=>{let t=i.getObjectByName(e),n=t.material.clone();return t.material=n,n},c=s(`laptop_screen`),l=s(`laptop_light`),u=[];return a.traverse(e=>{/_eye_[lr]$/.test(e.name)&&u.push(e)}),this.scene.add(o),o.updateMatrixWorld(!0),{id:e,slot:t,group:o,rig:en(a),lid:i.getObjectByName(`laptop_lid`)??i,eyes:u,screen:c,band:l,acting:{busy:null,flash:0,nextFlash:0},pose:{...this.pose},nextBlink:this.now+1+t*.7,born:this.now,going:null,finished:null}}unseat(e){this.scene.remove(e.group),e.screen.dispose(),e.band.dispose(),this.seats.delete(e.id)}travel(e,t,n){if(!n&&this.errands.length>0&&(this.errands=[]),!this.trip){let e=this.errands.shift();if(this.trip=e?this.tripTo(e):null,!this.trip)return null}let r=this.trip,i=this.node(`figure`),[a,o,s,c]=r.legs,l=this.now-r.start,u=()=>r.item.getWorldPosition(new x),d=(t,n,r=1)=>{e[t]=f.lerp(e[t],n,r)},p=e=>{d(`armRRX`,-1.15,e),d(`armLRX`,-1.15,e),d(`armRRZ`,.28,e),d(`armLRZ`,-.28,e)};e.typing=0;let m=this.figureHome.clone(),h=0,g=-1,_;if(l<a+o+s){if(l>=a&&l<a+o){let e=(l-a)/o;m=r.path[r.path.length-1].clone(),m.y+=r.hop*$(e),h=r.face;let t=Q(0,.35,e)*(1-Q(.55,.9,e));r.reach===`up`?(d(`armRRX`,-2.75,t),d(`armRRZ`,.1,t)):(d(`armRRX`,-.85,t),d(`armLRX`,-.85,t),d(`bodyRX`,.3,t)),!r.picked&&e>=.5&&this.take(r),r.picked&&p(Q(.55,.9,e)),_=u()}else{let e=l<a,t=Q(0,1,e?l/a:(l-a-o)/s)*r.length,{point:n,heading:i}=Qt(r.path,e?t:r.length-t);m=n,h=e?i:i+Math.PI,g=t,r.picked?p(1):(d(`armLRX`,-.5+.35*Math.sin(t*16)),d(`armRRX`,-.5-.35*Math.sin(t*16))),_=e?u():n.clone().add(new x(0,.9,0)).addScaledVector(new x(Math.sin(h),0,Math.cos(h)),.8)}}else if(l<a+o+s+c){let e=(l-a-o-s)/c;!r.returned&&e>=.6&&this.putBack(r);let t=1-Q(.55,.85,e);d(`armRRX`,-1.75,t),d(`armRRZ`,.3,t),d(`armLRX`,-1.3,t),_=r.returned?this.node(`laptop_lid`).getWorldPosition(new x).add(new x(0,.12,0)):u()}else return r.returned||this.putBack(r),i.position.copy(this.figureHome),i.rotation.set(0,0,0),this.trip=null,null;i.position.copy(m),i.position.y+=g>=0?.03*Math.abs(Math.sin(g*8)):0,i.rotation.z=g>=0?.07*Math.sin(g*8):0;let v=Math.atan2(Math.sin(h-i.rotation.y),Math.cos(h-i.rotation.y)),y=i.rotation.y+v*(1-Math.exp(-t*9));return i.rotation.y=Math.atan2(Math.sin(y),Math.cos(y)),_}tripTo(e){let t=this.figureHome,n,r,i,a=0,o=`down`,s;if(e.kind===`skill`){let c=this.cards.findIndex(t=>t.skill===e.name),l=this.cards[c]?.group;if(!l)return null;n=l,r=()=>this.cards[c].group===l;let u=l.getWorldPosition(new x);i=[t.clone(),new x(u.x,t.y,-.84)],a=f.clamp(u.y-.42-t.y,0,.4),o=`up`,s=.7}else{let a=e.kind===`read`?`reads`:`tools`,o=e.kind===`read`?this.files.findIndex(t=>t.source?.split(`
`)[1]===e.name):this.stocked.findIndex(t=>t.tool?.name===e.name),c=e.kind===`read`?this.files[o]?.group:this.stocked[o]?.group;if(!c)return null;n=c,r=()=>(e.kind===`read`?this.files[o].group:this.stocked[o].group)===c;let l=c.getWorldPosition(new x),u=Math.sign(_t[a])*Rt,d=l.z+.3;i=[t.clone(),new x(u,t.y,t.z),new x(u,zt,d),new x(l.x,zt,d)],s=e.kind===`read`?.55:.9}if(!n.parent)return null;let c=n.getWorldPosition(new x),l=i[i.length-1],u=Math.atan2(c.x-l.x,c.z-l.z),d=0;for(let e=1;e<i.length;e+=1)d+=i[e].distanceTo(i[e-1]);let p=Math.max(.8,d/Ft);return{item:n,home:{parent:n.parent,p:n.position.clone(),q:n.quaternion.clone(),s:n.scale.x},still:r,path:i,length:d,face:u,hop:a,reach:o,held:s,start:this.now,legs:[p,It,p,Lt],picked:!1,returned:!1}}take(e){e.picked=!0,e.still()&&(this.tweens=this.tweens.filter(t=>t.node!==e.item),this.node(`hand_r`).attach(e.item),this.tween(e.item,new x(0,-.07,.06),new k().setFromAxisAngle(new x(1,0,0),-Math.PI/2),.35,0,void 0,!1,e.held))}putBack(e){e.returned=!0,e.picked&&e.still()&&(this.tweens=this.tweens.filter(t=>t.node!==e.item),e.home.parent.attach(e.item),this.tween(e.item,e.home.p,e.home.q,.6,.12,void 0,!1,e.home.s))}liftAsked(e){for(let{key:t}of Ae){let n=this.node(`key_${X[t]}`);if(e.look.allow[t]||this.drag?.key===t||!n.parent||this.tweens.some(e=>e.node===n))continue;let r=e.asked===t?.06+(this.reduced?0:.02*Math.sin(this.now*5)):0,i=new x(0,1,0).applyQuaternion(n.parent.getWorldQuaternion(new k).invert());n.position.copy(this.keyDish.get(t)).addScaledVector(i,r)}}highlight(e){for(let[t,n]of this.roles){if(n===`eye`||n===`glint`||n===`screen`||t.name===`laptop_light`)continue;let r=this.partOf(t),i=t.material,a=r?this.flashes.get(r)??0:0;r&&r===this.hovered&&(a=Math.max(a,.16)),r&&r===e.open&&(a=Math.max(a,.1)),e.dropping&&t.name===`pegboard_face`&&(a=.12);let o=t.parent?.name??``;e.asked&&o===`key_${X[e.asked]}`&&(a=Math.max(a,this.reduced?.35:.2+.25*(.5+.5*Math.sin(this.now*6)))),this.hoveredKey&&o===`key_${X[this.hoveredKey]}`&&(a=Math.max(a,.3)),i.emissive.copy(wt),i.emissiveIntensity=a}}anchors(){let e=(e,t)=>this.node(e).getWorldPosition(new x).add(new x(...t)),t=e(`card_1`,[0,0,0]).lerp(e(`card_2`,[0,0,0]),.5).add(new x(0,.11,0));return{mind:this.screen(e(`neck`,[.33,.3,0])),thought:this.screen(this.thoughtMark.getWorldPosition(new x)),app:this.screen(e(`laptop_face`,[0,0,0])),name:this.screen(e(`nameplate`,[0,0,0])),job:this.screen(e(`job`,[0,.3,-.12])),skills:this.screen(t),reads:this.screen(e(`reads_front`,[0,-gt.height/2-.012,.012])),tools:this.screen(e(`tools_front`,[0,-gt.height/2-.012,.012])),keys:this.screen(e(`hooks`,[0,.06,0])),dish:this.screen(e(`dish`,[0,-.01,.2])),reply:this.screen(e(`tray`,[0,.1,-.05]))}}facesOnScreen(){let e=e=>{let t=this.node(mt[e]),[n,r,i]=this.faceCorners.get(e).map(e=>this.screen(t.localToWorld(e.clone())));return{x:n.x,y:n.y,ux:r.x-n.x,uy:r.y-n.y,vx:i.x-n.x,vy:i.y-n.y}};return{name:e(`name`),job:e(`job`),app:e(`app`)}}partPoint(e){let t={mind:null,app:`laptop_lid`,name:`nameplate`,job:`job`,skills:`card_3`,reads:`reads_drawer`,tools:`tools_drawer`,keys:`hooks`,reply:`tray`}[e];return t?this.node(t).getWorldPosition(new x):null}screen(e){let t=e.clone().project(this.camera);return{x:(t.x+1)/2*this.width,y:(1-t.y)/2*this.height}}ray(e,t){return this.raycaster.setFromCamera(new q(e/this.width*2-1,-(t/this.height)*2+1),this.camera),this.raycaster}pick(e,t){let n=this.ray(e,t).intersectObjects(this.pickables,!1).find(e=>Yt(e.object));if(!n)return null;let r=[];for(let e=n.object;e;e=e.parent)e.name&&r.push(e.name);let i=Ae.find(({node:e})=>r.includes(`key_${e}`))?.key??null;return{part:ke(r),key:i}}partOf(e){if(this.parts.has(e))return this.parts.get(e)??null;let t=[];for(let n=e;n;n=n.parent)n.name&&t.push(n.name);let n=ke(t);return this.parts.set(e,n),n}meshes(e){return[...this.roles].filter(([,t])=>t===e).map(([e])=>e)}node(e){let t=this.nodes.get(e);if(!t)throw Error(`The workbench has no “${e}”.`);return t}fit(){let e=new x(0,.8,-.3),t=new x(.06,.56,1).normalize(),n=[-1.06,1.06].flatMap(e=>[new x(e,1.62,-1.1),new x(e,.66,.38),new x(e,0,.38)]).concat([new x(0,1.62,-.6)]);this.camera.updateProjectionMatrix();let r=1,i=12;for(let a=0;a<24;a+=1){let a=(r+i)/2;this.camera.position.copy(e).addScaledVector(t,a),this.camera.lookAt(e),this.camera.updateMatrixWorld(),n.every(e=>{let t=e.clone().project(this.camera);return Math.abs(t.x)<.95&&t.y<.84&&t.y>-.96})?i=a:r=a}this.camera.position.copy(e).addScaledVector(t,i),this.camera.lookAt(e),this.camera.updateProjectionMatrix()}setTone(e){e!==this.tone&&(this.tone=e,this.nodes.has(`bench_body`)&&this.repaint())}repaint(){let e=e=>this.nodes.get(e);dt({body:e(`bench_body`),kick:e(`bench_kick`),hooks:e(`hooks_bar`),frame:e(`pegboard_panel`),face:e(`pegboard_face`),...this.drawerParts},this.tone,e=>this.boardFor(e))}material(e,t){return Ce(e,t,{pegboard:()=>this.boardFor(`dark`),wound:this.wound})}boardFor(e){let t=this.boards.get(e)??this.own(ge(Y[e].board));return this.boards.set(e,t),t}own(e){return this.disposables.push(e),e}},un=e=>`${e.kind}\n${e.name}\n${e.where}`,dn=e=>e.map(un).join(`

`),fn=e=>e.map(e=>e.name).join(`
`);export{ft as CLIPBOARD_ON_BOARD,pt as COFFEE_ON_DESK,Z as FAILED_ARMS,Y as FURNITURE,Pt as MOOD_FACES,ln as WorkbenchScene,At as donePose,jt as failedPose,dt as paintFurniture,ut as placeFace,kt as questionPose,rn as restOfFace};