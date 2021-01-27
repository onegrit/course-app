import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Courses: React.FC = () => {
  return (
    <React.Fragment>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </React.Fragment>
  );
};

export default Courses;
