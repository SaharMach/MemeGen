'use strict'


function renderSavedMemes(){
    const elCon = handleSelector('.saved-memes-container')
    const memes = loadFromStorage(STORAGE_KEY)
    console.log('memes:', memes)
    // console.log('memes:', ...memes)
    let strHTML = `<h3>Saved Memes</h3><section class="saved-imgs-container">`
    if(!memes.length) strHTML += `<span>No saved memes...</span>`
    for(let i = 0; i < memes.length; i++){
       strHTML += `<section class="saved-img">
       <img id="${i}" src="${memes[i]}" onclick="onSelectSavedMeme(this)">
       <button onclick="onDeleteSavedMeme(${i})"><i class="fa-solid fa-trash"></i></button>
       </section>`
    }
    strHTML += `</section>`
    elCon.innerHTML = strHTML
}

function onDeleteSavedMeme(val){
    console.log('val:', val)
    deleteSavedMeme(val)
    renderSavedMemes()
}

function onSelectSavedMeme(elImg){

    
    // console.log('imgId:', imgId)

        const imgId = +elImg.getAttribute('id');
        const savedMemes = loadFromStorage(STORAGE_KEY);
        const savedMemesData = loadFromStorage('savedMemesDataDB');
        
        const currMemeData = savedMemesData[imgId];
        console.log('currMemeData:', currMemeData.lines)
        // setMemeState(currMemeData.lines);
    
        const img = new Image();
        img.src = savedMemes[imgId];
    
        img.onload = function() {
            // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
            gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        };
        onOpenEditor()
    }

