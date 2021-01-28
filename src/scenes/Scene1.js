import { Scene, Color, DirectionalLight, HemisphereLight, Clock } from 'three';
import { Cube } from '../objects/Cube';

class Scene1 extends Scene {
	constructor(camera, container) {
		super();
		this.camera= camera;
		this.container= container;
		this.create();
	}

	create() {

		var clock = new Clock();

		this.arToolkitSource = new THREEx.ArToolkitSource({
            sourceType : 'webcam',
            sourceWidth: this.container.clientWidth,
            sourceHeight: this.container.clientWidth,
		})
		this.arToolkitSource.init(()=>{
            // use a resize to fullscreen mobile devices
            setTimeout(() =>{
                this.onResize();
            }, 1000);
		})
		 this.arToolkitContext = new THREEx.ArToolkitContext({
            detectionMode: 'mono',
            canvasWidth: this.container.clientWidth,
            canvasHeight: this.container.clientWidth,
        }, {
            sourceWidth: this.container.clientWidth,
            sourceHeight: this.container.clientWidth,
		})
		this.arToolkitContext.init( ()=>{
            // copy projection matrix to camera
            this.camera.projectionMatrix.copy( this.arToolkitContext.getProjectionMatrix() );
        })


		// this.brick = new Cube(2, new Color('rgb(255,0,0)'));
		// this.add(this.brick);
		// const ambientLight = new HemisphereLight(0xffffbb, 0x080820, .5);
		// const light = new DirectionalLight(0xffffff, 1.0);
		// this.add(light, ambientLight);
	}
	onResize(){
		this.arToolkitSource.onResizeElement()
		this.arToolkitSource.copyElementSizeTo(this.container)
		if( this.arToolkitContext.arController !== null ){
			this.arToolkitSource.copyElementSizeTo(this.arToolkitContext.arController.canvas)
		}
	}
	update() {

	}
}

export default Scene1;
