class StudentsController < ApplicationController

  def index
		@students = Student.all
  end

	def new
		@student = Student.new
	end

	def edit
		@student = Student.find(params[:id])
	end

	def show
		@student = Student.find(params[:id])
	end

	def create
		@student = Student.new(student_params)
		if @student.save
			redirect_to @student
		else
			render 'new'
		end
	end

	def update
		@student = Student.find(params[:id])

		if @student.update(student_params)
    	redirect_to @student
  	else
    	render 'edit'
  	end
#		@student.courses << Course.find(params[:student][:course_id])
#		if @student.save
#			redirect_to @student
#		end
	end

	def profile
		@student = Student.find(student_params)
		redirect_to @student
	end

	def destroy
		@student = Student.find(params[:id])
		@student.destroy
	 
		redirect_to students_path
	end

	private

		def student_params
			params.require(:student).permit(:first_name, :last_name, :dot_number, :email)
    end

end
