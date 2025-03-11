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