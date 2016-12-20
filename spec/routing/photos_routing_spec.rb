require 'rails_helper'

RSpec.describe PhotosController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(:get => '/').to route_to('photos#index')
    end

    it 'routes to #download' do
      expect(:get => '/dl/1').to route_to('photos#download', id: '1')
    end
  end
end
