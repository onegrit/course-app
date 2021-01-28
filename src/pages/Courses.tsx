import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AddCourseModal from "../components/AddCourseModal";
import { COURSE_DATA } from "../data/course-data";

const Courses: React.FC = () => {
  const history = useHistory();
  const [isAdding, setIsAdding] = useState(false);
  const changePageHandler = () => {
    history.push("/course-goals");
  };

  const startAddCourseHandler = () => {
    setIsAdding(true);
    console.log("addCourseHandler..");
  };
  const cancelAddCourseHandler = () => {
    setIsAdding(false);
  };
  const saveCourseHandler = () => {
    console.log("Saving Course...");
  };

  return (
    <React.Fragment>
      <AddCourseModal
        show={isAdding}
        onCancel={cancelAddCourseHandler}
        onSave={saveCourseHandler}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Courses</IonTitle>
            {
              // add on IOS
              !isPlatform("android") && (
                <IonButtons slot="end">
                  <IonButton onClick={startAddCourseHandler}>
                    <IonIcon slot="icon-only" icon={addOutline} />
                  </IonButton>
                </IonButtons>
              )
            }
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
          {isPlatform("android") && (
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
              <IonFabButton color="secondary" onClick={startAddCourseHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default Courses;
