# Created by Jeb Alawi on 7/22/18
class ProfessorsController < ApplicationController

  # Created by Jeb Alawi on 7/22/18
  def index
    @professor = nil
    if current_professor
      @professor = current_professor
    end

  end

  def new
    @professor = Professor.new
  end

  def create
    @professor = Professor.new(professor_params)

    if @professor.save
      redirect_to @professor
    else
      render 'new'
    end
  end

  def show
  end

  def showCourses

  end

  private
  def professor_params
    params.require(:professor).permit(:first_name, :last_name, :dot_number, :email)
  end
end
