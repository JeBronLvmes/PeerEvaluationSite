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
    @prof = Professor.find params[:pro_id]
    @course = @prof.courses.find params[:course_id]

    @course.groups.each do |group|
      group.students.each do |std|
        @evaluation = Evaluation.new
        @evaluation.due_date = @form.due_date
        @evaluation.course_id = @form.course_id
        @evaluation.posted_date = @form.submission_date
        @evaluation.professor_form_info = @form.html_form
        @evaluation.title = @form.title
        @evaluation.student_id = std.id
        @evaluation.isCompleted = false
        @evaluation.professor_form_id = params[:form_id]
        @evaluation.save
      end
    end

    render json: @course
  end

  # update an evaluation with a student's answer
  #
  # Created by Jeb Alawi 7/26/18
  def post_answer
    @evaluation = Evaluation.find(params[:eval_id])
    @evaluation.student_form_info = params[:student_form_info]
    @evaluation.isCompleted = params[:isCompleted]
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
      params.require(:evaluation).permit(:professor_form_id, :student_id, :isCompleted, :student_form_info)
    end

end
