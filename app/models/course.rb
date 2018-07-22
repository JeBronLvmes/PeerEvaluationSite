# Created by Jeb Alawi 7/19/18
class Course < ApplicationRecord
  belongs_to :professor
  has_and_belongs_to_many :students
  has_many :groups, dependent: :destroy
  has_many :professor_forms, dependent: :destroy
end
