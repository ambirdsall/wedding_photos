require 'rails_helper'

RSpec.describe PhotosController, type: :controller do

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # PhotosController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe 'GET #index' do
    it 'assigns all photos as @photos' do
      all_photos = Photo.all
      expect(all_photos.length).to be(525)

      get :index, params: {}, session: valid_session
      expect(assigns(:photos)).to eq(all_photos)
    end
  end
end
