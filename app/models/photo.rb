# == Schema Information
#
# Table name: photos
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Photo < ActiveRecord::Base
  has_many :appearances
  has_many :people, through: :appearance
end
