require 'rails_helper'

RSpec.describe Person, type: :model do
  describe 'basic-ass shit' do
    it { should have_and_belong_to_many :photos }
  end
end
