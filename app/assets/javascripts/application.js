// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require_tree .
/*Shows the correct course information based on which course button is selected in the course side navigation bar*/
 function showCourses(button){
    var buttons = document.getElementsByName("course")
    for(var i = 0; i < buttons.length; i++){
        var str = buttons[i].id.substring(5,buttons[i].id.length);
        var div = document.getElementById(str);
        if(buttons[i].className.includes("active")){
            div.style.display = "block"
        }
        else{
            div.style.display = "none"
        }
    }
 }