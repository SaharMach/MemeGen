'use strict'


renderGallery()

function renderGallery(){
    const elCon = document.querySelector('.select-img-container')
    const imgs = getImgs()
    console.log(imgs);
    var strHTML = `<h3 style="font-style: italic; font-size: 40px;">Gallery </h3>`
    imgs.forEach(img => {
        strHTML += `<img data-set='${img.id}' src="imgs/${img.id}.jpg" onclick="onSelectImg(this)"/>`
    })
    elCon.innerHTML = strHTML
}


function onSelectImg(elImg) {
    console.log('elImg:', elImg)
    document.querySelector('.text-box').value = ''
    document.querySelector('.select-img-container').classList.add('hide')
    onOpenEditor()
    setImg(elImg)
}


// function onGetRandomMeme(){
//     getRandomMeme()
// }
