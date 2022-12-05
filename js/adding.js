var addingPreviousTimeStamp = 0; 
var dim = {
    'class': 'waves', 
    'width': 720,
    'height':300,
    'margin': 50,
 
};

var amplitudes = [1, 1.5, .2]
var periods = [1, 1, 1]
var speeds = [100, 100, 100]


var amp1 = document.getElementById("amp1");
amplitudes[0] = amp1.value
var amp2 = document.getElementById("amp2");
amplitudes[1] = amp2.value
var amp_value1 = document.getElementById("amp_value1");
var amp_value2 = document.getElementById("amp_value2");
amp1.addEventListener('input', updateAmp1);
amp2.addEventListener('input', updateAmp2);




var per1 = document.getElementById("per1");
periods[0] = per1.value
var per2 = document.getElementById("per2");
periods[1] =  per2.value

var per_value1 = document.getElementById("per_value1");
var per_value2 = document.getElementById("per_value2");

per1.addEventListener('input', updatePer1);
per2.addEventListener('input', updatePer2);


var freq1 = document.getElementById("freq1");
speeds[0] = freq1.value
var freq2 = document.getElementById("freq2");
speeds[0] = freq1.value

var freq_value1 = document.getElementById("freq_value1");
var freq_value2 = document.getElementById("freq_value2");

freq1.addEventListener('input', updateFreq1);
freq2.addEventListener('input', updateFreq2);


function updateAmp1(e) {
    amp_value1.textContent = "Amplitude: " + parseFloat(e.target.value).toFixed(4);
    multi_render(amplitudes, periods, speeds);
    amplitudes[0] = e.target.value; 
}
function updateAmp2(e) {
    amp_value2.textContent = "Amplitude: " + parseFloat(e.target.value).toFixed(4);
    multi_render(amplitudes, periods, speeds);
    amplitudes[1] = e.target.value;
}
function updatePer1(e) {
    per_value1.textContent = "Wavelength/Period: " + parseFloat(e.target.value).toFixed(4);
    multi_render(amplitudes, periods, speeds);
    periods[0] = e.target.value;
}
function updatePer2(e) {
    per_value2.textContent = "Wavelength/Period: " + parseFloat(e.target.value).toFixed(4);
    multi_render(amplitudes, periods, speeds);
    periods[1] = e.target.value;
}
function updateFreq1(e) {
    freq_value1.textContent = "Frequency/Speed: " + parseFloat(e.target.value).toFixed(2);
    multi_render(amplitudes, periods, speeds);
    speeds[0] = sliderScale(e.target.value);
}
function updateFreq2(e) {
    freq_value2.textContent = "Frequency/Speed: " + parseFloat(e.target.value).toFixed(2);
    multi_render(amplitudes, periods, speeds);
    speeds[1] = sliderScale(e.target.value);
}









var svg = d3.select("#addition").append("svg").attrs(dim);
var main = svg.append('g').attr('id', 'mainGroup'); 
var background = main.append('rect')
    .attrs({
        'rx': 10,
        'ry': 10, 
        'fill': '#f0f0f0',
        'width': '100%',
        'height': '100%'
});
var curve = Math.sin

function calculate_wave(amp, period, speed) {
    var now = Date.now();
    
    var new_data = d3.range(0, 4 * Math.PI, .01)
        .map(x => ({ x, y: curve((x * (2 * Math.PI * period)) + (now / speed)) * amp }));
    return new_data
}
function sum_two_waves(s1, s2) {
    var new_data = []
    for (i = 0; i < s1.length; i++){
        new_data.push({
            x:s1[i].x, y:s1[i].y
        })
    }
    for (i = 0; i < s1.length; i++) {
        new_data[i].y = new_data[i].y + s2[i].y
    }
    return new_data
}   



wave1 = calculate_wave(1, 1, 1);
wave2 = calculate_wave(1.5, 1, 1); 
wave3 = sum_two_waves(wave1, wave2);

var colors = ["#59c091","#ffbb99","#ffb3ff"]
data = [wave1,wave2,wave3]

var waveScaleX = d3.scaleLinear()
    .domain([0,4*Math.PI])
    .range([0,dim.width]);

var waveScaleY = d3.scaleLinear()
    .domain([-2,2])
    .range([dim.height - dim.margin, dim.margin]);


var wave_line = d3.line()
    .x(d => waveScaleX(d.x))
    .y(d => waveScaleY(d.y))

var lineGroup = main.append('g').attr('id', 'lines')
var lines = lineGroup.selectAll('path')
    .data(data).enter()
    .append('path')
    .attrs({
        "d": wave_line,
        'id':(d,i) =>  `line_${(i+1)}`,
        'stroke': (d, i) => colors[i],
        'fill': 'none'
    })
    .style('stroke-width', '4')

function multi_render(amplitudes, periods, speeds) {
    //generates new data properly.
    const new_data1 = calculate_wave(amplitudes[0], periods[0], speeds[0]); 
    const new_data2 = calculate_wave(amplitudes[1], periods[1], speeds[1]); 
    const new_data3= sum_two_waves(new_data1, new_data2)

    var line_1 = svg.selectAll('#line_1').datum(new_data1)
        .attr('d', wave_line)
        .attr("stroke", colors[0])
        .attr('fill', 'none')
        .style("stroke-width", '2px')
        .transition().attr('d', wave_line)
    var line_2 = svg.selectAll('#line_2').datum(new_data2)
        .attr('d', wave_line)
        .attr("stroke", colors[1])
        .attr('fill', 'none')
        .style("stroke-width", '2px')
        .transition().attr('d', wave_line)
    var line_3 = svg.selectAll('#line_3').datum(new_data3)
        .attr('d', wave_line)
        .attr("stroke", colors[2])
        .attr('fill', 'none')
        // .style("stroke-dasharray", ("2", "2"))
        .style("stroke-width", '4px')
        .transition().attr('d', wave_line)
    
    // new_lines.exit().remove()

    // new_lines.enter().append('path')
    //     .attr('d', wave_line)
    //     .attr("stroke", (d, i) => colors[i])
    //     .attr('fill', 'none')
    
    // new_lines.transition().attr('d', wave_line)

}

function adding_step(adding_timestamp) {

    if (addingPreviousTimeStamp == 0) {
        addingPreviousTimeStamp = adding_timestamp; 
    }
    var elapsed = addingPreviousTimeStamp - adding_timestamp;
    if (elapsed != 0) {

        multi_render(amplitudes, periods, speeds);
        addingPreviousTimeStamp = adding_timestamp;
    }

    requestAnimationFrame(adding_step);
}

multi_render(amplitudes, periods, speeds); 
requestAnimationFrame(adding_step);
