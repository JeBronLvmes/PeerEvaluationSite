require 'test_helper'

class ProfessorFlowTest < ActionDispatch::IntegrationTest
   test "the truth" do
    assert true
   end

   test "can see the welcome page" do
     get "/"
     assert_response :success
     assert_select "h1", "Peer Evaluation"
   end

   test "can see the sign in page" do
     get "/professors/sign_in"
     assert_response :success
     assert_select "h1", "Professor Login"
   end

   test "can see the sign up page" do
     get "/professors/sign_up"
     assert_response :success
     assert_select "h1", "Professors Sign-Up"
   end

   test "can create a professor" do
     get "/professors/sign_up"
     assert_response :success

     post "/professors",
          params: { professor: { first_name: "Houyi", last_name: "Fake", dot_number: 123456, email: "fanosu.685@gmail.com", answer: "Anything", password: 123456, password_confirmation: 123456} }

     assert_response :redirect
     follow_redirect!
     assert_response :success
     assert_select "h1", "Peer Evaluation"
     assert_select "p", "Welcome!"
     assert_select "h4" , {:count=>3}, "Wrong number of h4 elements"
   end
end
