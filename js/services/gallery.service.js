'use strict'

var keywords = []
var gFilteredMemes =[]
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2, 'dog':3, 'trump':1}
var gImgs = [
    {id: 1, url: 'imgs/1.jpg', keywords: ['trump,funny']},
    {id: 2,url:'imgs/2.jpg',keywords:['dogs,cute']},
    {id: 3,url:'imgs/3.jpg',keywords:['baby,dog']},
    {id: 4,url:'imgs/4.jpg',keywords:['cat,sleep']},
    {id: 5,url:'imgs/5.jpg',keywords:['baby,funny']},
    {id: 6,url:'imgs/6.jpg',keywords:['weirdguy,funny']},
    {id: 7,url:'imgs/7.jpg',keywords:['baby,funny']},
    {id: 8,url:'imgs/8.jpg',keywords:['man,funny']},
    {id: 9,url:'imgs/9.jpg',keywords:['baby']},
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
    if (gKeywordSearchCountMap[val]) {
        gKeywordSearchCountMap[val]++;
        renderKeyWordsOnGallery()
    }
    console.log('gFilter:', gFilter)
    gFilteredMemes = gImgs.filter((img) =>{
        return img.keywords.some(keyword => 
            keyword.toUpperCase().includes(gFilter))
        })
    return gFilteredMemes
}


function getKeyWords(){
    gImgs.filter(img =>{
        keywords.push(img.keywords)
    })
    return keywords
}

function getKeyWordsMap(){
    const map = loadFromStorage('countMap')
    if (!map) return gKeywordSearchCountMap
    else return map
}

function keywordClicked(keyword){
    gKeywordSearchCountMap[keyword]++
    saveToStorage('countMap', gKeywordSearchCountMap)
}