class UpdateEvaluations < ActiveRecord::Migration[5.2]
  def change
    change_table :evaluations do |t|
      t.integer :course_id
    end
  end
end
