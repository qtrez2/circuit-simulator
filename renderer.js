
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
                console.log('Z');
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

function lookupPaths(root, id){

    let i = 0;
    let que = [];

    que.push(root);

    while(i<que.length){

        if(que[i].tagName=='g'){

            for(let k=0; k<que[i].attributes.length;k++){

                if(que[i].attributes[k].k == "id" && que[i].attributes[k].v == id){
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

function drawpoints(points){

    ctx.beginPath();

    for(let i=0;i<points.length;i++){

        for(let j=0;j<points[i].length;j++){

            if(j==0){
                ctx.moveTo(points[i][j].x, points[i][j].y);
            }
            else{
                ctx.lineTo(points[i][j].x, points[i][j].y);
            }

        }

    }

    ctx.stroke();

}

function drawcircle(cx,cy,r){

    ctx.beginPath();

    ctx.arc(cx, cy, r, 0, 2 * Math.PI);

    ctx.stroke();

}

function drawPaths(g){

    for(let i=0;i<g.childs.length;i++){

        if(g.childs[i].tagName=="path"){

            for(let j=0;j<g.childs[i].attributes.length;j++){

                if(g.childs[i].attributes[j].k == 'd'){

                    let points = parse_d(g.childs[i].attributes[j].v);
                    drawpoints(points);

                }

            }

        }

        if(g.childs[i].tagName == 'circle'){

            let cx,cy,r;

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

            }

            drawcircle(cx,cy,r);

        }

    }


}

fetch("rysunek.svg")
  .then((res) => res.text())
  .then((text) => {
    
    let curNode = parseXML(text);
    console.log(curNode);

    let n = lookupPaths(curNode, "paths");

    drawPaths(n);

    console.log(n);

   })
  .catch((e) => console.error(e))

document.getElementById("npn").addEventListener("click", ()=>{

    console.log("npn");

})