import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAlert,
  IonLabel,
  IonSegmentButton,
  IonSegment,
  IonSegmentView,
  IonSegmentContent,
  IonFooter,
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonSpinner,
  IonImg,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Tab1.css";
import { useQuery } from "@tanstack/react-query";
import mockData from "../mock_data.json";

const Tab1: React.FC = () => {
  const {
    data: places,
    isLoading,
    refetch,
  } = useQuery<any[]>({
    queryKey: ["places"],
    queryFn: async () => {
      return await new Promise((resolve) =>
        setTimeout(() => resolve(mockData), Math.random() * 1000)
      );
    },
  });

  const getPhotoUrl = (photoName: string) => {
    return `https://picsum.photos/600/400`;
  };

  const handleRefresh = async (event: CustomEvent) => {
    await refetch();
    event.detail.complete();
  };

  console.log(places);

  return (
    <IonPage>
      <IonSegmentView>
        <IonSegmentContent id="list">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nearby Places</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding-bottom">
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
              <IonRefresherContent />
            </IonRefresher>

            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Nearby Places</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="ion-padding-bottom">
              {isLoading ? (
                <div className="ion-text-center ion-padding">
                  <IonSpinner />
                </div>
              ) : (
                places?.map((place) => (
                  <IonCard key={place.id}>
                    <Swiper
                      modules={[Pagination]}
                      pagination={{
                        clickable: true,
                      }}
                    >
                      {place.photos?.map((photo: any, index: any) => (
                        <SwiperSlide key={index}>
                          <IonImg
                            src={getPhotoUrl(photo.name)}
                            alt={`${place.displayName.text} photo ${index + 1}`}
                            style={{
                              aspectRatio: "16/9",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <IonCardHeader>
                      <IonCardTitle>{place.displayName.text}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {place.editorialSummary && (
                        <p>{place.editorialSummary.text}</p>
                      )}
                    </IonCardContent>
                  </IonCard>
                ))
              )}
            </div>
          </IonContent>
        </IonSegmentContent>
        <IonSegmentContent id="map">
          <IonContent>Rendering map</IonContent>
        </IonSegmentContent>
      </IonSegmentView>

      <IonFooter>
        <IonToolbar>
          <IonSegment value="list">
            <IonSegmentButton value="list" contentId="list">
              <IonLabel>List</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="map" contentId="map">
              <IonLabel>Map</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Tab1;
