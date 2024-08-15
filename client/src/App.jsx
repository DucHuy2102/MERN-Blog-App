import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    Home_Page,
    About_Page,
    SignIn_Page,
    SignUp_Page,
    Dashboard_Page,
    Projects_Page,
    CreatePost_Page,
} from './pages/exportPage';
import {
    AdminRoute,
    Footer_Component,
    Header_Component,
    PrivateRoute,
} from './components/exportComponent';

export default function App() {
    return (
        <Router>
            <Header_Component />
            <Routes>
                {/* route for user */}
                <Route path='/' element={<Home_Page />} />
                <Route path='/sign-in' element={<SignIn_Page />} />
                <Route path='/sign-up' element={<SignUp_Page />} />
                <Route path='/about' element={<About_Page />} />
                <Route path='/projects' element={<Projects_Page />} />
                <Route element={<PrivateRoute />}>
                    <Route path='/dashboard' element={<Dashboard_Page />} />
                </Route>

                {/* route for admin */}
                <Route element={<AdminRoute />}>
                    <Route path='/create-post' element={<CreatePost_Page />} />
                </Route>
            </Routes>
            <Footer_Component />
        </Router>
    );
}
