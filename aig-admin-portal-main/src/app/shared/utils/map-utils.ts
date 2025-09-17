
declare var google: any;
export class MapUtils {

  public initMap(element: any, location: any) {
    // Replace these coordinates with your actual latitude and longitude
    const myLatLng = new google.maps.LatLng(location.lat, location.long);

    var map = new google.maps.Map(element, {
      zoom: 15,
      center: myLatLng,

      zoomControl: false,        // Show zoom control
      mapTypeControl: false,     // Show map type control
      streetViewControl: false,  // Show street view control
      fullscreenControl: true,  // Show fullscreen control
      scaleControl: true,       // Show scale control
      rotateControl: true,      // Show rotate control
    });

    const markerIcon = {
      url: '../../assets/images/svg_img/mini-logo.svg',
      scaledSize: new google.maps.Size(40, 40), // Adjust the size as needed
    };

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: location.address,
      icon: markerIcon,
      label: {
        text: location.aigCode,
        className: 'marker-label',
      },
    });
  }



}

