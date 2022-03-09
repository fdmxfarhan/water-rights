$(document).ready(function(){ 
    var serverLogsLength = parseInt(document.getElementById('serverlogs-length').textContent);
    var serverLogs = [];
    for(var i=0; i<serverLogsLength; i++){
        serverLogs.push({
            btn: $(`#log-button-${i}`),
            detail: $(`#log-detail-${i}`),
            id: i,
        })
    }
    serverLogs.forEach(log => {
        log.btn.click(() => {
            log.detail.slideToggle(500);
        })
    });
});