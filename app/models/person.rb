# == Schema Information
#
# Table name: people
#
#  id         :integer          not null, primary key
#  first_name :string
#  last_name  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Person < ActiveRecord::Base
  has_and_belongs_to_many :photos
end