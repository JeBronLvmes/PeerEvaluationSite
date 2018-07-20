# Created by Jeb Alawi 7/19/18
class Group < ApplicationRecord
  has_and_belongs_to_many :students
  belongs_to :course
end
