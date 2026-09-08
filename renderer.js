
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
let zoom = 1.0;

let transhandlex = 0;
let transhandley = 0;
let mousedown = false;

let selectingx = 0;
let selectingy = 0;
let selectingnow = false;

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

function zoompoints(points, ptcenternode){

    let x,y;

    for(let i=0;i<ptcenternode.attributes.length;i++){

        if(ptcenternode.attributes[i].k == 'cx'){
            x = parseFloat(ptcenternode.attributes[i].v);
        }
        
        if(ptcenternode.attributes[i].k == 'cy'){
            y = parseFloat(ptcenternode.attributes[i].v);
        }
    }

    for(let i=0;i<points.length;i++){

        for(let j=0;j<points[i].length;j++){

            //console.log(points[i][j]);

            points[i][j].x = x + zoom*(points[i][j].x - x);
            points[i][j].y = y + zoom*(points[i][j].y - y);
        }


    }


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

    ctx.save();
    if(element.selected == true){
        ctx.strokeStyle = "lime";
    }

    let g = element.layerNode;

    let ptcenternode = null;

    for(let i=0;i<g.childs.length;i++){

        if(g.childs[i].tagName=="circle"){

            for(let j=0;j<g.childs[i].attributes.length;j++){

                if(g.childs[i].attributes[j].k == 'ptcenter' && g.childs[i].attributes[j].v == 'true'){

                    ptcenternode = g.childs[i];                

                }

            }

        }

    }


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

                    zoompoints(points, ptcenternode);
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
                drawcircle(cx,cy,r*zoom, ptcenter);
            }

        }

    }

    ctx.restore();

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

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    
    importCircuit(JSON.parse(contents));

    console.log(elements);

    console.log(contents);

  };
  reader.readAsText(file);
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

    if(nodemask.sign == "-"){

        if(nodemask.terminal.terminal instanceof PNPElement && nodemask.terminal.terminal.wireOutBase == nodemask.terminal){

            let BE = false;

            for(let i=0;i<nodemask.terminal.mask.length;i++){

                if(nodemask.terminal.mask[i].sign == "-"){
                    BE = true;
                    break;
                }
            }

            if(BE==false){

                //CE

                for(let i=0;i<nodemask.terminal.terminal.wireOutCollector.mask.length;i++){

                    let mask_i = nodemask.terminal.terminal.wireOutCollector.mask[i];

                    let masksClosed = [];

                    for(let j=0;j<mask_i.childs.length;j++){
                        if(mask_i.childs[j].terminal == nodemask.terminal.terminal.wireOutEmiter){
                            DFSClearNodeMask(mask_i.childs[j]);
                            masksClosed.push(mask_i.childs[j]);
                        }
                    }

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<mask_i.childs.length;k++){
                            if(masksClosed[j]==mask_i.childs[k]){
                                idx = k;
                            }
                        }
                        if(idx != -1){
                            mask_i.childs.splice(idx,1);
                        }

                    }
                }

                // EC
                let collectorDetachedFromAnode = false;

                for(let i=0;i<nodemask.terminal.terminal.wireOutEmiter.mask.length;i++){

                    let mask_i = nodemask.terminal.terminal.wireOutEmiter.mask[i];

                    let masksClosed = [];

                    

                    for(let j=0;j<mask_i.childs.length;j++){
                        if(mask_i.childs[j].terminal == nodemask.terminal.terminal.wireOutCollector){

                            if(mask_i.sign=="+"){
                                collectorDetachedFromAnode = true;
                            }

                            DFSClearNodeMask(mask_i.childs[j]);
                            masksClosed.push(mask_i.childs[j]);
                        }
                    }

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<mask_i.childs.length;k++){
                            if(masksClosed[j]==mask_i.childs[k]){
                                idx = k;
                            }
                        }
                        if(idx != -1){
                            mask_i.childs.splice(idx,1);
                        }

                    }
                }
                if(collectorDetachedFromAnode==true){

                    console.log("COLLECTOR DETACHED FROM ANODE");

                    let cntAnodeAttached = 0;

                    for(let i=0;i<nodemask.terminal.terminal.wireOutCollector.mask.length;i++){
                        if(nodemask.terminal.terminal.wireOutCollector.mask[i].sign == "+"){
                            cntAnodeAttached++;
                        }
                    }

                    if(cntAnodeAttached == 0){

                        for(let i=0;i<nodemask.terminal.terminal.wireOutCollector.mask.length;i++){

                            let mask_i= nodemask.terminal.terminal.wireOutCollector.mask[i];
                            if(mask_i.sign != "-"){
                                continue;
                            }

                            BFSTraversal2(nodemask.terminal.terminal.wireOutCollector, mask_i.root);

                        }

                    }

                }
                //EB

                for(let i=0;i<nodemask.terminal.terminal.wireOutEmiter.mask.length;i++){

                    let mask_i = nodemask.terminal.terminal.wireOutEmiter.mask[i];

                    let masksClosed = [];

                    for(let j=0;j<mask_i.childs.length;j++){
                        if(mask_i.childs[j].terminal == nodemask.terminal.terminal.wireOutBase){
                            DFSClearNodeMask(mask_i.childs[j]);
                            masksClosed.push(mask_i.childs[j]);
                        }
                    }

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<mask_i.childs.length;k++){
                            if(masksClosed[j]==mask_i.childs[k]){
                                idx = k;
                            }
                        }
                        if(idx != -1){
                            mask_i.childs.splice(idx,1);
                        }

                    }
                }

            }

        }

        if(nodemask.terminal.terminal instanceof NPNElement && nodemask.terminal.terminal.wireOutEmiter == nodemask.terminal){


            let cntEmiterMinus = 0;

            for(let i =0; i<nodemask.terminal.mask.length;i++){
                if(nodemask.terminal.mask[i].sign == "-"){
                    cntEmiterMinus++;
                }
            }

            if(cntEmiterMinus == 0){

                //BE

                for(let i=0;i<nodemask.terminal.terminal.wireOutBase.mask.length;i++){

                    let mask_i = nodemask.terminal.terminal.wireOutBase.mask[i];

                    let masksClosed = [];

                    for(let j=0;j<mask_i.childs.length;j++){

                        if(mask_i.childs[j].terminal == nodemask.terminal.terminal.wireOutEmiter){
                            DFSClearNodeMask(mask_i.childs[j]);
                            masksClosed.push(mask_i.childs[j]);
                        }
                    }

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<mask_i.childs.length;k++){
                            if(masksClosed[j]==mask_i.childs[k]){
                                idx = k;
                            }
                        }
                        if(idx!=-1){
                            mask_i.childs.splice(idx,1);
                        }

                    }

                }

                //CE

                for(let i=0;i<nodemask.terminal.terminal.wireOutCollector.mask.length;i++){

                    let mask_i = nodemask.terminal.terminal.wireOutCollector.mask[i];

                    let masksClosed = [];

                    for(let j=0;mask_i.childs.length;j++){

                        if(mask_i.childs[j].terminal == nodemask.terminal.terminal.wireOutEmiter){
                            DFSClearNodeMask(mask_i.childs[j]);
                            masksClosed.push(mask_i.childs[j]);
                        }
                    }

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<mask_i.childs.length;k++){
                            if(masksClosed[j]==mask_i.childs[k]){
                                idx = k;
                            }
                        }
                        if(idx!=-1){
                            mask_i.childs.splice(idx,1);
                        }

                    }

                }

            }


        }

    }

    if(nodemask.sign == "+" || nodemask.sign == "P"){

        if(nodemask.terminal.terminal instanceof PNPElement && nodemask.terminal.terminal.wireOutEmiter == nodemask.terminal){

            let EB = false;

            for(let i=0;i<nodemask.terminal.mask.length;i++){

                if(nodemask.terminal.mask[i].sign == "+" || nodemask.terminal.mask[i].sign == "P"){
                    EB = true;
                    break;
                }
            }

            if(EB==false){

                //CE

                for(let i=0;i<nodemask.terminal.terminal.wireOutCollector.mask.length;i++){

                    let mask_i = nodemask.terminal.terminal.wireOutCollector.mask[i];

                    let masksClosed = [];

                    for(let j=0;j<mask_i.childs.length;j++){
                        if(mask_i.childs[j].terminal == nodemask.terminal.terminal.wireOutEmiter){
                            DFSClearNodeMask(mask_i.childs[j]);
                            masksClosed.push(mask_i.childs[j]);
                        }
                    }

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<mask_i.childs.length;k++){
                            if(masksClosed[j]==mask_i.childs[k]){
                                idx = k;
                            }
                        }
                        if(idx != -1){
                            mask_i.childs.splice(idx,1);
                        }

                    }
                }

                // BE

                for(let i=0;i<nodemask.terminal.terminal.wireOutBase.mask.length;i++){

                    let mask_i = nodemask.terminal.terminal.wireOutBase.mask[i];

                    let masksClosed = [];

                    for(let j=0;j<mask_i.childs.length;j++){
                        if(mask_i.childs[j].terminal == nodemask.terminal.terminal.wireOutEmiter){
                            DFSClearNodeMask(mask_i.childs[j]);
                            masksClosed.push(mask_i.childs[j]);
                        }
                    }

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<mask_i.childs.length;k++){
                            if(masksClosed[j]==mask_i.childs[k]){
                                idx = k;
                            }
                        }
                        if(idx != -1){
                            mask_i.childs.splice(idx,1);
                        }

                    }


                }

            }

        }

        if(nodemask.terminal.terminal instanceof NPNElement && nodemask.terminal.terminal.wireOutBase == nodemask.terminal){

            let cntBasePlus = 0;
            for(let i=0;i<nodemask.terminal.mask.length;i++){
                if(nodemask.terminal.mask[i].sign == "P" || nodemask.terminal.mask[i].sign == "+"){
                    cntBasePlus++;
                }
            }

            if(cntBasePlus==0){

                //EB
                for(let i=0;i<nodemask.terminal.terminal.wireOutEmiter.mask.length;i++){

                    let mask_i = nodemask.terminal.terminal.wireOutEmiter.mask[i];

                    let masksClosed = [];

                    for(let j=0;j<mask_i.childs.length;j++){

                        if(mask_i.childs[j].terminal == nodemask.terminal.terminal.wireOutBase){
                            DFSClearNodeMask(mask_i.childs[j]);
                            masksClosed.push(mask_i.childs[j]);
                        }
                    }

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<mask_i.childs.length;k++){
                            if(masksClosed[j]==mask_i.childs[k]){
                                idx = k;
                            }
                        }
                        if(idx!=-1){
                            mask_i.childs.splice(idx,1);
                        }

                    }
                }

                //EC
                for(let i=0;i<nodemask.terminal.terminal.wireOutEmiter.mask.length;i++){

                    let mask_i = nodemask.terminal.terminal.wireOutEmiter.mask[i];

                    let masksClosed = [];

                    for(let j=0;j<mask_i.childs.length;j++){

                        if(mask_i.childs[j].terminal == nodemask.terminal.terminal.wireOutCollector){
                            DFSClearNodeMask(mask_i.childs[j]);
                            masksClosed.push(mask_i.childs[j]);
                        }
                    }

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<mask_i.childs.length;k++){
                            if(masksClosed[j]==mask_i.childs[k]){
                                idx = k;
                            }
                        }
                        if(idx!=-1){
                            mask_i.childs.splice(idx,1);
                        }

                    }
                }

                //CE
                for(let i=0;i<nodemask.terminal.terminal.wireOutCollector.mask.length;i++){

                    let mask_i = nodemask.terminal.terminal.wireOutCollector.mask[i];

                    let masksClosed = [];

                    for(let j=0;mask_i.childs.length;j++){

                        if(mask_i.childs[j].terminal == nodemask.terminal.terminal.wireOutEmiter){
                            DFSClearNodeMask(mask_i.childs[j]);
                            masksClosed.push(mask_i.childs[j]);
                        }
                    }

                    for(let j=0;j<masksClosed.length;j++){

                        let idx = -1;

                        for(let k=0;k<mask_i.childs.length;k++){
                            if(masksClosed[j]==mask_i.childs[k]){
                                idx = k;
                            }
                        }
                        if(idx!=-1){
                            mask_i.childs.splice(idx,1);
                        }

                    }
                }

            }

        }

    }
}

function VisitMark(){

}

function BFSTraversal3(wire,root){

    // if resistor has child cut it from tree

    let i=0;
    let que = [];

    let visitmark = new VisitMark();

    que.push(wire);
    wire.visitmark = visitmark;

    while(i<que.length){

        for(let j=0;j<que[i].wiresOut.length;j++){

            if(que[i].wiresOut[j].visitmark == visitmark){
                continue;
            }

            que.push(que[i].wiresOut[j]);
            que[i].wiresOut[j].visitmark = visitmark;

        }

        if(que[i].terminal != null){

            if(que[i].terminal instanceof SWITCHElement){

                if(que[i].terminal.closed==true){

                    if(que[i] == que[i].terminal.wireOutA){

                        if(que[i].terminal.wireOutB.visitmark != visitmark){

                            que.push(que[i].terminal.wireOutB);
                            que[i].terminal.wireOutB.visitmark = visitmark;

                        }

                    }
                    if(que[i] == que[i].terminal.wireOutB){

                        if(que[i].terminal.wireOutA.visitmark != visitmark){

                            que.push(que[i].terminal.wireOutA);
                            que[i].terminal.wireOutA.visitmark = visitmark;

                        }

                    }

                }

            }

            if(que[i].terminal instanceof RESISTORElement){

                let wireVis = null;

                if(que[i].terminal.wireOutA == que[i]){
                    wireVis = que[i].terminal.wireOutB;
                }
                if(que[i].terminal.wireOutB == que[i]){
                    wireVis = que[i].terminal.wireOutA;
                }

                let maskFrom = null;

                for(let j=0;j<que[i].mask.length;j++){

                    if(que[i].mask[j].root == root){
                        maskFrom = que[i].mask[j];
                    }
                }

                let childFound = false;
                let childMask = null;

                for(let j=0;j<wireVis.mask.length;j++){
                    if(wireVis.mask[j].parent == maskFrom){
                        childFound = true;
                        childMask = wireVis.mask[j]
                    }
                }

                if(childFound == true){

                    DFSClearNodeMask(childMask);

                    let idx = 0;

                    for(let j=0;j<maskFrom.childs.length;j++){
                        if(maskFrom.childs[j] == childMask){
                            idx = j;
                        }
                    }

                    maskFrom.childs.splice(idx,1);
                }

            }
        }


        i++;
    }

}


function BFSTraversal2(wire, root){

    let i =0;
    let que = [];

    let visitmark = new VisitMark();
    que.push(wire);

    wire.visitmark = visitmark;

    while(i<que.length){

        for(let j=0;j<que[i].wiresOut.length;j++){

            if(que[i].wiresOut[j].visitmark == visitmark){
                continue;
            }

            que.push(que[i].wiresOut[j]);
            que[i].wiresOut[j].visitmark = visitmark;
        }

        if(que[i].terminal != null){

            if(que[i].terminal instanceof SWITCHElement){

                if(que[i].terminal.closed == true){

                    if(que[i].terminal.wireOutA == que[i]){
                        
                        if(que[i].terminal.wireOutB.visitmark != visitmark){

                            que.push(que[i].terminal.wireOutB);
                            que[i].terminal.wireOutB.visitmark = visitmark;

                        }

                    }

                    if(que[i].terminal.wireOutB == que[i]){

                        if(que[i].terminal.wireOutA.visitmark != visitmark){

                            que.push(que[i].terminal.wireOutA);
                            que[i].terminal.wireOutA.visitmark = visitmark;

                        }

                    }

                }

            }

            if(que[i].terminal instanceof RESISTORElement){
                
                if(que[i].terminal.wireOutA == que[i]){

                    console.log("Open resistor");

                    let visited = false;

                    for(let j=0;j<que[i].terminal.wireOutB.mask.length;j++){

                        if(que[i].terminal.wireOutB.mask[j].root == root){
                            visited = true;
                        }

                    }

                    if(visited==false && que[i].terminal.wireOutB.visitmark != visitmark ){
                        
                        let maskroot = BFSTraversal(root, que[i].terminal.wireOutB, "-");
                        
                        let maskBeforeResistor = null;

                        for(let j=0;j<que[i].terminal.wireOutA.mask.length;j++){

                            if(que[i].terminal.wireOutA.mask[j].root == root){
                                maskBeforeResistor = que[i].terminal.wireOutA.mask[j];
                            }

                        }

                        maskBeforeResistor.childs.push(maskroot);
                        maskroot.parent = maskBeforeResistor;

                        que[i].terminal.wireOutB.visitmark = visitmark;
                    }

                }
                if(que[i].terminal.wireOutB == que[i]){

                    console.log("Open resistor");

                    let visited = false;

                    for(let j=0;j<que[i].terminal.wireOutA.mask.length;j++){

                        if(que[i].terminal.wireOutA.mask[j].root == root){
                            visited = true;
                        }

                    }

                    if(visited==false && que[i].terminal.wireOutA.visitmark != visitmark ){
                        
                        let maskroot = BFSTraversal(root, que[i].terminal.wireOutA, "-");
  
                        let maskBeforeResistor = null;

                        for(let j=0;j<que[i].terminal.wireOutB.mask.length;j++){

                            if(que[i].terminal.wireOutB.mask[j].root == root){
                                maskBeforeResistor = que[i].terminal.wireOutB.mask[j];
                            }

                        }

                        maskBeforeResistor.childs.push(maskroot);
                        maskroot.parent = maskBeforeResistor;

                        que[i].terminal.wireOutA.visitmark = visitmark;
                    }

                }

            }

        }

        i++;
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

            let visited = false;

            for(let k=0;k<que[i].wiresOut[j].mask.length;k++){
                if(que[i].wiresOut[j].mask[k].root == root){
                    visited = true;
                }
            }

            if(visited == true){
                continue;
            }
            

            //utwórz węzeł
            let masknodechild = new MaskNode(root, maskque[i].sign, que[i].wiresOut[j], maskque[i]);

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

                        let visited = false;

                        for(let k=0;k<que[i].terminal.wireOutB.mask.length;k++){
                            if(que[i].terminal.wireOutB.mask[k].root == root){
                                visited = true;
                            }
                        }

                        if(visited==false){
                            que[i].terminal.wireOutB.visited = true;
                            que.push(que[i].terminal.wireOutB);

                            let masknodechild = new MaskNode(root, maskque[i].sign, que[i].terminal.wireOutB, maskque[i]);
                            maskque.push(masknodechild);

                            maskque[i].childs.push(masknodechild);

                            que[i].terminal.wireOutB.mask.push(masknodechild);


                        }
                    }
                    if(que[i].terminal.wireOutB == que[i]){

                        let visited = false;

                        for(let k=0;k<que[i].terminal.wireOutA.mask.length;k++){
                            if(que[i].terminal.wireOutA.mask[k].root == root){
                                visited = true;
                            }
                        }

                        if(visited==false){
                            que[i].terminal.wireOutA.visited = true;
                            que.push(que[i].terminal.wireOutA);

                            let masknodechild = new MaskNode(root, maskque[i].sign, que[i].terminal.wireOutA, maskque[i]);
                            maskque.push(masknodechild);

                            maskque[i].childs.push(masknodechild);

                            que[i].terminal.wireOutA.mask.push(masknodechild);

                        }

                    }

                }

            }

            if(que[i].terminal instanceof RESISTORElement && sign=="-"){

                if(que[i].terminal.wireOutA == que[i]){

                    let visited = false;

                    for(let k=0;k<que[i].terminal.wireOutB.mask.length;k++){
                        if(que[i].terminal.wireOutB.mask[k].root == root){
                            visited = true;
                        }
                    }

                    if(visited == false){

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

                    let visited = false;

                    for(let k=0;k<que[i].terminal.wireOutA.mask.length;k++){
                        if(que[i].terminal.wireOutA.mask[k].root == root){
                            visited = true;
                        }
                    }

                    if(visited==false){

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

            if(que[i].terminal instanceof RESISTORElement && sign=="+"){

                let nextWire = que[i] == que[i].terminal.wireOutA ? que[i].terminal.wireOutB : que[i].terminal.wireOutA;

                let visited = false;

                for(let k=0;k<nextWire.mask.length;k++){
                    if(nextWire.mask[k].root == root){
                        visited = true;
                    }
                }

                if(visited == false){

                    que.push(nextWire);

                    let masknodechild = new MaskNode(root, "P", nextWire, maskque[i]);
                    maskque.push(masknodechild);

                    maskque[i].childs.push(masknodechild);
                    nextWire.mask.push(masknodechild);
                    
                }


            }

            if(que[i].terminal instanceof PNPElement){

                if(maskque[i].sign == "+" || maskque[i].sign == "P"){

                    if(que[i].terminal.wireOutBase == que[i]){

                    }

                    if(que[i].terminal.wireOutEmiter == que[i]){

                        console.log("TAK 2");

                        let baseAtCathode = false;

                        for(let j=0;j<que[i].terminal.wireOutBase.mask.length;j++){

                            if(que[i].terminal.wireOutBase.mask[j].sign == "P" || que[i].terminal.wireOutBase.mask[j].sign == "+"){
                                continue;
                            }

                            baseAtCathode = true;

                            let bmask = que[i].terminal.wireOutBase.mask[j];

                            let maskAtEmiter = false;

                            for(let k=0;k<bmask.childs.length;k++){

                                if(bmask.childs[k].terminal == que[i].terminal.wireOutEmiter){
                                    maskAtEmiter = true;
                                    break;
                                }
                            }

                            console.log("maskAtBase2 " + maskAtEmiter);

                            if(maskAtEmiter==false){
                                //BE
                                let ch = BFSTraversal(bmask.root, que[i].terminal.wireOutEmiter, "-");

                                bmask.childs.push(ch);
                                ch.parent = bmask;
                            }

                        }

                        if(baseAtCathode == true){

                            //CE

                            for(let j=0;j<que[i].terminal.wireOutCollector.mask.length;j++){

                                if(que[i].terminal.wireOutCollector.mask[j].sign == "P" || que[i].terminal.wireOutCollector.mask[j].sign == "+" ){
                                    continue;
                                }

                                let cmask = que[i].terminal.wireOutCollector.mask[j];

                                let CE = false;

                                for(let k=0;k<cmask.childs.length;k++){

                                    if(cmask.childs[k].terminal == que[i].terminal.wireOutEmiter){
                                        CE = true;
                                    }

                                }

                                if(CE==false){

                                    let ch = BFSTraversal(cmask.root, que[i].terminal.wireOutEmiter, cmask.sign);
                                    
                                    cmask.childs.push(ch);
                                    ch.parent = cmask;
                                    

                                }

                            }

                            //EB

                            let masknodechild = new MaskNode(maskque[i].root, maskque[i].sign, que[i].terminal.wireOutBase, maskque[i] );
                            que[i].terminal.wireOutBase.mask.push(masknodechild);

                            maskque.push(masknodechild);
                            que.push(que[i].terminal.wireOutBase);

                            maskque[i].childs.push(masknodechild);

                            //EC

                            masknodechild = new MaskNode(maskque[i].root, maskque[i].sign, que[i].terminal.wireOutCollector, maskque[i]);
                            que[i].terminal.wireOutCollector.mask.push(masknodechild);

                            maskque.push(masknodechild);
                            que.push(que[i].terminal.wireOutCollector);

                            maskque[i].childs.push(masknodechild);

                        }


                    }

                    if(que[i].terminal.wireOutCollector == que[i]){

                    }

                }

                if(maskque[i].sign == "-"){

                    if(que[i] == que[i].terminal.wireOutBase){

                        console.log("TAK 1");

                        let emiterAtAnode = false;

                        for(let j=0;j<que[i].terminal.wireOutEmiter.mask.length;j++){

                            if(que[i].terminal.wireOutEmiter.mask[j].sign == "-"){
                                continue;
                            }
                            emiterAtAnode = true;

                            let emask = que[i].terminal.wireOutEmiter.mask[j];

                            let maskAtBase = false;

                            for(let k=0;k<emask.childs.length;k++){

                                if(emask.childs[k].terminal == que[i].terminal.wireOutBase){
                                    maskAtBase = true;
                                    break;
                                }
                            }

                            console.log("maskAtBase1 " + maskAtBase);

                            if(maskAtBase == false){
                                //EB
                                let ch = BFSTraversal(emask.root, que[i].terminal.wireOutBase, emask.sign);

                                emask.childs.push(ch);
                                ch.parent = emask;

                            }

                        }

                        if(emiterAtAnode==true){

                            // CE
                            for(let j=0;j<que[i].terminal.wireOutCollector.mask.length;j++){

                                if(que[i].terminal.wireOutCollector.mask[j].sign == "P" || que[i].terminal.wireOutCollector.mask[j].sign == "+" ){
                                    continue;
                                }

                                let cmask = que[i].terminal.wireOutCollector.mask[j];

                                let CE = false;

                                for(let k=0;k<cmask.childs.length;k++){

                                    if(cmask.childs[k].terminal == que[i].terminal.wireOutEmiter){
                                        CE = true;
                                    }

                                }

                                if(CE==false){

                                    let ch = BFSTraversal(cmask.root, que[i].terminal.wireOutEmiter, cmask.sign);
                                    cmask.childs.push(ch);
                                    ch.parent = cmask;
                                    

                                }

                            }

                            // EC

                            for(let j=0;j<que[i].terminal.wireOutEmiter.mask.length;j++){

                                if(que[i].terminal.wireOutEmiter.mask[j] == "-"){
                                    continue;
                                }

                                let emask = que[i].terminal.wireOutEmiter.mask[j];

                                let EC = false;

                                for(let k=0;k<emask.childs.length;k++){
                                    if(emask.childs[k].terminal == que[i].terminal.wireOutCollector){
                                        EC=true;
                                    }
                                }

                                if(EC==false){

                                    let ch = BFSTraversal(emask.root, que[i].terminal.wireOutCollector, emask.sign);

                                    if(emask.sign=="+"){
                                        
                                        for(let k=0;k<que[i].terminal.wireOutCollector.mask.length;k++){
                                            if(que[i].terminal.wireOutCollector.mask[k].sign=="-"){

                                                BFSTraversal3(que[i].terminal.wireOutCollector,que[i].terminal.wireOutCollector.mask[k].root);

                                            }
                                        }

                                    }

                                    emask.childs.push(ch);
                                    ch.parent = emask;
                                }

                            }

                            //BE
                            let masknodechild = new MaskNode(maskque[i].root, maskque[i].sign, que[i].terminal.wireOutEmiter, maskque[i] );
                            que[i].terminal.wireOutEmiter.mask.push(masknodechild);

                            maskque.push(masknodechild);
                            que.push(que[i].terminal.wireOutEmiter);

                            maskque[i].childs.push(masknodechild);

                        }
                    }

                }

            }

            if(que[i].terminal instanceof NPNElement){

                if(maskque[i].sign == "+" || maskque[i].sign == "P"){

                    if(que[i] == que[i].terminal.wireOutBase){

                        let emiterAtCathode = false;

                        for(let j=0;j<que[i].terminal.wireOutEmiter.mask.length;j++){

                            let emask = que[i].terminal.wireOutEmiter.mask[j];

                            if(emask.sign == "+" || emask.sign== "P" ){
                                continue;
                            }

                            emiterAtCathode = true;

                            let EB = false;
                            let EC = false;

                            for(let k=0;k<emask.childs.length;k++){

                                if(emask.childs[k].terminal == que[i].terminal.wireOutBase){
                                    EB = true;
                                }
                                if(emask.childs[k].terminal == que[i].terminal.wireOutCollector){
                                    EC = true;
                                }

                            }

                            if(EB == false){

                                let ch = BFSTraversal(emask.root, que[i].terminal.wireOutBase, emask.sign);

                                emask.childs.push(ch);
                                ch.parent = emask;

                            }

                            if(EC == false){

                                let ch = BFSTraversal(emask.root, que[i].terminal.wireOutCollector, emask.sign);
                                emask.childs.push(ch);
                                ch.parent = emask;

                            }

                        }

                        if(emiterAtCathode == true){

                            //BE
                            let masknodechild = new MaskNode(maskque[i].root, maskque[i].sign, que[i].terminal.wireOutEmiter, maskque[i]);
                            que[i].terminal.wireOutEmiter.mask.push(masknodechild);

                            maskque.push(masknodechild);
                            que.push(que[i].terminal.wireOutEmiter);

                            maskque[i].childs.push(masknodechild);

                            //CE

                            for(let j=0;j<que[i].terminal.wireOutCollector.mask;j++){

                                let cmask = que[i].terminal.wireOutCollector.mask[j];

                                if(cmask.sign == "-"){
                                    continue;
                                }

                                let CE = false;

                                for(let k=0;k<cmask.childs.length;k++){

                                    if(cmask.childs[k].terminal == que[i].terminal.wireOutEmiter){
                                        CE = true;
                                    }

                                }

                                if(CE == false){

                                    let ch = BFSTraversal(cmask.root, que[i].terminal.wireOutEmiter, cmask.sign);
                                    cmask.childs.push(ch);
                                    ch.parent = cmask;

                                }


                            }
                            

                        }

                    }

                }

                if(maskque[i].sign == "-"){

                    if(que[i] == que[i].terminal.wireOutEmiter){

                        let baseAtAnode = false;

                        for(let j=0;j<que[i].terminal.wireOutBase.mask.length;j++){

                            let bmask = que[i].terminal.wireOutBase.mask[j];

                            if(bmask.sign == "-"){
                                continue;
                            }

                            baseAtAnode = true;

                            let BE = false;

                            for(let k=0;k<bmask.childs.length;k++){
                                if(bmask.childs[k].terminal == que[i].terminal.wireOutEmiter){
                                    BE = true;
                                }
                            }

                            if(BE==false){
                                
                                let ch = BFSTraversal(bmask.root, que[i].terminal.wireOutEmiter, bmask.sign);
                                bmask.childs.push(ch);
                                ch.parent = bmask;

                            }

                        }

                        if(baseAtAnode == true){

                            //EB

                            let masknodechild = new MaskNode(maskque[i].root, maskque[i].sign, que[i].terminal.wireOutBase, maskque[i]);
                            que[i].terminal.wireOutBase.mask.push(masknodechild);

                            maskque.push(masknodechild);
                            que.push(que[i].terminal.wireOutBase);

                            maskque[i].childs.push(masknodechild);

                            //EC

                            masknodechild = new MaskNode(maskque[i].root, maskque[i].sign, que[i].terminal.wireOutCollector, maskque[i]);

                            console.log(masknodechild);

                            que[i].terminal.wireOutCollector.mask.push(masknodechild);

                            console.log(masknodechild);

                            maskque.push(masknodechild);
                            que.push(que[i].terminal.wireOutCollector);

                            maskque[i].childs.push(masknodechild);


                            //CE

                            for(let j=0;j<que[i].terminal.wireOutCollector.mask.length;j++){

                                let cmask = que[i].terminal.wireOutCollector.mask[j];

                                console.log(cmask);
                                if(cmask == undefined){
                                    console.log(que[i].terminal.wireOutCollector.mask)
                                    console.log("MASKA BLAD MASKI");
                                }

                                if(cmask.sign == "-"){
                                    continue;
                                }

                                let CE = false;

                                for(let k=0;k<cmask.childs.length;k++){

                                    if(cmask.childs[k].termianl == que[i].terminal.wireOutEmiter){
                                        CE = true;
                                    }
                                }

                                if(CE == false){

                                    let ch = BFSTraversal(cmask.root, que[i].terminal.wireOutEmiter, cmask.sign);
                                    cmask.childs.push(ch);
                                    ch.parent = cmask;
                                }

                            }

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
            ctx.arc(this.ptstart.x, this.ptstart.y, zoom*4, 0, 2*Math.PI);
            ctx.fill();
        }

        if(this.ptendaligned==true){
            ctx.beginPath();
            ctx.arc(this.ptend.x, this.ptend.y, zoom*4, 0, 2*Math.PI);
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
            if(this.mask[i].sign=="+" || this.mask[i].sign=="P"){
                plus=true;
            }
        }

        if(this.selected==true){

            ctx.strokeStyle = "lime";

        }
        else{

            if(minus == true){
                ctx.strokeStyle = "blue";
            }
            else if(plus == true){
                ctx.strokeStyle = "red";
            }
            else{
                ctx.strokeStyle = "black";
            }

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

    this.wireOutBase = null;
    this.wireOutEmiter = null;
    this.wireOutCollector = null;

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

    this.wireOutBase = null;
    this.wireOutEmiter = null;
    this.wireOutCollector = null;

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
let selectedElements = [];

function exportCircuit(){

    let exportObj = {
        npn: [],
        pnp: [],
        cathodes: [],
        anodes: [],
        resistors: [],
        wires: [],
        switches: [],

    }

    for(let i=0;i<elements.length;i++){
        elements[i].EXPORT_ID = i;
    }

    for(let i=0;i<elements.length;i++){

        if(elements[i] instanceof NPNElement){
            exportObj.npn.push({
                export_id: elements[i].EXPORT_ID,
                ptcenter: {
                    x: elements[i].ptcenter.x,
                    y: elements[i].ptcenter.y
                },
                wireOutBase: elements[i].wireOutBase.EXPORT_ID,
                wireOutEmiter: elements[i].wireOutEmiter.EXPORT_ID,
                wireOutCollector: elements[i].wireOutCollector.EXPORT_ID,
                mirrorH: elements[i].mirrorH,
                mirrorV: elements[i].mirrorV
            })
        }
        if(elements[i] instanceof PNPElement){
            exportObj.pnp.push({
                export_id: elements[i].EXPORT_ID,
                ptcenter: {
                    x: elements[i].ptcenter.x,
                    y: elements[i].ptcenter.y
                },
                wireOutBase: elements[i].wireOutBase.EXPORT_ID,
                wireOutEmiter: elements[i].wireOutEmiter.EXPORT_ID,
                wireOutCollector: elements[i].wireOutCollector.EXPORT_ID,
                mirrorH: elements[i].mirrorH,
                mirrorV: elements[i].mirrorV         
            })
        }
        if(elements[i] instanceof CATHODEElement){
            exportObj.cathodes.push({
                export_id: elements[i].EXPORT_ID,
                ptcenter: {
                    x: elements[i].ptcenter.x,
                    y: elements[i].ptcenter.y
                },
                wireOut: elements[i].wireOut.EXPORT_ID,
                mirrorH: elements[i].mirrorH,
                mirrorV: elements[i].mirrorV
            })
        }
        if(elements[i] instanceof ANODEElement){
            exportObj.anodes.push({
                export_id: elements[i].EXPORT_ID,
                ptcenter: {
                    x: elements[i].ptcenter.x,
                    y: elements[i].ptcenter.y
                },
                wireOut: elements[i].wireOut.EXPORT_ID,
                mirrorH: elements[i].mirrorH,
                mirrorV: elements[i].mirrorV
            })
        }
        if(elements[i] instanceof RESISTORElement){
            exportObj.resistors.push({
                export_id: elements[i].EXPORT_ID,
                ptcenter: {
                    x: elements[i].ptcenter.x,
                    y: elements[i].ptcenter.y
                },
                wireOutA: elements[i].wireOutA.EXPORT_ID,
                wireOutB: elements[i].wireOutB.EXPORT_ID,
                mirrorH: elements[i].mirrorH,
                mirrorV: elements[i].mirrorV
            })
        }
        if(elements[i] instanceof Wire){
            exportObj.wires.push({
                export_id: elements[i].EXPORT_ID,
                ptstart: {
                    x: elements[i].ptstart.x,
                    y: elements[i].ptstart.y
                },
                ptend: {
                    x: elements[i].ptend.x,
                    y: elements[i].ptend.y
                },
                ptstartaligned: elements[i].ptstartaligned,
                ptendaligned: elements[i].ptendaligned,
                wiresOut: elements[i].wiresOut.map((el_)=>{
                    return el_.EXPORT_ID
                }),
                terminal: ((elements[i].terminal != null) ? elements[i].terminal.EXPORT_ID : null)
            })
        }
        if(elements[i] instanceof SWITCHElement){
            exportObj.switches.push({
                export_id: elements[i].EXPORT_ID,
                ptcenter: {
                    x: elements[i].ptcenter.x,
                    y: elements[i].ptcenter.y
                },
                wireOutA: elements[i].wireOutA.EXPORT_ID,
                wireOutB: elements[i].wireOutB.EXPORT_ID,
                mirrorH: elements[i].mirrorH,
                mirrorV: elements[i].mirrorV
            })
        }
    }

    let fields = {
        exportObj,
        zoom: zoom
    }

    return fields;
}

function importCircuit(imported_){

    elements = [];

    console.log(imported_);

    let imported = imported_.exportObj != null ? imported_.exportObj : imported_;
    zoom = imported_.zoom != null ? imported_.zoom : 1;

    for(let i=0;i<imported.npn.length;i++){
        
        let el = new NPNElement();
        setupAlignmentNode(el);

        el.ptcenter.x = imported.npn[i].ptcenter.x;
        el.ptcenter.y = imported.npn[i].ptcenter.y;

        el.mirrorH = imported.npn[i].mirrorH;
        el.mirrorV = imported.npn[i].mirrorV;

        el.EXPORT_ID = imported.npn[i].export_id;

        elements.push(el);

        imported.npn[i].ref_el = el;

    }
    for(let i=0;i<imported.pnp.length;i++){

        let el = new PNPElement();
        setupAlignmentNode(el);

        el.ptcenter.x = imported.pnp[i].ptcenter.x;
        el.ptcenter.y = imported.pnp[i].ptcenter.y;

        el.mirrorH = imported.pnp[i].mirrorH;
        el.mirrorV = imported.pnp[i].mirrorV;

        el.EXPORT_ID = imported.pnp[i].export_id;

        elements.push(el);

        imported.pnp[i].ref_el = el;

    }
    for(let i=0;i<imported.cathodes.length;i++){

        let el = new CATHODEElement();
        setupAlignmentNode(el);

        el.ptcenter.x = imported.cathodes[i].ptcenter.x;
        el.ptcenter.y = imported.cathodes[i].ptcenter.y;

        el.mirrorH = imported.cathodes[i].mirrorH;
        el.mirrorV = imported.cathodes[i].mirrorV;

        el.EXPORT_ID = imported.cathodes[i].export_id;

        elements.push(el);

        imported.cathodes[i].ref_el = el;

    }
    for(let i=0;i<imported.anodes.length;i++){

        let el = new ANODEElement();
        setupAlignmentNode(el);

        el.ptcenter.x = imported.anodes[i].ptcenter.x;
        el.ptcenter.y = imported.anodes[i].ptcenter.y;

        el.mirrorH = imported.anodes[i].mirrorH;
        el.mirrorV = imported.anodes[i].mirrorV;

        el.EXPORT_ID = imported.anodes[i].export_id;

        elements.push(el);

        imported.anodes[i].ref_el = el;

    }
    for(let i=0;i<imported.resistors.length;i++){

        let el = new RESISTORElement();
        setupAlignmentNode(el);

        el.ptcenter.x = imported.resistors[i].ptcenter.x;
        el.ptcenter.y = imported.resistors[i].ptcenter.y;

        el.mirrorH = imported.resistors[i].mirrorH;
        el.mirrorV = imported.resistors[i].mirrorV;

        el.EXPORT_ID = imported.resistors[i].export_id;

        elements.push(el);

        imported.resistors[i].ref_el = el;

    }
    for(let i=0;i<imported.wires.length;i++){

        let el = new Wire({x: 0, y: 0}, {x: 0, y: 0});
        el.ptstart.x = imported.wires[i].ptstart.x;
        el.ptstart.y = imported.wires[i].ptstart.y;

        el.ptend.x = imported.wires[i].ptend.x;
        el.ptend.y = imported.wires[i].ptend.y;

        el.ptstartaligned = imported.wires[i].ptstartaligned;
        el.ptendaligned = imported.wires[i].ptendaligned;

        el.EXPORT_ID = imported.wires[i].export_id;

        elements.push(el);

        imported.wires[i].ref_el = el;

    }
    for(let i=0;i<imported.switches.length;i++){

        let el = new SWITCHElement();
        setupAlignmentNode(el);

        el.ptcenter.x = imported.switches[i].ptcenter.x;
        el.ptcenter.y = imported.switches[i].ptcenter.y;

        el.mirrorH = imported.switches[i].mirrorH;
        el.mirrorV = imported.switches[i].mirrorV;

        el.EXPORT_ID = imported.switches[i].export_id;

        elements.push(el);

        imported.switches[i].ref_el = el;

    }


    for(let i=0;i<imported.npn.length;i++){

        // zaimportowane obiekty
        let ref_el = imported.npn[i].ref_el; // instancja NPN

        for(let j=0;j<elements.length;j++){

            if(elements[j].EXPORT_ID == imported.npn[i].wireOutBase){
                ref_el.wireOutBase = elements[j];
            }
            if(elements[j].EXPORT_ID == imported.npn[i].wireOutEmiter){
                ref_el.wireOutEmiter = elements[j];
            }
            if(elements[j].EXPORT_ID == imported.npn[i].wireOutCollector){
                ref_el.wireOutCollector = elements[j];
            }

        }
    }

    for(let i=0;i<imported.pnp.length;i++){

        // zaimportowane obiekty
        let ref_el = imported.pnp[i].ref_el; // instancja NPN

        for(let j=0;j<elements.length;j++){

            if(elements[j].EXPORT_ID == imported.pnp[i].wireOutBase){
                ref_el.wireOutBase = elements[j];
            }
            if(elements[j].EXPORT_ID == imported.pnp[i].wireOutEmiter){
                ref_el.wireOutEmiter = elements[j];
            }
            if(elements[j].EXPORT_ID == imported.pnp[i].wireOutCollector){
                ref_el.wireOutCollector = elements[j];
            }

        }
    }

    for(let i=0;i<imported.cathodes.length;i++){

        // zaimportowane obiekty
        let ref_el = imported.cathodes[i].ref_el; // instancja CATHODEElement

        for(let j=0;j<elements.length;j++){

            if(elements[j].EXPORT_ID == imported.cathodes[i].wireOut){
                ref_el.wireOut = elements[j];
            }

        }
    }
    
    for(let i=0;i<imported.anodes.length;i++){

        // zaimportowane obiekty
        let ref_el = imported.anodes[i].ref_el; // instancja

        for(let j=0;j<elements.length;j++){

            if(elements[j].EXPORT_ID == imported.anodes[i].wireOut){
                ref_el.wireOut = elements[j];
            }

        }
    }
    
    for(let i=0;i<imported.resistors.length;i++){

        // zaimportowane obiekty
        let ref_el = imported.resistors[i].ref_el; // instancja

        for(let j=0;j<elements.length;j++){

            if(elements[j].EXPORT_ID == imported.resistors[i].wireOutA){
                ref_el.wireOutA = elements[j];
            }
            if(elements[j].EXPORT_ID == imported.resistors[i].wireOutB){
                ref_el.wireOutB = elements[j];
            }

        }
    }
    
    for(let i=0;i<imported.wires.length;i++){

        let ref_el = imported.wires[i].ref_el; // wire instancje

        console.log(imported.wires[i]);

        for(let j=0;j<imported.wires[i].wiresOut.length;j++){
            for(let k=0;k<elements.length;k++){

                if(elements[k].EXPORT_ID == imported.wires[i].wiresOut[j]){
                    ref_el.wiresOut.push(elements[k]);
                }
            }
        }

        for(let j=0;j<elements.length;j++){
            if(elements[j].EXPORT_ID == imported.wires[i].terminal){
                ref_el.terminal = elements[j]
            }
        }
    }

    for(let i=0;i<imported.switches.length;i++){

        let ref_el = imported.switches[i].ref_el;

        for(let j=0;j<elements.length;j++){

            if(elements[j].EXPORT_ID == imported.switches[i].wireOutA){
                ref_el.wireOutA = elements[j];
            }
            if(elements[j].EXPORT_ID == imported.switches[i].wireOutB){
                ref_el.wireOutB = elements[j];
            }

        }

    }
}

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
    setupAlignmentNode(currentElement);

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

document.getElementById("export").addEventListener("click", ()=>{

    console.log("EXPORT");
    let obj = exportCircuit();

    console.log(obj);

    download(JSON.stringify(obj), "circuit", "json");

    //importCircuit(obj);

})

document.getElementById("select").addEventListener("click", ()=>{

    currentElement = "selecting";
    selectingnow = false;

})
document.getElementById("exitselect").addEventListener("click", ()=>{

    currentElement = null;
    selectingnow = false;

})

document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);

canvas.addEventListener("mousemove", (ev)=>{

    ctx.beginPath();
    ctx.clearRect(0,0,1500,1300);
    ctx.stroke();

    if(currentElement!=null && currentElement!="selecting"){

        if(currentElement instanceof Wire){

            if(currentElement.ptstart!=null){

                //moving with ptstart 

                if(currentElement.ptstartaligned == true){
                    ctx.beginPath();
                    ctx.arc(currentElement.ptstart.x, currentElement.ptstart.y, zoom*4, 0, 2*Math.PI);
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
                        ctx.arc(ALIGNED_X,currentElement.ptstart.y,zoom*4,0,Math.PI*2);
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
                        ctx.arc(currentElement.ptstart.x,ALIGNED_Y,zoom*4,0,Math.PI*2);
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
                ctx.arc(ALIGNED_X, ALIGNED_Y, zoom*4, 0, 2*Math.PI);
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

            if(ev.ctrlKey == true && elementCtrled != null){
                minDiffElement = elementCtrled;
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
    
    if(mousedown==true && currentElement!="selecting"){

        for(let i=0;i<elements.length;i++){

            if(elements[i] instanceof Wire){

                elements[i].ptstart.x = elements[i].ptstart.x + ev.offsetX-transhandlex;
                elements[i].ptstart.y = elements[i].ptstart.y + ev.offsetY-transhandley;

                elements[i].ptend.x = elements[i].ptend.x + ev.offsetX-transhandlex;
                elements[i].ptend.y = elements[i].ptend.y + ev.offsetY-transhandley;



            }

            else{

                elements[i].ptcenter.x = elements[i].ptcenter.x + ev.offsetX-transhandlex;
                elements[i].ptcenter.y = elements[i].ptcenter.y + ev.offsetY-transhandley;


            }



        }


        transhandlex += ev.offsetX-transhandlex;
        transhandley += ev.offsetY-transhandley;


    }

    if(ev.ctrlKey == false && currentElement == "selecting" && selectingnow == true){

        ctx.beginPath();

        ctx.moveTo(selectingx,selectingy);
        ctx.lineTo(ev.offsetX,selectingy);
        ctx.lineTo(ev.offsetX,ev.offsetY);
        ctx.lineTo(selectingx, ev.offsetY);
        ctx.lineTo(selectingx, selectingy);
        ctx.stroke();

        for(let i=0;i<elements.length;i++){

            if(elements[i] instanceof Wire){

                let ptstartIN = false;
                let ptendIN = false;

                if((elements[i].ptstart.x > Math.min(selectingx,ev.offsetX) && elements[i].ptstart.x<Math.max(selectingx,ev.offsetX))
                     && (  elements[i].ptstart.y > Math.min(selectingy,ev.offsetY) && elements[i].ptstart.y < Math.max(selectingy,ev.offsetY) ) )
                {
                    ptstartIN = true;
                }
                if((elements[i].ptend.x > Math.min(selectingx,ev.offsetX) && elements[i].ptend.x<Math.max(selectingx,ev.offsetX))
                     && (  elements[i].ptend.y > Math.min(selectingy,ev.offsetY) && elements[i].ptend.y < Math.max(selectingy,ev.offsetY) ) )
                {
                    ptendIN = true;
                }

                if(ptstartIN == true && ptendIN == true){
                    elements[i].selected = true;
                }
                else{
                    elements[i].selected = false;
                }
            }
            else{

                if((elements[i].ptcenter.x > Math.min(selectingx,ev.offsetX) && elements[i].ptcenter.x<Math.max(selectingx,ev.offsetX))
                     && (  elements[i].ptcenter.y > Math.min(selectingy,ev.offsetY) && elements[i].ptcenter.y < Math.max(selectingy,ev.offsetY) ) )
                {
                    elements[i].selected = true;
                }
                else{
                    elements[i].selected = false;
                }
            }
        }


    }

    if( mousedown==true && ev.ctrlKey == true && currentElement == "selecting" ){

        for(let i=0;i<elements.length;i++){

            if(elements[i].selected == false){
                continue;
            }

            if(elements[i] instanceof Wire){

                elements[i].ptstart.x = elements[i].ptstart.x + ev.offsetX-transhandlex;
                elements[i].ptstart.y = elements[i].ptstart.y + ev.offsetY-transhandley;

                elements[i].ptend.x = elements[i].ptend.x + ev.offsetX-transhandlex;
                elements[i].ptend.y = elements[i].ptend.y + ev.offsetY-transhandley;



            }

            else{

                elements[i].ptcenter.x = elements[i].ptcenter.x + ev.offsetX-transhandlex;
                elements[i].ptcenter.y = elements[i].ptcenter.y + ev.offsetY-transhandley;


            }



        }

        transhandlex += ev.offsetX-transhandlex;
        transhandley += ev.offsetY-transhandley;
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

    if(currentElement!=null && currentElement != "selecting"){

        let elementReady = true;

        if(currentElement instanceof NPNElement){

            let vecbase = {
                w: zoom*(currentElement.ptTerminalBase.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalBase.y - currentElement.centery)
            };

            let vecemiter = {
                w: zoom*(currentElement.ptTerminalEmiter.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalEmiter.y - currentElement.centery)
            }

            let veccollector = {
                w: zoom*(currentElement.ptTerminalCollector.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalCollector.y - currentElement.centery)
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

            let vecbaseptend = 20;
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

            let vecemiterptend = 20;
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


            let veccollectorptend = 20;
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

            wireBase.terminal = currentElement;
            wireEmiter.terminal = currentElement;
            wireCollector.terminal = currentElement;

            currentElement.wireOutBase = wireBase;
            currentElement.wireOutEmiter = wireEmiter;
            currentElement.wireOutCollector = wireCollector;
            
            elements.push(wireBase);
            elements.push(wireEmiter);
            elements.push(wireCollector);

        }

        if(currentElement instanceof PNPElement){

            let vecbase = {
                w: zoom*(currentElement.ptTerminalBase.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalBase.y - currentElement.centery)
            };

            let vecemiter = {
                w: zoom*(currentElement.ptTerminalEmiter.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalEmiter.y - currentElement.centery)
            }

            let veccollector = {
                w: zoom*(currentElement.ptTerminalCollector.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalCollector.y - currentElement.centery)
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

            let vecbaseptend = 20;
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

            let vecemiterptend = 20;
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


            let veccollectorptend = 20;
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

            wireBase.terminal = currentElement;
            wireEmiter.terminal = currentElement;
            wireCollector.terminal = currentElement;

            currentElement.wireOutBase = wireBase;
            currentElement.wireOutEmiter = wireEmiter;
            currentElement.wireOutCollector = wireCollector;

            elements.push(wireBase);
            elements.push(wireEmiter);
            elements.push(wireCollector);

        }

        if(currentElement instanceof CATHODEElement){

            let veccathode = {
                w: zoom*(currentElement.ptTerminalCathode.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalCathode.y - currentElement.centery)
            };

            if(currentElement.mirrorH == true){
                veccathode.w = -veccathode.w;
            }
            if(currentElement.mirrorV == true){
                veccathode.h = -veccathode.h;
            }

            let veccathodeptend = 20;
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
                w: zoom*(currentElement.ptTerminalAnode.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalAnode.y - currentElement.centery)
            };

            if(currentElement.mirrorH == true){
                vecanode.w = -vecanode.w;
            }
            if(currentElement.mirrorV == true){
                vecanode.h = -vecanode.h;
            }

            let vecanodeptend = -20;
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
                w: zoom*(currentElement.ptTerminalA.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalA.y - currentElement.centery)
            }

            let vecresistorB = {
                w: zoom*(currentElement.ptTerminalB.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalB.y - currentElement.centery)
            }

            if(currentElement.mirrorH==true){
                vecresistorA.w = -vecresistorA.w;
                vecresistorB.w = -vecresistorB.w;
            }

            if(currentElement.mirrorV==true){
                vecresistorA.h = -vecresistorA.h;
                vecresistorB.h = -vecresistorB.h;
            }

            let vecterminalAptend = 20;
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


            let vecterminalBptend = 20;
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
                w: zoom*(currentElement.ptTerminalA.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalA.y - currentElement.centery)
            }
            let vecterminalB = {
                w: zoom*(currentElement.ptTerminalB.x - currentElement.centerx),
                h: zoom*(currentElement.ptTerminalB.y - currentElement.centery)
            }

            if(currentElement.mirrorH==true){
                vecterminalA.w = -vecterminalA.w;
                vecterminalB.w = -vecterminalB.w;
            }
            if(currentElement.mirrorV==true){
                vecterminalA.h = -vecterminalA.h;
                vecterminalB.h = -vecterminalB.h;
            }

            let wireVec = 20;
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

            wireVec = 20;
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

                            for(let j=0;j<elements[i].wireOutA.mask.length;j++){

                                if(elements[i].wireOutA.mask[j].sign == "-"){

                                    console.log("GOGOGO");

                                    BFSTraversal2(elements[i].wireOutA,elements[i].wireOutA.mask[j].root);

                                }

                            }

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

                        if(cntAnodeAttached == 0){

                            for(let j=0;j<elements[i].wireOutB.mask.length;j++){

                                if(elements[i].wireOutB.mask[j].sign == "-"){

                                    console.log("GOGOGO");
                                    // szukaj węzła i włącz rezystory
                                    BFSTraversal2(elements[i].wireOutB,elements[i].wireOutB.mask[j].root);

                                }

                            }

                        }

                    }



                }

                if(elements[i].closed==true){

                    let cntAnodeAttachedA_prev = 0;
                    let cntAnodeAttachedB_prev = 0;
                    let cntAnodeAttachedA = 0;
                    let cntAnodeAttachedB = 0;

                    for(let j=0;j<elements[i].wireOutA.mask.length;j++){
                        if(elements[i].wireOutA.mask[j].sign=="+"){
                            cntAnodeAttachedA_prev++;
                        }
                    }

                    for(let j=0;j<elements[i].wireOutB.mask.length;j++){
                        if(elements[i].wireOutB.mask[j].sign=="+"){
                            cntAnodeAttachedB_prev++;
                        }
                    }

                    let idx_toB = elements[i].wireOutB.mask.length;

                    for(let j=0;j<elements[i].wireOutA.mask.length;j++){

                        let Broot = BFSTraversal(elements[i].wireOutA.mask[j].root, elements[i].wireOutB, elements[i].wireOutA.mask[j].sign );                    

                        elements[i].wireOutA.mask[j].childs.push(Broot);
                        Broot.parent = elements[i].wireOutA.mask[j];
                    }

                    for(let j=0;j<idx_toB;j++){

                        let Aroot = BFSTraversal(elements[i].wireOutB.mask[j].root, elements[i].wireOutA, elements[i].wireOutB.mask[j].sign);
                        elements[i].wireOutB.mask[j].childs.push(Aroot);
                        Aroot.parent = elements[i].wireOutB.mask[j];
                    }



                    for(let j=0;j<elements[i].wireOutA.mask.length;j++){
                        if(elements[i].wireOutA.mask[j].sign=="+"){
                            cntAnodeAttachedA++;
                        }
                    }

                    for(let j=0;j<elements[i].wireOutB.mask.length;j++){
                        if(elements[i].wireOutB.mask[j].sign=="+"){
                            cntAnodeAttachedB++;
                        }
                    }

                    if(cntAnodeAttachedA_prev==0 && cntAnodeAttachedA>0){
                        console.log("Anodes attached to: " + cntAnodeAttachedA);

                        for(let j=0;j<elements[i].wireOutA.mask.length;j++){

                            BFSTraversal3(elements[i].wireOutA,elements[i].wireOutA.mask[j].root)

                        }
                    }

                    if(cntAnodeAttachedB_prev==0 && cntAnodeAttachedB>0){
                        console.log("Anodes attached to: " + cntAnodeAttachedB);

                        for(let j=0;j<elements[i].wireOutB.mask.length;j++){

                            BFSTraversal3(elements[i].wireOutB,elements[i].wireOutB.mask[j].root)

                        }
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

function translateElements(els){

    for(let i=0;i<els.length;i++){

        els[i].selected = true;

        if(els[i] instanceof Wire){

            els[i].ptstart.x += 100;
            els[i].ptstart.y += 100;
            els[i].ptend.x += 100;
            els[i].ptend.y += 100;

        }
        else{

            els[i].ptcenter.x += 100;
            els[i].ptcenter.y += 100;

        }

    }

}

function copyWires(wire, visitMark){

    if(wire.visitMark == visitMark){
        return [];
    }

    let que = [];
    let cpque = [];

    let i = 0;

    que.push(wire);
    wire.visitMark = visitMark;

    let cpwire = new Wire({x: 0, y: 0}, {x: 0, y: 0});
    cpwire.ptstart.x = que[i].ptstart.x;
    cpwire.ptstart.y = que[i].ptstart.y;
    cpwire.ptend.x = que[i].ptend.x;
    cpwire.ptend.y = que[i].ptend.y;
    cpwire.ptstartaligned = que[i].ptstartaligned;
    cpwire.ptendaligned = que[i].ptendaligned;

    cpque.push(cpwire);

    while(i<que.length){

        if(que[i].terminal != null && que[i].terminal.selected == true){

            cpque[i].terminal = que[i].terminal.copy_ref;

            if(que[i].terminal instanceof NPNElement){

                if(que[i].terminal.wireOutBase == que[i]){

                    que[i].terminal.copy_ref.wireOutBase = cpque[i];

                } 
                if(que[i].terminal.wireOutEmiter == que[i]){

                    que[i].terminal.copy_ref.wireOutEmiter = cpque[i];

                } 
                if(que[i].terminal.wireOutCollector == que[i]){

                    que[i].terminal.copy_ref.wireOutCollector = cpque[i];

                } 
            }

            if(que[i].terminal instanceof PNPElement){

                if(que[i].terminal.wireOutBase == que[i]){

                    que[i].terminal.copy_ref.wireOutBase = cpque[i];

                } 
                if(que[i].terminal.wireOutEmiter == que[i]){

                    que[i].terminal.copy_ref.wireOutEmiter = cpque[i];

                } 
                if(que[i].terminal.wireOutCollector == que[i]){

                    que[i].terminal.copy_ref.wireOutCollector = cpque[i];

                }
            }

            if(que[i].terminal instanceof CATHODEElement){

                que[i].terminal.copy_ref.wireOut = cpque[i];

            }

            if(que[i].terminal instanceof ANODEElement){

                que[i].terminal.copy_ref.wireOut = cpque[i];

            }

            if(que[i].terminal instanceof RESISTORElement){

                if(que[i].terminal.wireOutA == que[i]){

                    que[i].terminal.copy_ref.wireOutA = cpque[i];

                }
                if(que[i].terminal.wireOutB == que[i]){

                    que[i].terminal.copy_ref.wireOutB = cpque[i];

                }

            }

            if(que[i].terminal instanceof SWITCHElement){
                
                if(que[i].terminal.wireOutA == que[i]){

                    que[i].terminal.copy_ref.wireOutA = cpque[i];

                }
                if(que[i].terminal.wireOutB == que[i]){

                    que[i].terminal.copy_ref.wireOutB = cpque[i];

                }

            }

        }

        for(let j=0;j<que[i].wiresOut.length;j++){

            if(que[i].wiresOut[j].selected == false){
                continue;
            }

            if(que[i].wiresOut[j].visitMark == visitMark){
                continue;
            }

            que[i].wiresOut[j].visitMark = visitMark;

            cpwire = new Wire({x:0, y: 0}, {x: 0, y: 0});
            cpwire.ptstart.x = que[i].wiresOut[j].ptstart.x; 
            cpwire.ptstart.y = que[i].wiresOut[j].ptstart.y; 
            cpwire.ptend.x = que[i].wiresOut[j].ptend.x; 
            cpwire.ptend.y = que[i].wiresOut[j].ptend.y; 
            cpwire.ptstartaligned = que[i].ptstartaligned;
            cpwire.ptendaligned = que[i].ptendaligned;

            //do kopii rodzica dodaj odwiedzony kabel jako sąsiadujący
            cpque[i].wiresOut.push(cpwire);
            cpwire.wiresOut.push(cpque[i]);

            console.log(que[i].wiresOut[j]);

            que.push(que[i].wiresOut[j]);
            cpque.push(cpwire);

        }



        i++;
    }

    return cpque;

}

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
    if(ev.code == 'KeyD' && ev.ctrlKey == true && currentElement=="selecting"){

        let visitmark = new VisitMark();

        let leng = elements.length;

        for(let i=0;i<leng;i++){

            if(elements[i].selected == true){

                if(elements[i] instanceof NPNElement || elements[i] instanceof PNPElement || elements[i] instanceof CATHODEElement || elements[i] instanceof ANODEElement || elements[i] instanceof RESISTORElement || elements[i] instanceof SWITCHElement){

                    let copy = null;

                    if(elements[i] instanceof NPNElement){
                        copy = new NPNElement();
                        setupAlignmentNode(copy);
                    }
                    if(elements[i] instanceof PNPElement){
                        copy = new PNPElement();
                        setupAlignmentNode(copy);
                    }
                    if(elements[i] instanceof CATHODEElement){
                        copy = new CATHODEElement();
                        setupAlignmentNode(copy);
                    }
                    if(elements[i] instanceof ANODEElement){
                        copy = new ANODEElement();
                        setupAlignmentNode(copy);
                    }
                    if(elements[i] instanceof RESISTORElement){
                        copy = new RESISTORElement();
                        setupAlignmentNode(copy);
                    }
                    if(elements[i] instanceof SWITCHElement){
                        copy = new SWITCHElement();
                        setupAlignmentNode(copy);
                    }

                    copy.ptcenter.x = elements[i].ptcenter.x;
                    copy.ptcenter.y = elements[i].ptcenter.y;
                    copy.mirrorH = elements[i].mirrorH;
                    copy.mirrorV = elements[i].mirrorV;

                    elements[i].copy_ref = copy;

                    translateElements([copy]);
                    elements.push(copy);

                }
            }

        }

        for(let i=0;i<leng;i++){

            if(elements[i].selected == true){

                if(elements[i] instanceof Wire){

                    console.log("Copying wires");
                    let cpque = copyWires(elements[i], visitmark);

                    translateElements(cpque);

                    console.log(cpque);

                    for(let i=0;i<cpque.length;i++){

                        elements.push(cpque[i]);

                    }
                }
            }
        }

        for(let i=0;i<leng;i++){

            elements[i].selected = false;

        }

    }
    if(ev.code == 'KeyX' && currentElement=="selecting"){

        let deletedWires = [];
        rerender = true;

        for(let i=0;i<elements.length;i++){
            if(elements[i] instanceof Wire){

                if(elements[i].selected==false){
                    continue;
                }

                deletedWires.push(elements[i]);

                for(let j=0;j<elements[i].wiresOut.length;j++){

                    let adjancetWire = elements[i].wiresOut[j];

                    let wiresToDelete = [];

                    for(let k=0;k<adjancetWire.wiresOut.length;k++){

                        let wire_ = adjancetWire.wiresOut[k];

                        if(wire_ == elements[i]){
                            console.log("X");
                            wiresToDelete.push(wire_);
                        }
                    }

                    for(let k=0;k<wiresToDelete.length;k++){

                        let idx = -1;

                        for(let c=0;c<adjancetWire.wiresOut.length;c++){

                            if(adjancetWire.wiresOut[c]==wiresToDelete[k]){
                                idx = c;
                            }

                        }

                        if(idx!=-1){
                            adjancetWire.wiresOut.splice(idx,1);
                        }

                    }

                }

            }
        }

        for(let i=0;i<deletedWires.length;i++){

            let idx = -1;

            for(let j=0;j<elements.length;j++){

                if(deletedWires[i] == elements[j]){
                    deletedWires[i].deleting = true;
                    idx = j;
                }

            }
            if(idx != -1){
                elements.splice(idx, 1);
            }

        }

    }

    if(rerender == true){

        ctx.beginPath();

        ctx.clearRect(0,0,1500,1300)

        ctx.stroke();

        if(currentElement!=null && currentElement != "selecting"){
            currentElement.draw(currentElement.lastmove);
        }

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

canvas.addEventListener("mousewheel", (ev)=>{

    if(ev.wheelDelta>0){

        zoom*=1.1;

        for(let i=0;i<elements.length;i++){

            if(elements[i] instanceof Wire){

                elements[i].ptstart.x = ev.offsetX + 1.1*(elements[i].ptstart.x - ev.offsetX);
                elements[i].ptstart.y = ev.offsetY + 1.1*(elements[i].ptstart.y - ev.offsetY);

                elements[i].ptend.x = ev.offsetX + 1.1*(elements[i].ptend.x - ev.offsetX);
                elements[i].ptend.y = ev.offsetY + 1.1*(elements[i].ptend.y - ev.offsetY);

            }

            else{

                elements[i].ptcenter.x = ev.offsetX + 1.1*(elements[i].ptcenter.x - ev.offsetX);
                elements[i].ptcenter.y = ev.offsetY + 1.1*(elements[i].ptcenter.y - ev.offsetY);


            }

        }

    }
    if(ev.wheelDelta<0){

        zoom*=0.9;

        for(let i=0;i<elements.length;i++){

            if(elements[i] instanceof Wire){

                elements[i].ptstart.x = ev.offsetX + 0.9*(elements[i].ptstart.x - ev.offsetX);
                elements[i].ptstart.y = ev.offsetY + 0.9*(elements[i].ptstart.y - ev.offsetY);

                elements[i].ptend.x = ev.offsetX + 0.9*(elements[i].ptend.x - ev.offsetX);
                elements[i].ptend.y = ev.offsetY + 0.9*(elements[i].ptend.y - ev.offsetY);
            }
            else{

                elements[i].ptcenter.x = ev.offsetX + 0.9*(elements[i].ptcenter.x - ev.offsetX);
                elements[i].ptcenter.y = ev.offsetY + 0.9*(elements[i].ptcenter.y - ev.offsetY);


            }

        }
    }

        ctx.beginPath();

        ctx.clearRect(0,0,1500,1300)

        ctx.stroke();

        for(let i=0;i<elements.length;i++){
            if(elements[i] instanceof Wire){
                elements[i].draw();
            }
            else{
                elements[i].draw({x: elements[i].ptcenter.x, y: elements[i].ptcenter.y});
            }

        }
    ev.preventDefault();

})

canvas.addEventListener("mousedown", (ev)=>{

    transhandlex = ev.offsetX;
    transhandley = ev.offsetY;

    mousedown = true;

    if(ev.ctrlKey == false && currentElement=="selecting"){
        selectingnow = true;

        for(let i=0;i<elements.length;i++){
            elements[i].selected = false;
        }

        selectingx = ev.offsetX;
        selectingy = ev.offsetY;
    }

})

canvas.addEventListener("mouseup", (ev)=>{

    if(currentElement=="selecting"){
        selectingnow = false;

        for(let i=0;i<elements.length;i++){

            if(elements[i] instanceof Wire){

                let ptstartIN = false;
                let ptendIN = false;

                if((elements[i].ptstart.x > Math.min(selectingx,ev.offsetX) && elements[i].ptstart.x<Math.max(selectingx,ev.offsetX))
                     && (  elements[i].ptstart.y > Math.min(selectingy,ev.offsetY) && elements[i].ptstart.y < Math.max(selectingy,ev.offsetY) ) )
                {
                    ptstartIN = true;
                }
                if((elements[i].ptend.x > Math.min(selectingx,ev.offsetX) && elements[i].ptend.x<Math.max(selectingx,ev.offsetX))
                     && (  elements[i].ptend.y > Math.min(selectingy,ev.offsetY) && elements[i].ptend.y < Math.max(selectingy,ev.offsetY) ) )
                {
                    ptendIN = true;
                }

                if(ptstartIN == true && ptendIN == true){

                    elements[i].selected = true;

                }
            }
            else{

                if((elements[i].ptcenter.x > Math.min(selectingx,ev.offsetX) && elements[i].ptcenter.x<Math.max(selectingx,ev.offsetX))
                     && (  elements[i].ptcenter.y > Math.min(selectingy,ev.offsetY) && elements[i].ptcenter.y < Math.max(selectingy,ev.offsetY) ) )
                {
                    elements[i].selected = true;
                }
            }
        }

        ctx.beginPath();
        ctx.clearRect(0,0,1500,1300)
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

    mousedown = false;

})

