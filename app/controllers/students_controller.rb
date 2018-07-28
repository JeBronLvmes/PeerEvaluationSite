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
		@courses_student_list = @student.courses

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

	# delete a student account
	#
	# Created by Houyi Fan 7/22/18
	def destroy
		@student = Student.find(params[:id])

		@student.courses.each do |course|
			course.students.delete @student
		end

		@student.destroy
	 
		redirect_to root_url
	end

	# searches for a student
	#
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
		if current_student.id.to_i == params[:id].to_i
			@student = Student.find(params[:id])
			@evaluations = @student.evaluations
		end
		render 'get_courses'
	end

	# Created by Houyi Fan 7/24/18
	def get_groups
		if current_student.id.to_i == params[:id].to_i
			@student = Student.find(params[:id])
		end
		render 'get_groups'
	end

	# Created by Houyi Fan 7/24/18
	# Modified by Josh Wright 7/25/18
	def get_evaluations
		if current_student.id.to_i == params[:id].to_i
			@student = Student.find(params[:id])
			@evaluations = @student.evaluations
		end
		render 'get_evaluations'
	end

	# get a specific evaluation for a student
	#
	# Created by Jeb Alawi 7/26/18
	def get_eval
		@student = Student.find(params[:student_id])
		@evaluation = @student.evaluations.find(params[:eval_id])
		render json: @evaluation
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

	# get list of incomplete evals for a student's course
	#
	# Created by Jeb Alawi 7/26/18
	def course_incomplete_eval
		@student_evals = Student.find(params[:student_id]).evaluations.where('course_id = ?', params[:course_id])
		@evaluations = []
		if @student_evals != nil
			for e in @student_evals
				if !e.isCompleted
					@evaluations << e
				end
			end
		end
		render json: @evaluations
	end

	# get list of incomplete evals for a student's course
	#
	# Created by Jeb Alawi 7/26/18
	def course_complete_eval
		@student_evals = Student.find(params[:student_id]).evaluations.where('course_id = ?', params[:course_id])
		@evaluations = []
		if @student_evals != nil
			for e in @student_evals
				if e.isCompleted
					@evaluations << e
				end
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
			params.require(:student).permit(:first_name, :last_name, :dot_number, :email, :answer)
    end

end
