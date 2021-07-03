import React, { useState } from 'react';
import MainTemplate from '../components/main/MainTemplate';
import MapContainer from '../containers/MapContainer';
import styled from 'styled-components';

const MapPage = () => {
  
  return (
    <MainTemplate>
      <MapContainer />
    </MainTemplate>
  );
};

export default MapPage;