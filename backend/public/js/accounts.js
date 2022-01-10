function search() {
    // alert('hello');
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    // console.log(tr);
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1].getElementsByTagName("h1")[0];
        td2 = tr[i].getElementsByTagName("td")[2].getElementsByTagName("h1")[0];
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

function showAccount(accountType){
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0].getElementsByTagName("div")[1];
        // console.log(td);
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue == accountType) {
                tr[i].style.display = "";
            }
        }       
    }
}
function hideAccount(accountType){
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0].getElementsByTagName("div")[1];
        // console.log(td);
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue == accountType) {
                tr[i].style.display = "none";
            }
        }       
    }
}

function chahCheck()
{
    console.log(document.getElementById('check-chah'))
    if (document.getElementById('check-chah').checked) 
    {
        showAccount('chah');
    } else {
        hideAccount('chah');
    }  
}
function chahvandiCheck()
{
    console.log(document.getElementById('check-chahvandi'))
    if (document.getElementById('check-chahvandi').checked) 
    {
        showAccount('chahvandi');
    } else {
        hideAccount('chahvandi');
    }  
}
function abvandiCheck()
{
    console.log(document.getElementById('check-abvandi'))
    if (document.getElementById('check-abvandi').checked) 
    {
        showAccount('abvandi');
    } else {
        hideAccount('abvandi');
    }  
}

$(document).ready(function(){
    // $('#link3').addClass('active');
    $('#tab2').hide();
    $('#tab3').hide();
    $('#add-account-btn').click(() => {
        $('#add-account-popup').fadeIn(500);
        $('.black-modal').fadeIn(500);
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
    $('#transmission-source').click(() => {
        $('.black-modal').fadeIn(500);
        $('#select-source-popup').fadeIn(500);
    })
    $('#transmission-target').click(() => {
        $('.black-modal').fadeIn(500);
        $('#select-target-popup').fadeIn(500);
    })
    $('.black-modal').click(() => {
        $('#add-account-popup').fadeOut(500);
        $('.black-modal').fadeOut(500);
        $('#select-source-popup').fadeOut(500);
        $('#select-target-popup').fadeOut(500);
    });
    $('.close-popup').click(() => {
        $('#add-account-popup').fadeOut(500);
        $('.black-modal').fadeOut(500);
        $('#select-source-popup').fadeOut(500);
        $('#select-target-popup').fadeOut(500);
    });
    var accountsLength = parseInt(document.getElementById('accounts-length').textContent);
    var selectAccounts = [];
    for (let i = 0; i < accountsLength; i++) {
        selectAccounts.push({
            id: i,
            sourceOption: $(`#option-source-${i}`),
            targetOption: $(`#option-target-${i}`),
        });
    }
    selectAccounts.forEach(option => {
        option.sourceOption.click(() => {
            $('.black-modal').fadeOut(500);
            $('#select-source-popup').fadeOut(500);
            $('#select-target-popup').fadeOut(500);
        });
        option.targetOption.click(() => {
            $('.black-modal').fadeOut(500);
            $('#select-source-popup').fadeOut(500);
            $('#select-target-popup').fadeOut(500);
        });
    });
});