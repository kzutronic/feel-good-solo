import React, { Component } from "react";
import * as THREE from "three";

// import {
//   EffectComposer,
//   GlitchPass,
//   //BlurPass,
//   RenderPass
// } from "postprocessing";

class Scene extends Component {
  constructor(props) {
    super(props);

    this.state = { width: 0, height: 0 };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);

    const width = window.innerWidth / 1;
    const height = window.innerHeight / 2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
    const cube = new THREE.Mesh(geometry, material);

    let lineCount = 40;

    const grid1 = new THREE.GridHelper(60, lineCount, "#dd22ff", "#dd22ee");

    const grid2 = new THREE.GridHelper(60, lineCount, "#00ddff", "#00ddff");

    scene.add(grid1);
    scene.add(grid2);

    grid1.position.z = -0;
    grid2.position.z = -60;

    camera.position.z = 4;
    camera.position.y = 2;
    camera.rotation.x = -0.45;

    renderer.setClearColor("ffffff", 0);
    renderer.setSize(width, height);

    // var composer = new EffectComposer(renderer);
    // composer.addPass(new RenderPass(scene, camera));

    // const pass = new GlitchPass();
    // pass.renderToScreen = true;
    // composer.addPass(pass);

    // const blur = new BlurPass();
    // blur.resolutionScale = 5;
    // blur.kernelSize = 1;
    // blur.renderToScreen = true;

    // composer.addPass(blur);
    // console.log(blur);

    //const clock = new THREE.Clock();

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;
    this.grid1 = grid1;
    this.grid2 = grid2;

    //this.composer = composer;
    //this.clock = clock;

    this.mount.appendChild(this.renderer.domElement);
    this.updateWindowDimensions();
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    if (this.grid1.position.z > 40) {
      this.grid1.position.z -= 120;
    }

    if (this.grid2.position.z > 35) {
      this.grid2.position.z -= 120;
    }

    this.grid1.position.z += 0.02;
    this.grid2.position.z += 0.02;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  updateWindowDimensions() {
    this.renderer.setSize(window.innerWidth, window.innerHeight / 2);
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        style={{
          width: this.state.width,
          height: this.state.height / 2
        }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default Scene;
