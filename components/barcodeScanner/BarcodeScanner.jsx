import React, { useEffect, useState } from 'react';
import config from './config.json';
import Quagga from 'quagga';

const BarcodeScanner = ({ setBarcode }) => {
  useEffect(() => {
    Quagga.init(config, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Initialization finished. Ready to start');
      Quagga.start();
    });

    // detecting boxes on stream
    Quagga.onProcessed((result) => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute('width')),
            Number(drawingCanvas.getAttribute('height'))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(
                box,
                { x: 0, y: 1 },
                drawingCtx,
                {
                  color: 'green',
                  lineWidth: 2,
                }
              );
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(
            result.box,
            { x: 0, y: 1 },
            drawingCtx,
            {
              color: '#00F',
              lineWidth: 2,
            }
          );
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: 'x', y: 'y' },
            drawingCtx,
            { color: 'red', lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected((data) => {
      setBarcode(data.codeResult.code);
      console.log(data.codeResult.code);
    });
  }, []);

  // setBarcode(detected);

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <div>
      <div id='interactive' className='viewport' />
    </div>
  );
};

export default BarcodeScanner;
