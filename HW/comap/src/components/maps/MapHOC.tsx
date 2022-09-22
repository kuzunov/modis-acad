import { Wrapper } from '@googlemaps/react-wrapper'
import React from 'react'
import GoogleMap, { MapProps } from './GoogleMap';
import { GOOGLE_MAPS_API_KEY } from '../../evn.var.config';
import { Marker } from './Marker';


type MapHOCProps = {
    center: google.maps.LatLngLiteral,
    zoom:number,
    style:React.CSSProperties,
    markers: google.maps.MarkerOptions[],
    //fRef: React.ForwardedRef<typeof GoogleMap>,

}

const MapHOC = (props: MapHOCProps) => {
  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap 
        center={props.center}
        zoom={props.zoom}
        style={props.style} 
        >
        {props.markers.map((marker) => <Marker key={marker.position?.lat.toString()} {...marker}/>)}
        </GoogleMap>
    </Wrapper>
  )
}

export default MapHOC