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
    this.container = new PIXI.Container();
    this.hero = new PIXI.spine.Spine(res['hero'].spineData);
    this.hero.x = width / 2;
    this.hero.y = height / 2;

    this.hero.scale.set(0.3);

    this.hero.state.setAnimation(0, 'idle', true);
    this.hero.state.setAnimation(1, 'walk', true);

    app.stage.addChild(this.container);
    this.container.addChild(this.hero);

    setTimeout(clear, 5000);
}

function clear()
{
    this.hero.state.tracks[1].alpha = 0;
    this.hero.state.setAnimation(2, 'shoot', true);
}
