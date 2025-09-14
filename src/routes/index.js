import HomePage from "../pages/HomePage/HomePage";
import ListingPage from "../pages/ListingPage/ListingPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

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
        path: "*",
        page: NotFoundPage
    }
]