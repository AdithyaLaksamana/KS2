import React, { Component } from 'react'
import Quagga from 'quagga'

const originalGetContext = HTMLCanvasElement.prototype.getContext;

HTMLCanvasElement.prototype.getContext = function(type, options) {
    if (type === '2d') {
        options = { ...options, willReadFrequently: true };
    }
    return originalGetContext.call(this, type, options);
};

class Scan extends Component {
  componentDidMount() {
    Quagga.init(
      {
        
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 320,
            facingMode: 'environment',
          },
          area: { // defines rectangle of the detection/localization area
            top: "10%",    // top offset
            right: "10%",  // right offset
            left: "10%",   // left offset
            bottom: "10%"  // bottom offset
          },
        },
        locator: {
            halfSample: false,
            patchSize: "medium", // x-small, small, medium, large, x-large
            debug: {
                showCanvas: true,
                showPatches: false,
                showFoundPatches: false,
                showSkeleton: false,
                showLabels: false,
                showPatchLabels: false,
                showRemainingPatchLabels: false,
                boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true
              }
            }
        },
        numOfWorkers: 4,
        decoder: {
            readers: ['code_128_reader'],
            debug: {
                drawBoundingBox: true,
                showFrequency: true,
                drawScanline: true,
                showPattern: true
            },
        },
        locate: true,
      },
      function(err) {
        if (err) {
          return console.log(err)
        }
        Quagga.start()
      },
    )
    Quagga.onDetected(this._onDetected)
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected)
    Quagga.stop()
  }

  _onDetected = result => {
    this.props.onDetected(result)
  }

  render() {
    return <div id="interactive" className="viewport"/>
    }
}

export default Scan

// import React, { Component } from 'react'
// import Scan from './Scan'
// import { Fab, TextareaAutosize, Paper } from '@mui/material';
// import {ArrowBack} from '@mui/icons-material'
// import { Link } from "react-router-dom";

// class Scanner extends Component {
//   state = {
//     results: [],
//   }

//   _scan = () => {
//     this.setState({ scanning: !this.state.scanning })
//   }

//   _onDetected = result => {
//     console.log(result)
//     this.setState({ results: [] })
//     this.setState({ results: this.state.results.concat([result]) })
//   }

//   render() {
//     return (
//       <div>
//         <Link to="/">
//             <Fab style={{marginRight:10}} color="secondary">
//                 <ArrowBack/>
//             </Fab>
//         </Link>
//         <span>Barcode Scanner</span>
        
//         <Paper variant="outlined" style={{marginTop:30, width:640, height:320}}>
//           <Scan onDetected={this._onDetected} />
//         </Paper>


//         <TextareaAutosize
//           style={{ fontSize: 32, width: 320, height: 100, marginTop: 30 }}
//           maxRows={4}
//           value={this.state.results[0] ? this.state.results[0].codeResult.code : 'No data scanned'} // Controlled component
//         />


//       </div>
//     )
//   }
// }

// export default Scanner