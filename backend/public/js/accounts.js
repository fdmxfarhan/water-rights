$(document).ready(function(){
    $('#link3').addClass('active');
    $('#tab2').hide();
    $('#tab3').hide();

    $('#add-account-btn').click(() => {
        $('#add-account-popup').fadeIn(500);
        $('.black-modal').fadeIn(500);
    });
    $('.black-modal').click(() => {
        $('#add-account-popup').fadeOut(500);
        $('.black-modal').fadeOut(500);
    });
    $('.close-popup').click(() => {
        $('#add-account-popup').fadeOut(500);
        $('.black-modal').fadeOut(500);
    });
    var closeAll = () => {
        $('#tab1').hide();
        $('#tab2').hide();
        $('#tab3').hide();
        $('#tab-btn1').removeClass('active');
        $('#tab-btn2').removeClass('active');
        $('#tab-btn3').removeClass('active');
    }
    $('#tab-btn1').click(() => {
        closeAll();
        $('#tab1').show();
        $('#tab-btn1').addClass('active');
    });
    $('#tab-btn2').click(() => {
        closeAll();
        $('#tab2').show();
        $('#tab-btn2').addClass('active');
    });
    $('#tab-btn3').click(() => {
        closeAll();
        $('#tab3').show();
        $('#tab-btn3').addClass('active');
    });
        
});