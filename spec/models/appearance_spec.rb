# == Schema Information
#
# Table name: appearances
#
#  id        :integer          not null, primary key
#  person_id :integer
#  photo_id  :integer
#
# Indexes
#
#  index_appearances_on_person_id_and_photo_id  (person_id,photo_id)
#  index_appearances_on_photo_id_and_person_id  (photo_id,person_id)
#

require 'rails_helper'

RSpec.describe Appearance, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to :photo }
    it { is_expected.to belong_to :person }
  end
end
