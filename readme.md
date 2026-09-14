
## Circuit-simulator

Circuit simulator that can be run in browser, made with electron

## installation
### 
Install dependencies

`npm run install`

Run electron's script

`npm run start`

### Features
- moving canvas by holding left mouse button and moving mouse
- scaling canvas by mouse wheel
- placing wires, PNP and NPN transistors, resistors, switches, Cathode (-voltage) and Anode (+Voltage)
- start point of wire is aliged when is near to other wire
- by pressing control when placing new element we can align to element that was hovered when ctrl button was pressed
- exporting circuit
- importing circuit
- simulation
- selecting
- copying selection by CTRL+D
- translate currently selected cirucit's part by CTRL and mouse move
- cut selection from circuit by CTRL+X

### Exported circuits
 - PNP witch switch 
 - NPN with switch
 - Sziklai circuit
 - flip-flop 
 - AND gate
 - OR gate
 - NOR gate
 - adder

### TODO
 - grouping circuit's part 
