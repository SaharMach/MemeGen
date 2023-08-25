'use strict'


let gFilteredMemes =[]

var gImgs = [
    {id: 1, url: 'imgs/1.jpg', keywords: ['trump,funny']},
    {id: 2,url:'imgs/2.jpg',keywords:['dogs,cute']},
    {id: 3,url:'imgs/3.jpg',keywords:['baby,dog']},
    {id: 4,url:'imgs/4.jpg',keywords:['cat,sleep']},
    {id: 5,url:'imgs/5.jpg',keywords:['baby,funny']},
    {id: 6,url:'imgs/6.jpg',keywords:['weirdguy,funny']},
    {id: 7,url:'imgs/7.jpg',keywords:['baby,funny']},
    {id: 8,url:'imgs/8.jpg',keywords:['man,funny']},
    {id: 9,url:'imgs/9.jpg',keywords:['baby,laugh']},
    {id: 10,url:'imgs/10.jpg',keywords:['funny']},
    {id: 11,url:'imgs/11.jpg',keywords:['funny']},
    {id: 12,url:'imgs/12.jpg',keywords:['what would u do?']},
    {id: 13,url:'imgs/13.jpg',keywords:['cheers']},
    {id: 14,url:'imgs/14.jpg',keywords:['tough guy']},
    {id: 15,url:'imgs/15.jpg',keywords:['Stark']},
    {id: 16,url:'imgs/16.jpg',keywords:['professor x']},
    {id: 17,url:'imgs/17.jpg',keywords:['putin']},
    {id: 18,url:'imgs/18.jpg',keywords:['buzz, hoodie']},

] 

function getImgs(){
    if(!gFilteredMemes.length){
        return gImgs
    }else{
        return gFilteredMemes
    }
}

function findImg(id){
    var selectedImg = gImgs.find(img => img.id === id);
    // console.log('img:', img2)
    // console.log(selectedImg);
    return selectedImg
}

function getRandomMeme(){
    const randNum = getRandomIntInclusive(1,18)
    console.log('randNum:', randNum)
    findImg(randNum)
}

function searchMeme(val){
    let gFilter = val.toUpperCase()
    gFilteredMemes = gImgs.filter((img) =>{
        return img.keywords.some(keyword => 
            keyword.toUpperCase().includes(gFilter))
        })
    return gFilteredMemes
}

function getKeyWords(){
    let keywords = []
    gImgs.filter(img =>{
        keywords.push(img.keywords)
    })
    return keywords
}