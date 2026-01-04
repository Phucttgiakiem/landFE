import HomePage from "../pages/HomePage/HomePage";
import ListingPage from "../pages/ListingPage/ListingPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ForgotPassPage from "../pages/ForgotPassPage/ForgotPassPage";
import LandsDetailPage from "../pages/LandsDetailPage/LandsDetailPage";
export const routes = [
    {
        path: "/",
        page: HomePage,
        isShowHeader: true
    },
    {
        path: "/listing",
        page: ListingPage,
        isShowHeader: true
    },
    {
        path: "/sign-in",
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: "/sign-up",
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: "/lands-detail",
        page: LandsDetailPage,
        isShowHeader: true
    },
    {
        path: "/forgot-password",
        page: ForgotPassPage,
        isShowHeader: false
    },
    {
        path: "*",
        page: NotFoundPage
    }
]