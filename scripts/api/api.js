// Här ska alla API anrop skrivas

// https://santosnr6.github.io/Data/yumyumproducts.json done

// https://santosnr6.github.io/Data/yumyumusers.json

async function fetchAPI(link) {
    console.log("fetchAPI()");

    try {
        const response = await fetch(link);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        if (data.length < 1) {
            throw new Error(`Error, no data found: ${data} , ${response}`);
        }
        return data;
    } catch (error) {
        console.log("Error fetching data:", error.message);
        return [];
    }
}
// Hämtar Producs från API
async function fetchProducts() {
    const products = await fetchAPI(
        "https://santosnr6.github.io/Data/yumyumproducts.json"
    );
    return products;
}
// Hämtar Users fårn API
async function fetchUsers() {
    const users = await fetchAPI(
        "https://santosnr6.github.io/Data/yumyumusers.json"
    );
    return users;
}

export { fetchProducts, fetchUsers };
