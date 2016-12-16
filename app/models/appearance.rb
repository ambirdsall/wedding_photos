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

class Appearance < ActiveRecord::Base
end
