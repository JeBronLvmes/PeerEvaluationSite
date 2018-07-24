class CoursesStudentController < ApplicationController
  before_action :set_courses_student, only: [:destroy]
  protect_from_forgery with: :null_session

  def index
    @courses_students = CoursesStudent.all
  end

  def new
    # if(current_professor)
      @courses_student = CoursesStudent.new
  end

  # created by Jeb Alawi 7/23/2018
  # modified by Bin Chen 7/24/2018
  def create
    @courses_student = CoursesStudent.new courses_student_params

    @courses_student.save
  end

  def destroy
    @courses_student.destroy
    if (current_student)
      redirect_to student_path(current_student.id), notice: 'Course was successfully dropped from Student.'
    else
      redirect_to courses_student_url, notice: 'Course was successfully dropped from Student.'
    end
  end


  private
  def set_courses_student
    @courses_student = CoursesStudent.find(params[:id])
  end

  def courses_student_params
    params.require(:courses_student).permit(:course_id, :student_id)
  end

end