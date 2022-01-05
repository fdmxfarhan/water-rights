$(document).ready(function(){
    $('#link2').addClass('active');

    $('#add-user-btn').click(() => {
        $('#add-user-popup').fadeIn(500);
        $('.black-modal').fadeIn(500);
    });
    $('.black-modal').click(() => {
        $('#add-user-popup').fadeOut(500);
        $('.black-modal').fadeOut(500);
    });
    $('.close-popup').click(() => {
        $('#add-user-popup').fadeOut(500);
        $('.black-modal').fadeOut(500);
    });
    $('#usertab1-btn').click(() => {
        $('#usertab1').show();
        $('#usertab2').hide();
        $('#usertab3').hide();
        $('#usertab4').hide();
        $('#usertab1-btn').addClass('active');
        $('#usertab2-btn').removeClass('active');
        $('#usertab3-btn').removeClass('active');
        $('#usertab4-btn').removeClass('active');
    });
    $('#usertab2-btn').click(() => {
        $('#usertab2').show();
        $('#usertab1').hide();
        $('#usertab3').hide();
        $('#usertab4').hide();
        $('#usertab2-btn').addClass('active');
        $('#usertab1-btn').removeClass('active');
        $('#usertab3-btn').removeClass('active');
        $('#usertab4-btn').removeClass('active');
    });
    $('#usertab3-btn').click(() => {
        $('#usertab3').show();
        $('#usertab2').hide();
        $('#usertab1').hide();
        $('#usertab4').hide();
        $('#usertab3-btn').addClass('active');
        $('#usertab2-btn').removeClass('active');
        $('#usertab1-btn').removeClass('active');
        $('#usertab4-btn').removeClass('active');
    });
    $('#usertab4-btn').click(() => {
        $('#usertab4').show();
        $('#usertab2').hide();
        $('#usertab3').hide();
        $('#usertab1').hide();
        $('#usertab4-btn').addClass('active');
        $('#usertab2-btn').removeClass('active');
        $('#usertab3-btn').removeClass('active');
        $('#usertab1-btn').removeClass('active');
    });
    
});