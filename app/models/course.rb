class Course < ApplicationRecord
  belongs_to :professor
  has_and_belongs_to_many :students
  has_many :groups, dependent: :destroy
end
