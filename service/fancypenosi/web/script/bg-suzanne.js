import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

async function main() {
    const canvas = document.getElementById("c");
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    const scene = new THREE.Scene();
    const loader = new GLTFLoader();

    ////////////////////////////////////////////////////////////////////////////////

    // renderer.shadows = true;
    // renderer.shadowType = 1;
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = 0;
    renderer.toneMappingExposure = 1
    // renderer.useLegacyLights = false;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setClearColor(0xffffff, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setSize(window.innerWidth, window.innerHeight);

    ////////////////////////////////////////////////////////////////////////////////

    let cameraList = [];
    let camera;

    function updateCameraAspect(camera) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    //A method to be run each time a frame is generated
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    // /**
    //  * @param {THREE.Scene} scene
    //  */
    function retrieveListOfCameras(scene) {
        // Get a list of all cameras in the scene
        scene.traverse(function (object) {
            if (object.isCamera) {
                cameraList.push(object);
            }
        });
        camera = cameraList[0];
        updateCameraAspect(camera);
        animate();
    }

    ////////////////////////////////////////////////////////////////////////////////

    // loader.load("/static/suzanne.gltf", function (g) {
    //     scene.add(g.scene)
    //     retrieveListOfCameras(scene)
    // }, undefined, function (e) {
    //     console.error("loader err", e);
    // });

    const g = await loader.loadAsync("/static/suzanne.gltf");
    scene.add(g.scene);
    retrieveListOfCameras(scene);

    ////////////////////////////////////////////////////////////////////////////////

    // const boxWidth = 1;
    // const boxHeight = 1;
    // const boxDepth = 1;
    // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // const color = 0xFFFFFF;
    // const intensity = 3;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(-1, 2, 4);
    // scene.add(light);

    ////////////////////////////////////////////////////////////////////////////////

    // const fov = 75;
    // const aspect = 2;  // the canvas default
    // const near = 0.1;
    // const far = 5;
    // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // camera.position.z = 2;

    ////////////////////////////////////////////////////////////////////////////////

    // renderer.render(scene, camera);

    ////////////////////////////////////////////////////////////////////////////////

    // /** 
    //  * @param {THREE.WebGLRenderer} renderer 
    //  * @returns {boolean}
    //  */
    // function resizeRendererToDisplaySize(renderer) {
    //     const canvas = renderer.domElement;
    //     const width = canvas.clientWidth;
    //     const height = canvas.clientHeight;
    //     const needResize = canvas.width !== width || canvas.height !== height;
    //     if (needResize) {
    //         renderer.setSize(width, height, false);
    //     }

    //     return needResize;
    // }

    // /** @type {FrameRequestCallback} */
    // function render(time) {
    //     time *= 0.001;  // convert time to seconds

    //     if (resizeRendererToDisplaySize(renderer)) {
    //         const canvas = renderer.domElement;
    //         camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //         camera.updateProjectionMatrix();
    //     }

    //     // cube.rotation.x = time;
    //     // cube.rotation.y = time;

    //     renderer.render(scene, camera);
    //     requestAnimationFrame(render);
    // }

    // requestAnimationFrame(render);
}

main();

