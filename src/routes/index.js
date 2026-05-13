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
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import Contractpage from "../pages/Contractpage/Contractpage";
import CreateContractpage from "../pages/CreateContractpage/CreateContractpage";
import EditContractpage from "../pages/EditContractpage/EditContractpage";
import DetailContract from "../pages/DetailContract/DetailContract";
import Profitpage from "../pages/Profitpage/Profitpage";
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
        path: "/listing/:type",
        page: ListingPage,
        isShowHeader: true,
        isShowSidebar: false
    },
    {
        path: "/listing/:type/:category",
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
        path: "/lands-detail/:id",
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
        isShowSidebar: true,
        isPrivate: true
    },
    {
        path: "/change-password",
        page: Changepass,
        isShowHeader: true,
        isShowSidebar: true,
        isPrivate: true
    },
    {
        path: "/manage-listing",
        page: ManageListing,
        isShowHeader: true,
        isShowSidebar: true,
        isPrivate: true
    },
    {
        path: '/create-listing',
        page: CreateListing,
        isShowHeader: true,
        isShowSidebar: true,
        isPrivate: true
    },
    {
        path: '/Detail-listing/:id',
        page:DetailListing,
        isShowHeader: true,
        isShowSidebar: true,
        isPrivate: true
    },
    {
        path: '/Edit-listing/:id',
        page:EditListing,
        isShowHeader:true,
        isShowSidebar:true,
        isPrivate: true
    },
    {
        path: '/Delete-listing',
        page: DeleteListingPage,
        isShowHeader: true,
        isShowSidebar: true,
        isPrivate: true
    },
    {
        path: '/Dashboard',
        page:DashboardPage,
        isShowHeader:true,
        isShowSidebar:true,
        isPrivate:true
    },
    {
        path: '/Contract',
        page:Contractpage,
        isShowHeader:true,
        isShowSidebar:true,
        isPrivate:true,
    },
    {
        path: '/Contract-history',
        page:Contractpage,
        isShowHeader:true,
        isShowSidebar:true,
        isPrivate:true,
    },
    {
        path: '/Contract/Create',
        page:CreateContractpage,
        isShowHeader:true,
        isShowSidebar:true,
        isPrivate:true,
    },
    {
        path: '/Contract/Edit/:id',
        page: EditContractpage,
        isShowHeader: true,
        isShowSidebar: true,
        isPrivate: true
    },
    {
        path: '/Contract/Detail/:id',
        page: DetailContract,
        isShowHeader: true,
        isShowSidebar: true,
        isPrivate: true
    },
    {
        path: '/Profit',
        page: Profitpage,
        isShowHeader: true,
        isShowSidebar: true,
        isPrivate: true
    },
    {
        path: "*",
        page: NotFoundPage
    }
]