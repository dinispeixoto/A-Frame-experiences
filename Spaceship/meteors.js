// Meteors
var number_of_meteors = 100;
var meteor_height = 0.1;
var meteor_width = 0.1;
var meteor_depth = 0.1;
var falling_distance = 10;

// Floor
var floor_width = 40;
var floor_height = 40;

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before' +
                  'AFRAME was available.');
}

AFRAME.registerComponent('meteors-rain',{
    init: function() {
        initFloor();

        var scene = this.el;

        for(i = 0; i < number_of_meteors; i++){
            meteor = generateMeteor();
            scene.appendChild(meteor)
        }
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

    var position = '' + x + ' ' + falling_distance + ' ' + y;

    var meteor = document.createElement('a-entity');
    meteor.setAttribute('geometry', {
        primitive: 'box',
        height: meteor_height,
        width: meteor_width,
        depth: meteor_depth
    });

    meteor.setAttribute('position', position);
    meteor.setAttribute('dynamic-body', {
        shape: 'box',
        mass: 1.5,
        linearDamping: 0.005
    });

    return meteor;
}