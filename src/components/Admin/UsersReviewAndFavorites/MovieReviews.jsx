import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import './MovieReviews.css'
import axios from '../../../axios/axios';





const MovieReviews = () => {
    const [reviews, setReviews] = useState([])
    const { userId } = useParams()

    useEffect(() => {
        const token = localStorage.getItem("jwt_token")
        const fetchData = async () => {
            try {
                const response = await axios.get(`/admin/users/${userId}/reviews`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                setReviews(response.data)
            } catch (error) {
                console.log("Fetching error: ", error)

            }

        }

        fetchData()
    }, [])

    return (
        <section className='movieReviews_section py-2'>
            <Container>
                <div className="review_container px-3 py-3">
                    <div className="main_header">
                        <h1 className='text-capitalize'>List of reviews</h1>
                    </div>

                    {
                        reviews && reviews.map((review) => {
                            return (
                                <div className="review_content mt-5" key={review.id}>
                                    <h2 className='review_header mt-2'>{review.mediaTitle}</h2>
                                    <p className='review_para mt-2 px-0 py-2'>{review.content}</p>
                                </div>
                            )
                        })
                    }
                    

                </div>
            </Container>
        </section>
    )
}

export default MovieReviews
