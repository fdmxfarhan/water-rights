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
    

    $('#tab1').click(() => {
        $('#tab1').addClass('active');
        $('#tab2').removeClass('active');
        $('#tab3').removeClass('active');
        $('#tab-content1').show();
        $('#tab-content2').hide();
        $('#tab-content3').hide();
    });
    $('#tab2').click(() => {
        $('#tab1').removeClass('active');
        $('#tab2').addClass('active');
        $('#tab3').removeClass('active');
        $('#tab-content1').hide();
        $('#tab-content2').show();
        $('#tab-content3').hide();
    });
    $('#tab3').click(() => {
        $('#tab1').removeClass('active');
        $('#tab2').removeClass('active');
        $('#tab3').addClass('active');
        $('#tab-content1').hide();
        $('#tab-content2').hide();
        $('#tab-content3').show();
    });
    

});