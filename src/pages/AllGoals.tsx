import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const AllGoals: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ALL GOALS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>All goals</h2>
      </IonContent>
    </IonPage>
  );
};

export default AllGoals;
