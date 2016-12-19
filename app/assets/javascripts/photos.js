var state = {
  photoId:     ''
, prevPhotoId: ''
, nextPhotoId: ''
}
var modal      = document.getElementById('modal')
var modalImage = document.getElementById('modal-photo')
var modalClose = document.getElementById('modal-close')
var photos     = document.getElementsByClassName('js-photo')
var numberOfPhotos = photos.length
  , i
  , currentPhoto




for (i = 0; i < numberOfPhotos; i++) {
  currentPhoto = photos[i]

  currentPhoto.onclick = displaySelfAsModal
}
modalClose.onclick = hideModal




function hideModal () {
  window.removeEventListener('keyup', handleKeyup)
  modal.style.display = 'none'
}

function displaySelfAsModal () {
  modal.style.display = 'block'

  modalImage.src = this.src
  modalImage.alt = this.alt

  state.photoId     = this.id
  state.prevPhotoId = this.dataset.previd
  state.nextPhotoId = this.dataset.nextid

  window.addEventListener('keyup', handleKeyup)
}

function handleKeyup (event) {
  if (event.defaultPrevented) return

  switch (event.key) {
    case 'ArrowRight':
      displayNextAsModal()
      break
    case 'ArrowLeft':
      displayPrevAsModal()
      break
    case 'Escape':
      hideModalAndScrollToPhoto()
      break
    default:
      return
  }
}

function displayNextAsModal () {
  var nextImage = document.getElementById(state.nextPhotoId)

  modalImage.src = nextImage.src
  modalImage.alt = nextImage.alt

  state.photoId     = nextImage.id
  state.prevPhotoId = nextImage.dataset.previd
  state.nextPhotoId = nextImage.dataset.nextid
}

function displayPrevAsModal () {
  var prevImage = document.getElementById(state.prevPhotoId)

  modalImage.src = prevImage.src
  modalImage.alt = prevImage.alt

  state.photoId     = prevImage.id
  state.prevPhotoId = prevImage.dataset.previd
  state.nextPhotoId = prevImage.dataset.nextid
}

function hideModalAndScrollToPhoto () {
  var photo = document.getElementById(state.photoId)

  window.scroll(0, scrollYPositionOf(photo))
  hideModal()
}

function scrollYPositionOf(el) {
  var accumulatedDistance = 0

  if (el.offsetParent) {
    do {
      accumulatedDistance += el.offsetTop
    } while (el = el.offsetParent)

    return accumulatedDistance
  }
}
