# Created by Jeb Alawi 7/19/18
class Student < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :evaluations
  has_and_belongs_to_many :courses
  has_and_belongs_to_many :groups
end
