'use strict'


renderGallery()
renderKeyWords()

function renderGallery(){
    const elCon = document.querySelector('.select-img-container')
    const imgs = getImgs()
    console.log(imgs);
    let strHTML = ``
    imgs.forEach(img => {
        strHTML += `
        <img data-set='${img.id}' src="imgs/${img.id}.jpg" onclick="onSelectImg(this)">`
    })
    elCon.innerHTML = strHTML
}


function onSelectImg(elImg) {
    console.log('elImg:', elImg)
    document.querySelector('.text-box').value = ''
    document.querySelector('.select-img-container').classList.add('hide')
    document.querySelector('.gallery-container .top-area').classList.add('hide')
    onOpenEditor()
    setImg(elImg)
}

function toggleToolBar(){
    document.body.classList.toggle('menu-open')
    document.querySelector('.links-layout').classList.toggle('hide')
}
// function onGetRandomMeme(){
//     getRandomMeme()
// }

function onSearchMeme(val){
    console.log('val:', val)
    searchMeme(val)
    renderGallery()
}

function renderKeyWords(){
    const keywords = getKeyWords()
    console.log('keywords:', keywords)
    const elList = document.getElementById('gallery-datalist')
    let strHTML = ``
    keywords.forEach(word => {
        strHTML +=  `<option value="${word}"></option>`
    })
    elList.innerHTML += strHTML
}