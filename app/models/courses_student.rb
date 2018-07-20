# Created by Jeb Alawi 7/19/18
class CoursesStudent < ApplicationRecord
  belongs_to :course
  belongs_to :student
end
