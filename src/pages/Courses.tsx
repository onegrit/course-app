import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { COURSE_DATA } from "../data/course-data";

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
        <IonGrid>
          {COURSE_DATA.map((course) => (
            <IonRow key={course.id}>
              <IonCol size-md="4" offset-md="4">
                <IonCard>
                  <IonCardHeader>
                    <IonCardSubtitle>
                      {"Enrolled on: "}
                      {course.enrolled.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </IonCardSubtitle>
                    <IonCardTitle> {course.title} </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="ion-text-center">
                    <IonButton routerLink={`/courses/${course.id}`}>
                      View Course Goals
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
