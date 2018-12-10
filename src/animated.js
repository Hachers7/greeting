var PIXI = require('../node_modules/pixi.js');
var spine = require('../node_modules/pixi-spine');

const width = window.innerWidth;
const height = window.innerHeight;

var leftTeam = [];
var rightTeam = [];
var leftCame = false;
var rightCame = false;
var leftBack = false;
var rightBack = false;
var hasGreeted = false;

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

    this.messageLeft = new PIXI.Sprite.fromImage('../res/hi.png');
    this.messageRight = new PIXI.Sprite.fromImage('../res/hi.png');
    this.messageLeft.alpha = 0;
    this.messageRight.alpha = 0;
    this.messageLeft.scale.set(0.1);
    this.messageRight.scale.set(0.1);

    app.stage.addChild(this.messageLeft);
    app.stage.addChild(this.messageRight);

    this.pointMeet.x = 800;
    this.pointMeet.y = 450;
    this.pointStopLeft.x = this.pointMeet.x / 1.15;
    this.pointStopLeft.y = this.pointMeet.y * 1.15;
    this.pointStopRight.x = this.pointMeet.x * 1.15;
    this.pointStopRight.y = this.pointMeet.y * 1.15;

    for(let i = 0; i <= teammatesNumber - 1; i++)
    {
        this.heroLeft = new PIXI.spine.Spine(resources['hero'].spineData);
        this.heroRight = new PIXI.spine.Spine(resources['hero'].spineData);
        this.heroRight.skeleton.flipX = true;
        this.heroLeft.x = Math.floor(Math.random() * width/2);
        this.heroLeft.y = Math.floor(Math.random() * height);
        this.heroRight.x = Math.floor(width / 2 + Math.random() * width / 2);
        this.heroRight.y = Math.floor(Math.random() * height);

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

        if (this.heroRight.x < 1000)
        {
            this.heroRight.x = 1000;
            this.startXRight = 1000;
        }
        if (this.heroRight.y < 250)
        {
            this.heroRight.y = 250;
            this.startYRight = 250;
        }
        if (this.heroRight.x > 1500)
        {
            this.heroRight.x = 1500;
            this.startXRight = 1500;
        }

        this.heroLeft.scale.set(0.3);
        this.heroRight.scale.set(0.3);

        app.stage.addChild(this.heroLeft);
        app.stage.addChild(this.heroRight);

        this.heroLeft.state.setAnimation(0, 'idle', true);
        this.heroRight.state.setAnimation(0, 'idle', true);

        leftTeam.push(this.heroLeft);
        rightTeam.push(this.heroRight);
    }

    this.randLeft = leftTeam[Math.floor(Math.random() * leftTeam.length)];
    this.randRight = rightTeam[Math.floor(Math.random() * rightTeam.length)];

    setTimeout(moveLeft, 3000);
    setTimeout(moveRight, 3000);
}

function moveLeft()
{
    this.startXLeft = this.randLeft.x;
    this.startYLeft = this.randLeft.y;
    this.randLeft.state.setAnimation(0, 'idle', true);
    this.randLeft.state.setAnimation(1, 'walk', true);
    this.randLeft.state.tracks[0].alpha = 0;
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
            this.messageLeft.x = this.randLeft.x - 50;
            this.messageLeft.y = this.randLeft.y - 300;

            this.messageLeft.alpha = 1;

            this.randLeft.x += 0;
            this.randLeft.y += 0;

            setTimeout(backLeft, 4000);
        }

        if(hasGreeted)
        {
            this.messageLeft.alpha = 0;
        }

        if(leftBack)
        {
            this.randLeft.skeleton.flipX = false;
            this.randLeft.x = this.startXLeft;
            this.randLeft.y = this.startYLeft;
            stopLeft();
        }
    });
}

function moveRight()
{
    this.startXRight = this.randRight.x;
    this.startYRight = this.randRight.y;
    this.randRight.state.setAnimation(0, 'idle', true);
    this.randRight.state.setAnimation(1, 'walk', true);
    this.randRight.state.tracks[0].alpha = 0;
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
            this.messageRight.x = this.randRight.x - 50;
            this.messageRight.y = this.randRight.y - 300;

            this.messageRight.alpha = 1;

            this.randRight.x += 0;
            this.randRight.y += 0;

            setTimeout(backRight, 4000);
        }

        if(hasGreeted)
        {
            this.messageRight.alpha = 0;
        }

        if(rightBack)
        {
            this.randRight.skeleton.flipX = true;
            this.randRight.x = this.startXRight;
            this.randRight.y = this.startYRight;
            stopRight();
        }
    });
}

function stopLeft()
{
    this.randLeft.state.tracks[1].alpha = 0;
    this.randLeft.state.tracks[0].alpha = 1;
}

function stopRight()
{
    this.randRight.state.tracks[1].alpha = 0;
    this.randRight.state.tracks[0].alpha = 1;
}

function backLeft()
{
    this.randLeft.state.tracks[0].alpha = 0;
    this.randLeft.state.tracks[1].alpha = 1;
    this.randLeft.skeleton.flipX = true;
    this.randLeft.x -= (Math.floor(this.pointMeet.x / 1.15) - this.startXLeft) * 0.008;
    this.randLeft.y -= (Math.floor(this.pointMeet.y * 1.15) - this.startYLeft) * 0.008;

    if(this.randLeft.x <= this.startXLeft + 20)
    {
        leftBack = true;
    }

    hasGreeted = true;
}

function backRight()
{
    this.randRight.state.tracks[0].alpha = 0;
    this.randRight.state.tracks[1].alpha = 1;
    this.randRight.skeleton.flipX = false;
    this.randRight.x += (- Math.floor(this.pointMeet.x * 1.15) + this.startXRight) * 0.008;
    this.randRight.y += (- Math.floor(this.pointMeet.y * 1.15) + this.startYRight) * 0.008;

    if(this.randRight.x >= this.startXRight - 20)
    {
        rightBack = true;
    }

    hasGreeted = true;
}