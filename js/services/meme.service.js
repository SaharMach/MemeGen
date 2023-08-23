'use strict'


var gCurrColor
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
            y:50
        } ,
        {
            id:1,
            txt: 'FunnyText',
           size: 30,
            color: 'white',
            x:30,
            y:270
        }
    ]
}

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}


function getMeme(){
    return gMeme
}

function setLineText(val){
    const line = gMeme.lines[gCurrLine]
    console.log('gCurrLine:', line)
    line.txt = val
}

function setImg(img){
    console.log('img:', img.getAttribute('data-set'))
    const imgId = +img.getAttribute('data-set')
    gMeme.selectedImgId =  imgId
    console.log('gMeme:', gMeme)
    renderMeme()
}

function setColor(val){
    console.log('val:', val)
    gMeme.lines[gCurrLine].color = val
    console.log('gCurrColor:', gCurrColor)
}

function changeFontSize(val){
    gMeme.lines[gCurrLine].size +=val
}
// console.log('gCurrColor:', gCurrColor)


function toggleTextBox(){
    if(gMeme.selectedLineIdx >= gMeme.lines.length -1){
        gMeme.selectedLineIdx = 0
    }else{
        gMeme.selectedLineIdx++
    }
    // console.log('gMeme:', gMeme)
    gCurrLine = gMeme.lines.findIndex(line => {
        console.log('line:', line)
        return line.id === gMeme.selectedLineIdx
    })
    // return gCurrLine
}

function addLine(){
    console.log('hey');
    console.log('gMeme.lines.length:', gMeme.lines.length)
    if(gMeme.lines.length === 3) return
    const line =   {
            id:2,
            txt: 'FunnyText',
            size: 30,
            color: 'white',
            x:30,
            y:150
         }
    gMeme.lines.push(line)
    gCurrLine++
}