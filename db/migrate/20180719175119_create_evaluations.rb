class CreateEvaluations < ActiveRecord::Migration[5.2]
  def change
    create_table :evaluations do |t|
      t.string :title
      t.string :due_date
      t.string :submission_date
      t.text :form
      t.belongs_to :student

      t.timestamps
    end
  end
end
