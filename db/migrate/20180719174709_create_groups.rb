# Created by Bin Chen 7/19/18
# Modified by Jeb Alawi 7/19/18 - added belongs_to
class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :name
      t.belongs_to :course

      t.timestamps
    end
  end
end
