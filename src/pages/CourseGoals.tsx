import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";

import { COURSE_DATA } from "../data/course-data";

const CourseGoals: React.FC = () => {
  const selectedCourseId = useParams<{ courseId: string }>().courseId;
  let course = null;
  if (selectedCourseId) {
    course = COURSE_DATA.find((course) => course.id === selectedCourseId);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{course ? course.title : "Not course found"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>goal list</p>
      </IonContent>
    </IonPage>
  );
};

export default CourseGoals;
