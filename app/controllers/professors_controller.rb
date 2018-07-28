# Created by Jeb Alawi on 7/22/18
# description: to create, destroy and update professors
class ProfessorsController < ApplicationController

  # Created by Jeb Alawi on 7/22/18
  def index
    @professor = nil
    if current_professor
      @professor = current_professor
    end
  end

  # Created by Houyi Fan on 7/23/18
	def show
    @professor = Professor.find(params[:id])
  end

  def new
    @professor = Professor.new
  end

  # Created by Houyi Fan on 7/23/18
	def edit
		@professor = Professor.find(params[:id])
	end

  # Created by Josh Wright on 7/23/18
  def create
    @professor = Professor.new(professor_params)
    if @professor.save
      redirect_to @professor
    else
      render 'new'
    end
  end

  # Created by Houyi Fan on 7/23/18
	def update
		@professor = Professor.find(params[:id])

		if @professor.update(professor_params)
			redirect_to @professor
		else
			render 'edit'
		end
	end

  # Created by Houyi Fan on 7/23/18
	def destroy
		@professor = Professor.find(params[:id])

    # manually destory all the courses and its students

    @professor.courses.each do |course|
      course.students.delete_all
    end

    @professor.courses.delete_all

		@professor.destroy
	 
		redirect_to root_url
	end

  def showCourses

  end

  private
  def professor_params
    params.require(:professor).permit(:first_name, :last_name, :dot_number, :email)
  end
end
