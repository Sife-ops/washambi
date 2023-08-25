import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { resizeRendererToDisplaySize } from "../common.js";

async function main() {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: document.querySelector("#c")
    });
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();
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

    const g = await loader.loadAsync("/public/bg/suzanne.glb");
    scene.add(g.scene);

    const mixer = new THREE.AnimationMixer(g.scene);
    const action = mixer.clipAction(g.animations[0]);
    action.play();

    ////////////////////////////////////////////////////////////////////////////////

    /** @type {FrameRequestCallback} */
    function render(time) {
        mixer.update(0.2 * clock.getDelta());

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

    requestAnimationFrame(render);
}

main();

