import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';

class Canvas extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // handle
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    // border
    canvas.style.border = "2px solid #000";
    // text
    ctx.fillStyle = "gray";
    ctx.font = "50px Arial";
    ctx.fillText('Title', 0, canvas.height/2);
    // background
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    const data = [8, 5, 13, 9, 12];
    let scale = 23;
    const svgCanvas = d3.select(this.refs.myDiv)
        .append("svg")
        .attr("width", 800)
        .attr("height", 500)
        .style("border", "1px solid black");
    // text
    svgCanvas.selectAll("rect")
        .data(data).enter()
        .append("text")
        .attr("x", (datapoint, iteration) => iteration * 45 + 40)
        .attr("y", (datapoint) => 475 - datapoint * scale)
        .text(datapoint => datapoint);
    // line data
    var lg = d3.line();
    var pts = [];
    for(const d in data) {
      pts.push([30+(45*d), (480 - (data[d] * scale))]);
    }
    var pd = lg(pts);
    // line graph
    svgCanvas.selectAll("rect")
        .data(data).enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("d", pd);
    // bar graph
    svgCanvas.selectAll("rect")
        .data(data).enter()
        .append("rect")
        .attr("width", 40)
        .attr("height", (datapoint) => datapoint * scale)
        .attr("fill", "blue")
        .attr("opacity", 0.5)
        .attr("x", (datapoint, iteration) => iteration * 45 + 30)
        .attr("y", (datapoint) => 480 - datapoint * scale);
    // axis
    var x = d3.scaleLinear().domain([0,17]).range([30,780]);
    var y = d3.scaleLinear().domain([0,20]).range([490,30]);
    svgCanvas.append("g").attr("transform", "translate(0,480)").call(d3.axisBottom(x));
    svgCanvas.append("g").attr("transform", "translate(30, -10)").call(d3.axisLeft(y));
  }

  render() {
    return (
        <div>
          <canvas id="myCanvas" style={{width: 200, height: 100}}></canvas>
          <div ref="myDiv"></div>
        </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Canvas />
    </div>
  );
}

export default App;
