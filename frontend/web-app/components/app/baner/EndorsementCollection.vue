<template>
  <div class="banner endorses">
    <h1 class="endorses--title">Нас рекомендуют:</h1>
    <div class="endorses--column">
      <app-baner-endorsement
        name="Bushido Zho"
        link="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTc5NjE2MDYzNjUzNzA2?story_media_id=2970605985941971740&igsh=bTBoMXV3aXpvcDB3"
        image="bushido_zho.png"
        mobile-image="bushido_zho_mobile.png"
      />
      <app-baner-endorsement
        name="YungWay"
        link="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTc5NjE2MDYzNjUzNzA2?story_media_id=3280918780809164378&igsh=bTBoMXV3aXpvcDB3"
        image="yungway.png"
        mobile-image="yungway_mobile.png"
        :dark="true"
      />
      <app-baner-endorsement
        name="163ONMYNECK"
        link="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTc5NjE2MDYzNjUzNzA2?story_media_id=2985292301190772469&igsh=bTBoMXV3aXpvcDB3"
        image="163onmyneck.png"
        mobile-image="163onmyneck_mobile.png"
      />
      <app-baner-endorsement
        name="elyaplugg!"
        link="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTA4NDc5MTA0MzQxNDIw?igsh=MWR5cWM2d2I1cDRlZw=="
        image="elyaplugg.png"
        mobile-image="elyaplugg_mobile.png"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.endorses {
  margin-top: 9.5rem;

  &--title {
    text-align: center;
    font-size: 4.2rem;
    font-weight: 500;
    margin: 0 0 5rem;
    line-height: inherit;
  }

  &--column {
    display: flex;
    flex-direction: column;
    gap: 3.1rem;
  }

  @media screen and (max-width: 720px) {
    margin: 5rem 1.1rem 0;

    &--title {
      font-size: 2.5rem;
      margin-bottom: 3.5rem;
    }
  }
}
</style>