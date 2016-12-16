class AddVisibilityLevelToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :visibility_level, :integer
  end
end
