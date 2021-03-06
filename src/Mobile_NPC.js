import * as THREE from 'three';

import NPC from "./NPC.js";

export default class Mobile_NPC extends NPC{

    constructor(parent,obj_file = "cube.obj", displacement, path, position = [0,0,0], rotate = [0,0,0], scale = 1, children = [], texture_file1 = "wall1.jpg", texture_file2 = "white_concrete.jpg" ){

        super(parent,obj_file,position,rotate,scale,children,texture_file1, texture_file2);

        this.path = path;
        this.moving_children = [];


        this.displacement = displacement;
        
    }

    move(){

        if(this.mesh == null){
            return;
        }

        this.mesh.position.copy(this.path.getPoint(this.displacement));

        var axis = new THREE.Vector3();
        var up = new THREE.Vector3( 0, 0, 1 );
        var tangent = this.path.getTangent(this.displacement);
        
        axis.crossVectors(up, tangent).normalize();	
        
        const radians = Math.acos(up.dot(tangent));
        
        this.mesh.quaternion.setFromAxisAngle(axis, radians);

        this.displacement +=0.001;
        
        if (this.displacement> 1)
        {
            this.displacement = 0;
        }

        this.moving_children.forEach((x) => {if(x.move != null) x.move();});

    }

    add_moving_children(moving_children){
        this.moving_children = this.moving_children.concat(moving_children);

    }


}