# Created by Bin Chen 7/19/18
# Modified by Jeb Alawi 7/19/18 - added belongs_to
# Modified by Josh Wright 7/25/18 - added additional fields
class CreateEvaluations < ActiveRecord::Migration[5.2]
  def change
    create_table :evaluations do |t|
      t.string :title
      t.string :due_date
      t.string :posted_date
      t.string :professor_form_info
      t.integer :professor_form_id
      t.text :student_form_info
      t.belongs_to :student
      t.boolean :isCompleted
      t.timestamps
    end
  end
end
