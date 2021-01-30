import {
  IonButton,
  IonButtons,
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
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AddCourseModal from "../components/AddCourseModal";
import CourseItem from "../components/CourseItem";
import { COURSE_DATA } from "../data/course-data";
import CourseContext from "../data/courses-context";

const Courses: React.FC = () => {
  const history = useHistory();
  // isAdding == true,open Add Modal, otherwise close the Add Modal
  const [isAdding, setIsAdding] = useState(false);
  const coursesCtx = useContext(CourseContext);

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
  const courseAddHandler = (title: string, date: Date) => {
    coursesCtx.addCourse(title, date);
    setIsAdding(false);
  };

  return (
    <React.Fragment>
      <AddCourseModal
        show={isAdding}
        onCancel={cancelAddCourseHandler}
        onSave={courseAddHandler}
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
            {coursesCtx.courses.map((course) => (
              <IonRow key={course.id}>
                <IonCol size-md="4" offset-md="4">
                  <CourseItem
                    id={course.id}
                    title={course.title}
                    enrollmentDate={course.enrolled}
                  />
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
