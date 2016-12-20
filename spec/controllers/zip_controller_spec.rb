require 'rails_helper'

RSpec.describe ZipController, type: :controller do

  let(:valid_session) { {} }

  describe 'POST #download' do
    context 'valid photo ids' do
      it 'responds with a zip file' do
        photo_ids = [1,2,3]

        post :download, {selected_photos: photo_ids}, session: valid_session
        expect(response.content_type).to eq 'application/zip'
        expect(response.headers['Content-Disposition']).to include 'attachment'
      end

      it 'uses the specified filename with .zip appended' do
        photo_ids = [1,2,3]

        post :download, {selected_photos: photo_ids, zip_filename: 'hootenanny'}, session: valid_session
        expect(response.headers['Content-Disposition']).to include 'filename="hootenanny.zip"'
      end

      it 'uses a default filename if none is specified' do
        photo_ids = [1,2,3]

        post :download, {selected_photos: photo_ids}, session: valid_session
        expect(response.headers['Content-Disposition']).to include 'filename="PhotosFromAlexAndAudrey.zip"'
      end

      it 'sends the same file for the same ids' do
        photo_ids_one = [1,2,3]
        photo_ids_two = [4,5,6,7]

        post :download, {selected_photos: photo_ids_one}, session: valid_session
        first_zip = response.body

        post :download, {selected_photos: photo_ids_one}, session: valid_session
        same_photos_zip = response.body

        post :download, {selected_photos: photo_ids_two}, session: valid_session
        different_photos_zip = response.body

        expect(first_zip).to eq same_photos_zip
        expect(first_zip).not_to eq different_photos_zip
      end
    end
  end
end
