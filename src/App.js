import React from 'react';
import './App.css';
import jsonLocalStorage from './utils/jsonLocalStorage';
import fetchCat from './utils/fetchCat';
import Title from './components/Title';
import MainCard from './components/Maincard';
import Form from './components/Form';
import Favorites from './components/Favorites';

const App = () => {
	const CAT1 = 'https://cataas.com/cat/60b73094e04e18001194a309/says/react';

	const [counter, setCounter] = React.useState(() => {
		return jsonLocalStorage.getItem('counter');
	});
	const [mainCat, setMainCat] = React.useState(CAT1);
	const [favorites, setFavorites] = React.useState(() => {
		return jsonLocalStorage.getItem('favorites') || [];
	});

	const alreadyFavorite = favorites.includes(mainCat);

	async function setInitialCat() {
		const newCat = await fetchCat('First cat');
		setMainCat(newCat);
	}

	React.useEffect(() => {
		setInitialCat();
	}, []);

	async function updateMainCat(value) {
		const newCat = await fetchCat(value);

		setMainCat(newCat);

		setCounter((prev) => {
			const nextCounter = prev + 1;
			jsonLocalStorage.setItem('counter', nextCounter);
			return nextCounter;
		});
	}

	function handleHeartClick() {
		const nextFavorites = [...favorites, mainCat];
		setFavorites(nextFavorites);
		jsonLocalStorage.setItem('favorites', nextFavorites);
	}

	const counterTitle = counter === null ? '' : counter + '번째 ';

	return (
		<div>
			<Title>{counterTitle}고양이 가라사대</Title>
			<Form updateMainCat={updateMainCat} />
			<MainCard
				img={mainCat}
				onHeartClick={handleHeartClick}
				alreadyFavorite={alreadyFavorite}
			/>
			<Favorites favorites={favorites} />
		</div>
	);
};

export default App;
