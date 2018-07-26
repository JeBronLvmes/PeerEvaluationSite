class ProfessorFormsController < ApplicationController

  before_action :set_professor_form, only: [:destroy]
  protect_from_forgery with: :null_session

  # Created by Josh Wright 7/22/18
  def new
    @professor_form = ProfessorForm.new
    @professor = nil
    if(current_professor)
      @professor=current_professor
    end
  end

  # Created by Josh Wright 7/22/18
  def index
    @professor = nil
    @courses = nil
    if current_professor
      @courses = current_professor.courses
      @professor = current_professor
    end
  end

  def create
    @professor_form = ProfessorForm.new(professor_form_params)
  end

  # Created by Josh Wright 7/22/18
  # Modified by Houyi Fan on 7/25/18
  def create_evaluation
      @professor_form = ProfessorForm.new(professor_form_params)
      if @professor_form.save
        render json: @professor_form
      else
        render json: @professor_form.errors
      end
  end

  # Get all of the groups in the course
  # Created by Josh Wright 7/24/18
  def get_groups
    @course = Course.find(params[:course_id])
    render json: @course.groups
  end

  # Get all of the groups in the course
  # Created by Josh Wright 7/24/18
  def get_forms
    @course = Course.find(params[:course_id])
    @forms = @course.professor_forms
    render json: @forms
  end

  # Get all of the students in the course
  # Created by Josh Wright 7/24/18
  def get_students
    @course = Course.find(params[:course_id])

    render json: @course.students
  end

  # Get a student in the course
  # Created by Josh Wright 7/24/18
  def get_student
    @student = Student.find(params[:std_id])
    render json: @student
  end

  # Created by Josh Wright 7/24/18
  def show
    @form = ProfessorForm.find(params[:id])

    render json: @form
  end

  # Created by Jeb Alawi 7/21/18
  def destroy
    if current_professor
      @form.destroy
      if current_professor
        redirect_to professor_path(current_professor.id), notice: 'Course was successfully deleted.'
      end
    end
  end

  def show_individual_form
    @professor = current_professor
    @course = Course.find(params[:course_id])
    if current_professor
      @form = ProfessorForm.find(params[:id])
      render json: @form
    end
  end

  # add evaluation to Student
  # Created by Josh Wright 7/24/18
  def add_evaluaiton_to_student
    @evaluation = Evaluation.new
    @evaluation.student_id = :student_id
    @student = Student.find(params[:id])
    @student.evaluation << @student unless @group.students.include? @student
    render json: @evaluation
  end

  # Created by Josh Wright 7/22/18
  private
  def set_professor_form
    @form = ProfessorForm.find(params[:course_id])
  end
  def professor_form_params
    params.require(:professor_form).permit(:title, :due_date, :submission_date, :html_form, :course_id)
  end

end
