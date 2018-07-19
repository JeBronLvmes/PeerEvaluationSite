class StudentsController < ApplicationController
	def new
		@student = Student.new
	end
	
	def create
		@student = Student.new(article_params)
 
		if @student.save
			redirect_to @student
		else
			render 'new'
		end
	end
	
	private
		def student_params
			params.require(:student).permit(:first_name, :last_name, :dot_number, :email)
		end
end
