import { Wrapper } from '@googlemaps/react-wrapper'
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import GoogleMap, { MapProps } from './GoogleMap';
import { GOOGLE_MAPS_API_KEY } from '../../evn.var.config';
import { Marker } from './Marker';
import { Autocomplete, TextField } from '@mui/material';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';


type MapHOCProps = {
    center: google.maps.LatLngLiteral,
    zoom:number,
    style:React.CSSProperties,
    markers: google.maps.MarkerOptions[],
    editable?:boolean
    updateMarkerArray?(markers:google.maps.MarkerOptions[]):void;
    //fRef: React.ForwardedRef<typeof GoogleMap>,

}


const MapHOC = ({center,markers,zoom,style,editable,updateMarkerArray}: MapHOCProps) => {
  const [mapMarkers, setMarkers] = useState<google.maps.MarkerOptions[]>(markers);
  const [selected, setSelected] = useState<google.maps.LatLngLiteral>();
  const {
      ready,
      value,
      setValue,
      suggestions: {status,data}
       ,clearSuggestions
      } = usePlacesAutocomplete();
      const controlRef = useRef<HTMLDivElement>(null);
      const addMarker = (e:google.maps.MapMouseEvent) => {
        setMarkers([...mapMarkers, {position: {lat: e.latLng!.lat(), lng: e.latLng!.lng()}}]);
       };
       useEffect(()=>{
        setSelected(center);
       },[]);
       useEffect(()=>{
        if (updateMarkerArray) updateMarkerArray(mapMarkers);
       },[mapMarkers,updateMarkerArray]);
       const handleSelect = async (e:React.SyntheticEvent<Element, Event>,address:string|null) => {
        if(address){  
        setValue(address,false);
          clearSuggestions();
          const results = await getGeocode({address});
          const {lat, lng} = await getLatLng(results[0]);
          setSelected({lat,lng});
        }
       };
  return (
    
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY}>
      <Autocomplete
      disabled={!ready}
      freeSolo
      inputValue={value}
      onChange={handleSelect}
      onInputChange={(e:any)=>{setValue(e.target.value);}}
      options={data.map(({place_id,description}) => description)}
      renderInput={(params) => <TextField ref={controlRef} {...params} label="Search places" size="small" variant="filled" sx={{maxWidth:"60%"}}/>}/>
        <GoogleMap 
        center={selected}
        zoom={zoom}
        style={style} 
        onClick={editable?addMarker:()=>{}}
        controlRef = {controlRef}
        >
        {mapMarkers.map((marker) => <Marker key={marker.position?.lat.toString()} {...marker} />)}
        </GoogleMap>
    </Wrapper>
  )
}

export default MapHOC