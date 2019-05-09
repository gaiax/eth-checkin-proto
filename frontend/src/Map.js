import React from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGoogleMap from "react-google-map"

const bnCoord = {
  lat: 44.597923,
  lng: 0.873799,
}

const Map = () => (
    <ReactGoogleMapLoader
      params={{
        key: "取得したキーをここに入力する",
      }}
      style={{height: "100%"}}
      render={googleMaps => {
        return (
          googleMaps && (
            <ReactGoogleMap
              googleMaps={googleMaps}
              coordinates={[
                {
                  title: "Bosc Nègre",
                  position: bnCoord,
                },
              ]}
              center={bnCoord}
              zoom={8}
            />
          )
        )
      }}
    />
)

export default Map