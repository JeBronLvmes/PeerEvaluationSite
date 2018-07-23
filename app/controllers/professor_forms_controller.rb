class ProfessorFormsController < ApplicationController
  def new
    @professor = current_professor
    @professor_form = ProfessorForm.new
  end
  def index
    @courses = current_professor.courses
    @professor = current_professor
  end

  def create
    @professor_form = ProfessorForm.new(professor_form_params)
    if @professor_form.save
      redirect_to professor_forms_path
    else
      render 'new'
    end
  end

  def show
    @professor = current_professor
    @courses = current_professor.courses
    @course = Course.find(params[:course_id])
    @professor_forms = Course.find(params[:id]).professor_forms
    rescue ActiveRecord::RecordNotFound
      render 'new'
  end

  def show_individual_form
    @professor = current_professor
    @courses = current_professor.courses
    @form = ProfessorForm.find(params[:id])
  end

  def destroy
  end

  private
  def professor_form_params
    params.require(:professor_form).permit(:title, :due_date, :submission_date, :html_form, :course_id)
  end

end
