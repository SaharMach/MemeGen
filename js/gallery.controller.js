'use strict'


renderGallery()

function renderGallery(){
    const elCon = document.querySelector('.select-img-container')
    const imgs = getImgs()
    console.log(imgs);
    var strHTML = ``
    imgs.forEach(img => {
        strHTML += `<img data-set='${img.id}' src="imgs/${img.id}.jpg" onclick="onSelectImg(this)"/>`
    })
    elCon.innerHTML = strHTML
}


function onSelectImg(elImg) {
    console.log('elImg:', elImg)
    document.querySelector('.text-box').value = ''
    onOpenEditor()
    setImg(elImg)
}

function onOpenEditor(){
    document.querySelector('.editor-modal').classList.remove('hide')
    document.querySelector('.editor-container').classList.remove('hide')
}

function onCloseEditor(){
    document.querySelector('.editor-modal').classList.add('hide')
    document.querySelector('.editor-container').classList.add('hide')
}
