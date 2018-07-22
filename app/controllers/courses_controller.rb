# Created by Jeb Alawi 7/19/18
class CoursesController < ApplicationController
  # sets @course for destory method
  before_action :set_course, only: [:destroy]
  def index
    @courses = Course.all
  end

  def new
    @course = Course.new
  end

  def create
    @course = Course.new(course_params)
    @course.professor_id = current_professor.id
    if @course.save
      redirect_to courses_path
    else
      render 'new'
    end
  end

  def destroy
    @course.destroy
    if current_professor
      redirect_to professor_path(current_professor.id), notice: 'Course was successfully deleted.'
    end
  end

  private
  def set_course
    @course = Course.find(params[:id])
  end
  def course_params
    params.require(:course).permit(:dept, :number, :section, :name)
  end
end
