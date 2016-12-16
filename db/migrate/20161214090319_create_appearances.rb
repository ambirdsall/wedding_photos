class CreateAppearances < ActiveRecord::Migration
  def change
    create_table :appearances do |t|
      t.belongs_to :person
      t.belongs_to :photo

      t.index [:person_id, :photo_id]
      t.index [:photo_id, :person_id]
    end
  end
end
