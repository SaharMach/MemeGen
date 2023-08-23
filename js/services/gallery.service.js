'use strict'




var gImgs = [
    {id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat']},
    {id: 2,url:'imgs/2.jpg',keywords:['dogs,cute']}
] 

function getImgs(){
    return gImgs
}

function findImg(id){
    var selectedImg = gImgs.find(img => img.id === id);
    // console.log('img:', img2)
    return selectedImg
}
