class CoursesStudentController < ApplicationController
  before_action :set_courses_student, only: [:destroy]
  def index
    @courses_students = CoursesStudent.all
  end

  def new
    if(current_professor)
      @courses_student = CoursesStudent.new(courses_student_params)
      @courses_student.save
    end
  end

  def create
    @courses_student = CoursesStudent.new(courses_student_params)
    if @courses_student.save
      redirect_to current_student
    else
      render 'new'
    end
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