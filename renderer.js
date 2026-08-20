
function isarg(ch){

    if( (ch.charCodeAt(0) >= '0'.charCodeAt(0) && ch.charCodeAt(0) <= '9'.charCodeAt(0)) || ch=='.' || ch=='-'){

        return true;
    }

    return false;
}

function iscmd(ch){

    if(ch == 'M'){
        return 'M';
    }    
    if(ch == 'm'){
        return 'm';
    }
    if(ch == 'L'){
        return 'L';
    }
    if(ch == 'l'){
        return 'l';
    }
    if(ch == 'H'){
        return 'H';
    }
    if(ch == 'h'){
        return 'h';
    }
    if(ch == 'V'){
        return 'V';
    }
    if(ch == 'v'){
        return 'v';
    }
    if(ch == 'Z'){
        return 'Z';
    }
    if(ch=='z'){
        return 'z';
    }

    return false;

}

function azchar(ch){

    if(( ch.charCodeAt(0) >= 'a'.charCodeAt(0) && ch.charCodeAt(0) <= 'z'.charCodeAt(0) ) || ( ch.charCodeAt(0) >= 'A'.charCodeAt(0) && ch.charCodeAt(0) <= 'Z'.charCodeAt(0) ) ){
        return true;
    }

    return false;
}

function parse_d(str){

    let i = 0;
    let cmd = '';

    let cpx = 0;
    let cpy = 0;

    let ix = 0;
    let iy =0;

    let points = [];

    while(true){

        let curcmd = iscmd(str[i]);

        if(curcmd!=false){
            cmd = curcmd; // zapisuje znak komendy który jest widoczny w następnej iteracji
                          // jeśli kolejny znak również jest komendy to nadpisuje

            if(cmd=='Z' || cmd == 'z'){

                cpx = ix;
                cpy = iy;
                
                points[points.length-1].push({x: cpx, y: cpy})

            }

            i++;
            continue;
        }

        // kursor znajduje się teraz za znakiem komendy

        let args = [];

        while(true){

            if(i==str.length || iscmd(str[i])!=false){
                break;
            }

            let arg = "";
            
            while(true){

                if(i==str.length){
                    break;
                }

                if(isarg(str[i])){
                    arg+=str[i];
                    i++;
                }
                else{
                    break;
                }
            }

            if(arg.length>0){
                // skończył przetwarzać argument, kursor znajduje się za nim
                args.push(parseFloat(arg));
            }
            else{
                i++;
            }

            //zakończył przetwarzanie argumentu, kursor znajduje się teraz na pierwszej pozycji za argumentem
        }

        //kursor wskazuje na znak nowej komendy


        if(cmd=='M'){

            points.push([]);

            cpx = args[0];
            cpy = args[1];
            ix = args[0];
            iy = args[1];

            points[points.length-1].push({x: cpx, y: cpy})

            for(let i=2;i<args.length;i+=2){
                cpx = args[i];
                cpy = args[i+1];
                points[points.length-1].push({x: cpx, y: cpy});
            }

        }

        if(cmd=='m'){

            let init = false;
            if(points.length==0){
                init = true;
            }

            points.push([]);

            if(init==false){

                cpx = cpx + args[0];
                cpy = cpy + args[1];

                ix = cpx + args[0];
                iy = cpy + args[1];

            }
            if(init == true){

                cpx = args[0];
                cpy = args[1];

                ix = cpx;
                iy = cpy;
            }

            points[points.length-1].push({x: cpx, y: cpy})

            for(let i=2;i<args.length;i+=2){
                cpx = cpx + args[i];
                cpy = cpy + args[i+1];
                points[points.length-1].push({x: cpx, y: cpy});
            }


        }

        if(cmd=='L'){

            cpx = args[0];
            cpy = args[1];
            
            points[points.length-1].push({x: cpx, y: cpy})

            for(let i=2;i<args.length;i+=2){
                cpx = args[i];
                cpy = args[i+1];
                points[points.length-1].push({x: cpx, y: cpy});
            }
        }

        if(cmd=='l'){

            cpx = cpx + args[0];
            cpy = cpy + args[1];

            points[points.length-1].push({x: cpx, y: cpy})

            for(let i=2;i<args.length;i+=2){
                cpx = cpx + args[i];
                cpy = cpy + args[i+1];
                points[points.length-1].push({x: cpx, y: cpy});
            }

        }

        if(cmd=='H'){

            cpx = args[0];

            points[points.length-1].push({x: cpx, y: cpy});

            for(let i=2;i<args.length;i++){
                cpx = args[i];
                points[points.length-1].push({x: cpx, y: cpy});
            }

        }

        if(cmd=='h'){
            
            cpx = cpx + args[0];
            points[points.length-1].push({x: cpx, y: cpy});

            for(let i=2;i<args.length;i++){
                cpx = cpx + args[i];
                points[points.length-1].push({x: cpx, y: cpy});
            }


        }

        if(cmd=='V'){

            cpy = args[0];

            points[points.length-1].push({x: cpx, y: cpy});

            for(let i=2;i<args.length;i++){
                cpy = args[i];
                points[points.length-1].push({x: cpx, y: cpy});
            }

        }

        if(cmd=='v'){

            cpy = cpy + args[0];
            points[points.length-1].push({x: cpx, y: cpy});

            for(let i=2;i<args.length;i++){
                cpy = cpy + args[i];
                points[points.length-1].push({x: cpx, y: cpy});
            }

        }

        if(i==str.length){
            break;
        }

    }

    return points;
}

function Node(parent){
    this.parent = parent;
    this.childs = [];
}

let i = 0;

function parseNode(str, parent){

    let curNode = new Node(parent);

    let tagName = "";

    while(true){

        if(str[i]=='<'){
            i++;
            break;
        }

        i++;
    }

    while(true){

        if(azchar(str[i])==false){
            break;
        }

        tagName += str[i];

        i++;
    }

    curNode.tagName = tagName;
    
    let attributes = [];

    while(true){

        if(azchar(str[i]) == true){

            let keyName = "";

            while(true){

                if(str[i]=='='){
                    break;
                }

                keyName +=str[i];

                i++;
            }

            i+=2;

            let valName = "";

            while(true){

                if(str[i]=='"'){
                    break;
                }

                valName += str[i];
                i++;
            }

            attributes.push({
                k: keyName,
                v: valName
            })
        }

        if((str[i]=='/' && str[i+1]=='>')){
            break;
        }

        if(str[i]=='>'){
            break;
        }

        i++;
    }

    curNode.attributes = attributes;

    if((str[i]=='/' && str[i+1]=='>')){
        return curNode;
    }

    while(true){

        if(str[i]=='<' && str[i+1]=='/'){
            return curNode;    
        }
        else if(str[i]=='<'){
            let child = parseNode(str,curNode);
            curNode.childs.push(child);
        }

        i++;
    }

    return curNode;
}


function parseXML(str){

    let currentNode = new Node(null);
    
    return parseNode(str,i,currentNode)

}

function lookupSVG(root, tagname, key, val){

    let i = 0;
    let que = [];

    que.push(root);

    while(i<que.length){

        if(que[i].tagName==tagname){

            for(let k=0; k<que[i].attributes.length;k++){

                if(que[i].attributes[k].k == key && que[i].attributes[k].v == val){
                    return que[i];
                }

            }

        }

        for(let j=0;j<que[i].childs.length;j++){

            que.push(que[i].childs[j])

        }

        i++;

    }

    return null;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawpoints(points, ptcenter){

    ctx.beginPath();

    for(let i=0;i<points.length;i++){

        for(let j=0;j<points[i].length;j++){

            if(j==0){
                ctx.moveTo(points[i][j].x+ptcenter.x, points[i][j].y+ptcenter.y);
            }
            else{
                ctx.lineTo(points[i][j].x+ptcenter.x, points[i][j].y+ptcenter.y);
            }

        }

    }

    ctx.stroke();

}

function drawcircle(cx,cy,r, ptcenter){

    ctx.beginPath();

    ctx.arc(parseFloat(ptcenter.x)+parseFloat(cx), parseFloat(ptcenter.y)+parseFloat(cy), r, 0, 2 * Math.PI);

    ctx.stroke();

}

function mirrorH(points, x ){

    for(let i=0;i<points.length;i++){

        for(let j=0;j<points[i].length;j++){

            points[i][j].x = points[i][j].x + 2*(x - points[i][j].x) ;

        }

    }

}
function mirrorV(points, y ){

    for(let i=0;i<points.length;i++){

        for(let j=0;j<points[i].length;j++){

            points[i][j].y = points[i][j].y + 2*(y - points[i][j].y) ;

        }

    }

}

function drawPaths(element, ptcenter){

    //ptcenter = point on canvas

    let g = element.layerNode;


    for(let i=0;i<g.childs.length;i++){

        if(g.childs[i].tagName=="path"){

            for(let j=0;j<g.childs[i].attributes.length;j++){

                if(g.childs[i].attributes[j].k == 'd'){

                    let points = parse_d(g.childs[i].attributes[j].v);

                    if(element.mirrorH){
                        mirrorH(points, element.centerx);
                    }
                    if(element.mirrorV){
                        mirrorV(points, element.centery);
                    }

                    drawpoints(points, ptcenter);

                }

            }

        }

        if(g.childs[i].tagName == 'circle'){

            let cx,cy,r;
            let isrender = true;

            for(let j=0;j<g.childs[i].attributes.length;j++){

                if(g.childs[i].attributes[j].k=='cx'){
                    cx = g.childs[i].attributes[j].v;
                }
                if(g.childs[i].attributes[j].k=='cy'){
                    cy = g.childs[i].attributes[j].v;
                }
                if(g.childs[i].attributes[j].k=='r'){
                    r = g.childs[i].attributes[j].v;
                }
                if(g.childs[i].attributes[j].k=='render'){
                    isrender = false;
                }

            }
            


            if(isrender==true){
                drawcircle(cx,cy,r, ptcenter);
            }

        }

    }


}

let SVGRoot = null;

function setupAlignmentNode(element){

    let n = lookupSVG(element.layerNode, "circle", "ptalignH", "true");
    let n2 = lookupSVG(element.layerNode, "circle", "ptalignV", "true");

    if(n != null){
        for(let i=0;i<n.attributes.length;i++){

            if(n.attributes[i].k=="cx"){
                element.hoffsetalign = parseFloat(n.attributes[i].v);
            }

        }
    }

    if(n2!=null){
        for(let i=0;i<n2.attributes.length;i++){

            if(n2.attributes[i].k=="cy"){
                element.voffsetalign = parseFloat(n2.attributes[i].v);
            }

        }
    }

    console.log(element.hoffsetalign)
    console.log(element.voffsetalign)

}

function circleFromSVG(element, attr, val){

    let node = lookupSVG(element.layerNode, "circle", attr, val );

    let pt = {};

    for(let i=0;i<node.attributes.length;i++){

        if(node.attributes[i].k == "cx"){
            pt.x = parseFloat(node.attributes[i].v);
        }
        if(node.attributes[i].k == "cy"){
            pt.y = parseFloat(node.attributes[i].v);
        }

    }

    return pt;
}

function unvisit(){
    for(let j=0;j<elements.length;j++){

    if(elements[j] instanceof Wire){
        elements[j].visited = false;
    }

}
}

function MaskNode(root, sign, wire, parent){

    this.root = root;

    this.sign = sign;

    this.terminal = wire;
    this.parent = parent;
    this.childs = [];

}

function DFSClearNodeMask(nodemask){

    for(let i=0;i<nodemask.childs.length;i++){
        DFSClearNodeMask(nodemask.childs[i]);
    }

    let idx = -1;

    for(let i=0;i<nodemask.terminal.mask.length;i++){

        if(nodemask.terminal.mask[i] == nodemask){
            idx = i;
        }

    }
    if(idx!=-1){
        nodemask.terminal.mask.splice(idx, 1);
    }

}

function BFSTraversal(root, wire, sign){

    let i = 0;
    let que = [];
    let maskque = [];

    que.push(wire);

    let masknode = new MaskNode(root, sign, wire, null);
    maskque.push(masknode);

    wire.mask.push(masknode);

    while(i<que.length){

        for(let j=0;j<que[i].wiresOut.length;j++){
            
            if(que[i].wiresOut[j].visited == true){
                continue;
            }

            que[i].wiresOut[j].visited = true;
            

            //utwórz węzeł
            let masknodechild = new MaskNode(root, sign, que[i].wiresOut[j], maskque[i]);

            que[i].wiresOut[j].mask.push(masknodechild);

            //wstaw do kolejki
            maskque.push(masknodechild);
            que.push(que[i].wiresOut[j]);

            maskque[i].childs.push(masknodechild);

        }


        if(que[i].terminal != null){

            if(que[i].terminal instanceof SWITCHElement){

                if(que[i].terminal.closed == true){

                    if(que[i].terminal.wireOutA == que[i]){

                        if(que[i].terminal.wireOutB.visited==false){
                            que[i].terminal.wireOutB.visited = true;
                            que.push(que[i].terminal.wireOutB);

                            let masknodechild = new MaskNode(root, sign, que[i].terminal.wireOutB, maskque[i]);
                            maskque.push(masknodechild);

                            maskque[i].childs.push(masknodechild);

                            que[i].terminal.wireOutB.mask.push(masknodechild);


                        }
                    }
                    if(que[i].terminal.wireOutB == que[i]){

                        if(que[i].terminal.wireOutA.visited==false){
                            que[i].terminal.wireOutA.visited = true;
                            que.push(que[i].terminal.wireOutA);

                            let masknodechild = new MaskNode(root, sign, que[i].terminal.wireOutA, maskque[i]);
                            maskque.push(masknodechild);

                            maskque[i].childs.push(masknodechild);

                            que[i].terminal.wireOutA.mask.push(masknodechild);

                        }

                    }

                }

            }

            if(que[i].terminal instanceof RESISTORElement && sign=="-"){

                if(que[i].terminal.wireOutA == que[i]){
                    if(que[i].terminal.wireOutB.visited == false){

                        let isAtAnode = false;

                        for(let j=0;j<que[i].terminal.wireOutA.mask.length;j++){

                            if(que[i].terminal.wireOutA.mask[j].sign == "+"){
                                isAtAnode = true;
                            }

                        }

                        if(isAtAnode==false){

                            que[i].terminal.wireOutB.visited = true;
                            que.push(que[i].terminal.wireOutB)

                            let masknodechild = new MaskNode(root, sign, que[i].terminal.wireOutB, maskque[i] );
                            maskque.push(masknodechild);

                            maskque[i].childs.push(masknodechild);

                            que[i].terminal.wireOutB.mask.push(masknodechild);
                        
                        }
                        

                    }
                }

                if(que[i].terminal.wireOutB == que[i]){

                    if(que[i].terminal.wireOutA.visited==false){

                        let isAtAnode = false;

                        for(let j=0;j<que[i].terminal.wireOutB.mask.length;j++){

                            if(que[i].terminal.wireOutB.mask[j].sign == "+"){
                                isAtAnode = true;
                            }

                        }

                        if(isAtAnode==false){

                            que[i].terminal.wireOutA.visited = true;
                            que.push(que[i].terminal.wireOutA);

                            let masknodechild = new MaskNode(root, sign, que[i].terminal.wireOutA, maskque[i] );
                            maskque.push(masknodechild);

                            maskque[i].childs.push(masknodechild);

                            que[i].terminal.wireOutA.mask.push(masknodechild);
                        
                        }
                        

                    }

                }

            }

        }

        i++;
    }

    return masknode;
}

function Wire(ptstart = null,ptend = null){

    this.ptstart = ptstart;
    this.ptend = ptend;

    this.terminal = null;

    this.wiresOut = [];

    this.mask=[];

    this.visited = false;

    this.lastmove = {
        x: 0,
        y: 0
    }

    this.draw = function(ptmouse){

        if(this.ptstartaligned==true){
            ctx.beginPath();
            ctx.arc(this.ptstart.x, this.ptstart.y, 4, 0, 2*Math.PI);
            ctx.fill();
        }

        if(this.ptendaligned==true){
            ctx.beginPath();
            ctx.arc(this.ptend.x, this.ptend.y, 4, 0, 2*Math.PI);
            ctx.fill();
        }

        ctx.beginPath();
        ctx.moveTo(this.ptstart.x, this.ptstart.y);
        ctx.lineTo(this.ptend.x, this.ptend.y);

        let minus = false;
        let plus = false;

        for(let i=0;i<this.mask.length;i++){
            if(this.mask[i].sign=="-"){
                minus=true;
            }
        }
        for(let i=0;i<this.mask.length;i++){
            if(this.mask[i].sign=="+"){
                plus=true;
            }
        }

        if(minus == true){
            ctx.strokeStyle = "blue";
        }
        else if(plus == true){
            ctx.strokeStyle = "red";
        }
        else{
            ctx.strokeStyle = "black";
        }

        ctx.stroke();

        ctx.strokeStyle = "black";


    }

}

function NPNElement(){

    this.ptcenter = {
        x: 0,
        y: 0
    }

    this.layerNode = lookupSVG(SVGRoot,"g","id", "npn");

    let pt = circleFromSVG(this, "ptcenter", "true")
    this.centerx = pt.x;
    this.centery = pt.y;

    this.ptHalign = circleFromSVG(this, "ptalignH", "true");
    this.ptValign = circleFromSVG(this, "ptalignV", "true");

    this.ptTerminalBase = circleFromSVG(this, "terminalBase", "true")
    this.ptTerminalEmiter = circleFromSVG(this, "terminalEmiter", "true")
    this.ptTerminalCollector = circleFromSVG(this, "terminalCollector", "true")

    this.draw = function(ptmouse){

        let vec = {x: ptmouse.x - this.centerx  , y: ptmouse.y - this.centery};

        drawPaths(this, vec);

    }

}

function PNPElement(){

    this.ptcenter = {
        x: 0,
        y: 0
    }

    this.layerNode = lookupSVG(SVGRoot,"g","id", "pnp");

    let pt = circleFromSVG(this, "ptcenter", "true")
    this.centerx = pt.x;
    this.centery = pt.y;

    this.ptHalign = circleFromSVG(this, "ptalignH", "true");
    this.ptValign = circleFromSVG(this, "ptalignV", "true");

    this.ptTerminalBase = circleFromSVG(this, "terminalBase", "true")
    this.ptTerminalEmiter = circleFromSVG(this, "terminalEmiter", "true")
    this.ptTerminalCollector = circleFromSVG(this, "terminalCollector", "true")


    this.draw = function(ptmouse){

        let vec = {x: ptmouse.x - this.centerx  , y: ptmouse.y - this.centery};

        drawPaths(this, vec);

    }


}

function CATHODEElement(){

    this.ptcenter = {
        x: 0,
        y: 0
    }

    this.wireOut = null;

    this.layerNode = lookupSVG(SVGRoot,"g","id", "cathode");

    let pt = circleFromSVG(this, "ptcenter", "true")
    this.centerx = pt.x;
    this.centery = pt.y;

    this.ptHalign = circleFromSVG(this, "ptalignH", "true");

    this.ptTerminalCathode = circleFromSVG(this, "terminalCathode", "true")

    this.draw = function(ptmouse){

        let vec = {x: ptmouse.x - this.centerx  , y: ptmouse.y - this.centery};

        drawPaths(this, vec);

    }

}
function ANODEElement(){

    this.wireOut = null;

    this.ptcenter = {
        x: 0,
        y: 0
    }

    this.layerNode = lookupSVG(SVGRoot,"g","id", "anode");

    let pt = circleFromSVG(this, "ptcenter", "true")
    this.centerx = pt.x;
    this.centery = pt.y;

    this.ptHalign = circleFromSVG(this, "ptalignH", "true");

    this.ptTerminalAnode = circleFromSVG(this, "terminalAnode", "true")

    this.draw = function(ptmouse){

        let vec = {x: ptmouse.x - this.centerx  , y: ptmouse.y - this.centery};

        drawPaths(this, vec);

    }

}
function RESISTORElement(){

    this.wireOutA = null;
    this.wireOutB = null;

    this.ptcenter = {
        x: 0,
        y: 0
    }

    this.layerNode = lookupSVG(SVGRoot,"g","id", "resistor");

    let pt = circleFromSVG(this, "ptcenter", "true")
    this.centerx = pt.x;
    this.centery = pt.y;

    this.ptHalign = circleFromSVG(this, "ptalignH", "true");

    this.ptTerminalA = circleFromSVG(this, "terminalA", "true");
    this.ptTerminalB = circleFromSVG(this, "terminalB", "true");

    this.draw = function(ptmouse){

        let vec = {x: ptmouse.x - this.centerx  , y: ptmouse.y - this.centery};

        drawPaths(this, vec);

    }
}

function SWITCHElement(){

    this.closed=true;

    this.wireOutA = null;
    this.wireOutB = null;

    this.ptcenter = {
        x: 0,
        y: 0
    };

    this.layerNode = lookupSVG(SVGRoot, "g", "id", "switch_closed");

    let pt = circleFromSVG(this, "ptcenter", "true");
    this.centerx = pt.x;
    this.centery = pt.y;

    this.ptTerminalA = circleFromSVG(this, "terminalA", "true")
    this.ptTerminalB = circleFromSVG(this, "terminalB", "true")

    this.draw = function(ptmouse){

        let vec = {x: ptmouse.x - this.centerx  , y: ptmouse.y - this.centery};

        if(this.closed == false){
            this.layerNode = lookupSVG(SVGRoot, "g", "id", "switch_open");
        }
        else{
            this.layerNode = lookupSVG(SVGRoot, "g", "id", "switch_closed");
        }

        drawPaths(this, vec);


    }


}

fetch("rysunek.svg")
  .then((res) => res.text())
  .then((text) => {
    
    SVGRoot = parseXML(text);

   })
  .catch((e) => console.error(e))


let currentElement = null;
let elementCtrled = null;

let elements = [];

document.getElementById("npn").addEventListener("click", ()=>{

    currentElement = new NPNElement();
    setupAlignmentNode(currentElement);

})
document.getElementById("pnp").addEventListener("click", ()=>{

    currentElement = new PNPElement();
    setupAlignmentNode(currentElement);

})
document.getElementById("cathode").addEventListener("click", ()=>{

    currentElement = new CATHODEElement();
    setupAlignmentNode(currentElement);

})
document.getElementById("anode").addEventListener("click", ()=>{

    currentElement = new ANODEElement();
    setupAlignmentNode(currentElement);

})
document.getElementById("resistor").addEventListener("click", ()=>{

    currentElement = new RESISTORElement();
    setupAlignmentNode(currentElement);

})
document.getElementById("wire").addEventListener("click", ()=>{

    currentElement = new Wire();

})
document.getElementById("switch").addEventListener("click", ()=>{

    currentElement = new SWITCHElement();

})
document.getElementById("simulation").addEventListener("click", ()=>{

    for(let i=0;i<elements.length;i++){
        if(elements[i] instanceof ANODEElement){

            unvisit();
            BFSTraversal(elements[i], elements[i].wireOut, "+");

        }
    }

    for(let i=0;i<elements.length;i++){
        if(elements[i] instanceof CATHODEElement){

            BFSTraversal(elements[i], elements[i].wireOut, "-");
            unvisit();
        }
    }


    ctx.beginPath();
    ctx.clearRect(0,0,1500,1300);
    ctx.stroke();

    for(let i=0;i<elements.length;i++){

        if(elements[i] instanceof Wire){
            elements[i].draw();
        }else{
            elements[i].draw({x: elements[i].ptcenter.x, y: elements[i].ptcenter.y})
        }

    }

})

document.getElementById("reset").addEventListener("click", ()=>{

    for(let i=0;i<elements.length;i++){

        if(elements[i] instanceof Wire){
            elements[i].visited = false;
        }

    }

    ctx.beginPath();
    ctx.clearRect(0,0,1500,1300);
    ctx.stroke();

    for(let i=0;i<elements.length;i++){

        if(elements[i] instanceof Wire){
            console.log(elements[i]);
            elements[i].draw();
        }else{
            elements[i].draw({x: elements[i].ptcenter.x, y: elements[i].ptcenter.y})
        }

    }

})

canvas.addEventListener("mousemove", (ev)=>{

    ctx.beginPath();
    ctx.clearRect(0,0,1500,1300);
    ctx.stroke();

    if(currentElement!=null){

        if(currentElement instanceof Wire){

            if(currentElement.ptstart!=null){

                //moving with ptstart 

                if(currentElement.ptstartaligned == true){
                    ctx.beginPath();
                    ctx.arc(currentElement.ptstart.x, currentElement.ptstart.y, 4, 0, 2*Math.PI);
                    ctx.fillStyle = "black";
                    ctx.fill();
                }

                let Vdiff = Math.abs(currentElement.ptstart.y - ev.offsetY);
                let Hdiff = Math.abs(currentElement.ptstart.x - ev.offsetX);

                if(Vdiff<Hdiff){

                    let ALIGNED_X = ev.offsetX;
                    let IS_ALIGNED_X = false;
                    let alignedX_diff = 0;

                    let alignedWire = null;

                    for(let i=0;i<elements.length;i++){

                        if((elements[i] instanceof Wire) == false){
                            continue;
                        }

                        if(elements[i].ptstart.y == elements[i].ptend.y
                            && ( Math.abs(currentElement.ptstart.y - elements[i].ptstart.y ) < 2 )
                        ){

                            if( ev.offsetX>Math.min(elements[i].ptstart.x, elements[i].ptend.x)
                            &&  ev.offsetX<Math.max(elements[i].ptstart.x, elements[i].ptend.x)){
                                
                                alignedWire = elements[i];

                                if(currentElement.ptstart.x < Math.min(elements[i].ptstart.x,elements[i].ptend.x)){
                                    IS_ALIGNED_X = true;
                                    ALIGNED_X = Math.min(elements[i].ptstart.x,elements[i].ptend.x);
                                }

                                if(currentElement.ptstart.x > Math.max(elements[i].ptstart.x,elements[i].ptend.x)){
                                    IS_ALIGNED_X = true;
                                    ALIGNED_X = Math.max(elements[i].ptstart.x,elements[i].ptend.x);
                                }
                            
                            }
                        }

                        if(elements[i].ptstart.x == elements[i].ptend.x 
                            && ( currentElement.ptstart.y > Math.min(elements[i].ptstart.y,elements[i].ptend.y)   )
                            && ( currentElement.ptstart.y < Math.max(elements[i].ptstart.y,elements[i].ptend.y) )
                        ){

                            if( (Math.abs(elements[i].ptstart.x-ev.offsetX) < 12)  ){

                                if(IS_ALIGNED_X==false || Math.abs(elements[i].ptstart.x-ev.offsetX) < alignedX_diff){
                                    ALIGNED_X = elements[i].ptstart.x;
                                    IS_ALIGNED_X = true;
                                    alignedX_diff = Math.abs(elements[i].ptstart.x-ev.offsetX);
                                    
                                    alignedWire = elements[i];

                                }

                            }

                        }

                    }

                    ctx.beginPath();
                    ctx.moveTo(currentElement.ptstart.x, currentElement.ptstart.y);
                    ctx.lineTo(ALIGNED_X,currentElement.ptstart.y);
                    ctx.stroke();

                    if(IS_ALIGNED_X==true){

                        currentElement.ptendaligned = true;
                        currentElement.alignedWireB = alignedWire;

                        ctx.beginPath();
                        ctx.arc(ALIGNED_X,currentElement.ptstart.y,4,0,Math.PI*2);
                        ctx.fill();
                    }
                    else{
                        currentElement.ptendaligned = false;
                        currentElement.alignedWireB = null;
                    }

                    currentElement.lastmove = {
                        x: ALIGNED_X,
                        y: currentElement.ptstart.y
                    }

                }
                if(Hdiff<=Vdiff){

                    let ALIGNED_Y = ev.offsetY;
                    let IS_ALIGNED_Y = false;
                    let alignedY_diff = 0;

                    let alignedWire = null;

                    for(let i=0;i<elements.length;i++){

                        if((elements[i] instanceof Wire) == false){
                            continue;
                        }

                        if(elements[i].ptstart.x == elements[i].ptend.x && Math.abs(currentElement.ptstart.x-elements[i].ptstart.x)<2){

                            if(ev.offsetY>Math.min(elements[i].ptstart.y,elements[i].ptend.y)
                            &&  ev.offsetY<Math.max(elements[i].ptstart.y,elements[i].ptend.y)){
                                
                                alignedWire = elements[i];

                                if(currentElement.ptstart.y < Math.min(elements[i].ptstart.y,elements[i].ptend.y)){

                                    IS_ALIGNED_Y = true;
                                    ALIGNED_Y = Math.min(elements[i].ptstart.y,elements[i].ptend.y);

                                }
                                if(currentElement.ptstart.y > Math.max(elements[i].ptstart.y,elements[i].ptend.y)){

                                    IS_ALIGNED_Y = true;
                                    ALIGNED_Y = Math.max(elements[i].ptstart.y,elements[i].ptend.y);

                                }
                        
                            }

                        }

                        if(elements[i].ptstart.y == elements[i].ptend.y
                            && (currentElement.ptstart.x > Math.min(elements[i].ptstart.x, elements[i].ptend.x))
                            && (currentElement.ptstart.x < Math.max(elements[i].ptstart.x, elements[i].ptend.x))
                        ){

                            if(Math.abs(elements[i].ptstart.y-ev.offsetY)<12){

                                if(IS_ALIGNED_Y==false || Math.abs(elements[i].ptstart.y-ev.offsetY)<alignedY_diff){
                                    IS_ALIGNED_Y = true;
                                    ALIGNED_Y = elements[i].ptstart.y;
                                    alignedY_diff = Math.abs(elements[i].ptstart.y-ev.offsetY);

                                    alignedWire = elements[i];

                                }

                            }

                        }

                    }



                    ctx.beginPath();
                    ctx.moveTo(currentElement.ptstart.x, currentElement.ptstart.y);
                    ctx.lineTo(currentElement.ptstart.x,ALIGNED_Y);
                    ctx.stroke();

                    if(IS_ALIGNED_Y==true){

                        currentElement.ptendaligned = true;
                        currentElement.alignedWireB = alignedWire;

                        ctx.beginPath();
                        ctx.arc(currentElement.ptstart.x,ALIGNED_Y,4,0,Math.PI*2);
                        ctx.fill();
                    }
                    else{
                        currentElement.ptendaligned = false;
                        currentElement.alignedWireB = null;
                    }


                    currentElement.lastmove = {
                        x: currentElement.ptstart.x,
                        y: ALIGNED_Y
                    }

                }


            }
            else{

                let ALIGNED_X = ev.offsetX;
                let ALIGNED_Y = ev.offsetY;

                let IS_ALIGNED_X = false;
                let IS_ALIGNED_Y = false;

                let alignedX_diff = 0;
                let alignedY_diff = 0;

                let alignedWire = null;

                for(let i=0;i<elements.length;i++){

                    if((elements[i] instanceof Wire) == false){
                        continue;
                    }

                    if(elements[i].ptstart.x == elements[i].ptend.x){

                        //wire is vertical

                        if( (Math.abs(ev.offsetX-elements[i].ptstart.x) < 12)   
                           && (Math.min(elements[i].ptstart.y, elements[i].ptend.y) < ev.offsetY) && (Math.max(elements[i].ptstart.y, elements[i].ptend.y) > ev.offsetY )
                        ){
                            if(IS_ALIGNED_X == false || Math.abs(ev.offsetX-elements[i].ptstart.x) < alignedX_diff ){
                                alignedX_diff = Math.abs(ev.offsetX-elements[i].ptstart.x);
                                IS_ALIGNED_X = true;
                                ALIGNED_X = elements[i].ptstart.x;
                                alignedWire = elements[i];
                            }
                        }
                    }

                    if(elements[i].ptstart.y == elements[i].ptend.y){

                        //wire is horizontal

                        if((Math.abs(ev.offsetY-elements[i].ptstart.y)<12)
                            && ( ev.offsetX > Math.min(elements[i].ptstart.x,elements[i].ptend.x)  )
                            && ( ev.offsetX < Math.max(elements[i].ptstart.x,elements[i].ptend.x))
                        ){
                            if(IS_ALIGNED_Y == false || Math.abs(ev.offsetY-elements[i].ptstart.y) < alignedY_diff ){
                                alignedY_diff = Math.abs(ev.offsetY-elements[i].ptstart.y);
                                IS_ALIGNED_Y = true;
                                ALIGNED_Y = elements[i].ptstart.y;
                                alignedWire = elements[i];
                            }
                        }

                    }

                }

                if(IS_ALIGNED_X == true || IS_ALIGNED_Y == true){
                    currentElement.ptstartaligned = true;
                    currentElement.alignedWireA = alignedWire;
                }
                else{
                    currentElement.ptstartaligned = false;
                    currentElement.alignedWireA = null;
                }

                currentElement.lastmove.x = ALIGNED_X;
                currentElement.lastmove.y = ALIGNED_Y;

                ctx.beginPath();
                ctx.arc(ALIGNED_X, ALIGNED_Y, 4, 0, 2*Math.PI);
                ctx.stroke();
            }

        }
        else{

            let minDiff = 0;
            let minDiffElement = null;

            for(let i=0;i<elements.length;i++){

                if(elements[i] instanceof Wire){
                    continue;
                }

                let w = elements[i].ptcenter.x - ev.offsetX;
                let h = elements[i].ptcenter.y - ev.offsetY;

                let diff = Math.sqrt(w*w + h*h);

                if(minDiffElement == null || diff<minDiff){
                    minDiff = diff;
                    minDiffElement = elements[i];
                }

            }

            if((ev.ctrlKey == true && minDiffElement != null & minDiff < 50) || (ev.ctrlKey == true && elementCtrled != null) ){

                elementCtrled = minDiffElement;

                console.log(minDiffElement);

                let verticalDiff = Math.abs( ev.offsetY - elementCtrled.ptcenter.y );
                let horizontalDiff = Math.abs( ev.offsetX - elementCtrled.ptcenter.x);

                //console.log(verticalDiff + " vs " + horizontalDiff);



                if(elementCtrled.hoffsetalign == undefined || currentElement.hoffsetalign == undefined || verticalDiff<horizontalDiff ){

                    let hoa1 = currentElement.voffsetalign;                
                    let hoa2 = elementCtrled.voffsetalign;

                    if(currentElement.mirrorV == true){

                        console.log(currentElement.centery + " vs " + currentElement.voffsetalign)

                        hoa1 = currentElement.centery - (currentElement.voffsetalign - currentElement.centery);

                        //console.log(currentElement.voffsetalign + " vs " + hoa1);

                    }

                    if(elementCtrled.mirrorV == true){

                        hoa2 = elementCtrled.centery - (elementCtrled.voffsetalign - elementCtrled.centery );

                    }

                    let EL_CURRENT_vec =  hoa1 - currentElement.centery ;
                    let EL_CTRLED_vec = hoa2 - elementCtrled.centery ;

                    console.log(EL_CURRENT_vec);
                    console.log(EL_CTRLED_vec);

                    let lastmove = {
                        x: ev.offsetX,
                        y: elementCtrled.ptcenter.y + EL_CTRLED_vec-EL_CURRENT_vec 
                    };
                    currentElement.draw(lastmove);
                    currentElement.lastmove = lastmove;

                }
                if(elementCtrled.voffsetalign == undefined || currentElement.voffsetalign == undefined || horizontalDiff<verticalDiff ){

                    let hoa1 = currentElement.hoffsetalign;                
                    let hoa2 = elementCtrled.hoffsetalign;

                    if(currentElement.mirrorH == true){
                        hoa1 = currentElement.centerx  - (currentElement.hoffsetalign - currentElement.centerx)
                    }

                    if(elementCtrled.mirrorH == true){
                        hoa2 = elementCtrled.centerx - (elementCtrled.hoffsetalign - elementCtrled.centerx);
                    }

                    let EL_CURRENT_vec =  hoa1 - currentElement.centerx ;
                    let EL_CTRLED_vec = hoa2 - elementCtrled.centerx ;


                    console.log(EL_CTRLED_vec + " vs " + EL_CURRENT_vec);
                    console.log( currentElement.centerx  );

                    let lastmove = {
                        x: elementCtrled.ptcenter.x + EL_CTRLED_vec-EL_CURRENT_vec,
                        y: ev.offsetY
                    };
                    currentElement.draw(lastmove);
                    currentElement.lastmove = lastmove;
                }
            }
            else{
                let lastmove = {x: ev.offsetX, y: ev.offsetY};
                currentElement.draw(lastmove);
                currentElement.lastmove = lastmove;
            }
        
        }

        if(ev.ctrlKey==false && elementCtrled != false){
            elementCtrled = null;
        }

        
    }

    for(let i=0;i<elements.length;i++){

        if(elements[i] instanceof Wire){
            elements[i].draw();
        }
        else{
            elements[i].draw({x: elements[i].ptcenter.x, y: elements[i].ptcenter.y});
        }

    }

})

canvas.addEventListener("click", (ev)=>{

    if(currentElement!=null){

        let elementReady = true;

        if(currentElement instanceof NPNElement){

            let vecbase = {
                w: currentElement.ptTerminalBase.x - currentElement.centerx,
                h: currentElement.ptTerminalBase.y - currentElement.centery
            };

            let vecemiter = {
                w: currentElement.ptTerminalEmiter.x - currentElement.centerx,
                h: currentElement.ptTerminalEmiter.y - currentElement.centery
            }

            let veccollector = {
                w: currentElement.ptTerminalCollector.x - currentElement.centerx,
                h: currentElement.ptTerminalCollector.y - currentElement.centery
            }

            if(currentElement.mirrorH==true){
                //horizontal
                vecbase.w = -vecbase.w;
                vecemiter.w = -vecemiter.w;
                veccollector.w = -veccollector.w;
            }
            if(currentElement.mirrorV==true){
                //vertical
                vecbase.h = -vecbase.h;
                vecemiter.h = -vecemiter.h;
                veccollector.h = -veccollector.h;
            }

            let vecbaseptend = 50;
            if(currentElement.mirrorH==true){
                vecbaseptend = -vecbaseptend;
            }

            let wireBase = new Wire({
                x: currentElement.lastmove.x + vecbase.w,
                y: currentElement.lastmove.y + vecbase.h
            }, {
                x: currentElement.lastmove.x + vecbase.w - vecbaseptend,
                y: currentElement.lastmove.y + vecbase.h
            })

            let vecemiterptend = 50;
            if(currentElement.mirrorV==true){
                vecemiterptend = -vecemiterptend;
            }

            let wireEmiter = new Wire({
                x: currentElement.lastmove.x + vecemiter.w,
                y: currentElement.lastmove.y + vecemiter.h
            }, {
                x: currentElement.lastmove.x + vecemiter.w,
                y: currentElement.lastmove.y + vecemiter.h - vecemiterptend
            })


            let veccollectorptend = 50;
            if(currentElement.mirrorV==true){
                veccollectorptend = -veccollectorptend;
            }

            let wireCollector = new Wire({
                x: currentElement.lastmove.x + veccollector.w,
                y: currentElement.lastmove.y + veccollector.h
            }, {
                x: currentElement.lastmove.x + veccollector.w,
                y: currentElement.lastmove.y + veccollector.h + vecemiterptend
            })



            elements.push(wireBase);
            elements.push(wireEmiter);
            elements.push(wireCollector);

        }

        if(currentElement instanceof PNPElement){

            let vecbase = {
                w: currentElement.ptTerminalBase.x - currentElement.centerx,
                h: currentElement.ptTerminalBase.y - currentElement.centery
            };

            let vecemiter = {
                w: currentElement.ptTerminalEmiter.x - currentElement.centerx,
                h: currentElement.ptTerminalEmiter.y - currentElement.centery
            }

            let veccollector = {
                w: currentElement.ptTerminalCollector.x - currentElement.centerx,
                h: currentElement.ptTerminalCollector.y - currentElement.centery
            }

            if(currentElement.mirrorH==true){
                //horizontal
                vecbase.w = -vecbase.w;
                vecemiter.w = -vecemiter.w;
                veccollector.w = -veccollector.w;
            }
            if(currentElement.mirrorV==true){
                //vertical
                vecbase.h = -vecbase.h;
                vecemiter.h = -vecemiter.h;
                veccollector.h = -veccollector.h;
            }

            let vecbaseptend = 50;
            if(currentElement.mirrorH==true){
                vecbaseptend = -vecbaseptend;
            }

            let wireBase = new Wire({
                x: currentElement.lastmove.x + vecbase.w,
                y: currentElement.lastmove.y + vecbase.h
            }, {
                x: currentElement.lastmove.x + vecbase.w - vecbaseptend,
                y: currentElement.lastmove.y + vecbase.h
            })

            let vecemiterptend = 50;
            if(currentElement.mirrorV==true){
                vecemiterptend = -vecemiterptend;
            }

            let wireEmiter = new Wire({
                x: currentElement.lastmove.x + vecemiter.w,
                y: currentElement.lastmove.y + vecemiter.h
            }, {
                x: currentElement.lastmove.x + vecemiter.w,
                y: currentElement.lastmove.y + vecemiter.h + vecemiterptend
            })


            let veccollectorptend = 50;
            if(currentElement.mirrorV==true){
                veccollectorptend = -veccollectorptend;
            }

            let wireCollector = new Wire({
                x: currentElement.lastmove.x + veccollector.w,
                y: currentElement.lastmove.y + veccollector.h
            }, {
                x: currentElement.lastmove.x + veccollector.w,
                y: currentElement.lastmove.y + veccollector.h - vecemiterptend
            })



            elements.push(wireBase);
            elements.push(wireEmiter);
            elements.push(wireCollector);

        }

        if(currentElement instanceof CATHODEElement){

            let veccathode = {
                w: currentElement.ptTerminalCathode.x - currentElement.centerx,
                h: currentElement.ptTerminalCathode.y - currentElement.centery
            };

            if(currentElement.mirrorH == true){
                veccathode.w = -veccathode.w;
            }
            if(currentElement.mirrorV == true){
                veccathode.h = -veccathode.h;
            }

            let veccathodeptend = 50;
            if(currentElement.mirrorV){
                veccathodeptend = -veccathodeptend;
            }

            let wireCathode = new Wire({
                x: currentElement.lastmove.x + veccathode.w,
                y: currentElement.lastmove.y + veccathode.h
            },{
                x: currentElement.lastmove.x + veccathode.w,
                y: currentElement.lastmove.y + veccathode.h + veccathodeptend
            })

            currentElement.wireOut = wireCathode;
            wireCathode.terminal = currentElement;

            elements.push(wireCathode);

        }

        if(currentElement instanceof ANODEElement){

            let vecanode = {
                w: currentElement.ptTerminalAnode.x - currentElement.centerx,
                h: currentElement.ptTerminalAnode.y - currentElement.centery
            };

            if(currentElement.mirrorH == true){
                vecanode.w = -vecanode.w;
            }
            if(currentElement.mirrorV == true){
                vecanode.h = -vecanode.h;
            }

            let vecanodeptend = -50;
            if(currentElement.mirrorV){
                vecanodeptend = -vecanodeptend;
            }

            let wireAnode = new Wire({
                x: currentElement.lastmove.x + vecanode.w,
                y: currentElement.lastmove.y + vecanode.h
            },{
                x: currentElement.lastmove.x + vecanode.w,
                y: currentElement.lastmove.y + vecanode.h + vecanodeptend
            })

            currentElement.wireOut = wireAnode;
            wireAnode.terminal = currentElement; 

            elements.push(wireAnode);

        }

        if(currentElement instanceof RESISTORElement){

            let vecresistorA = {
                w: currentElement.ptTerminalA.x - currentElement.centerx,
                h: currentElement.ptTerminalA.y - currentElement.centery
            }

            let vecresistorB = {
                w: currentElement.ptTerminalB.x - currentElement.centerx,
                h: currentElement.ptTerminalB.y - currentElement.centery
            }

            if(currentElement.mirrorH==true){
                vecresistorA.w = -vecresistorA.w;
                vecresistorB.w = -vecresistorB.w;
            }

            if(currentElement.mirrorV==true){
                vecresistorA.h = -vecresistorA.h;
                vecresistorB.h = -vecresistorB.h;
            }

            let vecterminalAptend = 50;
            if(currentElement.mirrorV){
                vecterminalAptend = - vecterminalAptend
            }

            let wireTerminalA = new Wire({
                x: currentElement.lastmove.x + vecresistorA.w,
                y: currentElement.lastmove.y + vecresistorA.h
            },{
                x: currentElement.lastmove.x + vecresistorA.w,
                y: currentElement.lastmove.y + vecresistorA.h + vecterminalAptend
            })


            let vecterminalBptend = 50;
            if(currentElement.mirrorV){
                vecterminalBptend = - vecterminalBptend
            }

            let wireTerminalB = new Wire({
                x: currentElement.lastmove.x + vecresistorB.w,
                y: currentElement.lastmove.y + vecresistorB.h
            },{
                x: currentElement.lastmove.x + vecresistorB.w,
                y: currentElement.lastmove.y + vecresistorB.h - vecterminalBptend
            })

            wireTerminalA.terminal = currentElement;
            wireTerminalB.terminal = currentElement;

            currentElement.wireOutA = wireTerminalA;
            currentElement.wireOutB = wireTerminalB;

            elements.push(wireTerminalA);
            elements.push(wireTerminalB);

        }

        if(currentElement instanceof Wire){

            if(currentElement.ptstart==null){
                elementReady = false;
                currentElement.ptstart = {
                    x: currentElement.lastmove.x,
                    y: currentElement.lastmove.y
                }

                if(currentElement.alignedWireA!=null){
                    currentElement.wiresOut.push(currentElement.alignedWireA);
                    currentElement.alignedWireA.wiresOut.push(currentElement);
                }

            }
            else{

                currentElement.ptend = {
                    x: currentElement.lastmove.x,
                    y: currentElement.lastmove.y
                }

                if(currentElement.alignedWireB != null){

                    currentElement.wiresOut.push(currentElement.alignedWireB);
                    currentElement.alignedWireB.wiresOut.push(currentElement);

                }


            }
        }

        if(currentElement instanceof SWITCHElement){

            let vecterminalA = {
                w: currentElement.ptTerminalA.x - currentElement.centerx,
                h: currentElement.ptTerminalA.y - currentElement.centery
            }
            let vecterminalB = {
                w: currentElement.ptTerminalB.x - currentElement.centerx,
                h: currentElement.ptTerminalB.y - currentElement.centery
            }

            if(currentElement.mirrorH==true){
                vecterminalA.w = -vecterminalA.w;
                vecterminalB.w = -vecterminalB.w;
            }
            if(currentElement.mirrorV==true){
                vecterminalA.h = -vecterminalA.h;
                vecterminalB.h = -vecterminalB.h;
            }

            let wireVec = 50;
            if(currentElement.mirrorH==true){
                wireVec = -wireVec;
            }

            let wireTerminalA = new Wire({
                x: currentElement.lastmove.x + vecterminalA.w,
                y: currentElement.lastmove.y + vecterminalA.h
            },{
                x: currentElement.lastmove.x + vecterminalA.w - wireVec,
                y: currentElement.lastmove.y + vecterminalA.h
            })

            wireVec = 50;
            if(currentElement.mirrorH==true){
                wireVec = -wireVec;
            }

            let wireTerminalB = new Wire({
                x:  currentElement.lastmove.x + vecterminalB.w,
                y: currentElement.lastmove.y + vecterminalB.h
            },{
                x: currentElement.lastmove.x + vecterminalB.w + wireVec,
                y: currentElement.lastmove.y + vecterminalB.h
            })

            wireTerminalA.terminal = currentElement;
            wireTerminalB.terminal = currentElement;

            currentElement.wireOutA = wireTerminalA;
            currentElement.wireOutB = wireTerminalB;

            elements.push(wireTerminalA);
            elements.push(wireTerminalB);


        }


        if(elementReady == true){

            console.log(currentElement);

            elements.push(currentElement);
            if((currentElement instanceof Wire) == false){
                elements[elements.length-1].ptcenter.x = elements[elements.length-1].lastmove.x;
                elements[elements.length-1].ptcenter.y = elements[elements.length-1].lastmove.y;
            }
            currentElement = null;

        }
    }

    for(let i=0;i<elements.length;i++){

        if(elements[i] instanceof SWITCHElement){

            let w = Math.abs(elements[i].ptcenter.x-ev.offsetX);
            let h = Math.abs(elements[i].ptcenter.y-ev.offsetY);

            let diff = Math.sqrt(w*w + h*h);

            if(diff<20){
                elements[i].closed = !elements[i].closed;

                if(elements[i].closed == false){
                    elements[i].layerNode = lookupSVG(SVGRoot, "g", "id", "switch_open");
                }
                else{
                    elements[i].layerNode = lookupSVG(SVGRoot, "g", "id", "switch_closed");
                }

                let pt = circleFromSVG(elements[i], "ptcenter", "true");
                elements[i].centerx = pt.x;
                elements[i].centery = pt.y;

                elements[i].ptTerminalA = circleFromSVG(elements[i], "terminalA", "true")
                elements[i].ptTerminalB = circleFromSVG(elements[i], "terminalB", "true")

                for(let j=0;j<elements.length;j++){

                    if(elements[j] instanceof Wire){
                        elements[j].visited = false;
                    }

                }

                if(elements[i].closed==false){

                    let masksClosed = [];

                    for(let j=0;j<elements[i].wireOutA.mask.length;j++){

                        if(elements[i].wireOutA.mask[j].parent.terminal == elements[i].wireOutB){

                            //rodzic na kablu B

                            let idx = 0;

                            for(let k=0;k<elements[i].wireOutA.mask[j].parent.childs.length;k++){
                                if(elements[i].wireOutA.mask[j].parent.childs[k] == elements[i].wireOutA.mask[j]){
                                    idx = k;
                                }
                            }

                            elements[i].wireOutA.mask[j].parent.childs.splice(idx,1);

                            masksClosed.push(elements[i].wireOutA.mask[j])

                        }

                    }

                    let detachedFromAnode = false;

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<elements[i].wireOutA.mask.length;k++){
                            if(masksClosed[j] == elements[i].wireOutA.mask[k]){

                                console.log(masksClosed[j]);

                                if(masksClosed[j].sign == "+"){
                                    detachedFromAnode = true;
                                }

                                idx = k;
                                break;
                            }
                        }

                        if(idx!=-1){
                            DFSClearNodeMask(elements[i].wireOutA.mask[idx]);
                        }
                        

                    }

                    if(detachedFromAnode==true){
                        console.log("detached from anode");

                        let cntAnodeAttached = 0;

                        for(let j=0;j<elements[i].wireOutA.mask.length;j++){
                            if(elements[i].wireOutA.mask[j].sign == "+"){
                                cntAnodeAttached++;
                            }
                        }

                        console.log("Anodes attached to node: " + cntAnodeAttached);

                        if(cntAnodeAttached == 0){



                        }

                    }

                    masksClosed = [];

                    for(let j=0;j<elements[i].wireOutB.mask.length;j++){

                        if(elements[i].wireOutB.mask[j].parent.terminal == elements[i].wireOutA){

                            let idx = 0;;

                            for(let k=0;k<elements[i].wireOutB.mask[j].parent.childs.length;k++){

                                if(elements[i].wireOutB.mask[j].parent.childs[k] == elements[i].wireOutB.mask[j]){
                                    idx = k;
                                }

                            }

                            elements[i].wireOutB.mask[j].parent.childs.splice(idx,1);

                            masksClosed.push(elements[i].wireOutB.mask[j])
                            
                        }

                    }

                    detachedFromAnode = false;

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<elements[i].wireOutB.mask.length;k++){
                            if(masksClosed[j] == elements[i].wireOutB.mask[k]){

                                console.log(masksClosed[j]);

                                if(masksClosed[j].sign == "+"){
                                    detachedFromAnode = true;
                                }

                                idx = k;
                                break;
                            }
                        }

                        if(idx!=-1){
                            DFSClearNodeMask(elements[i].wireOutB.mask[idx]);
                        }
                        
                    }

                    if(detachedFromAnode==true){
                        console.log("detached from anode");

                        let cntAnodeAttached = 0;

                        for(let j=0;j<elements[i].wireOutB.mask.length;j++){
                            if(elements[i].wireOutB.mask[j].sign == "+"){
                                cntAnodeAttached++;
                            }
                        }

                        console.log("Anodes attached to node: " + cntAnodeAttached);
                    }



                }

                if(elements[i].closed==true){

                    let idx_toB = elements[i].wireOutB.mask.length;

                    for(let j=0;j<elements[i].wireOutA.mask.length;j++){

                        elements[i].wireOutA.visited = true;
                        let Broot = BFSTraversal(elements[i].wireOutB, elements[i].wireOutA.mask[j].sign );                    

                        elements[i].wireOutA.mask[j].childs.push(Broot);
                        Broot.parent = elements[i].wireOutA.mask[j];
                    }

                    for(let j=0;j<idx_toB;j++){

                        elements[i].wireOutB.visited = true;
                        let Aroot = BFSTraversal(elements[i].wireOutA, elements[i].wireOutB.mask[j].sign);
                        elements[i].wireOutB.mask[j].childs.push(Aroot);
                        Aroot.parent = elements[i].wireOutB.mask[j];
                    }

                }

                ctx.beginPath();
                ctx.clearRect(0,0,1500,1300);
                ctx.stroke();

                for(let i=0;i<elements.length;i++){
                    if(elements[i] instanceof Wire){
                        elements[i].draw();
                    }
                    else{
                        elements[i].draw({x: elements[i].ptcenter.x, y: elements[i].ptcenter.y});
                    }

                }

            }

        }

    }


})

document.addEventListener("keydown", (ev)=>{

    //console.log(ev);

    let rerender = false;

    if(ev.code == 'KeyV'){
        if(currentElement!=null){
            rerender = true;
            if(currentElement.hoffsetalign != undefined){

                //currentElement.hoffsetalign=0;

            }
            currentElement.mirrorH = !currentElement.mirrorH;
        }
    }
    if(ev.code == 'KeyK'){
        if(currentElement!=null){
            rerender = true;
            if(currentElement.voffsetalign != undefined){

            }
            currentElement.mirrorV = !currentElement.mirrorV;
        }
    }

    if(rerender == true){

        ctx.beginPath();

        ctx.clearRect(0,0,1500,1300)

        ctx.stroke();

        currentElement.draw(currentElement.lastmove);

        for(let i=0;i<elements.length;i++){
            if(elements[i] instanceof Wire){
                elements[i].draw();
            }
            else{
                elements[i].draw({x: elements[i].ptcenter.x, y: elements[i].ptcenter.y});
            }

        }

    }

})


