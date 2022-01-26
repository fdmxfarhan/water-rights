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
function hideSpecialAccounts(){
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0].getElementsByTagName("div")[1];
        // console.log(td);
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue == 'mirab' || txtValue == 'abkhan') {
                tr[i].style.display = "none";
            }
        }       
    }
}
function showSpecialAccounts(){
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0].getElementsByTagName("div")[1];
        // console.log(td);
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue == 'mirab' || txtValue == 'abkhan') {
                tr[i].style.display = "";
            }
        }       
    }
}

var filterAccounts = () =>{
    var chah = document.getElementById('check-chah').checked;
    var chahvandi = document.getElementById('check-chahvandi').checked;
    var abvandi = document.getElementById('check-abvandi').checked;
    
    if(chah) showAccount('chah');
    else     hideAccount('chah');
    if(chahvandi) showAccount('chahvandi');
    else     hideAccount('chahvandi');
    if(abvandi) showAccount('abvandi');
    else     hideAccount('abvandi');
    hideSpecialAccounts();
    
}

function chahCheck()
{
    if (!document.getElementById('check-chah').checked && !document.getElementById('check-chahvandi').checked && !document.getElementById('check-abvandi').checked) {
        showAccount('chah');
        showAccount('chahvandi');
        showAccount('abvandi');
        showSpecialAccounts();
    }
    else filterAccounts();
    
}
function chahvandiCheck()
{
    if (!document.getElementById('check-chah').checked && !document.getElementById('check-chahvandi').checked && !document.getElementById('check-abvandi').checked) {
        showAccount('chah');
        showAccount('chahvandi');
        showAccount('abvandi');
        showSpecialAccounts();
    }
    else filterAccounts();
}
function abvandiCheck()
{
    if (!document.getElementById('check-chah').checked && !document.getElementById('check-chahvandi').checked && !document.getElementById('check-abvandi').checked) {
        showAccount('chah');
        showAccount('chahvandi');
        showAccount('abvandi');
        showSpecialAccounts();
    }
    else filterAccounts();
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
            sourceContent: $(`#option-source-content-${i}`).text(),
            sourceName: $(`#option-source-name-${i}`).text(),
            targetOption: $(`#option-target-${i}`),
            targetContent: $(`#option-target-content-${i}`).text(),
            targetName: $(`#option-target-name-${i}`).text(),
        });
    }
    selectAccounts.forEach(option => {
        option.sourceOption.click(() => {
            $('.black-modal').fadeOut(500);
            $('#select-source-popup').fadeOut(500);
            $('#select-target-popup').fadeOut(500);
            $('#transmission-sourceID').addClass('selected');
            document.getElementById('source-name').textContent = option.sourceName;
            document.getElementById('transmission-sourceID').value = option.sourceContent;
        });
        option.targetOption.click(() => {
            $('.black-modal').fadeOut(500);
            $('#select-source-popup').fadeOut(500);
            $('#select-target-popup').fadeOut(500);
            $('#transmission-targetID').addClass('selected');
            document.getElementById('target-name').textContent = option.targetName;
            document.getElementById('transmission-targetID').value = option.targetContent;
        });
    });



});