'use strict'




function renderGallery(){
    const elCon = handleSelector('.select-img-container')
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
    handleSelector('.text-box').value = ''
    handleSelector('.select-img-container').classList.add('hide')
    handleSelector('.gallery-container .top-area').classList.add('hide')
    onOpenEditor()
    setImg(elImg)
}

function toggleToolBar(){
    document.body.classList.toggle('menu-open')
    handleSelector('.links-layout').classList.toggle('hide')
}

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



function renderKeyWordsOnGallery(){
    const elSection = document.querySelector('.keywords')
    const keywordsMap = getKeyWordsMap()
    let strHTML = ``
    for(let keyword in keywordsMap){
        const fontSize = keywordsMap[keyword]
        const minSize = 10
        strHTML += `<span style="font-size:${minSize+fontSize}px; margin-left:20px;" 
        onclick="keywordClicked('${keyword}')">${keyword}</span>`
    }
    elSection.innerHTML = strHTML
}

function keywordClicked(keyword){
    gKeywordSearchCountMap[keyword]++;
    renderKeyWordsOnGallery();
}