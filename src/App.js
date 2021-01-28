import { PerspectiveCamera,  WebGLRenderer, sRGBEncoding, Camera } from 'three';
import Scene1 from './scenes/Scene1';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

export class App {
	constructor(container) {
		this.container = container;

		
		// ## Camera's config
		this.camera = new Camera();
		// this.camera.position.set(10, 10, 10);
		// this.camera.lookAt(0, 0, 0);
		// this.control = new OrbitControls(this.camera, this.container);
		// ## Renderer's config
		
		this.renderer = new WebGLRenderer({
			antialias: true,
			alpha:true,
			precision: 'mediump',
		})
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		// sRGBEncoding
		// this.renderer.outputEncoding = sRGBEncoding;
		
		// ## Light's config
		// this.renderer.physicallyCorrectLights = true;
		
		this.container.appendChild(this.renderer.domElement);

		this.scene = new Scene1(this.camera, this.container,this.renderer);


		this.onResize();
		this.render();
	}
	
	onResize() {
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		// this.camera.updateProjectionMatrix();
	}

	render() {
		// this.renderer.render(this.scene, this.camera);

		// Updates here
		this.scene.update();

		// this.renderer.setAnimationLoop(() => this.render());
	}
}
