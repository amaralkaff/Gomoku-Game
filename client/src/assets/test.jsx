import { useEffect, useRef } from "react";

const WebGLCanvas = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2");

    document.body.style = "margin:0;touch-action:none;overflow:hidden";
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    canvas.style.userSelect = "none";

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    function resize() {
      const { innerWidth: width, innerHeight: height } = window;

      // Adjust canvas display size (css pixels).
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      // Adjust canvas drawing buffer size (actual pixels).
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Update the WebGL viewport to match the new size.
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    window.onresize = resize;

    const vertexSource = `#version 300 es
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    in vec4 position;
    
    void main(void) {
      gl_Position = position;
    }
`;

    const fragmentSource = `#version 300 es
    /*********
     * made by Matthias Hurrle (@atzedent) 
     */
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    out vec4 fragColor;
    
    uniform vec2 resolution;
    uniform float time;
    uniform vec2 touch;
    uniform int pointerCount;
    
    #define mouse (touch/resolution)
    #define P pointerCount
    #define T mod(time+40.,180.)
    #define TICK (fract(T*.025))
    
    mat2 rot(float a) {
        float c=cos(a), s=sin(a);
    
        return mat2(c,-s,s,c);
    }
    
    float rnd(vec2 p) {
        return fract(sin(dot(p,p.yx+vec2(234.78,543.12)))*345678.);
    }
    
    float box(vec3 p, vec3 s, float r) {
        p = abs(p)-s;
    
        return length(max(p,.0))+
            min(.0,max(max(p.x,p.y),p.z))-r;
    }
    
    float map(vec3 p) {
        vec3 q = p;
        const float n = 3.;
        p.xz = (fract(p.xz/n)-.5)*n;
        vec2 id = (floor(q.xz/n)-.5)*n;
        float h = max(.2,rnd(id)*2.5),
        w = max(.5,1.-rnd(id));
    
        q = mod(q*10.,1.125);
        float bld = box((p-vec3(0,h,0))+.05,vec3(w,h,w),.0125),
        wnd = box(q,vec3(1),.005);
    
        return max(bld, -(TICK<.5?max(wnd,-(bld+.05)):min(wnd,bld-.025)));
    }
    
    void cam(inout vec3 p) {
        if (P>0) {
            p.yz *= rot(-mouse.y*3.1415+1.5707);
            p.xz *= rot(3.1415-mouse.x*6.2832);
        } else {
            if (TICK>.5) {
                p.yz *= rot(-.45);
                p.xz *= rot(2.7+sin(T*.05));
            } else {
                p.yz *= rot(-.25);
                p.xz *= rot(3.1415+cos(T*.1)*.75);
            }
        }
    }
    
    void main(void) {
        vec2 uv = (
            gl_FragCoord.xy-.5*resolution
        )/min(resolution.x,resolution.y);
    
        vec3 col = vec3(0),
        p = vec3(0),
        rd = normalize(vec3(uv,1.8));
    
        cam(p);
        cam(rd);
    
        p.z += T*3.;
    
        const float steps = 60., maxd = 200.;
        float diffuse = mix(.5,1.,rnd(uv*10.+vec2(T,1)));
        for (float i=.0; i<steps; i++) {
            float d = map(p)*.5*diffuse;
    
            if (d < 1e-2) {
                col += (steps-i)/steps;
                col *= vec3(3,2,1);
                break;
            }
    
            if (d > maxd) break;
    
            p += rd*d;
        }
      fragColor = vec4(col, 1);
    }
`;

    function compile(shader, source) {
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }
    }

    let program;

    function setup() {
      const vs = gl.createShader(gl.VERTEX_SHADER);
      const fs = gl.createShader(gl.FRAGMENT_SHADER);

      compile(vs, vertexSource);
      compile(fs, fragmentSource);

      program = gl.createProgram();

      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
      }
    }

    let vertices, buffer;

    function init() {
      vertices = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
      );

      const position = gl.getAttribLocation(program, "position");

      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      program.resolution = gl.getUniformLocation(program, "resolution");
      program.time = gl.getUniformLocation(program, "time");
      program.touch = gl.getUniformLocation(program, "touch");
      program.pointerCount = gl.getUniformLocation(program, "pointerCount");
    }

    function loop(now) {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.uniform2f(program.resolution, canvas.width, canvas.height);
      gl.uniform1f(program.time, now * 1e-3);
      gl.drawArrays(gl.TRIANGLES, 0, vertices.length * 0.5);
      requestAnimationFrame(loop);
    }

    setup();
    init();
    resize();
    loop(0);

    return () => {};
  }, []);

  return (
    <div className="webgl-canvas-container">
      <canvas ref={canvasRef}></canvas>
      {children}
    </div>
  );
};

export default WebGLCanvas;
