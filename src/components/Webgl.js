import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import './Webgl.css'
import hole from '../assets/hole.png'
import Matrix from "./Matrix";
const breakSound = new Audio("break.mp3")
breakSound.volume = 0.5
class Webgl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            isOpen: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleButtonRelease = this.handleButtonRelease.bind(this)
    }
    componentDidUpdate() {
        if (this.state.isOpen) {
            const canvas = document.querySelector('canvas.webgl')
            const canvasBounding = canvas.getBoundingClientRect()
            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(400, canvasBounding.width / canvasBounding.height, 0.01, 100)
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })
            renderer.setSize(canvasBounding.width, canvasBounding.height)
            renderer.setClearColor(0x000000, 0); // the default

            // Animation
            const tick = () => {
                renderer.render(scene, camera)
                window.requestAnimationFrame(tick)
            }

            tick()
        }

    }
    componentDidMount() {
        // === THREE.JS CODE START ===
        const canvas = document.querySelector('canvas.webgl')
        const canvasBounding = canvas.getBoundingClientRect()
        const gltfLoader = new GLTFLoader()

        const scene = new THREE.Scene()

        const directionalLight1 = new THREE.PointLight(0xffffff, 2, 0,2)
        directionalLight1.position.x = 10
        directionalLight1.position.y = 10
        directionalLight1.position.z = 40
        directionalLight1.lookAt(0,0,0,0)
        scene.add(directionalLight1)

        const directionalLight2 = new THREE.PointLight(0xffffff, 2, 0,2)
        directionalLight2.position.x = -10
        directionalLight2.position.y = 20
        directionalLight2.position.z = -40
        directionalLight2.lookAt(0,0,0,0)
        scene.add(directionalLight2)

        const directionalLight3 = new THREE.PointLight(0xffffff, 2, 0,2)
        directionalLight3.position.x = 40
        directionalLight3.position.y = 20
        directionalLight3.position.z = -40
        directionalLight3.lookAt(0,0,0,0)
        scene.add(directionalLight3)
        const laptop = new THREE.Group()
        laptop.scale.set(0.45, 0.45, 0.45)
        laptop.position.y = -0.15
        laptop.rotation.y = 3
        // laptop.rotation.y = 3.1
        gltfLoader.load(
            'models/laptop/laptop.gltf',
            (gltf) => {
                while (gltf.scene.children.length) {
                    const child = gltf.scene.children[0]
                    laptop.add(child)
                }
            },
            (progress) => {
            },
            (error) => {
                console.log('error')
                console.log(error)
            }
        )
        scene.add(laptop)
        const camera = new THREE.PerspectiveCamera(75, canvasBounding.width / canvasBounding.height, 0.01, 100)
        camera.position.z = 1
        camera.position.x = 1

        camera.position.y = 1
        scene.add(camera)
        camera.lookAt(new THREE.Vector3(0, 0, 0))

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })
        renderer.setSize(canvasBounding.width, canvasBounding.height)
        renderer.setClearColor(0x000000, 0); // the default
        // Resize
        window.addEventListener('resize', () => {
            const canvasBounding = canvas.getBoundingClientRect()

            camera.aspect = canvasBounding.width / canvasBounding.height
            camera.updateProjectionMatrix()

            renderer.setSize(canvasBounding.width, canvasBounding.height)
        })

        // Animation
        const tick = () => {
            laptop.rotation.y += 0.0034

            renderer.render(scene, camera)

            window.requestAnimationFrame(tick)
        }

        tick()
    }

    handleButtonPress() {

        this.buttonPressTimer = setTimeout(() => {
            const matrix = document.querySelector('.matrix')
            this.props.setSecret(true)
            this.props.setGlitch(true)
        }, 1500);
    }

    handleButtonRelease() {
        clearTimeout(this.buttonPressTimer);
    }
    handleClick = () => {
        const { count } = this.state
        if (count === 10) {
            breakSound.play()
            this.setState({
                ...this.state,
                isOpen: true,
                count: count + 1
            })
        } else if (count < 10) {
            const audio = document.createElement("audio")
            audio.src = "hit.mp3"
            audio.volume = 0.3
            audio.play()
            this.setState({
                ...this.state,
                count: count + 1
            })
        }

    }
    render() {
        return (
            <div className="webglCtnr">
                <canvas className="webgl" onClick={this.handleClick}></canvas>
                {this.state.isOpen
                    ? <img
                        draggable="false"
                        alt='hole'
                        onTouchStart={this.handleButtonPress}
                        onTouchEnd={this.handleButtonRelease}
                        onMouseDown={this.handleButtonPress}
                        onMouseUp={this.handleButtonRelease}
                        onMouseLeave={this.handleButtonRelease}
                        style={{ cursor: "pointer" }} src={hole}></img>
                    : null}
            </div>

        )
    }
}
export default Webgl;