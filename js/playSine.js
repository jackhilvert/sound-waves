dim = {
    'id': 'playButton', 
    'height': 60,  
    'width': 60
};
var svg = d3.select("#play_sine").append('svg').attrs(dim)



let c = 0 

var playButton = document.getElementById("playButton");
playButton.addEventListener('click', playWave); 

var context = new (window.AudioContext || window.webkitAudioContext)();
var o = context.createOscillator(); 
var g = context.createGain();
g.gain.setTargetAtTime(.7, context.currentTime, 0); 
o.connect(g);
g.connect(context.destination);


var xScale = d3.scaleLinear()
    .range([0 , dim.width])
    .domain([0, dim.width]);

var yScale = d3.scaleLinear()
    .range([0  , dim.width ])
    .domain([0, dim.width]);


var group = svg.append('g')
group.append('circle').attrs({
    'cx': dim.width/2,
    'cy': dim.height/2,
    'r': 30,
    'fill': '#f0f0f0',
});



var triangle = [
    { x: dim.width/2 + 20, y: dim.height/2 },
    { x: dim.width/2 - 10, y: dim.height/2 + 20},
    { x: dim.width/2 - 10, y: dim.height/2 - 20 }

];

var line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));


var path = svg.selectAll('g')
    .append('path')
    .datum(triangle)
    .attrs({
        'd': line,
        'stroke': '#999',
        'fill': '#ff6666'
    });

function playWave(e) {
    if (c == 0) {
        group = d3.select("#play_sine").select('g')
        group.selectAll('path')
            .attr("fill", '#adebad');


        try {
            o.start();
        }
        catch (err) {
            g.gain.exponentialRampToValueAtTime(
                .7, context.currentTime + .04
            );
        }
        c = 1;
    }
    else {
        group.selectAll('path')
        .attr("fill", '#ff6666');
        c = 0;
        g.gain.exponentialRampToValueAtTime(
            .00001, context.currentTime + .04
        );
    }

};




