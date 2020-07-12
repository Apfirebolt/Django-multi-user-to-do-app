/**
 * Created by hp on 11-07-2020.
 */

$(document).ready(function(){
    $('select').formSelect();


    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    format: 'dd-mm-yyyy' });
  });