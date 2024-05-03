import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner/Banner'
import RowCard from '../components/RowCard/RowCard'
import { actionMovies, adventureMovies, animationMovies, comedyMovies, crimeMovies, fantasyMovies } from '../urls/urls'
import Preloader from '../components/Preloader/Preloader';
import axios from '../axios/axios'

const Movies = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {

    try {
      setLoading(true);
      await Promise.all([
        axios.get(adventureMovies),
        axios.get(actionMovies),
        axios.get(animationMovies),
        axios.get(comedyMovies),
        axios.get(fantasyMovies),
        axios.get(crimeMovies)

      ])
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (

    <div className='movies_section'>
      {
        loading && (
          <>
            <Preloader />
            <Banner />
            <RowCard />
            <RowCard />
            <RowCard />
            <RowCard />
            <RowCard />
            <RowCard />
          </>
        
       )
      }

      {
        !loading && (
          <>
            <Banner url={adventureMovies} />
            <RowCard title='action' url={actionMovies} />
            <RowCard title='adventure' url={adventureMovies} />
            <RowCard title='animation' url={animationMovies} />
            <RowCard title='comedy' url={comedyMovies} />
            <RowCard title='fantasy' url={fantasyMovies} />
            <RowCard title='crime' url={crimeMovies} />
          </>

        )
      }

    </div>
  )
}

export default Movies
