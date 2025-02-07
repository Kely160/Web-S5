import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/frontoffice/Presentation/PresentationView.vue";
import AboutView from "../views/frontoffice/LandingPages/AboutUs/AboutView.vue";
import ContactView from "../views/frontoffice/LandingPages/ContactUs/ContactView.vue";
import AuthorView from "../views/frontoffice/LandingPages/Author/AuthorView.vue";
import SignInBasicView from "../views/frontoffice/LandingPages/SignIn/SignIn.vue";
import TableView from "../views/frontoffice/Crypto/ListeCrypto.vue";
import ListeWallet from "../views/frontoffice/Portefeuille/ListeWallet.vue";
import DetailWallet from "../views/frontoffice/Portefeuille/DetailWallet.vue";
import GestionFondForm from "../views/frontoffice/Portefeuille/GestionFondForm.vue";
import ConfirmPIN from "../views/frontoffice/LandingPages/SignIn/ConfirmPIN.vue";
import PageHeaders from "../layouts/sections/page-sections/page-headers/HeadersView.vue";
import PageFeatures from "../layouts/sections/page-sections/features/FeaturesView.vue";
import NavigationNavbars from "../layouts/sections/navigation/navbars/NavbarsView.vue";
import NavigationNavTabs from "../layouts/sections/navigation/nav-tabs/NavTabsView.vue";
import NavigationPagination from "../layouts/sections/navigation/pagination/PaginationView.vue";
import InputAreasInputs from "../layouts/sections/input-areas/inputs/InputsView.vue";
import InputAreasForms from "../layouts/sections/input-areas/forms/FormsView.vue";
import ACAlerts from "../layouts/sections/attention-catchers/alerts/AlertsView.vue";
import ACModals from "../layouts/sections/attention-catchers/modals/ModalsView.vue";
import ACTooltipsPopovers from "../layouts/sections/attention-catchers/tooltips-popovers/TooltipsPopoversView.vue";
import ElAvatars from "../layouts/sections/elements/avatars/AvatarsView.vue";
import ElBadges from "../layouts/sections/elements/badges/BadgesView.vue";
import ElBreadcrumbs from "../layouts/sections/elements/breadcrumbs/BreadcrumbsView.vue";
import ElButtons from "../layouts/sections/elements/buttons/ButtonsView.vue";
import ElButtonGroups from "../layouts/sections/elements/button-groups/ButtonGroupsView.vue";
import ElDropdowns from "../layouts/sections/elements/dropdowns/DropdownsView.vue";
import ElProgressBars from "../layouts/sections/elements/progress-bars/ProgressBarsView.vue";
import ElToggles from "../layouts/sections/elements/toggles/TogglesView.vue";
import ElTypography from "../layouts/sections/elements/typography/TypographyView.vue";
import FondForm from "../views/frontoffice/fond/FondForm.vue";
import FormPortefeuille from "../views/frontoffice/Portefeuille/FormPortefeuille.vue";
import FondDetail from "../views/frontoffice/fond/FondDetail.vue";
import VendreCrypto from "../views/frontoffice/Portefeuille/VendreCrypto.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: SignInBasicView,
    },
    {
      path: "/confirm-pin",
      name: "ConfirmPIN",
      component: ConfirmPIN,
    },
    {
      path: "/accueil",
      name: "presentation",
      component: PresentationView,
    },
    {
      path: "/listeCrypto",
      name: "listeCrypto",
      component: TableView,
    },
    {
      path: "/fondForm",
      name: "fondForm",
      component: FondForm,
    },
    {
      path: "/listeWallet",
      name: "listeWallet",
      component: ListeWallet,
    },
    {
      path: "/formPortefeuille",
      name: "formPortefeuille",
      component: FormPortefeuille,
    },
    {
      path: "/fondForm",
      name: "fondForm",
      component: FondForm,
    },
    {
      path: '/detailWallet/:id',  // ":id" est un paramètre dynamique
      name: 'detailWallet',
      component: DetailWallet,    // Composant pour afficher les détails
    },
    {
      path: '/gestionFond/:id',
      name: 'gestionFond',
      component: GestionFondForm,
    },
    {
      path: "/pages/landing-pages/about-us",
      name: "about",
      component: AboutView,
    },
    {
      path: "/pages/landing-pages/contact-us",
      name: "contactus",
      component: ContactView,
    },
    {
      path: "/pages/landing-pages/author",
      name: "author",
      component: AuthorView,
    },
    {
      path: "/pages/landing-pages/basic",
      name: "signin-basic",
      component: SignInBasicView,
    },
    {
      path: "/sections/page-sections/page-headers",
      name: "page-headers",
      component: PageHeaders,
    },
    {
      path: "/sections/page-sections/features",
      name: "page-features",
      component: PageFeatures,
    },
    {
      path: "/sections/navigation/navbars",
      name: "navigation-navbars",
      component: NavigationNavbars,
    },
    {
      path: "/sections/navigation/nav-tabs",
      name: "navigation-navtabs",
      component: NavigationNavTabs,
    },
    {
      path: "/sections/navigation/pagination",
      name: "navigation-pagination",
      component: NavigationPagination,
    },
    {
      path: "/sections/input-areas/inputs",
      name: "inputareas-inputs",
      component: InputAreasInputs,
    },
    {
      path: "/sections/input-areas/forms",
      name: "inputareas-forms",
      component: InputAreasForms,
    },
    {
      path: "/sections/attention-catchers/alerts",
      name: "ac-alerts",
      component: ACAlerts,
    },
    {
      path: "/sections/attention-catchers/modals",
      name: "ac-modals",
      component: ACModals,
    },
    {
      path: "/sections/attention-catchers/tooltips-popovers",
      name: "ac-tooltips-popovers",
      component: ACTooltipsPopovers,
    },
    {
      path: "/sections/elements/avatars",
      name: "el-avatars",
      component: ElAvatars,
    },
    {
      path: "/sections/elements/badges",
      name: "el-badges",
      component: ElBadges,
    },
    {
      path: "/sections/elements/breadcrumbs",
      name: "el-breadcrumbs",
      component: ElBreadcrumbs,
    },
    {
      path: "/sections/elements/buttons",
      name: "el-buttons",
      component: ElButtons,
    },
    {
      path: "/sections/elements/button-groups",
      name: "el-button-groups",
      component: ElButtonGroups,
    },
    {
      path: "/sections/elements/dropdowns",
      name: "el-dropdowns",
      component: ElDropdowns,
    },
    {
      path: "/sections/elements/progress-bars",
      name: "el-progress-bars",
      component: ElProgressBars,
    },
    {
      path: "/sections/elements/toggles",
      name: "el-toggles",
      component: ElToggles,
    },
    {
      path: "/sections/elements/typography",
      name: "el-typography",
      component: ElTypography,
    },
    {
      path: "/fondDetail",
      name: "fondDetaile",
      component: FondDetail,
    },
    {
      path: "/vendreCrypto/:id",
      name: "vendreCrypto",
      component: VendreCrypto,
    },
  ],
});

export default router;
