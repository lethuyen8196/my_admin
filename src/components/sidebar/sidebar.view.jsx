/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useLocation } from "react-router-dom";
import { UrlCollection } from "../../common/url-collection";
import LinkAdministratorItems from "./child-components/link-adminstrator-items.view";
import LinkSubMenu from "./child-components/link-sub-items.view";
import { useHistory } from "react-router-dom";

//--- Material Icon
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SettingsIcon from "@material-ui/icons/Settings";
//--- Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faSignOutAlt, faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";

import * as clientSettingAction from "../../redux/store/client_setting/client_setting.store";
import * as appActions from "../../core/app.store";

//--- Style
import "./sidebar.scss";

import { useMediaQuery } from "react-responsive";
import { none } from "ol/centerconstraint";
import {
  DomainAdminSide,
  TokenKey,
  getUserInfo,
  removeCookies,
  APIUrlDefault,
  setCookies,
} from "../../utils/configuration";
import * as accAction from "../../redux/store/account/account.store";
import { modules } from "../../common/profileModules";

function Sidebar(props) {
  const {
    settings,
    getSettings,
    isCollapsed,
    expandSidebar,
    collapseSidebar,
    isDirty,
    setToggle,
  } = props;
  const history = useHistory();
  const isMobile = window.innerWidth < 1281;

  const [isSubMenuOpen, setSubMenuOpen] = useState(true);
  const [openQLQH, setOpenQLQH] = useState(false);
  const [openQHHTKT, setOpenQHHTKT] = useState(false);
  const [openQHCC, setOpenQHCC] = useState(false);

  // useEffect(() => {
  //   getSettings();
  // }, [getSettings]);

  useEffect(() => {
    setClientSetting(settings);
  }, [settings]);

  useEffect(() => {
    if (isMobile) {
      collapseSidebar();
    }
  }, [collapseSidebar, isMobile]);

  const [clientSetting, setClientSetting] = useState();
  const currentLocation = useLocation();

  const onMouseEnter = () => {
    (isDirty || isMobile) && isCollapsed && expandSidebar();
  };

  const onMouseLeave = () => {
    (isDirty || isMobile) && collapseSidebar();
  };

  const currentIsHomePage = currentLocation.pathname === "/";
  const isGenres = currentLocation.pathname === UrlCollection.GenresManagement;
  const isMoods = currentLocation.pathname === UrlCollection.MoodsManagement;
  const isThemes = currentLocation.pathname === UrlCollection.ThemesManagement;
  const isSoundEffect = currentLocation.pathname === UrlCollection.SoundEffectManagement;
  const isPlaylist = currentLocation.pathname === UrlCollection.PlaylistManagement;
  const isTrack = currentLocation.pathname === UrlCollection.TrackManagement;
  const isTrackHistory = currentLocation.pathname === UrlCollection.TrackHistory;
  const isAuthor = currentLocation.pathname === UrlCollection.AuthorManagement;

  const currentIsAdministratorPages =
    !currentIsHomePage &&
    !isGenres &&
    !isMoods &&
    !isThemes &&
    !isSoundEffect &&
    !isPlaylist &&
    !isTrack &&
    !isTrackHistory &&
    !isAuthor;


  useEffect(() => {
    setSubMenuOpen(currentIsAdministratorPages);
  }, [currentIsAdministratorPages]);

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

  console.log('Sidebar reactMediaQuery :  ', reactMediaQuery);

  const getSideBarClassName = () => {
    var className = "";
    // Class cho desktop
    if (isDesktopOrLaptop) {
      className += 'aside';
      if (isCollapsed) {
        className += ' toggled';
      }
    }

    if (isTabletOrMobile) {
      className = 'overlay__wrapper';
      if (!isCollapsed) {
        className += '';
      }
    }
    return className;
  }

  const getSideBarInlineStyle = () => {
    //style for tablet and mobile
    if (isTabletOrMobile) {
      if (isCollapsed) {
        return { display: "none" }
      }
      return { display: "block" }
    }
  }

  const getIconMenuInlineStyle = () => {
    // var style = {alignSelf:'center', flex:'auto',display:'flex',justifyContent: 'center', flexGrow:0, flexShrink:0, flexBasis:'10%'}
    // if(isTabletOrMobile){
    //   return style;
    // }
    if (isDesktopOrLaptop) {
      if (isCollapsed) {
        return { width: '100%' }
      }
    }
  }

  const [user, setUser] = useState(getUserInfo());
  const [isLogin, setIsLogin] = useState(getUserInfo() ? true : false);
  const [screenAllow, setScreenAllow] = useState([]);

  const getScreenAllow = () => {
    accAction.GetScreenAllow().then(res => {
      setScreenAllow(modules.filter(item => {
        if (res.content.some(x => x.code === item.code))
          return item
      }))
    }).catch(error => console.log(error))
  }

  const onLogout = () => {
    removeCookies("isShowDialog");
    removeCookies("isLockScreen");
    removeCookies(TokenKey.token);
    removeCookies(TokenKey.refreshToken);
    removeCookies(TokenKey.returnUrl);
    window.location.replace(DomainAdminSide);
  }

  // useEffect(() => {
  //   if (isTabletOrMobile) {
  //     getScreenAllow();
  //   }
  // }, [])

  // useEffect(()=>{
  //   if (!isTabletOrMobile) return;
  //   if (isLogin && user && user.userRole) {
  //     if (user.email.toLowerCase() === "xinykien_sonla@gmail.com")
  //       window.location.replace(DomainAdminSide + "/dang-nhap");
  //     else return;
  //   } else {
  //     removeCookies("isShowDialog");
  //     removeCookies("isLockScreen");
  //     removeCookies(TokenKey.token);
  //     removeCookies(TokenKey.refreshToken);
  //     removeCookies(TokenKey.returnUrl);
  //     setCookies(TokenKey.returnUrl, window.location.href);
  //     window.location.replace(DomainAdminSide + "/dang-nhap");
  //   }
  // },[])

  console.log("SIDEBAR : ", user, screenAllow);

  return (
    <div id="sidebar-custom" className={getSideBarClassName()}
      style={getSideBarInlineStyle()} >
      {
        isTabletOrMobile &&
        <div className="d-flex justify-content-end close-btn">
          <a href='#' onClick={() => { collapseSidebar(); setToggle(); }} >
            &times;
          </a>
        </div>
      }

      {
        isTabletOrMobile &&
        <div className="d-flex flex-column overlay__avatar-section">
          <div className="d-flex justify-content-center row overlay__avatar" style={{ width: '100%' }}>
            <a
              className="nav-link col-6"
              href="#"
            >
              <img
                className="img-profile rounded-circle"
                src={
                  user && user.avatar && user.avatar !== "null"
                    ? APIUrlDefault + user.avatar
                    : process.env.PUBLIC_URL + "/user-default.png"
                }
                alt="avatar-img"
                style={{ width: '100%' }}
              />
            </a>
          </div>
          <div className="row overlay__avatar-buttons">
            <div className="col-1">{ }</div>
            <div className="col-5 d-flex flex-column justify-content-end overlay__avatar-button"
              style={{ borderRight: 'solid 1px' }}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="fa-sm fa-fw mr-2 text-gray-400"
              />
              <Link to={UrlCollection.MyAccount}>
                <span>{user && user.fullName}</span>
              </Link>
            </div>
            <div className="col-6 d-flex flex-column justify-content-start overlay__avatar-button"
              onClick={onLogout} style={{ borderLeft: 'solid 1px' }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="fa-sm fa-fw mr-2 text-gray-400"
              />
              <a href={DomainAdminSide + "/dang-nhap"}>
                <span>Đăng xuất</span>
              </a>
            </div>
          </div>
        </div>
      }

      <div
        onMouseEnter={isDesktopOrLaptop ? onMouseEnter : () => { }}
        onMouseLeave={isDesktopOrLaptop ? onMouseLeave : () => { }}
      >
        <ul
          className={
            (isDesktopOrLaptop ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion aside__menu" : "") +
            (isTabletOrMobile ? "overlay__menu-list" : "") +
            ((isCollapsed && isDesktopOrLaptop) ? " toggled" : "")
          }
          id="accordionSidebar"
        >
          {isDesktopOrLaptop && <hr className="sidebar-divider my-0" />}

          <>
            <li className="nav-item overlay__menu__item">
              <div className={`nav-link overlay__menu-link__wrapper ${isGenres && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                onClick={() => {
                  history.push(UrlCollection.GenresManagement);
                }}
              >
                <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                  <AssignmentIcon fontSize="small" className="mr-2" />
                </div>
                <a to={UrlCollection.GenresManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                  {!isCollapsed && <span>Genres Management</span>}
                </a>
              </div>
            </li>
            <li className="nav-item overlay__menu__item">
              <div className={`nav-link overlay__menu-link__wrapper ${isMoods && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                onClick={() => {
                  history.push(UrlCollection.MoodsManagement);
                }}
              >
                <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                  <AssignmentIcon fontSize="small" className="mr-2" />
                </div>
                <a to={UrlCollection.MoodsManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                  {!isCollapsed && <span>Moods Management</span>}
                </a>
              </div>
            </li>
            <li className="nav-item overlay__menu__item">
              <div className={`nav-link overlay__menu-link__wrapper ${isThemes && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                onClick={() => {
                  history.push(UrlCollection.ThemesManagement);
                }}
              >
                <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                  <AssignmentIcon fontSize="small" className="mr-2" />
                </div>
                <a to={UrlCollection.ThemesManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                  {!isCollapsed && <span>Themes Management</span>}
                </a>
              </div>
            </li>
            <li className="nav-item overlay__menu__item">
              <div className={`nav-link overlay__menu-link__wrapper ${isSoundEffect && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                onClick={() => {
                  history.push(UrlCollection.SoundEffectManagement);
                }}
              >
                <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                  <AssignmentIcon fontSize="small" className="mr-2" />
                </div>
                <a to={UrlCollection.SoundEffectManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                  {!isCollapsed && <span>Sound Effect Management</span>}
                </a>
              </div>
            </li>
            <li className="nav-item overlay__menu__item">
              <div className={`nav-link overlay__menu-link__wrapper ${isPlaylist && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                onClick={() => {
                  history.push(UrlCollection.PlaylistManagement);
                }}
              >
                <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                  <AssignmentIcon fontSize="small" className="mr-2" />
                </div>
                <a to={UrlCollection.PlaylistManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                  {!isCollapsed && <span>Playlist Management</span>}
                </a>
              </div>
            </li>
            <li className="nav-item overlay__menu__item">
              <div className={`nav-link overlay__menu-link__wrapper ${isTrack && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                onClick={() => {
                  history.push(UrlCollection.TrackManagement);
                }}
              >
                <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                  <AssignmentIcon fontSize="small" className="mr-2" />
                </div>
                <a to={UrlCollection.TrackManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                  {!isCollapsed && <span>Track Management</span>}
                </a>
              </div>
            </li>
            <li className="nav-item overlay__menu__item">
              <div className={`nav-link overlay__menu-link__wrapper ${isTrackHistory && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                onClick={() => {
                  history.push(UrlCollection.TrackHistory);
                }}
              >
                <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                  <AssignmentIcon fontSize="small" className="mr-2" />
                </div>
                <a to={UrlCollection.TrackHistory} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                  {!isCollapsed && <span>Track history</span>}
                </a>
              </div>
            </li>
            <li className="nav-item overlay__menu__item">
              <div className={`nav-link overlay__menu-link__wrapper ${isAuthor && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%', borderBottom: `${isDesktopOrLaptop ? '' : 'solid 1px'}` } : {}}
                onClick={() => {
                  history.push(UrlCollection.AuthorManagement);
                }}
              >
                <div className="overlay__menu-link__icon" style={getIconMenuInlineStyle()}>
                  <AssignmentIcon fontSize="small" className="mr-2" />
                </div>
                <a to={UrlCollection.AuthorManagement} style={isTabletOrMobile ? { fontSize: '0.85rem' } : {}}>
                  {!isCollapsed && <span>Author Management</span>}
                </a>
              </div>
            </li>
          </>
          {/* {isShowQHDT && (
            <li className="nav-item">
              <Link
                className={`nav-link ${currentIsNewsPage && "is-active"}`}
                to={UrlCollection.News}
                onClick={() => setSubMenuOpen(false)}
              >
                <PostAddIcon fontSize="small" className="mr-2" />
                {!isCollapsed && <span>Tin tức</span>}
              </Link>
            </li>
          )} */}


          {/* hệ thông */}
          <>
            <li className={`nav-item overlay__menu__item ${isSubMenuOpen && !isCollapsed ? "is-open" : ""}`}>
              <div className="overlay__submenu-list__wrapper">
                <div className={`nav-link overlay__submenu-list__title-wrapper ${currentIsAdministratorPages && "is-active"}`}
                  onClick={() => {
                    // history.push(UrlCollection.EmailTemplate);
                    setSubMenuOpen(!isSubMenuOpen);
                  }}
                >
                  <div className="overlay__submenu-list__title-icon aside__submenu-list__title-icon">
                    <SettingsIcon fontSize="small" className="mr-2" />
                  </div>
                  <a to={'#'}
                  >
                    {!isCollapsed && <span>Administrator</span>}
                  </a>
                  {!isCollapsed ? (
                    <span className="overlay__submenu-list__title-chevron aside__submenu-list__title-chevron">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="float-right mt-1 chevron"
                      />
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="float-right mt-1 chevron"
                      />
                    </span>
                  ) : null}
                </div>
                <div className="overlay__submenu-list__content-wrapper">
                  <ul className="aside__menu-sub overlay__submenu-list__content">
                    {/* <li>
                      <LinkAdministratorItems
                        // icon={EmailIcon}
                        pageLink={UrlCollection.EmailTemplate}
                        title="Email Template"
                      />
                    </li>
                    <li>
                      <LinkAdministratorItems
                        // icon={AllInboxIcon}
                        pageLink={UrlCollection.EmailGenerated}
                        title="Khởi tạo email"
                      />
                    </li>
                    <li>
                      <LinkAdministratorItems
                        // icon={ContactPhoneIcon}
                        pageLink={UrlCollection.ContactManagement}
                        title="Liên hệ"
                      />
                    </li> */}
                    <li>
                      <LinkAdministratorItems
                        //  icon={PeopleIcon}
                        pageLink={UrlCollection.RoleManagement}
                        title="Phân quyền"
                      />
                    </li>
                    <li>
                      <LinkAdministratorItems
                        //  icon={AccountBoxIcon}
                        pageLink={UrlCollection.Log}
                        title="Quản lý log"
                      />
                    </li>
                    <li>
                      <LinkAdministratorItems
                        //  icon={AccountBoxIcon}
                        pageLink={UrlCollection.UserManagement}
                        title="Quản lý người dùng"
                      />
                    </li>
                  </ul>
                </div>
              </div>

            </li>
          </>


          {isDesktopOrLaptop && <hr className="sidebar-divider d-none d-md-block" />}

          {/* {isTabletOrMobile && (
            screenAllow.map((x, index) => (
              <li key={`nav-key-${index}`} className="nav-item overlay__menu__item">
                <div className={`nav-link overlay__menu-link__wrapper ${currentIsPTQD && "is-active"}`} style={!isCollapsed ? { display: 'flex', width: '100%' } : {}}
                >
                  <div style={isTabletOrMobile ? { alignSelf: 'center', flex: 'auto', display: 'flex', justifyContent: 'center', flexGrow: 0, flexShrink: 0, flexBasis: '10%' } : {}}>
                    <img
                      src={x.logo}
                      alt="Folder"
                      style={{ width: 15, height: 15 }}
                    />
                  </div>
                  <a href={x.url} target={x.url === UrlCollection.PAHT ? "_blank" : ""} style={{ fontSize: '0.85rem' }}>
                    {x.title}
                  </a>
                </div>
              </li>
            ))
          )} */}
        </ul>
      </div>
      <div className={(isTabletOrMobile ? ' footer-menu-mobile' : ' d-flex flex-column sidebar sidebar-dark w-100')}>
        <div class="copyright">
          <p>Copyright © TB Label Music 2024</p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  settings: state.clientSetting.clientSetting,
  isCollapsed: state.app.isCollapsed,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSettings: clientSettingAction.getSettings,
      expandSidebar: appActions.ExpandSidebar,
      collapseSidebar: appActions.CollapseSidebar,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
