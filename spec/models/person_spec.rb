require 'rails_helper'

RSpec.describe Person, type: :model do
  describe 'basic-ass shit' do
    it 'has a name' do
      person = build(:person, first_name: 'Hulk', last_name: 'Hogan')

      expect(person.last_name).to eq 'Hogan'
    end
  end
end
