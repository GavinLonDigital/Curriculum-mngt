import React, {useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCirclePlay} from '@fortawesome/free-solid-svg-icons';
import Spinner from '../spinner/Spinner';

const EnrolledCourses = () => {
    const {auth,setAuth} = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [courseData, setCourseData] = useState();
  
    const axiosPrivate = useAxiosPrivate();
  
    const fetchCourses = async () => {
      setIsLoading(true);
      const response = await axiosPrivate.get("/api/v1/enrollments/");
  
      const cData = response.data;
  
      setCourseData(cData);
      setIsLoading(false);
  
    }
    useEffect(() => {
      if(auth?.user){
        fetchCourses();
      }
    },[])
    return (
        <>
        <Spinner loadSpinner={isLoading}/>
        <main className = "container">    
          {
              (courseData)?
              courseData.map((d)=> {
                return (
                  <div key={d.identifier} className="card mt-2">
                      <div>
                        <p className="card-header text-secondary bg-white">
                          <span className='course-title'>
                            <Link to = {`/Course/${d.identifier}`}>
                              {d.title}
                            </Link>
                          </span>
                        </p>
    
                      </div>
                      <div>
                        <hr />
                        {
                            d.lessons.map((l) => {
                              return (
                                <div key={l.identifier} className="mt-2 text-center">
                                  <h5 className="card-title mt-2">
                                    <span className="text-dark">{l.title}</span>
                                    &nbsp;
                                    <span>
                                        <Link to={`/Video/${l.identifier}`}>
                                            <FontAwesomeIcon className="play-button-icon"
                                                icon = {faCirclePlay}
                                            
                                            />

                                        
                                        </Link>
                                    </span>
                                  </h5>    
                                </div>
                              )
                            })
                        }
                      </div>
                      <hr />
    
                  </div>
    
                )
    
              })
    
              :
                null
          }
          
        </main>
        </>
      )
      
}

export default EnrolledCourses
