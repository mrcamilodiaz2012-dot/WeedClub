declare module 'react-map-gl' {
  import * as React from 'react';
  
  export const Map: React.FC<any>;
  export const Marker: React.FC<any>;
  export const NavigationControl: React.FC<any>;
  export const Popup: React.FC<any>;
  export const Source: React.FC<any>;
  export const Layer: React.FC<any>;
  export const useMap: () => any;

  export default Map;
}
