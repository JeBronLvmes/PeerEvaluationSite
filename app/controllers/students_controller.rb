class StudentsController < ApplicationController

  def index
		@students = Student.all
  end

	# craeted by Bin Chen 7/19/18
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

	# created by Bin Chen 7/24/18
	def search
		query_str = ""
		is_first = true
		val_list = []

		params.each do |key, value|
			if key == 'first_name' or key == 'last_name' or key == 'dot_number'
					query_str += " AND " unless is_first

					is_first = false
					query_str += key + " = ?"
					val_list << value
			end
		end

		puts query_str

		render json: Student.where(query_str, *val_list)
	end

	private

		def student_params
			params.require(:student).permit(:first_name, :last_name, :dot_number, :email)
    end

end
