'use strict'


var gCurrLine = 0
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            id: 0,
            txt: 'FunnyText', 
            size: 30,
            color: 'white',
            x:30,
            y:50,
            isDrag: false,
            isClicked: false
        } ,
        {
            id:1,
            txt: 'FunnyText',
            size: 30,
            color: 'white',
            x:30,
            y:320,
            isClicked:false,
            isDrag: false
        }
    ]
}

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

function getMeme(){
    return gMeme
}

function setLineText(val){
    const line = gMeme.lines[gCurrLine]
    // console.log('gCurrLine:', line)
    line.txt = val
}

function setImg(img){
    // console.log('img:', img.getAttribute('data-set'))
    const imgId = +img.getAttribute('data-set')
    // console.log('gMeme:', gMeme)
    resetMemeLines()
    gMeme.selectedImgId =  imgId
    renderMeme()
}

function resetMemeLines(){
    gMeme.lines.forEach(line => {
        line.txt = 'FunnyText';
        line.size = 30;
        line.color = 'white'
        line.x = 30
    });
}

function setColor(val){
    console.log('val:', val)
    gMeme.lines[gCurrLine].color = val
    // console.log('gCurrColor:', gCurrColor)
}

function changeFontSize(val){
    gMeme.lines[gCurrLine].size +=val
}

function toggleTextBox(){
    if(gMeme.selectedLineIdx >= gMeme.lines.length -1){
        gMeme.selectedLineIdx = 0
    }else{
        gMeme.selectedLineIdx++
    }
    gCurrLine = gMeme.lines.findIndex(line => {
        // console.log('line:', line)
        return line.id === gMeme.selectedLineIdx
    })
}

function addLine(){
    // console.log('hey');
    // console.log('gMeme.lines.length:', gMeme.lines.length)
    if(gMeme.lines.length === 3) return
    const line =   {
            id:2,
            txt: 'FunnyText',
            size: 30,
            color: 'white',
            x:30,
            y:175,
            isDrag: false,
            isClicked: false
         }
    gMeme.lines.push(line)
    gCurrLine++
}

function clearInput(){
    resetMemeLines()
    if(gMeme.lines.length === 3) {
        gMeme.lines.splice(2)
        console.log('3 lines!!!');
        }
}

function selectFontSize(val){
    gMeme.lines[gCurrLine].size = +val
}


function centerLine(){
    gMeme.lines[gCurrLine].x = 85
}

function alignLeft(){
    console.log('gMeme.lines[gCurrLine].x:', gMeme.lines[gCurrLine].x)
    gMeme.lines[gCurrLine].x = 30
    console.log('gMeme.lines[gCurrLine].x:', gMeme.lines[gCurrLine].x)
}

function alignRight(){
    gMeme.lines[gCurrLine].x = 140
}

function deleteLine(){
    if(!gMeme.lines[gCurrLine]) return
    gMeme.lines.splice(0,1)
}

function moveLine(val){
    console.log('val:', val)
    gMeme.lines[gCurrLine].y += val
}

function isLineClicked(clickedPos){
    const lineBorders = getLineBorders()
    console.log('lineBorders:', lineBorders)
    for(let i = 0; i < lineBorders.length; i++){
        const line = lineBorders[i]
        const textWidth = gCtxMeasure(i)
        const isInWidth = clickedPos.x >= line.x && clickedPos.x <= line.x + textWidth
        const isInHeight = clickedPos.y <= line.y + (0.2 * line.size) && clickedPos.y >= line.y - line.size
        if(isInWidth && isInHeight){
            gMeme.lines.forEach(line => line.isClicked = false); 
            gMeme.lines[i].isClicked = true;
            gCurrLine = i;
            gMeme.selectedLineIdx = i;
            return true;
        }
    }
    return false
}

function getLineBorders(){
    return gMeme.lines.map(line => ({
            x: line.x,
            y: line.y,
            size: line.size,
            txt: line.txt
    }))
}

function setLineDrag(isDrag) {
    gMeme.lines[gCurrLine].isDrag = isDrag
}

function getCurrLine(){
    return gMeme.lines[gCurrLine]
}

function grabMoveLine(dx,dy){
    gMeme.lines[gCurrLine].x += dx
    gMeme.lines[gCurrLine].y += dy
}