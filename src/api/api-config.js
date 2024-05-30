const env = process.env.NODE_ENV || "development";

const apiEnvironment = {
  development: {
        api: "https://api.phanmemcskh.vn/",
        paht_api: "https://pahtsonla-api.cgis.asia/",
        media_url: "https://api.phanmemcskh.vn/",
        domainAdminSide: "http://localhost:3000",
        domainUserSide: "http://localhost:3000",
        domainName: "",
        workSpace: "sonla",
        wmsBaseLink: "https://geosonla.cgis.asia/geoserver/sonla/wms/",
  },
    production: {
      api: "https://api.phanmemcskh.vn/",
      paht_api: "https://pahtsonla-api.cgis.asia/",
      media_url: "https://api.phanmemcskh.vn/",
      domainAdminSide: "https://admin.sonladev.cgis.asia",
      domainUserSide: "https://sonladev.cgis.asia",
      domainName: "cgis.asia",
      workSpace: "sonla",
      wmsBaseLink: "https://geosonla.cgis.asia/geoserver/sonla/wms/",
  }
  // production: {
  //   api: "https://api.tracuuquyhoachsonla.vn/",
  //   paht_api: "https://paht-api.tracuuquyhoachsonla.vn/",
  //   media_url: "https://api.tracuuquyhoachsonla.vn/",
  //   domainAdminSide: "https://admin.tracuuquyhoachsonla.vn",
  //   domainUserSide: "https://tracuuquyhoachsonla.vn",
  //   domainName: "tracuuquyhoachsonla.vn",
  //   workSpace: "sonla",
  //   wmsBaseLink: "https://geo.tracuuquyhoachsonla.vn/geoserver/sonla/wms/",
  // },
};

module.exports = apiEnvironment[env];
