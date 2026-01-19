import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { CodjoeProvider, useCodjoeData } from './context/CodjoeContext';
import Navbar from './components/Navbar';
import HomeHead from './components/HomeHead';
import BestSellers from './components/BestSellers';
import PerfectMix from './components/PerfectMix';
import Product from './components/Product';
import List from './views/List';
import Home from './views/Home';
import ShoppingCart from './views/ShoppingCart';
import Login from './components/Login';
import Signup from './components/Signup';
import Backoffice from './views/Backoffice';
import CJStats from './components/backOffice/CJStats';
import CJProducts from './components/backOffice/CJProducts';
import CJUsers from './components/backOffice/CJUsers';
import CJBestSellers from './components/backOffice/CJBestSellers';
import { ProtectedRoute, ProtectedAdminRoute } from './components/ProtectedRoute';
import Payment from './views/Payment';
import AfterPay from './views/AfterPay';
import Orders from './views/Orders';
import Footer from './components/Footer';
import Legal from './views/Legal';
import LegalNotice from './components/legal/LegalNotice';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import Terms from './components/legal/Terms';
import Accessories from './views/Accessories';
import Collections from './views/Collections';
import LimitedEdition from './views/LimitedEdition';


const App = () => {

  // const { isLoggedIn } = useCodjoeData();
  // const [user, setUser] = useState('')

  return (
    <Router>
      <CodjoeProvider>
        <div className="z-0 bg-white">
          <Navbar />
          {/* <Navbar setUser={setUser} /> */}
          {/* {isLoggedIn && <LoginModal />} */}
          {/* <div className='bg-home-head h-0 pt-[116%] w-screen bg-contain bg-no-repeat max-w-full mt-20'>
          <HomeHead />
        </div>
        <BestSellers />
        <PerfectMix /> */}

          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/list" element={<List />} />
            <Route key={"tops"} exact path="/list/tops" element={<List categoryName={'Tops'} />} />
            <Route key={"bottoms"} exact path="/list/bottoms" element={<List categoryName={'Bottoms'} />} />
            <Route key={"accessories"} exact path="/list/accessories" element={<Accessories />} />
            <Route key={"collections"} exact path="/list/collections" element={<Collections />} />
            <Route key={"limitedEdition"} exact path="/list/limited-edition" element={<LimitedEdition />} />
            {/* <Route key={"bestSellers"} exact path="/list/bestSellers" element={<List categoryName={'Best sellers'}/>}/> */}
            <Route path="/product/:id" element={<Product />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <ShoppingCart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/succesfulPay"
              element={
                <ProtectedRoute>
                  <AfterPay />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route
              path='/legal-info'
              element={<Legal />}
            >
              <Route path='legal-notice' element={<LegalNotice />} />
              <Route path='privacy-policy' element={<PrivacyPolicy />} />
              <Route path='terms' element={<Terms />} />
            </Route>

            <Route
              path='/backOffice'
              element={
                <ProtectedAdminRoute>
                  <Backoffice />
                </ProtectedAdminRoute>
              }
            >
              <Route path='stats' element={<CJStats />} />
              <Route path='products' element={<CJProducts />} />
              <Route path='users' element={<CJUsers />} />
              <Route path='bestSellers' element={<CJBestSellers />} />
            </Route>

            <Route
              path='*'
              element={
                <Home />
              }
            />
          </Routes>
          <Footer />
        </div>
      </CodjoeProvider>
    </Router>
  )
}

export default App

{/* <div className='bg-home-head bg-cover bg-center w-full h-52'> */ }
{/* <div className='bg-home-head bg-cover w-full h-[56vh] max-h-full object-scale-down bg-center mt-20'> */ }