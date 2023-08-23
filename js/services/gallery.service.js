'use strict'




var gImgs = [
    {id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat']},
    {id: 2,url:'imgs/2.jpg',keywords:['dogs,cute']},
    {id: 3,url:'imgs/3.jpg',keywords:['dogs,cute']},
    {id: 4,url:'imgs/4.jpg',keywords:['dogs,cute']},
    {id: 5,url:'imgs/5.jpg',keywords:['dogs,cute']},
    {id: 6,url:'imgs/6.jpg',keywords:['dogs,cute']},
    {id: 7,url:'imgs/7.jpg',keywords:['dogs,cute']},
    {id: 8,url:'imgs/8.jpg',keywords:['dogs,cute']},
    {id: 9,url:'imgs/9.jpg',keywords:['dogs,cute']},
    {id: 10,url:'imgs/10.jpg',keywords:['dogs,cute']},
    {id: 11,url:'imgs/11.jpg',keywords:['dogs,cute']},
    {id: 12,url:'imgs/12.jpg',keywords:['dogs,cute']},
    {id: 13,url:'imgs/13.jpg',keywords:['dogs,cute']},
    {id: 14,url:'imgs/14.jpg',keywords:['dogs,cute']},
    {id: 15,url:'imgs/15.jpg',keywords:['dogs,cute']},
    {id: 16,url:'imgs/16.jpg',keywords:['dogs,cute']},
    {id: 17,url:'imgs/17.jpg',keywords:['dogs,cute']},
    {id: 18,url:'imgs/18.jpg',keywords:['dogs,cute']},

] 

function getImgs(){
    return gImgs
}

function findImg(id){
    var selectedImg = gImgs.find(img => img.id === id);
    // console.log('img:', img2)
    return selectedImg
}
