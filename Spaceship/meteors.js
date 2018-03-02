// TODO
// Vector optimization
// 

// Spaceship
var spaceship_height = 1;
var spaceship_width = 1;
var spaceship_depth = 1;

// Meteor
var number_of_meteors = 500;
var meteor_height = 0.1;
var meteor_width = 0.1;
var meteor_depth = 0.1;
var min_falling_distance = 10;
var max_falling_distance = 50;

// Floor
var floor_width = 25;
var floor_height = 25;

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before' +
                  'AFRAME was available.');
}

AFRAME.registerComponent('meteors-rain',{
    init: function() {
        initFloor();

        var scene = this.el;

        scene.appendChild(generateSpaceship());

        for(i = 0; i < number_of_meteors; i++){
            scene.appendChild(generateMeteor());
        }

        var playerEl = document.querySelector('a-box');
        playerEl.addEventListener('collide', function (e) {
            console.log('Player has collided with body #' + e.detail.body.id);
           
            e.detail.target.el;  // Original entity (playerEl).
            e.detail.body.el;    // Other entity, which playerEl touched.
            e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
            e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).

            updateSpaceshipPosition();
          });
    }
})

// Create plane with floor_height and floor_width
function initFloor(){
    var floor = document.getElementById('floor');
        floor.setAttribute('geometry', {
            height: floor_height,
            width: floor_width
        })
}

// Generate falling meteor
function generateMeteor(){
    x = Math.floor((Math.random() * floor_width) - floor_width/2);
    y = Math.floor((Math.random() * floor_height) - floor_height/2);
    h = Math.floor((Math.random() * max_falling_distance - min_falling_distance)) + min_falling_distance;

    var position = '' + x + ' ' + h + ' ' + y;

    var meteor = document.createElement('a-box');
    meteor.setAttribute('geometry', {
        height: meteor_height,
        width: meteor_width,
        depth: meteor_depth
    });
    meteor.setAttribute('material', {
        color: 'white'
    });
    meteor.setAttribute('position', position);
    meteor.setAttribute('dynamic-body', {
        shape: 'box',
        mass: 5,
        linearDamping: 1
    });

    return meteor;
}

// Generate new spaceship
function generateSpaceship(){

    x = Math.floor((Math.random() * floor_width/4) - floor_width/8);
    y = Math.floor((Math.random() * floor_height/4) - floor_height/8);
    h = 0;

    var position = '' + x + ' ' + h + ' ' + y;

    var spaceship = document.createElement('a-box');
    spaceship.setAttribute('id','spaceship');
    spaceship.setAttribute('color','#4CC3D9');
    spaceship.setAttribute('geometry', {
        height: spaceship_height,
        width: spaceship_width,
        depth: spaceship_depth
    });

    spaceship.setAttribute('position', position);
    spaceship.setAttribute('static-body');

    return spaceship;
}


// Update spaceship position
function updateSpaceshipPosition(){

    spaceship = document.getElementById('spaceship');

    x = Math.floor((Math.random() * floor_width/4) - floor_width/8);
    y = Math.floor((Math.random() * floor_height/4) - floor_height/8);
    h = 0;

    var position = '' + x + ' ' + h + ' ' + y;
    spaceship.setAttribute('position', position);
}