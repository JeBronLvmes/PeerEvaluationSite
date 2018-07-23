# Created by Jeb Alawi 7/19/18
class CoursesController < ApplicationController
  # sets @course for destory method
  before_action :set_course, only: [:destroy]

  # Created by Jeb Alawi 7/19/18
  def index
    @professor = nil
    @courses = nil
    if current_professor
      @courses = current_professor.courses
      @professor = current_professor
    end
  end

  def new
    @course = Course.new
    @professor= nil
    if(current_professor)
      @professor=current_professor
    end
  end

  def create
    if current_professor
      @course = Course.new(course_params)
      @course.professor_id = current_professor.id
      if @course.save
        redirect_to current_professor
      else
        render 'new'
      end
    end
  end

  # Get all of the students in the course
  # Created by Bin Chen 7/23/18
  def get_students
    @course = Course.find(params[:course_id])

    render json: @course.students
  end

  # Created by Bin Chen 7/23/18
  def show
    @course = Course.find(params[:id])

    render json: @course
  end



  # Created by Jeb Alawi 7/21/18
  def destroy
    if current_professor
      @course.destroy
      if current_professor
        redirect_to professor_path(current_professor.id), notice: 'Course was successfully deleted.'
      end
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
