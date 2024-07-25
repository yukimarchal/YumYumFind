const profileContainer = document.querySelector('.profile-container')
const images = document.querySelectorAll('.cube')

const prevButton = document.querySelector('.prev')
const playButton = document.querySelector('.play')
const nextButton = document.querySelector('.next')

let index = 2
let nbImages = images.length

function transformCounter(counter, maxValue) {
    let medianValue = Math.floor(maxValue / 2)
    const normalizedCounter = counter - medianValue
    return normalizedCounter * 20;
}

function updateSlider() {
    const offset = transformCounter(index, nbImages)
    profileContainer.style.transform = `translateX(${-offset}%)`

    for (let i = 0; i < index; i++) images[i].setAttribute("rotate", "40")
    images[index].setAttribute("rotate", "0")
    for (let i = index+1; i < nbImages; i++) images[i].setAttribute("rotate", "-40")
}

prevButton.addEventListener('click', () => {
    if (index > 0) index--
    updateSlider()
})

nextButton.addEventListener('click', () => {
    if (index < nbImages-1) index++
    updateSlider()
})

playButton.addEventListener('click', () => {
    window.location.href = images[index].getAttribute("link")
})

