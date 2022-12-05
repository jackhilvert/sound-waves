var svgs = [];
var groups = [];

dim = {
    'height': 300,
    'width': 300,
    'margin': 30,
};



for (i = 0; i < 3; i++){
    var svg = d3.select("#complexWaves").append('svg').attrs(dim).attr('id', `wave_${i+1}`); 
    svgs.push(svg);
}

for (i = 0; i < 3; i++){
    var svg = svgs[i];
    var group = svg.append('g');
    groups.push(group);
}


var line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y)); 

var line2 = d3.line()
.x(d => xScale2(d.x))
    .y(d => yScale2(d.y)); 

var line3 = d3.line()
    .x(d => xScale3(d.x))
    .y(d => yScale3(d.y)); 
    

function function1(x) {
    return Math.cos((2*Math.PI)*(3*x)) * Math.pow(Math.E, (-Math.PI) * (Math.pow(x,2)))
}

function function2(x) {
    return Math.sin(2*Math.PI * 40 * x) + .5 + Math.sin(90* 2 * Math.PI * x)
}


function function3(x) {
    return function1(x) + function2(x)
}

function calculate_first() {
    var new_data = d3.range(-2, 2, .01)
        .map(x => ({ x, y: function1(x) }));
    return new_data;
}
function calculate_second() {
    var new_data = d3.range(0, .5, .0001)
        .map(x => ({ x, y: function2(x) }));
    return new_data;
}

function calculate_third() {
    var new_data = d3.range(-2, 2, .02)
        .map(x => ({ x, y: function3(x) }));
    return new_data;
}


var xScale = d3.scaleLinear()
    .range([dim.margin + 20, dim.width - (dim.margin + 20)])
    .domain([-2, 2])
var xScale2 = d3.scaleLinear()
    .range([dim.margin, dim.width - (dim.margin)])
    .domain([0, .5])
var xScale3 = d3.scaleLinear()
    .range([dim.margin, dim.width - (dim.margin)])
    .domain([-2, 2])
var yScale = d3.scaleLinear()
    .range([dim.height - (dim.margin + 20), (dim.margin + 20)])
    .domain([-1, 1])
var yScale2 = d3.scaleLinear()
    .range([dim.height - (dim.margin + 70), dim.margin])
    .domain([2,-2]);
var yScale3 = d3.scaleLinear()
    .range([dim.height - (dim.margin + 70), dim.margin])
    .domain([3,-3]);



    
var firstSvg = svgs[0]
var firstWave = firstSvg.selectAll('g')
    .append('path')
    .datum(calculate_first())
    .attrs({
        'd': line,
        'stroke': '#bf42f5',
        'fill': 'none'
    });
firstSvg.append('text')
    .attr("x", dim.width / 2)
    .attr('y', dim.margin)
    .attr('dy', '.3em')
    .text()

firstSvg.append('g').attr("id", "left").attr("transform", `translate(${dim.margin},0)`);
firstSvg.append('g').attr("id", "bottom").attr("transform", `translate(0,${dim.height -dim.margin})`);

var yAxis = d3.axisLeft(yScale)
var xAxis = d3.axisBottom(xScale)

firstSvg.select('#left').call(yAxis)
firstSvg.select('#bottom').call(xAxis)


var secondSvg = svgs[1]
var secondWave = secondSvg.selectAll('g')
    .append('path')
    .datum(calculate_second())
    .attrs({
        'd': line2,
        'stroke': '#bf42f5',
        'fill': 'none',
        'transform': `translate(${dim.margin},${dim.margin})`
    });
secondSvg.append('g').attr("id", "left").attr("transform", `translate(${dim.margin},${dim.margin + 20})`);
secondSvg.append('g').attr("id", "bottom").attr("transform", `translate(${dim.margin},${dim.height -dim.margin})`);

yAxis = d3.axisLeft(yScale2).ticks(2);
xAxis = d3.axisBottom(xScale2).ticks(5); 

secondSvg.select('#left').call(yAxis)
secondSvg.select('#bottom').call(xAxis)



var thirdSvg = svgs[2]
var thirdWave = thirdSvg.selectAll('g')
    .append('path')
    .datum(calculate_third())
    .attrs({
        'd': line3,
        'stroke': '#bf42f5',
        'fill': 'none',
        'transform': `translate(${dim.margin},${dim.margin})`
    });
thirdSvg.append('g').attr("id", "left").attr("transform", `translate(${dim.margin},${dim.margin + 20})`);
thirdSvg.append('g').attr("id", "bottom").attr("transform", `translate(${dim.margin},${dim.height -dim.margin})`);

yAxis = d3.axisLeft(yScale2).ticks(2);
xAxis = d3.axisBottom(xScale2).ticks(5); 

thirdSvg.select('#left').call(yAxis)
thirdSvg.select('#bottom').call(xAxis)



