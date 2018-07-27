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
         params: { student: { first_name: "Houyi", last_name: "Fake", dot_number: 123456, email: "fanosu.685@gmail.com", answer: "Anything"} }
    # assert_response :success

    # get "/"
    assert_response :redirect
    follow_redirect!
    assert_response :success
    assert_select "h1", "Peer Evaluation"
    assert_select "p", "Welcome!"
  end
end
