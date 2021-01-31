import React, { useContext } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import CourseContext from "../data/courses-context";

const AllGoals: React.FC = () => {
  const coursesCtx = useContext(CourseContext);

  const goals = coursesCtx.courses
    .map((course) => {
      return course.goals.map((goal) => {
        return { ...goal, courseTitle: course.title };
      });
    })
    .reduce((goalArr, nestedGoals) => {
      let updatedGoalArray = goalArr;
      for (const goal of nestedGoals) {
        updatedGoalArray = updatedGoalArray.concat(goal);
      }
      return updatedGoalArray;
    }, []);

  console.log(goals);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>ALL GOALS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {goals.map((goal) => (
            <IonItem key={goal.id}>
              <IonLabel>
                <h2>{goal.text}</h2>
                <p>{goal.courseTitle}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AllGoals;
