var PIXI = require('../node_modules/pixi.js');
var spine = require('../node_modules/pixi-spine');
var delay = require('../node_modules/delay');

const width = window.innerWidth;
const height = window.innerHeight;

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
    this.pointMeet = new PIXI.Point();
    this.pointStopLeft = new PIXI.Point();
    this.pointStopRight = new PIXI.Point();
    var leftCame = false;
    var rightCame = false;
    var leftBack = false;
    var rightBack = false;
    var leftTurned = false;
    var rightTurned = false;
    this.pointMeet.x = 800;
    this.pointMeet.y = 450;
    this.pointStopLeft.x = this.pointMeet.x / 1.15;
    this.pointStopLeft.y = this.pointMeet.y * 1.15;
    this.pointStopRight.x = this.pointMeet.x * 1.15;
    this.pointStopRight.y = this.pointMeet.y * 1.15;

    for(let i = 0; i <= teammatesNumber - 1; i++)
    {
        this.heroLeft = new PIXI.spine.Spine(resources['hero'].spineData);
        this.heroLeft.x = Math.floor(Math.random() * width/2);
        this.heroLeft.y = Math.floor(Math.random() * height);
        this.heroLeft.direction = Math.random() * Math.PI * 2;
        this.heroLeft.turningSpeed = Math.random() - 0.8;

        if(this.heroLeft.x > 600)
        {
            this.heroLeft.x = 600;
            this.startXLeft = 600;
        }
        if(this.heroLeft.y < 250)
        {
            this.heroLeft.y = 250;
            this.startYLeft = 250;
        }
        if(this.heroLeft.x < 100)
        {
            this.heroLeft.x = 100;
            this.startXLeft = 100;
        }

        this.heroLeft.scale.set(0.3);

        app.stage.addChild(this.heroLeft);

        this.heroLeft.state.setAnimation(0, 'idle', true);

        leftTeam.push(this.heroLeft);
    }

    for(let i = 0; i <= teammatesNumber - 1; i++)
    {
        this.heroRight = new PIXI.spine.Spine(resources['hero'].spineData);
        this.heroRight.skeleton.flipX = true;
        this.heroRight.x = Math.floor(width / 2 + Math.random() * width / 2);
        this.heroRight.y = Math.floor(Math.random() * height);
        this.heroRight.direction = Math.random() * Math.PI * 2;
        this.heroRight.turningSpeed = Math.random() - 0.8;

        if (this.heroRight.x < 1000) {
            this.heroRight.x = 1000;
        }
        if (this.heroRight.y < 250) {
            this.heroRight.y = 250;
        }
        if (this.heroRight.x > 1500) {
            this.heroRight.x = 1500;
        }

        this.heroRight.scale.set(0.3);

        app.stage.addChild(this.heroRight);

        this.heroRight.state.setAnimation(0, 'idle', true);

        rightTeam.push(this.heroRight);
    }

    this.randLeft = leftTeam[Math.floor(Math.random() * leftTeam.length)];
    this.randRight = rightTeam[Math.floor(Math.random() * rightTeam.length)];

    function stopLeft()
    {
        this.randLeft.state.addAnimation(0, 'idle', true);
    }

    function stopRight()
    {
        this.randRight.state.addAnimation(0, 'idle', true);
    }

    function Turn()
    {
        this.randLeft.skeleton.flipX = true;
        this.randRight.skeleton.flipX = false;
    }

    function moveLeft()
    {
        this.startXLeft = this.randLeft.x;
        this.startYLeft = this.randLeft.y;
        this.randLeft.state.setAnimation(0, 'walk', true);
        app.ticker.add(() => {
            this.randLeft.x += (Math.floor(this.pointMeet.x / 1.15) - this.randLeft.x) * 0.008;
            this.randLeft.y += (Math.floor(this.pointMeet.y * 1.15) - this.randLeft.y) * 0.008;

            if((this.randLeft.x >= Math.floor(this.pointStopLeft.x - 10)))
            {
                stopLeft();
                leftCame = true;
            }

            if(rightCame && leftCame)
            {
                //shootLeft();

                this.randLeft.x += 0;
                this.randLeft.y += 0;

                setTimeout(backLeft, 4000);
            }

            if(leftBack)
            {
                this.randLeft.skeleton.flipX = false;
                this.randLeft.x = this.startXLeft;
                this.randLeft.y = this.startYLeft;
                if(rightTurned)
                {
                    app.ticker.stop();
                }
                else{
                    leftTurned = true;
                }
            }
        });
    }

    function moveRight()
    {
        this.startXRight = this.randRight.x;
        this.startYRight = this.randRight.y;
        this.randRight.state.setAnimation(0, 'walk', true);
        app.ticker.add(() => {
            this.randRight.x += (Math.floor(this.pointMeet.x * 1.15) - this.randRight.x) * 0.008;
            this.randRight.y += (Math.floor(this.pointMeet.y * 1.15) - this.randRight.y) * 0.008;

            if((this.randRight.x <= Math.floor(this.pointStopRight.x + 10)))
            {
                stopRight();
                rightCame = true;
            }

            if(leftCame && rightCame)
            {
                //shootRight();

                this.randRight.x += 0;
                this.randRight.y += 0;

                setTimeout(backRight, 4000);
            }

            if(rightBack)
            {
                this.randRight.skeleton.flipX = true;
                this.randRight.x = this.startXRight;
                this.randRight.y = this.startYRight;
                if(leftTurned)
                {
                    app.ticker.stop();
                }
                else{
                    rightTurned = true;
                }
            }
        });
    }

    function shootLeft()
    {
        this.randLeft.state.addAnimation(0, 'shoot', false);
    }

    function shootRight()
    {
        this.randRight.state.addAnimation(0, 'shoot', false);
    }

    function backLeft()
    {
        this.randLeft.state.addAnimation(1, 'walk', true);
        this.randLeft.skeleton.flipX = true;
        this.randLeft.x -= (Math.floor(this.pointMeet.x / 1.15) - this.startXLeft) * 0.008;
        this.randLeft.y -= (Math.floor(this.pointMeet.y * 1.15) - this.startYLeft) * 0.008;

        if(this.randLeft.x <= this.startXLeft + 20)
        {
            leftBack = true;
        }
    }

    function backRight()
    {
        this.randRight.state.addAnimation(1, 'walk', true);
        this.randRight.skeleton.flipX = false;
        this.randRight.x += (- Math.floor(this.pointMeet.x * 1.15) + this.startXRight) * 0.008;
        this.randRight.y += (- Math.floor(this.pointMeet.y * 1.15) + this.startYRight) * 0.008;

        if(this.randRight.x >= this.startXRight - 20)
        {
            rightBack = true;
        }
    }

    setTimeout(moveLeft, 3000);
    setTimeout(moveRight, 3000);
}
