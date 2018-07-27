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
end
