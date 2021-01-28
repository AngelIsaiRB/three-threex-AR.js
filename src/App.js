import { PerspectiveCamera,  WebGLRenderer, sRGBEncoding } from 'three';
import Scene1 from './scenes/Scene1';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

export class App {
	constructor(container) {
		this.container = container;

		
		// ## Camera's config
		this.camera = new PerspectiveCamera(35, this.container.clientWidth / this.container.clientHeight, 0.1, 10000);
		this.camera.position.set(10, 10, 10);
		this.camera.lookAt(0, 0, 0);
		this.control = new OrbitControls(this.camera, this.container);
		// ## Renderer's config
		
		this.renderer = new WebGLRenderer({
			antialias: true,
			alpha:true,
		})
		this.renderer.setPixelRatio(window.devicePixelRatio);
		
		// sRGBEncoding
		this.renderer.outputEncoding = sRGBEncoding;
		
		// ## Light's config
		this.renderer.physicallyCorrectLights = true;
		
		this.container.appendChild(this.renderer.domElement);

		this.scene = new Scene1(this.camera, this.container);


		this.onResize();
		this.render();
	}
	
	onResize() {
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();
	}

	render() {
		this.renderer.render(this.scene, this.camera);

		// Updates here
		this.scene.update();

		this.renderer.setAnimationLoop(() => this.render());
	}
}
