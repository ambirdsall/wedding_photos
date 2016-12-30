require 'rails_helper'

RSpec.describe ZipController, type: :controller do

  let(:valid_session) { {} }
  let(:photo_ids) { JSON.generate [1,2,3] }
  let(:photo_ids_two) { JSON.generate [1,2,3,4] }

  describe 'POST #download' do
    context 'valid photo ids' do
      it 'responds with a zip file' do
        post :download, {selected_photos: photo_ids}, session: valid_session
        expect(response.content_type).to eq 'application/zip'
        expect(response.headers['Content-Disposition']).to include 'attachment'
      end

      it 'uses the specified filename with .zip appended' do
        post :download, {selected_photos: photo_ids, zip_filename: 'hootenanny'}, session: valid_session
        expect(response.headers['Content-Disposition']).to include 'filename="hootenanny.zip"'
      end

      it 'uses a default filename if none is specified' do
        post :download, {selected_photos: photo_ids}, session: valid_session
        expect(response.headers['Content-Disposition']).to include 'filename="PhotosFromAlexAndAudrey.zip"'
      end

      it 'sends the same file for the same ids' do
        post :download, {selected_photos: photo_ids}, session: valid_session
        first_zip = response.body

        post :download, {selected_photos: photo_ids}, session: valid_session
        same_photos_zip = response.body

        post :download, {selected_photos: photo_ids_two}, session: valid_session
        different_photos_zip = response.body

        expect(first_zip).to eq same_photos_zip
        expect(first_zip).not_to eq different_photos_zip
      end
    end
  end
end
