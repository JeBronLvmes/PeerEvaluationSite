class StudentController < ApplicationController
	# GET /users/new
  def new
    @student = Student.new
  end

	# GET /student
  def index
    @students = Student.all
  end
end
