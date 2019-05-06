import MainContainer from './javascript/MainContainer';

// import urlConfig from './utils/urlConfig';
// const {reactUrl} =urlConfig;

const routes = {
    component: MainContainer,
    childRoutes: [
        { path: "/", component: MainContainer }
        // { path: reactUrl.online, component: OnlineContainer },
        // { path: reactUrl.verifyAgent, component: VerifyAgentContainer },
        // { path: reactUrl.businessProfiles, component: businessProfilesContainer },
        // { path: reactUrl.online50k, component: Online50kContainer },
        // { path: reactUrl.offline50k, component: Offline50kContainer }
    ]
};
export default routes;
