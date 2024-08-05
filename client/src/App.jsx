import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    Home_Page,
    About_Page,
    SignIn_Page,
    SignUp_Page,
    Dashboard_Page,
    Projects_Page,
} from './pages/exportPage';
import { Footer_Component, Header_Component } from './components/exportComponent';

export default function App() {
    return (
        <Router>
            <Header_Component />
            <Routes>
                <Route path='/' element={<Home_Page />} />
                <Route path='/about' element={<About_Page />} />
                <Route path='/sign-in' element={<SignIn_Page />} />
                <Route path='/sign-up' element={<SignUp_Page />} />
                <Route path='/dashboard' element={<Dashboard_Page />} />
                <Route path='/projects' element={<Projects_Page />} />
            </Routes>
            <Footer_Component />
        </Router>
    );
}
