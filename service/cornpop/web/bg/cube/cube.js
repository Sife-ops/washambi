// sources:
// https://www.youtube.com/watch?v=_QmhpmZVZIU
// https://github.com/ClassOutside/Blender_To_ThreeJS
// https://github.com/KodyJKing/hello-threejs/blob/main/src/HelloWorldPass.ts
// https://threejs.org/docs/#manual/en/introduction/Installation

import * as THREE from "three";
import { resizeRendererToDisplaySize } from "../common.js";

function main() {
    const canvas = document.getElementById("c");
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    ////////////////////////////////////////////////////////////////////////////////

    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    ////////////////////////////////////////////////////////////////////////////////

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    ////////////////////////////////////////////////////////////////////////////////

    renderer.render(scene, camera);

    ////////////////////////////////////////////////////////////////////////////////

    /** @type {FrameRequestCallback} */
    function render(time) {
        time *= 0.001;  // convert time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cube.rotation.x = time;
        cube.rotation.y = time;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
