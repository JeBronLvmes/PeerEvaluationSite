class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.integer :section
      t.integer :number
      t.string :name
      t.string :dept

      t.timestamps
    end
  end
end
