var number_of_meteors = 100;
var falling_distance = 10;
var floor_width = 50;
var floor_height = 50;

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
    x = Math.floor((Math.random() * 40) - 20);
    y = Math.floor((Math.random() * 40) - 20);

    var position = '' + x + ' ' + falling_distance + ' ' + y;

    var meteor = document.createElement('a-entity');
    meteor.setAttribute('geometry', {
        primitive: 'box',
        height: 1,
        width: 1,
    });

    meteor.setAttribute('position', position);
    meteor.setAttribute('dynamic-body', {
        shape: 'box',
        mass: 1.5,
        linearDamping: 0.005
    });

    return meteor;
}