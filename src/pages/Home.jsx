import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner/Banner';
import RowCard from '../components/RowCard/RowCard';
import { newlyAddedMovies, nowPlayingMovies, popularMovies, topRatedMovies } from '../urls/urls';
import NewlyAddedMovies from '../components/NewlyAddedMovies/NewlyAddedMovies';
import Preloader from '../components/Preloader/Preloader';
import axios from 'axios';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {
      setLoading(true);
      await Promise.all([
        axios.get(popularMovies),
        axios.get(topRatedMovies),
        axios.get(nowPlayingMovies),
        axios.get(newlyAddedMovies)
      ])
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div className='home'>
      {loading && (
        <>
          <Preloader />
          <Banner />
          <RowCard />
          <RowCard />
          <RowCard />
          <NewlyAddedMovies />
        </>
      )}

      {!loading && (
        <>
          <Banner url={popularMovies} />
          <RowCard title='Popular' url={popularMovies} />
          <RowCard title='Trending' url={topRatedMovies} />
          <RowCard title='Top-Rated' url={nowPlayingMovies} />
          <NewlyAddedMovies title='Newly Added' url={newlyAddedMovies} />
        </>
      )}
    </div>
  );
};

export default Home;
