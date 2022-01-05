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
    });
    $('.add-user-btn').click(() => {
        $('#add-user-popup').fadeIn(500);
        $('.black-modal').fadeIn(500);
    })
    $('.close-popup').click(() => {
        $('#add-user-popup').fadeOut(500);
        $('.black-modal').fadeOut(500);
        closeAll();
    });
    $('.black-modal').click(() => {
        $('#add-user-popup').fadeOut(500);
        $('.black-modal').fadeOut(500);
        closeAll();
    });
    
    var usersLength = parseInt(document.getElementById('users-length').textContent);
    var usersInfo = [];
    for(var i=0; i<usersLength; i++){
        usersInfo.push({btn: $(`#user-btn-${i}`), view: $(`#user-info-popup-${i}`)});
    }
    usersInfo.forEach(usr => {
        usr.btn.click(() => {
            closeAll();
            $('.black-modal').fadeIn(500);
            usr.view.fadeIn(500);
        });
    });
    var closeAll = () => {
        for(var i=0; i<usersLength; i++)
            usersInfo[i].view.fadeOut(500);
    }
});