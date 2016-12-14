require 'rails_helper'

RSpec.describe Photo, type: :model do
  it { should have_attached_file :image }
end
