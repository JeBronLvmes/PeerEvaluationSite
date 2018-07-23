# Created by Jeb Alawi on 7/22/18
class ProfessorsController < ApplicationController

  # Created by Jeb Alawi on 7/22/18
  def index
    @professor = nil
    if current_professor
      @professor = current_professor
    end
#		@professors = Professor.all

  end

	def show
    @professor = Professor.find(params[:id])
  end

  def new
    @professor = Professor.new
  end

	def edit
		@professor = Professor.find(params[:id])
	end

  def create
    @professor = Professor.new(professor_params)

    if @professor.save
      redirect_to @professor
    else
      render 'new'
    end
  end

	def update
		@professor = Professor.find(params[:id])

		if @professor.update(professor_params)
			redirect_to @professor
		else
			render 'edit'
		end
	end

  def showCourses

  end

  private
  def professor_params
    params.require(:professor).permit(:first_name, :last_name, :dot_number, :email)
  end
end
