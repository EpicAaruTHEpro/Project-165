AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {
        let els = document.querySelectorAll(".enemy")
        for (var i = 0; i < els.length; i++) {
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "black");

            let pos = els[i].getAttribute("position");

            //get the camera direction as Three.js Vector
            var pos1 = new THREE.Vector3();
            var pos2 = new THREE.Vector3();
            var enemy = els[i].object3D
            var player = document.querySelector("#weapon").object3D
            player.getWorldPosition(pos1);
            enemy.getWorldPosition(pos1);
            var direction = new THREE.Vector3();
            direction.subVectors(pos1, pos2).normalize()
            
            //set the velocity and it's direction
            enemyBullet.setAttribute("velocity", direction.multiplyScalar(-10));

            enemyBullet.setAttribute("position", {
            x: pos.x+1.5,
            y: pos.y + 2.5,
            z: pos.z,
            });   

            var scene = document.querySelector("#scene");

            //set the bullet as the dynamic entity
            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
            });

            scene.appendChild(enemyBullet);

            //Get text attribute
            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Add the conditions here
                    if (playerLife > 0) {
                        playerLife -= 1;
                        element.setAttribute("text", {
                            value: playerLife
                        });
                    }

                    if (playerLife <= 0) {
                        var txt = document.querySelector("#over")
                        txt.setAttribute("visible", true)

                        //remove ogres                        
                        var ogreEl = document.querySelectorAll(".enemy")

                        for (var i = 0; i < ogreEl.length; i++) {
                            scene.removeChild(ogreEl[i])
                        }

                    }


                }
            });


        }
    },

});