let billsDiv = document.querySelector('#bills')

function getBills()
{
    fetch('http:localhost:3000/bills?sortBy=createdAt:desc')
    .then(function(response){
        return response.json()
    })
    .then(function(bills){
        bills.forEach(bill => {
            const div = document.createElement('div');
            div.innerHTML = bill.meterNumber
            billsDiv.appendChild(div)
        });
    })
}

getBills()




