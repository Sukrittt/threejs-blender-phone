import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import * as dat from "dat.gui";

const gltfLoader = new GLTFLoader();

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const timeline = gsap.timeline();

//phone
gltfLoader.load("phone.gltf", (gltf) => {
  //applying rotation and scale
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.rotation.set(0.1253, -1.5, -0.0918);
  scene.add(gltf.scene);

  //   const rotation = gui.addFolder("Rotation");
  //   rotation.add(gltf.scene.rotation, "x").min(-3).max(9).step(0.01);
  //   rotation.add(gltf.scene.rotation, "y").min(-3).max(9).step(0.01);
  //   rotation.add(gltf.scene.rotation, "z").min(-3).max(9).step(0.01);

  //   const scale = gui.addFolder("Scale");
  //   scale.add(gltf.scene.scale, "x").min(-3).max(9).step(0.01);
  //   scale.add(gltf.scene.scale, "y").min(-3).max(9).step(0.01);
  //   scale.add(gltf.scene.scale, "z").min(-3).max(9).step(0.01);

  //gsap animation
  timeline.to(gltf.scene.rotation, { y: -0.02, duration: 1 });
  timeline.to(
    gltf.scene.scale,
    { x: 2.75, y: 2.75, z: 2.75, duration: 1 },
    "-=1"
  );
  timeline.to(gltf.scene.position, { x: 1.1, duration: 1 });
  timeline.to(gltf.scene.rotation, { y: -0.4, duration: 1 }, "-=1");
  timeline.to(gltf.scene.scale, { x: 3, y: 3, z: 3, duration: 1 }, "-=1");

  // h1 and p styling

  timeline.to("h1", {
    opacity: 1,
    y: 0,
    duration: 1,
  });
  timeline.to(
    "p",
    {
      opacity: 1,
      y: 0,
      duration: 1,
    },
    "-=.2"
  );
});

// Lights
const pointLight = new THREE.AmbientLight(0xffffff, 1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0.15;
camera.position.y = 1.05;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

let scrollX = 0.15;

const movingCamera = (event) => {
  scrollX = event.clientX + 0.15;
};

document.addEventListener("mousemove", movingCamera);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  camera.position.x = scrollX * 0.00005;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
