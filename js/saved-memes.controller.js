'use strict'


function renderSavedMemes(){
    const elCon = document.querySelector('.saved-memes-container')
    const memes = loadFromStorage(STORAGE_KEY)
    let strHTML = `<h3>Saved Memes</h3>`
    if(!memes.length) strHTML += `<span>No saved memes...</span>`
    for(let i = 0; i < memes.length; i++){
       strHTML += `<section class="saved-img">
       <img id="${i}" src="${memes[i]}" onclick="onSelectSavedMeme(this)">
       <button onclick="onDeleteSavedMeme(${i})"><i class="fa-solid fa-trash"></i></button>
       </section>`
    }
    // console.log('strHTML:', strHT ML)
    elCon.innerHTML = strHTML
}

function onDeleteSavedMeme(val){
    deleteSavedMeme(val)
    renderSavedMemes()
}

function onSelectSavedMeme(elImg){
    const imgId = +elImg.getAttribute('id')
    selectSavedMeme(imgId)
}
