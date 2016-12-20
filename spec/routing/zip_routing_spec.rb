require 'rails_helper'

RSpec.describe ZipController, type: :routing do
  describe 'routing' do
    it 'routes to #download' do
      expect(post: '/photos').to route_to('zip#download')
    end
  end
end
