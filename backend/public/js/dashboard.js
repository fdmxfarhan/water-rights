$(document).ready(function(){
    $('#link1').addClass('active');

    $('.close-success-msg').click(() => {
        $('.success-msg').slideUp(500);
    });
    $('.close-notif-msg').click(() => {
        $('.notif-msg').slideUp(500);
    });
    $('#link1').addClass('active');
    $('.more-notif-btn').click(() => {
        $('.notifications.seen.hidden').slideDown(500);
        $('.more-notif-btn').hide();
    })
});