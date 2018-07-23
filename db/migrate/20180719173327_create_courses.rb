# Created by Bin Chen 7/19/18
# Modified by Jeb Alawi 7/19/18 - added belongs_to
class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.integer :section
      t.integer :number
      t.string :name
      t.string :dept
      t.belongs_to :professor
      t.timestamps
    end
  end
end
