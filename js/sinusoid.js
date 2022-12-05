
var dim = {
    'width': 500, 
    'height': 300, 
    'margin': 20,
    'id': 'sinusoidGraph'
}

var svg = d3.select("#sinusoid").append('svg').attrs(dim);
var mainGroup = svg.append('g').attr('id', 'main_group');

mainGroup.append('rect')
    .attrs({
        'rx': 10,
        'ry': 10, 
        'fill': '#f0f0f0',
        'width': '100%',
        'height': '100%'
    }
)

function generateSine(a, b) {
    var new_data = d3.range(0, 4 * Math.PI, .01)
        .map(function (x) {
            return {
                x, y: a * Math.sin((x) / b)
            }
        });
    return new_data;
}

var data = []

for (i = 6; i > 0; i--){
    var currData = generateSine(1/i, 1 / i);  
    data.push(currData);
};

var sinusoidX = d3.scaleLinear()
    .domain([0,4 * Math.PI])
    .range([dim.margin, dim.width - dim.margin]);

var sinusoidY = d3.scaleLinear()
    .domain([-2,2])
    .range([dim.height - dim.margin, dim.margin]);
    




var colorScale = d3.scaleSequential(d3.interpolateBlues)
    .domain([0,8])


function combineLines(inData) {
    var new_data = [];
    for (var i = 0; i < inData.length; i++){
        for (var j = 0; j < inData[i].length; j++){
            if (new_data[j]) {
                    new_data[j].x = new_data[j].x;
                    new_data[j].y = new_data[j].y + inData[i][j].y;
                continue; 
            }
            new_data.push({
                x: inData[i][j].x,
                y: inData[i][j].y
            });
        }
    }
    return new_data;
}

combined = combineLines(data); 

var bigScaleX = d3.scaleLinear()
    .domain(d3.extent(combined, d => d.x))
    .range([dim.margin, dim.width - dim.margin])


var bigScaleY = d3.scaleLinear()
    .domain([-5,5])
    .range([dim.height - dim.margin, dim.margin]);



var line = d3.line()
    .x(d => sinusoidX(d.x))
    .y(d => sinusoidY(d.y)); 

var bigLine = d3.line()
.x(d => bigScaleX(d.x))
.y(d => bigScaleY(d.y));


var lines = mainGroup.selectAll('path')
    .data(data).enter()
    .append('path')
    .attrs({
        "d": line,
        'id':(d,i) =>  `line_${i + 1}`,
        'stroke': (d,i) => colorScale(i + 1),
        'fill': 'none'
    })



var lines = mainGroup
    .append('path')
    .datum(combined)
    .attrs({
        "d": line,
        'id': "bigLine",
        'stroke': 'red',
        "stroke-width": '4px',
        'fill': 'none'
    })






