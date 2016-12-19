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
modalClose.onclick = dismissModal




// Navigating to subsequent photos in the modal doesn't update the scroll position of
// the window underneath the modal: instead, the window underneath stays
// blithely focused on the same photo the user was looking at when they first
// pulled up the modal view. Thus, before hiding the modal, we find the
// position of the final photo loaded into the modal and scroll the window to
// that position. That way, the user doesn't get "out of sync" with their
// mental position in the photo list.
function dismissModal () {
  var photo = document.getElementById(state.photoId)

  // scroll window to "focused" photo
  window.scroll(0, scrollYPositionOf(photo))

  // hide modal
  modal.style.display = 'none'

  // clean up all modal navigation handlers
  window.removeEventListener('keyup', handleKeyup)
  mc.off('swiperight', displayNextAsModal)
  mc.off('swipeleft', displayPrevAsModal)
}

// The entry point for the modal UI
function displaySelfAsModal () {
  setModalImageTo(this)

  // unveil modal
  modal.style.display = 'block'

  // set up navigation handlers
  window.addEventListener('keyup', handleKeyup)
  mc.on('swiperight', displayPrevAsModal)
  mc.on('swipeleft', displayNextAsModal)
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
      dismissModal()
      break
    default:
      return
  }
}

function displayNextAsModal () {
  var nextImage = document.getElementById(state.nextPhotoId)

  setModalImageTo(nextImage)
}

function displayPrevAsModal () {
  var prevImage = document.getElementById(state.prevPhotoId)

  setModalImageTo(prevImage)
}

function setModalImageTo (sourcePhoto) {
  modalImage.src = sourcePhoto.src
  modalImage.alt = sourcePhoto.alt

  state.photoId     = sourcePhoto.id
  state.prevPhotoId = sourcePhoto.dataset.previd
  state.nextPhotoId = sourcePhoto.dataset.nextid
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
