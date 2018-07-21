class CoursesStudentController < ApplicationController

  def index
    @courses_students = CoursesStudent.all
  end

  def new
    @courses_student = CoursesStudent.new
  end

  def create
    @courses_student = CoursesStudent.new(courses_student_params)
    if @courses_student.save
      redirect_to @courses_student
    else
      render 'new'
    end
  end


  private

  def courses_student_params
    params.require(:courses_student).permit(:course_id, :student_id)
  end

end