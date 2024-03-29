'use strict'



let gElCanvas
let gCtx
let gToggle = false
let gCurrFont = 'IMPACT'
let gStartPos
let gEmojiIdx = 0;


const savedMemesURL = []
const savedMemesData = []
const STORAGE_KEY = 'savedMemesDB'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addMouseListeners()
    addTouchListeners()
    renderGallery()
    renderKeyWords()
    renderKeyWordsOnGallery()
    renderEmojis()
    renderMeme()
    renderSavedMemes()
}

function renderMeme(){
    const meme = getMeme()
    const selectedImg = findImg(meme.selectedImgId)
    const img = new Image()
    img.src = selectedImg.url   
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line,idx) => {
            gCtx.font = `${line.size}px ${gCurrFont}`
            gCtx.fillStyle = line.color
            gCtx.fillText(line.txt, line.x,line.y)
            if(gIsStroke && idx === meme.selectedLineIdx){
                const textWidth = gCtx.measureText(line.txt)
                gCtx.strokeStyle = 'white'
                gCtx.strokeRect(line.x,line.y - line.size, textWidth.width+2 , line.size+2)
            }
        });
    }
    gIsStroke = true
}

let gIsStroke = true

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


//not working!
function clearStroke(){
    gIsStroke = !gIsStroke
    renderMeme()
}

function downloadImg(elLink) {
    clearStroke()
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
    handleSelector('.editor-modal').classList.remove('hide')
    handleSelector('.editor-container').classList.remove('hide')
    handleSelector('.top-area input').classList.add('hide')
    handleSelector('.top-area .keywords').classList.add('hide')
}

function onCloseEditor(){
    handleSelector('.editor-modal').classList.add('hide')
    handleSelector('.editor-container').classList.add('hide')
    handleSelector('.select-img-container').classList.remove('hide')
    handleSelector('.saved-memes-container').classList.add('hide')
    handleSelector('.gallery-container').classList.remove('hide')
    handleSelector('.top-area input').classList.remove('hide')
    handleSelector('.top-area .keywords').classList.remove('hide')
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
    if (isLineClicked(pos)){
        setLineDrag(true) 
        gStartPos = pos
        document.body.style.cursor = 'grabbing'
    } 
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'auto'
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
      console.log('ev:', ev)
      ev = ev.changedTouches[0]
      // Calc the right pos according to the touch screen
      pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft - 20,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop - 100,
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
    console.log('imgData:', imgData)
    const drawnImg = getMeme()
    console.log('drawnImg:', drawnImg)
    savedMemesData.unshift(drawnImg)
    savedMemesURL.unshift(imgData)
    saveToStorage(STORAGE_KEY, savedMemesURL)
    saveToStorage('savedMemesDataDB', savedMemesData)
    renderSavedMemes()
}

function shareOnWhatsapp(){
    const imgData = gElCanvas.toDataURL()
    const elBtn = handleSelector('.whatsapp-btn')
    console.log('elBtn:', elBtn)
    // const strHTML = `href:whatsapp://send?text=${encodeURIComponent(imgData)}`
    // elBtn.innerHTML += strHTML
    elBtn.setAttribute('href', 'whatsapp://send?text='+encodeURIComponent(imgData))
}

function onOpenSavedMemes(){
    handleSelector('.select-img-container').classList.add('hide')
    handleSelector('.saved-memes-container').classList.remove('hide')
    handleSelector('.editor-modal').classList.add('hide')
    handleSelector('.gallery-container').classList.add('hide')
    handleSelector('.top-area input').classList.add('hide')
    handleSelector('.top-area .keywords').classList.add('hide')
    renderSavedMemes()
}

function renderEmojis(){
    const emojis = getEmojis()
    const elSlider = handleSelector('.emoji-list')
    let id = 0
    let strHTML = ``
    emojis.forEach(emoji => {
        strHTML += `<span id="${id++}" onclick="onAddEmoji(this)">${emoji}</span>`
    })
    elSlider.innerHTML = strHTML
}

function slide(direction) {
    const emojis = document.querySelectorAll('.emoji-list span');
    const visibleCount = 3;
    if (direction === 'left') {
        gEmojiIdx = Math.max(gEmojiIdx - 1, 0);
    } else if (direction === 'right') {
        gEmojiIdx = Math.min(gEmojiIdx + 1, emojis.length - visibleCount);
    }
    const offset = -gEmojiIdx * 40;
    handleSelector('.emoji-list').style.transform = `translateX(${offset}px)`;
}

function onAddEmoji(elEmoji){
    const emojiId = elEmoji.getAttribute('id')
    addEmoji(emojiId)
    renderMeme()
}

