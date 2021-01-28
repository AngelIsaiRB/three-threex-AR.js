import { Scene, Color, DirectionalLight, HemisphereLight, Clock, Object3D, AnimationMixer } from 'three';
import { Cube } from '../objects/Cube';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
var mixers = [];
class Scene1 extends Scene {
	constructor(camera, container,renderer) {
		super();
		this.camera= camera;
		this.container= container;
		this.renderer = renderer;
		this.add(this.camera)
		this.create();
	}

	create() {
		// console.log(window.innerWidth)
		// console.log(this.container.clientWidth)
		var clock = new Clock();
		// console.log(this.container.clientWidth)
		this.arToolkitSource = new THREEx.ArToolkitSource({
            sourceType : 'webcam',
			sourceWidth: 480,
			sourceHeight: 640,
			displayWidth: this.container.clientWidth,
			displayHeight: this.container.clientHeight,
		})
		this.arToolkitSource.init(()=>{
            // use a resize to fullscreen mobile devices
            setTimeout(() =>{
                this.onResize();
            }, 100);
		})
		 this.arToolkitContext = new THREEx.ArToolkitContext({			 
			detectionMode: 'mono',
			maxDetectionRate:60,
			matrixCodeType: '3x3',
            canvasWidth: this.container.clientWidth,
            canvasHeight: this.container.clientHeight,
        }, {
            sourceWidth: this.container.clientWidth,
            sourceHeight: this.container.clientHeight,
		})
		this.arToolkitContext.init( ()=>{
            // copy projection matrix to camera
            this.camera.projectionMatrix.copy( this.arToolkitContext.getProjectionMatrix() );
        })
		this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.camera, {
			type : 'nft',
			
			smooth: true,
            descriptorsUrl : './assets/dataNFT/IMG_20210127_133219',
            changeMatrixMode: 'cameraTransformMatrix'
        })

		this.visible = true
		 this.root = new Object3D();
		this.add(this.root);
		var threeGLTFLoader = new GLTFLoader();
		threeGLTFLoader.load("./assets/models/Flamingo.glb",  (gltf) =>{
            this.model = gltf.scene.children[0];
            this.model.name = 'Flamingo';

            var animation = gltf.animations[0];
            var mixer = new AnimationMixer(this.model);
            mixers.push(mixer);
            var action = mixer.clipAction(animation);
            action.play();

            this.root.matrixAutoUpdate = false;
            this.root.add(this.model);

            this.model.position.z = 0;
            this.model.position.x = 0;
            this.model.position.y = 0;


            //////////////////////////////////////////////////////////////////////////////////
            //		render the whole thing on the page
            //////////////////////////////////////////////////////////////////////////////////

            var animate = () => {
                requestAnimationFrame(animate);

                if (mixers.length > 0) {
                    for (var i = 0; i < mixers.length; i++) {
                        mixers[i].update(clock.getDelta());
                    }
                }

                if (!this.arToolkitSource.ready) {
                    return;
                }

                this.arToolkitContext.update( this.arToolkitSource.domElement )

                // update scene.visible if the marker is seen
                this.visible = this.camera.visible;

                this.renderer.render(this, this.camera);
            };

            requestAnimationFrame(animate);
        });

		// this.brick = new Cube(2, new Color('rgb(255,0,0)'));
		// this.add(this.brick);
		const ambientLight = new HemisphereLight(0xffffbb, 0x080820, .5);
		const light = new DirectionalLight(0xffffff, 1.0);
		this.add(light, ambientLight);
	}
	onResize(){
		this.arToolkitSource.onResizeElement()
		this.arToolkitSource.copyElementSizeTo(this.renderer.domElement)
		if( this.arToolkitContext.arController !== null ){
			this.arToolkitSource.copyElementSizeTo(this.arToolkitContext.arController.canvas)
		}
	}
	update() {

	}
}

export default Scene1;
