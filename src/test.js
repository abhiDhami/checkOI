import React, { Component } from "react";
class Testt extends Component {
  state = { callOI: 1, putOI: 1, PCR: 1, backgroundColor: "green" };
  intervalID = undefined;
  render() {
    return (
      <div>
        Huhhha
        <div>
          <div>Call OI: {this.state.callOI}</div>
          <div>Put OI:{this.state.putOI}</div>
          <div>PCR : {this.state.PCR}</div>
        </div>
        <div>
          <button
            style={{ backgroundColor: this.state.backgroundColor }}
            onClick={callApiandCheck.bind(this)}
          >
            Lets Begin!!
          </button>
          <button onClick={stopExecution.bind(this)}>Stop</button>
        </div>
      </div>
    );
  }
}

function callApiandCheck() {
  this.setState({ backgroundColor: "red" });
  this.intervalID = setInterval(async () => {
    let data = await fetch(
      "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY"
    );
    let jsonResult = await data.json();
    console.log(jsonResult);
    let CallOI = jsonResult.filtered.CE.totOI;
    let PutOI = jsonResult.filtered.PE.totOI;
    let PCR = PutOI / CallOI;
    let bgColor = this.state.backgroundColor;
    if (PCR < 0.8 || PCR > 1.2) {
      bgColor = "green";
      clearInterval(this.intervalID);
      alert("Helloo Need attention");
    }
    this.setState({
      callOI: CallOI,
      putOI: PutOI,
      PCR: PCR,
      backgroundColor: bgColor,
    });
  }, 1000 * 60 * 5);
}

function stopExecution() {
  clearInterval(this.intervalID);
  console.log("Execution Stops");
  this.setState({ backgroundColor: "green" });
}

export default Testt;
