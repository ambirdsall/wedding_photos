var photos         = document.getElementsByClassName('js-photo')
var numberOfPhotos = photos.length
  , i
  , currentPhoto

var state = {
  photoId:     ''
, prevPhotoId: ''
, nextPhotoId: ''
}
var modal            = document.getElementById('modal')
var modalImage       = document.getElementById('modal-photo')
var modalCloseBtn    = document.getElementById('modal-close')
var modalNextBtn     = document.getElementById('modal-next')
var modalPrevBtn     = document.getElementById('modal-previous')
var modalDownloadBtn = document.getElementById('modal-download')

var mc = new Hammer.Manager(modalImage, {
  recognizers: [
    [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
  ]
})




for (i = 0; i < numberOfPhotos; i++) {
  currentPhoto = photos[i]

  currentPhoto.onclick = displaySelfAsModal
}
modalCloseBtn.onclick = dismissModal
modalPrevBtn.onclick = displayPrevAsModal
modalNextBtn.onclick = displayNextAsModal
// modalDownloadBtn.onclick = downloadPhoto



function downloadPhoto () {
  modalDownloadBtn.click()
//   var photoId = state.photoId

//   return new Promise(function(resolve, reject) {
//     // Standard XHR to load an image
//     var request = new XMLHttpRequest()
//     request.open('GET', url)
//     request.responseType = 'blob'
//     // When the request loads, check whether it was successful
//     request.onload = function() {
//       if (request.status === 200) {
//         // If successful, resolve the promise by passing back the request response
//         resolve(request.response)
//       } else {
//         // If it fails, reject the promise with a error message
//         reject(Error('Image didn\'t load successfully; error code:' + request.statusText))
//       }
//     }
//     request.onerror = function() {
//       // Also deal with the case when the entire request fails to begin with
//       // This is probably a network error, so reject the promise with an appropriate message
//       reject(Error('There was a network error.'))
//     }
//     // Send the request
//     request.send()
//   })
}

// scrolls to last viewed image in gallery, removes handlers, hides modal
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

// set modal image, register handlers, display modal
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
    case 'Enter':
      if ( event.shiftKey ) downloadPhoto()
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

  modalDownloadBtn.href = sourcePhoto.src

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
;
