function runEtaPage() {
    clickEtaBtns()
}

export { runEtaPage };

function clickEtaBtns () {
    let newOrderBtn = document.getElementById('newOrderBtn');
    let receiptBtn = document.getElementById('receiptBtn');


    // event listener on both buttons to navigate to the correct page
    if (newOrderBtn) {
        newOrderBtn.addEventListener('click', () => {
            window.location.href = '../pages/menu.html';
            console.log('Navigated to menu.html after clicking New Order button');
        });
    }

    if (receiptBtn) {
        receiptBtn.addEventListener('click', () => {
            window.location.href = '../pages/receipt.html';
            console.log('Navigated to receipt.html after clicking Show Receipt button');
        });
    }
}

// TLDR: getting basket from localStorage -- setting 0 as start time -- if basket has more than 0 items = use reduce (reduces all items/item times to one combined Eta time) 
// -- adds one item AKA 1 min to totalEta at a time, tells it to start at 0 -- returns totalEta which we can put into `${etaMinutes}` later. -- catches error if there are 
// no food items = returns 0 (minutes)
function calculateEta() {
    try {
        let basket = JSON.parse(localStorage.getItem("basket")); 
        let totalEta = 0; 
        if (basket.items.length > 0) { 
            totalEta += basket.items.reduce((sum, item) => sum + item.amount, 0); 
        }
        return totalEta;

    } catch (error) {
        console.log("No orders found, 0 minutes", error);
        return 0; 
    }
}



function display etaText () {
    document.getElementById("etaText").textContent = `ETA ${etaMinutes} MIN`;
}

function display receiptNumber () {
document.getElementById("receiptNumber").textContent = `#${receiptNumber}`;
}