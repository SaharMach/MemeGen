'use strict'



let gElCanvas
let gCtx
let gToggle = false
let gCurrFont = 'IMPACT'
let gStartPos
let savedMemesArr =[]
const STORAGE_KEY = 'savedMemesDB'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    addMouseListeners()
    addTouchListeners()
    renderSavedMemes()
}

function renderMeme(){
    const meme = getMeme();
    // console.log('meme:', meme)
    // console.log('meme:', meme.selectedImgId)
    const selectedImg = findImg(meme.selectedImgId)
    // console.log('selectedImg:', selectedImg)
    const img = new Image();
    // console.log('img:', img)
    img.src = selectedImg.url;
    
    
    img.onload = () => {
     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
     meme.lines.forEach((line,idx) => {
        
        // console.log('gCtx:', gCtx)
         gCtx.font = `${line.size}px ${gCurrFont}`;
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
    console.log('elLink:', elLink)
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

function onClearInput(){
    document.querySelector('.text-box').value = ''
    document.querySelector('.font-input').value = ''
    document.querySelector('.font-select').value = 'IMPACT'
    document.querySelector('.color-btn').value = '#000000'
    clearInput()
    renderMeme()
}

function onSelectFontSize(val){
    selectFontSize(val)
    renderMeme()
}

function onChangeFontStyle(val){
    console.log('val:', val)
    gCurrFont = val
}

function onCenterLine(){
    centerLine()
    renderMeme()
}

function onAlignLeft(){
    alignLeft()
    renderMeme()
}

function onAlignRight(){
    alignRight()
    renderMeme()
}

function onDeleteLine(){
    deleteLine()
    renderMeme()
}

function onOpenEditor(){
    document.querySelector('.editor-modal').classList.remove('hide')
    document.querySelector('.editor-container').classList.remove('hide')
    document.querySelector('.gallery-container input').classList.add('hide')
}

function onCloseEditor(){
    document.querySelector('.editor-modal').classList.add('hide')
    document.querySelector('.editor-container').classList.add('hide')
    document.querySelector('.select-img-container').classList.remove('hide')
    document.querySelector('.saved-memes-container').classList.add('hide')
    document.querySelector('.gallery-container input').classList.remove('hide')
}

function onMoveLine(val){
    moveLine(val)
    renderMeme()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}
  
function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)     
    console.log('pos', pos)
    if (isLineClicked(pos)){
        setLineDrag(true) 
        gStartPos = pos
        document.body.style.cursor = 'grabbing'
    } 
}

function onUp() {
    console.log('onUp')
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}
function onMove(ev) {
        const isDrag = getCurrLine().isDrag   
        if (!isDrag) return
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        grabMoveLine(dx, dy)
        gStartPos = pos
        renderMeme()
}  

function getEvPos(ev) {
    let pos = {
      x: ev.offsetX,
      y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
      // Prevent triggering the mouse ev
      ev.preventDefault()
      // Gets the first touch point
      ev = ev.changedTouches[0]
      // Calc the right pos according to the touch screen
      pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
      }
    }
    return pos
  }

function gCtxMeasure(index){
    const meme = getMeme();
    const currLine = meme.lines[index]
     return gCtx.measureText(currLine.txt).width
}

function onSaveImg(){
    const imgData = gElCanvas.toDataURL()
    savedMemesArr.unshift(imgData)
    // console.log('imgData:', imgData)
    console.log('savedMemesArr:', savedMemesArr)
    saveToStorage(STORAGE_KEY, savedMemesArr)
    renderSavedMemes()
}


function onOpenSavedMemes(){
    document.querySelector('.select-img-container').classList.add('hide')
    document.querySelector('.saved-memes-container').classList.remove('hide')
    document.querySelector('.editor-modal').classList.add('hide')
    document.querySelector('.gallery-container .top-area').classList.add('hide')
    renderSavedMemes()
}