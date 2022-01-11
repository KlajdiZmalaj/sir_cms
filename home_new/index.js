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

  const mainBanner = banners.filter((a) => a.css_selector.name === "main_banner");
  console.log('banner.id', mainBanner?.title)
  const rightBanner = banners.filter((a) => a.css_selector.name === "right_banner");

  let gameBanner = banners.filter((a) => a.css_selector.name === "game_banner");

  let centerBanner = banners.filter((a) => a.css_selector.name === "center_banners");

  var mainBannerTemplate = `${mainBanner
    
    .map(
      (banner) =>
        `
        <div class="newSliderSlide">
        <button
                    onclick="${
                      banner.id
                        ? `window.top.location.href = 'https://${window.location.host}/${banner?.title}'`
                        : ""
                    }"
                    style="
                    position: absolute;
                    display: flex;
                    justify-content: space-between;
                    bottom: 120px;
                    width: 150px;
                    margin-left: 75vw;
                    padding: 10px 10px;
                    border-radius: 6px;
                    border: none;
                    background: #fdca00;
                    cursor: pointer;
                    box-shadow: 0px 8px 10px rgb(0 0 0 / 60%);
                    
                    
                    
                    "
                    ><span style="
                    width:70%;
                    ">SCOPRI DI PIU </span>
                    <img style="
                    
                    max-height: 20px;
                    width:20%;
                    
                    " src="./img/pointerIcon.svg"> </img>
                    </button>
            <img   src="${banner?.image?.path}" alt=""  />
            
           </div>
           
           `
    )
    .join("")}`;

    


   
    // <button
    //         onclick="${
    //           banner.id
    //             ? `window.top.location.href = 'https://${window.location.host}/promo'`
    //             : ""
    //         }"
    //         style="
    //         position: absolute;
    //         bottom: 105px;
    //         margin-left: 75vw;
    //         padding: 10px 15px;
    //         border-radius: 15px;
    //         border: none;
    //         background: #fdca00;
    //         cursor: pointer;
    //         box-shadow: 0px 8px 10px rgb(0 0 0 / 60%);
    //         "
    //         >SCOPRI LE NOSTRE PROMOZIONI</button>



  var template = `${gameBanner
    .map(
      (banner) =>
        `<div class="sliderItem" onclick="${
          banner.subtitle
            ? `window.top.location.href = 'https://${window.location.host}/slot'`
            // ? `window.top.location.href = 'https://${window.location.host}/casino?token=&language=it&system_code=SIRPLAY&systemCodeLancioGioco=SIRPLAY&codiceGiocoInterno=${banner.subtitle}&codicePiattaforma=${banner.button}&codiceLancioLive=&isReal=0&ip='`
            : ""
        }"><img class="newSliderSlide" src="${banner?.image?.path}" alt="" /><span>${
          banner.title || "gameTitle"
        }</span></div>`
    )
    .join("")}`;

  var templateCenter = `${centerBanner
    .map(
      (banner) =>
        `<a class="sliderItem" href="#" onclick="window.top.location.href='${banner.title}'" ><img class="newSliderSlide" src="${banner?.image?.path}" alt="" /></div>`
    )
    .join("")}`;

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
      arrows: true,
    });
  }
  if (rightBanner[0]) {
    $("#rightB .title").text(rightBanner[0].title);
    $("#rightB .subtitle").text(rightBanner[0].subtitle);
    $("#rightB a").text(rightBanner[0].button);
    $("#rightB a").attr("href", rightBanner[0].link);
    $("#rightB img").attr("src", rightBanner[0].image.path);
  }

  $(".carousel").html(template);
  if (gameBanner[0]) {
    $(".carousel").slick({
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 1,
      dots: false,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    });
  }

  $(".carouselCenter").html(templateCenter);
};
$(document).ready(() => {
  window.fetchSportBanners(
    "SIRPLAY IT",
    "086cf24bc562dc2f22d01f66555cd210e52495f5977144a7157dd00c194e1711b528d0acb2c1cf0f"
  );
});
