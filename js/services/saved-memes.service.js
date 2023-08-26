'use strict'


function deleteSavedMeme(val){
    const memes = loadFromStorage(STORAGE_KEY)
    console.log('memes:', memes)
    console.log('val:', val)
    // const memeToDelete = memes[val]
    memes.splice(val,1)
    saveToStorage(STORAGE_KEY, memes)
}

// function selectSavedMeme(id){
    
// }