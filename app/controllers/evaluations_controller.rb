# Created by Jeb Alawi 7/19/18
# description: manage evaluations
class EvaluationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery with: :null_session

  def index
    @evaluations = Evaluation.all
  end

  # create a new evaluation
  #
  # Created by Josh Wright on 7/24/18
  def new
    @evaluation = Evaluation.new
  end

  def create_evaluation_to_student
    @form = ProfessorForm.find(params[:form_id])
    @evaluation = Evaluation.new
    @evaluation.due_date = @form.due_date
    @evaluation.posted_date = @form.submission_date
    @evaluation.professor_form_info = @form.html_form
    @evaluation.title = @form.title
    @evaluation.student_id = params[:id];
    @evaluation.isCompleted = false;
    @evaluation.professor_form_id = params[:form_id]
    if @evaluation.save
      render json: @evaluation
    else
      render json: @evaluation.errors
    end
  end

  def create
    @evaluation = Evaluation.new
    if @evaluation.save
      redirect_to evaluations_path
    else
      render 'new'
    end
  end

  private
    def evaluation_params
      params.require(:evaluation).permit(:professor_form_id, :student_id, :isCompleted)
    end

end
