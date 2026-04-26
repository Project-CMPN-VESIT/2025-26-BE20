import { Route, Routes } from "react-router-dom";
import Register from "../app/auth/views/Register";
import VerifyOtp from "../app/auth/views/otp";
import Login from "../app/auth/views/Login";
import ResetPassword from "../app/auth/views/ResetPassword";
import ForgotPassword from "../app/auth/views/ForgotPassword";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import LandingPage from "../app/landing-page/LandingPage";
import PricingPage from "../app/pricing/PricingPage";
import SidebarTopbarLayout from './../layouts/SidebarTopbarLayout';
import MyTemplatesPage from "../app/templates/views/MyTemplatesPage";
import CreateTemplateForm from "../app/templates/views/CreateTemplateForm";
import ChooseTemplate from './../app/templates/views/ChooseTemplate';
import DragDrop from "../app/templates/views/DragDrop";
import FinalLayout from "../app/dashboard/views/FinalLayout";
import SubscriberPage from "../app/subscribers/components/SubscriberPage";
import AddSubscriber from "../app/subscribers/components/AddSubscriber";
import AddSingleSubscriber from "../app/subscribers/components/AddSingleSubscriber";
import Segment from "../app/subscribers/components/Segment";
import SegmentCategory from "../app/subscribers/components/SegmentCategory";
import Fields from "../app/subscribers/components/Fields";
import CampaignPage from "../app/campaign/components/CampaignPage";
import CreateCampaign from "../app/campaign/components/CreateCampaign";
import CampaignReview from "../app/campaign/components/CampaignReview";
import DraftCampaign from "../app/campaign/components/DraftCampaign";
import CompletedCampaign from "../app/campaign/components/CompletedCampaign";
import Settings from "../app/account-settings/Settings";
import SettingsLayout from "../layouts/SettingsLayout";
import Domains from "../app/account-settings/domains/Domains";
import FormsNav from "../app/forms/FormsNav";
import PageNotFound from "../app/PageNotFound/PageNotFound";
import ProfilePage from "../app/profile/ProfilePage"
import TeamPage from "../app/invitations/TeamPage.jsx"
import AcceptInvitation from "../app/invitations/AcceptInvitation.jsx";
import PrivacyPolicyPage from "../app/privacy-policy/PrivacyPolicyPage.jsx";
import AboutUsPage from "../app/about/AboutUsPage.jsx";
import TermsPage from "../app/terms/TermsPage.jsx";
import Contact from "../app/contact/ContactPage.jsx";
import PublicRoute from "./PublicRoute.jsx";
import DefaultSettings from "../app/account-settings/DefaultSettings";
import Dashboard from "../app/dashboard/views/Dashboard.jsx";
import ScheduledCampaign from "../app/campaign/components/ScheduledCampaign.jsx";

const AppRoutes = ({ darkMode, onDarkModeChange, setDarkMode }) => {
  return (
    <Routes>
      <Route element={<PublicRoute/>}>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/otp"} element={<VerifyOtp />} />
        <Route path={"/reset-password"} element={<ResetPassword />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
      </Route>


      <Route
        path="/"
        element={
          <LandingPage
            darkMode={darkMode}
            onDarkModeChange={onDarkModeChange}
          />
        }
      />
      <Route path="/pricing" element={ <PricingPage />} />
      <Route path="/privacy_policy" element={ <PrivacyPolicyPage />}/>
      <Route path='/about' element={<AboutUsPage />}/>
      <Route path='/contact' element={<Contact />}/>
      <Route path="/terms" element={<TermsPage />}/>
      <Route element={
        <ProtectedRoute component={<SidebarTopbarLayout />}/>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscribers" element={<SubscriberPage />} />
        <Route path="/subscribers/add" element={<AddSubscriber />} />
        <Route path="/subscribers/addSingleSubscriber" element={<AddSingleSubscriber />} />
        <Route path="/segment" element={<Segment />} />
        <Route path="/segment/:id" element={<SegmentCategory />} />
        <Route path="/subscribers/fields" element={<Fields />} />
        <Route path="/campaigns" element={<CampaignPage />} />
        <Route path="/campaigns/create" element={<CreateCampaign /> } />
        <Route path="/campaigns/review/:id" element={<CampaignReview />} />
        <Route path="/campaigns/status/draft" element={<DraftCampaign /> } />
        <Route path="/campaigns/status/completed" element={<CompletedCampaign /> } />
        <Route path="/campaigns/status/scheduled" element={<ScheduledCampaign /> } />
        <Route path="/formsnav" element={<FormsNav />} />
        <Route element={<SettingsLayout />}>
          <Route path="/account/profile" element={<Settings />} />
          <Route path="/configuration/default" element={<DefaultSettings/>}/>
        </Route>
         <Route path="/domains" element={<Domains />} />
        <Route path="/user/profile" element={<ProfilePage darkMode={darkMode} onDarkModeChange = {onDarkModeChange} setDarkMode={setDarkMode}/>}/>
        <Route path="/templates" element={<MyTemplatesPage />} />
        <Route path="/templates/create" element={<CreateTemplateForm />} />
        <Route path="/templates/:id/starting-point" element={<ChooseTemplate />} />
        <Route path="/templates/:id/content" element = {<DragDrop />} />
        <Route
          path="/team"
          element={
            <ProtectedRoute
              allowedRoles={["workspace_admin"]}
              component={<TeamPage />}
            />
          }
        />

      </Route>

      <Route path="invitation/accept-invitation" element={<AcceptInvitation/>}/>

      <Route path="*" element={<PageNotFound />}/>
    </Routes>
  );
}
export default AppRoutes;

