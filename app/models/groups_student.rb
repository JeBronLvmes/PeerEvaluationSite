# Created by Jeb Alawi 7/19/18
class GroupsStudent < ApplicationRecord
  belongs_to :group
  belongs_to :student
end
