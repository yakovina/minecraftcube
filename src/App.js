




import React from "react";
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from '@react-three/drei'
import { Physics, useBox, usePlane } from "@react-three/cannon";






import './App.css'
import boxMap from './minecraft-ground.webp'
import grassMap from './grass.png'





function Box (){
    const texture = new THREE.TextureLoader().load(boxMap);
    const [ref, api] = useBox(()=>({mass: 1, position: [0,-2,0]}))
    return(
        <mesh ref={ref} onClick={()=>{api.velocity.set(2,8,0)}} >
            <boxBufferGeometry attach ="geometry" />
            <meshLambertMaterial attach="material" color={'#d2b698'}>
                <primitive attach="map" object={texture} />
            </meshLambertMaterial>
        </mesh>
    )
}




function Plane (){
    const texture = new THREE.TextureLoader().load(grassMap);
    const [ref] = usePlane(()=>({rotation: [-Math.PI/2, 0, 0], position: [0,-2,0]}))
    return(
        <mesh ref={ref}>
            <planeBufferGeometry attach ="geometry"  args={[100,100]}/>
            <meshLambertMaterial attach="material"  color={'green'}>
                <primitive attach="map" object={texture} />
            </meshLambertMaterial>
        </mesh>
    )
}



function App() {
  return (
   <Canvas>
       <OrbitControls/>
       <ambientLight intensive={0.5} />
       <spotLight position={[10,15,10]} angle={0.3}/>
       <Physics>
           <Box/>
           <Plane/>
       </Physics>
       <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
   </Canvas>
  );
}



export default App;
