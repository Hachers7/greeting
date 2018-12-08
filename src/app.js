var PIXI = require('../node_modules/pixi.js');
var spine = require('../node_modules/pixi-spine');
var delay = require('../node_modules/delay');

const width = 1600;
const height = 900;

var leftTeam = [];
var rightTeam = [];

const teammatesNumber = 3;

var app = new PIXI.Application(width, height);
document.body.appendChild(app.view);
var loader = new PIXI.loaders.Loader();

// load spine data
loader
    .add('hero', '../res/spine/hero/spineboy.json')
    .load(onAssetsLoaded);

app.stage.interactive = true;

function onAssetsLoaded(loader, resources)
{
    var pointMeet = new PIXI.Point();
    var pointStopLeft = new PIXI.Point();
    var pointStopRight = new PIXI.Point();
    var leftCame = false;
    var rightCame = false;
    var leftTurned = false;
    var rightTurned = false;
    pointMeet.x = 800;
    pointMeet.y = 450;
    pointStopLeft.x = pointMeet.x / 1.15;
    pointStopRight.x = pointMeet.x * 1.15;

    for(let i = 0; i <= teammatesNumber - 1; i++)
    {
        var heroLeft = new PIXI.spine.Spine(resources['hero'].spineData);
        heroLeft.x = Math.floor(Math.random() * width/2);
        heroLeft.y = Math.floor(Math.random() * height);
        heroLeft.direction = Math.random() * Math.PI * 2;
        heroLeft.turningSpeed = Math.random() - 0.8;

        if(heroLeft.x > 600)
        {
            heroLeft.x = 600;
        }
        if(heroLeft.y < 250)
        {
            heroLeft.y = 250;
        }
        if(heroLeft.x < 100)
        {
            heroLeft.x = 100;
        }

        heroLeft.scale.set(0.3);

        app.stage.addChild(heroLeft);

        heroLeft.state.setAnimation(0, 'idle', true);

        leftTeam.push(heroLeft);
    }

    var randLeft = leftTeam[Math.floor(Math.random() * leftTeam.length)];

    function moveLeft()
    {
        randLeft.state.setAnimation(0, 'idle', false);
        randLeft.state.setAnimation(0, 'walk', true);
        app.ticker.add(() => {
            randLeft.x += (Math.floor(pointMeet.x / 1.15) - randLeft.x) * 0.008;
            randLeft.y += (Math.floor(pointMeet.y * 1.15) - randLeft.y) * 0.008;
            randLeft.direction += randLeft.turningSpeed * 0.01;

            if((randLeft.x > Math.floor(pointStopLeft.x - 30))) {
                randLeft.x += 0;
                randLeft.y += 0;
                randLeft.direction += 0;
                stopLeft();
                if(leftCame && rightCame)
                {
                    greetingLeft();
                }
            }
        });
    }

    function stopLeft()
    {
        randLeft.state.addAnimation(0, 'idle', true, 0);
        leftCame = true;
    }

    function greetingLeft()
    {
        randLeft.state.addAnimation(0, 'shoot', true, 0);
    }

    for(let i = 0; i <= teammatesNumber - 1; i++) {
        var heroRight = new PIXI.spine.Spine(resources['hero'].spineData);
        heroRight.skeleton.flipX = true;
        heroRight.x = Math.floor(width / 2 + Math.random() * width / 2);
        heroRight.y = Math.floor(Math.random() * height);
        heroRight.direction = Math.random() * Math.PI * 2;
        heroRight.turningSpeed = Math.random() - 0.8;

        if (heroRight.x < 1000) {
            heroRight.x = 1000;
        }
        if (heroRight.y < 250) {
            heroRight.y = 250;
        }
        if (heroRight.x > 1500) {
            heroRight.x = 1500;
        }

        heroRight.scale.set(0.3);

        app.stage.addChild(heroRight);

        heroRight.state.setAnimation(0, 'idle', true);

        rightTeam.push(heroRight);
    }

    var randRight = rightTeam[Math.floor(Math.random() * rightTeam.length)];

    function moveRight()
    {
        randRight.state.setAnimation(0, 'idle', false);
        randRight.state.setAnimation(0, 'walk', true);
        app.ticker.add(() => {
            randRight.x += (Math.floor(pointMeet.x * 1.15) - randRight.x) * 0.008;
            randRight.y += (Math.floor(pointMeet.y * 1.15) - randRight.y) * 0.008;
            randRight.direction += randRight.turningSpeed * 0.01;

            if((randRight.x < Math.floor(pointStopRight.x + 20)))
            {
                randRight.x += 0;
                randRight.y += 0;
                randRight.direction += 0;
                stopRight();
                if(leftCame && rightCame)
                {
                    //greetingRight();
                }
            }
        });
    }

    function stopRight()
    {
        randRight.state.addAnimation(0, 'idle', true, 0);
        rightCame = true;
    }

    function greetingRight()
    {
        randLeft.state.addAnimation(0, 'shoot', true, 0);
    }

    setTimeout(moveLeft, 3000);
    setTimeout(moveRight, 3000);
}
