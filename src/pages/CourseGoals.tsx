import React from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

const CourseGoals: React.FC = () => {
  return (
    <React.Fragment>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Course Goals</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>goal list</p>
      </IonContent>
    </React.Fragment>
  );
};

export default CourseGoals;
