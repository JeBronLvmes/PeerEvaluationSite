class StudentsController < ApplicationController

	# get list of students
	#
	# created by Jeb Alawi 7/25/18
	def get_course_list
		@student = Student.find(params[:student_id])
		render json: @student.courses
	end

	# get specific course data
	#
	# Created by Jeb Alawi
	def show_course
		@course = Course.find(params[:course_id])
		render json: @course
	end

	#get course specific group
	#
	# Created by Jeb Alwai 7/25/18
	def show_group
		@student = Student.find(params[:student_id])
		render json: @student.groups.find_by(course_id: params[:course_id])
	end

  def index
		@students = Student.all
  end

	# created by Bin Chen 7/19/18
	def new
		@student = Student.new
	end

	# Created by Houyi Fan 7/22/18
	def edit
		@student = Student.find(params[:id])
	end

	def show
		@student = Student.find(params[:id])
		@courses_student_list = CoursesStudent.where("student_id = #{@student.id}")

	end

	# Modified by Houyi Fan 7/19/18
	def create
		@student = Student.new(student_params)
		if @student.save
			redirect_to @student
		else
			render 'new'
		end
	end

	# Created by Houyi Fan 7/22/18
	def update
		@student = Student.find(params[:id])

		if @student.update(student_params)
    	redirect_to @student
  	else
    	render 'edit'
  	end
	end

	def profile
		@student = Student.find(student_params)
		redirect_to @student
	end

	# Created by Houyi Fan 7/22/18
	def destroy
		@student = Student.find(params[:id])
		@student.destroy
	 
		redirect_to students_path
	end

	# searches for a student
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

	# Created by Houyi Fan 7/24/18
	# Modified by Josh Wright 7/25/18
	def get_courses
		@student = Student.find(params[:id])
		@evaluations = @student.evaluations
		render 'get_courses'
	end

	# Created by Houyi Fan 7/24/18
	def get_groups
		@student = Student.find(params[:id])
		render 'get_groups'
	end

	# Created by Houyi Fan 7/24/18
	# Modified by Josh Wright 7/25/18
	def get_evaluations
		@student = Student.find(params[:id])
		@evaluations = @student.evaluations
		render 'get_evaluations'
	end

	# Created by Josh Wright 7/24/18
	def incomplete_evaluations_list
		@student = Student.find(params[:student_id])
		@evaluations = []
		for evaluation in @student.evaluations
			if !evaluation.isCompleted
				@evaluations << evaluation
			end
		end

		render json: @evaluations
	end

	# Created by Josh Wright 7/24/18
	def completed_evaluations_list
		@student = Student.find(params[:student_id])
		@evaluations = []
		for evaluation in @student.evaluations
			if evaluation.isCompleted
				@evaluations << evaluation
			end
		end
		render json: @evaluations
	end

	private

		def student_params
			params.require(:student).permit(:first_name, :last_name, :dot_number, :email)
    end

end
