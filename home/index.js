window.fetchSportBanners = async (skin, token) => {
  const response = await fetch(
    `https://gradm-api.pcluster.info/api/skin/banners/all?token=${token}&page=home&skin=${skin}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  const {
    success: { banners },
  } = data;

  const mainBanner = banners.filter(
    (a) => a.css_selector.name === "main_banner"
  );

  const rightBanner = banners.filter(
    (a) => a.css_selector.name === "right_banner"
  );

  if (mainBanner[0]) {
    $("#main_banner .title").text(mainBanner[0].title);
    $("#main_banner .subtitle").text(mainBanner[0].subtitle);
    $("#main_banner a").text(mainBanner[0].button);
    $("#main_banner a").attr("href", mainBanner[0].link);
    $("#main_banner img").attr("src", mainBanner[0].image.path);
  }
  if (rightBanner[0]) {
    $("#rightB .title").text(rightBanner[0].title);
    $("#rightB .subtitle").text(rightBanner[0].subtitle);
    $("#rightB a").text(rightBanner[0].button);
    $("#rightB a").attr("href", rightBanner[0].link);
    $("#rightB img").attr("src", rightBanner[0].image.path);
  }
};
$(document).ready(() => {
  window.fetchSportBanners(
    "SIRPLAY IT",
    "086cf24bc562dc2f22d01f66555cd210e52495f5977144a7157dd00c194e1711b528d0acb2c1cf0f"
  );
});
