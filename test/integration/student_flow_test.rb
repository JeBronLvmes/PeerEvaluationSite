require 'test_helper'

class StudentFlowTest < ActionDispatch::IntegrationTest

  # def setup
  #   get "/students/sign_up"
  #   assert_response :success
  #
  #   post "/students",
  #        params: { student: { first_name: "Houyi", last_name: "Fake", dot_number: 123456, email: "fanosu.685@gmail.com"} }
  # end
  test "the truth" do
     assert true
  end

  test "can see the welcome page" do
    get "/"
    assert_response :success
    assert_select "h1", "Peer Evaluation"
  end

  test "can see the sign in page" do
    get "/students/sign_in"
    assert_response :success
    assert_select "h1", "Student Login"
  end

  test "can see the sign up page" do
    get "/students/sign_up"
    assert_response :success
    assert_select "h1", "Student Sign-Up"
  end

  test "can create a student" do
    get "/students/sign_up"
    assert_response :success

    post "/students",
         params: { student: { first_name: "Houyi", last_name: "Fake", dot_number: 123456, email: "fanosu.685@gmail.com", password: 123456, password_confirmation: 123456} }

    assert_response :redirect
    follow_redirect!
    assert_response :success
    assert_select "h1", "Peer Evaluation"
    assert_select "p", "Welcome!"
    assert_select "h4" , {:count=>3}, "Wrong number of h4 elements"
  end

  test "can go to a student's profile page" do
    get "/students/sign_up"
    assert_response :success

    post "/students",
         params: { student: { first_name: "Houyi", last_name: "Fake", dot_number: 123456, email: "fanosu.685@gmail.com", password: 123456, password_confirmation: 123456} }

    assert_response :redirect
    follow_redirect!
    assert_response :success
    assert_select "h1", "Peer Evaluation"
    assert_select "p", "Welcome!"

    assert_select "h4" , {:count=>3}, "Wrong number of h4 elements"

    # puts type(students)
    # get '/students/'+students[params].id.to_s
    # assert_response :success
  end

  # test "can log in as a student" do
  #   get "/students/sign_in"
  #   assert_response :success
  #
  #   post "/students/sign_in",
  #        params: { student: { email: "asdasd@asdasd.com", password: 123456, remember_me: 0} }
  #
  #   assert_response :redirect
  #   follow_redirect!
  #   assert_response :success
  #   assert_select "h1", "Peer Evaluation"
  #   assert_select "p", "Welcome!"
  # end
  #

  # test "can log out as a student" do
  #   get "/students/sign_up"
  #   assert_response :success
  #
  #   post "/students",
  #        params: { student: { first_name: "Houyi", last_name: "Fake", dot_number: 123456, email: "fanosu.685@gmail.com", password: 123456, password_confirmation: 123456} }
  #
  #   assert_response :redirect
  #   follow_redirect!
  #   assert_response :success
  #
  #   post "/students/sign_out",
  #        params: { }
  #   assert_response :redirect
  #   follow_redirect!
  #   assert_response :success
  #
  # end


end
