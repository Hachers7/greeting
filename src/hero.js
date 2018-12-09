var PIXI = require('../node_modules/pixi.js');
var spine = require('../node_modules/pixi-spine');

const width = window.innerWidth;
const height = window.innerHeight;

var app = new PIXI.Application(width, height);
document.body.appendChild(app.view);
var loader = new PIXI.loaders.Loader();

loader
    .add('hero', '../res/spine/hero/spineboy.json')
    .load(onAssetsLoaded);

app.stage.interactive = true;

function onAssetsLoaded(loader, res)
{
    this.hero = new PIXI.spine.Spine(res['hero'].spineData);
    this.hero.x = width / 2;
    this.hero.y = height / 2;

    this.hero.scale.set(0.3);

    this.hero.stateData.setMix('idle', 'walk', 0.2);
    this.hero.stateData.setMix('idle', 'shoot', 0.2);

    this.hero.state.setAnimation(0, 'idle', false);

    this.isWalking = false;
    this.isShooting = false;

    app.stage.addChild(this.hero);

    heroWalk();
    heroShoot();
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function heroStop()
{
    this.hero.state.setAnimation(0, 'idle', false);
}



function heroWalk()
{
    const ticker = new PIXI.ticker.Ticker();
    ticker.stop();
    ticker.minFPS = 1;
    ticker.add(() =>
    {
        if (this.isShooting)
        {
            return;
        }
        console.log("Walking");
        this.isWalking = true;
        this.hero.state.setAnimation(0, 'idle', false);
        this.hero.state.addAnimation(0, 'walk', true);

        this.isWalking = false;
    });
    ticker.start();
}

function heroShoot()
{
    const ticker = new PIXI.ticker.Ticker();
    ticker.stop();
    ticker.minFPS = 1;
    ticker.add(() =>
    {
        if(this.isWalking)
        {
            return;
        }
        console.log("Shooting");
        this.isShooting = true;
        this.hero.state.setAnimation(0, 'idle', false);
        this.hero.state.addAnimation(0, 'shoot', false);
        this.isShooting = false;
    });
    ticker.start();
}