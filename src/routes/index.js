import HomePage from "../pages/HomePage/HomePage";
import ListingPage from "../pages/ListingPage/ListingPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ForgotPassPage from "../pages/ForgotPassPage/ForgotPassPage";
import LandsDetailPage from "../pages/LandsDetailPage/LandsDetailPage";
import Profile from "../pages/Profile/Profile";
import Changepass from "../pages/Changepass/Changepass";
import ManageListing from "../pages/ManageListing/ManageListing";
import CreateListing from "../pages/CreateListing/CreateListing";
import DetailListing from "../pages/DetailListing/DetailListing";
import DeleteListingPage from "../pages/DeletePageListing/DeletePageListing";
import EditListing from "../pages/EditListing/EditListing";
export const routes = [
    {
        path: "/",
        page: HomePage,
        isShowHeader: true,
        isShowSidebar: false
    },
    {
        path: "/listing",
        page: ListingPage,
        isShowHeader: true,
        isShowSidebar: false
    },
    {
        path: "/sign-in",
        page: SignInPage,
        isShowHeader: false,
        isShowSidebar: false
    },
    {
        path: "/sign-up",
        page: SignUpPage,
        isShowHeader: false,
        isShowSidebar: false
    },
    {
        path: "/lands-detail",
        page: LandsDetailPage,
        isShowHeader: true,
        isShowSidebar:false
    },
    {
        path: "/forgot-password",
        page: ForgotPassPage,
        isShowHeader: false,
        isShowSidebar: false
    },
    {
        path: "/profile-user",
        page: Profile,
        isShowHeader: true,
        isShowSidebar: true
    },
    {
        path: "/change-password",
        page: Changepass,
        isShowHeader: true,
        isShowSidebar: true
    },
    {
        path: "/manage-listing",
        page: ManageListing,
        isShowHeader: true,
        isShowSidebar: true
    },
    {
        path: '/create-listing',
        page: CreateListing,
        isShowHeader: true,
        isShowSidebar: true
    },
    {
        path: '/Detail-listing/:id',
        page:DetailListing,
        isShowHeader: true,
        isShowSidebar: true
    },
    {
        path: '/Edit-listing/:id',
        page:EditListing,
        isShowHeader:true,
        isShowSidebar:true
    },
    {
        path: '/Delete-listing',
        page: DeleteListingPage,
        isShowHeader: true,
        isShowSidebar: true
    },
    {
        path: "*",
        page: NotFoundPage
    }
]