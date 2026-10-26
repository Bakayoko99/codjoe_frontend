import { useState, Suspense, lazy } from 'react';
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
import { ProtectedRoute, ProtectedAdminRoute } from './components/ProtectedRoute';
import AfterPay from './views/AfterPay';
import Orders from './views/Orders';
import Account from './views/Account';
import Footer from './components/Footer';
import Legal from './views/Legal';
import Accessories from './views/Accessories';
import Collections from './views/Collections';
import LimitedEdition from './views/LimitedEdition';
import CookieBanner from './components/CookieBanner';

// Chargées à la demande (code-splitting) : le paiement embarque le SDK Stripe (~270 Ko,
// chargé dès l'import du module via loadStripe()), le back-office ne concerne que les
// administrateurs, et les pages légales sont volumineuses. Les séparer évite que ce code
// soit téléchargé et exécuté sur la page d'accueil, où il n'est jamais utilisé
// (relevé par PageSpeed Insights : ~290 Ko de JS inutilisé sur `/`).
const Payment = lazy(() => import('./views/Payment'));
const Backoffice = lazy(() => import('./views/Backoffice'));
const CJStats = lazy(() => import('./components/backOffice/CJStats'));
const CJProducts = lazy(() => import('./components/backOffice/CJProducts'));
const CJUsers = lazy(() => import('./components/backOffice/CJUsers'));
const CJOrders = lazy(() => import('./components/backOffice/CJOrders'));
const CJBestSellers = lazy(() => import('./components/backOffice/CJBestSellers'));
const LegalNotice = lazy(() => import('./components/legal/LegalNotice'));
const PrivacyPolicy = lazy(() => import('./components/legal/PrivacyPolicy'));
const Terms = lazy(() => import('./components/legal/Terms'));

const RouteFallback = () => (
  <div className='min-h-[60vh] flex items-center justify-center'>
    <div className="w-12 h-12 border-4 border-gray-200 border-t-[#C29F75] rounded-full animate-spin" role="status" aria-label="Chargement"></div>
  </div>
);


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

          <Suspense fallback={<RouteFallback />}>
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
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
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

            {/* Route directe pour le lien du CookieBanner (C25 RGPD) */}
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />

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
              <Route path='orders' element={<CJOrders />} />
              <Route path='bestSellers' element={<CJBestSellers />} />
            </Route>

            <Route
              path='*'
              element={
                <Home />
              }
            />
          </Routes>
          </Suspense>
          <Footer />
          <CookieBanner />
        </div>
      </CodjoeProvider>
    </Router>
  )
}

export default App

{/* <div className='bg-home-head bg-cover bg-center w-full h-52'> */ }
{/* <div className='bg-home-head bg-cover w-full h-[56vh] max-h-full object-scale-down bg-center mt-20'> */ }