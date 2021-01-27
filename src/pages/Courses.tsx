import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";

const Courses: React.FC = () => {
  const history = useHistory();
  const changePageHandler = () => {
    history.push("/course-goals");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          {/* <IonButton routerLink="/course-goals">To Course Goals</IonButton> */}
          {/* Programmatic Navigation */}
          <IonButton onClick={changePageHandler}>To Course Goals</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
