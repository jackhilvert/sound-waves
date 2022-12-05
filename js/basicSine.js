var period = 1; 
var amplitude = .2; 
var speed = document.getElementById("frequency_value");
var now = Date.now();
var previousTimeStamp = 0; 

var linebreak = document.createElement('br');




var amp = document.getElementById("amplitude"); 
var a_log = document.getElementById("amplitude_value"); 
amp.addEventListener('input', updateAmp); 
amplitude = amp.value;

var per = document.getElementById("wavelength"); 
var p_log = document.getElementById("wavelength_value"); 
per.addEventListener('input', updatePer)


var freq = document.getElementById("frequency"); 
var f_log = document.getElementById("frequency_value"); 
freq.addEventListener('input', updateFreq); 
speed = freq.value; 



var sliderScale = d3.scaleLog()
    .domain([500, 1])
    .range([1, 200]);
    
var waveScale = d3.scaleLinear()
    .domain([3, .1])
    .range([.1, 10]);

speed = sliderScale(speed)

function updateAmp(e) {
    a_log.textContent = "Amplitude: " + parseFloat(e.target.value).toFixed(4);
    render(amplitude, period, speed);
    amplitude = e.target.value; 
}

function updatePer(e) {
    p_log.textContent = "Wavelength/Period: "  + parseFloat(waveScale(e.target.value)).toFixed(4);
    render(amplitude, period, speed);
    period = e.target.value;
}

function updateFreq(e) {
    f_log.textContent = "Frequency/Speed: " + parseFloat(e.target.value).toFixed(2);
    render(amplitude, period, speed);
    speed = sliderScale(e.target.value); 
}



var xValue = d => d.x
var yValue = d => d.y


curve = Math.sin




function calculate_data(amplitude, period, speed) {
    now = Date.now();
    var new_data = d3.range(0, 100, .2) 
        .map(x => (x + 24)/25)
        .map(x => ({ x, y: curve((x * (2* Math.PI *period)) + (now /speed)) * amplitude }));
    return new_data;
}

data = calculate_data(amp.value, per.value, speed)

var dim = {
    'class': 'wave', 
    'width': 720,
    'height':300,
    'margin': 50,
    'padding': 'auto', 
};

var svg = d3.select("#sineWave").append("svg").attrs(dim)
document.querySelector('#sineWave').classList.add("center")

var background =
    svg.append('rect')
    .attrs({
        'rx': 10,
        'ry': 10, 
        'fill': '#f0f0f0',
        'width': '100%',
        'height': '100%'
    });


var xScale = d3.scaleLinear()
    .domain(d3.extent(data.map(xValue)))
    .range([dim.margin, dim.width - dim.margin]);

var yScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([0 + dim.margin, dim.height - dim.margin]);




function linspace(start, stop, size) {
    var arr = []
    var step = (stop - start) / (size - 1);
    for (var i = 0; i < size; i++){
        arr.push(start + (step * i)); 
    }
    return arr
}



var line = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d))); 


var path = svg.append('path')
    .datum(data)
    .attr('d', line)
    .attr('stroke', "#bf42f5")
    .attr('fill', 'none'); 




function render(amplitdue, period, speed) {

    new_data = calculate_data(amplitdue, period, speed);
    d3.select('svg').selectAll('path')
        .datum(new_data)
        .attr("d", line)
        .attr('stroke', '#bf42f5')
        .attr('fill', 'none')
        .transition()
        .attr("d", line)
        ;
}

function step(timestamp) {
    if (previousTimeStamp == 0) {
        previousTimeStamp = timestamp; 
    }
    var elapsed = previousTimeStamp - timestamp;
    if (elapsed != 0) {
        render(amplitude, period, speed);
        previousTimeStamp = timestamp;
    }
    requestAnimationFrame(step);
}



render(amplitude, period, speed); 
requestAnimationFrame(step);







    


