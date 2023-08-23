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
    setImg(elImg)
}
