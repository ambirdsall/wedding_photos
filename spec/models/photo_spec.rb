require 'rails_helper'

RSpec.describe Photo, type: :model do
  it { should have_attached_file :image }
  it { should have_and_belong_to_many :people }
end
