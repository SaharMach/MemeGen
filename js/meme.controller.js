'use strict'



let gElCanvas
let gCtx
let gToggle = false


function onInit(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    renderMeme()
}


function renderMeme(){
    const meme = getMeme();
    console.log('meme:', meme)
    // console.log('meme:', meme.selectedImgId)
    const selectedImg = findImg(meme.selectedImgId)
    // console.log('selectedImg:', selectedImg)
    const img = new Image();
    console.log('img:', img)
    img.src = selectedImg.url;
 
    img.onload = () => {
     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
 
     
     meme.lines.forEach((line,idx) => {
        console.log('gCtx:', gCtx)
         gCtx.font = `${line.size}px IMPACT`;
         gCtx.fillStyle = line.color;
         gCtx.fillText(line.txt, line.x,line.y);

        //  console.log('line.txt:', line.txt.length)
         if(idx === meme.selectedLineIdx){
             const textWidth = gCtx.measureText(line.txt)
            gCtx.strokeStyle = 'white'
            gCtx.strokeRect(line.x,line.y - line.size, textWidth.width+2 , line.size+2)
            }
     });
    }
 }

function onUpdateText(val){
    setLineText(val)
    renderMeme()
 }

function onSetColor(val){
    setColor(val)
    renderMeme()
}

function onChangeFontSize(val){
    changeFontSize(val)
    renderMeme()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onToggleTextBox(){
    toggleTextBox()
    renderMeme()
}

function onAddLine(){
    addLine()
    renderMeme()
}