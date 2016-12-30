// {{{ UTILS / POLYFILLS
// {{{ DOM MANIPULATION
function removeElement (el) {//{{{
  el.parentNode.removeChild(el);
}//}}}
function scrollYPositionOf (el) {//{{{
  var accumulatedDistance = 0

  if (el.offsetParent) {
    do {
      accumulatedDistance += el.offsetTop
    } while (el = el.offsetParent)

    return accumulatedDistance
  }
}//}}}
function scrollTo (el) {//{{{
  window.scroll(0, scrollYPositionOf(el))
}//}}}
// }}}
// {{{ LANGUAGE
var slice = [].slice
function curry(fn) {//{{{
  var arity = fn.length

  return function f1() {
    var args = slice.call(arguments, 0)

    if (args.length >= arity) {
      return fn.apply(null, args)
    } else {
      return function f2() {
        var args2 = slice.call(arguments, 0)

        return f1.apply(null, args.concat(args2))
      }
    }
  }
}//}}}
//{{{  polyfill Object.keys
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}//}}}
// }}}
// }}}
// {{{ PHOTOS
var photos         = document.getElementsByClassName('js-photo')
var numberOfPhotos = photos.length
  , i
  , currentPhoto
// }}}
// {{{ STATE
var state = {
  photoId:           ''
, prevPhotoId:       ''
, nextPhotoId:       ''
, thumbnailSrc:      ''
, _selectedPhotoIds: {}
}

state.photoList = function photoList () {//{{{
  return Object.keys(this._selectedPhotoIds)
}//}}}
state.photoList.empty = function empty () {//{{{
  return state.photoList().length === 0
}//}}}
state.photoList.doesNotContain = function doesNotContain (id) {//{{{
  return !( id in state._selectedPhotoIds )
}//}}}
state.photoList.addId = function add (id) {//{{{
  state._selectedPhotoIds[id] = true

  return this
}//}}}
state.photoList.removeId = function removeId (id) {//{{{
  delete state._selectedPhotoIds[id]

  return this
}//}}}
// }}}
// {{{ UI
var UI = {
  modal: {//{{{
    el: document.getElementById('modal')
  , image:        document.getElementById('modal-photo')
  , closeBtn:     document.getElementById('modal-close')
  , nextBtn:      document.getElementById('modal-next')
  , prevBtn:      document.getElementById('modal-previous')
  , downloadBtn:  document.getElementById('modal-download')
  , selectionBtn: document.getElementById('modal-selection')
  , selectBtnHTML:   '<span class="glyphicon glyphicon-cloud-download m-h-half-em"></span>Select full-res copy for download <span class="keyboard-shortcut">[shift + enter]</span>'
  , deselectBtnHTML: '<span class="glyphicon glyphicon-ok selection-check m-h-half-em"></span>Undo selection <span class="keyboard-shortcut">[shift + enter]</span>'
  , hide: function () {//{{{
      this.el.style.display = 'none'
    }//}}}
  , reveal: function () {//{{{
      this.el.style.display = 'block'
    }//}}}
  , setImage: function (img) {//{{{
    this.image.src = img.src
    this.image.alt = img.alt

    this.downloadBtn.href = img.src
    this.setSelectionBtnFor(img)
    }//}}}
  , setSelectionBtnFor: function (photo) {//{{{
      if ( photo.dataset.selected ) {
        this.selectionBtn.innerHTML = this.deselectBtnHTML
      } else {
        this.selectionBtn.innerHTML = this.selectBtnHTML
      }
    }//}}}
  }//}}}
, thumbnailBar: {//{{{
    el: document.getElementById('selected-photos')
  , gallery: {//{{{
      el: document.getElementById('selected-photos__list')
    , add: function (el) {//{{{
        this.el.appendChild(el)
      }//}}}
    }//}}}
  , reveal: function () {//{{{
      this.el.style.display = 'flex'
    }//}}}
  , hide: function () {//{{{
      this.el.style.display = 'none'
    }//}}}
  }//}}}
, thumbnail: {//{{{
    overlayHTML: '<span class="selected-thumbnail__remove">&times;</span>'
  }//}}}
}
//}}}
var mc = new Hammer.Manager(UI.modal.image, {//{{{
  recognizers: [
    [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
  ]
})//}}}
// {{{ EVENT BINDING


for (i = 0; i < numberOfPhotos; i++) {
  currentPhoto = photos[i]

  currentPhoto.onclick = displaySelfAsModal
}
UI.modal.closeBtn.onclick     = dismissModal
UI.modal.prevBtn.onclick      = displayPrevAsModal
UI.modal.nextBtn.onclick      = displayNextAsModal
UI.modal.selectionBtn.onclick = togglePhotoSelectedness


//}}}
function handleKeyup (event) {//{{{
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
      // if ( event.altKey ) selectPhoto()
      if ( event.altKey ) togglePhotoSelectedness()
      break
    default:
      return
  }
}//}}}
function togglePhotoSelectedness () {//{{{
  var photo = document.getElementById(state.photoId)

  if ( photo.dataset.selected ) {
    deselectPhoto()
  } else {
    selectPhoto()
  }

  UI.modal.setSelectionBtnFor(photo)
}//}}}
function setModalSelectionBtnContentFor () {//{{{
}//}}}
function selectPhoto () {//{{{ // unless already done: display thumbnailBar, display thumbnail, add photoId to list
  // ensure bar is displayed
  UI.thumbnailBar.reveal()

  // no double selections, please
  if ( state.photoList.doesNotContain(state.photoId) ) {
    markPhotoAsSelectedById(state.photoId)
    addPhotoToThumbnailBar()
  }

  // ensure photoId is in state.photoList
  state.photoList.addId(state.photoId)
}//}}}
function deselectPhoto (event) {//{{{
  var thumbnail
  var id

  if ( event ) {
    thumbnail = event.currentTarget
    id        = thumbnail.dataset.photoId
  } else {
    id        = state.photoId
    thumbnail = document.getElementById('t' + id)
  }

  state.photoList.removeId(id)
  markPhotoAsUnselectedById(id)

  thumbnail && removeElement(thumbnail)

  if ( state.photoList.empty() ) UI.thumbnailBar.hide()
}//}}}
function markPhotoAsSelectedById (id) {//{{{
  var photo = document.getElementById(id)

  photo.dataset.selected = true
}//}}}
function markPhotoAsUnselectedById (id) {//{{{
  var photo = document.getElementById(id)

  return delete photo.dataset.selected
}//}}}
function addPhotoToThumbnailBar () {//{{{
  // create elements
  var newThumbnailWrapper = document.createElement('div')
  var newThumbnailImage = document.createElement('img')
  var newThumbnailOverlay = document.createElement('div')

  // add content to elements
  newThumbnailImage.src               = state.thumbnailSrc
  newThumbnailOverlay.innerHTML       = UI.thumbnail.overlayHTML
  newThumbnailWrapper.dataset.photoId = state.photoId
  newThumbnailWrapper.id              = 't' + state.photoId
  newThumbnailWrapper.onclick         = deselectPhoto

  // style elements
  newThumbnailWrapper.classList.add('selected-thumbnail')
  newThumbnailOverlay.classList.add('selected-thumbnail__overlay')

  // nest elements to make thumbnail subtree
  newThumbnailWrapper.appendChild(newThumbnailImage)
  newThumbnailWrapper.appendChild(newThumbnailOverlay)

  // add thumbnail subtree to thumbnailGallery
  UI.thumbnailBar.gallery.add(newThumbnailWrapper)
}//}}}
function downloadPhoto () {//{{{
  modalDownloadBtn.click()
}//}}}
function downloadZipSet () {//{{{
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
}//}}}
function dismissModal () {//{{{ // scrolls to last viewed image in gallery, removes handlers, hides modal
  scrollTo(document.getElementById(state.photoId))

  // hide modal
  UI.modal.hide()

  // clean up all modal navigation handlers
  window.removeEventListener('keyup', handleKeyup)
  mc.off('swiperight', displayNextAsModal)
  mc.off('swipeleft', displayPrevAsModal)
}//}}}
function displaySelfAsModal () {//{{{ // set modal image, register handlers, display modal
  setModalImageTo(this)

  // unveil modal
  UI.modal.reveal()
  // selectPhoto()

  // set up navigation handlers
  window.addEventListener('keyup', handleKeyup)
  mc.on('swiperight', displayPrevAsModal)
  mc.on('swipeleft', displayNextAsModal)
}//}}}
function displayNextAsModal () {//{{{
  var nextImage = document.getElementById(state.nextPhotoId)

  setModalImageTo(nextImage)
}//}}}
function displayPrevAsModal () {//{{{
  var prevImage = document.getElementById(state.prevPhotoId)

  setModalImageTo(prevImage)
}//}}}
function setModalImageTo (sourcePhoto) {//{{{
  UI.modal.setImage(sourcePhoto)

  state.photoId      = sourcePhoto.id
  state.prevPhotoId  = sourcePhoto.dataset.previd
  state.nextPhotoId  = sourcePhoto.dataset.nextid
  state.thumbnailSrc = sourcePhoto.dataset.thumbnail
}//}}}

// vim:foldmethod=marker:foldlevel=0
