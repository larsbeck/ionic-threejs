import { Component, Input, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'scenegraph',
  template: '<div style="width:100%; height:100%"></div>'
})
export class SceneGraph {

  @Input()
  geometry: string;

  renderer: THREE.Renderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  mesh: THREE.Mesh;
  animating: boolean;

  constructor(private sceneGraphElement: ElementRef) {
  }

  ngAfterViewInit() {
    var mixers = [];
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 4;
    this.scene = new THREE.Scene();
    var ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient);
    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1).normalize();
    this.scene.add(directionalLight);

    // BEGIN Clara.io JSON loader code
    var objectLoader = new THREE.ObjectLoader();
    objectLoader.load("teapot-claraio.json", obj => {
      this.scene.add(obj);
    });
    // END Clara.io JSON loader code
    this.renderer = new THREE.WebGLRenderer();
    // this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.container.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
  }

  startAnimation() {
    let width = this.sceneGraphElement.nativeElement.childNodes[0].clientWidth;
    let height = this.sceneGraphElement.nativeElement.childNodes[0].clientHeight;
    this.renderer.setSize(width, height);
    this.animating = true;
    this.render();
  }

  stopAnimation() {
    this.animating = false;
  }

  render() {
    this.camera.position.x=100;
    this.camera.position.y=100;
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }
  
}
