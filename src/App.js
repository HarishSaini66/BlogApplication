import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './Components/Base';
import About from './Pages/About';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Services from './Pages/Services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './Pages/user-routes/UserDashboard';
import PrivateRoute from './Components/PrivateRoute';
import ProfileInfo from './Pages/user-routes/ProfileInfo';
import PostPage from './Pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './Pages/Categories';
import UpdateBlog from './Pages/UpdateBlog';
function App() {
  // libraries that we have used in the projects reactstrap,axois,react-toastify,jodit react- for rich text editor
  return (
    <UserProvider>
      <Router>
        <ToastContainer position='bottom-center' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path='/categories/:categoryId' element={<Categories />} />

          <Route path="/user" element={<PrivateRoute />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile-info/:userId" element={<ProfileInfo />} />
            <Route path="update-blog/:blogId" element={<UpdateBlog />} />

          </Route>


        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
