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

  var mainBannerTemplate = `${mainBanner
    .map(
      (banner) =>
        `<div class="newSliderSlide">
          <img src="${banner?.image?.path}" alt="" />
         </div>`
    )
    .join("")}`;
  console.log("mainBanner", mainBanner, mainBannerTemplate);
  if (mainBanner.length === 1) {
    $("#main_banner img").attr("src", mainBanner[0].image.path);
  } else if (mainBanner.length > 1) {
    $("#main_banner").html(mainBannerTemplate);
    $("#main_banner").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
    });
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
