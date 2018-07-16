class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.string :first_name
      t.string :last_name
      t.string :username
      t.integer :dot_number
      t.string :alt_email
      t.string :buckid

      t.timestamps
    end
  end
end
