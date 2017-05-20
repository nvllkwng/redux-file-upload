'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fileUploadReducer;

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _UploadingDocument = require('./UploadingDocument');

var _UploadingDocument2 = _interopRequireDefault(_UploadingDocument);

var _UploadingImage = require('./UploadingImage');

var _UploadingImage2 = _interopRequireDefault(_UploadingImage);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var InitialState = (0, _immutable.Record)({
  documents: (0, _immutable.Map)(),
  images: (0, _immutable.Map)()
});
var initialState = new InitialState();

function revive() {
  return initialState.merge({});
}

function fileUploadReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case actions.FILE_UPLOAD_ADD_UPLOADING_IMAGES_SUCCESS:
      {
        var identificator = action.meta.identificator;


        var newUploadingImages = action.payload.map(function (uploadingImage) {
          return new _UploadingImage2.default(uploadingImage);
        });

        return state.updateIn(['images', identificator], function (images) {
          return (0, _immutable.List)(images).concat((0, _immutable.List)(newUploadingImages));
        });
      }

    case actions.FILE_UPLOAD_ADD_UPLOADING_DOCUMENTS_SUCCESS:
      {
        var _identificator = action.meta.identificator;


        var newUploadingDocument = action.payload.map(function (uploadingDocument) {
          return new _UploadingDocument2.default({ file: uploadingDocument });
        });

        return state.updateIn(['documents', _identificator], function (documents) {
          return (0, _immutable.List)(documents).concat((0, _immutable.List)(newUploadingDocument));
        });
      }

    case actions.FILE_UPLOAD_PROGRESS:
      {
        var _action$payload = action.payload,
            _identificator2 = _action$payload.identificator,
            file = _action$payload.file,
            progress = _action$payload.progress,
            isImage = _action$payload.isImage,
            isDoc = _action$payload.isDoc;


        if (isImage) return updateUploadingImage(state, _identificator2, file, function (uploadingImage) {
          return uploadingImage.set('progress', Math.round(progress));
        });
        if (isDoc) return updateUploadingDocument(state, _identificator2, file, function (uploadingDocument) {
          return uploadingDocument.set('progress', Math.round(progress));
        });
        return state;
      }

    case actions.FILE_UPLOAD_ERROR:
      {
        var _action$payload2 = action.payload,
            _identificator3 = _action$payload2.identificator,
            _file = _action$payload2.file,
            error = _action$payload2.error,
            _isImage = _action$payload2.isImage,
            _isDoc = _action$payload2.isDoc;

        if (_isImage) return updateUploadingImage(state, _identificator3, _file, function (uploadingImage) {
          return uploadingImage.set('error', error);
        });
        if (_isDoc) return updateUploadingDocument(state, _identificator3, _file, function (uploadingDocument) {
          return uploadingDocument.set('error', error);
        });
        return state;
      }

  }

  return state;
}

function updateUploadingImage(state, identificator, file, updater) {
  return state.updateIn(['images', identificator], function (images) {
    return (0, _immutable.List)(images).map(function (uploadingImage) {
      return (// eslint-disable-line no-confusing-arrow
        uploadingImage.file === file ? updater(uploadingImage) : uploadingImage
      );
    });
  });
}

function updateUploadingDocument(state, identificator, file, updater) {
  return state.updateIn(['documents', identificator], function (documents) {
    return (0, _immutable.List)(documents).map(function (uploadingDocument) {
      return (// eslint-disable-line no-confusing-arrow
        uploadingDocument.file === file ? updater(uploadingDocument) : uploadingDocument
      );
    });
  });
}
module.exports = exports['default'];