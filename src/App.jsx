import React from "react";
import { Router, Switch } from "react-router-dom";
import RouteComponent from "./route-config.jsx";
import { UrlCollection } from "./common/url-collection";
import history from "./common/history";

//--- Loading
import AppLoading from "./components/loading/loading.view";

//--- Layout
import LayoutView from "./components/layout/layout.view";
import LayoutViewWithHook from "./components/layout/layout.view.withHook";
import LayoutUserView from "./components/layout/layout-user.view.jsx";
import LayoutDetail from "./components/layout/layout-detail.view";

//--- Home
//--- Admin
import Login from "./modules/login/login.view.jsx";
import ForgotPassword from "./modules/forgot-password/forgot-password.view.jsx";
import ResetPassword from "./modules/reset-password/reset-password.view.jsx";

//--- Consult the community
import EmailTemplate from "./modules/email-template/email-template";
import RoleManagement from "./modules/role-management/role-management";
import ContactManagement from "./modules/contact-management/contact-management.view";
import EmailGenerated from "./modules/email-generated/email-generated.view";
import UserManagement from "./modules/user-management/user-management.view";
import UserLogHistory from "./modules/user-log/user-log-history.view";
//---Log
import Log from "./modules/log/log.jsx";

//--- Slider

//--- News
import News from "./modules/news/news.view.jsx";
// --- PlanningSync

//--- Map

//--- Records management
//--- Link

//--- Opinion form

//--- Table Layer Structure

//--- Access denied
import AccessDenied from "./modules/access-denied/access-denied.view.jsx";
//--- booking

//--- soundWave
import GenresManagement from "./modules/genres-management/genres-management.jsx";
import MoodsManagement from "./modules/moods-management/moods-management.jsx";
import ThemesManagement from "./modules/themes-management/themes-management.jsx";
import SoundEffectManagement from "./modules/sound-effect-management/sound-effect-management.jsx";
import PlaylistManagement from "./modules/playlist-management/playlist-management.jsx";
import TrackManagement from "./modules/track-management/track-management.jsx";
import TrackHistoryManagement from "./modules/track-history-management/track-history-management.jsx";
import AuthorManagement from "./modules/author-management/author-management.jsx";
//--- soundWave

import DocumentManagement from "./modules/document-management/document-management.view.jsx";
import MyAccount from "./modules/my-account/my-account.view.jsx";
import HomePage from "./modules/home/home.view.jsx";
import DialogWarningExpired from "./components/dialog-warning-expired/dialog-warning-expired.view";
import LockScreen from "./components/lock-screen/lock-screen.view.jsx";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";

function App() {
  //media query
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  const reactMediaQuery = {
    isDesktopOrLaptop: isDesktopOrLaptop,
    isBigScreen: isBigScreen,
    isTabletOrMobile: isTabletOrMobile,
    isPortrait: isPortrait,
    isRetina: isRetina
  }

  return (
    <div>
      <DialogWarningExpired />
      <Router history={history}>
        <AppLoading />
        <LockScreen />
        <Switch>
          <RouteComponent
            exact
            layout={LayoutUserView}
            component={Login}
            path={UrlCollection.Login}
            isSetActive={false}
          />
          <RouteComponent
            exact
            layout={LayoutUserView}
            component={ForgotPassword}
            path={UrlCollection.ForgotPassword}
            isSetActive={false}
          />
          <RouteComponent
            exact
            layout={LayoutUserView}
            component={ResetPassword}
            path={UrlCollection.ResetPassword}
            isSetActive={false}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Home">
                <HomePage />
              </LayoutViewWithHook>
            )}
            component={HomePage}
            path={UrlCollection.Home}
          />

          {/* ---------- Sound Wave ---------- */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Genres Management">
                <GenresManagement />
              </LayoutViewWithHook>
            )}
            component={GenresManagement}
            path={UrlCollection.GenresManagement}
          />

          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Moods Management">
                <MoodsManagement />
              </LayoutViewWithHook>
            )}
            component={MoodsManagement}
            path={UrlCollection.MoodsManagement}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Themes Management">
                <ThemesManagement />
              </LayoutViewWithHook>
            )}
            component={ThemesManagement}
            path={UrlCollection.ThemesManagement}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Sound Effect Management">
                <SoundEffectManagement />
              </LayoutViewWithHook>
            )}
            component={SoundEffectManagement}
            path={UrlCollection.SoundEffectManagement}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Playlist Management">
                <PlaylistManagement />
              </LayoutViewWithHook>
            )}
            component={PlaylistManagement}
            path={UrlCollection.PlaylistManagement}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Track Management">
                <TrackManagement />
              </LayoutViewWithHook>
            )}
            component={TrackManagement}
            path={UrlCollection.TrackManagement}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Track history Management">
                <TrackHistoryManagement />
              </LayoutViewWithHook>
            )}
            component={TrackHistoryManagement}
            path={UrlCollection.TrackHistory}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Author Management">
                <AuthorManagement />
              </LayoutViewWithHook>
            )}
            component={AuthorManagement}
            path={UrlCollection.AuthorManagement}
          />
          {/* ---------- Sound Wave ---------- */}

          {/* <RouteComponent
            exact
            layout={() => (<HomePage reactMediaQuery={reactMediaQuery}/>)}
            component={HomePage}
            path={UrlCollection.Home}
          /> */}
          {/* Role Management */}

          {/* Email Template */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Email Template">
                <EmailTemplate />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.EmailTemplate}
          />
          {/*Email Generated */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Email Generated">
                <EmailGenerated />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.EmailGenerated}
          />

          {/* Role Management */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Role Management">
                <RoleManagement />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.RoleManagement}
          />
          {/* Contact Management */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Liên hệ">
                <ContactManagement />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.ContactManagement}
          />
          {/* Log */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Quản lý log">
                <Log />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.Log}
          />
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Role Management">
                <RoleManagement />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.RoleManagement}
          />

          {/* User Management */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Quản lý người dùng">
                <UserManagement />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.UserManagement}
          />

          {/* User log */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Nhật ký người dùng">
                <UserLogHistory />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.UserLogHistory}
          />

          {/* my account */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutViewWithHook title="Quản lý tài khoản">
                <MyAccount isTabletOrMobile={isTabletOrMobile} />
              </LayoutViewWithHook>
            )}
            path={UrlCollection.MyAccount}
          />
          {/* Access Denied */}
          <RouteComponent
            exact
            layout={() => (
              <LayoutView title="">
                <AccessDenied />
              </LayoutView>
            )}
            path={UrlCollection.AccessDenied}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
