function search() {
    // alert('hello');
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    // console.log(tr);
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0].getElementsByTagName("h1")[0];
        td2 = tr[i].getElementsByTagName("td")[0].getElementsByTagName("h2")[0];
        // console.log(td);
        if (td) {
            txtValue = td.textContent || td.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            if (txtValue.indexOf(filter) > -1 || txtValue2.indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
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