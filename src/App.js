import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Register from './components/register/Register';
import Login from './components/login/Login';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Course from './components/course/Course';
import EnrolledCourses from './components/enrolledCourses/EnrolledCourses';
import RequiredAuth from './components/RequiredAuth';
import Video from './components/video/Video';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/Register" element={<Register/>}></Route>
              <Route path="/Login" element={<Login/>}></Route>
              <Route path = "/Course/:identifier" element = {<Course/>}></Route>
              <Route path = "/Video/:ytId" element={<Video/>}></Route>
              <Route element ={<RequiredAuth/>}>
                <Route path = "/EnrolledCourses" element={<EnrolledCourses/>}></Route>
              </Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;
