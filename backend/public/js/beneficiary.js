$(document).ready(function(){
    var usersLength = parseInt(document.getElementById('users-length2').textContent);
    var beneficiaries = [];
    var cnt = 1;
    for(var i=0; i<usersLength; i++){
        beneficiaries.push({
            addButton: $(`#add-beneficiary${i}`),
            addButtonElement: document.getElementById(`add-beneficiary${i}`),
            container: document.getElementById(`beneficiaries${i}`),
            sample: document.getElementById(`sample-beneficiary${i}`),
            id: i,

        })
    }

    beneficiaries.forEach(b => {
        b.addButton.click(() => {
            var row = b.sample.cloneNode(true);
            row.classList.remove("hidden");
            row.classList.remove("sample-beneficiary");
            row.classList.add("beneficiary");
            b.container.appendChild(row);
            // var addButton = b.addButtonElement.cloneNode(true);
            // b.addButtonElement.remove();
            // b.container.appendChild(addButton);
            row.id = '';
            console.log(b.container.childNodes);
        });
    });
});