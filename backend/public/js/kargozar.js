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
        usersInfo.push({
            id: i,
            btn: $(`#user-btn-${i}`), 
            view: $(`#user-info-popup-${i}`),
            phone: $(`#phone-${i}`),
            smsButton: $(`#sms-btn-${i}`),
            smsButton2: $(`#sms-btn2-${i}`),
            smsPanel: $(`#sms-panel-${i}`),
            smsPanelDoc: document.getElementById(`sms-panel-doc-${i}`),
            fileInputOverlay: $(`#file-input-overlay-${i}`),
            fileInput: $(`.file-input-${i}`),
            fileName: $(`#file-name-${i}`),
            fileCheck: $(`#file-check-${i}`),
            notifButton: $(`#notif-user-btn-${i}`),
            state1select: $(`#state-1-select-${i}`),
            state2select: $(`#state-2-select-${i}`),
            state3select: $(`#state-3-select-${i}`),
            state4select: $(`#state-4-select-${i}`),
            state5select: $(`#state-5-select-${i}`),
            state1view: $(`#state-1-view-${i}`),
            state2view: $(`#state-2-view-${i}`),
            state3view: $(`#state-3-view-${i}`),
            state4view: $(`#state-4-view-${i}`),
            state5view: $(`#state-5-view-${i}`),
            state6view: $(`#state-6-view-${i}`),
        });
    }
    usersInfo.forEach(usr => {
        usr.btn.click(() => {
            // closeAll();
            $('.black-modal').fadeIn(500);
            usr.view.fadeIn(500);
        });
        usr.notifButton.click(() => {
            closeAll();
            $('.black-modal').fadeIn(500);
            usr.view.fadeIn(500);
        });
        usr.smsButton.click(() => {
            usr.smsPanel.slideDown(500);
            usr.smsPanelDoc.scrollTop = usr.smsPanelDoc.scrollHeight;
        });
        usr.smsButton2.click(() => {
            usr.smsPanel.slideDown(500);
            usr.smsPanelDoc.scrollTop = usr.smsPanelDoc.scrollHeight;
        });
        usr.fileInput.change(() => {
            var fullPath = usr.fileInput.val()
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var fileName = fullPath.substring(startIndex+1);
            usr.fileName.html(fileName);
            usr.fileCheck.show();
        });
        usr.state1select.click(() => {
            usr.state1select.addClass('selected');
            usr.state2select.removeClass('selected');
            usr.state3select.removeClass('selected');
            usr.state4select.removeClass('selected');
            usr.state5select.removeClass('selected');
            usr.state1view.show();
            usr.state2view.hide();
            usr.state3view.hide();
            usr.state4view.hide();
            usr.state5view.hide();
            usr.state6view.hide();
        })
        usr.state2select.click(() => {
            usr.state2select.addClass('selected');
            usr.state1select.removeClass('selected');
            usr.state3select.removeClass('selected');
            usr.state4select.removeClass('selected');
            usr.state5select.removeClass('selected');
            usr.state2view.show();
            usr.state1view.hide();
            usr.state3view.hide();
            usr.state4view.hide();
            usr.state5view.hide();
            usr.state6view.hide();
        })
        usr.state3select.click(() => {
            usr.state3select.addClass('selected');
            usr.state2select.removeClass('selected');
            usr.state1select.removeClass('selected');
            usr.state4select.removeClass('selected');
            usr.state5select.removeClass('selected');
            usr.state3view.show();
            usr.state2view.hide();
            usr.state1view.hide();
            usr.state4view.hide();
            usr.state5view.hide();
            usr.state6view.hide();
        })
        usr.state4select.click(() => {
            usr.state4select.addClass('selected');
            usr.state2select.removeClass('selected');
            usr.state3select.removeClass('selected');
            usr.state1select.removeClass('selected');
            usr.state5select.removeClass('selected');
            usr.state4view.show();
            usr.state2view.hide();
            usr.state3view.hide();
            usr.state1view.hide();
            usr.state5view.hide();
            usr.state6view.hide();
        })
        usr.state5select.click(() => {
            usr.state5select.addClass('selected');
            usr.state2select.removeClass('selected');
            usr.state3select.removeClass('selected');
            usr.state4select.removeClass('selected');
            usr.state1select.removeClass('selected');
            usr.state5view.show();
            usr.state2view.hide();
            usr.state3view.hide();
            usr.state4view.hide();
            usr.state1view.hide();
            usr.state6view.hide();
        })
        
    });
    $('.close-sms').click(() => {
        for(var i=0; i<usersLength; i++)
            usersInfo[i].smsPanel.fadeOut(500);
    })
    $(document).keyup(function(e) {
        if (e.key === "Escape") {
           closeAll();
            $('.black-modal').fadeOut(500);
       }
   });
    var closeAll = () => {
        for(var i=0; i<usersLength; i++)
            usersInfo[i].view.fadeOut(500);
        for(var i=0; i<usersLength; i++)
            usersInfo[i].smsPanel.fadeOut(500);
    }
});
