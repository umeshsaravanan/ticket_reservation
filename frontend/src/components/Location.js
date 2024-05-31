import React, { useState, useEffect, useRef } from 'react';
import Map, { NavigationControl, Marker } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useDispatch, useSelector } from 'react-redux';
import { IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
import { toggleMap } from '../redux/slice';

function LocationLogo({ longitude, latitude }) {
  return (
    <Marker longitude={longitude} latitude={latitude}>
      <svg
        height="24"
        viewBox="0 0 24 24"
        style={{
          fill: '#3b82f6',
          transform: 'translate(12px, -24px)',
          cursor: 'pointer'
        }}
      >
        <path d="M12 2c-4.4 0-8 3.6-8 8s8 14 8 14s8-9.3 8-14s-3.6-8-8-8zm0 11.5c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1s3.1 1.4 3.1 3.1s-1.4 3.1-3.1 3.1z" />
      </svg>
    </Marker>
  );
}

const Location = ({ from, to }) => {
  const mapVisible = useSelector((state) => state.slice1.mapVisible);
  const dispatch = useDispatch();
  const startLocation = {
    longitude: from.lng,
    latitude: from.lat
  };

  const endLocation = {
    longitude: to.lng,
    latitude: to.lat
  };

  const [location, setLocation] = useState(startLocation);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const steps = 1000;
    const intervalTime = 100000 / steps;

    let step = 0;
    const interval = setInterval(() => {
      if (step < steps) {
        step++;
        const ratio = step / steps;
        const newLongitude = startLocation.longitude + ratio * (endLocation.longitude - startLocation.longitude);
        const newLatitude = startLocation.latitude + ratio * (endLocation.latitude - startLocation.latitude);
        setLocation({
          longitude: newLongitude,
          latitude: newLatitude
        });
      } else {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClick(event) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const longitude = startLocation.longitude + ((offsetX - centerX) / centerX) * (endLocation.longitude - startLocation.longitude);
      const latitude = startLocation.latitude + ((centerY - offsetY) / centerY) * (endLocation.latitude - startLocation.latitude);
      setLocation({ longitude, latitude });
    }

    if (mapVisible) {
      document.addEventListener('click', handleClick);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('click', handleClick);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClick);
      document.body.style.overflow = '';
    };
  }, [mapVisible]);

  return (
    <div
      ref={mapContainerRef}
      className={`fixed inset-0 flex items-center justify-center ${mapVisible ? 'block' : 'hidden'} max-w-screen-xl`}
      style={{ pointerEvents: mapVisible ? 'auto' : 'none' }}
    >
      <div className="absolute inset-0 bg-slate-600 bg-opacity-75 z-50 flex items-center justify-center w-screen h-screen max-w-screen-xl">
        <div className="pt-16 md:w-[60%] md:h-[80%] w-[90%] h-screen overflow-hidden relative ">
          <Map
            mapLib={maplibregl}
            initialViewState={{
              longitude: from.lng,
              latitude: from.lat,
              zoom: 8
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="https://api.maptiler.com/maps/streets/style.json?key=35FZgsMAS3N0HXRLdgB7"
          >
            <div className="flex justify-between">
              <NavigationControl />
              <IonIcon
                icon={close}
                className="text-xl cursor-pointer p-2"
                onClick={() => dispatch(toggleMap())}
              />
            </div>
            <Marker longitude={startLocation.longitude} latitude={startLocation.latitude}>
              <div style={{ display: 'flex', alignItems: 'center', color: 'red', fontWeight: 'bold' }}>
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  style={{
                    fill: 'red',
                    transform: 'translate(12px, -24px)',
                    cursor: 'pointer'
                  }}
                >
                  <path d="M12 2c-4.4 0-8 3.6-8 8s8 14 8 14s8-9.3 8-14s-3.6-8-8-8zm0 11.5c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1s3.1 1.4 3.1 3.1s-1.4 3.1-3.1 3.1z" />
                </svg>
                <h3>Start</h3>
              </div>
            </Marker>
            <LocationLogo longitude={location.longitude} latitude={location.latitude} />
            <Marker longitude={endLocation.longitude} latitude={endLocation.latitude}>
              <div style={{ display: 'flex', alignItems: 'center', color: 'blue', fontWeight: 'bold' }}>
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  style={{
                    fill: 'blue',
                    transform: 'translate(12px, -24px)',
                    cursor: 'pointer'
                  }}
                >
                  <path d="M12 2c-4.4 0-8 3.6-8 8s8 14 8 14s8-9.3 8-14s-3.6-8-8-8zm0 11.5c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1s3.1 1.4 3.1 3.1s-1.4 3.1-3.1 3.1z" />
                </svg>
                <h3>End</h3>
              </div>
            </Marker>
          </Map>
        </div>
      </div>
    </div>
  );
};

export default Location;
