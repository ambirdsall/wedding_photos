# == Schema Information
#
# Table name: photos
#
#  id               :integer          not null, primary key
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  visibility_level :integer
#

class Photo < ActiveRecord::Base
  has_many :people, through: :appearances
  has_many :appearances

  def small
    s3_url_for_size 's'
  end

  def medium
    s3_url_for_size 'm'
  end

  def full_size
    s3_url_for_size ''
  end

  private

  def s3_url_for_size(size)
    "https://s3.amazonaws.com/alexandaudrey.com/wedding_photos/Audrey-Alex-Wedding-#{id}#{size}.jpg"
  end
end
