class ProfessorsController < ApplicationController
  def index
    @professors = Professor.all
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
