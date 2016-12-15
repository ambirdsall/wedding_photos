class RemoveImageColumnsFromPhoto < ActiveRecord::Migration
  def change
    change_table :photos do |t|
      t.remove :image_file_name
      t.remove :image_content_type
      t.remove :image_file_size
      t.remove :image_updated_at
    end
  end
end
