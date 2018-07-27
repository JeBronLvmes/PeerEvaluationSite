require 'test_helper'

class ProfessorsControllerTest < ActionDispatch::IntegrationTest
  test "the truth" do
    assert true
  end

  test "should get sign up" do
    get students_url + "/sign_up"
    assert_response :success
  end

  test "should get sign in" do
    get students_url + "/sign_in"
    assert_response :success
  end
end
