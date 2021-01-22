import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const NavWrapper = styled.form`
  position: absolute;
  left: 30px;
  right: 30px;
  top: 10px;
  display: flex;
  align-items: flex-start;
`

const H2 = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  color: #afa9dd;
  flex-grow: 6;
`;

const MapSearchBar = styled.input`
  border: 2px solid lightgrey;
  border-radius: 20px;
  width: 300px;
  height: 40px;
  padding: 10px;
  outline: none;
  flex-grow: 1;
  ::placeholder {
    color: #000;
  }
  &:focus {
    border: 2px solid #8a60fd
  }
`

const MapContainer = () => {

  const [searchState, setSearchState] = useState('');

  const [isSearching, setIsSearching] = useState(false);


  useEffect(() => {

  // 마커를 클릭하면 장소명을 표시할 인포윈도우
  const infowindow = new kakao.maps.InfoWindow({zIndex:1, borderRadius: '5px'});
  
  // 지도를 렌더링 할 컨테이너 지정
  const container = document.getElementById('myMap');
  
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심좌표
    level: 3 // 지도 확대 배율
  };

  // 지도 생성
  const map = new kakao.maps.Map(container, options);

  // 장소 검색 객체를 생성
  const ps = new kakao.maps.services.Places(); 

  // 지도에 마커를 표시하는 함수
  const displayMarker = (place) => {
    
    // 마커를 생성하고 지도에 표시
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x) 
    });
    
    // 마커에 클릭이벤트를 등록
    kakao.maps.event.addListener(marker, 'click', function() {
      // 마커를 클릭하면 장소명이 인포윈도우에 표시
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
    });
  }

  // 키워드 검색 완료 시 호출되는 콜백함수 
  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 LatLngBounds 객체에 좌표를 추가
    const bounds = new kakao.maps.LatLngBounds();

    for (var i=0; i<data.length; i++) {
      displayMarker(data[i]);
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    } 
      
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    map.setBounds(bounds);
    } 
  }

  // 키워드로 장소 검색
  ps.keywordSearch(searchState, placesSearchCB);

  },[isSearching])

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSearching(!isSearching);
    // 키워드로 장소를 검색합니다
    // ps.keywordSearch(searchState, placesSearchCB); 
  }

  const onChange = (e) => {
    setSearchState(e.target.value);
  }

    return (
      <>
        <NavWrapper onSubmit={onSubmit}>
          <H2>Map</H2>
          <MapSearchBar onChange={onChange} value={searchState} placeholder='Search Your Travel Spot' />
          </NavWrapper>
            <div id='myMap' style={{
              width: '840px',
              height: '520px',
              background: 'tomato',
              position: 'absolute',
              margin: '8px 0 0 30px',
              top: '60%',
              left: '0%',
              transform: 'translateY(-60%)'
            }}></div>
      </>
    );
}

export default MapContainer; 



