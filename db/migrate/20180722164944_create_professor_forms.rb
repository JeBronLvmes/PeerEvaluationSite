class CreateProfessorForms < ActiveRecord::Migration[5.2]
  def change
    create_table :professor_forms do |t|
      t.string :title
      t.string :due_date
      t.string :submission_date
      t.text :html_form
      t.belongs_to :course
      t.timestamps
    end
  end
end
