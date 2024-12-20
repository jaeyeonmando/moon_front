import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './IpInfo.css';

import L from 'leaflet';
const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const InfoTable = ({ info }) => (
  <table className="info-table">
    <tbody>
      <tr><td>국가</td><td>{info.country} ({info.countryCode})</td></tr>
      <tr><td>지역</td><td>{info.regionName} ({info.region})</td></tr>
      <tr><td>도시</td><td>{info.city}</td></tr>
      <tr><td>우편번호</td><td>{info.zip}</td></tr>
      <tr><td>위도</td><td>{info.lat}</td></tr>
      <tr><td>경도</td><td>{info.lon}</td></tr>
      <tr><td>시간대</td><td>{info.timezone}</td></tr>
      <tr><td>ISP</td><td>{info.isp}</td></tr>
      <tr><td>조직</td><td>{info.org}</td></tr>
      <tr><td>AS</td><td>{info.as}</td></tr>
    </tbody>
  </table>
);

const Map = ({ lat, lon }) => (
  <MapContainer center={[lat, lon]} zoom={13} style={{ width: '100%', height: '300px' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={[lat, lon]} icon={icon} />
  </MapContainer>
);

const IpInfo = ({ ip }) => {
  //const { ip } = useParams();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://ip-api.com/json/${ip}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'fail') {
          setError('IP 정보를 가져오지 못했습니다. 잘못된 IP일 수 있습니다.');
        } else {
          setInfo(data);
        }
      })
      .catch(() => setError('IP 정보를 로드하는 중 오류가 발생했습니다.'));
  }, [ip]);

  return (
    <div className="ip-info-page">
      <div className="ip-info-header">
        <p className="ip-display">입력한 IP: {ip}</p>
        <h3>IP 정보</h3>
      </div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : info ? (
        <>
          <div className="ip-info-content">
            <InfoTable info={info} />
          </div>
          <div className="map-container">
            <Map lat={info.lat} lon={info.lon} />
          </div>
        </>
      ) : (
        <p>IP 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default IpInfo;
