import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

async function main() {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: document.querySelector("#c")
    });
    const scene = new THREE.Scene();
    const loader = new GLTFLoader();

    ////////////////////////////////////////////////////////////////////////////////

    // renderer.shadows = true;
    // renderer.shadowType = 1;
    // renderer.shadowMap.enabled = true;
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.toneMapping = 0;
    // renderer.toneMappingExposure = 1
    // renderer.useLegacyLights = false;
    // renderer.toneMapping = THREE.NoToneMapping;
    // renderer.setClearColor(0xffffff, 0);
    // renderer.outputColorSpace = THREE.SRGBColorSpace
    // renderer.setSize(window.innerWidth, window.innerHeight);

    ////////////////////////////////////////////////////////////////////////////////

    /** 
     * @param {THREE.WebGLRenderer} renderer 
     * @returns {boolean}
     */
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    /** @type {FrameRequestCallback} */
    function render(time) {
        let cameraList = [];
        let camera;
        scene.traverse(function (object) {
            // @ts-ignore
            if (object.isCamera) {
                cameraList.push(object);
            }
        });
        camera = cameraList[0];

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    ////////////////////////////////////////////////////////////////////////////////

    const g = await loader.loadAsync("/public/bg/suzanne.gltf");
    scene.add(g.scene);
    requestAnimationFrame(render);
}

main();

