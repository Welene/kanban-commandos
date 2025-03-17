import {
	getDataFromLocalStorage,
	saveDataToLocalStorage,
} from '../data/localStorage.js';

function runOrderOverviewPage() {
	const myData = getDataFromLocalStorage('users');

	myData.forEach((user) => {
		console.log(user.username);
		console.log(user.receipts);
		user.receipts.forEach((receipt) => {
			console.log(receipt.foodTruck);
		});
		console.log('----');
	});
}

/* 
* Behöver localStorage som sparar alla kvitton

* Behöver localStorage som även sparar foodtruck

users -> varje users -> receipts -> spara varje receipt -> kolla vilken foodTruck om användes

*/

/* const newUsers = [
		{
			username: 'jesperdaking',
			password: 'fisnils123',
			role: 'admin',
			email: 'jesper123@airbean.com',
			profile_image: 'https://randomuser.me/api/portraits/men/1.jpg',
			receipts: [
				{
					id: '#rz07pq8',
					foodTruck: 'truck2',
					items: [{ id: 2, name: 'Bangkok', amount: 1, price: 9 }],
				},
			],
		},

		{
			username: 'bradpitt',
			password: 'fightclub9',
			role: 'user',
			email: 'bradpitt@coffeeclique.com',
			profile_image: 'https://randomuser.me/api/portraits/men/2.jpg',
			receipts: [
				{
					id: '#7z2gz58',
					foodTruck: 'truck1',
					items: [{ id: 1, name: 'Karlstad', amount: 1, price: 9 }],
				},
				{
					id: '#g42jbr',
					foodTruck: 'truck3',
					items: [
						{ id: 2, name: 'Bangkok', amount: 2, price: 9 },
						{ id: 1, name: 'Karlstad', amount: 1, price: 9 },
						{ id: 3, name: 'Ho Chi Minh', amount: 1, price: 9 },
					],
				},
			],
		},
		{
			username: 'fotbollskungen',
			password: 'legomast3r',
			role: 'user',
			email: 'fotbollskungen@brewbuddies.com',
			profile_image: 'https://randomuser.me/api/portraits/men/3.jpg',
			receipts: [
				{
					id: '#7z2gz58',
					foodTruck: 'truck1',
					items: [{ id: 1, name: 'Karlstad', amount: 1, price: 9 }],
				},
				{
					id: '#2iu9hjq',
					foodTruck: 'truck3',
					items: [
						{ id: 1, name: 'Karlstad', amount: 1, price: 9 },
						{ id: 2, name: 'Bangkok', amount: 1, price: 9 },
						{ id: 3, name: 'Ho Chi Minh', amount: 1, price: 9 },
					],
				},
				{
					id: '#9976l2r',
					foodTruck: 'truck3',
					items: [
						{ id: 2, name: 'Bangkok', amount: 2, price: 9 },
						{ id: 1, name: 'Karlstad', amount: 1, price: 9 },
						{ id: 3, name: 'Ho Chi Minh', amount: 1, price: 9 },
					],
				},
				{
					id: '#w0x3a6g',
					foodTruck: 'truck2',
					items: [
						{ id: 2, name: 'Bangkok', amount: 4, price: 9 },
						{ id: 1, name: 'Karlstad', amount: 5, price: 9 },
						{ id: 3, name: 'Ho Chi Minh', amount: 3, price: 9 },
						{ id: 5, name: 'Oaxaca', amount: 4, price: 9 },
						{ id: 4, name: 'Paris', amount: 2, price: 9 },
						{ id: 12, name: 'Sprite', amount: 1, price: 19 },
					],
				},
				{
					id: '#ke8qxvc',
					foodTruck: 'truck2',
					items: [{ id: 1, name: 'Karlstad', amount: 1, price: 9 }],
				},
				{
					id: '#isefu7q',
					foodTruck: 'truck3',
					items: [
						{ id: 1, name: 'Karlstad', amount: 1, price: 9 },
						{ id: 4, name: 'Paris', amount: 1, price: 9 },
						{ id: 8, name: 'Guacamole', amount: 1, price: 19 },
					],
				},
			],
		},
]; */

export { runOrderOverviewPage };
