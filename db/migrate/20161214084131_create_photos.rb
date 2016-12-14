class CreatePhotos < ActiveRecord::Migration
  def up
    create_table :photos do |t|
      t.timestamps null: false
    end

    add_attachment :photos, :image
  end

  def down
    remove_table :photos
  end
end
