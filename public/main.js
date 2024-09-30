import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 30);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const spaceTexture = new THREE.TextureLoader().load("assets/back.jpg"); // Adjusted path
scene.background = spaceTexture;

const normalTexture = new THREE.TextureLoader().load("assets/normal.jpg"); // Adjusted path
const earthTexture = new THREE.TextureLoader().load("assets/earth.jpg"); // Adjusted path
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);
earth.position.z = 0;
earth.position.setX(-10);

const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(2, 2, 2);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(pointLight, ambientLight);

const starTexture = new THREE.TextureLoader().load("assets/asteroid.jpg"); // Adjusted path
function addStar() {
  const geometry = new THREE.SphereGeometry(0.2, 24, 24);
  const material = new THREE.MeshStandardMaterial({ map: starTexture });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const moonTexture = new THREE.TextureLoader().load("assets/moon.jpg"); // Adjusted path

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

let angle = 0;
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.y += 0.075;
  angle += 0.01;
  const radius = 30;
  camera.position.x = radius * Math.sin(angle);
  camera.position.z = radius * Math.cos(angle);
  camera.lookAt(earth.position);
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y -= 0.001;
  moon.rotation.x -= 0.003;
  renderer.render(scene, camera);
}

animate();
