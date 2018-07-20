# Created by Jeb Alawi 7/19/18
class EvaluationsController < ApplicationController
  def index
    @evaluations = Evaluation.all
  end

  def new
    @evaluation = Evaluation.new
  end

  def create
    @evaluation = Evaluation.new(evaluation_params)

    if @evaluation.save
      redirect_to evaluations_path
    else
      render 'new'
    end
  end

  private
    def evaluation_params
      params.require(:evaluation).permit(:title, :due_date, :submission_date, :form, :student_id)
    end

end
