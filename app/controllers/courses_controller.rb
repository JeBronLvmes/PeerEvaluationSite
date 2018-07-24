# Created by Jeb Alawi 7/19/18
class CoursesController < ApplicationController
  # sets @course for destory method
  before_action :set_course, only: [:destroy]
  protect_from_forgery with: :null_session

  # Created by Jeb Alawi 7/19/18
  def index
    @professor = current_professor
  end

  def new

  end

  def create
    @course = Course.new(course_params)
    @professor = Professor.find(params[:professor_id])
    @professor.courses << @course

    if @course.save
      render :json => @course
    elsif
      render :json => @course.errors
    end
  end

  # add a group to the class
  # created by Jeb Alawi 7/24/18
  def add_group
    @professor = Professor.find(params[:professor_id])
    @course = Course.find(params[:course_id])
    @group = Group.new(group_params)
    @course.groups << @group
    if @group.save
      render :json => "ok"
    end
  end

  # Get all of the groups in the course
  # Created by Bin Chen 7/23/18
  def get_groups
    @course = Course.find(params[:course_id])

    render json: @course.groups
  end

  # Get all of the courses from one professor
  # Created by Bin Chen 7/23/18
  def get_courses
    @prof = Professor.find(params[:pro_id])

    render json: @prof.courses
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

  # Created by Bin Chen 7/24/18
  def add_std
    @pro = Professor.find(params[:pro_id])
    @course = @pro.courses.find(params[:course_id])
    @std = Student.find(params[:std_id])

    # add students into course only if the student does not exists in the course already
    @course.students << @std unless @course.students.include? @std

    render json: @std
  end

  # Created by Bin Chen 7/24/18
  def delete_std
    @pro = Professor.find(params[:pro_id])
    @course = @pro.courses.find(params[:course_id])
    @std = Student.find(params[:std_id])

    @course.students.delete @std

    render json: @course.students
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
    params.require(:course).permit(:dept, :number, :section, :name, :professor_id, :group_name)
  end

  def group_params
    params.permit(:course_id, :name)
  end

end
